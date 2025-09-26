import { motion } from 'framer-motion';
import { HomeHeroSection } from '@/components/home/HomeHeroSection';
import { HomeProblemSection } from '@/components/home/HomeProblemSection';
import { HomeTrinitySection } from '@/components/home/HomeTrinitySection';
import { HomeRevolutionaryResultsSection } from '@/components/home/HomeRevolutionaryResultsSection';
import { HomeFinalCTASection } from '@/components/home/HomeFinalCTASection';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <HomeHeroSection />

      {/* Problem/Solution Section */}
      <HomeProblemSection />

      {/* Trinity Intelligence System */}
      <HomeTrinitySection />

      {/* Revolutionary Results */}
      <HomeRevolutionaryResultsSection />

      {/* Final Call to Action */}
      <HomeFinalCTASection />
    </div>
  );
};

export default Index;