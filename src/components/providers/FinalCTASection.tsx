import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle, Shield, Lock, TrendingUp, Award } from 'lucide-react';
import { AnimatedText } from '@/components/ui/animated-text';
import { StaggerContainer, StaggerItem } from '@/components/ui/enhanced-animations';
import dentistImage from '@/assets/mature-dentist-male-latin.png';

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
    <>
      {/* Trust Based Platform Section */}
      <section className="py-24 bg-background text-foreground">
        <div className="container mx-auto px-6">
          <motion.div 
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <AnimatedText>
              <h2 className="text-4xl md:text-5xl font-bold mb-16">Trust Based Platform</h2>
            </AnimatedText>
            
            <StaggerContainer>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
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
                          className="mb-4"
                        >
                          <Icon className="w-12 h-12 mx-auto group-hover:text-primary transition-colors duration-300" />
                        </motion.div>
                        <div className="text-lg font-semibold group-hover:text-primary transition-colors duration-300">
                          {feature.title}
                        </div>
                      </motion.div>
                    </StaggerItem>
                  );
                })}
              </div>
            </StaggerContainer>
          </motion.div>
        </div>
      </section>

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

          {/* Everything You Need */}
          <motion.div 
            className="max-w-4xl mx-auto mb-8"
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
        </div>
      </section>

      {/* CTA Button - White Background Section */}
      <section className="bg-white text-primary py-16 md:py-24 relative overflow-hidden min-h-[320px] md:min-h-[400px]">
        <div className="container mx-auto px-6">
          <motion.div 
            className="flex flex-col items-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="mb-6">
              <Button className="bg-black text-white hover:bg-black/90 px-16 py-6 text-2xl font-bold rounded-xl shadow-elegant hover:shadow-xl transition-all duration-300">
                Get Started!
              </Button>
            </motion.div>
            <motion.p 
              className="text-lg text-muted-foreground font-medium mb-8 md:mb-0"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              Join thousands of dentists already transforming their practice
            </motion.p>
            
            {/* Mobile Image - Bottom Aligned */}
            <motion.div 
              className="absolute bottom-0 left-1/2 transform -translate-x-1/2 block md:hidden w-72 h-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.7 }}
            >
              <img 
                src={dentistImage} 
                alt="Professional dentist" 
                className="w-full h-auto object-contain"
              />
            </motion.div>
          </motion.div>
          
          {/* Desktop Image - Left Side, Bottom Aligned */}
          <motion.div 
            className="absolute left-0 bottom-0 w-72 h-auto hidden md:block"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.7 }}
          >
            <img 
              src={dentistImage} 
              alt="Professional dentist" 
              className="w-full h-auto object-contain"
            />
          </motion.div>
        </div>
      </section>
    </>
  );
};