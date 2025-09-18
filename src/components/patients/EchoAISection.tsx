import { Bot } from 'lucide-react';
import { AnimatedText } from '@/components/ui/animated-text';
import { ConstellationHub } from '@/components/ui/constellation-hub';
import { OrbitingFeatureCard } from '@/components/ui/orbiting-feature-card';
import { ConnectionLines } from '@/components/ui/connection-lines';

export const EchoAISection = () => {
  const aiFeatures = [
    'Answers financing questions 24/7',
    'Explains treatment payment options',  
    'Provides appointment reminders and payment notifications',
    'Guides you through the application process'
  ];

  // Define card positions around the constellation
  const cardPositions = [
    { x: 20, y: 25 },  // Top-left
    { x: 80, y: 25 },  // Top-right  
    { x: 20, y: 75 },  // Bottom-left
    { x: 80, y: 75 }   // Bottom-right
  ];

  const centerPosition = { x: 50, y: 50 };

  return (
    <section className="py-32 bg-background relative overflow-hidden">
      <div className="container mx-auto px-6">
        <AnimatedText className="text-center mb-20">
          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            <span className="flex items-center justify-center gap-4">
              <Bot className="text-dental-blue" size={56} />
              Meet Echo, Your Personalized Healthcare AI
            </span>
          </h2>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
            Our proprietary voice-enabled AI specializes in understanding your healthcare needs 
            to help you navigate your financial journey with confidence.
          </p>
        </AnimatedText>

        {/* Constellation Container */}
        <div className="relative max-w-7xl mx-auto h-[600px] md:h-[700px]">
          {/* Connection Lines */}
          <ConnectionLines 
            cardPositions={cardPositions}
            centerPosition={centerPosition}
          />

          {/* Central Constellation Hub */}
          <div className="absolute inset-0 flex items-center justify-center">
            <ConstellationHub />
          </div>

          {/* Orbiting Feature Cards */}
          {aiFeatures.map((feature, index) => (
            <OrbitingFeatureCard
              key={index}
              feature={feature}
              index={index}
              position={cardPositions[index]}
            />
          ))}

          {/* Ambient particles */}
          <div className="absolute top-1/4 left-1/4 w-1 h-1 bg-dental-blue/40 rounded-full animate-pulse" 
               style={{ animationDelay: '0s', animationDuration: '3s' }} />
          <div className="absolute top-3/4 right-1/4 w-1.5 h-1.5 bg-dental-lavender/30 rounded-full animate-pulse" 
               style={{ animationDelay: '1s', animationDuration: '4s' }} />
          <div className="absolute bottom-1/4 left-1/6 w-0.5 h-0.5 bg-dental-blue/50 rounded-full animate-pulse" 
               style={{ animationDelay: '2s', animationDuration: '2.5s' }} />
        </div>
      </div>
    </section>
  );
};