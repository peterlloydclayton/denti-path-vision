import { HeroSection } from '@/components/patients/HeroSection';
import { CaseStudySection } from '@/components/patients/CaseStudySection';
import { ProviderSearchSection } from '@/components/patients/ProviderSearchSection';
import { JourneySection } from '@/components/patients/JourneySection';
import { BenefitsSection } from '@/components/patients/BenefitsSection';
import { EchoAISection } from '@/components/patients/EchoAISection';
import { PatientStoriesSection } from '@/components/patients/PatientStoriesSection';
import { FinancialToolsSection } from '@/components/patients/FinancialToolsSection';
import { PeaceOfMindSection } from '@/components/patients/PeaceOfMindSection';
import { ProviderNetworkSection } from '@/components/patients/ProviderNetworkSection';
import { FinalCTASection } from '@/components/patients/FinalCTASection';
import { SEOHead, createFAQSchema } from '@/components/SEOHead';

const patientFAQs = [
  {
    question: 'How do I apply for DentiPay financing?',
    answer: 'Simply fill out our online application in under 5 minutes. You\'ll receive an instant decision with no impact to your credit score.'
  },
  {
    question: 'What credit score do I need to qualify?',
    answer: 'DentiPay approves 94% of applicants using AI-powered assessments that look beyond traditional credit scores. Apply to see your options.'
  },
  {
    question: 'Are there any hidden fees?',
    answer: 'No hidden fees. Your payment amount and terms are clearly explained before you commit. Many plans offer 0% APR promotional periods.'
  }
];

const Patients = () => {
  return (
    <div className="overflow-x-hidden mobile-landscape:relative">
      <SEOHead
        title="For Patients"
        description="Get approved for dental financing in minutes with DentiPay. Flexible payment plans, 94% approval rate, and no impact to your credit score for applying."
        canonicalUrl="/patients"
        jsonLd={createFAQSchema(patientFAQs)}
      />
      
      <HeroSection />
      <CaseStudySection />
      <JourneySection />
      <BenefitsSection />
      <ProviderSearchSection />
      <EchoAISection />
      <PatientStoriesSection />
      <FinancialToolsSection />
      <PeaceOfMindSection />
      <ProviderNetworkSection />
      <FinalCTASection />
    </div>
  );
};

export default Patients;
