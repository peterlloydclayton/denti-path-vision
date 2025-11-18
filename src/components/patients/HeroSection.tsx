import { Button } from '@/components/ui/button';
import { AnimatedText } from '@/components/ui/animated-text';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

export const HeroSection = () => {
  const { t } = useTranslation('marketing');
  const navigate = useNavigate();
  return (
    <section className="h-screen relative z-30 overflow-hidden">
      {/* Controlled Background */}
      <div className="absolute inset-0 bg-primary"></div>
      
      {/* Image Container */}
      <div className="w-full px-2 md:px-6 h-screen overflow-visible relative">
        {/* Desktop & Tablet Layout */}
        <div className="hidden sm:flex justify-end items-end h-screen">
          <div className="w-3/5 h-full relative z-10">
            <img 
              src="https://res.cloudinary.com/drxvhwze4/image/upload/v1758032045/patient-woman-latina_t6hmm3.png"
              alt="Happy patient with dental financing"
              className="absolute bottom-0 right-0 h-[130vh] md:h-[150vh] lg:h-[180vh] w-auto object-contain object-bottom"
            />
          </div>
        </div>

        {/* Mobile Portrait Layout */}
        <div className="flex sm:hidden justify-start items-start pt-20 h-[calc(100vh-5rem)] ml-[37.5%]">
          <div className="w-full max-w-md h-[calc(100vh-5rem)] relative z-10">
            <img 
              src="https://res.cloudinary.com/drxvhwze4/image/upload/v1758032045/patient-woman-latina_t6hmm3.png"
              alt="Happy patient with dental financing"
              className="absolute bottom-[-5%] left-[-160px] transform-none w-auto object-contain object-bottom z-10 max-w-none h-[calc(90vh-12rem)]"
            />
          </div>
        </div>
      </div>

      {/* Mobile Portrait Title */}
      <div className="block sm:hidden absolute top-[12%] landscape:top-[8%] left-6 landscape:left-4 z-20 w-3/4 landscape:w-[45%]">
        <AnimatedText>
          <h1 className="text-4xl landscape:text-2xl font-bold text-foreground leading-tight landscape:leading-tight">
            {t('patients.hero.title')}
          </h1>
        </AnimatedText>
      </div>

      {/* Mobile Portrait Button */}
      <div className="block sm:hidden absolute bottom-[8%] landscape:bottom-[5%] left-6 landscape:left-4 z-20 w-auto">
        <Button 
          className="h-12 landscape:h-10 text-base landscape:text-sm bg-black text-white hover:bg-black/80 shadow-elegant px-8 landscape:px-6 font-semibold"
          onClick={() => navigate('/patient-financing-application')}
        >
          {t('patients.hero.cta')}
        </Button>
      </div>

      {/* Desktop & Tablet Title */}
      <div className="hidden sm:block absolute top-[10%] left-6 md:left-12 z-20 w-full md:w-1/2">
        <AnimatedText>
          <h1 className="text-6xl md:text-7xl font-bold text-foreground">
            {t('patients.hero.title')}
          </h1>
        </AnimatedText>
        
        <div className="mt-8 md:mt-16">
          <AnimatedText delay={0.2}>
            <h2 className="text-4xl text-gray-600 font-medium italic">
              {t('patients.hero.subtitle')}
            </h2>
          </AnimatedText>
          <AnimatedText delay={0.4}>
            <h2 className="text-4xl text-gray-600 font-medium mt-4">
              {t('patients.hero.subtitle2')}
            </h2>
          </AnimatedText>
        </div>
      </div>

      {/* Desktop Button - positioned to match home page */}
      <div className="hidden sm:block absolute bottom-[15%] left-6 md:left-12 z-20">
        <Button 
          className="h-12 md:h-16 text-base md:text-xl bg-black text-white hover:bg-black/80 shadow-elegant px-8 md:px-12 font-semibold"
          onClick={() => navigate('/patient-financing-application')}
        >
          {t('patients.hero.cta')}
        </Button>
      </div>
    </section>
  );
};