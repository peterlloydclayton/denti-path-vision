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

const Patients = () => {
  return (
    <div className="overflow-x-hidden mobile-landscape:relative">
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