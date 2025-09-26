import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Mic, Target, Brain, Zap, Eye, Network } from 'lucide-react';
import { ScrollReveal, StaggerContainer, StaggerItem } from '@/components/ui/enhanced-animations';
import { HomeEchoModal } from './HomeEchoModal';
import { HomePathModal } from './HomePathModal';
import { HomeScopeModal } from './HomeScopeModal';

export const HomeTrinitySection = () => {
  const [isEchoModalOpen, setIsEchoModalOpen] = useState(false);
  const [isPathModalOpen, setIsPathModalOpen] = useState(false);
  const [isScopeModalOpen, setIsScopeModalOpen] = useState(false);

  const trinityPoints = [
    {
      icon: Mic,
      title: "ECHO: Voice-Enabled AI Assistant",
      description: "24/7 patient interaction with natural voice processing and real-time symptom analysis",
      stat: "24/7 Patient Support"
    },
    {
      icon: Target,
      title: "PATH: Patient Acceptance Treatment Hub",
      description: "Pre-cognitive intelligence with 95% approval accuracy predictions and behavioral pattern recognition",
      stat: "95% Prediction Accuracy"
    },
    {
      icon: Brain,
      title: "SCOPE: Strategic Clinical Operations Engine",
      description: "Intelligence that analyzes 50+ data points for clinical necessity assessment and revenue optimization",
      stat: "50+ Data Points"
    }
  ];

  return (
    <section className="py-12 bg-gradient-to-b from-background to-surface">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal className="text-center">
          <h2 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
            Three Layers of 
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent block">
              Revolutionary Intelligence
            </span>
          </h2>
          
          <p className="text-xl text-muted-foreground max-w-4xl mx-auto mb-8">
            DentiPay's Trinity System thinks before you need it to. Our AI doesn't just respond to requests—
            it predicts needs, analyzes patterns, and makes decisions at the speed of thought.
          </p>

          <div className="flex items-center justify-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Eye className="w-4 h-4" />
              <span>Predictive Analysis</span>
            </div>
            <div className="w-1 h-1 bg-muted-foreground rounded-full"></div>
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4" />
              <span>Real-Time Processing</span>
            </div>
            <div className="w-1 h-1 bg-muted-foreground rounded-full"></div>
            <div className="flex items-center gap-2">
              <Network className="w-4 h-4" />
              <span>Integrated Intelligence</span>
            </div>
          </div>
        </ScrollReveal>

        <StaggerContainer className="max-w-4xl mx-auto space-y-8" staggerDelay={0.2}>
          {trinityPoints.map((point, index) => {
            const Icon = point.icon;
            return (
              <StaggerItem key={index}>
                <motion.div
                  className="flex items-start gap-6 p-6 rounded-2xl bg-gradient-to-r from-background/50 to-surface/50 border border-primary/10 hover:border-primary/20 transition-all duration-300"
                  whileHover={{ x: 8, scale: 1.01 }}
                  transition={{ duration: 0.3 }}
                >
                  <motion.div 
                    className="bg-primary text-primary-foreground w-16 h-16 rounded-xl flex items-center justify-center flex-shrink-0"
                    whileHover={{ rotate: 5, scale: 1.1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Icon className="w-8 h-8" />
                  </motion.div>
                  
                  <div className="flex-1 min-w-0">
                    <h3 className="text-xl font-bold text-foreground mb-3">
                      {point.title}
                    </h3>
                    <p className="text-muted-foreground mb-4 leading-relaxed">
                      {point.description}
                    </p>
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20">
                      <Zap className="w-4 h-4 text-primary" />
                      <span className="text-primary font-medium text-sm">{point.stat}</span>
                    </div>
                  </div>
                </motion.div>
              </StaggerItem>
            );
          })}
        </StaggerContainer>

        {/* Impact Statement */}
        <ScrollReveal className="mt-16 text-center">
          <motion.div 
            className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-gradient-to-r from-primary/10 to-accent/10 border border-primary/20"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          >
            <Brain className="w-6 h-6 text-primary" />
            <span className="text-primary font-semibold text-lg">
              Pre-Cognitive AI • Millisecond Processing • 3X Smarter Intelligence
            </span>
          </motion.div>
        </ScrollReveal>

        {/* Enhanced Modals */}
        <HomeEchoModal isOpen={isEchoModalOpen} onClose={() => setIsEchoModalOpen(false)} />
        <HomePathModal isOpen={isPathModalOpen} onClose={() => setIsPathModalOpen(false)} />
        <HomeScopeModal isOpen={isScopeModalOpen} onClose={() => setIsScopeModalOpen(false)} />
      </div>
    </section>
  );
};