import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { AnimatedText } from '@/components/ui/animated-text';
import { ScrollReveal, StaggerContainer, StaggerItem, MagneticButton } from '@/components/ui/enhanced-animations';
import { GlowButton } from '@/components/ui/micro-interactions';
import { ProgressiveImage } from '@/components/ui/micro-interactions';
import { ArrowRight } from 'lucide-react';
import patientImage from '@/assets/happy-patient.jpg';

export const HomeFinalCTASection = () => {
  return (
    <section className="py-20 relative overflow-hidden">
      <div className="absolute inset-0">
        <ProgressiveImage 
          src={patientImage} 
          alt="Happy dental patient" 
          className="w-full h-full object-cover opacity-20"
        />
      </div>
      
      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <ScrollReveal>
          <AnimatedText>
            <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-6">
              Ready to Transform Your Practice?
            </h2>
          </AnimatedText>
          
          <div className="grid md:grid-cols-2 gap-12 mt-12">
            {/* Provider CTA */}
            <div className="text-center">
              <h3 className="text-2xl font-bold text-foreground mb-4">For Providers</h3>
              <p className="text-muted-foreground mb-6">
                Join thousands of dental professionals revolutionizing patient financing with intelligent technology.
              </p>
              <StaggerContainer className="flex flex-col gap-4" staggerDelay={0.1}>
                <StaggerItem>
                  <MagneticButton>
                    <GlowButton className="bg-primary hover:bg-primary/90 text-primary-foreground text-xl font-bold px-8 py-4 rounded-lg w-full">
                      Start Free Trial <ArrowRight className="ml-2 h-5 w-5" />
                    </GlowButton>
                  </MagneticButton>
                </StaggerItem>
                <StaggerItem>
                  <MagneticButton>
                    <Button variant="outline" size="lg" className="text-lg px-8 py-4 w-full">
                      Schedule Demo
                    </Button>
                  </MagneticButton>
                </StaggerItem>
                <StaggerItem>
                  <Button variant="link" className="text-muted-foreground hover:text-foreground">
                    View Pricing →
                  </Button>
                </StaggerItem>
              </StaggerContainer>
            </div>

            {/* Patient CTA */}
            <div className="text-center">
              <h3 className="text-2xl font-bold text-foreground mb-4">For Patients</h3>
              <p className="text-muted-foreground mb-6">
                Find participating providers in your area and get pre-approved for treatment.
              </p>
              <StaggerContainer className="flex flex-col gap-4" staggerDelay={0.1}>
                <StaggerItem>
                  <MagneticButton>
                    <GlowButton className="bg-primary hover:bg-primary/90 text-primary-foreground text-xl font-bold px-8 py-4 rounded-lg w-full">
                      Find Your Provider <ArrowRight className="ml-2 h-5 w-5" />
                    </GlowButton>
                  </MagneticButton>
                </StaggerItem>
                <StaggerItem>
                  <MagneticButton>
                    <Button 
                      variant="outline" 
                      size="lg" 
                      className="text-lg px-8 py-4 w-full"
                      onClick={() => window.open('https://dental-docs-hub.lovable.app/signup', '_blank')}
                    >
                      Get Pre-Approved
                    </Button>
                  </MagneticButton>
                </StaggerItem>
              </StaggerContainer>
            </div>
          </div>

          <motion.div 
            className="mt-12 pt-8 border-t border-border/50"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
          >
            <p className="text-muted-foreground mb-4">Contact Information</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center text-sm">
              <span>Phone: 1-800-DENTIPAY</span>
              <span>Live Chat: Available 24/7</span>
            </div>
          </motion.div>
        </ScrollReveal>
      </div>
    </section>
  );
};