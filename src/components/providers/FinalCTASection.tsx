import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle, Shield, Lock, TrendingUp, Award } from 'lucide-react';
import { AnimatedText } from '@/components/ui/animated-text';
import { StaggerContainer, StaggerItem } from '@/components/ui/enhanced-animations';

export const FinalCTASection = () => {
  const steps = [
    { number: 1, title: "Schedule Demo", description: "See DentiPay intelligence in action" },
    { number: 2, title: "Free Trial", description: "Test with your actual patients" },
    { number: 3, title: "Boost Treatments", description: "Increase case acceptance and revenue" }
  ];

  const features = [
    "Complete SCOPE & PATH integration",
    "Echo AI voice assistant", 
    "Analytics dashboard",
    "Dedicated success manager",
    "Staff training program",
    "Marketing support materials"
  ];

  const securityFeatures = [
    { icon: Shield, title: "Bank-Level Security" },
    { icon: Lock, title: "HIPAA Compliant" },
    { icon: TrendingUp, title: "99.9% Uptime" },
    { icon: Award, title: "Seamless Integration" }
  ];

  return (
    <section className="py-24 bg-primary-foreground text-primary">
      <div className="container mx-auto px-6">
        <AnimatedText className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-8">
            See DentiPay Intelligence in Your Practice
          </h2>
        </AnimatedText>

        {/* Three Steps */}
        <StaggerContainer>
          <div className="grid md:grid-cols-3 gap-8 mb-16 max-w-4xl mx-auto">
            {steps.map((step, index) => (
              <StaggerItem key={index}>
                <motion.div
                  whileHover={{ y: -4, scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card className="bg-primary border-primary/20 text-primary-foreground text-center hover:bg-primary/90 transition-all duration-300 hover:shadow-elegant">
                    <CardContent className="p-6">
                      <motion.div 
                        className="w-12 h-12 bg-primary-foreground text-primary rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold"
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        transition={{ duration: 0.2 }}
                      >
                        {step.number}
                      </motion.div>
                      <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                      <p className="text-sm opacity-90">{step.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              </StaggerItem>
            ))}
          </div>
        </StaggerContainer>

        {/* CTA Button */}
        <motion.div 
          className="flex justify-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button className="bg-primary text-primary-foreground hover:bg-primary/90 px-16 py-6 text-2xl font-bold rounded-xl shadow-elegant hover:shadow-xl transition-all duration-300">
              Get Started!
            </Button>
          </motion.div>
        </motion.div>

        {/* Everything You Need */}
        <motion.div 
          className="max-w-4xl mx-auto mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <AnimatedText>
            <h3 className="text-2xl font-bold text-center mb-8">Everything You Need to Succeed</h3>
          </AnimatedText>
          
          <div className="grid md:grid-cols-2 gap-6">
            {features.map((feature, index) => (
              <motion.div 
                key={index}
                className="flex items-center gap-3"
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ x: 4, scale: 1.02 }}
              >
                <CheckCircle className="w-5 h-5 text-success flex-shrink-0" />
                <span className="hover:text-primary/80 transition-colors duration-300">{feature}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Security Features */}
        <StaggerContainer>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {securityFeatures.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <StaggerItem key={index}>
                  <motion.div 
                    className="text-center group"
                    whileHover={{ y: -4, scale: 1.05 }}
                    transition={{ duration: 0.2 }}
                  >
                    <motion.div
                      whileHover={{ rotate: 5, scale: 1.1 }}
                      transition={{ duration: 0.2 }}
                      className="mb-2"
                    >
                      <Icon className="w-8 h-8 mx-auto group-hover:text-primary/80 transition-colors duration-300" />
                    </motion.div>
                    <div className="text-sm font-semibold group-hover:text-primary/80 transition-colors duration-300">
                      {feature.title}
                    </div>
                  </motion.div>
                </StaggerItem>
              );
            })}
          </div>
        </StaggerContainer>
      </div>
    </section>
  );
};