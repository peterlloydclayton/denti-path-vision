import { Bot, CheckCircle } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { AnimatedText } from '@/components/ui/animated-text';
import { AudioVisualizer, Waveform, EqualizerBars } from '@/components/ui/audio-visualizer';
import { PulseRipples } from '@/components/ui/pulse-ripples';

export const EchoAISection = () => {
  const aiFeatures = [
    'Answers financing questions 24/7',
    'Explains treatment payment options',  
    'Provides appointment reminders and payment notifications',
    'Guides you through the application process'
  ];

  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-6">
        <AnimatedText className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="flex items-center justify-center gap-3">
              <div className="relative">
                <PulseRipples isActive={true} />
                <Bot className="text-dental-blue relative z-10" size={48} />
              </div>
              Meet Echo, Your Personalized Healthcare AI
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Our proprietary voice-enabled AI specializes in understanding your healthcare needs 
            to help you navigate your financial journey with confidence.
          </p>
          
          {/* Audio Visualizer Section */}
          <div className="flex flex-col items-center gap-6 mb-8">
            <AudioVisualizer className="h-12" />
            <Waveform />
            <EqualizerBars className="h-10" />
          </div>
        </AnimatedText>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {aiFeatures.map((feature, index) => (
            <AnimatedText key={index} delay={index * 0.1}>
              <Card className="text-center hover:shadow-soft transition-smooth hover:-translate-y-1">
                <CardContent className="p-6">
                  <div className="w-12 h-12 rounded-xl bg-intelligence/10 flex items-center justify-center mx-auto mb-4">
                    <CheckCircle size={24} className="text-intelligence" />
                  </div>
                  <p className="text-muted-foreground">{feature}</p>
                </CardContent>
              </Card>
            </AnimatedText>
          ))}
        </div>
      </div>
    </section>
  );
};