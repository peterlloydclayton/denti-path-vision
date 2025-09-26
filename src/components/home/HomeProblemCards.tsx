import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AlertTriangle, TrendingUp, Clock } from 'lucide-react';
import { AnimatedText } from '@/components/ui/animated-text';
import { StaggerContainer, StaggerItem } from '@/components/ui/enhanced-animations';

export const HomeProblemCards = () => {
  const problemCards = [
    {
      icon: AlertTriangle,
      title: "Financial Barriers",
      subtitle: "AI Pre-Qualification Solution",
      traditional: {
        stat: '<50%',
        description: 'Less than half of Americans can afford a $1,000 dental emergency, forcing treatment delays.'
      },
      dentipay: {
        stat: '95%',
        description: 'Dental-specialized AI approves financing that traditional systems would reject.'
      },
      features: [
        "Instant pre-qualification assessment",
        "Dental-specific risk modeling", 
        "Behavioral pattern analysis"
      ],
      quote: "Intelligence that sees beyond credit scores"
    },
    {
      icon: Clock,
      title: "Approval Delays",
      subtitle: "Instant Decision Engine",
      traditional: {
        stat: '2-4 Weeks',
        description: 'Traditional lenders require extensive paperwork while conditions worsen.'
      },
      dentipay: {
        stat: '30 Seconds',
        description: 'AI processes 50+ behavioral indicators for immediate financing decisions.'
      },
      features: [
        "Real-time decision processing",
        "50+ data point analysis",
        "Immediate treatment approval"
      ],
      quote: "Speed that matches healthcare urgency"
    },
    {
      icon: TrendingUp,
      title: "Generic Banking",
      subtitle: "Healthcare AI Specialization",
      traditional: {
        stat: '20-40%',
        description: 'Standard algorithms built for cars and houses miss qualified dental patients.'
      },
      dentipay: {
        stat: '300%',
        description: 'Specialized AI understands dental patterns and structures payments that work.'
      },
      features: [
        "Healthcare-specialized algorithms",
        "Treatment-specific financing",
        "Provider network integration"
      ],
      quote: "AI that understands dental care"
    }
  ];

  return (
    <section className="py-24 bg-gradient-to-b from-surface to-background">
      <div className="container mx-auto px-6">
        <AnimatedText className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Transforming Dental Finance
          </h2>
          <p className="text-xl text-muted-foreground max-w-4xl mx-auto mb-8">
            Traditional financing creates walls between patients and dental care, and between providers and fair compensation. 
            We're transforming the landscape with intelligent, dental-specific solutions that open new possibilities.
          </p>
        </AnimatedText>

        <StaggerContainer>
          <div className="grid md:grid-cols-3 gap-8 relative">
            {problemCards.map((card, index) => {
              const Icon = card.icon;
              return (
                <StaggerItem key={index}>
                  <motion.div
                    whileHover={{ y: -8, scale: 1.02 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Card className="group hover:shadow-elegant transition-all duration-300 border-primary/30 hover:border-primary h-full">
                      <CardContent className="p-8 text-center h-full flex flex-col">
                        <motion.div 
                          className="bg-primary text-primary-foreground w-16 h-16 rounded-xl flex items-center justify-center mx-auto mb-6"
                          whileHover={{ scale: 1.1, rotate: 5 }}
                          transition={{ duration: 0.2 }}
                        >
                          <Icon className="w-8 h-8" />
                        </motion.div>
                        
                        <h3 className="text-2xl font-bold mb-2 group-hover:scale-105 transition-transform text-dental-blue-dark">
                          {card.title}
                        </h3>
                        <p className="text-muted-foreground mb-6">{card.subtitle}</p>
                        
                        {/* Traditional vs DentiPay Stats */}
                        <div className="mb-6 space-y-4">
                          <div className="text-left">
                            <div className="text-sm text-muted-foreground mb-1">Traditional:</div>
                            <div className="flex items-center gap-2">
                              <span className="text-lg font-bold text-muted-foreground">{card.traditional.stat}</span>
                              <span className="text-sm text-muted-foreground">approval rate</span>
                            </div>
                          </div>
                          <div className="text-left">
                            <div className="text-sm text-primary mb-1">DentiPay:</div>
                            <div className="flex items-center gap-2">
                              <span className="text-lg font-bold text-primary">{card.dentipay.stat}</span>
                              <span className="text-sm text-primary">success rate</span>
                            </div>
                          </div>
                        </div>
                        
                        <div className="space-y-2 text-sm mb-6 flex-grow text-left">
                          {card.features.map((feature, idx) => (
                            <div key={idx}>
                              • {feature}
                            </div>
                          ))}
                        </div>
                        
                        <motion.blockquote 
                          className="text-sm italic text-muted-foreground pl-4 group-hover:border-l-8 transition-all duration-300 border-l-4 border-primary mb-6"
                          whileHover={{ x: 4 }}
                        >
                          "{card.quote}"
                        </motion.blockquote>

                        <Button
                          variant="outline"
                          className="mt-auto"
                        >
                          Learn More
                        </Button>
                      </CardContent>
                    </Card>
                  </motion.div>
                </StaggerItem>
              );
            })}
          </div>
        </StaggerContainer>

        {/* Impact Summary */}
        <div className="mt-16 text-center">
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
          </div>
        </div>
      </div>
    </section>
  );
};