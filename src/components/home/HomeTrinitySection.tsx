import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Mic, Target, Brain, Zap, Eye, Network, ArrowRight } from 'lucide-react';
import { ScrollReveal, StaggerContainer, StaggerItem } from '@/components/ui/enhanced-animations';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
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
      stat: "300% Patient Acceptance"
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
            
            // Different entrance directions for each card
            const entranceVariants = [
              { opacity: 0, x: -100, y: 50, rotate: -15, scale: 0.8 },
              { opacity: 0, y: -100, scale: 0.5, rotate: 10 },
              { opacity: 0, x: 100, y: 50, rotate: 15, scale: 0.8 }
            ];

            const finalVariants = { opacity: 1, x: 0, y: 0, rotate: 0, scale: 1 };

            return (
              <motion.div
                key={index}
                initial={entranceVariants[index]}
                whileInView={finalVariants}
                viewport={{ once: true, margin: "-50px" }}
                transition={{
                  duration: 0.8,
                  delay: index * 0.2,
                  type: "spring",
                  stiffness: 100,
                  damping: 15
                }}
                whileHover={{ 
                  y: -12, 
                  scale: 1.05,
                  rotateY: 5,
                  transition: { duration: 0.3 }
                }}
                className="relative h-full cursor-pointer perspective-1000"
              >
                <Card className="text-center h-full bg-card border-2 border-border/10 hover:border-foreground/30 transition-all duration-500 shadow-lg hover:shadow-2xl group overflow-hidden">
                  <CardContent className="p-8 h-full flex flex-col justify-between relative">
                    {/* Animated background effect */}
                    <motion.div 
                      className="absolute inset-0 bg-gradient-to-br from-foreground/5 to-transparent opacity-0 group-hover:opacity-100"
                      transition={{ duration: 0.5 }}
                    />
                    
                    <div className="relative z-10">
                      <motion.div 
                        className="w-20 h-20 rounded-3xl bg-foreground/10 flex items-center justify-center mx-auto mb-6 relative overflow-hidden"
                        whileHover={{ 
                          scale: 1.2, 
                          rotate: [0, -10, 10, 0],
                          transition: { duration: 0.6 }
                        }}
                        initial={{ scale: 0, rotate: 180 }}
                        whileInView={{ scale: 1, rotate: 0 }}
                        transition={{ 
                          delay: index * 0.2 + 0.4,
                          duration: 0.6,
                          type: "spring",
                          stiffness: 200
                        }}
                        viewport={{ once: true }}
                      >
                        {/* Ripple effect on icon hover */}
                        <motion.div
                          className="absolute inset-0 bg-foreground/20 rounded-full"
                          initial={{ scale: 0, opacity: 1 }}
                          whileHover={{ 
                            scale: 2, 
                            opacity: 0,
                            transition: { duration: 0.6 }
                          }}
                        />
                        <Icon size={36} className="text-foreground relative z-10" />
                      </motion.div>
                      
                      <motion.h3 
                        className="text-2xl font-bold mb-4 text-foreground"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.2 + 0.6, duration: 0.5 }}
                        viewport={{ once: true }}
                      >
                        {point.title}
                      </motion.h3>
                      
                      <motion.p 
                        className="text-foreground/70 mb-6 leading-relaxed"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.2 + 0.8, duration: 0.5 }}
                        viewport={{ once: true }}
                      >
                        {point.description}
                      </motion.p>
                    </div>
                  </CardContent>
                </Card>

                {/* Enhanced floating glow effect */}
                <motion.div
                  className="absolute inset-0 rounded-lg bg-foreground/10 -z-10 blur-xl"
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileHover={{ 
                    opacity: 0.8, 
                    scale: 1.1,
                    transition: { duration: 0.3 }
                  }}
                />

                {/* Particle effects */}
                <motion.div
                  className="absolute -top-2 -right-2 w-2 h-2 bg-foreground/30 rounded-full"
                  animate={{
                    y: [0, -10, 0],
                    opacity: [0.3, 0.8, 0.3]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: index * 0.5
                  }}
                />
                <motion.div
                  className="absolute -bottom-2 -left-2 w-1.5 h-1.5 bg-foreground/20 rounded-full"
                  animate={{
                    y: [0, 8, 0],
                    opacity: [0.2, 0.6, 0.2]
                  }}
                  transition={{
                    duration: 2.5,
                    repeat: Infinity,
                    delay: index * 0.7 + 0.5
                  }}
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

        {/* CTA Buttons */}
        <ScrollReveal className="mt-8">
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Link to="/providers">
              <Button
                className="w-72 h-14 bg-foreground text-background rounded-full hover:bg-foreground/90 font-semibold text-lg px-20 transition-all duration-300 hover:scale-105 hover:shadow-lg"
              >
                <span>For Providers</span>
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link to="/patients">
              <Button
                className="w-72 h-14 bg-foreground text-background rounded-full hover:bg-foreground/90 font-semibold text-lg px-16 transition-all duration-300 hover:scale-105 hover:shadow-lg"
              >
                <span>For Patients</span>
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
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