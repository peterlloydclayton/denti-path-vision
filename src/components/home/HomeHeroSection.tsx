import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight, Brain, Zap, Target, Shield, Users, CreditCard } from 'lucide-react';
import { AnimatedText, SplitText } from '@/components/ui/animated-text';
import { ScrollReveal, MagneticButton, FloatingElements } from '@/components/ui/enhanced-animations';
import { GlowButton, ProgressiveImage } from '@/components/ui/micro-interactions';
import { PulseRipples } from '@/components/ui/pulse-ripples';
import { FloatingIcons } from '@/components/ui/floating-icons';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { PlayIntroButton } from '@/components/PlayIntroButton';
import { useState, useEffect } from 'react';
const heroImage = 'https://res.cloudinary.com/drxvhwze4/image/upload/v1759199954/Dentist-female-african_nefprl.png';

interface HomeHeroSectionProps {
  onPlayIntro?: () => void;
}

export const HomeHeroSection = ({ onPlayIntro }: HomeHeroSectionProps) => {
  const { t } = useTranslation('marketing');
  const navigate = useNavigate();
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      setWindowWidth(width);
      console.log('Viewport width:', width + 'px');
    };

    console.log('Initial viewport width:', windowWidth + 'px');
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <section className="h-screen relative z-10 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-dental-blue" style={{ height: '100vh' }}></div>
      
      {/* Floating Icons Background */}
      <FloatingIcons />
      
      <div className="w-full px-2 md:px-6 h-screen overflow-visible relative">
        {/* Desktop Layout */}
        <div className="hidden md:flex justify-center items-center min-h-screen">
          <div className="w-full min-h-screen relative z-10">
            <img 
              src={heroImage}
              alt="Professional dental provider"
              className="absolute bottom-0 left-1/2 -translate-x-1/2 w-auto object-contain object-bottom z-10 max-w-none hero-image h-[127.5vh]"
            />
          </div>
        </div>

        {/* Mobile Portrait Layout */}
        <div className="flex sm:hidden justify-start items-start pt-20 h-[calc(100vh-5rem)] ml-[37.5%]">
          <div className="w-full max-w-md h-[calc(100vh-5rem)] relative z-10">
            <img 
              src={heroImage}
              alt="Professional dental provider"
              className="absolute bottom-[-5%] left-[-160px] transform-none w-auto object-contain object-bottom z-10 max-w-none hero-image h-[calc(90vh-12rem)]"
            />
          </div>
        </div>
      </div>
      
      {/* Mobile Portrait Title */}
      <div className="block sm:hidden absolute top-[12%] landscape:top-[8%] left-6 landscape:left-4 z-20 w-3/4 landscape:w-[45%]">
        <AnimatedText>
          <h1 className="text-5xl landscape:text-2xl font-bold mb-6 landscape:mb-2 text-foreground leading-none landscape:leading-tight">
            {t('home.hero.title')}
          </h1>
          <h2 className="block text-3xl landscape:text-lg text-navy font-semibold mb-6 landscape:mb-2">
            {t('home.hero.subtitle')}
          </h2>
        </AnimatedText>
      </div>
      
      
      {/* Desktop & Tablet Title */}
      <div className="hidden md:block absolute top-[15%] left-12 z-20 w-1/2">
        <AnimatedText>
          <h1 className="text-6xl md:text-7xl font-bold text-foreground">
            {t('home.hero.title')}
          </h1>
          <h2 className="block text-4xl mt-8 md:mt-16 text-gray-600 font-medium">
            {t('home.hero.subtitle')}
          </h2>
        </AnimatedText>
      </div>
      
      {/* Desktop Buttons - moved down 15% more, aligned with text */}
      <div className="hidden md:block absolute top-[80%] max-h-[800px]:top-[85%] max-h-[700px]:top-[88%] left-12 z-20">
        <div className="flex gap-4 max-h-[700px]:gap-2">
          <Button 
            className="h-16 max-h-[700px]:h-12 text-xl max-h-[700px]:text-base bg-black hover:bg-black/90 text-white shadow-elegant px-12 max-h-[700px]:px-6 font-semibold rounded-xl transition-all duration-300 hover:scale-105"
            onClick={() => navigate('/patients')}
          >
            {t('home.hero.ctaPatients')}
          </Button>
          <Button 
            className="h-16 max-h-[700px]:h-12 text-xl max-h-[700px]:text-base bg-black hover:bg-black/90 text-white shadow-elegant px-12 max-h-[700px]:px-6 font-semibold rounded-xl transition-all duration-300 hover:scale-105"
            onClick={() => navigate('/providers')}
          >
            {t('home.hero.ctaProviders')}
          </Button>
        </div>
      </div>
      
      {/* Desktop Subtitle */}
      <div className="hidden md:block absolute top-[63%] left-12 z-20 w-1/2">
        <AnimatedText delay={0.2}>
          <p className="text-xl text-foreground/80 font-medium leading-relaxed text-left">
            {t('home.hero.description')}
          </p>
        </AnimatedText>
      </div>

      {/* Mobile Portrait Buttons - Stacked vertically */}
      <div className="block sm:hidden absolute top-[55%] landscape:top-[65%] left-6 landscape:left-4 z-20">
        <div className="flex flex-col landscape:flex-row gap-3 landscape:gap-2">
          <Button 
            className="h-10 landscape:h-8 text-base landscape:text-sm bg-black hover:bg-black/90 text-white shadow-elegant px-4 landscape:px-3 font-semibold rounded-xl transition-all duration-300 hover:scale-105"
            onClick={() => navigate('/patients')}
          >
            {t('home.hero.ctaPatients')}
          </Button>
          <Button 
            className="h-10 landscape:h-8 text-base landscape:text-sm bg-black hover:bg-black/90 text-white shadow-elegant px-4 landscape:px-3 font-semibold rounded-xl transition-all duration-300 hover:scale-105"
            onClick={() => navigate('/providers')}
          >
            {t('home.hero.ctaProviders')}
          </Button>
        </div>
      </div>
      
      {/* Mobile Portrait Subtitle */}
      <div className="hidden absolute bottom-[15%] left-6 z-20 w-3/4 mobile-landscape-subtitle">
        <AnimatedText delay={0.2}>
          <p className="text-base text-foreground/80 font-medium leading-relaxed text-left whitespace-pre-line">
            {t('home.hero.mobileDescription')}
          </p>
        </AnimatedText>
      </div>

      {/* Play Intro Button */}
      {onPlayIntro && <PlayIntroButton onClick={onPlayIntro} />}
    </section>
  );
};