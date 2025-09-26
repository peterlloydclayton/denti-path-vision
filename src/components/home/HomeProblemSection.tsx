import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { AlertTriangle, TrendingUp, Clock, Zap, Target, CheckCircle2 } from 'lucide-react';
import { AnimatedText } from '@/components/ui/animated-text';
import { ScrollReveal, StaggerContainer, StaggerItem } from '@/components/ui/enhanced-animations';

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

export const HomeProblemSection = () => {
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

  const handleCardHover = (index: number, isHovered: boolean) => {
    if (isHovered && !flippedCards.includes(index)) {
      setFlippedCards(prev => [...prev, index]);
    }
  };

  return (
    <section className="py-24 bg-gradient-to-b from-surface to-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Transforming Dental Finance
          </h2>
          <p className="text-xl text-muted-foreground max-w-4xl mx-auto mb-8">
            Traditional financing creates walls between patients and dental care, and between providers and fair compensation. 
            We're transforming the landscape with intelligent, dental-specific solutions that open new possibilities.
          </p>
        </ScrollReveal>

        <StaggerContainer className="grid md:grid-cols-3 gap-8" staggerDelay={0.2}>
          {problemCards.map((card, index) => (
            <StaggerItem key={index}>
              <div 
                className="relative h-96 perspective-1000"
                onMouseEnter={() => handleCardHover(index, true)}
              >
                <motion.div
                  className="relative w-full h-full transition-transform duration-700 preserve-3d"
                  animate={{ 
                    rotateY: flippedCards.includes(index) ? 180 : 0 
                  }}
                  style={{ transformStyle: 'preserve-3d' }}
                >
                  {/* Front Card - Traditional Problem */}
                  <Card className="absolute inset-0 backface-hidden border-muted-foreground/20 bg-background hover:shadow-lg transition-all duration-300">
                    <CardContent className="p-6 h-full flex flex-col justify-center text-center">
                      <motion.div 
                        className="p-3 bg-muted/20 rounded-xl mx-auto mb-4 w-fit"
                        whileHover={{ rotate: [0, -10, 10, -10, 0] }}
                        transition={{ duration: 0.5 }}
                      >
                        <card.icon className="h-10 w-10 text-muted-foreground" />
                      </motion.div>
                      
                      <div className="text-2xl font-bold text-muted-foreground mb-3">
                        {card.traditional.stat}
                      </div>
                      
                      <h3 className="text-lg font-semibold text-foreground mb-4">
                        {card.traditional.problem}
                      </h3>
                      
                      <p className="text-sm text-muted-foreground leading-relaxed flex-grow">
                        {card.traditional.description}
                      </p>
                      
                      <div className="mt-4 text-xs text-muted-foreground font-medium">
                        Traditional Banking
                      </div>
                    </CardContent>
                  </Card>

                  {/* Back Card - DentiPay Solution */}
                  <Card className="absolute inset-0 backface-hidden rotate-y-180 border-primary/30 bg-primary/5 hover:shadow-xl hover:shadow-primary/10 transition-all duration-300">
                    <CardContent className="p-6 h-full flex flex-col justify-center text-center">
                      <motion.div 
                        className="p-3 bg-primary/20 rounded-xl mx-auto mb-4 w-fit"
                        initial={{ scale: 0 }}
                        animate={{ scale: flippedCards.includes(index) ? 1 : 0 }}
                        transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
                      >
                        <CheckCircle2 className="h-10 w-10 text-primary" />
                      </motion.div>
                      
                      <div className="text-2xl font-bold text-primary mb-3">
                        {card.dentipay.stat}
                      </div>
                      
                      <h3 className="text-lg font-semibold text-foreground mb-4">
                        {card.dentipay.solution}
                      </h3>
                      
                      <p className="text-sm text-foreground leading-relaxed flex-grow">
                        {card.dentipay.description}
                      </p>
                      
                      <div className="mt-4 text-xs font-medium">
                        <span className="text-primary">DentiPay Intelligence</span>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>

        {/* Fighting For Impact Summary */}
        <ScrollReveal className="mt-16 text-center">
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-3 gap-8 mb-8">
              <motion.div 
                className="text-center"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="text-4xl font-bold text-primary mb-2">Patients</div>
                <div className="text-sm text-muted-foreground">No longer denied care due to traditional limits</div>
              </motion.div>
              <motion.div 
                className="text-center"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="text-4xl font-bold text-primary mb-2">Providers</div>
                <div className="text-sm text-muted-foreground">Get paid immediately, no more financing delays</div>
              </motion.div>
              <motion.div 
                className="text-center"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="text-4xl font-bold text-primary mb-2">Access</div>
                <div className="text-sm text-muted-foreground">Intelligent matching of need with capability</div>
              </motion.div>
            </div>
            
            <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary/10 border border-primary/20 text-primary font-semibold">
              <Zap className="w-5 h-5" />
              Transforming a future where financing never limits dental care
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};