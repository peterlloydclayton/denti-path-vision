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
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
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
        await resend.emails.send({
          from: 'DentiPay Applications <notifications@mydentipay.com>',
          to: notificationEmails,
          subject: `New Patient Application - ${applicationData.first_name} ${applicationData.last_name}`,
          html: emailHtml,
        });
        console.log('Notification emails sent successfully');
      } catch (emailError) {
        console.error('Failed to send notification emails:', emailError);
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
