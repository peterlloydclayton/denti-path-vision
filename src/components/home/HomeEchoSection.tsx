import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { AnimatedText } from '@/components/ui/animated-text';
import { PulseRipples } from '@/components/ui/pulse-ripples';
import { EmblaParallaxCarousel } from '@/components/ui/embla-parallax-carousel';
import { ScrollReveal, MagneticButton } from '@/components/ui/enhanced-animations';
import { Button } from '@/components/ui/button';
import { VideoSection } from '@/components/ui/video-section';
import { Mic, Timer, Brain, Zap, ArrowRight } from 'lucide-react';

export const HomeEchoSection = () => {
  const echoFeatures = [
    {
      icon: Mic,
      title: 'Voice-Enabled Interaction',
      description: 'Natural language processing for seamless patient conversations and data collection.'
    },
    {
      icon: Timer,
      title: 'Real-Time Processing',
      description: 'Instant analysis of 50+ data points for immediate financing decisions.'
    },
    {
      icon: Brain,
      title: 'Healthcare-Specific AI',
      description: 'Specialized underwriting algorithms trained on dental procedure data and patient needs.'
    },
    {
      icon: Zap,
      title: 'Seamless Integration',
      description: 'Direct API connections with all major practice management systems for effortless workflow.'
    }
  ];

  const createCard = (feature: any, index: number) => {
    const IconComponent = feature.icon;
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
                  <IconComponent size={32} className="text-accent-blue" />
                </motion.div>
              </div>
            ) : (
              <motion.div 
                className="p-2 bg-accent-blue/10 rounded-lg"
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.3 }}
              >
                <IconComponent className="h-8 w-8 text-accent-blue" />
              </motion.div>
            )}
          </div>
          <h3 className="text-lg font-semibold text-white mb-2">{feature.title}</h3>
          <p className="text-gray-300 text-center leading-relaxed px-2 text-sm">{feature.description}</p>
        </CardContent>
      </Card>
    );
  };

  const slides = echoFeatures.map((feature, index) => createCard(feature, index));

  return (
    <section className="py-20 bg-surface">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal className="text-center mb-16">
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
                      className="w-4 bg-gradient-to-t from-accent-blue/30 to-accent-blue/60 rounded-full opacity-60"
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
                {/* Pulse rings */}
                {[600, 500, 400, 300, 200, 150, 120, 100, 80, 60].map((size, i) => (
                  <motion.div
                    key={size}
                    className={`absolute w-[${size}px] h-[${size}px] rounded-full border border-accent-blue/20`}
                    animate={{
                      scale: [1, 1.2 + i * 0.05, 1],
                      opacity: [0.6 - i * 0.05, 0.1, 0.6 - i * 0.05]
                    }}
                    transition={{
                      duration: 3 - i * 0.1,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: i * 0.2
                    }}
                  />
                ))}
              </div>
              <div className="w-96 h-96 md:w-[28rem] md:h-[28rem] flex items-center justify-center relative z-20">
                <motion.div
                  animate={{
                    scale: [1, 1.05, 1],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className="text-accent-blue"
                >
                  <Brain size={120} />
                </motion.div>
              </div>
            </motion.div>
          </div>
          
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Introducing Echo: Your AI-Powered Financing Assistant
          </h2>
          <p className="text-xl text-muted-foreground max-w-4xl mx-auto">
            Our proprietary voice-enabled AI platform specializes in understanding healthcare financing needs, 
            processing 50+ data points per decision to deliver intelligent, instant approvals.
          </p>
        </ScrollReveal>

        <ScrollReveal>
          <VideoSection 
            title="Welcome To DentiPay"
            videoUrl="https://youtu.be/eWq1aw-ug_s?feature=shared"
            placeholder={false}
            aspectRatio="video"
            accent="blue"
            className="mb-16"
          />
        </ScrollReveal>

        <EmblaParallaxCarousel 
          slides={slides}
          className="max-w-6xl mx-auto mb-12"
          options={{ align: 'start', loop: true }}
        />

        <ScrollReveal className="text-center">
          <MagneticButton>
            <Button variant="outline" size="lg" className="text-lg px-8 py-4">
              Learn More About Echo Technology <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </MagneticButton>
        </ScrollReveal>
      </div>
    </section>
  );
};