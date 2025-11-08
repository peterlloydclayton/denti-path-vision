import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import PersonalInfoStep from './form-steps/PersonalInfoStep';
import EmploymentIncomeStep from './form-steps/EmploymentIncomeStep';
import FinancialOverviewStep from './form-steps/FinancialOverviewStep';
import EmotionalDecisionStep from './form-steps/EmotionalDecisionStep';
import ComplianceSignatureStep from './form-steps/ComplianceSignatureStep';
import ConfirmationStep from './form-steps/ConfirmationStep';
import LanguageSwitcher from './LanguageSwitcher';

export interface FormData {
  // Section 1 - Personal Information
  first_name: string;
  middle_name: string;
  last_name: string;
  date_of_birth: { day: string; month: string; year: string };
  ssn: string;
  drivers_license: string;
  sex: string;
  marital_status: string;
  primary_phone: string;
  secondary_phone: string;
  email: string;
  street_address: string;
  city: string;
  state: string;
  zip_code: string;
  time_at_address: string;
  rent_or_own: string;
  previous_address: string;
  emergency_contact_name: string;
  emergency_contact_relationship: string;
  emergency_contact_phone: string;
  
  // Referral Information (Optional)
  referring_practice: string;
  referring_provider_name: string;
  referring_contact_info: string;
  referring_provider_email: string;
  estimated_treatment_cost: string;
  
  // Section 2 - Employment & Income
  current_employer: string;
  employer_address: string;
  job_title: string;
  employment_type: string;
  length_of_employment: string;
  monthly_gross_income: string;
  monthly_net_income: string;
  pay_frequency: string;
  secondary_income_sources: string;
  household_total_income: string;
  spouse_employer: string;
  spouse_income: string;
  
  // Section 3 - Financial Overview
  checking_balance: string;
  savings_balance: string;
  retirement_accounts: string;
  investment_accounts: string;
  mortgage_rent_payment: string;
  credit_score: string;
  credit_score_unknown: boolean;
  
  // Section 4 - Emotional & Decision Urgency
  considering_treatment_time: string;
  priority_preference: string;
  treatment_reason: string[];
  urgency_scale: string;
  ready_to_proceed: string;
  
  // Section 5 - Compliance & Consent
  authorize_credit_report: boolean;
  consent_communications: boolean;
  understand_no_credit_impact: boolean;
  confirm_information_accurate: boolean;
}

const INITIAL_FORM_DATA: FormData = {
  first_name: '',
  middle_name: '',
  last_name: '',
  date_of_birth: { day: '', month: '', year: '' },
  ssn: '',
  drivers_license: '',
  sex: '',
  marital_status: '',
  primary_phone: '',
  secondary_phone: '',
  email: '',
  street_address: '',
  city: '',
  state: '',
  zip_code: '',
  time_at_address: '',
  rent_or_own: '',
  previous_address: '',
  emergency_contact_name: '',
  emergency_contact_relationship: '',
  emergency_contact_phone: '',
  referring_practice: '',
  referring_provider_name: '',
  referring_contact_info: '',
  referring_provider_email: '',
  estimated_treatment_cost: '',
  current_employer: '',
  employer_address: '',
  job_title: '',
  employment_type: '',
  length_of_employment: '',
  monthly_gross_income: '',
  monthly_net_income: '',
  pay_frequency: '',
  secondary_income_sources: '',
  household_total_income: '',
  spouse_employer: '',
  spouse_income: '',
  checking_balance: '',
  savings_balance: '',
  retirement_accounts: '',
  investment_accounts: '',
  mortgage_rent_payment: '',
  credit_score: '',
  credit_score_unknown: false,
  considering_treatment_time: '',
  priority_preference: '',
  treatment_reason: [],
  urgency_scale: '',
  ready_to_proceed: '',
  authorize_credit_report: false,
  consent_communications: false,
  understand_no_credit_impact: false,
  confirm_information_accurate: false,
};

const MultiStepPatientForm: React.FC = () => {
  const { t } = useTranslation();
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<FormData>(INITIAL_FORM_DATA);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionSuccess, setSubmissionSuccess] = useState(false);
  const [submissionError, setSubmissionError] = useState<string>('');
  
  const handleSubmissionComplete = (success: boolean, errorMessage?: string) => {
    setSubmissionSuccess(success);
    setSubmissionError(errorMessage || '');
  };

  const STEPS = [
    {
      title: t('form.steps.personal'),
      component: PersonalInfoStep,
    },
    {
      title: t('form.steps.employment'),
      component: EmploymentIncomeStep,
    },
    {
      title: t('form.steps.financial'),
      component: FinancialOverviewStep,
    },
    {
      title: t('form.steps.emotional'),
      component: EmotionalDecisionStep,
    },
    {
      title: t('form.steps.compliance'),
      component: ComplianceSignatureStep,
    },
    {
      title: 'Confirmation',
      component: ConfirmationStep,
    }
  ];

  const updateFormData = (newData: Partial<FormData>) => {
    setFormData(prev => ({ ...prev, ...newData }));
  };

  const nextStep = () => {
    if (currentStep < STEPS.length - 1) {
      setCurrentStep(currentStep + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const totalSteps = 6;
  const progress = ((currentStep + 1) / totalSteps) * 100;
  const CurrentStepComponent = STEPS[currentStep].component;

  return (
    <div className="min-h-screen bg-background pt-24 pb-8">
      <div className="max-w-4xl mx-auto px-4">
        <Card className="p-6 md:p-8">
          <div className="mb-8">
            <div className="flex justify-between items-start mb-4">
              <h1 className="text-2xl md:text-3xl font-bold text-foreground flex-1">
                {t('form.title')} - Step {currentStep + 1} of 6
              </h1>
              <LanguageSwitcher />
            </div>
            <h2 className="text-lg md:text-xl text-muted-foreground mb-6">
              {STEPS[currentStep].title}
            </h2>
            <Progress value={progress} className="mb-4" />
            <div className="text-center text-sm text-muted-foreground">
              {Math.round(progress)}% Complete
            </div>
          </div>

          {currentStep === 0 && (
            <PersonalInfoStep
              formData={formData}
              updateFormData={updateFormData}
              onNext={nextStep}
              onPrev={prevStep}
            />
          )}
          {currentStep === 1 && (
            <EmploymentIncomeStep
              formData={formData}
              updateFormData={updateFormData}
              onNext={nextStep}
              onPrev={prevStep}
            />
          )}
          {currentStep === 2 && (
            <FinancialOverviewStep
              formData={formData}
              updateFormData={updateFormData}
              onNext={nextStep}
              onPrev={prevStep}
            />
          )}
          {currentStep === 3 && (
            <EmotionalDecisionStep
              formData={formData}
              updateFormData={updateFormData}
              onNext={nextStep}
              onPrev={prevStep}
            />
          )}
          {currentStep === 4 && (
            <ComplianceSignatureStep
              formData={formData}
              updateFormData={updateFormData}
              onNext={nextStep}
              onPrev={prevStep}
              isSubmitting={isSubmitting}
              setIsSubmitting={setIsSubmitting}
              onSubmissionComplete={handleSubmissionComplete}
            />
          )}
          {currentStep === 5 && (
            <ConfirmationStep
              success={submissionSuccess}
              errorMessage={submissionError}
            />
          )}
        </Card>
      </div>
    </div>
  );
};

export default MultiStepPatientForm;
