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
  Star,
  Mic,
  Timer,
  Target,
  BarChart3,
  Clock,
  DollarSign,
  Quote,
  Lock,
  Smartphone,
  CreditCard,
  AlertTriangle
} from "lucide-react";
import { ParallaxSection } from "@/components/ui/parallax-section";
import { AnimatedText, SplitText } from "@/components/ui/animated-text";
import { VideoSection } from "@/components/ui/video-section";
import { ScrollReveal, StaggerContainer, StaggerItem, MagneticButton, FloatingElements } from "@/components/ui/enhanced-animations";
import { HoverCard, CountUp, ProgressiveImage, GlowButton } from "@/components/ui/micro-interactions";
import heroImage from "@/assets/hero-dental-office-clean.jpg";
import teamImage from "@/assets/dental-team.jpg";
import patientImage from "@/assets/happy-patient.jpg";

const Index = () => {
  const echoFeatures = [
    {
      icon: Mic,
      title: 'Voice-Enabled Interaction',
      description: 'Natural language processing for seamless patient conversations and data collection.'
    },
    {
      icon: Timer,
      title: 'Real-Time Processing',
      description: 'Instant analysis of 50+ data points for immediate financing decisions.'
    },
    {
      icon: Brain,
      title: 'Healthcare-Specific AI',
      description: 'Specialized underwriting algorithms trained on dental procedure data and patient needs.'
    },
    {
      icon: Zap,
      title: 'Seamless Integration',
      description: 'Direct API connections with all major practice management systems for effortless workflow.'
    }
  ];

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
      icon: Clock,
      title: 'Optimal Timing Recommendations',
      description: 'AI-driven insights on when patients are most likely to accept treatment plans.'
    }
  ];

  const scopeFeatures = [
    {
      icon: TrendingUp,
      title: 'Real-Time Practice Analytics',
      description: 'Live dashboard with performance metrics and revenue optimization insights.'
    },
    {
      icon: Target,
      title: 'Treatment Acceptance Predictions',
      description: 'Predictive modeling to forecast which treatments patients will accept.'
    },
    {
      icon: DollarSign,
      title: 'Revenue Optimization Tools',
      description: 'Data-driven recommendations to maximize practice profitability and growth.'
    }
  ];

  const stats = [
    { value: '95%', label: 'Approval Rate' },
    { value: '30', label: 'Seconds Average Decision' },
    { value: '300%', label: 'Revenue Increase' },
    { value: '10,000+', label: 'Happy Practices' },
    { value: '99.9%', label: 'Uptime Reliability' },
    { value: '4.9/5', label: 'Provider Satisfaction' }
  ];

  const challenges = [
    {
      icon: AlertTriangle,
      stat: '<50%',
      description: 'of Americans can afford a $1,000 dental emergency'
    },
    {
      icon: TrendingUp,
      stat: '30-45%',
      description: 'higher approval rates with our AI vs traditional banks'
    },
    {
      icon: Clock,
      stat: 'Weeks vs Same-Day',
      description: 'Traditional financing payment time vs DentiPay instant payments'
    }
  ];

  const testimonials = [
    {
      quote: "DentiPay transformed our practice. Patient acceptance rates increased 300% and we get paid the same day.",
      author: "Dr. Sarah Mitchell, DDS",
      specialty: "Cosmetic & Restorative Dentistry"
    },
    {
      quote: "The AI actually understands dental procedures. Approvals that used to take weeks now happen instantly.",
      author: "Dr. Michael Chen, DDS", 
      specialty: "Oral Surgery Specialist"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <FloatingElements />
      
      {/* Hero Section - Enhanced Structure with Original Content */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
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

      {/* Problem/Solution Section - Enhanced with Flip Cards */}
      <section className="py-24 bg-gray-800 text-white relative overflow-hidden">
        <div className="container mx-auto px-6 relative z-10">
          <AnimatedText className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Traditional Financing Wasn't Built for Dental Care
            </h2>
            <p className="text-xl text-gray-300 max-w-4xl mx-auto">
              Traditional lenders don't understand dental procedures, patient needs, or practice workflows. 
              This creates barriers that hurt both providers and patients.
            </p>
          </AnimatedText>

          <StaggerContainer>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {challenges.map((challenge, index) => (
                <StaggerItem key={index}>
                  <motion.div
                    className="relative group"
                    whileHover={{ x: 8, scale: 1.02 }}
                    transition={{ duration: 0.2 }}
                  >
                     {/* Problem Card */}
                     <Card className="bg-card/10 border-card/20 text-white hover:bg-card/15 transition-all duration-300 hover:shadow-elegant group-hover:opacity-0">
                       <CardContent className="p-8 text-center">
                         <div className="flex flex-col items-center">
                           <motion.div 
                             className="p-3 bg-destructive/10 rounded-lg mb-4 w-fit"
                             whileHover={{ rotate: 360 }}
                             transition={{ duration: 0.3 }}
                           >
                             <challenge.icon className="h-8 w-8 text-destructive" />
                           </motion.div>
                           <div className="text-2xl font-bold text-white mb-2">
                             {challenge.stat}
                           </div>
                           <p className="text-gray-300 leading-relaxed text-sm">
                             {challenge.description}
                           </p>
                         </div>
                       </CardContent>
                     </Card>

                     {/* DentiPay Solution Card - Shows on hover */}
                     <Card className="absolute inset-0 bg-primary border-primary text-navy opacity-0 group-hover:opacity-100 transition-all duration-300 shadow-green">
                       <CardContent className="p-8 text-center">
                         <div className="flex flex-col items-center justify-center h-full">
                           <div className="text-xs font-medium text-navy/70 mb-2">DENTIPAY SOLUTION</div>
                           <h3 className="text-xl font-semibold mb-3">
                             {index === 0 ? '95% Approval Rate' : 
                              index === 1 ? 'Instant Decisions' : 
                              'Same-Day Payments'}
                           </h3>
                           <p className="text-sm opacity-90">
                             {index === 0 ? 'AI-powered approvals that understand dental care needs' : 
                              index === 1 ? 'Specialized underwriting for immediate treatment approvals' : 
                              'Direct provider payments eliminate waiting periods'}
                           </p>
                         </div>
                       </CardContent>
                     </Card>
                  </motion.div>
                </StaggerItem>
              ))}
            </div>
          </StaggerContainer>
        </div>
      </section>

      {/* Stats Section - Enhanced Animation */}
      <ParallaxSection className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Results That Speak for Themselves
            </h2>
          </ScrollReveal>
          <StaggerContainer className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8" staggerDelay={0.1}>
            {stats.map((stat, index) => (
              <StaggerItem key={index}>
                <motion.div
                  className="text-center"
                  whileHover={{ y: -5, scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                >
                  <HoverCard className="text-center p-6 rounded-lg bg-background/50 backdrop-blur-sm border border-border/50">
                    <motion.div 
                      className="text-3xl md:text-4xl font-bold text-primary mb-2"
                      initial={{ scale: 0.5, opacity: 0 }}
                      whileInView={{ scale: 1, opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1, duration: 0.6 }}
                    >
                      {stat.value.includes('%') || stat.value.includes('/') ? 
                        stat.value : 
                        <><CountUp end={parseInt(stat.value.replace(/[^\d]/g, ''))} duration={2} />{stat.value.replace(/[0-9]/g, '')}</>
                      }
                    </motion.div>
                    <div className="text-muted-foreground text-sm">{stat.label}</div>
                  </HoverCard>
                </motion.div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </ParallaxSection>

      {/* Echo Technology Section - Enhanced with Pulse Animations */}
      <section className="py-20 bg-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal className="text-center mb-16">
            <div className="flex flex-col items-center mb-8">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="mb-8 overflow-visible relative"
              >
                {/* Pulsing AI Background */}
                <div className="absolute inset-0 flex items-center justify-center z-0">
                  {[...Array(8)].map((_, i) => (
                    <motion.div
                      key={i}
                      className={`absolute w-[${100 + i * 50}px] h-[${100 + i * 50}px] rounded-full border border-accent-blue/20`}
                      animate={{
                        scale: [1, 1.2 + i * 0.05, 1],
                        opacity: [0.6 - i * 0.05, 0.1, 0.6 - i * 0.05]
                      }}
                      transition={{
                        duration: 3 - i * 0.1,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: i * 0.2
                      }}
                    />
                  ))}
                </div>
                <div className="w-96 h-96 md:w-[28rem] md:h-[28rem] flex items-center justify-center relative z-20">
                  <motion.div
                    animate={{
                      scale: [1, 1.05, 1],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                    className="text-accent-blue"
                  >
                    <Brain size={120} />
                  </motion.div>
                </div>
              </motion.div>
            </div>
            
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Introducing Echo: Your AI-Powered Financing Assistant
            </h2>
            <p className="text-xl text-muted-foreground max-w-4xl mx-auto">
              Our proprietary voice-enabled AI platform specializes in understanding healthcare financing needs, 
              processing 50+ data points per decision to deliver intelligent, instant approvals.
            </p>
          </ScrollReveal>

          <ScrollReveal>
            <VideoSection 
              title="Welcome To DentiPay"
              videoUrl="https://youtu.be/eWq1aw-ug_s?feature=shared"
              placeholder={false}
              aspectRatio="video"
              accent="blue"
              className="mb-16"
            />
          </ScrollReveal>

          <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-4 gap-6" staggerDelay={0.1}>
            {echoFeatures.map((feature, index) => (
              <StaggerItem key={index}>
                <HoverCard>
                  <Card className="h-full border-border bg-background hover:shadow-elegant transition-all duration-300">
                    <CardContent className="p-6">
                      <div className="flex items-center mb-4">
                        <motion.div 
                          className="p-2 bg-accent-blue/10 rounded-lg mr-3"
                          whileHover={{ rotate: 360, scale: 1.1 }}
                          transition={{ duration: 0.3 }}
                        >
                          <feature.icon className="h-6 w-6 text-accent-blue" />
                        </motion.div>
                      </div>
                      <h3 className="text-lg font-semibold text-foreground mb-2">{feature.title}</h3>
                      <p className="text-muted-foreground text-sm leading-relaxed">
                        {feature.description}
                      </p>
                    </CardContent>
                  </Card>
                </HoverCard>
              </StaggerItem>
            ))}
          </StaggerContainer>

          <ScrollReveal className="text-center mt-12">
            <MagneticButton>
              <Button variant="outline" size="lg" className="text-lg px-8 py-4">
                Learn More About Echo Technology <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </MagneticButton>
          </ScrollReveal>
        </div>
      </section>

      {/* Dual Intelligence System - Enhanced Interactivity */}
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
              <motion.div
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <Card className="border-border bg-surface p-8 h-full hover:shadow-elegant transition-all duration-300">
                  <div className="text-center mb-8">
                    <motion.div 
                      className="p-4 bg-accent-blue/10 rounded-2xl mx-auto mb-4 w-fit"
                      whileHover={{ scale: 1.1, rotate: 5 }}
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
                      <motion.div 
                        key={index} 
                        className="flex items-start space-x-3"
                        whileHover={{ x: 5 }}
                        transition={{ duration: 0.2 }}
                      >
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
                      </motion.div>
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
              </motion.div>
            </ScrollReveal>

            {/* SCOPE System */}
            <ScrollReveal>
              <motion.div
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <Card className="border-border bg-surface p-8 h-full hover:shadow-elegant transition-all duration-300">
                  <div className="text-center mb-8">
                    <motion.div 
                      className="p-4 bg-accent-green/10 rounded-2xl mx-auto mb-4 w-fit"
                      whileHover={{ scale: 1.1, rotate: -5 }}
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
                      <motion.div 
                        key={index} 
                        className="flex items-start space-x-3"
                        whileHover={{ x: 5 }}
                        transition={{ duration: 0.2 }}
                      >
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
                      </motion.div>
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
              </motion.div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* User Experience Section - Enhanced Layout */}
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
              <motion.div
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <Card className="border-border bg-background p-8 h-full hover:shadow-elegant transition-all duration-300">
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
                    <div className="flex items-start space-x-4">
                      <div className="p-2 bg-accent-blue/10 rounded-lg">
                        <CheckCircle2 className="h-5 w-5 text-accent-blue" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-foreground mb-1">Pre-qualified Pipeline</h4>
                        <p className="text-sm text-muted-foreground">Patients arrive pre-approved and ready for treatment</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-4">
                      <div className="p-2 bg-accent-blue/10 rounded-lg">
                        <Zap className="h-5 w-5 text-accent-blue" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-foreground mb-1">Automated Workflows</h4>
                        <p className="text-sm text-muted-foreground">Streamlined operations from consultation to payment</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-4">
                      <div className="p-2 bg-accent-blue/10 rounded-lg">
                        <Brain className="h-5 w-5 text-accent-blue" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-foreground mb-1">Predictive Analytics</h4>
                        <p className="text-sm text-muted-foreground">Know which treatments patients will accept before you present them</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-4">
                      <div className="p-2 bg-accent-blue/10 rounded-lg">
                        <Award className="h-5 w-5 text-accent-blue" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-foreground mb-1">Clinical Insights</h4>
                        <p className="text-sm text-muted-foreground">Data-driven treatment recommendations based on successful outcomes</p>
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            </ScrollReveal>

            {/* For Patients */}
            <ScrollReveal>
              <motion.div
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <Card className="border-border bg-background p-8 h-full hover:shadow-elegant transition-all duration-300">
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
                    <div className="flex items-start space-x-4">
                      <div className="p-2 bg-accent-green/10 rounded-lg">
                        <Clock className="h-5 w-5 text-accent-green" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-foreground mb-1">60-Second Pre-Approval</h4>
                        <p className="text-sm text-muted-foreground">Complete treatment financing in under a minute</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-4">
                      <div className="p-2 bg-accent-green/10 rounded-lg">
                        <Target className="h-5 w-5 text-accent-green" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-foreground mb-1">Confidence Scoring</h4>
                        <p className="text-sm text-muted-foreground">Know your approval odds before applying</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-4">
                      <div className="p-2 bg-accent-green/10 rounded-lg">
                        <CreditCard className="h-5 w-5 text-accent-green" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-foreground mb-1">Flexible Structures</h4>
                        <p className="text-sm text-muted-foreground">Payment plans that fit your budget and treatment needs</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-4">
                      <div className="p-2 bg-accent-green/10 rounded-lg">
                        <Shield className="h-5 w-5 text-accent-green" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-foreground mb-1">No Surprises</h4>
                        <p className="text-sm text-muted-foreground">Transparent terms with predictable monthly payments</p>
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            </ScrollReveal>
          </div>
        </div>
      </ParallaxSection>

      {/* Social Proof & Results - Enhanced Testimonials */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal className="text-center mb-16">
            <AnimatedText>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Trusted by Leading Dental Professionals Nationwide
              </h2>
            </AnimatedText>
          </ScrollReveal>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <ScrollReveal>
              <ProgressiveImage 
                src={teamImage} 
                alt="Professional dental team" 
                className="rounded-2xl shadow-2xl w-full aspect-[4/3]"
              />
            </ScrollReveal>
            
            <ScrollReveal>
              <div className="space-y-8">
                {testimonials.map((testimonial, index) => (
                  <motion.div 
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.2 }}
                    whileHover={{ scale: 1.02, x: 5 }}
                  >
                    <Card className="border-border bg-surface p-6 hover:shadow-elegant transition-all duration-300">
                      <div className="flex mb-4">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="h-4 w-4 fill-accent-peach text-accent-peach" />
                        ))}
                      </div>
                      <Quote className="h-8 w-8 text-accent-blue mb-4" />
                      <p className="text-muted-foreground mb-4 italic">
                        "{testimonial.quote}"
                      </p>
                      <div>
                        <div className="font-semibold text-foreground">{testimonial.author}</div>
                        <div className="text-sm text-muted-foreground">{testimonial.specialty}</div>
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Technology Trust Section - Enhanced Grid */}
      <ParallaxSection className="py-20 bg-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal className="text-center mb-16">
            <AnimatedText>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                Built for Healthcare, Secured for Trust
              </h2>
              <p className="text-xl text-muted-foreground max-w-4xl mx-auto">
                Enterprise-grade security and seamless integration capabilities
              </p>
            </AnimatedText>
          </ScrollReveal>

          <div className="grid lg:grid-cols-2 gap-12">
            <ScrollReveal>
              <div className="space-y-6">
                <h3 className="text-2xl font-bold text-foreground mb-6">Security & Compliance</h3>
                <div className="space-y-4">
                  <motion.div 
                    className="flex items-start space-x-3"
                    whileHover={{ x: 5 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Lock className="h-6 w-6 text-accent-blue mt-1" />
                    <div>
                      <h4 className="font-semibold text-foreground">Bank-Level Encryption</h4>
                      <p className="text-muted-foreground">Advanced security protocols and data protection</p>
                    </div>
                  </motion.div>
                  <motion.div 
                    className="flex items-start space-x-3"
                    whileHover={{ x: 5 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Shield className="h-6 w-6 text-accent-blue mt-1" />
                    <div>
                      <h4 className="font-semibold text-foreground">HIPAA Compliant</h4>
                      <p className="text-muted-foreground">Full healthcare data privacy compliance</p>
                    </div>
                  </motion.div>
                  <motion.div 
                    className="flex items-start space-x-3"
                    whileHover={{ x: 5 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Award className="h-6 w-6 text-accent-blue mt-1" />
                    <div>
                      <h4 className="font-semibold text-foreground">SOC 2 Type II Certified</h4>
                      <p className="text-muted-foreground">Independently audited security controls</p>
                    </div>
                  </motion.div>
                  <motion.div 
                    className="flex items-start space-x-3"
                    whileHover={{ x: 5 }}
                    transition={{ duration: 0.2 }}
                  >
                    <CreditCard className="h-6 w-6 text-accent-blue mt-1" />
                    <div>
                      <h4 className="font-semibold text-foreground">PCI DSS Compliant</h4>
                      <p className="text-muted-foreground">Secure payment processing standards</p>
                    </div>
                  </motion.div>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal>
              <div className="space-y-6">
                <h3 className="text-2xl font-bold text-foreground mb-6">Integration Features</h3>
                <div className="space-y-4">
                  <motion.div 
                    className="flex items-start space-x-3"
                    whileHover={{ x: 5 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Zap className="h-6 w-6 text-accent-green mt-1" />
                    <div>
                      <h4 className="font-semibold text-foreground">Seamless API Connections</h4>
                      <p className="text-muted-foreground">Major practice management system integrations</p>
                    </div>
                  </motion.div>
                  <motion.div 
                    className="flex items-start space-x-3"
                    whileHover={{ x: 5 }}
                    transition={{ duration: 0.2 }}
                  >
                    <TrendingUp className="h-6 w-6 text-accent-green mt-1" />
                    <div>
                      <h4 className="font-semibold text-foreground">Real-Time Data Sync</h4>
                      <p className="text-muted-foreground">Live synchronization with your existing workflows</p>
                    </div>
                  </motion.div>
                  <motion.div 
                    className="flex items-start space-x-3"
                    whileHover={{ x: 5 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Target className="h-6 w-6 text-accent-green mt-1" />
                    <div>
                      <h4 className="font-semibold text-foreground">Custom Workflow Automation</h4>
                      <p className="text-muted-foreground">Tailored processes for your practice needs</p>
                    </div>
                  </motion.div>
                  <motion.div 
                    className="flex items-start space-x-3"
                    whileHover={{ x: 5 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Users className="h-6 w-6 text-accent-green mt-1" />
                    <div>
                      <h4 className="font-semibold text-foreground">White-Label Partnership</h4>
                      <p className="text-muted-foreground">Custom branding and partnership options</p>
                    </div>
                  </motion.div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </ParallaxSection>

      {/* Final CTA - Enhanced Magnetic Buttons */}
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
    </div>
  );
};

export default Index;