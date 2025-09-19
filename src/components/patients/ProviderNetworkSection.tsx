import { Award } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { AnimatedText } from '@/components/ui/animated-text';

export const ProviderNetworkSection = () => {
  const networkStats = [
    { value: '1,200+', label: 'Verified providers nationwide' },
    { value: '4.8/5', label: 'Average provider rating' },
    { value: 'All', label: 'Specialties covered' },
    { value: 'Same-Day', label: 'Treatment starts available' }
  ];

  const networkBenefits = [
    'Pre-screened, qualified dental professionals',
    'Consistent high-quality patient experience',
    'Standardized financial processes',
    'Guaranteed pricing transparency'
  ];

  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-6">
        <AnimatedText className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Trusted Providers in Your Area
          </h2>
        </AnimatedText>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-4xl mx-auto mb-12">
          {networkStats.map((stat, index) => (
            <AnimatedText key={index} delay={index * 0.1}>
              <div className="text-center">
                <div className="text-5xl font-bold text-dental-blue mb-2">{stat.value}</div>
                <div className="text-muted-foreground">{stat.label}</div>
              </div>
            </AnimatedText>
          ))}
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {networkBenefits.map((benefit, index) => (
            <AnimatedText key={index} delay={index * 0.1}>
              <Card className="text-center hover:shadow-soft transition-smooth hover:-translate-y-1">
                <CardContent className="p-6">
                  <div className="w-12 h-12 rounded-xl bg-dental-peach/10 flex items-center justify-center mx-auto mb-4">
                    <Award size={24} className="text-dental-peach" />
                  </div>
                  <p className="text-muted-foreground">{benefit}</p>
                </CardContent>
              </Card>
            </AnimatedText>
          ))}
        </div>
      </div>
    </section>
  );
};