import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Cpu, Globe, Brain } from 'lucide-react';
import { AnimatedText } from '@/components/ui/animated-text';
import { StaggerContainer, StaggerItem } from '@/components/ui/enhanced-animations';
import { PathModal } from './PathModal';
import { ScopeModal } from './ScopeModal';
import { DentiPayModal } from './DentiPayModal';
import { useTranslation } from 'react-i18next';

export const TrinitySection = () => {
  const { t } = useTranslation('marketing');
  const [isPathModalOpen, setIsPathModalOpen] = useState(false);
  const [isScopeModalOpen, setIsScopeModalOpen] = useState(false);
  const [isDentiPayModalOpen, setIsDentiPayModalOpen] = useState(false);

  const trinityItems = [
    {
      icon: Cpu,
      title: t('providers.trinity.items.dentipay.title'),
      subtitle: t('providers.trinity.items.dentipay.subtitle'),
      color: "primary",
      borderColor: "primary/30",
      features: [
        t('providers.trinity.items.dentipay.features.trusted'),
        t('providers.trinity.items.dentipay.features.network'), 
        t('providers.trinity.items.dentipay.features.confidence')
      ],
      quote: t('providers.trinity.items.dentipay.quote')
    },
    {
      icon: Globe,
      title: t('providers.trinity.items.path.title'),
      subtitle: t('providers.trinity.items.path.subtitle'), 
      color: "secondary",
      borderColor: "secondary/50",
      features: [
        t('providers.trinity.items.path.features.approval'),
        t('providers.trinity.items.path.features.decisions'),
        t('providers.trinity.items.path.features.integration')
      ],
      quote: t('providers.trinity.items.path.quote')
    },
    {
      icon: Brain,
      title: t('providers.trinity.items.scope.title'),
      subtitle: t('providers.trinity.items.scope.subtitle'),
      color: "success",
      borderColor: "success/50",
      features: [
        { label: t('providers.trinity.items.scope.features.triage'), desc: t('providers.trinity.items.scope.features.triageDesc') },
        { label: t('providers.trinity.items.scope.features.engine'), desc: t('providers.trinity.items.scope.features.engineDesc') }
      ],
      quote: t('providers.trinity.items.scope.quote')
    }
  ];

  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-6">
        <AnimatedText className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            {t('providers.trinity.title')}
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            {t('providers.trinity.description')}
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

                        {/* Learn More button for all cards */}
                        <Button
                          onClick={() => {
                            if (index === 0) setIsDentiPayModalOpen(true);
                            if (index === 1) setIsPathModalOpen(true);
                            if (index === 2) setIsScopeModalOpen(true);
                          }}
                          variant="outline"
                          className="mt-auto"
                        >
                          {t('providers.trinity.learnMore')}
                        </Button>
                      </CardContent>
                    </Card>
                  </motion.div>
                </StaggerItem>
              );
            })}
          </div>
        </StaggerContainer>

        {/* Modals */}
        <DentiPayModal isOpen={isDentiPayModalOpen} onClose={() => setIsDentiPayModalOpen(false)} />
        <PathModal isOpen={isPathModalOpen} onClose={() => setIsPathModalOpen(false)} />
        <ScopeModal isOpen={isScopeModalOpen} onClose={() => setIsScopeModalOpen(false)} />
      </div>
    </section>
  );
};