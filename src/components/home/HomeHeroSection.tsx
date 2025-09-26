import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight, Brain, Zap, Target, Shield, Users, CreditCard } from 'lucide-react';
import { AnimatedText, SplitText } from '@/components/ui/animated-text';
import { ScrollReveal, MagneticButton, FloatingElements } from '@/components/ui/enhanced-animations';
import { GlowButton, ProgressiveImage } from '@/components/ui/micro-interactions';
import { PulseRipples } from '@/components/ui/pulse-ripples';
import dentistImage from '@/assets/dentists-group.png';

export const HomeHeroSection = () => {
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
          <div className="w-full min-h-screen relative z-[100]">
            <img 
              src={dentistImage}
              alt="Intelligence reshaping dental finance"
              className="absolute top-[35%] left-1/2 -translate-x-1/2 w-full object-cover object-top z-[110] h-[85vh]"
            />
          </div>
        </div>

        {/* Tablet Layout */}
        <div className="hidden sm:flex lg:hidden justify-center items-center min-h-screen">
          <div className="w-full min-h-screen relative z-[100]">
            <img 
              src={dentistImage}
              alt="Intelligence reshaping dental finance"
              className="absolute top-[35%] left-1/2 -translate-x-1/2 w-full object-cover object-top z-[110] h-[85vh]"
            />
          </div>
        </div>

        {/* Mobile Portrait Layout */}
        <div className="flex sm:hidden justify-start items-start pt-20 h-[calc(100vh-5rem)] ml-[25%]">
          <div className="w-full max-w-md h-[calc(100vh-5rem)] relative z-[100]">
            <img 
              src={dentistImage}
              alt="Intelligence reshaping dental finance"
              className="absolute bottom-[-15%] left-[-120px] transform-none w-auto object-contain object-bottom z-[110] max-w-none hero-image h-[calc(90vh-12rem)]"
            />
          </div>
        </div>
      </div>
      
      {/* Mobile Portrait Title */}
      <div className="block sm:hidden absolute top-[15%] left-6 z-20 w-3/4 mobile-landscape-title">
        <AnimatedText>
          <h1 className="text-4xl font-bold mb-6 text-foreground leading-tight mobile-landscape-text">
            Intelligence Reshaping Dental Finance
            <span className="block text-3xl mt-2 text-navy">Where Patients & Providers Win</span>
          </h1>
        </AnimatedText>
      </div>
      
      {/* Desktop & Tablet Title */}
      <div className="hidden md:block absolute top-[8%] lg:top-[20%] left-12 z-20 w-1/2">
        <AnimatedText>
          <h1 className="text-6xl lg:text-7xl font-bold text-foreground leading-tight">
            Intelligence Reshaping Dental Finance
            <span className="block text-4xl lg:text-5xl mt-2 text-navy">Where Patients & Providers Win</span>
          </h1>
        </AnimatedText>
      </div>
      
      {/* Desktop Subtitle */}
      <div className="hidden md:block absolute top-[50%] left-12 z-20 w-1/2">
        <AnimatedText delay={0.2}>
          <p className="text-xl text-foreground/80 font-medium leading-relaxed text-left">
            AI-powered solutions that understand dental care, creating instant approvals 
            for patients and guaranteed revenue for providers.
          </p>
        </AnimatedText>
      </div>
      
      {/* Mobile Portrait Subtitle */}
      <div className="block sm:hidden absolute top-[38%] left-6 z-20 w-3/4 mobile-landscape-subtitle">
        <AnimatedText delay={0.2}>
          <p className="text-base text-foreground/80 font-medium leading-relaxed text-left">
            AI-powered financing that works for everyone.
          </p>
        </AnimatedText>
      </div>
      
      {/* Desktop Buttons - Patient Left, Provider Right */}
      <div className="hidden md:block absolute top-[70%] left-12 z-[120]">
        <div className="flex gap-4">
          <Button 
            className="h-16 text-xl bg-dental-blue hover:bg-dental-blue-dark text-foreground shadow-elegant px-12 font-semibold rounded-xl transition-all duration-300 hover:scale-105"
          >
            For Patients
          </Button>
          <Button 
            className="h-16 text-xl bg-navy hover:bg-navy/90 text-navy-foreground shadow-elegant px-12 font-semibold rounded-xl transition-all duration-300 hover:scale-105"
          >
            For Providers
          </Button>
        </div>
      </div>

      {/* Mobile Portrait Button */}
      <div className="block sm:hidden absolute bottom-[20%] left-6 z-[150] mobile-landscape-button">
        <div className="flex flex-col gap-3">
          <Button 
            className="h-12 text-lg bg-dental-blue hover:bg-dental-blue-dark text-foreground shadow-elegant px-8 font-semibold rounded-xl transition-all duration-300 hover:scale-105"
          >
            For Patients
          </Button>
          <Button 
            className="h-12 text-lg bg-navy hover:bg-navy/90 text-navy-foreground shadow-elegant px-8 font-semibold rounded-xl transition-all duration-300 hover:scale-105"
          >
            For Providers
          </Button>
        </div>
      </div>
    </section>
  );
};