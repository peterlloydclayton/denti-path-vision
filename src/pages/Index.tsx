import { HomeHeroSection } from '@/components/home/HomeHeroSection';
import { HomeProblemSection } from '@/components/home/HomeProblemSection'; 
import { HomeStatsSection } from '@/components/home/HomeStatsSection';
import { HomeEchoSection } from '@/components/home/HomeEchoSection';
import { HomeTrinitySection } from '@/components/home/HomeTrinitySection';
import { HomeUserExperienceSection } from '@/components/home/HomeUserExperienceSection';
import { HomeTestimonialsSection } from '@/components/home/HomeTestimonialsSection';
import { HomeTechnologyTrustSection } from '@/components/home/HomeTechnologyTrustSection';
import { HomeFinalCTASection } from '@/components/home/HomeFinalCTASection';
import { FloatingElements } from "@/components/ui/enhanced-animations";

const Index = () => {

  return (
    <div className="overflow-x-hidden">
      <FloatingElements />
      <HomeHeroSection />
      <HomeProblemSection />
      <HomeStatsSection />
      <HomeEchoSection />
      <HomeTrinitySection />
      <HomeUserExperienceSection />
      <HomeTestimonialsSection />
      <HomeTechnologyTrustSection />
      <HomeFinalCTASection />
    </div>
  );
};

export default Index;