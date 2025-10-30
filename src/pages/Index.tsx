import { motion } from 'framer-motion';
import { HomeHeroSection } from '@/components/home/HomeHeroSection';
import { HomeProblemSection } from '@/components/home/HomeProblemSection';
import { HomeTrinitySection } from '@/components/home/HomeTrinitySection';
import { HomeVideoSection } from '@/components/home/HomeVideoSection';
import { HomeRevolutionaryResultsSection } from '@/components/home/HomeRevolutionaryResultsSection';
import { HomeFinalCTASection } from '@/components/home/HomeFinalCTASection';

interface IndexProps {
  onPlayIntro?: () => void;
}

const Index = ({ onPlayIntro }: IndexProps) => {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <HomeHeroSection onPlayIntro={onPlayIntro} />

      {/* Video Platform Demo */}
      <HomeVideoSection />

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