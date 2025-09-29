import { Users, Heart, Target, Lightbulb } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { ParallaxSection } from '@/components/ui/parallax-section';
import { AnimatedText } from '@/components/ui/animated-text';

export const ValuesSection = () => {
  const values = [
    {
      icon: Heart,
      title: 'Patient-First',
      description: 'Every decision we make prioritizes patient access to quality dental care'
    },
    {
      icon: Lightbulb,
      title: 'Innovation',
      description: 'Pioneering AI-driven solutions that reshape the healthcare finance industry'
    },
    {
      icon: Target,
      title: 'Excellence',
      description: 'Delivering unparalleled service and outcomes for providers and patients alike'
    },
    {
      icon: Users,
      title: 'Partnership',
      description: 'Building lasting relationships based on trust, transparency, and mutual success'
    }
  ];

  return (
    <ParallaxSection className="py-24 bg-background" offset={-20}>
      <div className="container mx-auto px-6">
        <AnimatedText className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-black">
            Our Core Values
          </h2>
          <p className="text-xl text-black max-w-3xl mx-auto">
            The principles that guide every decision, innovation, and relationship we build
          </p>
        </AnimatedText>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {values.map((value, index) => {
            const Icon = value.icon;
            return (
              <AnimatedText key={index} delay={index * 0.15}>
                <Card className="hover:shadow-elegant transition-smooth hover:-translate-y-1 h-full">
                  <CardContent className="p-8">
                    <div className="flex items-start gap-6">
                      <div className="w-16 h-16 rounded-2xl bg-intelligence/10 flex items-center justify-center flex-shrink-0">
                        <Icon size={32} className="text-intelligence" />
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold mb-3">{value.title}</h3>
                        <p className="text-muted-foreground leading-relaxed">
                          {value.description}
                        </p>
                      </div>
                    </div>
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