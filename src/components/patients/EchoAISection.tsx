import { motion } from 'framer-motion';
import { AnimatedText } from '@/components/ui/animated-text';
import { AIAvatar } from '@/components/ui/ai-avatar';
import { AudioVisualizer } from '@/components/ui/audio-visualizer';
import { NeuralParticles } from '@/components/ui/neural-particles';
import { EnhancedFeatureCard } from '@/components/ui/enhanced-feature-card';

export const EchoAISection = () => {
  const aiFeatures = [
    'Answers financing questions 24/7',
    'Explains treatment payment options',  
    'Provides appointment reminders and payment notifications',
    'Guides you through the application process'
  ];

  return (
    <section className="relative py-32 bg-gradient-to-b from-background via-background/95 to-background overflow-hidden">
      {/* Neural particle background */}
      <NeuralParticles />
      
      {/* Dynamic mesh background */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-intelligence/5 via-primary/5 to-background opacity-60"
        animate={{
          background: [
            "linear-gradient(135deg, hsl(var(--intelligence) / 0.05), hsl(var(--primary) / 0.05), hsl(var(--background)))",
            "linear-gradient(135deg, hsl(var(--primary) / 0.05), hsl(var(--intelligence) / 0.05), hsl(var(--background)))",
            "linear-gradient(135deg, hsl(var(--intelligence) / 0.05), hsl(var(--primary) / 0.05), hsl(var(--background)))",
          ]
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      
      <div className="container mx-auto px-6 relative z-10">
        {/* Central AI Avatar Hub */}
        <div className="relative mb-20">
          <motion.div
            className="flex flex-col items-center"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            {/* AI Avatar with Audio Visualizer */}
            <div className="relative mb-8">
              <AudioVisualizer />
              <AIAvatar />
            </div>
            
            {/* Title and Description */}
            <AnimatedText className="text-center mb-2">
              <motion.h2 
                className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-intelligence via-primary to-intelligence bg-clip-text text-transparent"
                animate={{
                  backgroundPosition: ['0%', '100%', '0%']
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: "linear"
                }}
                style={{
                  backgroundSize: '200% 100%'
                }}
              >
                Meet Echo
              </motion.h2>
            </AnimatedText>
            
            <AnimatedText delay={0.2}>
              <h3 className="text-2xl md:text-3xl font-semibold text-foreground/80 mb-6">
                Your Personalized Healthcare AI
              </h3>
            </AnimatedText>
            
            <AnimatedText delay={0.4}>
              <p className="text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
                Our proprietary voice-enabled AI specializes in understanding your healthcare needs 
                to help you navigate your financial journey with confidence and precision.
              </p>
            </AnimatedText>
          </motion.div>
        </div>

        {/* Enhanced Feature Cards Grid */}
        <div className="relative">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
            {aiFeatures.map((feature, index) => (
              <EnhancedFeatureCard
                key={index}
                feature={feature}
                index={index}
              />
            ))}
          </div>
          
          {/* Central connection hub */}
          <motion.div
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-intelligence/60 shadow-glow pointer-events-none hidden lg:block"
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.6, 1, 0.6],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </div>
        
        {/* Echo ripple effect */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 border border-intelligence/20 rounded-full"
              animate={{
                width: [0, 600, 800],
                height: [0, 600, 800],
                opacity: [0.8, 0.2, 0],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                delay: i * 1.3,
                ease: "easeOut"
              }}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
};