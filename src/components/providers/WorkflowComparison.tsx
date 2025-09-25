import { useState, useEffect, useRef } from 'react';
import { XCircle, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';

export const WorkflowComparison = () => {
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  
  const traditionalSteps = [
    'Patient inquiry about financing',
    'Manual credit application',
    'Wait 24-48 hours for response',
    'Often rejected or insufficient amount',
    'Patient seeks alternatives',
    'Treatment delayed or cancelled',
    'Lost revenue and patient trust',
    'Administrative burden continues'
  ];

  const dentipaySteps = [
    'Patient expresses treatment interest',
    'Instant SCOPE intelligence analysis',
    'Real-time approval in <30 seconds',
    'Personalized financing options',
    'Patient accepts treatment',
    'Immediate treatment scheduling',
    'Guaranteed payment to provider',
    'Automated payment management'
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

  useEffect(() => {
    if (!isVisible) return;

    const interval = setInterval(() => {
      setFlippedCards(prev => {
        const nextIndex = prev.length;
        if (nextIndex < traditionalSteps.length) {
          return [...prev, nextIndex];
        }
        return prev;
      });
    }, 1500);

    return () => clearInterval(interval);
  }, [traditionalSteps.length, isVisible]);

  return (
    <section ref={sectionRef} className="py-24 bg-background">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            AI Powered Approvals. Instant Decisions
          </h2>
        </div>

        {/* Desktop: Two column layout, Mobile: Stacked */}
        <div className="flex flex-col lg:flex-row lg:items-start lg:gap-12 max-w-6xl mx-auto">
          {/* Left Column: Workflow List */}
          <div className="lg:flex-1 lg:max-w-2xl">
            <h3 className="text-2xl font-bold text-gray-600 mb-8 text-center lg:text-left">From Traditional financing Flow to the Future of Dental Financing</h3>
            <div className="space-y-4">
              {traditionalSteps.map((step, index) => {
                const isFlipped = flippedCards.includes(index);
                return (
                  <div key={index} className="relative h-[72px]">
                    <motion.div
                      initial={{ rotateY: 0 }}
                      animate={{ rotateY: isFlipped ? 180 : 0 }}
                      transition={{ duration: 0.6 }}
                      className="absolute inset-0 w-full"
                      style={{ backfaceVisibility: 'hidden' }}
                    >
                      <div className="flex items-start gap-4 p-4 bg-gray-100 rounded-lg border-l-4 border-gray-400 h-full grayscale">
                        <div className="flex items-start gap-2">
                          <XCircle className="w-5 h-5 text-gray-400 mt-0.5 flex-shrink-0" />
                          <span className="text-sm text-gray-600">{step}</span>
                        </div>
                      </div>
                    </motion.div>
                    
                    <motion.div
                      initial={{ rotateY: -180 }}
                      animate={{ rotateY: isFlipped ? 0 : -180 }}
                      transition={{ duration: 0.6 }}
                      className="absolute inset-0 w-full"
                      style={{ backfaceVisibility: 'hidden' }}
                    >
                      <div className="flex items-start gap-4 p-4 bg-dental-blue rounded-lg border-l-4 border-navy h-full">
                        <div className="flex items-start gap-2">
                          <CheckCircle className="w-5 h-5 text-navy mt-0.5 flex-shrink-0" />
                          <span className="text-sm text-navy">{dentipaySteps[index]}</span>
                        </div>
                      </div>
                    </motion.div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Column: Image */}
          <div className="mt-12 lg:mt-20 lg:flex-1 lg:max-w-lg lg:sticky lg:top-8">
            <div className="max-w-2xl mx-auto lg:max-w-none">
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
      </div>
    </section>
  );
};