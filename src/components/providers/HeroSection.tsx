import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { AnimatedText } from '@/components/ui/animated-text';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import { ProviderSignupModal } from './ProviderSignupModal';

export const HeroSection = () => {
  const { t } = useTranslation('marketing');
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <section className="h-screen relative z-30 overflow-hidden">
      {/* Controlled Background */}
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
      
      <div className="w-full px-2 md:px-6 h-screen overflow-visible relative">
        {/* Desktop Layout */}
        <div className="hidden md:flex justify-center items-center min-h-screen">
          {/* Right Hero Image - Centered */}
          <div className="w-full min-h-screen relative z-[100]">
            <img 
              src="https://res.cloudinary.com/drxvhwze4/image/upload/v1759199955/dentist-male-asian_upscayl_2x_upscayl-standard-4x_sn0djl.png"
              alt="Professional dentist providing quality care"
              className="absolute bottom-0 left-1/2 -translate-x-1/2 w-auto object-contain object-bottom z-[110] max-w-none hero-image h-[85vh]"
            />
          </div>
        </div>

        {/* Mobile Portrait Layout */}
        <div className="flex sm:hidden justify-start items-start pt-20 h-[calc(100vh-5rem)] ml-[25%]">
          {/* Right Hero Image - Centered */}
          <div className="w-full max-w-md h-[calc(100vh-5rem)] relative z-[100]">
            <img 
              src="https://res.cloudinary.com/drxvhwze4/image/upload/v1759199955/dentist-male-asian_upscayl_2x_upscayl-standard-4x_sn0djl.png"
              alt="Professional dentist providing quality care"
              className="absolute bottom-[-10%] left-[-100px] transform-none w-auto object-contain object-bottom z-[110] max-w-none hero-image h-[calc(90vh-12rem)]"
            />
          </div>
        </div>
      </div>
      
      {/* Mobile Portrait Title */}
      <div className="block sm:hidden absolute top-[12%] mobile-landscape:top-[26%] left-6 mobile-landscape:left-4 z-20 w-3/4 mobile-landscape:w-[45%]">
        <AnimatedText>
          <h1 className="text-5xl mobile-landscape:text-2xl font-bold mb-6 mobile-landscape:mb-2 text-foreground leading-none mobile-landscape:leading-tight">
            {t('providers.hero.title')}
          </h1>
          <h2 className="block text-3xl mobile-landscape:hidden text-intelligence font-semibold mb-6">
            {t('providers.hero.subtitle')}
          </h2>
        </AnimatedText>
      </div>
      
      {/* Desktop & Tablet Title */}
      <div className="hidden md:block absolute top-[15%] mobile-landscape:top-[26%] left-12 mobile-landscape:left-8 z-20 w-1/2 mobile-landscape:w-[45%]">
        <AnimatedText>
          <h1 className="text-6xl md:text-7xl mobile-landscape:text-3xl font-bold text-foreground">
            {t('providers.hero.title')}
          </h1>
          <h2 className="block text-4xl mobile-landscape:hidden mt-8 text-intelligence font-semibold">
            {t('providers.hero.subtitle')}
          </h2>
        </AnimatedText>
      </div>
      
      {/* Desktop Description */}
      <div className="hidden md:block absolute top-[63%] mobile-landscape:top-[55%] left-12 mobile-landscape:left-8 z-20 w-1/2 mobile-landscape:w-[45%]">
        <AnimatedText delay={0.2}>
          <p className="text-xl mobile-landscape:text-xs text-foreground/80 font-medium leading-relaxed text-left">
            {t('providers.hero.description')}
          </p>
        </AnimatedText>
      </div>
      
      {/* Desktop Button */}
      <div className="hidden md:block absolute top-[80%] mobile-landscape:top-[75%] max-h-[800px]:top-[85%] max-h-[700px]:top-[88%] left-12 mobile-landscape:left-8 z-[120]">
        <Button 
          onClick={() => setIsModalOpen(true)}
          className="h-16 mobile-landscape:h-10 text-xl mobile-landscape:text-sm bg-black hover:bg-black/90 text-white shadow-elegant px-12 mobile-landscape:px-6 font-semibold rounded-xl transition-all duration-300 hover:scale-105"
        >
          {t('providers.hero.cta')}
        </Button>
      </div>

      {/* Mobile Portrait Description */}
      <div className="block sm:hidden absolute top-[43%] mobile-landscape:top-[35%] left-6 mobile-landscape:left-4 z-20 w-3/4 mobile-landscape:w-[45%]">
        <AnimatedText delay={0.2}>
          <p className="text-base mobile-landscape:text-xs text-foreground/80 font-medium leading-relaxed text-left whitespace-pre-line">
            {t('providers.hero.mobileDescription')}
          </p>
        </AnimatedText>
      </div>

      {/* Mobile Portrait Button */}
      <div className="block sm:hidden absolute top-[58%] mobile-landscape:top-[52%] left-6 mobile-landscape:left-4 z-[150]">
        <Button 
          className="h-10 mobile-landscape:h-8 text-base mobile-landscape:text-sm bg-black hover:bg-black/90 text-white shadow-elegant px-4 mobile-landscape:px-3 font-semibold rounded-xl transition-all duration-300 hover:scale-105"
          onClick={() => setIsModalOpen(true)}
        >
          {t('providers.hero.cta')}
        </Button>
      </div>

      <ProviderSignupModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </section>
  );
};