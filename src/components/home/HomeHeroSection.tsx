import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { AnimatedText, SplitText } from '@/components/ui/animated-text';
import { ScrollReveal, MagneticButton, FloatingElements } from '@/components/ui/enhanced-animations';
import { GlowButton } from '@/components/ui/micro-interactions';
import { ArrowRight, Shield } from 'lucide-react';
import { ProgressiveImage } from '@/components/ui/micro-interactions';
import heroImage from '@/assets/hero-dental-office-clean.jpg';

export const HomeHeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <FloatingElements />
      
      <div className="absolute inset-0">
        <ProgressiveImage 
          src={heroImage} 
          alt="Modern dental office" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-background/60" />
      </div>
      
      {/* Abstract AI Pattern Background */}
      <div className="absolute inset-0 opacity-15">
        <motion.div 
          className="absolute top-20 left-20 w-32 h-32 border border-foreground rounded-full"
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        />
        <motion.div 
          className="absolute top-40 right-40 w-24 h-24 border border-foreground rotate-45"
          animate={{ rotate: [45, 405] }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div 
          className="absolute bottom-40 left-1/3 w-16 h-16 border border-foreground rounded-full"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div 
          className="absolute bottom-20 right-20 w-20 h-20 border border-foreground"
          animate={{ rotate: [0, 180, 360] }}
          transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
        />
      </div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <ScrollReveal>
          <SplitText 
            text="The Future of Dental Financing is Here" 
            className="text-4xl md:text-6xl font-bold text-foreground mb-6"
            wordDelay={0.1}
          />
          
          <AnimatedText delay={0.5} className="text-xl md:text-2xl text-muted-foreground mb-4 max-w-3xl mx-auto">
            AI-Powered Approvals. Instant Decisions. Seamless Integration.
          </AnimatedText>

          <AnimatedText delay={0.7} className="text-lg text-muted-foreground mb-8 max-w-3xl mx-auto">
            Transform patient acceptance rates with intelligent financing that understands dental care. Where traditional financing fails, DentiPay delivers.
          </AnimatedText>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 justify-center mb-8"
          >
            <MagneticButton>
              <GlowButton className="bg-primary hover:bg-primary/90 text-primary-foreground text-lg px-8 py-6 rounded-lg">
                Get Provider Demo <ArrowRight className="ml-2 h-5 w-5" />
              </GlowButton>
            </MagneticButton>
            <MagneticButton>
              <Button variant="outline" size="lg" className="text-lg px-8 py-6">
                Apply for Financing
              </Button>
            </MagneticButton>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.8 }}
            className="text-sm text-muted-foreground space-y-2"
          >
            <div>Trusted by 10,000+ practices nationwide</div>
            <div className="flex items-center justify-center gap-2">
              <Shield className="h-4 w-4" />
              HIPAA compliant & bank-level security
            </div>
          </motion.div>
        </ScrollReveal>
      </div>
    </section>
  );
};