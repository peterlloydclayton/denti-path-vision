import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Brain, Eye, Zap, Clock, TrendingUp, Target, Users, ChevronLeft, ChevronRight } from 'lucide-react';
import { ScrollReveal, StaggerContainer, StaggerItem } from '@/components/ui/enhanced-animations';
import { PulseRipples } from '@/components/ui/pulse-ripples';
import dentistImage from '@/assets/focused-professional.png';

export const HomePreCognitiveSection = () => {
  const [activeFeature, setActiveFeature] = useState(0);

  const preCognitiveFeatures = [
    {
      icon: Brain,
      title: "Treatment Acceptance Prediction",
      subtitle: "AI knows the answer before you ask the question",
      description: "Analyzes patient behavior patterns, communication style, and historical data to predict treatment acceptance with 95% accuracy before presentation.",
      capabilities: [
        "Behavioral pattern recognition from first interaction",
        "Historical treatment acceptance modeling",
        "Real-time emotional state analysis",
        "Optimal presentation timing recommendations"
      ],
      stat: "95%",
      statLabel: "Prediction Accuracy",
      color: "primary"
    },
    {
      icon: Eye,
      title: "50+ Data Point Analysis",
      subtitle: "Seeing what traditional systems miss entirely",
      description: "Processes comprehensive patient profiles including financial capacity, treatment history, seasonal patterns, and psychological indicators simultaneously.",
      capabilities: [
        "Real-time credit and income verification",
        "Treatment urgency and medical necessity scoring",
        "Seasonal spending pattern analysis",
        "Alternative funding source identification"
      ],
      stat: "50+",
      statLabel: "Data Points Analyzed",
      color: "accent"
    },
    {
      icon: Zap,  
      title: "Pre-Qualification Engine",
      subtitle: "Patients arrive ready, not hopeful",
      description: "Pre-qualifies patients before they enter your office, ensuring they arrive with financing already secured and treatment plans pre-approved.",
      capabilities: [
        "Pre-visit financial capacity assessment",
        "Automated eligibility screening",
        "Treatment-specific financing matching",
        "Same-day approval guarantee preparation"
      ],
      stat: "Pre-Visit",
      statLabel: "Qualification Status",
      color: "success"
    },
    {
      icon: Clock,
      title: "Optimal Timing Intelligence",
      subtitle: "When matters as much as how",
      description: "Identifies the perfect moment to discuss financing, when patients are most receptive and likely to accept treatment recommendations.",
      capabilities: [
        "Patient readiness assessment",
        "Emotional state monitoring",
        "Financial cycle optimization",
        "Seasonal treatment timing recommendations"
      ],
      stat: "Perfect",
      statLabel: "Timing Precision",
      color: "primary"
    }
  ];

  const nextFeature = () => {
    setActiveFeature((prev) => (prev + 1) % preCognitiveFeatures.length);
  };

  const prevFeature = () => {
    setActiveFeature((prev) => (prev - 1 + preCognitiveFeatures.length) % preCognitiveFeatures.length);
  };

  return (
    <section className="py-24 bg-gradient-to-b from-surface to-background relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute top-20 left-10 w-2 h-2 bg-primary/20 rounded-full"
          animate={{
            scale: [1, 2, 1],
            opacity: [0.3, 0.8, 0.3]
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute top-40 right-20 w-3 h-3 bg-accent/20 rounded-full"
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.4, 0.9, 0.4]
          }}
          transition={{
            duration: 2.5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
        />
        <motion.div
          className="absolute bottom-32 left-1/4 w-1 h-1 bg-success/30 rounded-full"
          animate={{
            scale: [1, 3, 1],
            opacity: [0.2, 0.7, 0.2]
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <ScrollReveal className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-primary/10 to-accent/10 border border-primary/20 text-primary font-medium text-sm mb-6">
            <Brain className="w-4 h-4" />
            Pre-Cognitive Intelligence
          </div>
          
          <h2 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
            Intelligence That 
            <span className="bg-gradient-to-r from-primary via-accent to-success bg-clip-text text-transparent block">
              Thinks Before You Need It
            </span>
          </h2>
          
          <p className="text-xl text-muted-foreground max-w-4xl mx-auto mb-8">
            Our AI doesn't just respond to requests—it anticipates needs, predicts outcomes, 
            and makes proactive recommendations that revolutionize the entire financing experience.
          </p>

          <div className="flex items-center justify-center gap-6 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Target className="w-4 h-4 text-primary" />
              <span>Predictive Analysis</span>
            </div>
            <div className="w-1 h-1 bg-muted-foreground rounded-full"></div>
            <div className="flex items-center gap-2">
              <Eye className="w-4 h-4 text-accent" />
              <span>Real-Time Intelligence</span>
            </div>
            <div className="w-1 h-1 bg-muted-foreground rounded-full"></div>
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-success" />
              <span>Behavioral Modeling</span>
            </div>
          </div>
        </ScrollReveal>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Visual Demo Side */}
          <ScrollReveal>
            <div className="relative">
              {/* Central AI Brain */}
              <div className="relative flex items-center justify-center mb-8">
                <motion.div
                  className="relative"
                  animate={{
                    rotate: [0, 360]
                  }}
                  transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                >
                  <PulseRipples isActive={true} className="w-32 h-32" />
                </motion.div>
                
                <motion.div
                  className="absolute inset-0 flex items-center justify-center z-20"
                  animate={{
                    scale: [1, 1.1, 1],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  <div className="p-6 bg-gradient-to-br from-primary/20 to-accent/20 rounded-full border-2 border-primary/30">
                    <Brain className="w-12 h-12 text-primary" />
                  </div>
                </motion.div>

                {/* Orbiting Data Points */}
                {[0, 1, 2, 3, 4, 5].map((index) => (
                  <motion.div
                    key={index}
                    className="absolute w-3 h-3 bg-gradient-to-r from-primary to-accent rounded-full"
                    animate={{
                      rotate: [0, 360]
                    }}
                    transition={{
                      duration: 8 + index,
                      repeat: Infinity,
                      ease: "linear"
                    }}
                    style={{
                      transformOrigin: `${80 + index * 15}px center`,
                      x: 80 + index * 15,
                    }}
                  />
                ))}
              </div>

              {/* AI Professional Image */}
              <motion.div
                className="relative"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <img 
                  src={dentistImage} 
                  alt="Focused healthcare professional"
                  className="w-full max-w-md mx-auto object-contain relative z-10"
                />
                
                {/* Floating insight bubbles */}
                <motion.div
                  className="absolute top-10 -right-4 bg-primary/10 backdrop-blur-sm border border-primary/20 rounded-full px-4 py-2 text-xs text-primary font-medium"
                  animate={{
                    y: [0, -10, 0],
                    opacity: [0.7, 1, 0.7]
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  95% Acceptance Predicted
                </motion.div>
                
                <motion.div
                  className="absolute top-32 -left-8 bg-accent/10 backdrop-blur-sm border border-accent/20 rounded-full px-4 py-2 text-xs text-accent font-medium"
                  animate={{
                    y: [0, -8, 0],
                    opacity: [0.6, 1, 0.6]
                  }}
                  transition={{
                    duration: 2.5,
                    repeat: Infinity,
                    delay: 1,
                    ease: "easeInOut"
                  }}
                >
                  Pre-Qualified: $15K
                </motion.div>

                <motion.div
                  className="absolute bottom-20 right-8 bg-success/10 backdrop-blur-sm border border-success/20 rounded-full px-4 py-2 text-xs text-success font-medium"
                  animate={{
                    y: [0, -12, 0],
                    opacity: [0.8, 1, 0.8]
                  }}
                  transition={{
                    duration: 2.8,
                    repeat: Infinity,
                    delay: 0.5,
                    ease: "easeInOut"
                  }}
                >
                  Optimal Timing: Now
                </motion.div>
              </motion.div>
            </div>
          </ScrollReveal>

          {/* Feature Details Side */}
          <div className="space-y-8">
            {/* Feature Navigation */}
            <div className="flex items-center justify-between">
              <h3 className="text-2xl font-bold text-foreground">Intelligence Features</h3>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={prevFeature}
                  className="p-2"
                >
                  <ChevronLeft className="w-4 h-4" />
                </Button>
                <Button
                  variant="outline"
                  size="sm" 
                  onClick={nextFeature}
                  className="p-2"
                >
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Active Feature Display */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeFeature}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <Card className={`border-${preCognitiveFeatures[activeFeature].color}/30 bg-gradient-to-br from-${preCognitiveFeatures[activeFeature].color}/5 to-${preCognitiveFeatures[activeFeature].color}/10`}>
                  <CardContent className="p-8">
                    <div className="flex items-start gap-4 mb-6">
                      <div className={`p-3 bg-${preCognitiveFeatures[activeFeature].color}/20 rounded-xl`}>
                        {activeFeature === 0 && <Brain className={`w-8 h-8 text-${preCognitiveFeatures[activeFeature].color}`} />}
                        {activeFeature === 1 && <Eye className={`w-8 h-8 text-${preCognitiveFeatures[activeFeature].color}`} />}
                        {activeFeature === 2 && <Zap className={`w-8 h-8 text-${preCognitiveFeatures[activeFeature].color}`} />}
                        {activeFeature === 3 && <Clock className={`w-8 h-8 text-${preCognitiveFeatures[activeFeature].color}`} />}
                      </div>
                      <div className="flex-1">
                        <h4 className="text-xl font-bold text-foreground mb-2">
                          {preCognitiveFeatures[activeFeature].title}
                        </h4>
                        <p className={`text-${preCognitiveFeatures[activeFeature].color} font-medium mb-3`}>
                          {preCognitiveFeatures[activeFeature].subtitle}
                        </p>
                        <p className="text-muted-foreground leading-relaxed">
                          {preCognitiveFeatures[activeFeature].description}
                        </p>
                      </div>
                    </div>

                    <div className="space-y-3 mb-6">
                      {preCognitiveFeatures[activeFeature].capabilities.map((capability, index) => (
                        <motion.div
                          key={index}
                          className="flex items-center gap-3"
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.3, delay: index * 0.1 }}
                        >
                          <div className={`w-2 h-2 rounded-full bg-${preCognitiveFeatures[activeFeature].color}`} />
                          <span className="text-foreground text-sm">{capability}</span>
                        </motion.div>
                      ))}
                    </div>

                    <div className={`flex items-center justify-center p-4 rounded-xl bg-${preCognitiveFeatures[activeFeature].color}/10 border border-${preCognitiveFeatures[activeFeature].color}/20`}>
                      <div className="text-center">
                        <div className={`text-2xl font-bold text-${preCognitiveFeatures[activeFeature].color} mb-1`}>
                          {preCognitiveFeatures[activeFeature].stat}
                        </div>
                        <div className="text-xs text-muted-foreground font-medium">
                          {preCognitiveFeatures[activeFeature].statLabel}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </AnimatePresence>

            {/* Feature Indicators */}
            <div className="flex justify-center space-x-2">
              {preCognitiveFeatures.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveFeature(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === activeFeature 
                      ? `bg-${preCognitiveFeatures[activeFeature].color}` 
                      : 'bg-muted-foreground/30 hover:bg-muted-foreground/50'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <ScrollReveal className="text-center mt-20">
          <motion.div
            className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-gradient-to-r from-primary/10 via-accent/10 to-success/10 border border-primary/20"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          >
            <TrendingUp className="w-6 h-6 text-primary" />
            <span className="text-foreground font-semibold text-lg">
              This is intelligence beyond traditional AI—this is pre-cognitive
            </span>
          </motion.div>
        </ScrollReveal>
      </div>
    </section>
  );
};