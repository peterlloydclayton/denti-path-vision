import { HeroSection } from '@/components/providers/HeroSection';
import { StatsSection } from '@/components/providers/StatsSection';
import { VideoSection } from '@/components/providers/VideoSection';
import { ProblemSection } from '@/components/providers/ProblemSection';
import { ProblemDeepDive } from '@/components/providers/ProblemDeepDive';
import { TrinitySection } from '@/components/providers/TrinitySection';
import { IntelligenceSection } from '@/components/providers/IntelligenceSection';
import { EchoProviderSection } from '@/components/providers/EchoProviderSection';
import { WorkflowComparison } from '@/components/providers/WorkflowComparison';
import { PerformanceMetrics } from '@/components/providers/PerformanceMetrics';
import { ROICalculator } from '@/components/providers/ROICalculator';
import { TestimonialsSection } from '@/components/providers/TestimonialsSection';
import { FinalCTASection } from '@/components/providers/FinalCTASection';

const Providers = () => {
  return (
    <div className="overflow-x-hidden">
      <HeroSection />
      <StatsSection />
      <VideoSection />
      <ProblemSection />
      <ProblemDeepDive />
      <TrinitySection />
      <EchoProviderSection />
      <WorkflowComparison />
      <PerformanceMetrics />
      <ROICalculator />
      <TestimonialsSection />
      <FinalCTASection />
    </div>
  );
};

export default Providers;