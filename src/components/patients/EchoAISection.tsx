import { Bot } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { AnimatedText } from '@/components/ui/animated-text';
import { VoiceFlowLayout, VoiceActiveCard } from '@/components/ui/voice-flow-layout';
import { CentralVoiceHub } from '@/components/ui/central-voice-hub';
import { AudioVisualizer, Waveform, EqualizerBars } from '@/components/ui/audio-visualizer';

export const EchoAISection = () => {
  const aiFeatures = [
    'Answers financing questions 24/7',
    'Explains treatment payment options',  
    'Provides appointment reminders and payment notifications',
    'Guides you through the application process'
  ];

  const aiIcons = [Bot, AudioVisualizer, Waveform, EqualizerBars];

  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-6">
        <AnimatedText className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Meet Echo, Your Personalized Healthcare AI
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Our proprietary voice-enabled AI specializes in understanding your healthcare needs 
            to help you navigate your financial journey with confidence.
          </p>
        </AnimatedText>

        <VoiceFlowLayout 
          centralElement={<CentralVoiceHub />}
          className="max-w-6xl mx-auto"
        >
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {aiFeatures.map((feature, index) => {
              const IconComponent = aiIcons[index];
              return (
                <VoiceActiveCard key={index} index={index} className="relative">
                  <Card className="text-center transition-smooth h-full">
                    <CardContent className="p-6">
                      <div className="w-12 h-12 rounded-xl bg-intelligence/10 flex items-center justify-center mx-auto mb-4">
                        {index === 0 ? (
                          <Bot size={24} className="text-dental-blue/80" />
                        ) : (
                          <div className="text-dental-blue/80">
                            <IconComponent className="h-6" barCount={8} />
                          </div>
                        )}
                      </div>
                      <p className="text-muted-foreground">{feature}</p>
                    </CardContent>
                  </Card>
                </VoiceActiveCard>
              );
            })}
          </div>
        </VoiceFlowLayout>
      </div>
    </section>
  );
};