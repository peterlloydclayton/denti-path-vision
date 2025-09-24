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
      title: "DentiPay (The Brand Layer)",
      subtitle: "The trusted face for dentistry finance",
      color: "primary",
      borderColor: "primary/30",
      features: [
        { label: "Market Leverage:", desc: "A recognizable, unified financial brand increases patient trust and accelerates treatment acceptance." },
        { label: "Network Effect:", desc: "Every provider on DentiPay strengthens brand equity, creating shared patient familiarity across practices." },
        { label: "Speed to Adoption:", desc: "Brand credibility reduces patient hesitation and shortens decision cycles, converting more cases faster." }
      ],
      quote: "DentiPay isn't just another payment option—it's the financial face of modern dental care."
    },
    {
      icon: Globe,
      title: "PATH (The Portal)",
      subtitle: "The Patient Acceptance Treatment Hub", 
      color: "secondary",
      borderColor: "secondary/50",
      features: [
        { label: "Frictionless Intake:", desc: "A 2-minute application that removes awkward financial conversations and empowers patients to say 'yes' to treatment." },
        { label: "Smart, Instant Decisions:", desc: "Real-time pre-approvals with clear terms—no uncertainty, no waiting, no embarrassment." },
        { label: "Higher Case Acceptance:", desc: "Boost approval rates to 80% (vs. 45% industry average), unlocking larger treatment plans and increased revenue." }
      ],
      quote: "PATH eliminates the friction points that historically derail treatment acceptance, creating a direct route from diagnosis to treatment."
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
                        <p className="text-muted-foreground mb-4">{item.subtitle}</p>
                        
                        <div className="space-y-2 text-sm mb-6 flex-grow">
                          {item.features.map((feature, idx) => (
                            <div key={idx} className="text-left">
                              {typeof feature === 'string' ? (
                                <div>• {feature}</div>
                              ) : (
                                <div>
                                  <strong>{feature.label}</strong> {feature.desc}
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                        
                        <motion.blockquote 
                          className="text-sm italic text-muted-foreground pl-4 group-hover:border-l-8 transition-all duration-300 border-l-4 border-primary mb-6"
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