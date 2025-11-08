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
    
    // Validate origin
    const origin = req.headers.get('origin')
    console.log('Request origin:', origin)
    
    if (!origin || !isOriginAllowed(origin)) {
      console.error('Unauthorized origin:', origin)
      return new Response(
        JSON.stringify({ error: 'Unauthorized origin' }),
        { 
          status: 403, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      )
    }

    // Rate limiting: Get client IP for basic rate limiting
    const clientIP = req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || 'unknown'
    console.log('Request from IP:', clientIP)

    // Basic bot protection: Check for suspicious user agents
    const userAgent = req.headers.get('user-agent') || ''
    if (!userAgent || userAgent.length < 10) {
      console.error('Suspicious or missing user agent:', userAgent)
      return new Response(
        JSON.stringify({ error: 'Invalid request' }),
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      )
    }

    // Get and validate request body
    console.log('Parsing request body...')
    const applicationData: ApplicationData = await req.json()
    console.log('Application data received:', {
      name: `${applicationData.first_name} ${applicationData.last_name}`,
      email: applicationData.email,
      hasSignatureData: !!applicationData.signature_data,
      clientIP: clientIP,
      referralData: {
        referring_practice: applicationData.referring_practice,
        referring_provider_name: applicationData.referring_provider_name,
        referring_contact_info: applicationData.referring_contact_info,
        estimated_treatment_cost: applicationData.estimated_treatment_cost
      }
    })

    // Enhanced input validation for security
    if (!applicationData.first_name || !applicationData.last_name || !applicationData.email || !applicationData.consent_credit_pull) {
      console.error('Missing required fields:', {
        first_name: !!applicationData.first_name,
        last_name: !!applicationData.last_name,
        email: !!applicationData.email,
        consent_credit_pull: !!applicationData.consent_credit_pull
      })
      return new Response(
        JSON.stringify({ error: 'Missing required fields' }),
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      )
    }

    // Enhanced input validation: Check for reasonable field lengths
    if (applicationData.first_name.length > 100 || 
        applicationData.last_name.length > 100 || 
        applicationData.email.length > 255) {
      console.error('Input fields exceed maximum length')
      return new Response(
        JSON.stringify({ error: 'Input fields exceed maximum allowed length' }),
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      )
    }

    // Validate email format
    console.log('Validating email format...')
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(applicationData.email)) {
      console.error('Invalid email format:', applicationData.email)
      return new Response(
        JSON.stringify({ error: 'Invalid email format' }),
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      )
    }

    // Check for existing application with same email (prevent duplicates)
    console.log('Checking for existing application...')
    const { data: existingApp } = await supabaseAdmin
      .from('temp_patient_applications')
      .select('id, email, created_at')
      .eq('email', applicationData.email)
      .gte('created_at', new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString()) // Within last 24 hours
      .maybeSingle()

    if (existingApp) {
      console.log('Recent application found for:', applicationData.email)
      return new Response(
        JSON.stringify({ 
          error: `A recent application already exists for ${applicationData.email}. Please wait 24 hours before submitting another application.` 
        }),
        { 
          status: 429, // Too Many Requests
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      )
    }

    // Remove signature_data from the application data before inserting
    const { signature_data, ...dbApplicationData } = applicationData

    // Add security metadata and expiration
    const secureApplicationData = {
      ...dbApplicationData,
      expires_at: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(), // 30 days
      created_at: new Date().toISOString()
    }

    // Insert application data using service role (with enhanced security checks)
    console.log('Inserting application data into database...')
    const { data: tempApp, error: appError } = await supabaseAdmin
      .from('temp_patient_applications')
      .insert(secureApplicationData)
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

    // Send email notification after successful application submission
    try {
      const apiKey = Deno.env.get("MAILJET_API_KEY");
      const apiSecret = Deno.env.get("MAILJET_API_SECRET");
      
      if (apiKey && apiSecret && apiKey.trim() !== '' && apiSecret.trim() !== '') {
        const mailjetUrl = 'https://api.mailjet.com/v3.1/send';
        const auth = btoa(`${apiKey}:${apiSecret}`);
        
        const htmlContent = `
          <div style="font-family: Arial, sans-serif; max-width: 800px; margin: 0 auto; padding: 20px;">
            <h1 style="color: #2563eb; border-bottom: 2px solid #2563eb; padding-bottom: 10px;">New Patient Financing Application</h1>
            
            <h2 style="color: #1e40af; margin-top: 30px;">Section 1: Personal Information</h2>
            <table style="width: 100%; border-collapse: collapse;">
              <tr style="background-color: #f3f4f6;">
                <td style="padding: 10px; border: 1px solid #e5e7eb; font-weight: bold;">Name:</td>
                <td style="padding: 10px; border: 1px solid #e5e7eb;">${applicationData.first_name}${applicationData.middle_name ? ` ${applicationData.middle_name}` : ''} ${applicationData.last_name}</td>
              </tr>
              ${applicationData.date_of_birth ? `
              <tr>
                <td style="padding: 10px; border: 1px solid #e5e7eb; font-weight: bold;">Date of Birth:</td>
                <td style="padding: 10px; border: 1px solid #e5e7eb;">${applicationData.date_of_birth}</td>
              </tr>` : ''}
              ${applicationData.ssn ? `
              <tr style="background-color: #f3f4f6;">
                <td style="padding: 10px; border: 1px solid #e5e7eb; font-weight: bold;">SSN:</td>
                <td style="padding: 10px; border: 1px solid #e5e7eb;">${applicationData.ssn.replace(/(\d{3})(\d{2})(\d{4})/, '$1-$2-$3')}</td>
              </tr>` : ''}
              ${applicationData.drivers_license ? `
              <tr>
                <td style="padding: 10px; border: 1px solid #e5e7eb; font-weight: bold;">Driver's License:</td>
                <td style="padding: 10px; border: 1px solid #e5e7eb;">${applicationData.drivers_license}</td>
              </tr>` : ''}
              ${applicationData.sex ? `
              <tr style="background-color: #f3f4f6;">
                <td style="padding: 10px; border: 1px solid #e5e7eb; font-weight: bold;">Sex:</td>
                <td style="padding: 10px; border: 1px solid #e5e7eb;">${applicationData.sex}</td>
              </tr>` : ''}
              ${applicationData.marital_status ? `
              <tr>
                <td style="padding: 10px; border: 1px solid #e5e7eb; font-weight: bold;">Marital Status:</td>
                <td style="padding: 10px; border: 1px solid #e5e7eb;">${applicationData.marital_status}</td>
              </tr>` : ''}
              <tr style="background-color: #f3f4f6;">
                <td style="padding: 10px; border: 1px solid #e5e7eb; font-weight: bold;">Email:</td>
                <td style="padding: 10px; border: 1px solid #e5e7eb;">${applicationData.email}</td>
              </tr>
              ${applicationData.mobile_phone ? `
              <tr>
                <td style="padding: 10px; border: 1px solid #e5e7eb; font-weight: bold;">Mobile Phone:</td>
                <td style="padding: 10px; border: 1px solid #e5e7eb;">${applicationData.mobile_phone}</td>
              </tr>` : ''}
              ${applicationData.secondary_phone ? `
              <tr style="background-color: #f3f4f6;">
                <td style="padding: 10px; border: 1px solid #e5e7eb; font-weight: bold;">Secondary Phone:</td>
                <td style="padding: 10px; border: 1px solid #e5e7eb;">${applicationData.secondary_phone}</td>
              </tr>` : ''}
            </table>

            ${applicationData.home_street_address ? `
            <h2 style="color: #1e40af; margin-top: 30px;">Home Address</h2>
            <table style="width: 100%; border-collapse: collapse;">
              <tr style="background-color: #f3f4f6;">
                <td style="padding: 10px; border: 1px solid #e5e7eb; font-weight: bold;">Home Address:</td>
                <td style="padding: 10px; border: 1px solid #e5e7eb;">${applicationData.home_street_address}${applicationData.home_city ? `, ${applicationData.home_city}` : ''}${applicationData.home_state ? `, ${applicationData.home_state}` : ''} ${applicationData.home_zip || ''}</td>
              </tr>
              ${applicationData.time_at_address ? `
              <tr>
                <td style="padding: 10px; border: 1px solid #e5e7eb; font-weight: bold;">Time at Address:</td>
                <td style="padding: 10px; border: 1px solid #e5e7eb;">${applicationData.time_at_address}</td>
              </tr>` : ''}
              ${applicationData.rent_or_own ? `
              <tr style="background-color: #f3f4f6;">
                <td style="padding: 10px; border: 1px solid #e5e7eb; font-weight: bold;">Rent or Own:</td>
                <td style="padding: 10px; border: 1px solid #e5e7eb;">${applicationData.rent_or_own}</td>
              </tr>` : ''}
              ${applicationData.previous_address ? `
              <tr>
                <td style="padding: 10px; border: 1px solid #e5e7eb; font-weight: bold;">Previous Address:</td>
                <td style="padding: 10px; border: 1px solid #e5e7eb;">${applicationData.previous_address}</td>
              </tr>` : ''}
            </table>
            ` : ''}

            ${(applicationData.emergency_contact_name || applicationData.emergency_contact_phone) ? `
            <h2 style="color: #1e40af; margin-top: 30px;">Emergency Contact</h2>
            <table style="width: 100%; border-collapse: collapse;">
              ${applicationData.emergency_contact_name ? `
              <tr style="background-color: #f3f4f6;">
                <td style="padding: 10px; border: 1px solid #e5e7eb; font-weight: bold;">Name:</td>
                <td style="padding: 10px; border: 1px solid #e5e7eb;">${applicationData.emergency_contact_name}</td>
              </tr>` : ''}
              ${applicationData.emergency_contact_relationship ? `
              <tr>
                <td style="padding: 10px; border: 1px solid #e5e7eb; font-weight: bold;">Relationship:</td>
                <td style="padding: 10px; border: 1px solid #e5e7eb;">${applicationData.emergency_contact_relationship}</td>
              </tr>` : ''}
              ${applicationData.emergency_contact_phone ? `
              <tr style="background-color: #f3f4f6;">
                <td style="padding: 10px; border: 1px solid #e5e7eb; font-weight: bold;">Phone:</td>
                <td style="padding: 10px; border: 1px solid #e5e7eb;">${applicationData.emergency_contact_phone}</td>
              </tr>` : ''}
            </table>
            ` : ''}

            ${(applicationData.referring_practice || applicationData.referring_provider_name || applicationData.referring_contact_info || applicationData.estimated_treatment_cost) ? `
            <h2 style="color: #1e40af; margin-top: 30px;">Referral Information</h2>
            <table style="width: 100%; border-collapse: collapse;">
              ${applicationData.referring_practice ? `
              <tr style="background-color: #f3f4f6;">
                <td style="padding: 10px; border: 1px solid #e5e7eb; font-weight: bold;">Referring Practice:</td>
                <td style="padding: 10px; border: 1px solid #e5e7eb;">${applicationData.referring_practice}</td>
              </tr>` : ''}
              ${applicationData.referring_provider_name ? `
              <tr>
                <td style="padding: 10px; border: 1px solid #e5e7eb; font-weight: bold;">Provider Full Name:</td>
                <td style="padding: 10px; border: 1px solid #e5e7eb;">${applicationData.referring_provider_name}</td>
              </tr>` : ''}
              ${applicationData.referring_contact_info ? `
              <tr style="background-color: #f3f4f6;">
                <td style="padding: 10px; border: 1px solid #e5e7eb; font-weight: bold;">Referring Contact Info:</td>
                <td style="padding: 10px; border: 1px solid #e5e7eb;">${applicationData.referring_contact_info}</td>
              </tr>` : ''}
              ${applicationData.referring_provider_email ? `
              <tr>
                <td style="padding: 10px; border: 1px solid #e5e7eb; font-weight: bold;">Dental Provider Email:</td>
                <td style="padding: 10px; border: 1px solid #e5e7eb;">${applicationData.referring_provider_email}</td>
              </tr>` : ''}
              ${applicationData.estimated_treatment_cost ? `
              <tr>
                <td style="padding: 10px; border: 1px solid #e5e7eb; font-weight: bold;">Estimated Treatment Plan Cost:</td>
                <td style="padding: 10px; border: 1px solid #e5e7eb;">$${typeof applicationData.estimated_treatment_cost === 'number' ? applicationData.estimated_treatment_cost.toLocaleString() : applicationData.estimated_treatment_cost}</td>
              </tr>` : ''}
            </table>
            ` : ''}

            ${applicationData.employment_status ? `
            <h2 style="color: #1e40af; margin-top: 30px;">Section 2: Employment & Income</h2>
            <table style="width: 100%; border-collapse: collapse;">
              ${applicationData.employer_name ? `
              <tr style="background-color: #f3f4f6;">
                <td style="padding: 10px; border: 1px solid #e5e7eb; font-weight: bold;">Current Employer:</td>
                <td style="padding: 10px; border: 1px solid #e5e7eb;">${applicationData.employer_name}</td>
              </tr>` : ''}
              ${applicationData.job_title ? `
              <tr>
                <td style="padding: 10px; border: 1px solid #e5e7eb; font-weight: bold;">Job Title:</td>
                <td style="padding: 10px; border: 1px solid #e5e7eb;">${applicationData.job_title}</td>
              </tr>` : ''}
              ${applicationData.length_of_employment ? `
              <tr style="background-color: #f3f4f6;">
                <td style="padding: 10px; border: 1px solid #e5e7eb; font-weight: bold;">Time at Job:</td>
                <td style="padding: 10px; border: 1px solid #e5e7eb;">${applicationData.length_of_employment}</td>
              </tr>` : ''}
              ${applicationData.monthly_income ? `
              <tr>
                <td style="padding: 10px; border: 1px solid #e5e7eb; font-weight: bold;">Gross Monthly Income:</td>
                <td style="padding: 10px; border: 1px solid #e5e7eb;">$${applicationData.monthly_income.toLocaleString()}</td>
              </tr>` : ''}
              ${applicationData.monthly_net_income ? `
              <tr style="background-color: #f3f4f6;">
                <td style="padding: 10px; border: 1px solid #e5e7eb; font-weight: bold;">Net Monthly Income:</td>
                <td style="padding: 10px; border: 1px solid #e5e7eb;">$${applicationData.monthly_net_income.toLocaleString()}</td>
              </tr>` : ''}
              ${applicationData.household_total_income ? `
              <tr>
                <td style="padding: 10px; border: 1px solid #e5e7eb; font-weight: bold;">Household Income:</td>
                <td style="padding: 10px; border: 1px solid #e5e7eb;">$${applicationData.household_total_income.toLocaleString()}</td>
              </tr>` : ''}
              ${applicationData.employment_status ? `
              <tr style="background-color: #f3f4f6;">
                <td style="padding: 10px; border: 1px solid #e5e7eb; font-weight: bold;">Employment Type:</td>
                <td style="padding: 10px; border: 1px solid #e5e7eb;">${applicationData.employment_status}</td>
              </tr>` : ''}
              ${applicationData.pay_frequency ? `
              <tr>
                <td style="padding: 10px; border: 1px solid #e5e7eb; font-weight: bold;">Pay Frequency:</td>
                <td style="padding: 10px; border: 1px solid #e5e7eb;">${applicationData.pay_frequency}</td>
              </tr>` : ''}
              ${applicationData.secondary_income_sources ? `
              <tr style="background-color: #f3f4f6;">
                <td style="padding: 10px; border: 1px solid #e5e7eb; font-weight: bold;">Secondary Income:</td>
                <td style="padding: 10px; border: 1px solid #e5e7eb;">${applicationData.secondary_income_sources}</td>
              </tr>` : ''}
              ${applicationData.spouse_employer ? `
              <tr>
                <td style="padding: 10px; border: 1px solid #e5e7eb; font-weight: bold;">Spouse Employer:</td>
                <td style="padding: 10px; border: 1px solid #e5e7eb;">${applicationData.spouse_employer}</td>
              </tr>` : ''}
              ${applicationData.spouse_income ? `
              <tr style="background-color: #f3f4f6;">
                <td style="padding: 10px; border: 1px solid #e5e7eb; font-weight: bold;">Spouse Income:</td>
                <td style="padding: 10px; border: 1px solid #e5e7eb;">$${applicationData.spouse_income.toLocaleString()}</td>
              </tr>` : ''}
            </table>
            ` : ''}

            ${(applicationData.checking_balance || applicationData.savings_balance || applicationData.retirement_accounts || applicationData.investments || applicationData.cash_on_hand || applicationData.home_equity || applicationData.owned_vehicles || applicationData.business_ownership || applicationData.years_at_job || applicationData.work_phone) ? `
            <h2 style="color: #1e40af; margin-top: 30px;">Section 3: Assets</h2>
            <table style="width: 100%; border-collapse: collapse;">
              ${applicationData.checking_balance ? `
              <tr style="background-color: #f3f4f6;">
                <td style="padding: 10px; border: 1px solid #e5e7eb; font-weight: bold;">Checking Balance:</td>
                <td style="padding: 10px; border: 1px solid #e5e7eb;">$${applicationData.checking_balance.toLocaleString()}</td>
              </tr>` : ''}
              ${applicationData.savings_balance ? `
              <tr>
                <td style="padding: 10px; border: 1px solid #e5e7eb; font-weight: bold;">Savings Balance:</td>
                <td style="padding: 10px; border: 1px solid #e5e7eb;">$${applicationData.savings_balance.toLocaleString()}</td>
              </tr>` : ''}
              ${applicationData.retirement_accounts ? `
              <tr style="background-color: #f3f4f6;">
                <td style="padding: 10px; border: 1px solid #e5e7eb; font-weight: bold;">Retirement Accounts:</td>
                <td style="padding: 10px; border: 1px solid #e5e7eb;">$${applicationData.retirement_accounts.toLocaleString()}</td>
              </tr>` : ''}
              ${applicationData.investments ? `
              <tr>
                <td style="padding: 10px; border: 1px solid #e5e7eb; font-weight: bold;">Investments:</td>
                <td style="padding: 10px; border: 1px solid #e5e7eb;">$${applicationData.investments.toLocaleString()}</td>
              </tr>` : ''}
              ${applicationData.cash_on_hand ? `
              <tr style="background-color: #f3f4f6;">
                <td style="padding: 10px; border: 1px solid #e5e7eb; font-weight: bold;">Cash on Hand:</td>
                <td style="padding: 10px; border: 1px solid #e5e7eb;">$${applicationData.cash_on_hand.toLocaleString()}</td>
              </tr>` : ''}
              ${applicationData.home_equity ? `
              <tr>
                <td style="padding: 10px; border: 1px solid #e5e7eb; font-weight: bold;">Home Equity:</td>
                <td style="padding: 10px; border: 1px solid #e5e7eb;">$${applicationData.home_equity.toLocaleString()}</td>
              </tr>` : ''}
              ${applicationData.owned_vehicles ? `
              <tr style="background-color: #f3f4f6;">
                <td style="padding: 10px; border: 1px solid #e5e7eb; font-weight: bold;">Owned Vehicles Value:</td>
                <td style="padding: 10px; border: 1px solid #e5e7eb;">$${applicationData.owned_vehicles.toLocaleString()}</td>
              </tr>` : ''}
              ${applicationData.business_ownership ? `
              <tr>
                <td style="padding: 10px; border: 1px solid #e5e7eb; font-weight: bold;">Business Ownership Value:</td>
                <td style="padding: 10px; border: 1px solid #e5e7eb;">$${applicationData.business_ownership.toLocaleString()}</td>
              </tr>` : ''}
              ${applicationData.years_at_job ? `
              <tr style="background-color: #f3f4f6;">
                <td style="padding: 10px; border: 1px solid #e5e7eb; font-weight: bold;">Years at Job:</td>
                <td style="padding: 10px; border: 1px solid #e5e7eb;">${applicationData.years_at_job}</td>
              </tr>` : ''}
              ${applicationData.work_phone ? `
              <tr>
                <td style="padding: 10px; border: 1px solid #e5e7eb; font-weight: bold;">Work Phone:</td>
                <td style="padding: 10px; border: 1px solid #e5e7eb;">${applicationData.work_phone}</td>
              </tr>` : ''}
            </table>
            ` : ''}

            ${(applicationData.monthly_housing_cost || applicationData.mortgage_balance || applicationData.credit_card_balances || applicationData.auto_loans || applicationData.student_loans || applicationData.personal_loans || applicationData.medical_bills || applicationData.alimony_child_support) ? `
            <h2 style="color: #1e40af; margin-top: 30px;">Section 4: Liabilities</h2>
            <table style="width: 100%; border-collapse: collapse;">
              ${applicationData.monthly_housing_cost ? `
              <tr style="background-color: #f3f4f6;">
                <td style="padding: 10px; border: 1px solid #e5e7eb; font-weight: bold;">Monthly Housing Cost:</td>
                <td style="padding: 10px; border: 1px solid #e5e7eb;">$${applicationData.monthly_housing_cost.toLocaleString()}</td>
              </tr>` : ''}
              ${applicationData.mortgage_balance ? `
              <tr>
                <td style="padding: 10px; border: 1px solid #e5e7eb; font-weight: bold;">Mortgage Balance:</td>
                <td style="padding: 10px; border: 1px solid #e5e7eb;">$${applicationData.mortgage_balance.toLocaleString()}</td>
              </tr>` : ''}
              ${applicationData.credit_card_balances ? `
              <tr style="background-color: #f3f4f6;">
                <td style="padding: 10px; border: 1px solid #e5e7eb; font-weight: bold;">Credit Card Balances:</td>
                <td style="padding: 10px; border: 1px solid #e5e7eb;">$${applicationData.credit_card_balances.toLocaleString()}</td>
              </tr>` : ''}
              ${applicationData.auto_loans ? `
              <tr>
                <td style="padding: 10px; border: 1px solid #e5e7eb; font-weight: bold;">Auto Loans:</td>
                <td style="padding: 10px; border: 1px solid #e5e7eb;">$${applicationData.auto_loans.toLocaleString()}</td>
              </tr>` : ''}
              ${applicationData.student_loans ? `
              <tr style="background-color: #f3f4f6;">
                <td style="padding: 10px; border: 1px solid #e5e7eb; font-weight: bold;">Student Loans:</td>
                <td style="padding: 10px; border: 1px solid #e5e7eb;">$${applicationData.student_loans.toLocaleString()}</td>
              </tr>` : ''}
              ${applicationData.personal_loans ? `
              <tr>
                <td style="padding: 10px; border: 1px solid #e5e7eb; font-weight: bold;">Personal Loans:</td>
                <td style="padding: 10px; border: 1px solid #e5e7eb;">$${applicationData.personal_loans.toLocaleString()}</td>
              </tr>` : ''}
              ${applicationData.medical_bills ? `
              <tr style="background-color: #f3f4f6;">
                <td style="padding: 10px; border: 1px solid #e5e7eb; font-weight: bold;">Medical Bills:</td>
                <td style="padding: 10px; border: 1px solid #e5e7eb;">$${applicationData.medical_bills.toLocaleString()}</td>
              </tr>` : ''}
              ${applicationData.alimony_child_support ? `
              <tr>
                <td style="padding: 10px; border: 1px solid #e5e7eb; font-weight: bold;">Alimony/Child Support:</td>
                <td style="padding: 10px; border: 1px solid #e5e7eb;">$${applicationData.alimony_child_support.toLocaleString()}</td>
              </tr>` : ''}
            </table>
            ` : ''}

            ${(applicationData.credit_score || applicationData.open_credit_lines || applicationData.late_payments || applicationData.bankruptcy_history || applicationData.foreclosure_history || applicationData.recent_major_purchases) ? `
            <h2 style="color: #1e40af; margin-top: 30px;">Section 5: Credit Information</h2>
            <table style="width: 100%; border-collapse: collapse;">
              ${applicationData.credit_score ? `
              <tr style="background-color: #f3f4f6;">
                <td style="padding: 10px; border: 1px solid #e5e7eb; font-weight: bold;">Credit Score:</td>
                <td style="padding: 10px; border: 1px solid #e5e7eb;">${applicationData.credit_score}</td>
              </tr>` : ''}
              ${applicationData.open_credit_lines ? `
              <tr>
                <td style="padding: 10px; border: 1px solid #e5e7eb; font-weight: bold;">Open Credit Lines:</td>
                <td style="padding: 10px; border: 1px solid #e5e7eb;">${applicationData.open_credit_lines}</td>
              </tr>` : ''}
              ${applicationData.late_payments ? `
              <tr style="background-color: #f3f4f6;">
                <td style="padding: 10px; border: 1px solid #e5e7eb; font-weight: bold;">Late Payments:</td>
                <td style="padding: 10px; border: 1px solid #e5e7eb;">${applicationData.late_payments}</td>
              </tr>` : ''}
              ${applicationData.bankruptcy_history !== null ? `
              <tr>
                <td style="padding: 10px; border: 1px solid #e5e7eb; font-weight: bold;">Bankruptcy History:</td>
                <td style="padding: 10px; border: 1px solid #e5e7eb;">${applicationData.bankruptcy_history ? 'Yes' : 'No'}</td>
              </tr>` : ''}
              ${applicationData.foreclosure_history !== null ? `
              <tr style="background-color: #f3f4f6;">
                <td style="padding: 10px; border: 1px solid #e5e7eb; font-weight: bold;">Foreclosure History:</td>
                <td style="padding: 10px; border: 1px solid #e5e7eb;">${applicationData.foreclosure_history ? 'Yes' : 'No'}</td>
              </tr>` : ''}
              ${applicationData.recent_major_purchases ? `
              <tr>
                <td style="padding: 10px; border: 1px solid #e5e7eb; font-weight: bold;">Recent Major Purchases:</td>
                <td style="padding: 10px; border: 1px solid #e5e7eb;">${applicationData.recent_major_purchases}</td>
              </tr>` : ''}
            </table>
            ` : ''}

            ${(applicationData.primary_reason || applicationData.timeline_urgency || applicationData.expected_procedures || applicationData.estimated_cost || applicationData.insurance_coverage || applicationData.financing_preferences || applicationData.previous_treatment || applicationData.comfort_discussing_financing || applicationData.considering_treatment_time || applicationData.priority_preference || applicationData.ready_to_proceed) ? `
            <h2 style="color: #1e40af; margin-top: 30px;">Section 6: Treatment Information</h2>
            <table style="width: 100%; border-collapse: collapse;">
              ${applicationData.primary_reason ? `
              <tr style="background-color: #f3f4f6;">
                <td style="padding: 10px; border: 1px solid #e5e7eb; font-weight: bold;">Primary Reason:</td>
                <td style="padding: 10px; border: 1px solid #e5e7eb;">${applicationData.primary_reason}</td>
              </tr>` : ''}
              ${applicationData.expected_procedures ? `
              <tr>
                <td style="padding: 10px; border: 1px solid #e5e7eb; font-weight: bold;">Expected Procedures:</td>
                <td style="padding: 10px; border: 1px solid #e5e7eb;">${applicationData.expected_procedures}</td>
              </tr>` : ''}
              ${applicationData.estimated_cost ? `
              <tr style="background-color: #f3f4f6;">
                <td style="padding: 10px; border: 1px solid #e5e7eb; font-weight: bold;">Estimated Cost:</td>
                <td style="padding: 10px; border: 1px solid #e5e7eb;">$${applicationData.estimated_cost.toLocaleString()}</td>
              </tr>` : ''}
              ${applicationData.timeline_urgency ? `
              <tr>
                <td style="padding: 10px; border: 1px solid #e5e7eb; font-weight: bold;">Timeline/Urgency:</td>
                <td style="padding: 10px; border: 1px solid #e5e7eb;">${applicationData.timeline_urgency}</td>
              </tr>` : ''}
              ${applicationData.insurance_coverage ? `
              <tr style="background-color: #f3f4f6;">
                <td style="padding: 10px; border: 1px solid #e5e7eb; font-weight: bold;">Insurance Coverage:</td>
                <td style="padding: 10px; border: 1px solid #e5e7eb;">${applicationData.insurance_coverage}</td>
              </tr>` : ''}
              ${applicationData.financing_preferences ? `
              <tr>
                <td style="padding: 10px; border: 1px solid #e5e7eb; font-weight: bold;">Financing Preferences:</td>
                <td style="padding: 10px; border: 1px solid #e5e7eb;">${applicationData.financing_preferences}</td>
              </tr>` : ''}
              ${applicationData.previous_treatment ? `
              <tr style="background-color: #f3f4f6;">
                <td style="padding: 10px; border: 1px solid #e5e7eb; font-weight: bold;">Previous Treatment:</td>
                <td style="padding: 10px; border: 1px solid #e5e7eb;">${applicationData.previous_treatment}</td>
              </tr>` : ''}
              ${applicationData.comfort_discussing_financing ? `
              <tr>
                <td style="padding: 10px; border: 1px solid #e5e7eb; font-weight: bold;">Comfort Discussing Financing (1-10):</td>
                <td style="padding: 10px; border: 1px solid #e5e7eb;">${applicationData.comfort_discussing_financing}</td>
              </tr>` : ''}
              ${applicationData.considering_treatment_time ? `
              <tr style="background-color: #f3f4f6;">
                <td style="padding: 10px; border: 1px solid #e5e7eb; font-weight: bold;">Considering Treatment Time:</td>
                <td style="padding: 10px; border: 1px solid #e5e7eb;">${applicationData.considering_treatment_time}</td>
              </tr>` : ''}
              ${applicationData.priority_preference ? `
              <tr>
                <td style="padding: 10px; border: 1px solid #e5e7eb; font-weight: bold;">Priority Preference:</td>
                <td style="padding: 10px; border: 1px solid #e5e7eb;">${applicationData.priority_preference}</td>
              </tr>` : ''}
              ${applicationData.ready_to_proceed ? `
              <tr style="background-color: #f3f4f6;">
                <td style="padding: 10px; border: 1px solid #e5e7eb; font-weight: bold;">Ready to Proceed:</td>
                <td style="padding: 10px; border: 1px solid #e5e7eb;">${applicationData.ready_to_proceed}</td>
              </tr>` : ''}
            </table>
            ` : ''}

            ${(applicationData.pain_level || applicationData.primary_motivator || applicationData.decision_making_style || applicationData.confidence_impact || applicationData.obstacles || applicationData.others_involved || applicationData.trust_factors || applicationData.negative_experiences) ? `
            <h2 style="color: #1e40af; margin-top: 30px;">Section 7: Patient Psychology</h2>
            <table style="width: 100%; border-collapse: collapse;">
              ${applicationData.pain_level ? `
              <tr style="background-color: #f3f4f6;">
                <td style="padding: 10px; border: 1px solid #e5e7eb; font-weight: bold;">Pain Level (1-10):</td>
                <td style="padding: 10px; border: 1px solid #e5e7eb;">${applicationData.pain_level}</td>
              </tr>` : ''}
              ${applicationData.primary_motivator ? `
              <tr>
                <td style="padding: 10px; border: 1px solid #e5e7eb; font-weight: bold;">Primary Motivator:</td>
                <td style="padding: 10px; border: 1px solid #e5e7eb;">${applicationData.primary_motivator}</td>
              </tr>` : ''}
              ${applicationData.decision_making_style ? `
              <tr style="background-color: #f3f4f6;">
                <td style="padding: 10px; border: 1px solid #e5e7eb; font-weight: bold;">Decision Making Style:</td>
                <td style="padding: 10px; border: 1px solid #e5e7eb;">${applicationData.decision_making_style}</td>
              </tr>` : ''}
              ${applicationData.confidence_impact ? `
              <tr>
                <td style="padding: 10px; border: 1px solid #e5e7eb; font-weight: bold;">Confidence Impact:</td>
                <td style="padding: 10px; border: 1px solid #e5e7eb;">${applicationData.confidence_impact}</td>
              </tr>` : ''}
              ${applicationData.obstacles ? `
              <tr style="background-color: #f3f4f6;">
                <td style="padding: 10px; border: 1px solid #e5e7eb; font-weight: bold;">Obstacles:</td>
                <td style="padding: 10px; border: 1px solid #e5e7eb;">${applicationData.obstacles}</td>
              </tr>` : ''}
              ${applicationData.others_involved ? `
              <tr>
                <td style="padding: 10px; border: 1px solid #e5e7eb; font-weight: bold;">Others Involved:</td>
                <td style="padding: 10px; border: 1px solid #e5e7eb;">${applicationData.others_involved}</td>
              </tr>` : ''}
              ${applicationData.trust_factors ? `
              <tr style="background-color: #f3f4f6;">
                <td style="padding: 10px; border: 1px solid #e5e7eb; font-weight: bold;">Trust Factors:</td>
                <td style="padding: 10px; border: 1px solid #e5e7eb;">${applicationData.trust_factors}</td>
              </tr>` : ''}
              ${applicationData.negative_experiences ? `
              <tr>
                <td style="padding: 10px; border: 1px solid #e5e7eb; font-weight: bold;">Negative Experiences:</td>
                <td style="padding: 10px; border: 1px solid #e5e7eb;">${applicationData.negative_experiences}</td>
              </tr>` : ''}
            </table>
            ` : ''}

            <h2 style="color: #1e40af; margin-top: 30px;">Section 8: Consent & Commitment</h2>
            <table style="width: 100%; border-collapse: collapse;">
              <tr style="background-color: #f3f4f6;">
                <td style="padding: 10px; border: 1px solid #e5e7eb; font-weight: bold;">Credit Pull Consent:</td>
                <td style="padding: 10px; border: 1px solid #e5e7eb;">${applicationData.consent_credit_pull ? '✓ Yes' : '✗ No'}</td>
              </tr>
              ${applicationData.target_payment_range ? `
              <tr>
                <td style="padding: 10px; border: 1px solid #e5e7eb; font-weight: bold;">Target Payment Range:</td>
                <td style="padding: 10px; border: 1px solid #e5e7eb;">${applicationData.target_payment_range}</td>
              </tr>` : ''}
              ${applicationData.commitment_level ? `
              <tr style="background-color: #f3f4f6;">
                <td style="padding: 10px; border: 1px solid #e5e7eb; font-weight: bold;">Commitment Level (1-10):</td>
                <td style="padding: 10px; border: 1px solid #e5e7eb;">${applicationData.commitment_level}</td>
              </tr>` : ''}
              ${applicationData.can_provide_proof !== null ? `
              <tr>
                <td style="padding: 10px; border: 1px solid #e5e7eb; font-weight: bold;">Can Provide Proof of Income:</td>
                <td style="padding: 10px; border: 1px solid #e5e7eb;">${applicationData.can_provide_proof ? '✓ Yes' : '✗ No'}</td>
              </tr>` : ''}
              ${applicationData.comfort_auto_debit !== null ? `
              <tr style="background-color: #f3f4f6;">
                <td style="padding: 10px; border: 1px solid #e5e7eb; font-weight: bold;">Comfortable with Auto-Debit:</td>
                <td style="padding: 10px; border: 1px solid #e5e7eb;">${applicationData.comfort_auto_debit ? '✓ Yes' : '✗ No'}</td>
              </tr>` : ''}
              ${applicationData.ready_for_call !== null ? `
              <tr>
                <td style="padding: 10px; border: 1px solid #e5e7eb; font-weight: bold;">Ready for Follow-up Call:</td>
                <td style="padding: 10px; border: 1px solid #e5e7eb;">${applicationData.ready_for_call ? '✓ Yes' : '✗ No'}</td>
              </tr>` : ''}
              ${applicationData.ready_for_deposit !== null ? `
              <tr style="background-color: #f3f4f6;">
                <td style="padding: 10px; border: 1px solid #e5e7eb; font-weight: bold;">Ready to Make Deposit:</td>
                <td style="padding: 10px; border: 1px solid #e5e7eb;">${applicationData.ready_for_deposit ? '✓ Yes' : '✗ No'}</td>
              </tr>` : ''}
            </table>

            ${applicationData.additional_info ? `
            <h2 style="color: #1e40af; margin-top: 30px;">Additional Information</h2>
            <p style="padding: 10px; background-color: #f3f4f6; border: 1px solid #e5e7eb; border-radius: 4px;">${applicationData.additional_info}</p>
            ` : ''}

            ${applicationData.signature_data ? `
            <h2 style="color: #1e40af; margin-top: 30px;">Signature Information</h2>
            <table style="width: 100%; border-collapse: collapse;">
              <tr style="background-color: #f3f4f6;">
                <td style="padding: 10px; border: 1px solid #e5e7eb; font-weight: bold;">Signed By:</td>
                <td style="padding: 10px; border: 1px solid #e5e7eb;">${applicationData.signature_data.signer_name}</td>
              </tr>
              <tr>
                <td style="padding: 10px; border: 1px solid #e5e7eb; font-weight: bold;">Signer Email:</td>
                <td style="padding: 10px; border: 1px solid #e5e7eb;">${applicationData.signature_data.signer_email}</td>
              </tr>
              <tr style="background-color: #f3f4f6;">
                <td style="padding: 10px; border: 1px solid #e5e7eb; font-weight: bold;">IP Address:</td>
                <td style="padding: 10px; border: 1px solid #e5e7eb;">${applicationData.signature_data.ip_address}</td>
              </tr>
              <tr>
                <td style="padding: 10px; border: 1px solid #e5e7eb; font-weight: bold;">Consent Given:</td>
                <td style="padding: 10px; border: 1px solid #e5e7eb;">${applicationData.signature_data.consent_given ? '✓ Yes' : '✗ No'}</td>
              </tr>
            </table>
            ` : ''}
            
            <p style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb; color: #6b7280; font-size: 12px;">
              <em>This email was automatically generated from the DentiPay patient financing application form.</em><br>
              <em>Application ID: ${tempApp.id}</em>
            </p>
          </div>
        `;

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
                  Name: "DentiPay"
                },
                To: [
                  { Email: "peter@mydentipay.com" },
                  { Email: "adam@mydentipay.com" },
                  { Email: "nuttalya@mydentipay.com" },
                  ...(applicationData.referring_provider_email ? [{ Email: applicationData.referring_provider_email }] : [])
                ],
                Subject: `New Patient Financing Application - ${applicationData.first_name} ${applicationData.last_name}`,
                HTMLPart: htmlContent
              }
            ]
          })
        });

        const emailData = await emailResponse.json();
        console.log("Email sent successfully via Mailjet:", emailData);

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

        const patientEmailData = await patientEmailResponse.json();
        console.log("Patient thank you email sent successfully:", patientEmailData);

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
        // Decode base64 PDF
        const pdfBytes = Uint8Array.from(atob(sig.pdf_base64), c => c.charCodeAt(0))
        console.log('PDF decoded, size:', pdfBytes.length, 'bytes')
        
        // Upload PDF to storage using service role
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

        // Insert signature record
        console.log('Inserting signature record...')
        const { data: signatureData, error: signatureError } = await supabaseAdmin
          .from('signatures')
          .insert({
            document_id: null, // No specific document reference needed for temp applications
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
        console.log('Signature record created with ID:', signatureData.id)

        // Link signed document
        console.log('Linking signed document...')
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
        // Application is already saved, return partial success
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
    console.error('Error message:', error instanceof Error ? error.message : 'Unknown error')
    console.error('Error stack:', error instanceof Error ? error.stack : 'No stack trace')
    
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