import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
import { z } from 'https://deno.land/x/zod@v3.22.4/mod.ts'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

// Rate limiting: Store IP addresses and their request timestamps
const rateLimit = new Map<string, number[]>();

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const requests = rateLimit.get(ip) || [];
  const recent = requests.filter(t => now - t < 3600000); // Last hour
  
  if (recent.length >= 5) { // Max 5 submissions per hour
    console.log(`Rate limit exceeded for IP: ${ip}`);
    return false;
  }
  
  rateLimit.set(ip, [...recent, now]);
  
  // Clean up old entries periodically
  if (rateLimit.size > 1000) {
    const cutoff = now - 3600000;
    for (const [key, timestamps] of rateLimit.entries()) {
      if (timestamps.every(t => t < cutoff)) {
        rateLimit.delete(key);
      }
    }
  }
  
  return true;
}

// Use external database credentials
const supabaseUrl = (Deno.env.get('EXTERNAL_SUPABASE_URL') || Deno.env.get('SUPABASE_URL'))!
  .trim()
  .replace(/[\r\n\t]/g, '') // Remove line breaks, carriage returns, and tabs

const supabaseServiceKey = (Deno.env.get('EXTERNAL_SUPABASE_SERVICE_ROLE_KEY') || Deno.env.get('SUPABASE_SERVICE_ROLE_KEY'))!
  .trim()
  .replace(/[\r\n\t\s]/g, '') // Remove all whitespace, line breaks, tabs

// Validate the service key format (should be a JWT token)
if (!supabaseServiceKey || supabaseServiceKey.split('.').length !== 3) {
  console.error('Invalid service role key format. Key should be a valid JWT token.')
  throw new Error('Invalid EXTERNAL_SUPABASE_SERVICE_ROLE_KEY configuration')
}

console.log('Connecting to external database:', supabaseUrl.substring(0, 30) + '...')
console.log('Service key length:', supabaseServiceKey.length)
console.log('Service key preview:', supabaseServiceKey.substring(0, 20) + '...')

// Create Supabase client (service role bypasses RLS)
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

// Comprehensive input validation schema
const ApplicationSchema = z.object({
  first_name: z.string().trim().min(1, 'First name required').max(100),
  middle_name: z.string().trim().max(100).optional(),
  last_name: z.string().trim().min(1, 'Last name required').max(100),
  email: z.string().email('Invalid email').max(255),
  mobile_phone: z.string().max(20).optional(),
  secondary_phone: z.string().max(20).optional(),
  date_of_birth: z.string().max(50).optional(),
  sex: z.string().max(20).optional(),
  ssn: z.string().regex(/^[\d-]*$/, 'Invalid SSN format').max(11).optional(),
  ssn_last_four: z.string().regex(/^\d{0,4}$/, 'Invalid SSN last four').optional(),
  drivers_license: z.string().max(50).optional(),
  marital_status: z.string().max(50).optional(),
  home_street_address: z.string().max(200).optional(),
  home_street_address_2: z.string().max(200).optional(),
  home_city: z.string().max(100).optional(),
  home_state: z.string().max(50).optional(),
  home_zip: z.string().max(20).optional(),
  time_at_address: z.string().max(50).optional(),
  rent_or_own: z.string().max(20).optional(),
  previous_address: z.string().max(500).optional(),
  previous_street_address: z.string().max(200).optional(),
  previous_street_address_2: z.string().max(200).optional(),
  previous_city: z.string().max(100).optional(),
  previous_state: z.string().max(50).optional(),
  previous_zip: z.string().max(20).optional(),
  emergency_contact_name: z.string().max(200).optional(),
  emergency_contact_relationship: z.string().max(50).optional(),
  emergency_contact_phone: z.string().max(20).optional(),
  referring_practice: z.string().max(200).optional(),
  referring_provider_name: z.string().max(200).optional(),
  referring_contact_info: z.string().max(500).optional(),
  referring_provider_email: z.string().email('Invalid provider email').max(255).optional().or(z.literal('')),
  estimated_treatment_cost: z.number().min(0).max(999999999).optional(),
  employment_status: z.string().max(50).optional(),
  employer_name: z.string().max(200).optional(),
  employer_address: z.string().max(500).optional(),
  job_title: z.string().max(100).optional(),
  work_phone: z.string().max(20).optional(),
  length_of_employment: z.string().max(50).optional(),
  monthly_income: z.number().min(0).max(999999999).optional(),
  monthly_net_income: z.number().min(0).max(999999999).optional(),
  pay_frequency: z.string().max(50).optional(),
  secondary_income_sources: z.string().max(500).optional(),
  household_total_income: z.number().min(0).max(999999999).optional(),
  spouse_employer: z.string().max(200).optional(),
  spouse_income: z.number().min(0).max(999999999).optional(),
  years_at_job: z.number().min(0).max(100).optional(),
  checking_balance: z.number().min(0).max(999999999).optional(),
  savings_balance: z.number().min(0).max(999999999).optional(),
  cash_on_hand: z.number().min(0).max(999999999).optional(),
  investments: z.number().min(0).max(999999999).optional(),
  retirement_accounts: z.number().min(0).max(999999999).optional(),
  home_equity: z.number().min(0).max(999999999).optional(),
  owned_vehicles: z.number().min(0).max(999999999).optional(),
  business_ownership: z.number().min(0).max(999999999).optional(),
  monthly_housing_cost: z.number().min(0).max(999999999).optional(),
  mortgage_balance: z.number().min(0).max(999999999).optional(),
  credit_card_balances: z.number().min(0).max(999999999).optional(),
  auto_loans: z.number().min(0).max(999999999).optional(),
  student_loans: z.number().min(0).max(999999999).optional(),
  personal_loans: z.number().min(0).max(999999999).optional(),
  medical_bills: z.number().min(0).max(999999999).optional(),
  alimony_child_support: z.number().min(0).max(999999999).optional(),
  credit_score: z.union([z.number().min(300).max(850), z.null(), z.literal(0)]).optional().transform(val => val === 0 ? null : val),
  open_credit_lines: z.number().min(0).max(100).optional(),
  late_payments: z.number().min(0).max(100).optional(),
  bankruptcy_history: z.boolean().optional(),
  foreclosure_history: z.boolean().optional(),
  recent_major_purchases: z.string().max(1000).optional(),
  considering_treatment_time: z.string().max(100).optional(),
  priority_preference: z.string().max(100).optional(),
  primary_reason: z.string().max(500).optional(),
  treatment_reason: z.array(z.string()).optional(),
  expected_procedures: z.string().max(500).optional(),
  estimated_cost: z.number().min(0).max(999999999).optional(),
  timeline_urgency: z.string().max(100).optional(),
  urgency_scale: z.number().int().min(0).max(10).optional(),
  ready_to_proceed: z.string().max(50).optional(),
  insurance_coverage: z.string().max(500).optional(),
  financing_preferences: z.string().max(500).optional(),
  previous_treatment: z.string().max(500).optional(),
  comfort_discussing_financing: z.number().min(0).max(10).optional(),
  pain_level: z.number().min(0).max(10).optional(),
  primary_motivator: z.string().max(200).optional(),
  decision_making_style: z.string().max(200).optional(),
  confidence_impact: z.string().max(200).optional(),
  obstacles: z.string().max(1000).optional(),
  others_involved: z.string().max(500).optional(),
  trust_factors: z.string().max(500).optional(),
  negative_experiences: z.string().max(1000).optional(),
  consent_credit_pull: z.boolean(),
  consent_communications: z.boolean().optional(),
  understand_no_credit_impact: z.boolean().optional(),
  confirm_information_accurate: z.boolean().optional(),
  target_payment_range: z.string().max(100).optional(),
  commitment_level: z.number().min(0).max(10).optional(),
  can_provide_proof: z.boolean().optional(),
  comfort_auto_debit: z.boolean().optional(),
  ready_for_call: z.boolean().optional(),
  ready_for_deposit: z.boolean().optional(),
  additional_info: z.string().max(2000).optional(),
  signature_data: z.object({
    signer_name: z.string().max(200),
    signer_email: z.string().email().max(255),
    consent_given: z.boolean(),
    ip_address: z.string().max(100),
    user_agent: z.string().max(500),
    document_hash: z.string().max(200),
    document_id: z.string().max(100),
    pdf_base64: z.string()
  }).optional()
})

type ApplicationData = z.infer<typeof ApplicationSchema>

Deno.serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    console.log('=== Submit Patient Application Started (v2) ===')
    
    // Rate limiting check
    const clientIP = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 
                     req.headers.get('x-real-ip') || 
                     'unknown';
    
    if (!checkRateLimit(clientIP)) {
      console.log(`Rate limit exceeded for IP: ${clientIP}`);
      return new Response(
        JSON.stringify({ error: 'Too many requests. Please try again later.' }),
        { 
          status: 429, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      )
    }
    
    // Parse and validate input data
    const rawData = await req.json()
    
    // Preprocess credit_score: convert 0 or values < 300 to null, cap at 850
    if (rawData.credit_score !== undefined && rawData.credit_score !== null) {
      if (typeof rawData.credit_score === 'number') {
        if (rawData.credit_score < 300) {
          rawData.credit_score = null;
        } else if (rawData.credit_score > 850) {
          rawData.credit_score = 850; // Cap at standard FICO max
        }
      }
    }
    
    let applicationData: ApplicationData;
    try {
      applicationData = ApplicationSchema.parse(rawData)
      console.log('Application data validated for:', `${applicationData.first_name} ${applicationData.last_name}`)
    } catch (validationError) {
      console.error('Validation error:', validationError)
      if (validationError instanceof z.ZodError) {
        return new Response(
          JSON.stringify({ 
            error: 'Invalid application data',
            details: validationError.errors.map(e => `${e.path.join('.')}: ${e.message}`).join(', ')
          }),
          { 
            status: 400, 
            headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
          }
        )
      }
      throw validationError
    }

    // Insert application data with signature_data as JSONB
    console.log('Inserting application data into database...')
    const { data: tempApp, error: appError } = await supabaseAdmin
      .from('temp_patient_applications')
      .insert({
        ...applicationData,
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

        const adminEmailResponse = await fetch(mailjetUrl, {
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

        const adminEmailResult = await adminEmailResponse.json();
        console.log("Mailjet admin email response:", JSON.stringify(adminEmailResult));
        
        if (!adminEmailResponse.ok) {
          console.error("Mailjet admin email failed:", adminEmailResult);
          throw new Error(`Mailjet error: ${JSON.stringify(adminEmailResult)}`);
        }
        
        console.log("Admin notification email sent successfully via Mailjet");

      } else {
        console.log("Mailjet credentials not configured, skipping email notification");
      }
    } catch (emailError) {
      console.error("Failed to send email notification:", emailError);
      // Don't fail the application submission if email fails
    }

    // Create Supabase account for the patient and get confirmation link
    let confirmationLink = '';
    try {
      console.log("Creating Supabase account for patient...");
      
      const { data: authData, error: authError } = await supabaseAdmin.auth.admin.createUser({
        email: applicationData.email,
        email_confirm: false, // Require email confirmation
        user_metadata: {
          first_name: applicationData.first_name,
          last_name: applicationData.last_name,
          phone: applicationData.mobile_phone
        }
      });

      if (authError) {
        // If user already exists, try to generate a password reset link instead
        if (authError.message?.includes('already been registered')) {
          console.log("User already exists, generating password reset link...");
          try {
            const { data: linkData, error: resetError } = await supabaseAdmin.auth.admin.generateLink({
              type: 'recovery',
              email: applicationData.email,
              options: {
                redirectTo: `${req.headers.get('origin') || 'https://mydentipay.com'}/auth/callback`
              }
            });
            
            if (!resetError && linkData?.properties?.action_link) {
              confirmationLink = linkData.properties.action_link;
              console.log("Password reset link generated for existing user");
            }
          } catch (resetLinkError) {
            console.error("Error generating password reset link:", resetLinkError);
          }
        } else {
          console.error("Error creating user account:", authError);
        }
      } else {
        console.log("User account created successfully:", authData.user.id);
        
        // Generate email confirmation link
        const { data: linkData, error: emailError } = await supabaseAdmin.auth.admin.generateLink({
          type: 'signup',
          email: applicationData.email,
          options: {
            redirectTo: `${req.headers.get('origin') || 'https://mydentipay.com'}/auth/callback`
          }
        });

        if (emailError) {
          console.error("Error generating confirmation link:", emailError);
        } else if (linkData?.properties?.action_link) {
          confirmationLink = linkData.properties.action_link;
          console.log("Confirmation link generated successfully");
        }
      }
    } catch (accountError) {
      console.error("Failed to create patient account:", accountError);
      // Don't fail the application submission if account creation fails
    }

    // Send thank you email to the patient (after confirmationLink is ready)
    try {
      const apiKey = Deno.env.get("MAILJET_API_KEY");
      const apiSecret = Deno.env.get("MAILJET_API_SECRET");
      
      if (apiKey && apiSecret && apiKey.trim() !== '' && apiSecret.trim() !== '') {
        const mailjetUrl = 'https://api.mailjet.com/v3.1/send';
        const auth = btoa(`${apiKey}:${apiSecret}`);

        const patientEmailContent = `
          <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #ffffff;">
            <!-- Header with Logo -->
            <div style="background: #ffffff; padding: 30px 20px; text-align: center; border-bottom: 2px solid #f3f4f6;">
              <img src="${Deno.env.get('SUPABASE_URL')}/storage/v1/object/public/assets/dentipay-logo-email.png" alt="DentiPay" style="height: 60px; width: auto; margin-bottom: 20px;" />
              <h1 style="color: #1e3a8a; margin: 0; font-size: 24px; font-weight: 600;">Thank You for Your Application</h1>
            </div>
            
            <!-- Main Content -->
            <div style="padding: 40px 30px;">
              <p style="font-size: 16px; line-height: 1.6; color: #374151; margin-bottom: 20px;">
                Dear ${applicationData.first_name},
              </p>

              <p style="font-size: 16px; line-height: 1.6; color: #374151; margin-bottom: 30px;">
                Thank you for applying for financing with <strong style="color: #1e3a8a;">DentiPay</strong>. We have received your application and our team is reviewing it.
              </p>

              ${confirmationLink ? `
              <!-- Confirm Email Box -->
              <div style="background-color: #eff6ff; border: 2px solid #1e3a8a; border-radius: 8px; padding: 25px; margin: 30px 0; text-align: center;">
                <h2 style="color: #1e3a8a; margin-top: 0; margin-bottom: 15px; font-size: 18px; font-weight: 600;">Confirm Your Email Address</h2>
                <p style="color: #374151; line-height: 1.6; margin-bottom: 20px;">
                  To access your application status and set up your account password, please confirm your email address by clicking the button below:
                </p>
                <a href="${confirmationLink}" style="display: inline-block; background-color: #1e3a8a; color: #ffffff; text-decoration: none; padding: 14px 32px; border-radius: 6px; font-weight: 600; font-size: 16px; margin-top: 10px;">
                  Confirm Email & Set Password
                </a>
                <p style="color: #64748b; font-size: 13px; margin-top: 20px; margin-bottom: 0;">
                  If the button doesn't work, copy and paste this link into your browser:<br/>
                  <span style="word-break: break-all; color: #1e3a8a;">${confirmationLink}</span>
                </p>
              </div>
              ` : ''}

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

        const patientEmailResponse = await fetch(mailjetUrl, {
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

        const patientEmailResult = await patientEmailResponse.json();
        console.log("Mailjet patient email response:", JSON.stringify(patientEmailResult));
        
        if (!patientEmailResponse.ok) {
          console.error("Mailjet patient email failed:", patientEmailResult);
          throw new Error(`Mailjet error: ${JSON.stringify(patientEmailResult)}`);
        }
        
        console.log("Patient thank you email sent successfully");
      }
    } catch (patientEmailError) {
      console.error("Failed to send patient email:", patientEmailError);
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
            storage_path: uploadData.path,
            file_name: fileName,
            file_size: pdfBytes.length,
            mime_type: 'application/pdf'
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
