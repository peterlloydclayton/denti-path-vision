import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { AlertTriangle, TrendingUp, Clock, XCircle, CheckCircle } from 'lucide-react';
import { StaggerContainer, StaggerItem } from '@/components/ui/enhanced-animations';
import { useTranslation } from 'react-i18next';

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
  const { t, i18n } = useTranslation('marketing');
  const isSpanish = i18n.language === 'es';
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  const problemCards: ProblemCard[] = [
    {
      icon: AlertTriangle,
      traditional: {
        stat: t('home.problem.cards.card1.traditionalStat'),
        problem: t('home.problem.cards.card1.traditionalProblem'),
        description: t('home.problem.cards.card1.traditionalDescription')
      },
      dentipay: {
        stat: t('home.problem.cards.card1.dentipayStat'),
        solution: t('home.problem.cards.card1.dentipaySolution'),
        description: t('home.problem.cards.card1.dentipayDescription')
      }
    },
    {
      icon: Clock,
      traditional: {
        stat: t('home.problem.cards.card2.traditionalStat'),
        problem: t('home.problem.cards.card2.traditionalProblem'),
        description: t('home.problem.cards.card2.traditionalDescription')
      },
      dentipay: {
        stat: t('home.problem.cards.card2.dentipayStat'),
        solution: t('home.problem.cards.card2.dentipaySolution'),
        description: t('home.problem.cards.card2.dentipayDescription')
      }
    },
    {
      icon: TrendingUp,
      traditional: {
        stat: t('home.problem.cards.card3.traditionalStat'),
        problem: t('home.problem.cards.card3.traditionalProblem'),
        description: t('home.problem.cards.card3.traditionalDescription')
      },
      dentipay: {
        stat: t('home.problem.cards.card3.dentipayStat'),
        solution: t('home.problem.cards.card3.dentipaySolution'),
        description: t('home.problem.cards.card3.dentipayDescription')
      }
    }
  ];

  // Intersection observer to detect when cards come into view
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

  // Auto-flip cards with staggered timing when visible
  useEffect(() => {
    if (isVisible) {
      problemCards.forEach((_, index) => {
        const timer = setTimeout(() => {
          setFlippedCards(prev => [...prev, index]);
        }, 500 + (index * 300)); // Stagger by 300ms each
        
        return () => clearTimeout(timer);
      });
    }
  }, [isVisible]);

  const handleCardClick = (index: number) => {
    if (!flippedCards.includes(index)) {
      setFlippedCards(prev => [...prev, index]);
    }
  };

  return (
    <div ref={sectionRef}>
      <StaggerContainer className="grid md:grid-cols-3 gap-8" staggerDelay={0.2}>
      {problemCards.map((card, index) => {
        const isFlipped = flippedCards.includes(index);
        
        return (
          <StaggerItem key={index}>
            <Card 
              className={`h-full ${isSpanish ? 'min-h-[400px]' : 'min-h-[350px]'} bg-background flex items-center justify-center cursor-pointer`}
              onClick={() => handleCardClick(index)}
            >
              <CardContent className="p-7 w-full h-full flex flex-col justify-center">
                <div className={`relative ${isSpanish ? 'h-[320px]' : 'h-[280px]'} w-full`}>
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
                        {t('home.problem.traditionalBanking')}
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
                        {t('home.problem.dentipayIntelligence')}
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
    </div>
  );
};