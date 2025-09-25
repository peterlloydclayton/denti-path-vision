import { useState, useEffect, useRef } from 'react';
import { XCircle, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { EmblaParallaxCarousel } from '@/components/ui/embla-parallax-carousel';
import { Card, CardContent } from '@/components/ui/card';

export const WorkflowComparison = () => {
  const [activeSlide, setActiveSlide] = useState(0);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  
  const workflowSteps = [
    {
      traditional: 'Patient inquiry about financing',
      dentipay: 'Patient expresses treatment interest'
    },
    {
      traditional: 'Manual credit application',
      dentipay: 'Instant SCOPE intelligence analysis'
    },
    {
      traditional: 'Wait 24-48 hours for response',
      dentipay: 'Real-time approval in <30 seconds'
    },
    {
      traditional: 'Often rejected or insufficient amount',
      dentipay: 'Personalized financing options'
    },
    {
      traditional: 'Patient seeks alternatives',
      dentipay: 'Patient accepts treatment'
    },
    {
      traditional: 'Treatment delayed or cancelled',
      dentipay: 'Immediate treatment scheduling'
    },
    {
      traditional: 'Lost revenue and patient trust',
      dentipay: 'Guaranteed payment to provider'
    },
    {
      traditional: 'Administrative burden continues',
      dentipay: 'Automated payment management'
    }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Flip card when it becomes the active slide
  useEffect(() => {
    if (isVisible && !flippedCards.includes(activeSlide)) {
      const timer = setTimeout(() => {
        setFlippedCards(prev => [...prev, activeSlide]);
      }, 1200);
      
      return () => clearTimeout(timer);
    }
  }, [activeSlide, isVisible, flippedCards]);

  const handleSlideChange = (slideIndex: number) => {
    setActiveSlide(slideIndex);
  };

  const createCard = (step: typeof workflowSteps[0], index: number) => {
    const isFlipped = flippedCards.includes(index);
    
    return (
      <Card className="h-full min-h-[300px] bg-background flex items-center justify-center">
        <CardContent className="p-7 w-full h-full flex flex-col justify-center">
          <div className="relative h-[220px] w-full">
            {/* Traditional Card (Front) */}
            <motion.div
              initial={{ rotateY: 0 }}
              animate={{ rotateY: isFlipped ? 180 : 0 }}
              transition={{ duration: 0.6 }}
              className="absolute inset-0 w-full"
              style={{ backfaceVisibility: 'hidden' }}
            >
              <div className="flex flex-col items-center justify-center h-full p-7 bg-gray-100 rounded-lg border-l-4 border-gray-400 grayscale">
                <XCircle className="w-9 h-9 text-gray-400 mb-4" />
                <p className="text-center text-gray-600 font-medium leading-relaxed text-base">
                  {step.traditional}
                </p>
                <div className="mt-4 text-xs text-gray-400 font-semibold uppercase tracking-wide">
                  Traditional Process
                </div>
              </div>
            </motion.div>
            
            {/* DentiPay Card (Back) */}
            <motion.div
              initial={{ rotateY: -180 }}
              animate={{ rotateY: isFlipped ? 0 : -180 }}
              transition={{ duration: 0.6 }}
              className="absolute inset-0 w-full"
              style={{ backfaceVisibility: 'hidden' }}
            >
              <div className="flex flex-col items-center justify-center h-full p-7 bg-dental-blue rounded-lg border-l-4 border-navy">
                <CheckCircle className="w-9 h-9 text-navy mb-4" />
                <p className="text-center text-navy font-medium leading-relaxed text-base">
                  {step.dentipay}
                </p>
                <div className="mt-4 text-xs text-navy font-semibold uppercase tracking-wide">
                  DentiPay Solution
                </div>
              </div>
            </motion.div>
          </div>
        </CardContent>
      </Card>
    );
  };

  const slides = workflowSteps.map((step, index) => createCard(step, index));

  return (
    <section ref={sectionRef} className="py-24 bg-background">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            AI Powered Approvals. Instant Decisions
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Swipe through to see how traditional financing transforms into intelligent solutions
          </p>
        </div>

        {/* Mobile: Stacked layout */}
        <div className="block lg:hidden">
          <EmblaParallaxCarousel 
            slides={slides}
            className="max-w-6xl mx-auto mb-12"
            options={{ align: 'start', loop: true }}
            onSlideChange={handleSlideChange}
          />
          
          {/* Image Section for mobile */}
          <div className="flex justify-center">
            <div className="max-w-2xl">
              <motion.img 
                src="https://res.cloudinary.com/drxvhwze4/image/upload/v1758760600/financing-approved-computer_gzdfei.png" 
                alt="Financing approval notice displayed on computer screen with approval checkmark"
                className="w-full h-auto rounded-lg shadow-lg"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: isVisible ? 1 : 0, scale: isVisible ? 1 : 0.8 }}
                transition={{ duration: 1.2, ease: "easeOut", delay: 0.3 }}
              />
            </div>
          </div>
        </div>

        {/* Desktop/Landscape: Side by side layout */}
        <div className="hidden lg:flex lg:items-center lg:gap-8 max-w-7xl mx-auto">
          {/* Carousel Section */}
          <div className="flex-1">
            <EmblaParallaxCarousel 
              slides={slides}
              className="max-w-4xl"
              options={{ align: 'start', loop: true }}
              onSlideChange={handleSlideChange}
            />
          </div>
          
          {/* Image Section */}
          <div className="flex-shrink-0 w-80">
            <motion.img 
              src="https://res.cloudinary.com/drxvhwze4/image/upload/v1758760600/financing-approved-computer_gzdfei.png" 
              alt="Financing approval notice displayed on computer screen with approval checkmark"
              className="w-full h-auto rounded-lg shadow-lg"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: isVisible ? 1 : 0, scale: isVisible ? 1 : 0.8 }}
              transition={{ duration: 1.2, ease: "easeOut", delay: 0.3 }}
            />
          </div>
        </div>
      </div>
    </section>
  );
};