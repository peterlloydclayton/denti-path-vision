import { HeroSection } from '@/components/about/HeroSection';
import { MissionVisionSection } from '@/components/about/MissionVisionSection';
import { StatsSection } from '@/components/about/StatsSection';
import { ValuesSection } from '@/components/about/ValuesSection';
import { TimelineSection } from '@/components/about/TimelineSection';
import { FoundersSection } from '@/components/about/FoundersSection';
import { LeadershipSection } from '@/components/about/LeadershipSection';
import { PartnershipSection } from '@/components/about/PartnershipSection';
import { FutureVisionSection } from '@/components/about/FutureVisionSection';

const About = () => {
  return (
    <div className="pt-24 overflow-x-hidden">
      <HeroSection />
      <MissionVisionSection />
      <StatsSection />
      <ValuesSection />
      <TimelineSection />
      <FoundersSection />
      <LeadershipSection />
      <PartnershipSection />
      <FutureVisionSection />
    </div>
  );
};

export default About;