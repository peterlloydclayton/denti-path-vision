import { TrendingUp, Award } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { ParallaxSection } from '@/components/ui/parallax-section';
import { AnimatedText } from '@/components/ui/animated-text';

export const FutureVisionSection = () => {
  return (
    <ParallaxSection className="py-24 bg-intelligence text-intelligence-foreground" offset={-30}>
      <div className="container mx-auto px-6 text-center">
        <AnimatedText>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            The Future We're Building
          </h2>
          <p className="text-xl mb-8 opacity-90 max-w-3xl mx-auto leading-relaxed">
            We're just getting started. Our vision extends beyond dental finance 
            to revolutionize healthcare accessibility through intelligent technology, 
            compassionate service, and unwavering commitment to patient care.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Card className="bg-background/95 backdrop-blur border-border shadow-soft">
              <CardContent className="p-6 text-center">
                <TrendingUp className="mx-auto mb-3 text-dental-blue-darker" size={32} />
                <div className="font-bold text-foreground">Global Expansion</div>
                <div className="text-sm text-muted-foreground">Bringing intelligent financing worldwide</div>
              </CardContent>
            </Card>
            
            <Card className="bg-background/95 backdrop-blur border-border shadow-soft">
              <CardContent className="p-6 text-center">
                <Award className="mx-auto mb-3 text-dental-blue-dark" size={32} />
                <div className="font-bold text-foreground">Healthcare Integration</div>
                <div className="text-sm text-muted-foreground">Expanding beyond dental to all healthcare</div>
              </CardContent>
            </Card>
          </div>
        </AnimatedText>
      </div>
    </ParallaxSection>
  );
};