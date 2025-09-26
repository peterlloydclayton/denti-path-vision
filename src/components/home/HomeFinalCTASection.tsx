import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, Zap, Users, TrendingUp } from "lucide-react";
import { ScrollReveal, StaggerContainer, StaggerItem, MagneticButton } from "@/components/ui/enhanced-animations";
import { ParallaxSection } from "@/components/ui/parallax-section";

export function HomeFinalCTASection() {
  const benefits = [
    {
      icon: Users,
      text: "Patients get the care they need"
    },
    {
      icon: TrendingUp,
      text: "Providers get immediate payment"
    },
    {
      icon: Sparkles,
      text: "Intelligent, dental-specific AI"
    },
    {
      icon: Zap,
      text: "Barriers eliminated, access expanded"
    }
  ];

  return (
    <ParallaxSection className="py-32 bg-gradient-to-br from-primary/5 via-background to-accent/5 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.02]" />
      <motion.div 
        className="absolute top-1/4 -left-32 w-64 h-64 bg-primary/10 rounded-full blur-3xl"
        animate={{ 
          x: [0, 50, 0],
          y: [0, -30, 0],
          scale: [1, 1.1, 1]
        }}
        transition={{ 
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      <motion.div 
        className="absolute bottom-1/4 -right-32 w-64 h-64 bg-accent/10 rounded-full blur-3xl"
        animate={{ 
          x: [0, -50, 0],
          y: [0, 30, 0],
          scale: [1.1, 1, 1.1]
        }}
        transition={{ 
          duration: 25,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <ScrollReveal className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="inline-flex items-center px-4 py-2 bg-primary/10 rounded-full text-primary font-medium mb-6"
          >
            <Sparkles className="w-4 h-4 mr-2" />
            The Future of Dental Financing is Here
          </motion.div>
          
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold text-foreground mb-8 leading-tight">
            <span className="block">Ready to</span>
            <span className="block bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent bg-300% animate-gradient">
              Pioneer the Future
            </span>
            <span className="block">of Dental Access?</span>
          </h2>
          
          <p className="text-xl md:text-2xl text-muted-foreground max-w-4xl mx-auto leading-relaxed mb-12">
            Be part of the innovation reshaping how dental care gets financed. 
            Choose your path and start pioneering change today.
          </p>
        </ScrollReveal>

        {/* Benefits Grid */}
        <ScrollReveal>
          <StaggerContainer className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16" staggerDelay={0.1}>
            {benefits.map((benefit, index) => (
              <StaggerItem key={index}>
                <motion.div 
                  className="flex flex-col items-center text-center p-6 rounded-2xl bg-background/50 backdrop-blur-sm border border-border/50"
                  whileHover={{ y: -5, scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                >
                  <motion.div 
                    className="p-3 bg-primary/10 rounded-2xl mb-4"
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.5 }}
                  >
                    <benefit.icon className="w-6 h-6 text-primary" />
                  </motion.div>
                  <p className="font-semibold text-foreground">{benefit.text}</p>
                </motion.div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </ScrollReveal>

        {/* CTA Buttons */}
        <ScrollReveal className="text-center">
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-12">
            <MagneticButton>
              <Button 
                size="lg" 
                className="text-lg px-12 py-6 bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-primary-foreground border-0 shadow-2xl hover:shadow-primary/25 transition-all duration-300"
              >
                Pioneer for Providers
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </MagneticButton>
            
            <MagneticButton>
              <Button 
                variant="outline" 
                size="lg" 
                className="text-lg px-12 py-6 border-2 border-primary/20 hover:border-primary bg-background/50 backdrop-blur-sm hover:bg-primary/5 transition-all duration-300"
              >
                Pioneer for Patients
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </MagneticButton>
          </div>
          
          <motion.p 
            className="text-muted-foreground"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            No setup fees • No monthly minimums • Integration in under 24 hours
          </motion.p>
        </ScrollReveal>

        {/* Social Proof */}
        <ScrollReveal className="text-center mt-20">
          <motion.div
            className="inline-flex items-center space-x-8 text-muted-foreground"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
          >
            <div className="text-center">
              <div className="text-3xl font-bold text-primary">10,000+</div>
              <div className="text-sm">Happy Practices</div>
            </div>
            <div className="w-px h-12 bg-border" />
            <div className="text-center">
              <div className="text-3xl font-bold text-primary">$2B+</div>
              <div className="text-sm">Financed</div>
            </div>
            <div className="w-px h-12 bg-border" />
            <div className="text-center">
              <div className="text-3xl font-bold text-primary">99.9%</div>
              <div className="text-sm">Uptime</div>
            </div>
          </motion.div>
        </ScrollReveal>
      </div>
    </ParallaxSection>
  );
}