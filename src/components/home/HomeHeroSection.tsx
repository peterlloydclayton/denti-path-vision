import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight, Brain, Zap, Target, Shield, Users, CreditCard } from 'lucide-react';
import { AnimatedText, SplitText } from '@/components/ui/animated-text';
import { ScrollReveal, MagneticButton, FloatingElements } from '@/components/ui/enhanced-animations';
import { GlowButton, ProgressiveImage } from '@/components/ui/micro-interactions';
import { PulseRipples } from '@/components/ui/pulse-ripples';
import { useTranslation } from 'react-i18next';
import heroImage from '@/assets/hero-dentist-woman-white-transparent.png';

export const HomeHeroSection = () => {
  const { t } = useTranslation('marketing');
  return (
    <section className="h-screen relative z-30 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-dental-blue" style={{ height: '100vh' }}></div>
      
      {/* Abstract AI Pattern Background */}
      <div className="absolute inset-0 opacity-15">
        <motion.div 
          className="absolute top-20 left-20 w-32 h-32 border border-foreground rounded-full"
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        />
        <motion.div 
          className="absolute top-40 right-40 w-24 h-24 border border-foreground rotate-45"
          animate={{ rotate: [45, 405] }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div 
          className="absolute bottom-40 left-1/3 w-16 h-16 border border-foreground rounded-full"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div 
          className="absolute bottom-20 right-20 w-20 h-20 border border-foreground"
          animate={{ rotate: [0, 180, 360] }}
          transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
        />
      </div>
      
      <div className="container mx-auto px-2 md:px-6 h-screen overflow-visible relative">
        {/* Desktop Layout */}
        <div className="hidden lg:flex justify-center items-center min-h-screen">
          <div className="w-full max-w-md xl:max-w-lg 2xl:max-w-xl min-h-screen relative z-[100]">
            <img 
              src={heroImage}
              alt="Professional dental provider"
              className="absolute bottom-0 left-1/2 xl:left-[60%] 2xl:left-[60%] -translate-x-1/2 xl:-translate-x-1/2 2xl:-translate-x-1/2 w-auto object-contain object-bottom z-[110] max-w-none hero-image h-[85vh]"
            />
          </div>
        </div>

        {/* Tablet Layout */}
        <div className="hidden sm:flex lg:hidden justify-center items-center min-h-screen">
          <div className="w-full max-w-md min-h-screen relative z-[100]">
            <img 
              src={heroImage}
              alt="Professional dental provider"
              className="absolute bottom-0 left-[50%] -translate-x-1/2 w-auto object-contain object-bottom z-[110] max-w-none hero-image h-[85vh]"
            />
          </div>
        </div>

        {/* Mobile Portrait Layout */}
        <div className="flex sm:hidden justify-start items-start pt-20 h-[calc(100vh-5rem)] ml-[25%]">
          <div className="w-full max-w-md h-[calc(100vh-5rem)] relative z-[100]">
            <img 
              src={heroImage}
              alt="Professional dental provider"
              className="absolute bottom-[-5%] left-[-120px] transform-none w-auto object-contain object-bottom z-[110] max-w-none hero-image h-[calc(90vh-12rem)]"
            />
          </div>
        </div>
      </div>
      
      {/* Mobile Portrait Title */}
      <div className="block sm:hidden absolute top-[12%] left-6 z-20 w-3/4 mobile-landscape-title">
        <AnimatedText>
          <h1 className="text-4xl font-bold mb-6 text-foreground leading-tight mobile-landscape-text">
            {t('home.hero.title')}
            <span className="block text-3xl mt-2 text-navy">{t('home.hero.subtitle')}</span>
          </h1>
        </AnimatedText>
      </div>
      
      {/* Desktop & Tablet Title */}
      <div className="hidden md:block absolute top-[5%] lg:top-[17%] left-12 z-20 w-1/2">
        <AnimatedText>
          <h1 className="text-6xl lg:text-7xl font-bold text-foreground leading-tight">
            {t('home.hero.title')}
            <span className="block text-4xl lg:text-5xl mt-2 text-navy">{t('home.hero.subtitle')}</span>
          </h1>
        </AnimatedText>
      </div>
      
      {/* Desktop Subtitle */}
      <div className="hidden md:block absolute top-[50%] left-12 z-20 w-1/2">
        <AnimatedText delay={0.2}>
          <p className="text-xl text-foreground/80 font-medium leading-relaxed text-left">
            {t('home.hero.description')}
          </p>
        </AnimatedText>
      </div>
      
      {/* Mobile Portrait Subtitle */}
      <div className="block sm:hidden absolute top-[40%] left-6 z-20 w-3/4 mobile-landscape-subtitle">
        <AnimatedText delay={0.2}>
          <p className="text-base text-foreground/80 font-medium leading-relaxed text-left">
            AI-powered financing<br />
            that works for<br />
            everyone
          </p>
        </AnimatedText>
      </div>
      
      {/* Desktop Buttons - moved down 15% more, aligned with text */}
      <div className="hidden md:block absolute top-[73%] left-12 z-[120]">
        <div className="flex gap-4">
          <Button 
            className="h-16 text-xl bg-black hover:bg-black/90 text-white shadow-elegant px-12 font-semibold rounded-xl transition-all duration-300 hover:scale-105"
          >
            {t('home.hero.ctaPatients')}
          </Button>
          <Button 
            className="h-16 text-xl bg-black hover:bg-black/90 text-white shadow-elegant px-12 font-semibold rounded-xl transition-all duration-300 hover:scale-105"
          >
            {t('home.hero.ctaProviders')}
          </Button>
        </div>
      </div>

      {/* Mobile Portrait Buttons - Stacked vertically */}
      <div className="block sm:hidden absolute top-[55%] left-6 z-[150] mobile-landscape-button">
        <div className="flex flex-col gap-3">
          <Button 
            className="h-10 text-base bg-black hover:bg-black/90 text-white shadow-elegant px-4 font-semibold rounded-xl transition-all duration-300 hover:scale-105"
          >
            {t('home.hero.ctaPatients')}
          </Button>
          <Button 
            className="h-10 text-base bg-black hover:bg-black/90 text-white shadow-elegant px-4 font-semibold rounded-xl transition-all duration-300 hover:scale-105"
          >
            {t('home.hero.ctaProviders')}
          </Button>
        </div>
      </div>
    </section>
  );
};