import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.57.4";
import { Resend } from "npm:resend@2.0.0";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    // Using the old Supabase database (epkypzawqtpokmatjuzo)
    // TODO: Replace with actual service_role key from your Supabase project settings
    const supabaseClient = createClient(
      'https://epkypzawqtpokmatjuzo.supabase.co',
      'YOUR_SERVICE_ROLE_KEY_HERE' // Get from Supabase Dashboard > Settings > API
    );

    const applicationData = await req.json();
    console.log('Received patient application');

    // Insert application into database
    const { data: insertedData, error: insertError } = await supabaseClient
      .from('patient_applications')
      .insert({
        first_name: applicationData.first_name,
        middle_name: applicationData.middle_name,
        last_name: applicationData.last_name,
        date_of_birth: `${applicationData.date_of_birth.year}-${applicationData.date_of_birth.month}-${applicationData.date_of_birth.day}`,
        ssn: applicationData.ssn,
        drivers_license: applicationData.drivers_license,
        sex: applicationData.sex,
        marital_status: applicationData.marital_status,
        primary_phone: applicationData.primary_phone,
        secondary_phone: applicationData.secondary_phone,
        email: applicationData.email,
        street_address: applicationData.street_address,
        city: applicationData.city,
        state: applicationData.state,
        zip_code: applicationData.zip_code,
        time_at_address: applicationData.time_at_address,
        rent_or_own: applicationData.rent_or_own,
        previous_address: applicationData.previous_address,
        emergency_contact_name: applicationData.emergency_contact_name,
        emergency_contact_relationship: applicationData.emergency_contact_relationship,
        emergency_contact_phone: applicationData.emergency_contact_phone,
        employer_name: applicationData.employer_name,
        job_title: applicationData.job_title,
        employment_status: applicationData.employment_status,
        length_of_employment: applicationData.length_of_employment,
        monthly_income: applicationData.monthly_income,
        monthly_net_income: applicationData.monthly_net_income,
        pay_frequency: applicationData.pay_frequency,
        secondary_income_sources: applicationData.secondary_income_sources,
        household_total_income: applicationData.household_total_income,
        spouse_employer: applicationData.spouse_employer,
        spouse_income: applicationData.spouse_income,
        checking_balance: applicationData.checking_balance,
        savings_balance: applicationData.savings_balance,
        retirement_accounts: applicationData.retirement_accounts,
        investments: applicationData.investments,
        monthly_housing_cost: applicationData.monthly_housing_cost,
        credit_score: applicationData.credit_score,
        considering_treatment_time: applicationData.considering_treatment_time,
        priority_preference: applicationData.priority_preference,
        primary_reason: applicationData.primary_reason,
        timeline_urgency: applicationData.timeline_urgency,
        ready_to_proceed: applicationData.ready_to_proceed,
        consent_credit_pull: applicationData.consent_credit_pull,
        signature_data: applicationData.signature_data,
        status: 'pending'
      })
      .select()
      .single();

    if (insertError) {
      console.error('Database insert error:', insertError);
      throw new Error(`Failed to save application: ${insertError.message}`);
    }

    console.log('Application saved to database:', insertedData.id);

    // Send notification emails
    const resendApiKey = Deno.env.get('RESEND_API_KEY');
    if (resendApiKey) {
      const resend = new Resend(resendApiKey);
      
      // Notification recipients including Adam and Nuttalya
      const notificationEmails = [
        'adam@mydentipay.com',
        'nuttalya@mydentipay.com'
      ];

      const emailHtml = `
        <h2>New Patient Application Received</h2>
        <p><strong>Applicant:</strong> ${applicationData.first_name} ${applicationData.last_name}</p>
        <p><strong>Email:</strong> ${applicationData.email}</p>
        <p><strong>Phone:</strong> ${applicationData.primary_phone}</p>
        <p><strong>Application ID:</strong> ${insertedData.id}</p>
        <p><strong>Submitted:</strong> ${new Date().toLocaleString()}</p>
        <hr>
        <h3>Financial Summary</h3>
        <p><strong>Employment:</strong> ${applicationData.employment_status} at ${applicationData.employer_name}</p>
        <p><strong>Monthly Income:</strong> $${applicationData.monthly_income?.toLocaleString() || 'N/A'}</p>
        <p><strong>Credit Score:</strong> ${applicationData.credit_score || 'Not provided'}</p>
        <hr>
        <p>Log in to the admin portal to review the full application.</p>
      `;

      try {
        // Send notification to admin team
        await resend.emails.send({
          from: 'DentiPay Applications <notifications@mydentipay.com>',
          to: notificationEmails,
          subject: `New Patient Application - ${applicationData.first_name} ${applicationData.last_name}`,
          html: emailHtml,
        });
        console.log('Notification emails sent successfully');

        // Send confirmation email to patient
        const patientConfirmationHtml = `
          <!DOCTYPE html>
          <html>
          <head>
            <style>
              body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
              .container { max-width: 600px; margin: 0 auto; padding: 20px; }
              .header { background: linear-gradient(135deg, #4A90E2 0%, #357ABD 100%); color: white; padding: 30px; text-align: center; border-radius: 8px 8px 0 0; }
              .content { background: #ffffff; padding: 30px; border: 1px solid #e0e0e0; border-top: none; }
              .button { display: inline-block; padding: 15px 30px; background: #4A90E2; color: white; text-decoration: none; border-radius: 6px; font-weight: bold; margin: 20px 0; }
              .info-box { background: #f8f9fa; border-left: 4px solid #4A90E2; padding: 15px; margin: 20px 0; }
              .footer { text-align: center; padding: 20px; color: #666; font-size: 14px; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h1>Application Submitted Successfully!</h1>
              </div>
              <div class="content">
                <p>Dear ${applicationData.first_name} ${applicationData.last_name},</p>
                
                <p>Thank you for submitting your financing application with DentiPay. We've received your application and our team is reviewing it.</p>
                
                <div class="info-box">
                  <strong>Application ID:</strong> ${insertedData.id}<br>
                  <strong>Submitted:</strong> ${new Date().toLocaleString()}<br>
                  <strong>Status:</strong> Under Review
                </div>

                <p><strong>What happens next?</strong></p>
                <ul>
                  <li>Our team will review your application within 24-48 hours</li>
                  <li>We'll contact you via email or phone with your pre-qualification results</li>
                  <li>If approved, you can choose from flexible payment plans that fit your budget</li>
                  <li>Schedule your dental appointment with confidence knowing your financing is ready</li>
                </ul>

                <p style="text-align: center;">
                  <a href="${Deno.env.get('VITE_SUPABASE_URL') || 'https://mydentipay.com'}/patient-portal?application_id=${insertedData.id}" class="button">
                    View Application Status
                  </a>
                </p>

                <p style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e0e0e0;">
                  <strong>Need help?</strong><br>
                  Contact us at <a href="mailto:support@mydentipay.com">support@mydentipay.com</a><br>
                  Or call us at (555) 123-4567
                </p>
              </div>
              <div class="footer">
                <p>© ${new Date().getFullYear()} DentiPay. All rights reserved.</p>
                <p>This email was sent to ${applicationData.email}</p>
              </div>
            </div>
          </body>
          </html>
        `;

        await resend.emails.send({
          from: 'DentiPay <notifications@mydentipay.com>',
          to: [applicationData.email],
          subject: 'Your DentiPay Application Has Been Received',
          html: patientConfirmationHtml,
        });
        console.log('Patient confirmation email sent successfully');

      } catch (emailError) {
        console.error('Failed to send emails:', emailError);
        // Don't throw - application was saved successfully
      }
    } else {
      console.log('RESEND_API_KEY not configured, skipping email notifications');
    }

    return new Response(
      JSON.stringify({ 
        success: true, 
        applicationId: insertedData.id,
        message: 'Application submitted successfully'
      }),
      { 
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );

  } catch (error: any) {
    console.error('Error processing application:', error);
    return new Response(
      JSON.stringify({ 
        success: false,
        error: error.message || 'Failed to process application'
      }),
      { 
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );
  }
});
