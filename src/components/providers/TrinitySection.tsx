import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Cpu, Globe, Brain } from 'lucide-react';
import { AnimatedText } from '@/components/ui/animated-text';
import { StaggerContainer, StaggerItem } from '@/components/ui/enhanced-animations';
import { PathModal } from './PathModal';
import { ScopeModal } from './ScopeModal';

export const TrinitySection = () => {
  const [isPathModalOpen, setIsPathModalOpen] = useState(false);
  const [isScopeModalOpen, setIsScopeModalOpen] = useState(false);

  const trinityItems = [
    {
      icon: Cpu,
      title: "DentiPay",
      subtitle: "Brand Layer",
      color: "primary",
      borderColor: "primary/30",
      features: [
        "Trusted dental financing brand",
        "Provider network leverage", 
        "Patient confidence builder"
      ],
      quote: "The brand patients trust for dental financing"
    },
    {
      icon: Globe,
      title: "PATH",
      subtitle: "Patient Portal", 
      color: "secondary",
      borderColor: "secondary/50",
      features: [
        "94% approval accuracy",
        "30-second decisions",
        "Seamless integration"
      ],
      quote: "Instant financing decisions that work"
    },
    {
      icon: Brain,
      title: "SCOPE",
      subtitle: "Intelligence Engine",
      color: "success",
      borderColor: "success/50",
      features: [
        { label: "Clinical Triage:", desc: "Treatment necessity analysis" },
        { label: "Financial Engine:", desc: "30+ data point assessment" }
      ],
      quote: "Intelligence that understands dental care"
    }
  ];

  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-6">
        <AnimatedText className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            One Brand. One Portal. One System.
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            The DentiPay Trinity: Brand leverage, patient portal, and intelligence engine working in perfect harmony.
          </p>
        </AnimatedText>

        <StaggerContainer>
          <div className="grid md:grid-cols-3 gap-8 relative">

            {trinityItems.map((item, index) => {
              const Icon = item.icon;
              return (
                <StaggerItem key={index}>
                  <motion.div
                    whileHover={{ y: -8, scale: 1.02 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Card className={`group hover:shadow-elegant transition-all duration-300 ${
                      index === 0 ? 'border-primary/30 hover:border-primary' :
                      index === 1 ? 'border-primary/30 hover:border-primary' :
                      'border-primary/30 hover:border-primary'
                    } h-full`}>
                      <CardContent className="p-8 text-center h-full flex flex-col">
                        <motion.div 
                          className="bg-primary text-primary-foreground w-16 h-16 rounded-xl flex items-center justify-center mx-auto mb-6"
                          whileHover={{ scale: 1.1, rotate: 5 }}
                          transition={{ duration: 0.2 }}
                        >
                          <Icon className="w-8 h-8" />
                        </motion.div>
                        
                        <h3 className="text-2xl font-bold mb-2 group-hover:scale-105 transition-transform text-dental-blue-dark">
                          {item.title}
                        </h3>
                        <p className="text-muted-foreground mb-6">{item.subtitle}</p>
                        
                        <motion.blockquote 
                          className="text-sm italic text-muted-foreground pl-4 group-hover:border-l-8 transition-all duration-300 border-l-4 border-primary mb-6 flex-grow"
                          whileHover={{ x: 4 }}
                        >
                          "{item.quote}"
                        </motion.blockquote>

                        {/* Learn More button for PATH and SCOPE */}
                        {(index === 1 || index === 2) && (
                          <Button
                            onClick={() => {
                              if (index === 1) setIsPathModalOpen(true);
                              if (index === 2) setIsScopeModalOpen(true);
                            }}
                            variant="outline"
                            className="mt-auto"
                          >
                            Learn More
                          </Button>
                        )}
                      </CardContent>
                    </Card>
                  </motion.div>
                </StaggerItem>
              );
            })}
          </div>
        </StaggerContainer>

        {/* Modals */}
        <PathModal isOpen={isPathModalOpen} onClose={() => setIsPathModalOpen(false)} />
        <ScopeModal isOpen={isScopeModalOpen} onClose={() => setIsScopeModalOpen(false)} />
      </div>
    </section>
  );
};