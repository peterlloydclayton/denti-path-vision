import { AnimatedText } from '@/components/ui/animated-text';
import { Button } from '@/components/ui/button';
import heroNeuralNetwork from '@/assets/hero-neural-network.mp4';
import { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';

export const HeroSection = () => {
  const { t, i18n } = useTranslation('marketing');
  const isSpanish = i18n.language === 'es';
  const videoRef1 = useRef<HTMLVideoElement>(null);
  const videoRef2 = useRef<HTMLVideoElement>(null);
  const videoRef3 = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    [videoRef1, videoRef2, videoRef3].forEach(ref => {
      if (ref.current) {
        ref.current.playbackRate = 0.5;
      }
    });
  }, []);

  return (
    <section className="h-screen relative z-30 overflow-hidden">
      {/* Controlled Background */}
      <div className="absolute inset-0 bg-black" style={{ height: '100vh' }}></div>
      
      <div className="container mx-auto px-2 md:px-6 h-screen overflow-hidden relative">
        {/* Desktop Layout */}
        <div className="hidden md:flex justify-center items-center min-h-screen">
          {/* Right Hero Video - Centered */}
          <div className="w-full max-w-md min-h-screen relative z-[100]">
            <video 
              ref={videoRef1}
              src={heroNeuralNetwork}
              autoPlay
              loop
              muted
              playsInline
              className="absolute bottom-[-10%] left-1/2 -translate-x-1/2 w-auto object-contain object-bottom z-[110] max-w-none hero-image h-[61vh]"
            />
          </div>
        </div>

        {/* Mobile Portrait Layout */}
        <div className="flex sm:hidden justify-start items-start pt-20 h-[calc(100vh-5rem)] ml-[25%]">
          {/* Right Hero Video - Centered */}
          <div className="w-full max-w-md h-[calc(100vh-5rem)] relative z-[100]">
            <video 
              ref={videoRef3}
              src={heroNeuralNetwork}
              autoPlay
              loop
              muted
              playsInline
              className="absolute bottom-0 left-[40%] -translate-x-1/2 w-auto object-contain object-bottom z-[110] max-w-none hero-image h-[calc(60vh-12rem)]"
            />
          </div>
        </div>
      </div>
      
      {/* Mobile Portrait Title */}
      <div className="block sm:hidden absolute top-[15%] left-6 z-[130] w-3/4">
        <AnimatedText>
          <h1 className="text-5xl font-bold text-dental-blue leading-none">
            {t('about.hero.title')}
          </h1>
        </AnimatedText>
      </div>
      
      {/* Tablet & Desktop Title - More responsive sizing */}
      <div className="hidden sm:block absolute top-[13%] md:top-[15%] left-6 sm:left-8 md:left-12 z-[130] w-[85%] sm:w-[75%] md:w-[70%]">
        <AnimatedText>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-dental-blue leading-tight">
            {t('about.hero.title')}
          </h1>
        </AnimatedText>
      </div>
      
      {/* Subtitle - Only show on larger screens where there's space */}
      <div className="hidden md:block absolute top-[50%] left-12 z-[130] w-2/5">
        <AnimatedText delay={0.2}>
          <p className="text-xl text-dental-blue/80 font-medium leading-relaxed text-left">
            {t('about.hero.subtitle')}
          </p>
        </AnimatedText>
      </div>
      
      {/* Tablet & Desktop Button - Using bottom positioning to avoid overlap */}
      <div className="hidden sm:block absolute bottom-[12%] md:bottom-[15%] left-6 sm:left-8 md:left-12 z-[130]">
        <Button 
          className="h-12 sm:h-14 md:h-16 text-base sm:text-lg md:text-xl bg-dental-blue text-black hover:bg-dental-blue/80 shadow-elegant px-8 sm:px-10 md:px-12 font-semibold rounded-xl transition-all duration-300 hover:scale-105"
        >
          {t('about.hero.cta')}
        </Button>
      </div>

      {/* Mobile Portrait Button */}
      <div className={`block sm:hidden absolute ${isSpanish ? 'top-[57%]' : 'top-[52%]'} left-6 z-[130]`}>
        <Button 
          className="h-12 text-lg bg-dental-blue text-black hover:bg-dental-blue/80 shadow-elegant px-8 font-semibold rounded-xl transition-all duration-300 hover:scale-105"
        >
          {t('about.hero.cta')}
        </Button>
      </div>
    </section>
  );
};