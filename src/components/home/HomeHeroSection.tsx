import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight, Brain, Zap, Target, Shield, Users, CreditCard } from 'lucide-react';
import { AnimatedText, SplitText } from '@/components/ui/animated-text';
import { ScrollReveal, MagneticButton, FloatingElements } from '@/components/ui/enhanced-animations';
import { GlowButton, ProgressiveImage } from '@/components/ui/micro-interactions';
import { PulseRipples } from '@/components/ui/pulse-ripples';
import heroImage from '@/assets/hero-dental-blue-background.jpg';

export const HomeHeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <FloatingElements />
      
      {/* Background with dental blue overlay */}
      <div className="absolute inset-0">
        <ProgressiveImage 
          src={heroImage} 
          alt="Intelligence reshaping dental finance" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-dental-blue/20 via-navy/10 to-dental-blue-dark/20" />
      </div>
      
      {/* Animated intelligence patterns */}
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
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          {/* Intelligence badge */}
          <motion.div 
            className="mb-8 text-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-intelligence/10 border border-intelligence/20 text-intelligence font-medium text-sm">
              <Brain className="w-4 h-4" />
              AI-Powered Dental Finance Revolution
            </div>
          </motion.div>

          {/* Main headline */}
          <div className="text-center mb-8">
            <SplitText 
              text="Intelligence Reshaping Dental Finance" 
              className="text-4xl md:text-6xl lg:text-7xl font-bold text-foreground mb-6 leading-tight"
              wordDelay={0.1}
            />
            
            <AnimatedText delay={0.5} className="text-xl md:text-2xl text-muted-foreground max-w-4xl mx-auto">
              Where both patients and providers win through AI-powered solutions that understand dental care
            </AnimatedText>
          </div>

          {/* Dual Path Layout - Patient Left, Provider Right */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto mb-12"
          >
            {/* Patient Path - LEFT */}
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-dental-blue to-dental-blue-dark rounded-2xl opacity-50 group-hover:opacity-75 transition duration-300 blur-sm"></div>
              <div className="relative bg-background/95 backdrop-blur-sm rounded-2xl p-8 h-full border border-dental-blue/20">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-3 bg-dental-blue/10 rounded-xl">
                    <Users className="w-6 h-6 text-dental-blue-dark" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-foreground">For Patients</h3>
                    <p className="text-dental-blue-dark font-medium">Access the care you need</p>
                  </div>
                </div>
                
                <div className="space-y-4 mb-8">
                  <div className="flex items-start gap-3">
                    <div className="w-5 h-5 bg-dental-blue rounded-full flex-shrink-0 mt-0.5"></div>
                    <div>
                      <div className="font-semibold text-foreground">Instant AI Approvals</div>
                      <div className="text-sm text-muted-foreground">Get approved in seconds, not days</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-5 h-5 bg-dental-blue rounded-full flex-shrink-0 mt-0.5"></div>
                    <div>
                      <div className="font-semibold text-foreground">Affordable Payments</div>
                      <div className="text-sm text-muted-foreground">Plans that work with your budget</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-5 h-5 bg-dental-blue rounded-full flex-shrink-0 mt-0.5"></div>
                    <div>
                      <div className="font-semibold text-foreground">Trusted Network</div>
                      <div className="text-sm text-muted-foreground">Connect with verified providers</div>
                    </div>
                  </div>
                </div>

                <MagneticButton>
                  <Button 
                    size="lg" 
                    className="w-full text-lg px-8 py-4 bg-dental-blue hover:bg-dental-blue-dark text-foreground font-semibold rounded-xl transition-all duration-300 hover:scale-105"
                  >
                    Get Instant Pre-Approval
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </MagneticButton>
                
                <div className="text-xs text-muted-foreground mt-3 text-center">
                  Find Providers • Payment Calculator • Apply Now
                </div>
              </div>
            </div>

            {/* Provider Path - RIGHT */}
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-navy to-intelligence rounded-2xl opacity-50 group-hover:opacity-75 transition duration-300 blur-sm"></div>
              <div className="relative bg-background/95 backdrop-blur-sm rounded-2xl p-8 h-full border border-navy/20">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-3 bg-navy/10 rounded-xl">
                    <CreditCard className="w-6 h-6 text-navy" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-foreground">For Providers</h3>
                    <p className="text-navy font-medium">Get paid for the care you provide</p>
                  </div>
                </div>
                
                <div className="space-y-4 mb-8">
                  <div className="flex items-start gap-3">
                    <div className="w-5 h-5 bg-navy rounded-full flex-shrink-0 mt-0.5"></div>
                    <div>
                      <div className="font-semibold text-foreground">Higher Acceptance Rates</div>
                      <div className="text-sm text-muted-foreground">AI approves more patients than traditional methods</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-5 h-5 bg-navy rounded-full flex-shrink-0 mt-0.5"></div>
                    <div>
                      <div className="font-semibold text-foreground">Guaranteed Revenue</div>
                      <div className="text-sm text-muted-foreground">Get paid upfront, reduce collection hassles</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-5 h-5 bg-navy rounded-full flex-shrink-0 mt-0.5"></div>
                    <div>
                      <div className="font-semibold text-foreground">Practice Growth</div>
                      <div className="text-sm text-muted-foreground">Attract more patients with easy financing</div>
                    </div>
                  </div>
                </div>

                <MagneticButton>
                  <GlowButton className="w-full bg-navy hover:bg-navy/90 text-navy-foreground text-lg px-8 py-4 rounded-xl font-semibold transition-all duration-300 hover:scale-105">
                    Experience the Revolution
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </GlowButton>
                </MagneticButton>
                
                <div className="text-xs text-muted-foreground mt-3 text-center">
                  See ROI Calculator • Book Demo • Free Trial
                </div>
              </div>
            </div>
          </motion.div>

          {/* Win-Win Value Proposition */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.0, duration: 0.8 }}
            className="text-center mb-8"
          >
            <div className="inline-flex items-center gap-4 px-6 py-3 rounded-full bg-gradient-to-r from-dental-blue/10 to-navy/10 border border-dental-blue/20">
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-dental-blue-dark" />
                <span className="text-sm font-medium text-foreground">Patients Win</span>
              </div>
              <div className="w-2 h-2 bg-muted-foreground rounded-full"></div>
              <div className="flex items-center gap-2">
                <CreditCard className="w-4 h-4 text-navy" />
                <span className="text-sm font-medium text-foreground">Providers Win</span>
              </div>
              <div className="w-2 h-2 bg-muted-foreground rounded-full"></div>
              <div className="flex items-center gap-2">
                <Brain className="w-4 h-4 text-intelligence" />
                <span className="text-sm font-medium text-foreground">AI Makes It Possible</span>
              </div>
            </div>
          </motion.div>

          {/* Trust indicators */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.8 }}
            className="text-center text-sm text-muted-foreground space-y-3"
          >
            <div className="font-medium">Trusted by 10,000+ practices nationwide • $50M+ in treatments financed</div>
            <div className="flex items-center justify-center gap-6 flex-wrap">
              <div className="flex items-center gap-2">
                <Shield className="h-4 w-4 text-dental-blue-dark" />
                HIPAA Compliant
              </div>
              <div className="flex items-center gap-2">
                <Shield className="h-4 w-4 text-dental-blue-dark" />
                Bank-Level Security
              </div>
              <div className="flex items-center gap-2">
                <Shield className="h-4 w-4 text-dental-blue-dark" />
                SOC2 Certified
              </div>
            </div>
          </motion.div>
        </ScrollReveal>
      </div>
    </section>
  );
};