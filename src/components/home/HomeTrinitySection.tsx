import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
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
    <section className="py-12 bg-dental-blue relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
            Three Layers of 
            <span className="text-foreground block">
              Revolutionary Intelligence
            </span>
          </h2>
          
          <p className="text-xl text-foreground/80 max-w-4xl mx-auto mb-8">
            DentiPay's Trinity System thinks before you need it to. Our AI doesn't just respond to requests—
            it predicts needs, analyzes patterns, and makes decisions at the speed of thought.
          </p>

          <div className="flex items-center justify-center gap-4 text-sm text-foreground/70">
            <div className="flex items-center gap-2">
              <Eye className="w-4 h-4" />
              <span>Predictive Analysis</span>
            </div>
            <div className="w-1 h-1 bg-foreground/50 rounded-full"></div>
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4" />
              <span>Real-Time Processing</span>
            </div>
            <div className="w-1 h-1 bg-foreground/50 rounded-full"></div>
            <div className="flex items-center gap-2">
              <Network className="w-4 h-4" />
              <span>Integrated Intelligence</span>
            </div>
          </div>
        </ScrollReveal>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {trinityPoints.map((point, index) => {
            const Icon = point.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 100 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.15,
                  ease: [0.25, 0.25, 0.25, 0.75]
                }}
                whileHover={{ y: -8, scale: 1.02 }}
                className="relative h-full cursor-pointer"
              >
                <Card className="text-center h-full bg-card border-2 border-border/10 hover:border-primary/30 transition-all duration-500 shadow-lg hover:shadow-2xl group">
                  <CardContent className="p-8 h-full flex flex-col justify-between">
                    <div>
                      <motion.div 
                        className="w-20 h-20 rounded-3xl bg-foreground/10 flex items-center justify-center mx-auto mb-6"
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        transition={{ duration: 0.3 }}
                      >
                        <Icon size={36} className="text-foreground" />
                      </motion.div>
                      
                      <h3 className="text-2xl font-bold mb-4 text-foreground">
                        {point.title}
                      </h3>
                      
                      <p className="text-foreground/70 mb-6 leading-relaxed">
                        {point.description}
                      </p>
                    </div>
                  </CardContent>
                </Card>

                {/* Floating glow effect */}
                <motion.div
                  className="absolute inset-0 rounded-lg bg-primary/5 -z-10"
                  initial={{ opacity: 0, scale: 1 }}
                  whileHover={{ opacity: 1, scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                />
              </motion.div>
            );
          })}
        </div>

        {/* Impact Statement */}
        <ScrollReveal className="mt-16 text-center">
          <motion.div 
            className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-gradient-to-r from-foreground/10 to-foreground/5 border border-foreground/20"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          >
            <span className="text-foreground font-semibold text-lg">
              Pre-Cognitive AI • Millisecond Processing • 3X Smarter Intelligence
            </span>
          </motion.div>
        </ScrollReveal>

        {/* Decorative elements */}
        <div className="absolute top-1/2 left-4 w-2 h-2 bg-foreground/30 rounded-full animate-pulse" />
        <div className="absolute top-1/3 right-1/4 w-1 h-1 bg-foreground/20 rounded-full animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute bottom-1/4 left-1/3 w-1.5 h-1.5 bg-foreground/25 rounded-full animate-pulse" style={{ animationDelay: '2s' }} />

        {/* Enhanced Modals */}
        <HomeEchoModal isOpen={isEchoModalOpen} onClose={() => setIsEchoModalOpen(false)} />
        <HomePathModal isOpen={isPathModalOpen} onClose={() => setIsPathModalOpen(false)} />
        <HomeScopeModal isOpen={isScopeModalOpen} onClose={() => setIsScopeModalOpen(false)} />
      </div>
    </section>
  );
};