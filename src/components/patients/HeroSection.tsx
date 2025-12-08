import { Button } from '@/components/ui/button';
import { AnimatedText } from '@/components/ui/animated-text';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

export const HeroSection = () => {
  const { t } = useTranslation('marketing');
  const navigate = useNavigate();
  return (
    <section className="h-screen relative z-30 overflow-hidden mobile-landscape:overflow-visible">
      {/* Controlled Background */}
      <div className="absolute inset-0 bg-primary"></div>
      
      {/* Image Container */}
      <div className="w-full px-2 md:px-6 h-screen overflow-visible relative">
        {/* Desktop & Tablet Layout */}
        <div className="hidden sm:flex justify-center items-center min-h-screen">
          <div className="w-full min-h-screen relative z-10">
            <img 
              src="https://res.cloudinary.com/drxvhwze4/image/upload/v1758032045/patient-woman-latina_t6hmm3.png"
              alt="Happy patient with dental financing"
              className="absolute bottom-0 mobile-landscape:bottom-0 left-1/2 -translate-x-1/2 w-auto object-contain object-bottom z-10 max-w-none hero-image h-[127.5vh]"
            />
          </div>
        </div>

        {/* Mobile Portrait Layout */}
        <div className="flex sm:hidden justify-start items-start pt-20 h-[calc(100vh-5rem)] ml-[37.5%]">
          <div className="w-full max-w-md h-[calc(100vh-5rem)] relative z-10">
            <img 
              src="https://res.cloudinary.com/drxvhwze4/image/upload/v1758032045/patient-woman-latina_t6hmm3.png"
              alt="Happy patient with dental financing"
              className="absolute bottom-[-5%] mobile-landscape:bottom-[0%] left-[-160px] transform-none w-auto object-contain object-bottom z-10 max-w-none h-[calc(90vh-12rem)]"
            />
          </div>
        </div>
      </div>

      {/* Mobile Portrait Title */}
      <div className="block sm:hidden absolute top-[12%] mobile-landscape:top-[26%] left-6 mobile-landscape:left-4 z-20 w-3/4 mobile-landscape:w-[45%]">
        <AnimatedText>
          <h1 className="text-4xl mobile-landscape:text-2xl font-bold text-foreground leading-tight mobile-landscape:leading-tight">
            {t('patients.hero.title')}
          </h1>
        </AnimatedText>
        <div className="mt-[5vh] mobile-landscape:hidden">
          <AnimatedText delay={0.2}>
            <h3 className="text-2xl text-gray-600 font-medium">
              {t('patients.hero.subtitle')}
            </h3>
          </AnimatedText>
        </div>
      </div>

      {/* Landscape Mobile Subtitle - positioned below title */}
      <div className="hidden mobile-landscape:block absolute top-[55%] left-8 z-20 w-[45%]">
        <AnimatedText delay={0.2}>
          <p className="text-xs text-foreground/80 font-medium leading-relaxed text-left">
            {t('patients.hero.subtitle')}
          </p>
        </AnimatedText>
      </div>

      {/* Mobile Portrait Button */}
      <div className="block sm:hidden absolute top-[58%] mobile-landscape:bottom-[10%] left-6 mobile-landscape:left-4 z-20 w-auto">
        <Button 
          className="h-12 mobile-landscape:h-10 text-base mobile-landscape:text-sm bg-black text-white hover:bg-black/80 shadow-elegant px-8 mobile-landscape:px-6 font-semibold"
          onClick={() => navigate('/patient-financing-application')}
        >
          {t('patients.hero.cta')}
        </Button>
      </div>

      {/* Desktop & Tablet Title */}
      <div className="hidden sm:block absolute top-[15%] mobile-landscape:top-[26%] left-6 md:left-12 mobile-landscape:left-8 z-20 w-full md:w-1/2 mobile-landscape:w-[45%]">
        <AnimatedText>
          <h1 className="text-6xl md:text-7xl mobile-landscape:text-3xl font-bold text-foreground">
            {t('patients.hero.title')}
          </h1>
        </AnimatedText>
        
        <div className="mt-8 md:mt-16 mobile-landscape:hidden">
          <AnimatedText delay={0.2}>
            <h3 className="text-4xl text-gray-600 font-medium">
              {t('patients.hero.subtitle')}
            </h3>
          </AnimatedText>
        </div>
      </div>

      {/* Desktop Button - positioned to match home page */}
      <div className="hidden sm:block absolute bottom-[15%] mobile-landscape:bottom-[13%] left-6 md:left-12 mobile-landscape:left-8 z-20">
        <Button 
          className="h-12 md:h-16 mobile-landscape:h-10 text-base md:text-xl mobile-landscape:text-sm bg-black text-white hover:bg-black/80 shadow-elegant px-8 md:px-12 mobile-landscape:px-6 font-semibold"
          onClick={() => navigate('/patient-financing-application')}
        >
          {t('patients.hero.cta')}
        </Button>
      </div>
    </section>
  );
};