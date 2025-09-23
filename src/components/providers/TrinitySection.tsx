import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Zap, Globe, Brain } from 'lucide-react';
import { AnimatedText } from '@/components/ui/animated-text';
import { StaggerContainer, StaggerItem } from '@/components/ui/enhanced-animations';

export const TrinitySection = () => {
  const trinityItems = [
    {
      icon: Zap,
      title: "DentiPay",
      subtitle: "Brand Layer",
      color: "dental-blue-dark",
      borderColor: "dental-blue/30",
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
      color: "dental-blue",
      borderColor: "dental-blue/50",
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
            {/* Animated Connecting Lines */}
            <motion.div 
              className="hidden md:block absolute top-1/2 left-1/3 w-1/3 h-0.5 bg-dental-blue origin-left"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
              viewport={{ once: true }}
            />
            <motion.div 
              className="hidden md:block absolute top-1/2 right-1/3 w-1/3 h-0.5 bg-dental-blue origin-right"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              transition={{ duration: 1, delay: 0.8 }}
              viewport={{ once: true }}
            />

            {trinityItems.map((item, index) => {
              const Icon = item.icon;
              return (
                <StaggerItem key={index}>
                  <motion.div
                    whileHover={{ y: -8, scale: 1.02 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Card className={`group hover:shadow-elegant transition-all duration-300 border-${item.borderColor} hover:border-${item.color} h-full`}>
                      <CardContent className="p-8 text-center h-full flex flex-col">
                        <motion.div 
                          className={`w-16 h-16 bg-${item.color} text-white rounded-xl flex items-center justify-center mx-auto mb-6`}
                          whileHover={{ scale: 1.1, rotate: 5 }}
                          transition={{ duration: 0.2 }}
                        >
                          <Icon className="w-8 h-8" />
                        </motion.div>
                        
                        <h3 className={`text-2xl font-bold mb-2 text-${item.color} group-hover:scale-105 transition-transform`}>
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
                          className={`text-sm italic text-muted-foreground border-l-4 border-${item.color} pl-4 group-hover:border-l-8 transition-all duration-300`}
                          whileHover={{ x: 4 }}
                        >
                          "{item.quote}"
                        </motion.blockquote>
                      </CardContent>
                    </Card>
                  </motion.div>
                </StaggerItem>
              );
            })}
          </div>
        </StaggerContainer>
      </div>
    </section>
  );
};