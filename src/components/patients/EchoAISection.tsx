import { Bot } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { AnimatedText } from '@/components/ui/animated-text';
import { PulseRipples } from '@/components/ui/pulse-ripples';
import { motion } from 'framer-motion';
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

        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {aiFeatures.map((feature, index) => {
              const IconComponent = aiIcons[index];
              return (
                <Card key={index} className="text-center transition-smooth h-full min-h-[200px]">
                  <CardContent className="p-6 flex flex-col items-center justify-center h-full">
                    <div className="flex items-center justify-center mx-auto mb-4">
                      {index === 0 ? (
                        <div className="relative">
                          <PulseRipples isActive={true} className="w-16 h-16" />
                          <motion.div
                            className="absolute inset-0 flex items-center justify-center z-20"
                            animate={{
                              scale: [1, 1.05, 1],
                            }}
                            transition={{
                              duration: 2,
                              repeat: Infinity,
                              ease: "easeInOut"
                            }}
                          >
                            <Bot size={32} className="text-dental-blue" />
                          </motion.div>
                        </div>
                      ) : (
                        <div className="text-dental-blue">
                          <IconComponent className="h-8" barCount={8} />
                        </div>
                      )}
                    </div>
                    <p className="text-muted-foreground">{feature}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};