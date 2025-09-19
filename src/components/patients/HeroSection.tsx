import { Button } from '@/components/ui/button';
import { AnimatedText } from '@/components/ui/animated-text';

export const HeroSection = () => {
  return (
    <section className="min-h-screen relative z-30 overflow-visible">
      {/* Controlled Background */}
      <div className="absolute inset-0 bg-dental-blue" style={{ height: '100vh' }}></div>
      
      <div className="container mx-auto px-2 md:px-6 min-h-screen overflow-visible relative">
        {/* Desktop Layout */}
        <div className="hidden lg:flex justify-center items-center min-h-screen">
          {/* Right Hero Image - Centered */}
          <div className="w-full max-w-md xl:max-w-lg 2xl:max-w-xl min-h-screen relative z-[100]">
            <img 
              src="https://res.cloudinary.com/drxvhwze4/image/upload/v1758032045/patient-woman-latina_t6hmm3.png"
              alt="Happy patient with dental financing"
              className="absolute bottom-0 left-1/2 xl:left-[40%] 2xl:left-[40%] -translate-x-1/2 xl:-translate-x-1/2 2xl:-translate-x-1/2 w-auto object-contain object-bottom z-[110] max-w-none hero-image h-[85vh]"
            />
          </div>
        </div>

        {/* Tablet Layout */}
        <div className="hidden sm:flex lg:hidden justify-center items-center min-h-screen">
          {/* Right Hero Image - Centered */}
          <div className="w-full max-w-md min-h-screen relative z-[100]">
            <img 
              src="https://res.cloudinary.com/drxvhwze4/image/upload/v1758032045/patient-woman-latina_t6hmm3.png"
              alt="Happy patient with dental financing"
              className="absolute bottom-0 left-[5%] w-auto object-contain object-bottom z-[110] max-w-none hero-image h-[85vh]"
            />
          </div>
        </div>

        {/* Mobile Portrait Layout */}
        <div className="flex sm:hidden justify-start items-start pt-20 h-[calc(100vh-5rem)] ml-[25%]">
          {/* Right Hero Image - Centered */}
          <div className="w-full max-w-md h-[calc(100vh-5rem)] relative z-[100]">
            <img 
              src="https://res.cloudinary.com/drxvhwze4/image/upload/v1758032045/patient-woman-latina_t6hmm3.png"
              alt="Happy patient with dental financing"
              className="absolute bottom-16 left-[-120px] transform-none w-auto object-contain object-bottom z-[110] max-w-none hero-image h-[calc(90vh-12rem)]"
            />
          </div>
        </div>
      </div>
      
      {/* Mobile Portrait Title */}
      <div className="block sm:hidden absolute top-[15%] left-6 z-20 w-3/4 mobile-landscape-title">
        <AnimatedText>
          <h1 className="text-4xl font-bold mb-6 text-foreground leading-tight mobile-landscape-text">
            Making Your<br />
            Dream Smile<br />
            Affordable
          </h1>
        </AnimatedText>
      </div>
      
      {/* Desktop & Tablet Title - positioned where subtitle was on mobile */}
      <div className="hidden md:block absolute top-[8%] lg:top-[20%] left-12 z-20 w-1/2">
        <AnimatedText>
          <h1 className="text-6xl lg:text-7xl font-bold text-foreground leading-tight">
            Making Your<br />
            Dream Smile<br />
            Affordable
          </h1>
        </AnimatedText>
      </div>
      
      {/* Desktop Subtitle - positioned below title */}
      <div className="hidden md:block absolute top-[50%] left-12 z-20 w-1/2">
        <AnimatedText delay={0.2}>
          <h2 className="text-xl text-gray-600 font-medium leading-relaxed text-left italic">
            Ai Driven Financing For Smarter & More Affordable Payment Options
          </h2>
        </AnimatedText>
      </div>
      
      {/* Mobile Portrait Subtitle - Hidden on mobile landscape */}
      <div className="block sm:hidden absolute top-[34%] left-6 z-20 w-1/2 mobile-landscape-subtitle">
        <AnimatedText delay={0.2}>
          <h2 className="text-lg text-gray-600 font-medium leading-relaxed text-left italic">
            Ai Driven Financing For Smarter & More Affordable Payment Options
          </h2>
        </AnimatedText>
      </div>
      
      {/* Desktop Button */}
      <div className="hidden md:block absolute top-[60%] left-12 z-[120]">
        <Button className="h-16 text-xl bg-primary text-primary-foreground hover:bg-primary/90 shadow-elegant px-12 font-semibold">
          Get Financing
        </Button>
      </div>

      {/* Mobile Portrait Button - Lower on landscape */}
      <div className="block sm:hidden absolute bottom-[30%] left-6 z-[150] mobile-landscape-button">
        <Button className="h-12 text-lg bg-primary text-primary-foreground hover:bg-primary/90 shadow-elegant px-8 font-semibold">
          Get Financing
        </Button>
      </div>
    </section>
  );
};