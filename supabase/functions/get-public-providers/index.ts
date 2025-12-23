import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

// Use external database credentials
const supabaseUrl = (Deno.env.get('EXTERNAL_SUPABASE_URL') || Deno.env.get('SUPABASE_URL'))!
  .trim()
  .replace(/[\r\n\t]/g, '')

const supabaseAnonKey = (Deno.env.get('EXTERNAL_SUPABASE_ANON_KEY') || Deno.env.get('SUPABASE_ANON_KEY'))!
  .trim()
  .replace(/[\r\n\t\s]/g, '')

console.log('Connecting to external database for provider lookup:', supabaseUrl.substring(0, 30) + '...')

const supabase = createClient(supabaseUrl, supabaseAnonKey)

Deno.serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    console.log('=== Get Public Providers Started ===')

    // Query active public provider profiles
    // Note: Using left join in case dental_practices relation doesn't exist
    const { data: providers, error } = await supabase
      .from('public_provider_profiles')
      .select(`
        id,
        provider_id,
        practice_id,
        full_name,
        title,
        contact_email,
        contact_phone,
        business_location,
        city,
        state
      `)
      .eq('is_active', true)
      .order('full_name', { ascending: true })

    if (error) {
      console.error('Error fetching providers:', error)
      console.error('Error details:', JSON.stringify(error, null, 2))
      return new Response(
        JSON.stringify({ error: 'Failed to fetch providers', details: error.message }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    console.log('Raw providers count:', providers?.length || 0)

    // Transform data - practice_name will need to be fetched separately or from a different field
    const transformedProviders = (providers || []).map((provider: any) => ({
      id: provider.id,
      provider_id: provider.provider_id,
      practice_id: provider.practice_id,
      full_name: provider.full_name,
      title: provider.title,
      contact_email: provider.contact_email,
      contact_phone: provider.contact_phone,
      business_location: provider.business_location,
      city: provider.city,
      state: provider.state,
      // Use business_location as practice_name fallback if no separate practice table join
      practice_name: provider.business_location?.split(',')[0] || provider.full_name || ''
    }))

    console.log(`Returning ${transformedProviders.length} active providers`)

    return new Response(
      JSON.stringify({ providers: transformedProviders }),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )

  } catch (error) {
    console.error('Unexpected error:', error)
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  }
})
