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

// Enhanced components from providers and patients pages
import { HeroSection } from '@/components/providers/HeroSection';
import { VideoSection as ProvidersVideoSection } from '@/components/providers/VideoSection';
import { TrinitySection } from '@/components/providers/TrinitySection';
import { EchoProviderSection } from '@/components/providers/EchoProviderSection';
import { ROICalculator } from '@/components/providers/ROICalculator';
import { StatsSection } from '@/components/providers/StatsSection';
import { TestimonialsSection } from '@/components/providers/TestimonialsSection';
import { FinalCTASection } from '@/components/providers/FinalCTASection';
import { ProblemSection } from '@/components/providers/ProblemSection';
import { PaymentCalculator } from '@/components/patients/PaymentCalculator';

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
      
      {/* Enhanced Hero Section */}
      <HeroSection />

      {/* Video Section with Product Overview */}
      <ProvidersVideoSection imagePosition="left" mobileImagePosition="bottom" />

      {/* Enhanced Problem/Solution Section */}
      <ProblemSection />

      {/* Enhanced Stats Section */}
      <StatsSection />

      {/* Enhanced Trinity System with Modals */}
      <TrinitySection />

      {/* Enhanced Echo AI Section */}
      <EchoProviderSection />

      {/* Interactive ROI Calculator for Providers */}
      <ROICalculator />

      {/* Payment Calculator for Patients */}
      <section className="py-24 bg-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              Plan Your Treatment & Financing
            </h2>
            <p className="text-xl text-muted-foreground max-w-4xl mx-auto">
              Use our calculator to explore payment options for your dental treatment
            </p>
          </ScrollReveal>
          <PaymentCalculator />
        </div>
      </section>

      {/* User Experience Section - Enhanced */}
      <ParallaxSection className="py-20 bg-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              Experience What Intelligence Feels Like
            </h2>
            <p className="text-xl text-muted-foreground max-w-4xl mx-auto">
              Revolutionary experiences tailored for both providers and patients
            </p>
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
            </ScrollReveal>
          </div>
        </div>
      </ParallaxSection>

      {/* Enhanced Testimonials Section */}
      <TestimonialsSection />

      {/* Technology Trust Section */}
      <ParallaxSection className="py-20 bg-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              Built for Healthcare, Secured for Trust
            </h2>
            <p className="text-xl text-muted-foreground max-w-4xl mx-auto">
              Enterprise-grade security and seamless integration capabilities
            </p>
          </ScrollReveal>

          <div className="grid lg:grid-cols-2 gap-12">
            <ScrollReveal>
              <div className="space-y-6">
                <h3 className="text-2xl font-bold text-foreground mb-6">Security & Compliance</h3>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <Lock className="h-6 w-6 text-accent-blue mt-1" />
                    <div>
                      <h4 className="font-semibold text-foreground">Bank-Level Encryption</h4>
                      <p className="text-muted-foreground">Advanced security protocols and data protection</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <Shield className="h-6 w-6 text-accent-blue mt-1" />
                    <div>
                      <h4 className="font-semibold text-foreground">HIPAA Compliant</h4>
                      <p className="text-muted-foreground">Full healthcare data privacy compliance</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <Award className="h-6 w-6 text-accent-blue mt-1" />
                    <div>
                      <h4 className="font-semibold text-foreground">SOC 2 Type II Certified</h4>
                      <p className="text-muted-foreground">Independently audited security controls</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CreditCard className="h-6 w-6 text-accent-blue mt-1" />
                    <div>
                      <h4 className="font-semibold text-foreground">PCI DSS Compliant</h4>
                      <p className="text-muted-foreground">Secure payment processing standards</p>
                    </div>
                  </div>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal>
              <div className="space-y-6">
                <h3 className="text-2xl font-bold text-foreground mb-6">Integration Features</h3>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <Zap className="h-6 w-6 text-accent-green mt-1" />
                    <div>
                      <h4 className="font-semibold text-foreground">Seamless API Connections</h4>
                      <p className="text-muted-foreground">Major practice management system integrations</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <TrendingUp className="h-6 w-6 text-accent-green mt-1" />
                    <div>
                      <h4 className="font-semibold text-foreground">Real-Time Data Sync</h4>
                      <p className="text-muted-foreground">Live synchronization with your existing workflows</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <Target className="h-6 w-6 text-accent-green mt-1" />
                    <div>
                      <h4 className="font-semibold text-foreground">Custom Workflow Automation</h4>
                      <p className="text-muted-foreground">Tailored processes for your practice needs</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <Users className="h-6 w-6 text-accent-green mt-1" />
                    <div>
                      <h4 className="font-semibold text-foreground">White-Label Partnership</h4>
                      <p className="text-muted-foreground">Custom branding and partnership options</p>
                    </div>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </ParallaxSection>

      {/* Enhanced Final CTA */}
      <FinalCTASection />
    </div>
  );
};

export default Index;