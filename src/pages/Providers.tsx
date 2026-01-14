import { HeroSection } from '@/components/providers/HeroSection';
import { StatsSection } from '@/components/providers/StatsSection';
import { VideoSection } from '@/components/providers/VideoSection';
import { HowItWorksSection } from '@/components/providers/HowItWorksSection';
import { ProblemSection } from '@/components/providers/ProblemSection';
import { ProblemDeepDive } from '@/components/providers/ProblemDeepDive';
import { TrinitySection } from '@/components/providers/TrinitySection';
import { IntelligenceSection } from '@/components/providers/IntelligenceSection';
import { EchoProviderSection } from '@/components/providers/EchoProviderSection';
import { WorkflowComparison } from '@/components/providers/WorkflowComparison';
import { ROICalculator } from '@/components/providers/ROICalculator';
import { TestimonialsSection } from '@/components/providers/TestimonialsSection';
import { FinalCTASection } from '@/components/providers/FinalCTASection';
import { SEOHead, createFAQSchema } from '@/components/SEOHead';

const providerFAQs = [
  {
    question: 'How does DentiPay increase case acceptance?',
    answer: 'DentiPay uses AI-powered pre-cognitive intelligence to approve 94% of patients, compared to industry averages of 60%. This means more patients can afford treatment.'
  },
  {
    question: 'How long does it take to get set up with DentiPay?',
    answer: 'Most practices are fully onboarded within 48 hours. Our team handles the integration and training for your staff.'
  },
  {
    question: 'What are the fees for providers?',
    answer: 'DentiPay offers competitive merchant rates with no hidden fees. Contact us for a personalized quote based on your practice volume.'
  }
];

const Providers = () => {
  return (
    <div className="overflow-x-hidden">
      <SEOHead
        title="For Dental Providers"
        description="Increase case acceptance by 40% with DentiPay's AI-powered financing platform. Automate workflows, get instant approvals, and grow your practice revenue."
        canonicalUrl="/providers"
        jsonLd={createFAQSchema(providerFAQs)}
      />
      
      <HeroSection />
      <VideoSection />
      <ProblemSection />
      <ProblemDeepDive />
      <HowItWorksSection />
      <TrinitySection />
      <EchoProviderSection />
      <WorkflowComparison />
      <ROICalculator />
      <StatsSection />
      <TestimonialsSection />
      <FinalCTASection />
    </div>
  );
};

export default Providers;
