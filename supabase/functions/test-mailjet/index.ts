import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

Deno.serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { email } = await req.json()
    
    if (!email) {
      return new Response(
        JSON.stringify({ error: 'Email address required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    const apiKey = Deno.env.get("MAILJET_API_KEY");
    const apiSecret = Deno.env.get("MAILJET_API_SECRET");
    
    if (!apiKey || !apiSecret) {
      return new Response(
        JSON.stringify({ error: 'Mailjet credentials not configured' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    const mailjetUrl = 'https://api.mailjet.com/v3.1/send';
    const auth = btoa(`${apiKey}:${apiSecret}`);

    console.log(`Sending test email to ${email}...`);

    const emailResponse = await fetch(mailjetUrl, {
      method: 'POST',
      headers: {
        'Authorization': `Basic ${auth}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        Messages: [
          {
            From: {
              Email: "noreply@mydentipay.com",
              Name: "DentiPay Test"
            },
            To: [
              { Email: email }
            ],
            Subject: "Mailjet Configuration Test",
            HTMLPart: `
              <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
                <h1 style="color: #1e3a8a;">✅ Mailjet Test Successful</h1>
                <p>This is a test email to verify your Mailjet configuration is working correctly.</p>
                <p><strong>Test Time:</strong> ${new Date().toISOString()}</p>
                <p style="color: #64748b; font-size: 14px; margin-top: 30px;">
                  If you received this email, your Mailjet API keys are configured correctly.
                </p>
              </div>
            `
          }
        ]
      })
    });

    const emailResult = await emailResponse.json();
    console.log("Mailjet response:", JSON.stringify(emailResult));

    if (!emailResponse.ok) {
      console.error("Mailjet test failed:", emailResult);
      return new Response(
        JSON.stringify({ 
          error: 'Mailjet API error',
          details: emailResult 
        }),
        { status: emailResponse.status, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    console.log(`Test email sent successfully to ${email}`);
    
    return new Response(
      JSON.stringify({ 
        success: true,
        message: `Test email sent to ${email}`,
        mailjetResponse: emailResult
      }),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )

  } catch (error) {
    console.error('Test email error:', error)
    return new Response(
      JSON.stringify({ 
        error: 'Failed to send test email',
        details: error instanceof Error ? error.message : 'Unknown error'
      }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  }
})
