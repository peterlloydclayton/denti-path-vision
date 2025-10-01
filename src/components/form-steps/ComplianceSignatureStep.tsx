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
import { supabase } from '@/lib/supabase';

interface ComplianceSignatureStepProps {
  formData: FormData;
  updateFormData: (data: Partial<FormData>) => void;
  onNext: () => void;
  onPrev: () => void;
  isSubmitting: boolean;
  setIsSubmitting: (value: boolean) => void;
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
  isSubmitting,
  setIsSubmitting
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
  }, [t]);

  const handleSign = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!consentGiven || !signerName || !signerEmail || !document) {
      setError('Please complete all required fields and provide consent');
      return;
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
        employer_name: formData.current_employer,
        job_title: formData.job_title,
        employment_status: formData.employment_type,
        length_of_employment: formData.length_of_employment,
        monthly_income: formData.monthly_gross_income ? parseFloat(formData.monthly_gross_income) : undefined,
        monthly_net_income: formData.monthly_net_income ? parseFloat(formData.monthly_net_income) : undefined,
        pay_frequency: formData.pay_frequency,
        secondary_income_sources: formData.secondary_income_sources,
        household_total_income: formData.household_total_income ? parseFloat(formData.household_total_income) : undefined,
        spouse_employer: formData.spouse_employer,
        spouse_income: formData.spouse_income ? parseFloat(formData.spouse_income) : undefined,
        checking_balance: formData.checking_balance ? parseFloat(formData.checking_balance) : undefined,
        savings_balance: formData.savings_balance ? parseFloat(formData.savings_balance) : undefined,
        retirement_accounts: formData.retirement_accounts ? parseFloat(formData.retirement_accounts) : undefined,
        investments: formData.investment_accounts ? parseFloat(formData.investment_accounts) : undefined,
        monthly_housing_cost: formData.mortgage_rent_payment ? parseFloat(formData.mortgage_rent_payment) : undefined,
        credit_score: formData.credit_score_unknown ? undefined : (formData.credit_score ? parseInt(formData.credit_score) : undefined),
        considering_treatment_time: formData.considering_treatment_time,
        priority_preference: formData.priority_preference,
        primary_reason: formData.treatment_reason.join(', '),
        timeline_urgency: formData.urgency_scale,
        ready_to_proceed: formData.ready_to_proceed,
        consent_credit_pull: formData.authorize_credit_report,
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

      // Submit to edge function
      const { data, error } = await supabase.functions.invoke('submit-patient-application', {
        body: applicationData
      });

      if (error) throw error;

      if (!data?.success) {
        throw new Error(data?.error || 'Submission failed');
      }
      
      setSuccess(true);
      
      toast({
        title: t('form.compliance.successTitle'),
        description: t('form.compliance.successMessage'),
      });
      
    } catch (err: any) {
      const errorMessage = err?.message || 'Unknown error occurred';
      setError(errorMessage);
      
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

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>{t('form.compliance.title')}</CardTitle>
          <p className="text-muted-foreground">{t('form.compliance.description')}</p>
        </CardHeader>
        <CardContent className="space-y-4">
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
