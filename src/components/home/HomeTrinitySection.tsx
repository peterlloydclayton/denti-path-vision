import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AnimatedText } from '@/components/ui/animated-text';
import { ScrollReveal, MagneticButton } from '@/components/ui/enhanced-animations';
import { Target, BarChart3, ArrowRight } from 'lucide-react';

export const HomeTrinitySection = () => {
  const pathFeatures = [
    {
      icon: Target,
      title: 'Patient Journey Prediction',
      description: 'Advanced modeling to predict optimal financing timing and treatment sequences.'
    },
    {
      icon: BarChart3,
      title: 'Financial Capacity Analysis',
      description: 'Comprehensive analysis of patient financial health and payment capabilities.'
    },
    {
      icon: Target,
      title: 'Optimal Timing Recommendations',
      description: 'AI-driven insights on when patients are most likely to accept treatment plans.'
    }
  ];

  const scopeFeatures = [
    {
      icon: BarChart3,
      title: 'Real-Time Practice Analytics',
      description: 'Live dashboard with performance metrics and revenue optimization insights.'
    },
    {
      icon: Target,
      title: 'Treatment Acceptance Predictions',
      description: 'Predictive modeling to forecast which treatments patients will accept.'
    },
    {
      icon: Target,
      title: 'Revenue Optimization Tools',
      description: 'Data-driven recommendations to maximize practice profitability and growth.'
    }
  ];

  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-6">
            Precognitive Intelligence That Predicts and Perfects
          </h2>
          <p className="text-xl text-muted-foreground max-w-4xl mx-auto">
            Two specialized AI systems working in harmony to revolutionize dental financing
          </p>
        </ScrollReveal>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* PATH System */}
          <ScrollReveal>
            <Card className="border-border bg-surface p-8 h-full">
              <div className="text-center mb-8">
                <motion.div 
                  className="p-4 bg-accent-blue/10 rounded-2xl mx-auto mb-4 w-fit"
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.3 }}
                >
                  <Target className="h-12 w-12 text-accent-blue" />
                </motion.div>
                <h3 className="text-2xl font-bold text-foreground mb-2">PATH</h3>
                <p className="text-lg font-medium text-accent-blue">Patient Analytics & Timing Hub</p>
                <p className="text-muted-foreground mt-4">
                  Predicts optimal financing timing, analyzes patient financial capacity, 
                  and recommends treatment sequencing.
                </p>
              </div>
              
              <div className="space-y-4">
                {pathFeatures.map((feature, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <motion.div 
                      className="p-1 bg-accent-blue/10 rounded-lg"
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.3 }}
                    >
                      <feature.icon className="h-5 w-5 text-accent-blue" />
                    </motion.div>
                    <div>
                      <h4 className="font-semibold text-foreground">{feature.title}</h4>
                      <p className="text-sm text-muted-foreground">{feature.description}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8">
                <MagneticButton>
                  <Button variant="outline" className="w-full">
                    Explore PATH Intelligence <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </MagneticButton>
              </div>
            </Card>
          </ScrollReveal>

          {/* SCOPE System */}
          <ScrollReveal>
            <Card className="border-border bg-surface p-8 h-full">
              <div className="text-center mb-8">
                <motion.div 
                  className="p-4 bg-accent-green/10 rounded-2xl mx-auto mb-4 w-fit"
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.3 }}
                >
                  <BarChart3 className="h-12 w-12 text-accent-green" />
                </motion.div>
                <h3 className="text-2xl font-bold text-foreground mb-2">SCOPE</h3>
                <p className="text-lg font-medium text-accent-green">Strategic Clinical Operations & Performance Engine</p>
                <p className="text-muted-foreground mt-4">
                  Provider intelligence interface with performance metrics, patient outcome predictions, 
                  and revenue optimization insights.
                </p>
              </div>
              
              <div className="space-y-4">
                {scopeFeatures.map((feature, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <motion.div 
                      className="p-1 bg-accent-green/10 rounded-lg"
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.3 }}
                    >
                      <feature.icon className="h-5 w-5 text-accent-green" />
                    </motion.div>
                    <div>
                      <h4 className="font-semibold text-foreground">{feature.title}</h4>
                      <p className="text-sm text-muted-foreground">{feature.description}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8">
                <MagneticButton>
                  <Button variant="outline" className="w-full">
                    See SCOPE in Action <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </MagneticButton>
              </div>
            </Card>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};