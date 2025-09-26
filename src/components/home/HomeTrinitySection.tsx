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

  const trinityItems = [
    {
      icon: Mic,
      title: "ECHO",
      subtitle: "Voice-Enabled AI Assistant",
      description: "24/7 patient interaction with natural voice processing",
      features: [
        "Natural language patient consultations",
        "Real-time symptom analysis & triage", 
        "Pre-visit anxiety reduction"
      ],
      stat: "24/7",
      statLabel: "Patient Support",
      color: "primary",
      gradientFrom: "primary/20",
      gradientTo: "primary/5"
    },
    {
      icon: Target,
      title: "PATH",
      subtitle: "Patient Acceptance Treatment Hub", 
      description: "Pre-cognitive intelligence that predicts treatment acceptance",
      features: [
        "95% approval accuracy predictions",
        "Pre-treatment financing decisions",
        "Behavioral pattern recognition"
      ],
      stat: "95%",
      statLabel: "Prediction Accuracy",
      color: "accent",
      gradientFrom: "accent/20",
      gradientTo: "accent/5"
    },
    {
      icon: Brain,
      title: "SCOPE",
      subtitle: "Strategic Clinical Operations Engine",
      description: "Intelligence that understands dental practice dynamics",
      features: [
        "50+ data point analysis",
        "Clinical necessity assessment",
        "Revenue optimization algorithms"
      ],
      stat: "50+",
      statLabel: "Data Points",
      color: "success",
      gradientFrom: "success/20", 
      gradientTo: "success/5"
    }
  ];

  return (
    <section className="py-24 bg-gradient-to-b from-background to-surface">
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

        <StaggerContainer className="grid md:grid-cols-3 gap-8" staggerDelay={0.3}>
          {trinityItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <StaggerItem key={index}>
                <motion.div
                  whileHover={{ y: -12, scale: 1.02 }}
                  transition={{ duration: 0.4, type: "spring", stiffness: 200 }}
                  className="h-full"
                >
                  <Card className={`group hover:shadow-2xl hover:shadow-${item.color}/20 transition-all duration-500 border-${item.color}/20 hover:border-${item.color}/40 h-full bg-gradient-to-br from-${item.gradientFrom} to-${item.gradientTo}`}>
                    <CardContent className="p-8 text-center h-full flex flex-col">
                      {/* Animated Icon */}
                      <motion.div 
                        className={`bg-${item.color} text-${item.color}-foreground w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 relative overflow-hidden`}
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        transition={{ duration: 0.3 }}
                      >
                        <motion.div
                          className="absolute inset-0 bg-white/20 rounded-2xl"
                          whileHover={{ scale: 1.5, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                        />
                        <Icon className="w-10 h-10 relative z-10" />
                      </motion.div>
                      
                      {/* Title & Subtitle */}
                      <h3 className={`text-2xl font-bold mb-2 group-hover:scale-105 transition-transform text-${item.color}`}>
                        {item.title}
                      </h3>
                      <p className="text-muted-foreground font-medium mb-4">{item.subtitle}</p>
                      <p className="text-sm text-muted-foreground mb-6">{item.description}</p>
                      
                      {/* Key Features */}
                      <div className="space-y-3 text-sm mb-6 flex-grow">
                        {item.features.map((feature, idx) => (
                          <motion.div 
                            key={idx} 
                            className="flex items-center gap-3 text-left"
                            whileHover={{ x: 4 }}
                            transition={{ duration: 0.2 }}
                          >
                            <div className={`w-2 h-2 rounded-full bg-${item.color} flex-shrink-0`} />
                            <span className="text-foreground">{feature}</span>
                          </motion.div>
                        ))}
                      </div>
                      
                      {/* Stat Display */}
                      <motion.div 
                        className="mb-6 p-4 rounded-xl bg-background/50 border border-primary/10"
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.2 }}
                      >
                        <div className={`text-3xl font-bold text-${item.color} mb-1`}>
                          {item.stat}
                        </div>
                        <div className="text-xs text-muted-foreground font-medium">
                          {item.statLabel}
                        </div>
                      </motion.div>

                      {/* Learn More Button */}
                      <Button
                        onClick={() => {
                          if (index === 0) setIsEchoModalOpen(true);
                          if (index === 1) setIsPathModalOpen(true);
                          if (index === 2) setIsScopeModalOpen(true);
                        }}
                        variant="outline"
                        className={`mt-auto group-hover:bg-${item.color} group-hover:text-${item.color}-foreground group-hover:border-${item.color} transition-all duration-300`}
                      >
                        Explore Intelligence
                        <Zap className="w-4 h-4 ml-2" />
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              </StaggerItem>
            );
          })}
        </StaggerContainer>

        {/* Revolutionary Impact Summary */}
        <ScrollReveal className="mt-20 text-center">
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-3 gap-8 mb-8">
              <motion.div 
                className="text-center p-6 rounded-2xl bg-primary/5 border border-primary/20"
                whileHover={{ scale: 1.05, y: -4 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="text-4xl font-bold text-primary mb-2">Pre-Cognitive</div>
                <div className="text-sm text-muted-foreground">AI thinks before you ask</div>
              </motion.div>
              <motion.div 
                className="text-center p-6 rounded-2xl bg-accent/5 border border-accent/20"
                whileHover={{ scale: 1.05, y: -4 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="text-4xl font-bold text-accent mb-2">Milliseconds</div>
                <div className="text-sm text-muted-foreground">Real-time intelligence processing</div>
              </motion.div>
              <motion.div 
                className="text-center p-6 rounded-2xl bg-success/5 border border-success/20"
                whileHover={{ scale: 1.05, y: -4 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="text-4xl font-bold text-success mb-2">3X Smarter</div>
                <div className="text-sm text-muted-foreground">Than traditional systems</div>
              </motion.div>
            </div>
            
            <motion.div 
              className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-gradient-to-r from-primary/10 to-accent/10 border border-primary/20"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              <Brain className="w-6 h-6 text-primary" />
              <span className="text-primary font-semibold text-lg">
                This is intelligence beyond traditional AI
              </span>
            </motion.div>
          </div>
        </ScrollReveal>

        {/* Enhanced Modals */}
        <HomeEchoModal isOpen={isEchoModalOpen} onClose={() => setIsEchoModalOpen(false)} />
        <HomePathModal isOpen={isPathModalOpen} onClose={() => setIsPathModalOpen(false)} />
        <HomeScopeModal isOpen={isScopeModalOpen} onClose={() => setIsScopeModalOpen(false)} />
      </div>
    </section>
  );
};