import { Bot } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { AnimatedText } from '@/components/ui/animated-text';
import { PulseRipples } from '@/components/ui/pulse-ripples';
import { motion } from 'framer-motion';
import { AudioVisualizer, Waveform, EqualizerBars } from '@/components/ui/audio-visualizer';
import { EmblaParallaxCarousel } from '@/components/ui/embla-parallax-carousel';
import smilingDentist from '@/assets/smiling-woman-dentist-transparent.png';

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
          <p className="text-white text-center break-words leading-relaxed px-2 hyphens-auto" style={{ hyphens: 'auto' }}>{feature}</p>
        </CardContent>
      </Card>
    );
  };

  const slides = aiFeatures.map((feature, index) => createCard(feature, index));

  return (
    <section className="py-24 bg-background overflow-visible">
      <div className="container mx-auto px-6">
        <div className="flex flex-col items-center mb-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-8 overflow-visible"
          >
            <img 
              src={smilingDentist} 
              alt="Smiling female dentist with stethoscope" 
              className="w-48 h-48 md:w-56 md:h-56 object-contain mx-auto"
            />
          </motion.div>
          <AnimatedText className="text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Meet Echo, Your Personalized Healthcare AI
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Our proprietary voice-enabled AI specializes in understanding your healthcare needs 
              to help you navigate your financial journey with confidence.
            </p>
          </AnimatedText>
        </div>

        <EmblaParallaxCarousel 
          slides={slides}
          className="max-w-6xl mx-auto"
          options={{ align: 'start', loop: true }}
        />
      </div>
    </section>
  );
};