import { motion } from 'framer-motion';
import { AnimatedText } from '@/components/ui/animated-text';
import { Enhanced3DCard } from './Enhanced3DCard';
import { CreditCard, Clock, Shield, Heart } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

export const BenefitsSection = () => {
  const { t } = useTranslation('marketing');
  const navigate = useNavigate();

  const benefits = [
    {
      icon: CreditCard,
      title: t('patients.benefits.cards.flexible.title'),
      description: t('patients.benefits.cards.flexible.description'),
      detail: t('patients.benefits.cards.flexible.detail')
    },
    {
      icon: Clock,
      title: t('patients.benefits.cards.instant.title'),
      description: t('patients.benefits.cards.instant.description'),
      detail: t('patients.benefits.cards.instant.detail')
    },
    {
      icon: Shield,
      title: t('patients.benefits.cards.noFees.title'),
      description: t('patients.benefits.cards.noFees.description'),
      detail: t('patients.benefits.cards.noFees.detail')
    },
    {
      icon: Heart,
      title: t('patients.benefits.cards.health.title'),
      description: t('patients.benefits.cards.health.description'),
      detail: t('patients.benefits.cards.health.detail')
    }
  ];
  
  return (
    <section className="pt-24 pb-16 bg-dental-blue relative overflow-hidden">
      <div className="container mx-auto px-6 relative z-20">
        <AnimatedText className="text-center mb-20">
          <h2 className="text-4xl md:text-6xl font-bold mb-6 text-foreground">
            {t('patients.benefits.title')}
          </h2>
          <p className="text-xl md:text-2xl text-foreground/80 max-w-4xl mx-auto leading-relaxed">
            {t('patients.benefits.subtitle')}
          </p>
        </AnimatedText>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto perspective-1000">
          {benefits.map((benefit, index) => (
            <Enhanced3DCard 
              key={index} 
              benefit={benefit} 
              index={index} 
            />
          ))}
        </div>

        <div className="flex justify-center mt-12">
          <Button 
            className="h-14 text-lg bg-black text-white hover:bg-black/80 shadow-elegant px-10 font-semibold"
            onClick={() => navigate('/patient-financing-application')}
          >
            {t('patients.benefits.cta')}
          </Button>
        </div>

        {/* Decorative elements */}
        <div className="absolute top-1/2 left-4 w-2 h-2 bg-white/30 rounded-full animate-pulse" />
        <div className="absolute top-1/3 right-1/4 w-1 h-1 bg-white/20 rounded-full animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute bottom-1/4 left-1/3 w-1.5 h-1.5 bg-white/25 rounded-full animate-pulse" style={{ animationDelay: '2s' }} />
      </div>
    </section>
  );
};