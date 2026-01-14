import { HeroSection } from '@/components/about/HeroSection';
import { MissionStatementSection } from '@/components/about/MissionStatementSection';
import { MissionVisionSection } from '@/components/about/MissionVisionSection';
import { ValuesSection } from '@/components/about/ValuesSection';
import { TimelineSection } from '@/components/about/TimelineSection';
import { FoundersSection } from '@/components/about/FoundersSection';
import { LeadershipSection } from '@/components/about/LeadershipSection';
import { PartnershipSection } from '@/components/about/PartnershipSection';
import { FutureVisionSection } from '@/components/about/FutureVisionSection';
import { SEOHead } from '@/components/SEOHead';

const About = () => {
  return (
    <div className="overflow-x-hidden">
      <SEOHead
        title="About Us"
        description="DentiPay is pioneering a new category of healthcare finance where artificial intelligence meets human compassion to make dental care accessible to everyone."
        canonicalUrl="/about"
      />
      
      <HeroSection />
      <MissionStatementSection />
      <MissionVisionSection />
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
