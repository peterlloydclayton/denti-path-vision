import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight, Brain, Zap, Target, Shield } from 'lucide-react';
import { AnimatedText, SplitText } from '@/components/ui/animated-text';
import { ScrollReveal, MagneticButton, FloatingElements } from '@/components/ui/enhanced-animations';
import { GlowButton, ProgressiveImage } from '@/components/ui/micro-interactions';
import { PulseRipples } from '@/components/ui/pulse-ripples';
import heroImage from '@/assets/hero-dental-office-clean.jpg';

export const HomeHeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <FloatingElements />
      
      {/* Background with overlay */}
      <div className="absolute inset-0">
        <ProgressiveImage 
          src={heroImage} 
          alt="Revolutionary dental financing technology" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-background/80 via-background/60 to-background/80" />
      </div>
      
      {/* Animated AI patterns */}
      <div className="absolute inset-0 overflow-hidden">
        <PulseRipples 
          rippleCount={3} 
          className="absolute top-1/4 left-1/4" 
          isActive={true}
        />
        <PulseRipples 
          rippleCount={2} 
          className="absolute bottom-1/3 right-1/4" 
          isActive={true}
        />
      </div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <ScrollReveal>
          {/* Revolutionary headline */}
          <motion.div 
            className="mb-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary font-medium text-sm mb-6">
              <Brain className="w-4 h-4" />
              Pre-Cognitive Intelligence Revolution
            </div>
          </motion.div>

          <SplitText 
            text="The Future of Dental Financing: AI That Thinks Before You Need It" 
            className="text-4xl md:text-6xl lg:text-7xl font-bold text-foreground mb-6 leading-tight"
            wordDelay={0.1}
          />
          
          <AnimatedText delay={0.5} className="text-xl md:text-2xl text-muted-foreground mb-6 max-w-4xl mx-auto">
            Revolutionary AI that predicts treatment needs and approves financing before traditional systems even start
          </AnimatedText>

          {/* Key value propositions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.8 }}
            className="grid md:grid-cols-3 gap-6 mb-12 max-w-4xl mx-auto"
          >
            <div className="flex items-center gap-3 text-left">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Target className="w-5 h-5 text-primary" />
              </div>
              <div>
                <div className="font-semibold text-foreground">95% Approval Rates</div>
                <div className="text-sm text-muted-foreground">vs 40% traditional banking</div>
              </div>
            </div>
            <div className="flex items-center gap-3 text-left">
              <div className="p-2 bg-accent/10 rounded-lg">
                <Zap className="w-5 h-5 text-accent" />
              </div>
              <div>
                <div className="font-semibold text-foreground">30-Second Decisions</div>
                <div className="text-sm text-muted-foreground">vs weeks of traditional approval</div>
              </div>
            </div>
            <div className="flex items-center gap-3 text-left">
              <div className="p-2 bg-success/10 rounded-lg">
                <Brain className="w-5 h-5 text-success" />
              </div>
              <div>
                <div className="font-semibold text-foreground">300% Increase</div>
                <div className="text-sm text-muted-foreground">in treatment acceptance rates</div>
              </div>
            </div>
          </motion.div>
          
          {/* Dual Path CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.8 }}
            className="mb-8"
          >
            <div className="text-lg font-medium text-foreground mb-6">Choose Your Revolutionary Path:</div>
            <div className="flex flex-col lg:flex-row gap-6 justify-center items-center">
              {/* Provider Path */}
              <div className="relative group">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-primary to-primary/60 rounded-xl opacity-75 group-hover:opacity-100 transition duration-300 blur"></div>
                <div className="relative bg-background rounded-xl p-6 max-w-md">
                  <div className="text-center mb-4">
                    <h3 className="text-xl font-bold text-foreground mb-2">For Dental Providers</h3>
                    <p className="text-sm text-muted-foreground">Transform your practice with AI intelligence</p>
                  </div>
                  <MagneticButton>
                    <GlowButton className="w-full bg-primary hover:bg-primary/90 text-primary-foreground text-lg px-8 py-4 rounded-lg">
                      Experience the Revolution
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </GlowButton>
                  </MagneticButton>
                  <div className="text-xs text-muted-foreground mt-2 text-center">
                    See ROI Calculator • Book Demo • Free Trial
                  </div>
                </div>
              </div>

              <div className="text-muted-foreground font-medium hidden lg:block">or</div>

              {/* Patient Path */}
              <div className="relative group">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-accent to-accent/60 rounded-xl opacity-75 group-hover:opacity-100 transition duration-300 blur"></div>
                <div className="relative bg-background rounded-xl p-6 max-w-md">
                  <div className="text-center mb-4">
                    <h3 className="text-xl font-bold text-foreground mb-2">For Patients</h3>
                    <p className="text-sm text-muted-foreground">Access better dental care with instant approvals</p>
                  </div>
                  <MagneticButton>
                    <Button 
                      variant="outline" 
                      size="lg" 
                      className="w-full text-lg px-8 py-4 border-accent text-accent hover:bg-accent hover:text-accent-foreground"
                    >
                      Get Instant Pre-Approval
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  </MagneticButton>
                  <div className="text-xs text-muted-foreground mt-2 text-center">
                    Find Providers • Payment Calculator • Apply Now
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Trust indicators */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.8 }}
            className="text-sm text-muted-foreground space-y-3"
          >
            <div className="font-medium">Trusted by 10,000+ practices nationwide • $50M+ in treatments financed</div>
            <div className="flex items-center justify-center gap-6 flex-wrap">
              <div className="flex items-center gap-2">
                <Shield className="h-4 w-4 text-primary" />
                HIPAA Compliant
              </div>
              <div className="flex items-center gap-2">
                <Shield className="h-4 w-4 text-primary" />
                Bank-Level Security
              </div>
              <div className="flex items-center gap-2">
                <Shield className="h-4 w-4 text-primary" />
                SOC2 Certified
              </div>
            </div>
          </motion.div>
        </ScrollReveal>
      </div>
    </section>
  );
};