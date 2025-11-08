import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface PatientFormData {
  // Section 1 - Personal Information
  firstName: string;
  middleName?: string;
  lastName: string;
  dateOfBirth: string;
  ssnLast4: string;
  driversLicense: string;
  homeAddress: string;
  previousAddress?: string;
  email: string;
  mobilePhone: string;
  preferredContact: string;

  // Section 2 - Employment & Income
  currentEmployer: string;
  jobTitle: string;
  employerAddress: string;
  timeAtJob: string;
  previousEmployer?: string;
  grossMonthlyIncome: string;
  netMonthlyIncome: string;
  otherIncome?: string;
  householdIncome: string;
  employmentType: string;
  primaryBank: string;

  // Section 3 - Assets
  checkingBalance: string;
  savingsBalance: string;
  retirementAccounts?: string;
  investments?: string;
  cashOnHand?: string;
  homeEquity?: string;
  ownedVehicles?: string;
  businessOwnership?: string;

  // Section 4 - Liabilities
  monthlyHousingCost: string;
  mortgageBalance?: string;
  autoLoans?: string;
  studentLoans?: string;
  creditCardBalances?: string;
  personalLoans?: string;
  medicalBills?: string;
  alimonyChildSupport?: string;

  // Section 5 - Credit Information
  creditScore: string;
  openCreditLines: string;
  recentMajorPurchases?: string;
  bankruptcyHistory: boolean;
  foreclosureHistory: boolean;
  latePayments?: string;

  // Section 6 - Treatment Information
  primaryReason: string;
  timelineUrgency: string;
  previousTreatment?: string;
  expectedProcedures: string;
  estimatedCost: string;
  insuranceCoverage: string;
  financingPreferences?: string;
  comfortDiscussingFinancing: string;

  // Section 7 - Patient Psychology
  painLevel: string;
  primaryMotivator: string;
  confidenceImpact?: string;
  negativeExperiences?: string;
  trustFactors?: string;
  decisionMakingStyle: string;
  othersInvolved?: string;
  obstacles?: string;

  // Section 8 - Consent & Commitment
  consentCreditPull: boolean;
  targetPaymentRange: string;
  comfortAutoDebit: boolean;
  canProvideProof: boolean;
  commitmentLevel: string;
  readyForCall: boolean;
  readyForDeposit: boolean;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  console.log("Patient contact form submission received");
  
  try {
    // Parse the form data
    const formData: PatientFormData = await req.json();
    console.log("Form data parsed successfully for:", formData.firstName, formData.lastName);

    // Check if we have the Mailjet API key
    const apiKey = Deno.env.get("MAILJET_API_KEY");
    const apiSecret = Deno.env.get("MAILJET_API_SECRET");
    console.log("Mailjet API key status:", apiKey ? "available" : "missing");
    console.log("Mailjet API secret status:", apiSecret ? "available" : "missing");

    if (!apiKey || apiKey.trim() === '' || !apiSecret || apiSecret.trim() === '') {
      // API key not configured - return success but don't send email
      console.log("MAILJET_API_KEY or MAILJET_API_SECRET not configured, skipping email send");
      
      return new Response(JSON.stringify({ 
        success: true,
        message: "Form submitted successfully. Email notifications will be configured soon.",
        emailSent: false,
        formData: {
          name: `${formData.firstName} ${formData.lastName}`,
          email: formData.email,
          phone: formData.mobilePhone
        }
      }), {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          ...corsHeaders,
        },
      });
    }

    // If we reach here, we have API credentials - try to send email
    try {
      const mailjetUrl = 'https://api.mailjet.com/v3.1/send';
      const auth = btoa(`${apiKey}:${apiSecret}`);
      
      const htmlContent = `
          <div style="font-family: Arial, sans-serif; max-width: 800px; margin: 0 auto; padding: 20px;">
            <h1 style="color: #2563eb; border-bottom: 2px solid #2563eb; padding-bottom: 10px;">New Patient Financing Application</h1>
            
            <h2 style="color: #1e40af; margin-top: 30px;">Section 1: Personal Information</h2>
            <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
              <tr><td style="padding: 5px; font-weight: bold;">Name:</td><td style="padding: 5px;">${formData.firstName} ${formData.middleName || ''} ${formData.lastName}</td></tr>
              <tr><td style="padding: 5px; font-weight: bold;">Date of Birth:</td><td style="padding: 5px;">${formData.dateOfBirth}</td></tr>
              <tr><td style="padding: 5px; font-weight: bold;">SSN Last 4:</td><td style="padding: 5px;">****${formData.ssnLast4}</td></tr>
              <tr><td style="padding: 5px; font-weight: bold;">Driver's License:</td><td style="padding: 5px;">${formData.driversLicense}</td></tr>
              <tr><td style="padding: 5px; font-weight: bold;">Home Address:</td><td style="padding: 5px;">${formData.homeAddress}</td></tr>
              ${formData.previousAddress ? `<tr><td style="padding: 5px; font-weight: bold;">Previous Address:</td><td style="padding: 5px;">${formData.previousAddress}</td></tr>` : ''}
              <tr><td style="padding: 5px; font-weight: bold;">Email:</td><td style="padding: 5px;">${formData.email}</td></tr>
              <tr><td style="padding: 5px; font-weight: bold;">Mobile Phone:</td><td style="padding: 5px;">${formData.mobilePhone}</td></tr>
              <tr><td style="padding: 5px; font-weight: bold;">Preferred Contact:</td><td style="padding: 5px;">${formData.preferredContact}</td></tr>
            </table>

            <h2 style="color: #1e40af; margin-top: 30px;">Section 2: Employment & Income</h2>
            <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
              <tr><td style="padding: 5px; font-weight: bold;">Current Employer:</td><td style="padding: 5px;">${formData.currentEmployer}</td></tr>
              <tr><td style="padding: 5px; font-weight: bold;">Job Title:</td><td style="padding: 5px;">${formData.jobTitle}</td></tr>
              <tr><td style="padding: 5px; font-weight: bold;">Employer Address:</td><td style="padding: 5px;">${formData.employerAddress}</td></tr>
              <tr><td style="padding: 5px; font-weight: bold;">Time at Job:</td><td style="padding: 5px;">${formData.timeAtJob}</td></tr>
              ${formData.previousEmployer ? `<tr><td style="padding: 5px; font-weight: bold;">Previous Employer:</td><td style="padding: 5px;">${formData.previousEmployer}</td></tr>` : ''}
              <tr><td style="padding: 5px; font-weight: bold;">Gross Monthly Income:</td><td style="padding: 5px;">${formData.grossMonthlyIncome}</td></tr>
              <tr><td style="padding: 5px; font-weight: bold;">Net Monthly Income:</td><td style="padding: 5px;">${formData.netMonthlyIncome}</td></tr>
              ${formData.otherIncome ? `<tr><td style="padding: 5px; font-weight: bold;">Other Income:</td><td style="padding: 5px;">${formData.otherIncome}</td></tr>` : ''}
              <tr><td style="padding: 5px; font-weight: bold;">Household Income:</td><td style="padding: 5px;">${formData.householdIncome}</td></tr>
              <tr><td style="padding: 5px; font-weight: bold;">Employment Type:</td><td style="padding: 5px;">${formData.employmentType}</td></tr>
              <tr><td style="padding: 5px; font-weight: bold;">Primary Bank:</td><td style="padding: 5px;">${formData.primaryBank}</td></tr>
            </table>

            <h2 style="color: #1e40af; margin-top: 30px;">Section 3: Assets</h2>
            <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
              <tr><td style="padding: 5px; font-weight: bold;">Checking Balance:</td><td style="padding: 5px;">${formData.checkingBalance}</td></tr>
              <tr><td style="padding: 5px; font-weight: bold;">Savings Balance:</td><td style="padding: 5px;">${formData.savingsBalance}</td></tr>
              ${formData.retirementAccounts ? `<tr><td style="padding: 5px; font-weight: bold;">Retirement Accounts:</td><td style="padding: 5px;">${formData.retirementAccounts}</td></tr>` : ''}
              ${formData.investments ? `<tr><td style="padding: 5px; font-weight: bold;">Investments:</td><td style="padding: 5px;">${formData.investments}</td></tr>` : ''}
              ${formData.cashOnHand ? `<tr><td style="padding: 5px; font-weight: bold;">Cash on Hand:</td><td style="padding: 5px;">${formData.cashOnHand}</td></tr>` : ''}
              ${formData.homeEquity ? `<tr><td style="padding: 5px; font-weight: bold;">Home Equity:</td><td style="padding: 5px;">${formData.homeEquity}</td></tr>` : ''}
              ${formData.ownedVehicles ? `<tr><td style="padding: 5px; font-weight: bold;">Owned Vehicles:</td><td style="padding: 5px;">${formData.ownedVehicles}</td></tr>` : ''}
              ${formData.businessOwnership ? `<tr><td style="padding: 5px; font-weight: bold;">Business Ownership:</td><td style="padding: 5px;">${formData.businessOwnership}</td></tr>` : ''}
            </table>

            <h2 style="color: #1e40af; margin-top: 30px;">Section 4: Liabilities</h2>
            <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
              <tr><td style="padding: 5px; font-weight: bold;">Monthly Housing Cost:</td><td style="padding: 5px;">${formData.monthlyHousingCost}</td></tr>
              ${formData.mortgageBalance ? `<tr><td style="padding: 5px; font-weight: bold;">Mortgage Balance:</td><td style="padding: 5px;">${formData.mortgageBalance}</td></tr>` : ''}
              ${formData.autoLoans ? `<tr><td style="padding: 5px; font-weight: bold;">Auto Loans:</td><td style="padding: 5px;">${formData.autoLoans}</td></tr>` : ''}
              ${formData.studentLoans ? `<tr><td style="padding: 5px; font-weight: bold;">Student Loans:</td><td style="padding: 5px;">${formData.studentLoans}</td></tr>` : ''}
              ${formData.creditCardBalances ? `<tr><td style="padding: 5px; font-weight: bold;">Credit Card Balances:</td><td style="padding: 5px;">${formData.creditCardBalances}</td></tr>` : ''}
              ${formData.personalLoans ? `<tr><td style="padding: 5px; font-weight: bold;">Personal Loans:</td><td style="padding: 5px;">${formData.personalLoans}</td></tr>` : ''}
              ${formData.medicalBills ? `<tr><td style="padding: 5px; font-weight: bold;">Medical Bills:</td><td style="padding: 5px;">${formData.medicalBills}</td></tr>` : ''}
              ${formData.alimonyChildSupport ? `<tr><td style="padding: 5px; font-weight: bold;">Alimony/Child Support:</td><td style="padding: 5px;">${formData.alimonyChildSupport}</td></tr>` : ''}
            </table>

            <h2 style="color: #1e40af; margin-top: 30px;">Section 5: Credit Information</h2>
            <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
              <tr><td style="padding: 5px; font-weight: bold;">Credit Score:</td><td style="padding: 5px;">${formData.creditScore}</td></tr>
              <tr><td style="padding: 5px; font-weight: bold;">Open Credit Lines:</td><td style="padding: 5px;">${formData.openCreditLines}</td></tr>
              ${formData.recentMajorPurchases ? `<tr><td style="padding: 5px; font-weight: bold;">Recent Major Purchases:</td><td style="padding: 5px;">${formData.recentMajorPurchases}</td></tr>` : ''}
              <tr><td style="padding: 5px; font-weight: bold;">Bankruptcy History:</td><td style="padding: 5px;">${formData.bankruptcyHistory ? 'Yes' : 'No'}</td></tr>
              <tr><td style="padding: 5px; font-weight: bold;">Foreclosure History:</td><td style="padding: 5px;">${formData.foreclosureHistory ? 'Yes' : 'No'}</td></tr>
              ${formData.latePayments ? `<tr><td style="padding: 5px; font-weight: bold;">Late Payments:</td><td style="padding: 5px;">${formData.latePayments}</td></tr>` : ''}
            </table>

            <h2 style="color: #1e40af; margin-top: 30px;">Section 6: Treatment Information</h2>
            <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
              <tr><td style="padding: 5px; font-weight: bold;">Primary Reason for Care:</td><td style="padding: 5px;">${formData.primaryReason}</td></tr>
              <tr><td style="padding: 5px; font-weight: bold;">Timeline Urgency:</td><td style="padding: 5px;">${formData.timelineUrgency}</td></tr>
              ${formData.previousTreatment ? `<tr><td style="padding: 5px; font-weight: bold;">Previous Treatment:</td><td style="padding: 5px;">${formData.previousTreatment}</td></tr>` : ''}
              <tr><td style="padding: 5px; font-weight: bold;">Expected Procedures:</td><td style="padding: 5px;">${formData.expectedProcedures}</td></tr>
              <tr><td style="padding: 5px; font-weight: bold;">Estimated Cost:</td><td style="padding: 5px;">${formData.estimatedCost}</td></tr>
              <tr><td style="padding: 5px; font-weight: bold;">Insurance Coverage:</td><td style="padding: 5px;">${formData.insuranceCoverage}</td></tr>
              ${formData.financingPreferences ? `<tr><td style="padding: 5px; font-weight: bold;">Financing Preferences:</td><td style="padding: 5px;">${formData.financingPreferences}</td></tr>` : ''}
              <tr><td style="padding: 5px; font-weight: bold;">Comfort Discussing Financing:</td><td style="padding: 5px;">${formData.comfortDiscussingFinancing}</td></tr>
            </table>

            <h2 style="color: #1e40af; margin-top: 30px;">Section 7: Patient Psychology</h2>
            <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
              <tr><td style="padding: 5px; font-weight: bold;">Pain Level:</td><td style="padding: 5px;">${formData.painLevel}</td></tr>
              <tr><td style="padding: 5px; font-weight: bold;">Primary Motivator:</td><td style="padding: 5px;">${formData.primaryMotivator}</td></tr>
              ${formData.confidenceImpact ? `<tr><td style="padding: 5px; font-weight: bold;">Confidence Impact:</td><td style="padding: 5px;">${formData.confidenceImpact}</td></tr>` : ''}
              ${formData.negativeExperiences ? `<tr><td style="padding: 5px; font-weight: bold;">Negative Experiences:</td><td style="padding: 5px;">${formData.negativeExperiences}</td></tr>` : ''}
              ${formData.trustFactors ? `<tr><td style="padding: 5px; font-weight: bold;">Trust Factors:</td><td style="padding: 5px;">${formData.trustFactors}</td></tr>` : ''}
              <tr><td style="padding: 5px; font-weight: bold;">Decision Making Style:</td><td style="padding: 5px;">${formData.decisionMakingStyle}</td></tr>
              ${formData.othersInvolved ? `<tr><td style="padding: 5px; font-weight: bold;">Others Involved:</td><td style="padding: 5px;">${formData.othersInvolved}</td></tr>` : ''}
              ${formData.obstacles ? `<tr><td style="padding: 5px; font-weight: bold;">Obstacles:</td><td style="padding: 5px;">${formData.obstacles}</td></tr>` : ''}
            </table>

            <h2 style="color: #1e40af; margin-top: 30px;">Section 8: Consent & Commitment</h2>
            <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
              <tr><td style="padding: 5px; font-weight: bold;">Consent Credit Pull:</td><td style="padding: 5px;">${formData.consentCreditPull ? 'Yes' : 'No'}</td></tr>
              <tr><td style="padding: 5px; font-weight: bold;">Target Payment Range:</td><td style="padding: 5px;">${formData.targetPaymentRange}</td></tr>
              <tr><td style="padding: 5px; font-weight: bold;">Comfort Auto Debit:</td><td style="padding: 5px;">${formData.comfortAutoDebit ? 'Yes' : 'No'}</td></tr>
              <tr><td style="padding: 5px; font-weight: bold;">Can Provide Proof:</td><td style="padding: 5px;">${formData.canProvideProof ? 'Yes' : 'No'}</td></tr>
              <tr><td style="padding: 5px; font-weight: bold;">Commitment Level:</td><td style="padding: 5px;">${formData.commitmentLevel}</td></tr>
              <tr><td style="padding: 5px; font-weight: bold;">Ready for Call:</td><td style="padding: 5px;">${formData.readyForCall ? 'Yes' : 'No'}</td></tr>
              <tr><td style="padding: 5px; font-weight: bold;">Ready for Deposit:</td><td style="padding: 5px;">${formData.readyForDeposit ? 'Yes' : 'No'}</td></tr>
            </table>

            <h3 style="color: #dc2626; margin-top: 40px; padding: 15px; background-color: #fef2f2; border-left: 4px solid #dc2626;">Next Steps</h3>
            <p style="margin: 15px 0;">A new patient financing application has been submitted. Please review the complete application details above and follow up with the patient as appropriate.</p>
            
            <p style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb; color: #6b7280; font-size: 12px;"><em>This email was automatically generated from the DentiPay patient contact form.</em></p>
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
                { Email: "nuttalya@mydentipay.com" }
              ],
              Subject: `New Patient Financing Application - ${formData.firstName} ${formData.lastName}`,
              HTMLPart: htmlContent
            }
          ]
        })
      });

      const responseData = await emailResponse.json();
      console.log("Mailjet response:", responseData);

      if (!emailResponse.ok) {
        throw new Error(`Mailjet API error: ${JSON.stringify(responseData)}`);
      }

      console.log("Email sent successfully via Mailjet");

      return new Response(JSON.stringify({ 
        success: true, 
        emailSent: true,
        emailResponse: responseData
      }), {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          ...corsHeaders,
        },
      });
    } catch (emailError) {
      console.error("Email sending failed:", emailError);
      
      // Even if email fails, don't return 500 - return success with email failed flag
      return new Response(JSON.stringify({ 
        success: true,
        message: "Form submitted successfully, but email notification failed.",
        emailSent: false,
        emailError: emailError instanceof Error ? emailError.message : String(emailError)
      }), {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          ...corsHeaders,
        },
      });
    }

  } catch (error) {
    console.error("Error processing form submission:", error);
    
    // Always return 200 to avoid frontend errors
    return new Response(JSON.stringify({ 
      success: true,
      message: "Form received but there was a processing issue. Please contact support if needed.",
      error: error instanceof Error ? error.message : String(error)
    }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  }
};

serve(handler);