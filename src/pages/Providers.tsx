import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { AnimatedText, SplitText } from '@/components/ui/animated-text';
import { ParallaxSection } from '@/components/ui/parallax-section';
import { VideoSection } from '@/components/ui/video-section';
import { 
  Brain, 
  Users, 
  TrendingUp, 
  Shield, 
  Clock, 
  Zap, 
  Target, 
  CheckCircle, 
  ArrowRight,
  Star,
  BarChart3,
  MessageSquare,
  Calendar,
  CreditCard,
  Download,
  Play
} from 'lucide-react';

const Providers = () => {
  const metrics = [
    { value: "94%", label: "Approval Accuracy", icon: Target },
    { value: "40%", label: "Higher Acceptance", icon: TrendingUp },
    { value: "<30s", label: "Decision Speed", icon: Clock },
    { value: "1,200+", label: "Active Providers", icon: Users }
  ];

  const painPoints = [
    "Less than 50% of Americans can afford a $1,000 dental emergency",
    "Traditional financing takes weeks vs same-day dental needs",
    "Standard lenders achieve 30-45% lower approval rates",
    "Generic financing doesn't understand dental procedures or patient psychology"
  ];

  const intelligenceFeatures = [
    {
      title: "PATH Patient Portal",
      description: "2-minute applications with real-time pre-approvals and 94% success rates",
      features: [
        "Patient journey prediction",
        "Financial capacity analysis", 
        "Optimal timing recommendations",
        "Behavioral financing optimization"
      ],
      icon: Users
    },
    {
      title: "SCOPE Intelligence Engine", 
      description: "Clinical decision support with predictive modeling and revenue optimization",
      features: [
        "Real-time practice analytics",
        "Treatment acceptance predictions", 
        "Revenue optimization tools",
        "Precognitive patient insights"
      ],
      icon: Brain
    },
    {
      title: "Echo AI Enhancement",
      description: "Voice-enabled interaction processing 50+ data points for optimal outcomes",
      features: [
        "Natural language processing",
        "Multi-modal data integration",
        "Predictive conversation flows",
        "Instant decision support"
      ],
      icon: MessageSquare
    }
  ];

  const practicePillars = [
    {
      title: "Patient Pipeline Intelligence",
      description: "Transform leads into loyal patients with predictive insights",
      features: [
        "Pre-qualified patient matching",
        "Approval probability scoring", 
        "Optimal scheduling recommendations",
        "Treatment readiness indicators"
      ],
      icon: Users,
      metric: "87% confidence improvement"
    },
    {
      title: "Practice Analytics Dashboard",
      description: "Real-time visibility into your practice performance and opportunities",
      features: [
        "Live revenue tracking",
        "Acceptance rate monitoring",
        "Conversion funnel analysis", 
        "Predictive revenue modeling"
      ],
      icon: BarChart3,
      metric: "23% revenue increase"
    },
    {
      title: "Patient Communications",
      description: "Automated engagement that builds trust and drives action",
      features: [
        "Pre-approval notifications",
        "Treatment plan explanations",
        "Satisfaction tracking",
        "Retention campaigns"
      ],
      icon: MessageSquare,
      metric: "4.5 hours saved daily"
    }
  ];

  const testimonials = [
    {
      name: "Dr. Sarah Johnson",
      title: "Cosmetic & General Dentistry",
      quote: "DentiPay's intelligence system transformed our practice. We see 45% higher case acceptance and 92% patient satisfaction.",
      results: "45% case acceptance increase",
      avatar: "/public/lovable-uploads/174d7e2f-f31a-4e96-b02e-b5ae61fff9a9.png"
    },
    {
      name: "Dr. Michael Chen",
      title: "Periodontics Specialist", 
      quote: "The predictive analytics help us present treatments at exactly the right moment. Patient retention increased 25%.",
      results: "25% retention increase",
      avatar: "/public/lovable-uploads/174d7e2f-f31a-4e96-b02e-b5ae61fff9a9.png"
    },
    {
      name: "Bright Smile Dental Group",
      title: "Multi-Location Practice",
      quote: "SCOPE intelligence across all locations gives us unprecedented insights. 28% higher case values practice-wide.",
      results: "28% case value increase", 
      avatar: "/public/lovable-uploads/174d7e2f-f31a-4e96-b02e-b5ae61fff9a9.png"
    }
  ];

  const workflowComparison = {
    traditional: [
      "Patient inquiry",
      "Manual credit application", 
      "Wait 24-72 hours",
      "Uncertain approval",
      "Complex paperwork",
      "Patient anxiety",
      "Delayed treatment",
      "Lost revenue"
    ],
    dentipay: [
      "Patient inquiry",
      "2-minute PATH application",
      "Instant SCOPE analysis", 
      "94% pre-approval rate",
      "Clear options presented",
      "Patient confidence",
      "Same-day treatment",
      "Predictable revenue"
    ]
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <ParallaxSection className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <VideoSection
          placeholder={true}
          className="absolute inset-0 w-full h-full opacity-20"
        />
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <SplitText 
              text="Intelligence That Amplifies Your Practice"
              className="text-5xl md:text-7xl font-bold text-foreground mb-6"
              wordDelay={0.1}
            />
            
            <AnimatedText delay={0.3} className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-4xl mx-auto">
              Transform patient acceptance rates with AI-powered financing that understands dental care. 
              Where traditional financing fails, DentiPay's SCOPE & PATH intelligence delivers.
            </AnimatedText>

            <motion.div 
              className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
            >
              <Button size="lg" className="text-lg px-8 py-6">
                <Calendar className="mr-2 h-5 w-5" />
                Get Provider Demo
              </Button>
              <Button variant="outline" size="lg" className="text-lg px-8 py-6">
                <BarChart3 className="mr-2 h-5 w-5" />
                Calculate Your ROI
              </Button>
            </motion.div>

            {/* Trust Metrics */}
            <motion.div 
              className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.6 }}
            >
              {metrics.map((metric, index) => (
                <Card key={index} className="bg-card/80 backdrop-blur-sm border-border/50">
                  <CardContent className="p-4 text-center">
                    <metric.icon className="h-8 w-8 mx-auto mb-2 text-primary" />
                    <div className="text-2xl font-bold text-foreground">{metric.value}</div>
                    <div className="text-sm text-muted-foreground">{metric.label}</div>
                  </CardContent>
                </Card>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </ParallaxSection>

      {/* Problem Statement */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedText className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Traditional Financing Wasn't Built for Dental Care
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              The stark reality facing dental practices today demands a financing solution that understands both clinical needs and patient psychology.
            </p>
          </AnimatedText>

          <div className="grid md:grid-cols-2 gap-8 items-center">
            <AnimatedText from="left">
              <div className="space-y-6">
                {painPoints.map((point, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-destructive mt-3 flex-shrink-0" />
                    <p className="text-lg text-muted-foreground">{point}</p>
                  </div>
                ))}
              </div>
            </AnimatedText>

            <AnimatedText from="right" delay={0.2}>
              <Card className="bg-card border-border">
                <CardHeader>
                  <CardTitle className="text-2xl text-foreground">The Financial Care Gap</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Traditional Approval Rate</span>
                    <Badge variant="destructive">~55%</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Decision Timeline</span>
                    <Badge variant="destructive">24-72 hours</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Clinical Understanding</span>
                    <Badge variant="destructive">Generic</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Patient Experience</span>
                    <Badge variant="destructive">Frustrating</Badge>
                  </div>
                </CardContent>
              </Card>
            </AnimatedText>
          </div>
        </div>
      </section>

      {/* DentiPay Intelligence Solution */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedText className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              One Brand. One Portal. One Intelligence. One System.
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              The DentiPay Trinity: Brand leverage, patient portal, and intelligence engine working in perfect harmony.
            </p>
          </AnimatedText>

          <div className="grid lg:grid-cols-3 gap-8">
            {intelligenceFeatures.map((feature, index) => (
              <AnimatedText key={index} delay={index * 0.1}>
                <Card className="h-full bg-card border-border hover:border-primary/50 transition-colors duration-300">
                  <CardHeader>
                    <feature.icon className="h-12 w-12 text-primary mb-4" />
                    <CardTitle className="text-2xl text-foreground">{feature.title}</CardTitle>
                    <CardDescription className="text-muted-foreground">
                      {feature.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {feature.features.map((item, idx) => (
                        <li key={idx} className="flex items-center gap-2 text-muted-foreground">
                          <CheckCircle className="h-4 w-4 text-primary flex-shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </AnimatedText>
            ))}
          </div>
        </div>
      </section>

      {/* Three Pillars */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedText className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Three Pillars of Practice Intelligence
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Comprehensive intelligence that transforms every aspect of your patient financing workflow.
            </p>
          </AnimatedText>

          <div className="grid lg:grid-cols-3 gap-8">
            {practicePillars.map((pillar, index) => (
              <AnimatedText key={index} delay={index * 0.1}>
                <Card className="h-full bg-card border-border">
                  <CardHeader>
                    <pillar.icon className="h-12 w-12 text-primary mb-4" />
                    <CardTitle className="text-2xl text-foreground">{pillar.title}</CardTitle>
                    <CardDescription className="text-muted-foreground">
                      {pillar.description}
                    </CardDescription>
                    <Badge variant="secondary" className="w-fit">
                      {pillar.metric}
                    </Badge>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {pillar.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-muted-foreground">
                          <ArrowRight className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </AnimatedText>
            ))}
          </div>
        </div>
      </section>

      {/* Workflow Transformation */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedText className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Workflow Transformation
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              See the dramatic difference between traditional financing friction and DentiPay intelligence.
            </p>
          </AnimatedText>

          <div className="grid md:grid-cols-2 gap-12">
            {/* Traditional Flow */}
            <AnimatedText from="left">
              <Card className="bg-destructive/5 border-destructive/20">
                <CardHeader>
                  <CardTitle className="text-2xl text-foreground flex items-center gap-2">
                    <Clock className="h-6 w-6 text-destructive" />
                    Traditional Flow
                  </CardTitle>
                  <CardDescription>
                    Multiple days → uncertainty → admin burden → delayed revenue → lost opportunities
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {workflowComparison.traditional.map((step, index) => (
                      <div key={index} className="flex items-center gap-3 p-3 rounded-lg bg-destructive/10">
                        <div className="w-8 h-8 rounded-full bg-destructive/20 flex items-center justify-center text-sm font-medium">
                          {index + 1}
                        </div>
                        <span className="text-muted-foreground">{step}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </AnimatedText>

            {/* DentiPay Flow */}
            <AnimatedText from="right" delay={0.2}>
              <Card className="bg-primary/5 border-primary/20">
                <CardHeader>
                  <CardTitle className="text-2xl text-foreground flex items-center gap-2">
                    <Zap className="h-6 w-6 text-primary" />
                    DentiPay Flow
                  </CardTitle>
                  <CardDescription>
                    Instant decisions → clear options → immediate confidence → higher conversions → predictable income
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {workflowComparison.dentipay.map((step, index) => (
                      <div key={index} className="flex items-center gap-3 p-3 rounded-lg bg-primary/10">
                        <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-sm font-medium">
                          {index + 1}
                        </div>
                        <span className="text-muted-foreground">{step}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </AnimatedText>
          </div>

          <AnimatedText delay={0.4} className="text-center mt-12">
            <Card className="max-w-4xl mx-auto bg-card border-border">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold text-foreground mb-6">Performance Impact</h3>
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-primary">87%</div>
                    <div className="text-muted-foreground">Patient Confidence Improvement</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-primary">23%</div>
                    <div className="text-muted-foreground">Revenue Increase</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-primary">4.5hrs</div>
                    <div className="text-muted-foreground">Daily Time Savings</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </AnimatedText>
        </div>
      </section>

      {/* Social Proof & Testimonials */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedText className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Join 1,200+ DentiPay-Enabled Providers
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Real results from dental professionals who've transformed their practices with intelligence.
            </p>
          </AnimatedText>

          <div className="grid lg:grid-cols-3 gap-8 mb-16">
            {testimonials.map((testimonial, index) => (
              <AnimatedText key={index} delay={index * 0.1}>
                <Card className="h-full bg-card border-border">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-1 mb-4">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                      ))}
                    </div>
                    <blockquote className="text-muted-foreground mb-4">
                      "{testimonial.quote}"
                    </blockquote>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                        <Users className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <div className="font-semibold text-foreground">{testimonial.name}</div>
                        <div className="text-sm text-muted-foreground">{testimonial.title}</div>
                      </div>
                    </div>
                    <Badge variant="secondary" className="mt-3">
                      {testimonial.results}
                    </Badge>
                  </CardContent>
                </Card>
              </AnimatedText>
            ))}
          </div>

          <AnimatedText delay={0.3}>
            <Card className="max-w-4xl mx-auto bg-card border-border">
              <CardContent className="p-8 text-center">
                <h3 className="text-2xl font-bold text-foreground mb-6">Aggregate Network Results</h3>
                <div className="grid md:grid-cols-4 gap-6">
                  <div>
                    <div className="text-3xl font-bold text-primary">95%</div>
                    <div className="text-muted-foreground">Approval Rate</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-primary">300%</div>
                    <div className="text-muted-foreground">Revenue Increase</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-primary">10,000+</div>
                    <div className="text-muted-foreground">Happy Practices</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-primary">4.9/5</div>
                    <div className="text-muted-foreground">Provider Rating</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </AnimatedText>
        </div>
      </section>

      {/* Technology Trust */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedText className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Built for Healthcare, Secured for Trust
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Enterprise-grade security with healthcare-specific compliance and seamless integration capabilities.
            </p>
          </AnimatedText>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: Shield, title: "Bank-Level Security", desc: "256-bit encryption, SOC 2 Type II certified" },
              { icon: CheckCircle, title: "HIPAA Compliant", desc: "Full healthcare data protection compliance" },
              { icon: Zap, title: "99.9% Uptime", desc: "Reliable service with redundant infrastructure" },
              { icon: CreditCard, title: "Seamless Integration", desc: "API connections with 50+ practice systems" }
            ].map((item, index) => (
              <AnimatedText key={index} delay={index * 0.1}>
                <Card className="text-center h-full bg-card border-border">
                  <CardContent className="p-6">
                    <item.icon className="h-12 w-12 mx-auto text-primary mb-4" />
                    <h3 className="text-lg font-semibold text-foreground mb-2">{item.title}</h3>
                    <p className="text-muted-foreground text-sm">{item.desc}</p>
                  </CardContent>
                </Card>
              </AnimatedText>
            ))}
          </div>
        </div>
      </section>

      {/* Provider Success Resources */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <AnimatedText from="left">
              <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
                No-Cost Success Partnership
              </h2>
              <p className="text-xl text-muted-foreground mb-8">
                Everything you need to maximize your practice potential with zero upfront investment.
              </p>
              
              <div className="space-y-4 mb-8">
                {[
                  "No setup fees, monthly fees, or per-transaction charges",
                  "Comprehensive Provider Success Playbook",
                  "24/7 dedicated support and training", 
                  "Marketing materials and patient education resources",
                  "Custom integration and workflow optimization"
                ].map((benefit, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />
                    <span className="text-muted-foreground">{benefit}</span>
                  </div>
                ))}
              </div>

              <Button size="lg" className="text-lg px-8 py-6">
                <Download className="mr-2 h-5 w-5" />
                Download Success Playbook
              </Button>
            </AnimatedText>

            <AnimatedText from="right" delay={0.2}>
              <Card className="bg-card border-border">
                <CardHeader>
                  <CardTitle className="text-2xl text-foreground">Get Started Today</CardTitle>
                  <CardDescription>
                    Three simple ways to begin your DentiPay journey
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                      <span className="font-bold text-primary">1</span>
                    </div>
                    <div>
                      <div className="font-semibold text-foreground">Schedule Demo</div>
                      <div className="text-sm text-muted-foreground">See DentiPay with your practice data</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                      <span className="font-bold text-primary">2</span>
                    </div>
                    <div>
                      <div className="font-semibold text-foreground">Free Trial</div>
                      <div className="text-sm text-muted-foreground">30-day risk-free implementation</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                      <span className="font-bold text-primary">3</span>
                    </div>
                    <div>
                      <div className="font-semibold text-foreground">Success Support</div>
                      <div className="text-sm text-muted-foreground">Dedicated team ensures your success</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </AnimatedText>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <AnimatedText>
            <h2 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
              See DentiPay Intelligence in Your Practice
            </h2>
            <p className="text-xl text-muted-foreground mb-12 max-w-3xl mx-auto">
              Get a customized demo with your practice data, scheduled within 24 hours. 
              Join the intelligence revolution transforming dental care.
            </p>
          </AnimatedText>

          <motion.div 
            className="flex flex-col sm:flex-row gap-6 justify-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <Button size="lg" className="text-lg px-8 py-6">
              <Play className="mr-2 h-5 w-5" />
              Schedule Your Demo
            </Button>
            <Button variant="outline" size="lg" className="text-lg px-8 py-6">
              <Zap className="mr-2 h-5 w-5" />
              Start Free Trial
            </Button>
            <Button variant="secondary" size="lg" className="text-lg px-8 py-6">
              <Download className="mr-2 h-5 w-5" />
              Download Playbook
            </Button>
          </motion.div>

          <AnimatedText delay={0.5}>
            <div className="flex flex-wrap justify-center gap-8 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-primary" />
                Industry Recognition
              </div>
              <div className="flex items-center gap-2">
                <Star className="h-4 w-4 text-primary" />
                4.9/5 Provider Rating
              </div>
              <div className="flex items-center gap-2">
                <Shield className="h-4 w-4 text-primary" />
                Certified Professionals
              </div>
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-primary" />
                1,200+ Active Providers
              </div>
            </div>
          </AnimatedText>
        </div>
      </section>
    </div>
  );
};

export default Providers;