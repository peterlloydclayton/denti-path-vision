import { Users } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { ParallaxSection } from '@/components/ui/parallax-section';
import { AnimatedText } from '@/components/ui/animated-text';
import { patientStories } from '@/data/patientsData';

export const PatientStoriesSection = () => {
  return (
    <ParallaxSection className="py-24 bg-gradient-subtle" offset={30}>
      <div className="container mx-auto px-6">
        <AnimatedText className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Real Stories from Real Patients
          </h2>
        </AnimatedText>

        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {patientStories.map((story, index) => (
            <AnimatedText key={index} delay={index * 0.2}>
              <Card className="hover:shadow-elegant transition-smooth hover:-translate-y-1 h-full">
                <CardContent className="p-8">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-16 h-16 rounded-full bg-dental-peach/20 flex items-center justify-center">
                      <Users className="text-dental-peach" size={24} />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg">{story.name}</h3>
                      <p className="text-muted-foreground">{story.subtitle}</p>
                    </div>
                  </div>
                  
                  <blockquote className="text-lg italic mb-4">
                    "{story.quote}"
                  </blockquote>
                  
                  <div className="border-t pt-4">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Treatment:</span>
                      <span className="font-semibold">{story.treatment}</span>
                    </div>
                    <div className="flex justify-between text-sm mt-1">
                      <span className="text-muted-foreground">Payment:</span>
                      <span className="font-semibold text-dental-blue">{story.payment}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </AnimatedText>
          ))}
        </div>
      </div>
    </ParallaxSection>
  );
};