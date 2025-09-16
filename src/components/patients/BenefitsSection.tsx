import { Card, CardContent } from '@/components/ui/card';
import { ParallaxSection } from '@/components/ui/parallax-section';
import { AnimatedText } from '@/components/ui/animated-text';
import { benefits } from '@/data/patientsData';

export const BenefitsSection = () => {
  return (
    <ParallaxSection className="py-24 bg-gradient-subtle" offset={30}>
      <div className="container mx-auto px-6">
        <AnimatedText className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Why Patients Love DentiPay
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Experience the easiest way to finance your dental care
          </p>
        </AnimatedText>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <AnimatedText key={index} delay={index * 0.1}>
                <Card className="text-center hover:shadow-soft transition-smooth hover:-translate-y-1 h-full">
                  <CardContent className="p-6">
                    <div className="w-16 h-16 rounded-2xl bg-dental-blue/10 flex items-center justify-center mx-auto mb-4">
                      <Icon size={32} className="text-dental-blue" />
                    </div>
                    <h3 className="text-xl font-bold mb-3">{benefit.title}</h3>
                    <p className="text-muted-foreground mb-2">{benefit.detail}</p>
                    <p className="text-sm text-dental-blue font-medium">{benefit.description}</p>
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