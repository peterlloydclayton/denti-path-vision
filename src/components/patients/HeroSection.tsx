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
      
      {/* Hero Image - Right Side - All Screens */}
      <div className="absolute right-0 bottom-0 h-full w-1/2 md:w-2/5 z-10">
        <img 
          src="https://res.cloudinary.com/drxvhwze4/image/upload/v1758032045/patient-woman-latina_t6hmm3.png"
          alt="Happy patient with dental financing"
          className="absolute bottom-0 right-0 h-[200vh] w-auto object-contain object-bottom"
        />
      </div>

      {/* Content Container - Left Side */}
      <div className="container mx-auto px-6 md:px-12 h-screen relative z-20 flex flex-col justify-between py-20 md:py-24">
        {/* Title - Upper Left */}
        <div className="w-full md:w-1/2 lg:w-2/5">
          <AnimatedText>
            <h1 className="text-4xl sm:text-5xl md:text-hero-mobile lg:text-hero font-bold text-foreground leading-tight">
              {t('patients.hero.title')}
            </h1>
          </AnimatedText>
        </div>

        {/* Middle Spacer for proper vertical distribution */}
        <div className="flex-1" />

        {/* Subtitle - Middle Left (hidden on mobile landscape, visible on portrait and desktop) */}
        <div className="w-full md:w-1/2 lg:w-2/5 hidden portrait:block lg:block">
          <AnimatedText delay={0.2}>
            <h2 className="text-base md:text-xl text-gray-600 font-medium leading-relaxed italic">
              {t('patients.hero.subtitle')}
            </h2>
          </AnimatedText>
          <AnimatedText delay={0.4}>
            <h2 className="text-base md:text-xl text-gray-600 font-medium leading-relaxed mt-2 md:mt-3">
              {t('patients.hero.subtitle2')}
            </h2>
          </AnimatedText>
        </div>

        {/* Bottom Spacer */}
        <div className="flex-1" />

        {/* Button - Lower Left */}
        <div className="w-full md:w-auto">
          <Button 
            className="h-12 md:h-16 text-base md:text-xl bg-black text-white hover:bg-black/80 shadow-elegant px-8 md:px-12 font-semibold"
            onClick={() => navigate('/patient-financing-application')}
          >
            {t('patients.hero.cta')}
          </Button>
        </div>
      </div>
    </section>
  );
};