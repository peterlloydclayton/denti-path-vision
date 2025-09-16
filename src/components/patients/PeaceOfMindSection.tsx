import { CheckCircle, Zap, CreditCard, Headphones, TrendingUp } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { ParallaxSection } from '@/components/ui/parallax-section';
import { AnimatedText } from '@/components/ui/animated-text';
import { peaceOfMindFeatures } from '@/data/patientsData';

export const PeaceOfMindSection = () => {
  const iconMap = {
    Zap,
    CreditCard,
    Headphones,
    TrendingUp
  };

  return (
    <ParallaxSection className="py-24 bg-gradient-subtle" offset={30}>
      <div className="container mx-auto px-6">
        <AnimatedText className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Peace of Mind, Built-In
          </h2>
        </AnimatedText>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
          {peaceOfMindFeatures.map((feature, index) => {
            const Icon = iconMap[feature.icon as keyof typeof iconMap];
            return (
              <AnimatedText key={index} delay={index * 0.1}>
                <Card className="hover:shadow-soft transition-smooth hover:-translate-y-1 h-full">
                  <CardContent className="p-6">
                    <div className="w-16 h-16 rounded-2xl bg-dental-blue/10 flex items-center justify-center mx-auto mb-4">
                      <Icon size={32} className="text-dental-blue" />
                    </div>
                    <h3 className="text-lg font-bold mb-4">{feature.title}</h3>
                    <ul className="space-y-2">
                      {feature.features.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-sm text-muted-foreground">
                          <CheckCircle size={16} className="text-dental-blue mt-0.5 flex-shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </AnimatedText>
            );
          })}
        </div>
      </div>
    </ParallaxSection>
  );
};