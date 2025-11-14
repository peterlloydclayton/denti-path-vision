import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle, Shield, Lock, TrendingUp, Award } from 'lucide-react';
import { AnimatedText } from '@/components/ui/animated-text';
import { StaggerContainer, StaggerItem } from '@/components/ui/enhanced-animations';
import { useNavigate } from 'react-router-dom';
import dentistImage from '@/assets/mature-dentist-male-latin.png';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import { ProviderSignupModal } from './ProviderSignupModal';

export const FinalCTASection = () => {
  const { t } = useTranslation('marketing');
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const steps = [
    { number: 1, title: t('providers.finalCTA.steps.demo.title'), description: t('providers.finalCTA.steps.demo.description') },
    { number: 2, title: t('providers.finalCTA.steps.trial.title'), description: t('providers.finalCTA.steps.trial.description') },
    { number: 3, title: t('providers.finalCTA.steps.boost.title'), description: t('providers.finalCTA.steps.boost.description') }
  ];

  const features = [
    t('providers.finalCTA.features.integration'),
    t('providers.finalCTA.features.echo'), 
    t('providers.finalCTA.features.analytics'),
    t('providers.finalCTA.features.manager'),
    t('providers.finalCTA.features.training'),
    t('providers.finalCTA.features.marketing')
  ];

  const securityFeatures = [
    { icon: Shield, title: t('providers.finalCTA.security.bankLevel') },
    { icon: Lock, title: t('providers.finalCTA.security.hipaa') },
    { icon: TrendingUp, title: t('providers.finalCTA.security.uptime') },
    { icon: Award, title: t('providers.finalCTA.security.integration') }
  ];

  return (
    <>
      {/* Trust Based Platform Section */}
      <section className="py-24 bg-background text-foreground">
        <div className="container mx-auto px-6">
          <motion.div 
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <AnimatedText>
              <h2 className="text-4xl md:text-5xl font-bold mb-16">{t('providers.finalCTA.trustTitle')}</h2>
            </AnimatedText>
            
            <StaggerContainer>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
                {securityFeatures.map((feature, index) => {
                  const Icon = feature.icon;
                  return (
                    <StaggerItem key={index}>
                      <motion.div 
                        className="text-center group"
                        whileHover={{ y: -4, scale: 1.05 }}
                        transition={{ duration: 0.2 }}
                      >
                        <motion.div
                          whileHover={{ rotate: 5, scale: 1.1 }}
                          transition={{ duration: 0.2 }}
                          className="mb-4"
                        >
                          <Icon className="w-12 h-12 mx-auto group-hover:text-primary transition-colors duration-300" />
                        </motion.div>
                        <div className="text-lg font-semibold group-hover:text-primary transition-colors duration-300">
                          {feature.title}
                        </div>
                      </motion.div>
                    </StaggerItem>
                  );
                })}
              </div>
            </StaggerContainer>
          </motion.div>
        </div>
      </section>

      <section className="py-24 bg-primary-foreground text-primary">
        <div className="container mx-auto px-6">
          <AnimatedText className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-8">
              {t('providers.finalCTA.title')}
            </h2>
          </AnimatedText>

          {/* Three Steps */}
          <StaggerContainer>
            <div className="grid md:grid-cols-3 gap-8 mb-16 max-w-4xl mx-auto">
              {steps.map((step, index) => (
                <StaggerItem key={index}>
                  <motion.div
                    whileHover={{ y: -4, scale: 1.02 }}
                    transition={{ duration: 0.3 }}
                    className="h-full"
                  >
                    <Card className="bg-primary border-primary/20 text-primary-foreground text-center hover:bg-primary/90 transition-all duration-300 hover:shadow-elegant h-full">
                      <CardContent className="p-6 flex flex-col h-full">
                        <motion.div 
                          className="w-12 h-12 bg-primary-foreground text-primary rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold"
                          whileHover={{ scale: 1.1, rotate: 5 }}
                          transition={{ duration: 0.2 }}
                        >
                          {step.number}
                        </motion.div>
                        <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                        <p className="text-sm opacity-90">{step.description}</p>
                      </CardContent>
                    </Card>
                  </motion.div>
                </StaggerItem>
              ))}
            </div>
          </StaggerContainer>

          {/* Everything You Need */}
          <motion.div 
            className="max-w-4xl mx-auto mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <AnimatedText>
              <h3 className="text-2xl font-bold text-center mb-8">{t('providers.finalCTA.everythingTitle')}</h3>
            </AnimatedText>
            
            <div className="grid md:grid-cols-2 gap-6">
              {features.map((feature, index) => (
                <motion.div 
                  key={index}
                  className="flex items-center gap-3"
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ x: 4, scale: 1.02 }}
                >
                  <CheckCircle className="w-5 h-5 text-success flex-shrink-0" />
                  <span className="hover:text-primary/80 transition-colors duration-300">{feature}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Button - White Background Section */}
      <section className="bg-white text-primary py-16 md:py-24 relative overflow-hidden min-h-[500px] md:min-h-[400px]">
        <div className="container mx-auto px-6 relative flex flex-col items-center justify-between h-full">
          <motion.div 
            className="flex flex-col items-center z-10"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="mb-6">
              <Button 
                onClick={() => setIsModalOpen(true)}
                className="bg-black text-white hover:bg-black/90 px-16 py-6 text-2xl font-bold rounded-xl shadow-elegant hover:shadow-xl transition-all duration-300"
              >
                {t('providers.finalCTA.getStarted')}
              </Button>
            </motion.div>
            <motion.p 
              className="text-lg text-muted-foreground font-medium mb-8 md:mb-0"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              {t('providers.finalCTA.joinText')}
            </motion.p>
          </motion.div>
        </div>
        
        {/* Mobile Image - Completely Flush with Bottom */}
        <motion.div 
          className="md:hidden absolute bottom-0 left-0 right-0 flex justify-center"
          style={{ margin: 0, padding: 0 }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.7 }}
        >
          <img 
            src={dentistImage} 
            alt="Professional dentist" 
            className="w-72 h-auto object-contain"
            style={{ margin: 0, padding: 0, display: 'block' }}
          />
        </motion.div>
        
        {/* Desktop Image - Left Side, Bottom Aligned */}
        <motion.div 
          className="absolute left-0 bottom-0 w-[22.5rem] h-auto hidden md:block"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.7 }}
        >
          <img 
            src={dentistImage} 
            alt="Professional dentist" 
            className="w-full h-auto object-contain"
          />
        </motion.div>
      </section>

      <ProviderSignupModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
};