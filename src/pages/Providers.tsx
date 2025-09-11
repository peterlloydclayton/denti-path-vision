import { motion } from 'framer-motion';
import { 
  TrendingUp, Users, Clock, Shield, ArrowRight, CheckCircle, Star, 
  Brain, Target, BarChart3, MessageSquare, Calculator, Lock, 
  BookOpen, Headphones, Download, Award, Play
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ParallaxSection } from '@/components/ui/parallax-section';
import { AnimatedText } from '@/components/ui/animated-text';
import { VideoSection } from '@/components/ui/video-section';
import teamImage from '@/assets/dental-team.jpg';

const Providers = () => {
  const keyMetrics = [
    { label: '94%', sublabel: 'Approval Prediction Accuracy' },
    { label: '40%', sublabel: 'Higher Treatment Acceptance' },
    { label: '<30', sublabel: 'Second Decisions' },
    { label: '1,200+', sublabel: 'Provider Network' }
  ];

  const intelligenceFeatures = [
    {
      icon: Users,
      title: 'DentiPay (The Brand Layer)',
      subtitle: 'The trusted face for dentistry finance',
      benefits: [
        'Market Leverage: A recognizable, unified financial brand increases patient trust',
        'Network Effect: Every provider strengthens brand equity, creating shared familiarity',
        'Speed to Adoption: Brand credibility reduces patient hesitation and shortens decision cycles'
      ]
    },
    {
      icon: Target,
      title: 'PATH (The Portal)',
      subtitle: 'Patient Acceptance Treatment Hub',
      benefits: [
        '2-minute application process',
        'Real-time pre-approvals with transparent terms',
        '94% approval rates vs. 45% industry average'
      ]
    },
    {
      icon: Brain,
      title: 'SCOPE (The Intelligence Engine)',
      subtitle: 'Sentient Capable Outcome Predictive Engine',
      benefits: [
        'Clinical decision support in real-time',
        'Financial capacity analysis and recommendations',
        'Predictive modeling using 30+ data points per decision'
      ]
    }
  ];

  const practicePillars = [
    {
      icon: TrendingUp,
      title: 'Patient Pipeline Intelligence',
      subtitle: 'Pre-qualified leads, ready for treatment',
      features: [
        'Approval Predictions: Success probability scores for every patient',
        'Scheduling Optimization: AI-driven recommendations for ideal appointment timing',
        'Financial Capacity Analysis: Understand treatment affordability upfront'
      ]
    },
    {
      icon: BarChart3,
      title: 'Practice Analytics Dashboard',
      subtitle: 'Real-time insights that drive decisions',
      features: [
        'Today\'s Approvals: Live approval tracking',
        'Revenue Generated: Daily/monthly/quarterly performance',
        'Acceptance Rate Monitoring: Track improvement over time',
        'Treatment Plan Analytics: Which procedures convert best'
      ]
    },
    {
      icon: MessageSquare,
      title: 'Patient Communications',
      subtitle: 'Automated, intelligent engagement',
      features: [
        'Pre-approval notifications and status updates',
        'Payment reminders and scheduling coordination',
        'Treatment plan explanations and financing options',
        'Post-treatment satisfaction tracking'
      ]
    }
  ];

  const testimonials = [
    {
      name: 'Dr. Sarah Johnson',
      title: 'Family Dentistry',
      quote: 'DentiPay\'s pre-approval system has been a game-changer for our case acceptance rates. The AI predictions are incredibly accurate.',
      metrics: ['92% Patient Satisfaction', '45% increase in case acceptance']
    },
    {
      name: 'Dr. Michael Chen',
      title: 'Periodontal Specialist',
      quote: 'The outcome predictions from PATH have significantly improved our treatment planning. Patients appreciate the transparency.',
      metrics: ['25% Patient Retention Increase', '38% treatment plan acceptance']
    },
    {
      name: 'Bright Smile Dental Group',
      title: 'Multi-Location Practice',
      quote: 'Standardizing on DentiPay brought consistency and a huge efficiency boost across our locations.',
      metrics: ['28% Increase in Case Value', '32% cross-location efficiency improvement']
    }
  ];

  const securityFeatures = [
    'Bank-level encryption and security protocols',
    'Enterprise-grade data protection standards',
    '99.9% uptime reliability guarantee',
    'Comprehensive fraud protection',
    'Seamless workflow integration with existing systems',
    'Real-time data synchronization'
  ];

  const resources = [
    {
      icon: BookOpen,
      title: 'Provider Success Playbook',
      description: 'Best practices, case studies, and implementation tips'
    },
    {
      icon: Award,
      title: 'Training Materials',
      description: 'Comprehensive onboarding and ongoing education'
    },
    {
      icon: Headphones,
      title: '24/7 Support',
      description: 'Dedicated support team for technical and operational questions'
    },
    {
      icon: Download,
      title: 'Marketing Materials',
      description: 'Patient education resources and practice promotion tools'
    }
  ];

  return (
    <div className="pt-24">
      {/* Hero Section */}
      <section className="py-24 bg-background relative overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-5"
          style={{ backgroundImage: `url(${teamImage})` }}
        />
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <AnimatedText>
              <h1 className="text-hero-mobile md:text-hero font-bold mb-6">
                Intelligence That{' '}
                <span className="relative">
                  Amplifies Your Practice
                  <div className="absolute bottom-0 left-0 w-full h-1 bg-dental-lavender rounded-full"></div>
                </span>
              </h1>
            </AnimatedText>
            
            <AnimatedText delay={0.2}>
              <h2 className="text-xl md:text-2xl mb-4 text-dental-blue font-semibold">
                PATH & SCOPE working behind every patient interaction
              </h2>
            </AnimatedText>
            
            <AnimatedText delay={0.3}>
              <p className="text-lg md:text-xl mb-8 text-muted-foreground leading-relaxed max-w-3xl mx-auto">
                Stop guessing about patient financing. Start knowing. Transform uncertainty into confidence 
                with AI-powered decisions that increase treatment acceptance and accelerate revenue growth.
              </p>
            </AnimatedText>

            <AnimatedText delay={0.4}>
              <div className="mb-8">
                <VideoSection 
                  title="DENTIPAY: Meet The Future Of Dental Case Acceptance"
                  videoUrl="https://youtu.be/mNTFwDsYP1s?feature=shared"
                  placeholder={false}
                  aspectRatio="video"
                  accent="blue"
                  className="max-w-3xl mx-auto"
                />
              </div>
            </AnimatedText>

            <AnimatedText delay={0.5}>
              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
                <Button size="lg" className="bg-foreground text-background hover:bg-foreground/90 text-lg px-8 shadow-elegant">
                  Get Provider Demo <ArrowRight className="ml-2" size={20} />
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="border-foreground text-foreground hover:bg-foreground hover:text-background text-lg px-8"
                >
                  Calculate Your ROI
                </Button>
              </div>
            </AnimatedText>

            {/* Key Metrics Bar */}
            <AnimatedText delay={0.6}>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
                {keyMetrics.map((metric, index) => (
                  <div key={index} className="text-center">
                    <div className="text-2xl md:text-3xl font-bold text-dental-blue">{metric.label}</div>
                    <div className="text-sm text-muted-foreground">{metric.sublabel}</div>
                  </div>
                ))}
              </div>
            </AnimatedText>
          </div>
        </div>
      </section>

      {/* Intelligence Revolution Section */}
      <ParallaxSection className="py-24 bg-secondary" offset={30}>
        <div className="container mx-auto px-6">
          <AnimatedText className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              One Brand. One Portal. One Intelligence. One System.
            </h2>
          </AnimatedText>

          <div className="grid lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {intelligenceFeatures.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <AnimatedText key={index} delay={index * 0.1}>
                  <Card className="group hover:shadow-elegant transition-smooth hover:-translate-y-1 h-full">
                    <CardHeader>
                      <div className="w-16 h-16 rounded-2xl bg-dental-blue/10 flex items-center justify-center group-hover:bg-dental-blue/20 transition-smooth mb-4">
                        <Icon size={32} className="text-dental-blue" />
                      </div>
                      <CardTitle className="text-xl font-bold">{feature.title}</CardTitle>
                      <p className="text-muted-foreground font-medium">{feature.subtitle}</p>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <div className="space-y-3">
                        {feature.benefits.map((benefit, idx) => (
                          <div key={idx} className="flex items-start gap-3">
                            <CheckCircle size={16} className="text-dental-blue flex-shrink-0 mt-1" />
                            <span className="text-sm leading-relaxed">{benefit}</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </AnimatedText>
              );
            })}
          </div>

          <AnimatedText delay={0.4} className="text-center mt-12">
            <Button variant="outline" className="border-dental-blue text-dental-blue hover:bg-dental-blue hover:text-background">
              Explore PATH & SCOPE Technology <ArrowRight className="ml-2" size={16} />
            </Button>
          </AnimatedText>
        </div>
      </ParallaxSection>

      {/* Your Practice, Amplified */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-6">
          <AnimatedText className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Three Pillars of Practice Intelligence
            </h2>
          </AnimatedText>

          <div className="grid lg:grid-cols-3 gap-8 max-w-7xl mx-auto mb-16">
            {practicePillars.map((pillar, index) => {
              const Icon = pillar.icon;
              return (
                <AnimatedText key={index} delay={index * 0.1}>
                  <Card className="group hover:shadow-elegant transition-smooth hover:-translate-y-1 h-full">
                    <CardHeader>
                      <div className="w-16 h-16 rounded-2xl bg-dental-peach/10 flex items-center justify-center group-hover:bg-dental-peach/20 transition-smooth mb-4">
                        <Icon size={32} className="text-dental-peach" />
                      </div>
                      <CardTitle className="text-xl font-bold">{pillar.title}</CardTitle>
                      <p className="text-muted-foreground font-medium">{pillar.subtitle}</p>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <div className="space-y-2">
                        {pillar.features.map((feature, idx) => (
                          <div key={idx} className="text-sm leading-relaxed">
                            {feature}
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </AnimatedText>
              );
            })}
          </div>

          {/* Performance Metrics */}
          <AnimatedText delay={0.4} className="text-center">
            <Card className="max-w-4xl mx-auto shadow-elegant">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold mb-6">Performance Metrics</h3>
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-dental-blue">87%</div>
                    <div className="text-muted-foreground">Patient Confidence Improvement</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-dental-green">23%</div>
                    <div className="text-muted-foreground">Average Practice Revenue Increase</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-dental-peach">4.5 hrs</div>
                    <div className="text-muted-foreground">Saved Per Day on Workflows</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </AnimatedText>
        </div>
      </section>

      {/* Seamless Integration & Workflow */}
      <ParallaxSection className="py-24 bg-secondary" offset={-20}>
        <div className="container mx-auto px-6">
          <AnimatedText className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              From Consultation to Payment in Minutes
            </h2>
          </AnimatedText>

          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <AnimatedText>
                <Card className="p-8 bg-red-50 border-red-200">
                  <h3 className="text-xl font-bold text-red-700 mb-4">Traditional Financing Flow</h3>
                  <div className="space-y-3 text-red-600">
                    <div>Multiple days for approvals →</div>
                    <div>Patient uncertainty →</div>
                    <div>Administrative burden →</div>
                    <div>Delayed revenue →</div>
                    <div>Lost opportunities</div>
                  </div>
                </Card>
              </AnimatedText>

              <AnimatedText delay={0.2}>
                <Card className="p-8 bg-green-50 border-green-200">
                  <h3 className="text-xl font-bold text-green-700 mb-4">DentiPay Intelligence Flow</h3>
                  <div className="space-y-3 text-green-600">
                    <div>Instant decisions during consultation →</div>
                    <div>Clear options →</div>
                    <div>Immediate patient confidence →</div>
                    <div>Higher conversions →</div>
                    <div>Predictable income</div>
                  </div>
                </Card>
              </AnimatedText>
            </div>

            <AnimatedText delay={0.4} className="text-center mt-12">
              <Card className="max-w-4xl mx-auto p-8 bg-dental-blue/5 border-dental-blue/20">
                <h3 className="text-xl font-bold text-dental-blue mb-4">Echo AI Enhancement</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Our proprietary voice-enabled AI enhances treatment plans and streamlines efficiency, 
                  allowing you to focus on what matters most: patient care.
                </p>
              </Card>
            </AnimatedText>
          </div>
        </div>
      </ParallaxSection>

      {/* Real Results from Real Practices */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-6">
          <AnimatedText className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Join 1,200+ DentiPay-enabled providers
            </h2>
          </AnimatedText>

          <div className="grid lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <AnimatedText key={index} delay={index * 0.1}>
                <Card className="group hover:shadow-elegant transition-smooth hover:-translate-y-1 h-full">
                  <CardContent className="p-8">
                    <div className="mb-6">
                      <blockquote className="text-lg italic mb-4 leading-relaxed">
                        "{testimonial.quote}"
                      </blockquote>
                      <div className="font-semibold">{testimonial.name}</div>
                      <div className="text-muted-foreground text-sm">{testimonial.title}</div>
                    </div>
                    <div className="space-y-2">
                      {testimonial.metrics.map((metric, idx) => (
                        <div key={idx} className="flex items-center gap-2">
                          <CheckCircle size={16} className="text-dental-blue" />
                          <span className="text-sm font-medium text-dental-blue">{metric}</span>
                        </div>
                      ))}
                      <div className="flex items-center gap-2 mt-3">
                        <Star size={16} className="text-dental-peach fill-dental-peach" />
                        <span className="text-sm text-muted-foreground">DentiPay Verified ✓</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </AnimatedText>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive ROI Calculator */}
      <ParallaxSection className="py-24 bg-secondary" offset={30}>
        <div className="container mx-auto px-6">
          <AnimatedText className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Calculate Your ROI Potential
            </h2>
          </AnimatedText>

          <AnimatedText delay={0.2}>
            <Card className="max-w-4xl mx-auto shadow-elegant">
              <CardHeader className="text-center">
                <CardTitle className="flex items-center justify-center gap-3">
                  <Calculator className="text-dental-blue" size={24} />
                  Interactive ROI Calculator
                </CardTitle>
              </CardHeader>
              <CardContent className="p-8">
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h4 className="font-semibold mb-4">Practice Information</h4>
                    <div className="space-y-4 text-sm text-muted-foreground">
                      <div>• Practice type selector (General, Specialty, Multi-location)</div>
                      <div>• Current patient volume input</div>
                      <div>• Average treatment value input</div>
                      <div>• Current acceptance rate input</div>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-4">Projected Outcomes</h4>
                    <div className="space-y-4 text-sm text-muted-foreground">
                      <div>• Revenue increase projection</div>
                      <div>• Time savings calculation</div>
                      <div>• Efficiency improvement metrics</div>
                      <div>• Patient satisfaction enhancement</div>
                    </div>
                  </div>
                </div>
                <div className="text-center mt-8">
                  <Button className="bg-dental-blue text-background hover:bg-dental-blue/90">
                    Launch Calculator <Calculator className="ml-2" size={16} />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </AnimatedText>
        </div>
      </ParallaxSection>

      {/* Technology Trust & Security */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center max-w-6xl mx-auto">
            <AnimatedText>
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Built for Healthcare, Secured for Trust
              </h2>
              <div className="space-y-4">
                {securityFeatures.map((feature, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <Lock size={20} className="text-dental-blue flex-shrink-0" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </AnimatedText>

            <AnimatedText delay={0.3} from="right">
              <Card className="shadow-elegant">
                <CardContent className="p-8">
                  <div className="text-center mb-6">
                    <Shield size={48} className="text-dental-blue mx-auto mb-4" />
                    <h3 className="text-xl font-bold">Security Certifications</h3>
                  </div>
                  <div className="space-y-3 text-center">
                    <div className="p-3 bg-secondary rounded-lg font-medium">Bank-Level Encryption</div>
                    <div className="p-3 bg-secondary rounded-lg font-medium">HIPAA Compliant</div>
                    <div className="p-3 bg-secondary rounded-lg font-medium">SOC 2 Type II</div>
                    <div className="p-3 bg-secondary rounded-lg font-medium">99.9% Uptime SLA</div>
                  </div>
                </CardContent>
              </Card>
            </AnimatedText>
          </div>
        </div>
      </section>

      {/* Provider Resources */}
      <ParallaxSection className="py-24 bg-secondary" offset={-20}>
        <div className="container mx-auto px-6">
          <AnimatedText className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Everything You Need to Succeed
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              No setup fees • No monthly fees • No per-transaction charges • Transparent, straightforward pricing
            </p>
          </AnimatedText>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {resources.map((resource, index) => {
              const Icon = resource.icon;
              return (
                <AnimatedText key={index} delay={index * 0.1}>
                  <Card className="group hover:shadow-elegant transition-smooth hover:-translate-y-1 h-full text-center">
                    <CardContent className="p-6">
                      <div className="w-16 h-16 rounded-2xl bg-dental-peach/10 flex items-center justify-center group-hover:bg-dental-peach/20 transition-smooth mx-auto mb-4">
                        <Icon size={32} className="text-dental-peach" />
                      </div>
                      <h3 className="font-bold mb-2">{resource.title}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {resource.description}
                      </p>
                    </CardContent>
                  </Card>
                </AnimatedText>
              );
            })}
          </div>
        </div>
      </ParallaxSection>

      {/* Final CTA Section */}
      <section className="py-24 bg-primary text-primary-foreground">
        <div className="container mx-auto px-6 text-center">
          <AnimatedText>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              See DentiPay Intelligence in Your Practice
            </h2>
            <p className="text-xl mb-8 opacity-90 max-w-3xl mx-auto">
              Get a customized demo with your practice data. Schedule within 24 hours.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <Button
                size="lg"
                className="bg-background text-primary hover:bg-background/90 text-lg px-8 shadow-elegant"
              >
                Schedule Your Demo <ArrowRight className="ml-2" size={20} />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-background text-background hover:bg-background hover:text-primary text-lg px-8"
              >
                Start Free Trial
              </Button>
              <Button
                size="lg"
                variant="ghost"
                className="text-background hover:bg-background/10 text-lg px-8"
              >
                Download Success Playbook <Download className="ml-2" size={20} />
              </Button>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto opacity-90">
              <div className="text-center">
                <Award size={24} className="mx-auto mb-2" />
                <div className="text-sm">Industry Recognized</div>
              </div>
              <div className="text-center">
                <Users size={24} className="mx-auto mb-2" />
                <div className="text-sm">1,200+ Providers</div>
              </div>
              <div className="text-center">
                <Star size={24} className="mx-auto mb-2" />
                <div className="text-sm">4.9/5 Provider Rating</div>
              </div>
              <div className="text-center">
                <CheckCircle size={24} className="mx-auto mb-2" />
                <div className="text-sm">Certified Professionals</div>
              </div>
            </div>
          </AnimatedText>
        </div>
      </section>
    </div>
  );
};

export default Providers;