import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { AnimatedText } from '@/components/ui/animated-text';
import { ScrollReveal } from '@/components/ui/enhanced-animations';
import { ParallaxSection } from '@/components/ui/parallax-section';
import { 
  Users, 
  Smartphone, 
  CheckCircle2, 
  Zap, 
  Brain, 
  Award, 
  Clock, 
  Target, 
  CreditCard, 
  Shield 
} from 'lucide-react';

export const HomeUserExperienceSection = () => {
  const providerBenefits = [
    {
      icon: CheckCircle2,
      title: 'Pre-qualified Pipeline',
      description: 'Patients arrive pre-approved and ready for treatment'
    },
    {
      icon: Zap,
      title: 'Automated Workflows',
      description: 'Streamlined operations from consultation to payment'
    },
    {
      icon: Brain,
      title: 'Predictive Analytics',
      description: 'Know which treatments patients will accept before you present them'
    },
    {
      icon: Award,
      title: 'Clinical Insights',
      description: 'Data-driven treatment recommendations based on successful outcomes'
    }
  ];

  const patientBenefits = [
    {
      icon: Clock,
      title: '60-Second Pre-Approval',
      description: 'Complete treatment financing in under a minute'
    },
    {
      icon: Target,
      title: 'Confidence Scoring',
      description: 'Know your approval odds before applying'
    },
    {
      icon: CreditCard,
      title: 'Flexible Structures',
      description: 'Payment plans that fit your budget and treatment needs'
    },
    {
      icon: Shield,
      title: 'No Surprises',
      description: 'Transparent terms with predictable monthly payments'
    }
  ];

  return (
    <ParallaxSection className="py-20 bg-surface">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal className="text-center mb-16">
          <AnimatedText>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              Experience What Intelligence Feels Like
            </h2>
            <p className="text-xl text-muted-foreground max-w-4xl mx-auto">
              Revolutionary experiences tailored for both providers and patients
            </p>
          </AnimatedText>
        </ScrollReveal>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* For Providers */}
          <ScrollReveal>
            <Card className="border-border bg-background p-8 h-full">
              <div className="text-center mb-8">
                <motion.div 
                  className="p-4 bg-accent-blue/10 rounded-2xl mx-auto mb-4 w-fit"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                >
                  <Users className="h-10 w-10 text-accent-blue" />
                </motion.div>
                <h3 className="text-2xl font-bold text-foreground mb-2">For Providers</h3>
              </div>
              
              <div className="space-y-6">
                {providerBenefits.map((benefit, index) => (
                  <div key={index} className="flex items-start space-x-4">
                    <div className="p-2 bg-accent-blue/10 rounded-lg">
                      <benefit.icon className="h-5 w-5 text-accent-blue" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground mb-1">{benefit.title}</h4>
                      <p className="text-sm text-muted-foreground">{benefit.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </ScrollReveal>

          {/* For Patients */}
          <ScrollReveal>
            <Card className="border-border bg-background p-8 h-full">
              <div className="text-center mb-8">
                <motion.div 
                  className="p-4 bg-accent-green/10 rounded-2xl mx-auto mb-4 w-fit"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                >
                  <Smartphone className="h-10 w-10 text-accent-green" />
                </motion.div>
                <h3 className="text-2xl font-bold text-foreground mb-2">For Patients</h3>
              </div>
              
              <div className="space-y-6">
                {patientBenefits.map((benefit, index) => (
                  <div key={index} className="flex items-start space-x-4">
                    <div className="p-2 bg-accent-green/10 rounded-lg">
                      <benefit.icon className="h-5 w-5 text-accent-green" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground mb-1">{benefit.title}</h4>
                      <p className="text-sm text-muted-foreground">{benefit.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </ScrollReveal>
        </div>
      </div>
    </ParallaxSection>
  );
};