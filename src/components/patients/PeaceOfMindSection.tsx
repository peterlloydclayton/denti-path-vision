import { CheckCircle, Zap, CreditCard, Headphones, TrendingUp, ChevronDown } from 'lucide-react';
import { ParallaxSection } from '@/components/ui/parallax-section';
import { AnimatedText } from '@/components/ui/animated-text';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { peaceOfMindFeatures } from '@/data/patientsData';

export const PeaceOfMindSection = () => {
  const iconMap = {
    Zap,
    CreditCard,
    Headphones,
    TrendingUp
  };

  // Different dental blue shades for variety
  const colorVariants = [
    { 
      bg: 'bg-dental-blue-dark/10', 
      icon: 'text-dental-blue-dark',
      accent: 'border-l-dental-blue',
      trigger: 'hover:bg-dental-blue-muted/50'
    },
    { 
      bg: 'bg-dental-blue-darker/10', 
      icon: 'text-dental-blue-darker',
      accent: 'border-l-dental-blue',
      trigger: 'hover:bg-dental-blue/20'
    },
    { 
      bg: 'bg-dental-blue-dark/15', 
      icon: 'text-dental-blue-dark',
      accent: 'border-l-dental-blue',
      trigger: 'hover:bg-dental-blue-muted/40'
    },
    { 
      bg: 'bg-dental-blue-darker/15', 
      icon: 'text-dental-blue-darker',
      accent: 'border-l-dental-blue',
      trigger: 'hover:bg-dental-blue/25'
    }
  ];

  return (
    <ParallaxSection className="py-24 bg-background" offset={30}>
      <div className="container mx-auto px-6">
        <AnimatedText className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Peace of Mind, Built-In
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Experience dental financing designed with your comfort and confidence in mind
          </p>
        </AnimatedText>

        <div className="max-w-4xl mx-auto">
          <Accordion type="single" collapsible className="space-y-4">
            {peaceOfMindFeatures.map((feature, index) => {
              const Icon = iconMap[feature.icon as keyof typeof iconMap];
              const colors = colorVariants[index % colorVariants.length];
              
              return (
                <AnimatedText key={index} delay={index * 0.1}>
                  <AccordionItem 
                    value={`item-${index}`} 
                    className={`border rounded-2xl overflow-hidden shadow-soft hover:shadow-elegant transition-smooth ${colors.accent} border-l-4`}
                  >
                    <AccordionTrigger className={`px-8 py-6 hover:no-underline ${colors.trigger} transition-smooth`}>
                      <div className="flex items-center gap-6 text-left">
                        <div className={`w-16 h-16 rounded-2xl ${colors.bg} flex items-center justify-center flex-shrink-0`}>
                          <Icon size={32} className={colors.icon} />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-xl font-bold text-foreground">{feature.title}</h3>
                          <p className="text-muted-foreground mt-1 hidden sm:block">
                            {feature.features.length} key benefits included
                          </p>
                        </div>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="px-8 pb-6">
                      <div className="ml-22 space-y-4">
                        <div className={`h-px ${colors.bg} mb-6`}></div>
                        <ul className="grid gap-3">
                          {feature.features.map((item, idx) => (
                            <li key={idx} className="flex items-start gap-3 text-foreground">
                              <CheckCircle size={18} className={`${colors.icon} mt-0.5 flex-shrink-0`} />
                              <span className="text-base leading-relaxed">{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </AnimatedText>
              );
            })}
          </Accordion>
        </div>
      </div>
    </ParallaxSection>
  );
};