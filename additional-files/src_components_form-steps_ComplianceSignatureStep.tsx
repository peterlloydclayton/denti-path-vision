import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { supabase } from '@/integrations/supabase/client';
import { createSignedPDF, generateDocumentHash } from '@/utils/pdfUtils';
import { getUserIP, getUserAgent } from '@/utils/auditUtils';
import { FormData } from '../MultiStepPatientForm';
import { useToast } from '@/hooks/use-toast';
import { CheckCircle } from 'lucide-react';

interface ComplianceSignatureStepProps {
  formData: FormData;
  updateFormData: (data: Partial<FormData>) => void;
  onNext: () => void;
  onPrev: () => void;
  isSubmitting: boolean;
  setIsSubmitting: (value: boolean) => void;
  onSubmissionComplete: (success: boolean, errorMessage?: string) => void;
}

interface Document {
  id: string;
  title: string;
  content: string;
}

const ComplianceSignatureStep: React.FC<ComplianceSignatureStepProps> = ({ 
  formData, 
  updateFormData,
  onNext,
  onPrev,
  isSubmitting,
  setIsSubmitting,
  onSubmissionComplete
}) => {
  const { t } = useTranslation();
  const [document, setDocument] = useState<Document | null>(null);
  const [signerName, setSignerName] = useState('');
  const [signerEmail, setSignerEmail] = useState('');
  const [consentGiven, setConsentGiven] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    // Pre-fill signer email from form data
    setSignerEmail(formData.email);

    // Use translated document content
    const translatedDocument = {
      id: 'translated',
      title: t('form.compliance.documentTitle'),
      content: t('form.compliance.documentContent')
        .replace('{{patientName}}', `${formData.first_name} ${formData.middle_name} ${formData.last_name}`.trim())
        .replace('{{dateOfBirth}}', `${formData.date_of_birth.month}/${formData.date_of_birth.day}/${formData.date_of_birth.year}`)
        .replace('{{applicationDate}}', new Date().toLocaleDateString())
    };
    
    setDocument(translatedDocument);
  }, [formData, t]);

  const handleSign = async (e: React.FormEvent) => {
    e.preventDefault();
    
    console.log('=== FORM SUBMISSION STARTED ===');
    console.log('ComplianceSignatureStep - formData received:', {
      referring_practice: formData.referring_practice,
      referring_provider_name: formData.referring_provider_name,
      referring_contact_info: formData.referring_contact_info,
      estimated_treatment_cost: formData.estimated_treatment_cost,
      allFormData: formData
    });
    
    // Validate compliance checkboxes first
    if (!formData.authorize_credit_report || !formData.consent_communications || 
        !formData.understand_no_credit_impact || !formData.confirm_information_accurate) {
      console.error('VALIDATION FAILED: Compliance checkboxes not complete');
      setError('Please complete all compliance sections before signing');
      toast({
        title: "Validation Error",
        description: "Please complete all compliance sections before signing",
        variant: "destructive",
      });
      return;
    }
    
    if (!signerName.trim() || !signerEmail.trim() || !consentGiven || !document) {
      console.error('VALIDATION FAILED: Missing signature fields', {
        hasSignerName: !!signerName.trim(),
        hasSignerEmail: !!signerEmail.trim(),
        hasConsent: consentGiven,
        hasDocument: !!document
      });
      setError('Please fill all fields and provide consent');
      toast({
        title: "Validation Error",
        description: "Please fill all fields and provide consent",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    setError('');

    try {
      // Get audit trail data first
      const ipAddress = await getUserIP();
      const userAgent = getUserAgent();
      const documentHash = await generateDocumentHash(document.content);

      // Create signed PDF
      const pdfBytes = await createSignedPDF(
        document.content,
        signerName,
        new Date().toLocaleDateString()
      );

      // Convert PDF to base64 for edge function
      const base64Pdf = btoa(String.fromCharCode(...pdfBytes));

      // Prepare application data for the edge function with signature
      const applicationData = {
        first_name: formData.first_name,
        middle_name: formData.middle_name,
        last_name: formData.last_name,
        email: formData.email,
        mobile_phone: formData.primary_phone,
        secondary_phone: formData.secondary_phone,
        date_of_birth: formData.date_of_birth.year && formData.date_of_birth.month && formData.date_of_birth.day 
          ? `${formData.date_of_birth.year}-${formData.date_of_birth.month.padStart(2, '0')}-${formData.date_of_birth.day.padStart(2, '0')}`
          : null,
        sex: formData.sex,
        ssn: formData.ssn,
        ssn_last_four: formData.ssn?.slice(-4),
        drivers_license: formData.drivers_license,
        marital_status: formData.marital_status,
        home_street_address: formData.street_address,
        home_city: formData.city,
        home_state: formData.state,
        home_zip: formData.zip_code,
        time_at_address: formData.time_at_address,
        rent_or_own: formData.rent_or_own,
        previous_address: formData.previous_address,
        emergency_contact_name: formData.emergency_contact_name,
        emergency_contact_relationship: formData.emergency_contact_relationship,
        emergency_contact_phone: formData.emergency_contact_phone,
        referring_practice: formData.referring_practice || null,
        referring_provider_name: formData.referring_provider_name || null,
        referring_contact_info: formData.referring_contact_info || null,
        estimated_treatment_cost: formData.estimated_treatment_cost ? parseFloat(formData.estimated_treatment_cost.replace(/[^0-9.]/g, '')) : null,
        employment_status: formData.employment_type,
        employer_name: formData.current_employer,
        job_title: formData.job_title,
        length_of_employment: formData.length_of_employment,
        monthly_income: formData.monthly_gross_income ? parseFloat(formData.monthly_gross_income) : null,
        monthly_net_income: formData.monthly_net_income ? parseFloat(formData.monthly_net_income) : null,
        pay_frequency: formData.pay_frequency,
        secondary_income_sources: formData.secondary_income_sources,
        household_total_income: formData.household_total_income ? parseFloat(formData.household_total_income) : null,
        spouse_employer: formData.spouse_employer,
        spouse_income: formData.spouse_income ? parseFloat(formData.spouse_income) : null,
        checking_balance: formData.checking_balance ? parseFloat(formData.checking_balance) : null,
        savings_balance: formData.savings_balance ? parseFloat(formData.savings_balance) : null,
        retirement_accounts: formData.retirement_accounts ? parseFloat(formData.retirement_accounts) : null,
        investments: formData.investment_accounts ? parseFloat(formData.investment_accounts) : null,
        monthly_housing_cost: formData.mortgage_rent_payment ? parseFloat(formData.mortgage_rent_payment) : null,
        credit_score: formData.credit_score ? parseInt(formData.credit_score) : null,
        considering_treatment_time: formData.considering_treatment_time,
        priority_preference: formData.priority_preference,
        primary_reason: formData.treatment_reason.join(', '),
        timeline_urgency: formData.urgency_scale,
        ready_to_proceed: formData.ready_to_proceed,
        consent_credit_pull: formData.authorize_credit_report,
        additional_info: JSON.stringify({
          consent_info: {
            authorize_credit_report: formData.authorize_credit_report,
            consent_communications: formData.consent_communications,
            understand_no_credit_impact: formData.understand_no_credit_impact,
            confirm_information_accurate: formData.confirm_information_accurate
          }
        }),
        signature_data: {
          signer_name: signerName,
          signer_email: signerEmail,
          consent_given: consentGiven,
          ip_address: ipAddress,
          user_agent: userAgent,
          document_hash: documentHash,
          document_id: document.id,
          pdf_base64: base64Pdf
        }
      };

      console.log('ComplianceSignatureStep - Sending application data:', {
        name: `${applicationData.first_name} ${applicationData.last_name}`,
        email: applicationData.email,
        referralData: {
          referring_practice: applicationData.referring_practice,
          referring_provider_name: applicationData.referring_provider_name,
          referring_contact_info: applicationData.referring_contact_info,
          estimated_treatment_cost: applicationData.estimated_treatment_cost
        }
      });

      // Call the secure edge function instead of direct database access
      const { data: tempApp, error: appError } = await supabase.functions.invoke(
        'submit-patient-application',
        {
          body: applicationData
        }
      );

      if (appError) {
        console.error('Edge function error:', appError);
        
        // Check if it's a duplicate submission (429 Too Many Requests)
        if (appError.message?.includes('429') || appError.message?.toLowerCase().includes('recent application')) {
          throw new Error('It looks like you\'ve already submitted an application with this email address recently. To prevent duplicate submissions, please wait 24 hours before trying again, or contact us if you need assistance.');
        }
        
        throw new Error(appError.message || 'Failed to submit application');
      }

      if (!tempApp || !tempApp.success) {
        const errorMsg = tempApp?.error || 'Failed to submit application';
        
        // Also check the error response for duplicate detection
        if (errorMsg.toLowerCase().includes('recent application') || errorMsg.toLowerCase().includes('already exists')) {
          throw new Error('It looks like you\'ve already submitted an application with this email address recently. To prevent duplicate submissions, please wait 24 hours before trying again, or contact us if you need assistance.');
        }
        
        throw new Error(errorMsg);
      }

      setSuccess(true);
      
      toast({
        title: t('form.compliance.successTitle'),
        description: t('form.compliance.successMessage'),
      });

      // Mark submission as successful and move to confirmation step
      onSubmissionComplete(true);
      
      setTimeout(() => {
        onNext();
      }, 1000);
      
    } catch (err: any) {
      console.error('Submission error:', err);
      
      let errorMessage = 'We encountered an issue submitting your application. Please try again or contact support if the problem persists.';
      
      // Use the error message from our custom error throws
      if (err?.message) {
        errorMessage = err.message;
      }
      
      setError(errorMessage);
      
      toast({
        title: "Application Submission Failed",
        description: errorMessage,
        variant: "destructive",
      });
      
      // Mark submission as failed
      onSubmissionComplete(false, errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (success) {
    return (
      <div className="text-center space-y-6">
        <CheckCircle className="mx-auto h-16 w-16 text-green-500" />
        <div>
          <h3 className="text-2xl font-semibold text-green-700 mb-2">
            {t('form.compliance.successTitle')}
          </h3>
          <p className="text-muted-foreground">
            {t('form.compliance.successMessage')}
          </p>
        </div>
      </div>
    );
  }

  const allCheckboxesChecked = formData.authorize_credit_report && 
    formData.consent_communications && 
    formData.understand_no_credit_impact && 
    formData.confirm_information_accurate;

  return (
    <div className="space-y-6">
      {/* Important Notice */}
      <div className="bg-blue-50 border border-blue-300 text-blue-900 px-4 py-3 rounded-lg">
        <p className="text-sm font-medium">
          ⚠️ Important: Your application will not be complete until you reach the confirmation page (Step 6). Please ensure all required fields are filled and do not close this window until you see the confirmation.
        </p>
      </div>

      {/* Compliance & Consent Section */}
      <Card>
        <CardHeader>
          <CardTitle>{t('form.compliance.title')}</CardTitle>
          <p className="text-muted-foreground">{t('form.compliance.description')}</p>
        </CardHeader>
        <CardContent className="space-y-4">
          {!allCheckboxesChecked && (
            <div className="bg-destructive/10 border border-destructive text-destructive px-4 py-3 rounded-lg mb-4">
              <p className="text-sm font-medium">
                To submit your application for consideration, we ask that you provide consent to all options listed below.
              </p>
            </div>
          )}

          <div className="flex items-start space-x-3">
            <Checkbox
              id="authorize_credit_report"
              checked={formData.authorize_credit_report}
              onCheckedChange={(checked) => updateFormData({ authorize_credit_report: checked as boolean })}
              required
            />
            <label htmlFor="authorize_credit_report" className="text-sm leading-relaxed">
              {t('form.compliance.authorizeCreditReport')}
            </label>
          </div>

          <div className="flex items-start space-x-3">
            <Checkbox
              id="consent_communications"
              checked={formData.consent_communications}
              onCheckedChange={(checked) => updateFormData({ consent_communications: checked as boolean })}
              required
            />
            <label htmlFor="consent_communications" className="text-sm leading-relaxed">
              {t('form.compliance.consentCommunications')}
            </label>
          </div>

          <div className="flex items-start space-x-3">
            <Checkbox
              id="understand_no_credit_impact"
              checked={formData.understand_no_credit_impact}
              onCheckedChange={(checked) => updateFormData({ understand_no_credit_impact: checked as boolean })}
              required
            />
            <label htmlFor="understand_no_credit_impact" className="text-sm leading-relaxed">
              {t('form.compliance.understandNoCredit')}
            </label>
          </div>

          <div className="flex items-start space-x-3">
            <Checkbox
              id="confirm_information_accurate"
              checked={formData.confirm_information_accurate}
              onCheckedChange={(checked) => updateFormData({ confirm_information_accurate: checked as boolean })}
              required
            />
            <label htmlFor="confirm_information_accurate" className="text-sm leading-relaxed">
              {t('form.compliance.confirmAccurate')}
            </label>
          </div>
        </CardContent>
      </Card>

      {/* Document Preview */}
      {document && (
        <Card>
          <CardHeader>
            <CardTitle>{document.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="max-h-96 overflow-y-auto bg-gray-50 p-4 rounded-lg text-sm leading-relaxed whitespace-pre-wrap">
              {document.content}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Digital Signature Section */}
      <Card>
        <CardHeader>
          <CardTitle>{t('form.compliance.digitalSignature')}</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSign} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="signerName" className="block text-sm font-medium mb-2">
                  {t('form.compliance.fullLegalName')} *
                </label>
                <Input
                  id="signerName"
                  type="text"
                  value={signerName}
                  onChange={(e) => setSignerName(e.target.value)}
                  placeholder="John Michael Doe"
                  required
                />
                {signerName && (
                  <div className="mt-2 p-3 bg-blue-50 border border-blue-200 rounded-lg text-center">
                    <div className="text-blue-900 font-cursive text-xl">
                      {signerName}
                    </div>
                    <div className="text-xs text-blue-600 mt-1">{t('form.compliance.signaturePreview')}</div>
                  </div>
                )}
              </div>

              <div>
                <label htmlFor="signerEmail" className="block text-sm font-medium mb-2">
                  {t('form.compliance.emailAddress')} *
                </label>
                <Input
                  id="signerEmail"
                  type="email"
                  value={signerEmail}
                  onChange={(e) => setSignerEmail(e.target.value)}
                  placeholder="john@example.com"
                  required
                />
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <Checkbox
                  id="final_consent"
                  checked={consentGiven}
                  onCheckedChange={(checked) => setConsentGiven(checked as boolean)}
                  required
                />
                <label htmlFor="final_consent" className="text-sm leading-relaxed">
                  {t('form.compliance.finalConsent')}
                </label>
              </div>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                {error}
              </div>
            )}

            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-xs text-gray-600">
                {t('form.compliance.auditNotice')}
              </p>
            </div>

            <div className="flex justify-between">
              <Button
                type="button"
                onClick={onPrev}
                variant="outline"
                disabled={isSubmitting}
              >
                {t('form.buttons.previous')}
              </Button>
              
              <Button
                type="submit"
                disabled={isSubmitting || !consentGiven || !formData.authorize_credit_report || 
                         !formData.consent_communications || !formData.understand_no_credit_impact || 
                         !formData.confirm_information_accurate}
                className="px-8"
              >
                {isSubmitting ? t('form.compliance.submitting') : t('form.compliance.signAndSubmit')}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      {/* Important Notice - Bottom */}
      <div className="bg-blue-50 border border-blue-300 text-blue-900 px-4 py-3 rounded-lg">
        <p className="text-sm font-medium">
          ⚠️ Important: Your application will not be complete until you reach the confirmation page (Step 6). Please ensure all required fields are filled and do not close this window until you see the confirmation.
        </p>
      </div>
    </div>
  );
};

export default ComplianceSignatureStep;