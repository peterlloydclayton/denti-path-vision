import { Bot } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { AnimatedText } from '@/components/ui/animated-text';
import { PulseRipples } from '@/components/ui/pulse-ripples';
import { motion } from 'framer-motion';
import { AudioVisualizer, Waveform, EqualizerBars } from '@/components/ui/audio-visualizer';
import { EmblaParallaxCarousel } from '@/components/ui/embla-parallax-carousel';
import smilingDentist from '@/assets/smiling-woman-dentist-transparent.png';

export const EchoProviderSection = () => {
  const aiFeatures = [
    'Automates patient financing consultations',
    'Provides instant approval decisions and risk assessment',  
    'Generates treatment acceptance probability analytics',
    'Streamlines your entire financing workflow'
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
    <section className="py-8 bg-background overflow-visible">
      <div className="container mx-auto px-6">
        <div className="flex flex-col items-center mb-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-8 overflow-visible relative"
          >
            {/* Pulsing Soundwave Background */}
            <div className="absolute inset-0 flex items-center justify-center z-0">
              <div className="flex items-center justify-center space-x-2">
                {[...Array(12)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="w-4 bg-gradient-to-t from-blue-200 to-blue-300 rounded-full opacity-60"
                    style={{
                      height: `${40 + Math.sin(i * 0.5) * 80}px`
                    }}
                    animate={{
                      scaleY: [0.3, 1, 0.3],
                      opacity: [0.3, 0.8, 0.3]
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      delay: i * 0.1,
                      ease: "easeInOut"
                    }}
                  />
                ))}
              </div>
              {/* Outer pulse rings */}
              <motion.div
                className="absolute w-[600px] h-[600px] rounded-full border-2 border-blue-200/30"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.6, 0.2, 0.6]
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
              <motion.div
                className="absolute w-[500px] h-[500px] rounded-full border-2 border-blue-300/40"
                animate={{
                  scale: [1, 1.3, 1],
                  opacity: [0.4, 0.1, 0.4]
                }}
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.5
                }}
              />
              <motion.div
                className="absolute w-[400px] h-[400px] rounded-full border-2 border-blue-400/35"
                animate={{
                  scale: [1, 1.25, 1],
                  opacity: [0.5, 0.15, 0.5]
                }}
                transition={{
                  duration: 2.8,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 1
                }}
              />
              <motion.div
                className="absolute w-[300px] h-[300px] rounded-full border border-blue-300/25"
                animate={{
                  scale: [1, 1.4, 1],
                  opacity: [0.3, 0.1, 0.3]
                }}
                transition={{
                  duration: 3.2,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 1.5
                }}
              />
              <motion.div
                className="absolute w-[200px] h-[200px] rounded-full border border-blue-200/20"
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0.2, 0.05, 0.2]
                }}
                transition={{
                  duration: 3.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 2
                }}
              />
              {/* Additional closer circles */}
              <motion.div
                className="absolute w-[150px] h-[150px] rounded-full border border-blue-300/30"
                animate={{
                  scale: [1, 1.3, 1],
                  opacity: [0.4, 0.1, 0.4]
                }}
                transition={{
                  duration: 2.2,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.3
                }}
              />
              <motion.div
                className="absolute w-[120px] h-[120px] rounded-full border border-blue-400/35"
                animate={{
                  scale: [1, 1.4, 1],
                  opacity: [0.5, 0.15, 0.5]
                }}
                transition={{
                  duration: 2.8,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.8
                }}
              />
              <motion.div
                className="absolute w-[100px] h-[100px] rounded-full border border-blue-300/40"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.6, 0.2, 0.6]
                }}
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 1.2
                }}
              />
              <motion.div
                className="absolute w-[80px] h-[80px] rounded-full border border-blue-200/45"
                animate={{
                  scale: [1, 1.3, 1],
                  opacity: [0.7, 0.25, 0.7]
                }}
                transition={{
                  duration: 2.0,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 1.6
                }}
              />
              <motion.div
                className="absolute w-[60px] h-[60px] rounded-full border border-blue-400/50"
                animate={{
                  scale: [1, 1.25, 1],
                  opacity: [0.8, 0.3, 0.8]
                }}
                transition={{
                  duration: 1.8,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 2.0
                }}
              />
            </div>
            <img 
              src={smilingDentist} 
              alt="Smiling female dentist with stethoscope" 
              className="w-96 h-96 md:w-[28rem] md:h-[28rem] object-contain mx-auto relative z-20"
            />
          </motion.div>
          <AnimatedText className="text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Meet Echo, Your AI Practice Assistant
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Our proprietary voice-enabled AI specializes in healthcare financing 
              to amplify your practice's potential and maximize patient acceptance.
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