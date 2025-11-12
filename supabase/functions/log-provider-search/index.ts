import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface SearchLogRequest {
  searchTerm?: string;
  locationSearch?: string;
  radiusFilter?: number;
  resultsCount: number;
  userLocation?: { lat: number; lng: number };
}

Deno.serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? ''
    );

    const { 
      searchTerm, 
      locationSearch, 
      radiusFilter, 
      resultsCount,
      userLocation 
    } = await req.json() as SearchLogRequest;

    console.log('Logging provider search:', {
      searchTerm,
      locationSearch,
      radiusFilter,
      resultsCount,
      hasUserLocation: !!userLocation
    });

    // Extract client info
    const ipAddress = req.headers.get('x-forwarded-for') || 
                     req.headers.get('x-real-ip') || 
                     'unknown';
    const userAgent = req.headers.get('user-agent') || 'unknown';

    // Insert search log
    const { data, error } = await supabaseClient
      .from('provider_searches')
      .insert({
        search_term: searchTerm || null,
        location_search: locationSearch || null,
        radius_filter: radiusFilter || null,
        results_count: resultsCount,
        user_location: userLocation || null,
        ip_address: ipAddress,
        user_agent: userAgent,
      })
      .select()
      .single();

    if (error) {
      console.error('Error logging search:', error);
      throw error;
    }

    console.log('Search logged successfully:', data.id);

    return new Response(
      JSON.stringify({ 
        success: true, 
        searchId: data.id,
        resultsCount 
      }),
      { 
        headers: { 
          ...corsHeaders, 
          'Content-Type': 'application/json' 
        } 
      }
    );

  } catch (error) {
    console.error('Error in log-provider-search function:', error);
    
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: error.message 
      }),
      { 
        status: 500,
        headers: { 
          ...corsHeaders, 
          'Content-Type': 'application/json' 
        } 
      }
    );
  }
});
