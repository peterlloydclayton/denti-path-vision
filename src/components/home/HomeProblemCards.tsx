import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { AlertTriangle, TrendingUp, Clock, XCircle, CheckCircle } from 'lucide-react';
import { StaggerContainer, StaggerItem } from '@/components/ui/enhanced-animations';

interface ProblemCard {
  icon: any;
  traditional: {
    stat: string;
    problem: string;
    description: string;
  };
  dentipay: {
    stat: string;
    solution: string;
    description: string;
  };
}

export const HomeProblemCards = () => {
  const [flippedCards, setFlippedCards] = useState<number[]>([]);

  const problemCards: ProblemCard[] = [
    {
      icon: AlertTriangle,
      traditional: {
        stat: '<50%',
        problem: 'Financial Barriers',
        description: 'Less than half of Americans can afford a $1,000 dental emergency, forcing treatment delays.'
      },
      dentipay: {
        stat: '95%',
        solution: 'AI Pre-Qualification',
        description: 'Dental-specialized AI approves financing that traditional systems would reject.'
      }
    },
    {
      icon: Clock,
      traditional: {
        stat: '2-4 Weeks',
        problem: 'Approval Delays',
        description: 'Traditional lenders require extensive paperwork while conditions worsen.'
      },
      dentipay: {
        stat: '30 Seconds',
        solution: 'Instant Decisions',
        description: 'AI processes 50+ behavioral indicators for immediate financing decisions.'
      }
    },
    {
      icon: TrendingUp,
      traditional: {
        stat: '20-40%',
        problem: 'Generic Banking',
        description: 'Standard algorithms built for cars and houses miss qualified dental patients.'
      },
      dentipay: {
        stat: '300%',
        solution: 'Healthcare AI',
        description: 'Specialized AI understands dental patterns and structures payments that work.'
      }
    }
  ];

  // Auto-flip cards with staggered timing
  useEffect(() => {
    problemCards.forEach((_, index) => {
      const timer = setTimeout(() => {
        setFlippedCards(prev => [...prev, index]);
      }, 1000 + (index * 300)); // Stagger by 300ms each
      
      return () => clearTimeout(timer);
    });
  }, []);

  const handleCardClick = (index: number) => {
    if (!flippedCards.includes(index)) {
      setFlippedCards(prev => [...prev, index]);
    }
  };

  return (
    <StaggerContainer className="grid md:grid-cols-3 gap-8" staggerDelay={0.2}>
      {problemCards.map((card, index) => {
        const isFlipped = flippedCards.includes(index);
        
        return (
          <StaggerItem key={index}>
            <Card 
              className="h-full min-h-[350px] bg-background flex items-center justify-center cursor-pointer"
              onClick={() => handleCardClick(index)}
            >
              <CardContent className="p-7 w-full h-full flex flex-col justify-center">
                <div className="relative h-[280px] w-full">
                  {/* Traditional Card (Front) */}
                  <motion.div
                    initial={{ rotateY: 0 }}
                    animate={{ rotateY: isFlipped ? 180 : 0 }}
                    transition={{ duration: 0.6 }}
                    className="absolute inset-0 w-full"
                    style={{ backfaceVisibility: 'hidden' }}
                  >
                    <div className="flex flex-col items-center justify-center h-full p-7 bg-gray-200 rounded-lg border-l-4 border-gray-400">
                      <XCircle className="w-12 h-12 text-gray-400 mb-4" />
                      <div className="text-3xl font-bold text-gray-600 mb-3">
                        {card.traditional.stat}
                      </div>
                      <h3 className="text-lg font-semibold text-gray-700 mb-4 text-center">
                        {card.traditional.problem}
                      </h3>
                      <p className="text-center text-gray-600 text-sm leading-relaxed flex-grow">
                        {card.traditional.description}
                      </p>
                      <div className="mt-4 text-xs text-gray-400 font-semibold uppercase tracking-wide">
                        Traditional Banking
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
                    <div className="flex flex-col items-center justify-center h-full p-7 bg-[hsl(var(--dental-blue))] rounded-lg border-l-4 border-[hsl(var(--navy))]">
                      <CheckCircle className="w-12 h-12 text-[hsl(var(--navy))] mb-4" />
                      <div className="text-3xl font-bold text-[hsl(var(--navy))] mb-3">
                        {card.dentipay.stat}
                      </div>
                      <h3 className="text-lg font-semibold text-[hsl(var(--navy))] mb-4 text-center">
                        {card.dentipay.solution}
                      </h3>
                      <p className="text-center text-[hsl(var(--navy))] text-sm leading-relaxed flex-grow">
                        {card.dentipay.description}
                      </p>
                      <div className="mt-4 text-xs text-[hsl(var(--navy))] font-semibold uppercase tracking-wide">
                        DentiPay Intelligence
                      </div>
                    </div>
                  </motion.div>
                </div>
              </CardContent>
            </Card>
          </StaggerItem>
        );
      })}
    </StaggerContainer>
  );
};