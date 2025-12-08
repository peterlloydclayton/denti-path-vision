import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
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
  onPrev,
  onNext,
  isSubmitting,
  setIsSubmitting,
  onSubmissionComplete
}) => {
  const { t } = useTranslation();
  const { toast } = useToast();
  const [document, setDocument] = useState<Document | null>(null);
  const [signerName, setSignerName] = useState('');
  const [signerEmail, setSignerEmail] = useState('');
  const [consentGiven, setConsentGiven] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    setDocument({
      id: 'patient-financing-agreement',
      title: t('form.compliance.agreementTitle'),
      content: t('form.compliance.agreementContent')
    });
    
    // Pre-fill email from form data
    if (formData.email && !signerEmail) {
      setSignerEmail(formData.email);
    }
  }, [t, formData.email, signerEmail]);

  const handleSign = async (e: React.FormEvent) => {
    e.preventDefault();
    
    console.log('🚀 Form submission started');
    console.log('Form validation:', {
      consentGiven,
      signerName,
      signerEmail,
      hasDocument: !!document,
      authorize_credit_report: formData.authorize_credit_report,
      consent_communications: formData.consent_communications,
      understand_no_credit_impact: formData.understand_no_credit_impact,
      confirm_information_accurate: formData.confirm_information_accurate
    });
    
    if (!consentGiven || !signerName || !signerEmail || !document) {
      const errorMsg = 'Please complete all required fields and provide consent';
      console.error('❌ Validation failed:', errorMsg);
      setError(errorMsg);
      return;
    }

    // Validate treatment cost first (1 million limit to match backend)
    if (formData.estimated_cost) {
      const treatmentCost = parseFloat(formData.estimated_cost);
      console.log(`💰 Validating estimated_cost: ${formData.estimated_cost} -> ${treatmentCost}`);
      const MAX_TREATMENT_COST = 1000000;
      if (!isNaN(treatmentCost) && treatmentCost > MAX_TREATMENT_COST) {
        const errorMsg = `Treatment cost ($${treatmentCost.toLocaleString()}) cannot exceed $1,000,000. Please go back and correct this value.`;
        setError(errorMsg);
        toast({
          title: "Value Too Large",
          description: errorMsg,
          variant: "destructive",
        });
        return;
      }
    }

    // Validate numeric fields before conversion
    const numericFields = [
      { name: 'monthly_gross_income', value: formData.monthly_gross_income },
      { name: 'monthly_net_income', value: formData.monthly_net_income },
      { name: 'household_total_income', value: formData.household_total_income },
      { name: 'spouse_income', value: formData.spouse_income },
      { name: 'checking_balance', value: formData.checking_balance },
      { name: 'savings_balance', value: formData.savings_balance },
      { name: 'retirement_accounts', value: formData.retirement_accounts },
      { name: 'investment_accounts', value: formData.investment_accounts },
      { name: 'mortgage_rent_payment', value: formData.mortgage_rent_payment },
    ];

    const MAX_VALUE = 999999999;
    for (const field of numericFields) {
      if (field.value) {
        const numValue = parseFloat(field.value);
        console.log(`Validating ${field.name}: ${field.value} -> ${numValue}`);
        if (numValue > MAX_VALUE) {
          const errorMsg = `${field.name} (${numValue.toLocaleString()}) cannot exceed $999,999,999. Please go back and correct this value.`;
          setError(errorMsg);
          toast({
            title: "Value Too Large",
            description: errorMsg,
            variant: "destructive",
          });
          return;
        }
      }
    }

    setIsSubmitting(true);
    setError('');

    try {
      const ipAddress = await getUserIP();
      const userAgent = getUserAgent();
      const documentHash = await generateDocumentHash(document.content);

      const pdfBytes = await createSignedPDF(
        document.content,
        signerName,
        new Date().toLocaleDateString()
      );

      const base64Pdf = btoa(String.fromCharCode(...pdfBytes));

      // Prepare application data matching the edge function's ApplicationData interface
      const applicationData = {
        first_name: formData.first_name,
        middle_name: formData.middle_name,
        last_name: formData.last_name,
        email: formData.email,
        mobile_phone: formData.primary_phone,
        secondary_phone: formData.secondary_phone,
        date_of_birth: `${formData.date_of_birth.year}-${formData.date_of_birth.month.padStart(2, '0')}-${formData.date_of_birth.day.padStart(2, '0')}`,
        sex: formData.sex,
        ssn: formData.ssn,
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
        referring_practice: formData.referring_practice,
        referring_provider_name: formData.referring_provider_name,
        referring_contact_info: formData.referring_contact_info,
        referring_provider_email: formData.referring_provider_email,
        estimated_cost: (() => {
          const value = parseFloat(formData.estimated_cost);
          return !isNaN(value) && value > 0 ? value : undefined;
        })(),
        employer_name: formData.current_employer,
        employer_address: formData.employer_address,
        job_title: formData.job_title,
        employment_status: formData.employment_type,
        length_of_employment: formData.length_of_employment,
        monthly_income: (() => {
          const value = parseFloat(formData.monthly_gross_income);
          return !isNaN(value) ? value : undefined;
        })(),
        monthly_net_income: (() => {
          const value = parseFloat(formData.monthly_net_income);
          return !isNaN(value) ? value : undefined;
        })(),
        pay_frequency: formData.pay_frequency,
        secondary_income_sources: formData.secondary_income_sources,
        household_total_income: (() => {
          const value = parseFloat(formData.household_total_income);
          return !isNaN(value) ? value : undefined;
        })(),
        spouse_employer: formData.spouse_employer,
        spouse_income: (() => {
          const value = parseFloat(formData.spouse_income);
          return !isNaN(value) ? value : undefined;
        })(),
        checking_balance: (() => {
          const value = parseFloat(formData.checking_balance);
          return !isNaN(value) ? value : undefined;
        })(),
        savings_balance: (() => {
          const value = parseFloat(formData.savings_balance);
          return !isNaN(value) ? value : undefined;
        })(),
        retirement_accounts: (() => {
          const value = parseFloat(formData.retirement_accounts);
          return !isNaN(value) ? value : undefined;
        })(),
        investments: (() => {
          const value = parseFloat(formData.investment_accounts);
          return !isNaN(value) ? value : undefined;
        })(),
        monthly_housing_cost: (() => {
          const value = parseFloat(formData.mortgage_rent_payment);
          return !isNaN(value) ? value : undefined;
        })(),
        credit_score: formData.credit_score_unknown ? undefined : (() => {
          const value = parseInt(formData.credit_score);
          return !isNaN(value) ? value : undefined;
        })(),
        considering_treatment_time: formData.considering_treatment_time,
        priority_preference: formData.priority_preference,
        treatment_reason: formData.treatment_reason,
        urgency_scale: (() => {
          const value = parseInt(formData.urgency_scale);
          return !isNaN(value) ? value : undefined;
        })(),
        ready_to_proceed: formData.ready_to_proceed,
        consent_credit_pull: formData.authorize_credit_report,
        consent_communications: formData.consent_communications,
        understand_no_credit_impact: formData.understand_no_credit_impact,
        confirm_information_accurate: formData.confirm_information_accurate,
        signature_data: {
          signer_name: signerName,
          signer_email: signerEmail,
          consent_given: consentGiven,
          ip_address: ipAddress,
          user_agent: userAgent,
          document_hash: documentHash,
          document_id: document.id,
          pdf_base64: base64Pdf
        },
        // Honeypot field - bots will fill this, humans won't see it
        website_url: formData.website_url
      };

      // Submit to external edge function (v2 - goes directly to patient_applications)
      console.log('📤 Submitting to external edge function (v2)...');
      const response = await fetch('https://epkypzawqtpokmatjuzo.supabase.co/functions/v1/submit-patient-application_v2', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'apikey': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVwa3lwemF3cXRwb2ttYXRqdXpvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTU4ODc4MTgsImV4cCI6MjA3MTQ2MzgxOH0.QYx4QwYhBRHhMdfgmuHUHpWN2R1q7CetLCAS69w3yJU'
        },
        body: JSON.stringify(applicationData)
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ error: 'Unknown error' }));
        throw new Error(errorData.error || `HTTP ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();
      console.log('📥 Edge function response:', data);

      if (!data?.success) {
        throw new Error(data?.error || 'Submission failed');
      }
      
      setSuccess(true);
      onSubmissionComplete(true);
      
      toast({
        title: t('form.compliance.successTitle'),
        description: t('form.compliance.successMessage'),
      });
      
      // Navigate to confirmation step after short delay
      setTimeout(() => {
        onNext();
      }, 1000);
      
    } catch (err: any) {
      const errorMessage = err?.message || 'Unknown error occurred';
      setError(errorMessage);
      onSubmissionComplete(false, errorMessage);
      
      toast({
        title: "Submission Error",
        description: errorMessage,
        variant: "destructive",
      });
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

  const allComplianceChecked = formData.authorize_credit_report && 
                                formData.consent_communications && 
                                formData.understand_no_credit_impact && 
                                formData.confirm_information_accurate;

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>{t('form.compliance.title')}</CardTitle>
          <p className="text-muted-foreground">{t('form.compliance.description')}</p>
        </CardHeader>
        <CardContent className="space-y-4">
          {!allComplianceChecked && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm dark:bg-red-950/30 dark:border-red-900 dark:text-red-400">
              Please check all consent requests. We need your consent to process your application
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

      {document && (
        <Card>
          <CardHeader>
            <CardTitle>{document.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="max-h-96 overflow-y-auto bg-muted p-4 rounded-lg text-sm leading-relaxed whitespace-pre-wrap">
              {document.content}
            </div>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle>{t('form.compliance.digitalSignature')}</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSign} className="space-y-6">
            {/* Honeypot field - hidden from humans, bots will fill it */}
            <div className="absolute -left-[9999px] opacity-0 pointer-events-none" aria-hidden="true">
              <label htmlFor="website_url">Website URL</label>
              <input
                type="text"
                id="website_url"
                name="website_url"
                value={formData.website_url}
                onChange={(e) => updateFormData({ website_url: e.target.value })}
                tabIndex={-1}
                autoComplete="off"
              />
            </div>
            
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
                  placeholder="Please Type Your Full Legal Name"
                  className="placeholder:text-muted-foreground/60"
                  maxLength={25}
                  required
                />
                {signerName && (
                  <div className="mt-2 p-3 bg-blue-50 border border-blue-200 rounded-lg text-center dark:bg-blue-950 dark:border-blue-800">
                    <div className="text-blue-900 dark:text-blue-100 font-cursive text-xl">
                      {signerName}
                    </div>
                    <div className="text-xs text-blue-600 dark:text-blue-400 mt-1">{t('form.compliance.signaturePreview')}</div>
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
                  maxLength={40}
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
              <div className="bg-destructive/10 border border-destructive/20 text-destructive px-4 py-3 rounded-lg">
                {error}
              </div>
            )}

            <div className="bg-muted p-4 rounded-lg">
              <p className="text-xs text-muted-foreground">
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
                disabled={isSubmitting || !consentGiven || !signerName || !signerEmail || 
                         !formData.authorize_credit_report || !formData.consent_communications || 
                         !formData.understand_no_credit_impact || !formData.confirm_information_accurate}
                className="px-8"
              >
                {isSubmitting ? t('form.compliance.submitting') : t('form.compliance.signAndSubmit')}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default ComplianceSignatureStep;
