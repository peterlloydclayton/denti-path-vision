import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
import { corsHeaders } from '../_shared/cors.ts'

const supabaseUrl = Deno.env.get('SUPABASE_URL')!
const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!

// Create Supabase client with service role key (bypasses RLS)
const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
})

// Allowed origins for security
const ALLOWED_ORIGINS = [
  'https://567a9d84-f17c-441c-b31b-826d6c47a1a2.lovableproject.com',
  'https://id-preview--567a9d84-f17c-441c-b31b-826d6c47a1a2.lovable.app'
]

// Allowed domain patterns (supports wildcards)
const ALLOWED_DOMAIN_PATTERNS = [
  /^https:\/\/.*\.mydentipay\.com$/,
  /^https:\/\/mydentipay\.com$/,
  /^https:\/\/.*\.lovableproject\.com$/,
  /^https:\/\/.*\.lovable\.app$/
]

function isOriginAllowed(origin: string): boolean {
  if (ALLOWED_ORIGINS.includes(origin)) {
    return true
  }
  
  return ALLOWED_DOMAIN_PATTERNS.some(pattern => pattern.test(origin))
}

interface ApplicationData {
  first_name: string
  middle_name?: string
  last_name: string
  email: string
  mobile_phone?: string
  secondary_phone?: string
  date_of_birth?: string
  sex?: string
  ssn?: string
  ssn_last_four?: string
  drivers_license?: string
  marital_status?: string
  home_street_address?: string
  home_street_address_2?: string
  home_city?: string
  home_state?: string
  home_zip?: string
  time_at_address?: string
  rent_or_own?: string
  previous_address?: string
  previous_street_address?: string
  previous_street_address_2?: string
  previous_city?: string
  previous_state?: string
  previous_zip?: string
  emergency_contact_name?: string
  emergency_contact_relationship?: string
  emergency_contact_phone?: string
  referring_practice?: string
  referring_provider_name?: string
  referring_contact_info?: string
  referring_provider_email?: string
  estimated_treatment_cost?: number
  employment_status?: string
  employer_name?: string
  job_title?: string
  work_phone?: string
  length_of_employment?: string
  monthly_income?: number
  monthly_net_income?: number
  pay_frequency?: string
  secondary_income_sources?: string
  household_total_income?: number
  spouse_employer?: string
  spouse_income?: number
  years_at_job?: number
  checking_balance?: number
  savings_balance?: number
  cash_on_hand?: number
  investments?: number
  retirement_accounts?: number
  home_equity?: number
  owned_vehicles?: number
  business_ownership?: number
  monthly_housing_cost?: number
  mortgage_balance?: number
  credit_card_balances?: number
  auto_loans?: number
  student_loans?: number
  personal_loans?: number
  medical_bills?: number
  alimony_child_support?: number
  credit_score?: number
  open_credit_lines?: number
  late_payments?: number
  bankruptcy_history?: boolean
  foreclosure_history?: boolean
  recent_major_purchases?: string
  considering_treatment_time?: string
  priority_preference?: string
  primary_reason?: string
  expected_procedures?: string
  estimated_cost?: number
  timeline_urgency?: string
  ready_to_proceed?: string
  insurance_coverage?: string
  financing_preferences?: string
  previous_treatment?: string
  comfort_discussing_financing?: number
  pain_level?: number
  primary_motivator?: string
  decision_making_style?: string
  confidence_impact?: string
  obstacles?: string
  others_involved?: string
  trust_factors?: string
  negative_experiences?: string
  consent_credit_pull: boolean
  target_payment_range?: string
  commitment_level?: number
  can_provide_proof?: boolean
  comfort_auto_debit?: boolean
  ready_for_call?: boolean
  ready_for_deposit?: boolean
  additional_info?: string
  signature_data?: {
    signer_name: string
    signer_email: string
    consent_given: boolean
    ip_address: string
    user_agent: string
    document_hash: string
    document_id: string
    pdf_base64: string
  }
}

Deno.serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    console.log('=== Submit Patient Application Started ===')
    
    const applicationData: ApplicationData = await req.json()
    console.log('Application data received for:', `${applicationData.first_name} ${applicationData.last_name}`)

    // Remove signature_data from the application data before inserting
    const { signature_data, ...dbApplicationData } = applicationData

    // Insert application data
    console.log('Inserting application data into database...')
    const { data: tempApp, error: appError } = await supabaseAdmin
      .from('temp_patient_applications')
      .insert({
        ...dbApplicationData,
        expires_at: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
        created_at: new Date().toISOString()
      })
      .select()
      .single()

    if (appError) {
      console.error('Application insert error:', appError)
      return new Response(
        JSON.stringify({ error: 'Failed to submit application' }),
        { 
          status: 500, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      )
    }
    
    console.log('Application successfully inserted with ID:', tempApp.id)

    // Send email notification using Mailjet
    try {
      const apiKey = Deno.env.get("MAILJET_API_KEY");
      const apiSecret = Deno.env.get("MAILJET_API_SECRET");
      
      if (apiKey && apiSecret && apiKey.trim() !== '' && apiSecret.trim() !== '') {
        const mailjetUrl = 'https://api.mailjet.com/v3.1/send';
        const auth = btoa(`${apiKey}:${apiSecret}`);
        
        // Admin notification email
        const adminHtmlContent = `
          <div style="font-family: Arial, sans-serif; max-width: 800px; margin: 0 auto; padding: 20px;">
            <h1 style="color: #2563eb; border-bottom: 2px solid #2563eb; padding-bottom: 10px;">New Patient Financing Application</h1>
            <p><strong>Name:</strong> ${applicationData.first_name}${applicationData.middle_name ? ` ${applicationData.middle_name}` : ''} ${applicationData.last_name}</p>
            <p><strong>Email:</strong> ${applicationData.email}</p>
            <p><strong>Mobile Phone:</strong> ${applicationData.mobile_phone || 'N/A'}</p>
            <p><strong>Application ID:</strong> ${tempApp.id}</p>
            <p style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb; color: #6b7280; font-size: 12px;">
              <em>This email was automatically generated from the DentiPay patient financing application form.</em>
            </p>
          </div>
        `;

        await fetch(mailjetUrl, {
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
                  Name: "DentiPay"
                },
                To: [
                  { Email: "peter@mydentipay.com" },
                  { Email: "adam@mydentipay.com" },
                  { Email: "nuttalya@mydentipay.com" },
                  ...(applicationData.referring_provider_email ? [{ Email: applicationData.referring_provider_email }] : [])
                ],
                Subject: `New Patient Financing Application - ${applicationData.first_name} ${applicationData.last_name}`,
                HTMLPart: adminHtmlContent
              }
            ]
          })
        });

        console.log("Admin notification email sent successfully via Mailjet");

        // Send thank you email to the patient
        const patientEmailContent = `
          <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #ffffff;">
            <!-- Header with Logo -->
            <div style="background: linear-gradient(135deg, #1e3a8a 0%, #1e40af 100%); padding: 30px 20px; text-align: center;">
              <img src="https://res.cloudinary.com/drxvhwze4/image/upload/v1760029328/dentipay-logo-dark-tp_mi7atx.png" alt="DentiPay" style="height: 48px; width: auto; margin-bottom: 15px;" />
              <h1 style="color: #ffffff; margin: 0; font-size: 24px; font-weight: 600;">Thank You for Your Application</h1>
            </div>
            
            <!-- Main Content -->
            <div style="padding: 40px 30px;">
              <p style="font-size: 16px; line-height: 1.6; color: #374151; margin-bottom: 20px;">
                Dear ${applicationData.first_name},
              </p>

              <p style="font-size: 16px; line-height: 1.6; color: #374151; margin-bottom: 30px;">
                Thank you for applying for financing with <strong style="color: #1e3a8a;">DentiPay</strong>. We have received your application and our team is reviewing it.
              </p>

              <!-- What Happens Next Box -->
              <div style="border: 2px solid #1e3a8a; border-radius: 8px; padding: 25px; margin: 30px 0;">
                <h2 style="color: #1e3a8a; margin-top: 0; margin-bottom: 15px; font-size: 18px; font-weight: 600;">What Happens Next?</h2>
                <p style="color: #374151; line-height: 1.8; margin: 0;">
                  You will hear from us with a response, typically within <strong>48 hours</strong>. If we need any additional information, we'll contact you at <strong style="color: #1e3a8a;">${applicationData.email}</strong>${applicationData.mobile_phone ? ` or <strong style="color: #1e3a8a;">${applicationData.mobile_phone}</strong>` : ''}.
                </p>
              </div>

              <p style="font-size: 16px; line-height: 1.6; color: #374151; margin-bottom: 30px;">
                We understand that dental care is important, and we're committed to helping you get the treatment you need with flexible financing options.
              </p>

              <!-- Application Summary -->
              <div style="background-color: #f8fafc; border-left: 4px solid #1e3a8a; padding: 20px; margin: 30px 0;">
                <h3 style="color: #1e3a8a; margin-top: 0; margin-bottom: 15px; font-size: 16px; font-weight: 600;">Application Summary</h3>
                <table style="width: 100%; border-collapse: collapse;">
                  <tr>
                    <td style="padding: 8px 0; color: #64748b; font-weight: 500;">Applicant:</td>
                    <td style="padding: 8px 0; color: #1e293b; font-weight: 600;">${applicationData.first_name} ${applicationData.last_name}</td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0; color: #64748b; font-weight: 500;">Email:</td>
                    <td style="padding: 8px 0; color: #1e293b;">${applicationData.email}</td>
                  </tr>
                  ${applicationData.referring_practice ? `
                  <tr>
                    <td style="padding: 8px 0; color: #64748b; font-weight: 500;">Referring Practice:</td>
                    <td style="padding: 8px 0; color: #1e293b;">${applicationData.referring_practice}</td>
                  </tr>` : ''}
                  ${applicationData.estimated_treatment_cost ? `
                  <tr>
                    <td style="padding: 8px 0; color: #64748b; font-weight: 500;">Estimated Cost:</td>
                    <td style="padding: 8px 0; color: #1e293b; font-weight: 600;">$${applicationData.estimated_treatment_cost}</td>
                  </tr>` : ''}
                </table>
              </div>
            </div>

            <!-- Footer -->
            <div style="background-color: #f8fafc; padding: 25px 30px; text-align: center; border-top: 1px solid #e2e8f0;">
              <p style="color: #64748b; font-size: 14px; margin: 0 0 10px 0;">
                Thank you for choosing <strong style="color: #1e3a8a;">DentiPay</strong> for your dental financing needs.
              </p>
              <p style="color: #94a3b8; font-size: 12px; margin: 0;">
                This is an automated confirmation email. Please do not reply to this message.
              </p>
            </div>
          </div>
        `;

        await fetch(mailjetUrl, {
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
                  Name: "DentiPay"
                },
                To: [
                  { Email: applicationData.email, Name: `${applicationData.first_name} ${applicationData.last_name}` }
                ],
                Subject: "Thank You for Your DentiPay Financing Application",
                HTMLPart: patientEmailContent
              }
            ]
          })
        });

        console.log("Patient thank you email sent successfully");

      } else {
        console.log("Mailjet credentials not configured, skipping email notification");
      }
    } catch (emailError) {
      console.error("Failed to send email notification:", emailError);
      // Don't fail the application submission if email fails
    }

    // Handle signature and document if provided
    if (signature_data) {
      console.log('Processing signature data...')
      const sig = signature_data
      
      try {
        console.log('Decoding PDF from base64...')
        const pdfBytes = Uint8Array.from(atob(sig.pdf_base64), c => c.charCodeAt(0))
        console.log('PDF decoded, size:', pdfBytes.length, 'bytes')
        
        const fileName = `${tempApp.id}_${Date.now()}.pdf`
        console.log('Uploading PDF to storage with filename:', fileName)
        const { data: uploadData, error: uploadError } = await supabaseAdmin.storage
          .from('signed-documents')
          .upload(fileName, pdfBytes, {
            contentType: 'application/pdf',
            cacheControl: '3600',
          })

        if (uploadError) {
          console.error('PDF upload error:', uploadError)
          throw new Error('Failed to upload signed document')
        }
        console.log('PDF uploaded successfully:', uploadData.path)

        const { data: signatureData, error: signatureError } = await supabaseAdmin
          .from('signatures')
          .insert({
            document_id: null,
            patient_id: null,
            signer_name: sig.signer_name,
            signer_email: sig.signer_email,
            ip_address: sig.ip_address,
            user_agent: sig.user_agent,
            signature_type: 'typed',
            consent_given: sig.consent_given,
            signed_at: new Date().toISOString(),
            document_hash: sig.document_hash,
          })
          .select()
          .single()

        if (signatureError) {
          console.error('Signature insert error:', signatureError)
          throw new Error('Failed to save signature')
        }

        const { error: docError } = await supabaseAdmin
          .from('signed_documents')
          .insert({
            signature_id: signatureData.id,
            file_path: uploadData.path,
          })

        if (docError) {
          console.error('Signed document insert error:', docError)
          throw new Error('Failed to link signed document')
        }

        console.log('Signature and document successfully created')
      } catch (sigError: any) {
        console.error('Signature processing error:', sigError)
        return new Response(
          JSON.stringify({ 
            success: true, 
            id: tempApp.id,
            message: 'Application submitted but signature processing failed',
            warning: sigError.message
          }),
          { 
            status: 200, 
            headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
          }
        )
      }
    }

    console.log('=== Application submission completed successfully ===')
    return new Response(
      JSON.stringify({ 
        success: true, 
        id: tempApp.id,
        message: 'Application submitted successfully' 
      }),
      { 
        status: 200, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    )

  } catch (error) {
    console.error('=== FATAL ERROR in submit-patient-application ===')
    console.error('Error details:', error)
    
    return new Response(
      JSON.stringify({ 
        error: 'Internal server error',
        details: error instanceof Error ? error.message : 'Unknown error'
      }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    )
  }
})
