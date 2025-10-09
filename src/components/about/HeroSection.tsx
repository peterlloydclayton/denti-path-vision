import { AnimatedText } from '@/components/ui/animated-text';
import { Button } from '@/components/ui/button';
import heroNeuralNetwork from '@/assets/hero-neural-network.mp4';
import { useEffect, useRef } from 'react';

export const HeroSection = () => {
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
        <div className="hidden lg:flex justify-center items-center min-h-screen">
          {/* Right Hero Video - Centered */}
          <div className="w-full max-w-md xl:max-w-lg 2xl:max-w-xl min-h-screen relative z-[100]">
            <video 
              ref={videoRef1}
              src={heroNeuralNetwork}
              autoPlay
              loop
              muted
              playsInline
              className="absolute bottom-[-10%] left-1/2 xl:left-[25%] 2xl:left-[25%] -translate-x-1/2 xl:-translate-x-1/2 2xl:-translate-x-1/2 w-auto object-contain object-bottom z-[110] max-w-none hero-image h-[61vh]"
            />
          </div>
        </div>

        {/* Tablet Layout */}
        <div className="hidden sm:flex lg:hidden justify-center items-center min-h-screen">
          {/* Right Hero Video - Centered */}
          <div className="w-full max-w-[240px] min-h-screen relative z-[100]">
            <video 
              ref={videoRef2}
              src={heroNeuralNetwork}
              autoPlay
              loop
              muted
              playsInline
              className="absolute bottom-[-15%] left-[-10%] w-auto object-contain object-bottom z-[110] max-w-none hero-image h-[20vh]"
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
              className="absolute bottom-[5%] left-[40%] -translate-x-1/2 w-auto object-contain object-bottom z-[110] max-w-none hero-image h-[calc(60vh-12rem)]"
            />
          </div>
        </div>
      </div>
      
      {/* Mobile Portrait Title */}
      <div className="block sm:hidden absolute top-[15%] left-6 z-[130] w-3/4 mobile-landscape-title">
        <AnimatedText>
          <h1 className="text-5xl font-bold mb-6 text-dental-blue leading-none mobile-landscape-text">
            Transforming Dental Finance Through Intelligence
          </h1>
        </AnimatedText>
      </div>
      
      {/* Desktop & Tablet Title */}
      <div className="hidden md:block absolute top-[8%] lg:top-[20%] left-12 z-[130] w-[90%] lg:w-1/2">
        <AnimatedText>
          <h1 className="text-hero-mobile md:text-hero font-bold text-dental-blue">
            Transforming Dental Finance<br className="md:block lg:hidden" />{' '}
            <span className="text-dental-blue">Through Intelligence</span>
          </h1>
        </AnimatedText>
      </div>
      
      {/* Desktop Subtitle */}
      <div className="hidden md:block absolute top-[40%] lg:top-[50%] left-12 z-[130] w-2/5">
        <AnimatedText delay={0.2}>
          <p className="text-xl text-dental-blue/80 font-medium leading-relaxed text-left">
            DentiPay is pioneering a new category of healthcare finance — 
            where artificial intelligence meets human compassion to make 
            dental care accessible to everyone
          </p>
        </AnimatedText>
      </div>
      
      
      {/* Desktop Button */}
      <div className="hidden md:block absolute top-[70%] left-12 z-[120]">
        <Button 
          className="h-16 text-xl bg-dental-blue text-black hover:bg-dental-blue/80 shadow-elegant px-12 font-semibold rounded-xl transition-all duration-300 hover:scale-105"
        >
          Learn Our Story
        </Button>
      </div>

      {/* Mobile Portrait Button */}
      <div className="block sm:hidden absolute top-[52%] left-6 z-[150] mobile-landscape-button">
        <Button 
          className="h-12 text-lg bg-dental-blue text-black hover:bg-dental-blue/80 shadow-elegant px-8 font-semibold rounded-xl transition-all duration-300 hover:scale-105"
        >
          Learn Our Story
        </Button>
      </div>
    </section>
  );
};