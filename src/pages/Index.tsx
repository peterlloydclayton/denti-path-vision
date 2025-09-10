import { motion } from 'framer-motion';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Brain, 
  Shield, 
  Zap, 
  Users,
  TrendingUp,
  Award,
  CheckCircle2,
  ArrowRight,
  Play,
  Star
} from "lucide-react";
import { ParallaxSection } from "@/components/ui/parallax-section";
import { AnimatedText, SplitText } from "@/components/ui/animated-text";
import { VideoSection } from "@/components/ui/video-section";
import { ScrollReveal, StaggerContainer, StaggerItem, MagneticButton, FloatingElements } from "@/components/ui/enhanced-animations";
import { HoverCard, CountUp, ProgressiveImage, GlowButton } from "@/components/ui/micro-interactions";
import heroImage from "@/assets/hero-dental-office.jpg";
import teamImage from "@/assets/dental-team.jpg";
import patientImage from "@/assets/happy-patient.jpg";

const Index = () => {
  const features = [
    {
      icon: Brain,
      title: 'AI-Powered Intelligence',
      description: 'Advanced machine learning algorithms analyze patient profiles for instant, accurate financing decisions.'
    },
    {
      icon: Zap,
      title: 'Lightning Fast Decisions',
      description: 'Get approval decisions in under 30 seconds with our optimized processing engine.'
    },
    {
      icon: Shield,
      title: 'Bank-Level Security',
      description: 'Enterprise-grade encryption and compliance with all healthcare data protection standards.'
    },
    {
      icon: Users,
      title: 'Patient-First Experience',
      description: 'Seamless application process designed to maximize approval rates and patient satisfaction.'
    },
    {
      icon: TrendingUp,
      title: 'Revenue Growth',
      description: 'Increase treatment acceptance rates by 300% with intelligent financing options.'
    },
    {
      icon: Award,
      title: 'Industry Leading',
      description: 'Trusted by over 10,000 dental practices nationwide with 99.9% uptime reliability.'
    }
  ];

  const stats = [
    { value: '95', label: 'Approval Rate' },
    { value: '30', label: 'Seconds to Decision' },
    { value: '300', label: 'Revenue Increase' },
    { value: '10000', label: 'Happy Practices' }
  ];

  return (
    <div className="min-h-screen bg-background">
      <FloatingElements />
      
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <ProgressiveImage 
            src={heroImage} 
            alt="Modern dental office" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-background/60" />
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <ScrollReveal>
            <SplitText 
              text="Revolutionary Dental Finance Intelligence" 
              className="text-4xl md:text-6xl font-bold text-foreground mb-6"
              wordDelay={0.1}
            />
            
            <AnimatedText delay={0.5} className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              PATH & SCOPE transforms dental financing with AI-powered approval technology,
              delivering instant decisions and seamless patient experiences.
            </AnimatedText>
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.8 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <MagneticButton>
                <GlowButton className="bg-primary hover:bg-primary/90 text-primary-foreground text-lg px-8 py-6 rounded-lg">
                  Get Started <ArrowRight className="ml-2 h-5 w-5" />
                </GlowButton>
              </MagneticButton>
              <MagneticButton>
                <Button variant="outline" size="lg" className="text-lg px-8 py-6">
                  <Play className="mr-2 h-5 w-5" />
                  Watch Demo
                </Button>
              </MagneticButton>
            </motion.div>
          </ScrollReveal>
        </div>
      </section>

      {/* Stats Section */}
      <ParallaxSection className="py-20 bg-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <StaggerContainer className="grid grid-cols-2 md:grid-cols-4 gap-8" staggerDelay={0.1}>
            {stats.map((stat, index) => (
              <StaggerItem key={index}>
                <HoverCard className="text-center p-6 rounded-lg">
                  <div className="text-3xl md:text-4xl font-bold text-primary mb-2">
                    <CountUp end={parseInt(stat.value.replace(/[^\d]/g, ''))} duration={2} />
                    {stat.value.includes('%') ? '%' : stat.value.includes('+') ? '+' : ''}
                  </div>
                  <div className="text-muted-foreground">{stat.label}</div>
                </HoverCard>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </ParallaxSection>

      {/* Features Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Intelligent Technology Stack
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Our AI-powered platform combines advanced algorithms with intuitive design
              to revolutionize dental financing decisions.
            </p>
          </ScrollReveal>

          <ScrollReveal>
            <VideoSection 
              title="See Our Technology in Action"
              description="Discover how our AI processes applications in real-time"
              aspectRatio="video"
              accent="blue"
              className="mb-16"
            />
          </ScrollReveal>

          <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-3 gap-8" staggerDelay={0.1}>
            {features.map((feature, index) => (
              <StaggerItem key={index}>
                <HoverCard>
                  <Card className="h-full border-border bg-surface">
                    <CardContent className="p-6">
                      <div className="flex items-center mb-4">
                        <motion.div 
                          className="p-2 bg-accent-blue/10 rounded-lg mr-4"
                          whileHover={{ rotate: 360 }}
                          transition={{ duration: 0.3 }}
                        >
                          <feature.icon className="h-6 w-6 text-accent-blue" />
                        </motion.div>
                        <h3 className="text-xl font-semibold text-foreground">{feature.title}</h3>
                      </div>
                      <p className="text-muted-foreground leading-relaxed">
                        {feature.description}
                      </p>
                    </CardContent>
                  </Card>
                </HoverCard>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Team & Trust Section */}
      <ParallaxSection className="py-20 bg-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <ScrollReveal>
              <ProgressiveImage 
                src={teamImage} 
                alt="Professional dental team" 
                className="rounded-2xl shadow-2xl w-full aspect-[4/3]"
              />
            </ScrollReveal>
            
            <ScrollReveal>
              <div className="space-y-6">
                <h2 className="text-3xl md:text-4xl font-bold text-foreground">
                  Trusted by Leading Dental Professionals
                </h2>
                <p className="text-lg text-muted-foreground">
                  Our platform is built by industry experts who understand the unique 
                  challenges of dental financing. We combine decades of experience with 
                  cutting-edge technology.
                </p>
                
                <StaggerContainer className="grid grid-cols-2 gap-6" staggerDelay={0.1}>
                  <StaggerItem>
                    <HoverCard className="text-center p-4 bg-background rounded-xl">
                      <div className="text-2xl font-bold text-primary mb-1">
                        <CountUp end={500} />+
                      </div>
                      <div className="text-sm text-muted-foreground">Dental Practices</div>
                    </HoverCard>
                  </StaggerItem>
                  <StaggerItem>
                    <HoverCard className="text-center p-4 bg-background rounded-xl">
                      <div className="text-2xl font-bold text-primary mb-1">
                        <CountUp end={98} />%
                      </div>
                      <div className="text-sm text-muted-foreground">Satisfaction Rate</div>
                    </HoverCard>
                  </StaggerItem>
                </StaggerContainer>

                <motion.div 
                  className="flex items-center space-x-4 pt-4"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5 }}
                >
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, scale: 0 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.7 + i * 0.1 }}
                      >
                        <Star className="h-5 w-5 fill-accent-peach text-accent-peach" />
                      </motion.div>
                    ))}
                  </div>
                  <span className="text-muted-foreground">Rated 4.9/5 by practices</span>
                </motion.div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </ParallaxSection>

      {/* Final CTA */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0">
          <ProgressiveImage 
            src={patientImage} 
            alt="Happy dental patient" 
            className="w-full h-full object-cover opacity-20"
          />
        </div>
        
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <ScrollReveal>
            <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-6">
              Ready to Transform Your Practice?
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Join thousands of dental professionals who've revolutionized their 
              financing process with PATH & SCOPE.
            </p>
            
            <StaggerContainer className="flex flex-col sm:flex-row gap-4 justify-center" staggerDelay={0.2}>
              <StaggerItem>
                <MagneticButton>
                  <GlowButton className="bg-primary hover:bg-primary/90 text-primary-foreground text-lg px-8 py-6 rounded-lg">
                    Start Free Trial <ArrowRight className="ml-2 h-5 w-5" />
                  </GlowButton>
                </MagneticButton>
              </StaggerItem>
              <StaggerItem>
                <MagneticButton>
                  <Button variant="outline" size="lg" className="text-lg px-8 py-6">
                    Schedule Demo
                  </Button>
                </MagneticButton>
              </StaggerItem>
            </StaggerContainer>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
};

export default Index;