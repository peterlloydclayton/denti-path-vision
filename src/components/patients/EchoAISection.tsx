import { Bot } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { AnimatedText } from '@/components/ui/animated-text';
import { PulseRipples } from '@/components/ui/pulse-ripples';
import { motion } from 'framer-motion';
import { AudioVisualizer, Waveform, EqualizerBars } from '@/components/ui/audio-visualizer';
import { EmblaParallaxCarousel } from '@/components/ui/embla-parallax-carousel';
import { SectionHeader } from '@/components/ui/section-header';
import { DentistWithSoundwaves } from './DentistWithSoundwaves';

export const EchoAISection = () => {
  const aiFeatures = [
    'Answers financing questions 24/7',
    'Explains treatment payment options',  
    'Provides appointment reminders and payment notifications',
    'Guides you through the application process'
  ];

  const aiIcons = [Bot, AudioVisualizer, Waveform, EqualizerBars];

  const createCard = (feature: string, index: number) => {
    const IconComponent = aiIcons[index];
    return (
      <Card className="text-center transition-smooth h-full min-h-[300px] bg-gray-800 flex items-center justify-center">
        <CardContent className="p-6 flex flex-col items-center justify-center text-center w-full">
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
          <p className="text-white text-center">{feature}</p>
        </CardContent>
      </Card>
    );
  };

  const slides = aiFeatures.map((feature, index) => createCard(feature, index));

  return (
    <>
      {/* Section Header outside background area */}
      <div className="container mx-auto px-6 py-12 mb-4 border-4 border-red-500 relative z-[1000]">
        <SectionHeader 
          title="Meet Echo, Your Personalized Healthcare AI"
          subtitle="Our proprietary voice-enabled AI specializes in understanding your healthcare needs to help you navigate your financial journey with confidence."
          backgroundComponent={<DentistWithSoundwaves />}
          altText="Dentist with AI technology"
        />
      </div>

      {/* Features carousel section */}
      <section className="bg-background border-4 border-blue-500 relative z-[1000]">
        <div className="container mx-auto px-6 border-4 border-green-500">
          <EmblaParallaxCarousel 
            slides={slides}
            className="max-w-6xl mx-auto"
            options={{ align: 'start', loop: true }}
          />
        </div>
      </section>
    </>
  );
};