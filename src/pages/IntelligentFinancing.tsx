import { motion } from 'framer-motion';
import { Brain, Zap, Target, TrendingUp, Shield, Users, ArrowRight, CheckCircle, Lock, Monitor, BarChart3, Database } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ParallaxSection } from '@/components/ui/parallax-section';
import { AnimatedText, SplitText } from '@/components/ui/animated-text';
import { VideoSection } from '@/components/ui/video-section';

const IntelligentFinancing = () => {
  const pathFeatures = [
    {
      title: 'Predictive Analytics',
      description: 'Advanced algorithms analyze patient data to predict approval likelihood before application submission',
      detail: 'Machine learning models processing 30+ data points per decision'
    },
    {
      title: 'Frictionless Intake System',
      description: '2-minute application that removes awkward financial conversations',
      detail: 'Empowers patients to say "yes" to treatment'
    },
    {
      title: 'Smart, Instant Decisions',
      description: 'Real-time pre-approvals with clear terms',
      detail: 'Average 3.2 seconds processing time'
    },
    {
      title: 'Behavioral Intelligence',
      description: 'Patient behavior analysis to customize financing options for maximum acceptance',
      detail: '94% auto-approval rate vs. 45% industry average'
    }
  ];

  const scopeFeatures = [
    {
      title: 'Clinical Triage Layer',
      description: 'AI-powered case support analyzes clinical inputs in real time',
      detail: 'Optimizes treatment paths and provides specialist-level guidance'
    },
    {
      title: 'Financial Engine Layer',
      description: 'Turns "Can\'t Pay" into "Can Start Today"',
      detail: 'Dynamic pricing and payment plan generation based on patient financial profiles'
    },
    {
      title: 'Treatment Planning Intelligence',
      description: 'Integration with practice management systems to optimize treatment recommendations',
      detail: 'Treatment success probability scoring'
    },
    {
      title: 'Provider Intelligence Interface',
      description: 'Practice-specific insights to maximize revenue and improve patient satisfaction',
      detail: 'Performance metrics, patient outcome predictions, revenue optimization'
    }
  ];

  return (
    <div className="pt-24">
      {/* Hero Section */}
      <section className="py-24 bg-gradient-intelligence text-intelligence-foreground">
        <div className="container mx-auto px-6">
          <div className="max-w-5xl mx-auto text-center">
            <AnimatedText>
              <h1 className="text-hero-mobile md:text-hero font-bold mb-6 text-black">
                The Intelligence Behind DentiPay
              </h1>
            </AnimatedText>
            
            <AnimatedText delay={0.2}>
              <h2 className="text-2xl md:text-3xl mb-4 opacity-90 text-black">
                PATH & SCOPE - Revolutionary AI that Transforms Dental Financing
              </h2>
            </AnimatedText>
            
            <AnimatedText delay={0.3}>
              <p className="text-xl md:text-2xl mb-8 opacity-90 leading-relaxed max-w-3xl mx-auto text-black">
                Our revolutionary AI platform doesn't just process payments — 
                it predicts outcomes, optimizes decisions, and transforms 
                how dental practices approach patient financing.
              </p>
            </AnimatedText>

            <AnimatedText delay={0.4}>
              <div className="mb-8">
                <VideoSection 
                  title="AI-Powered Behavioural Financing - Intelligence that Drives Approvals"
                  videoUrl="https://youtu.be/mNTFwDsYP1s?feature=shared"
                  placeholder={false}
                  aspectRatio="video"
                  accent="blue"
                  className="max-w-4xl mx-auto"
                />
              </div>
            </AnimatedText>

            <AnimatedText delay={0.5}>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  size="lg"
                  className="bg-white text-intelligence hover:bg-white/90 text-lg px-8"
                >
                  See Intelligence in Action <ArrowRight className="ml-2" size={20} />
                </Button>
                
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white text-white hover:bg-white hover:text-intelligence text-lg px-8"
                >
                  Request Demo
                </Button>
              </div>
            </AnimatedText>
          </div>
        </div>
      </section>

      {/* The Intelligence Revolution */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-6">
          <AnimatedText className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-black">
              One Brand. One Portal. One Intelligence. One System.
            </h2>
          </AnimatedText>

          <div className="max-w-4xl mx-auto">
            <AnimatedText delay={0.2}>
              <Card className="shadow-elegant mb-12">
                <CardHeader>
                  <CardTitle className="text-2xl font-bold text-center">DentiPay (The Brand Layer)</CardTitle>
                  <p className="text-center text-muted-foreground text-lg">The trusted face for dentistry finance</p>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-start gap-4">
                      <TrendingUp size={20} className="text-dental-blue mt-1 flex-shrink-0" />
                      <div>
                        <h4 className="font-semibold mb-1">Market Leverage</h4>
                        <p className="text-muted-foreground">A recognizable, unified financial brand increases patient trust and accelerates treatment acceptance</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <Users size={20} className="text-dental-blue mt-1 flex-shrink-0" />
                      <div>
                        <h4 className="font-semibold mb-1">Network Effect</h4>
                        <p className="text-muted-foreground">Every provider on DentiPay strengthens brand equity, creating shared patient familiarity across practices</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <Zap size={20} className="text-dental-blue mt-1 flex-shrink-0" />
                      <div>
                        <h4 className="font-semibold mb-1">Speed to Adoption</h4>
                        <p className="text-muted-foreground">Brand credibility reduces patient hesitation and shortens decision cycles, converting more cases faster</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </AnimatedText>
          </div>
        </div>
      </section>

      {/* PATH System */}
      <ParallaxSection className="py-24 bg-background" offset={50}>
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-16 items-center mb-24">
              <div>
                <AnimatedText>
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-16 h-16 rounded-2xl bg-intelligence/10 flex items-center justify-center">
                      <Brain size={32} className="text-intelligence" />
                    </div>
                     <div>
                       <h2 className="text-5xl font-bold text-black">PATH</h2>
                       <p className="text-black">Predictive Approval Technology Hub</p>
                     </div>
                  </div>
                </AnimatedText>

                <AnimatedText delay={0.2}>
                  <p className="text-xl leading-relaxed mb-8 text-black">
                    PATH revolutionizes patient financing with <strong>precognitive intelligence</strong> — 
                    our system doesn't just respond to applications, it anticipates outcomes 
                    and optimizes every interaction for maximum success.
                  </p>
                </AnimatedText>

                <AnimatedText delay={0.4}>
                  <div className="space-y-4">
                    {pathFeatures.map((feature, index) => (
                      <div key={index} className="flex items-start gap-4">
                        <CheckCircle size={20} className="text-intelligence mt-1 flex-shrink-0" />
                        <div>
                          <h4 className="font-semibold mb-1">{feature.title}</h4>
                          <p className="text-muted-foreground mb-1">{feature.description}</p>
                          <p className="text-sm text-intelligence font-medium">{feature.detail}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </AnimatedText>
              </div>

              <AnimatedText delay={0.3} from="right">
                <Card className="shadow-elegant">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3">
                      <Zap className="text-dental-blue" size={24} />
                      PATH Intelligence Dashboard
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div className="bg-gradient-subtle p-4 rounded-lg">
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-sm text-muted-foreground">Predictive Accuracy</span>
                          <span className="text-2xl font-bold text-intelligence">97.3%</span>
                        </div>
                        <div className="w-full bg-background rounded-full h-2">
                          <div className="bg-intelligence h-2 rounded-full w-[97.3%]"></div>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="text-center p-4 bg-dental-blue/10 rounded-lg">
                          <div className="text-2xl font-bold text-dental-blue">3.2s</div>
                          <div className="text-sm text-muted-foreground">Avg Processing</div>
                        </div>
                        <div className="text-center p-4 bg-dental-green/10 rounded-lg">
                          <div className="text-2xl font-bold text-dental-green">94%</div>
                          <div className="text-sm text-muted-foreground">Auto-Approval</div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </AnimatedText>
            </div>
          </div>
        </div>
      </ParallaxSection>

      {/* SCOPE System */}
      <section className="py-24 bg-gradient-subtle">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <AnimatedText from="left">
                <Card className="shadow-elegant">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3">
                      <Target className="text-dental-peach" size={24} />
                      SCOPE Analytics Engine
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center p-3 bg-background rounded-lg">
                        <span className="font-medium">Revenue Optimization</span>
                        <span className="text-dental-peach font-bold">+47%</span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-background rounded-lg">
                        <span className="font-medium">Patient Satisfaction</span>
                        <span className="text-dental-green font-bold">98.7%</span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-background rounded-lg">
                        <span className="font-medium">Treatment Acceptance</span>
                        <span className="text-intelligence font-bold">+85%</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </AnimatedText>

              <div>
                <AnimatedText>
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-16 h-16 rounded-2xl bg-dental-peach/10 flex items-center justify-center">
                      <Target size={32} className="text-dental-peach" />
                    </div>
                  <div>
                    <h2 className="text-5xl font-bold text-black">SCOPE</h2>
                    <p className="text-black">Strategic Care Optimization Platform Engine</p>
                    <p className="text-sm text-dental-peach font-medium mt-1">The Sentient Capable Outcome Predictive Engine</p>
                  </div>
                  </div>
                </AnimatedText>

                <AnimatedText delay={0.2}>
                  <p className="text-xl leading-relaxed mb-8 text-black">
                    SCOPE transforms practice intelligence into <strong>strategic advantage</strong> — 
                    analyzing treatment patterns, patient behaviors, and market dynamics 
                    to optimize every aspect of your dental practice.
                  </p>
                </AnimatedText>

                <AnimatedText delay={0.4}>
                  <div className="space-y-4">
                    {scopeFeatures.map((feature, index) => (
                      <div key={index} className="flex items-start gap-4">
                        <CheckCircle size={20} className="text-dental-peach mt-1 flex-shrink-0" />
                        <div>
                          <h4 className="font-semibold mb-1">{feature.title}</h4>
                          <p className="text-muted-foreground mb-1">{feature.description}</p>
                          <p className="text-sm text-dental-peach font-medium">{feature.detail}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </AnimatedText>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SCOPE's Financial Engine - 30 Data Points */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-6">
          <AnimatedText className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-black">
              SCOPE's Financial Engine: The 30-Data Points That Drive Every Decision
            </h2>
            <p className="text-xl text-black max-w-4xl mx-auto">
              SCOPE's robust AI engine analyzes a comprehensive array of financial data points, ensuring precise, holistic patient funding assessments.
            </p>
          </AnimatedText>

          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-3 gap-8">
              {/* Credit Underwriting Determinations */}
              <AnimatedText delay={0.1}>
                <Card className="shadow-elegant h-full">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3 text-intelligence">
                      <BarChart3 size={24} />
                      Credit Underwriting Determinations
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {[
                        'FICO Score',
                        'Recent Credit Inquiries', 
                        'Credit Card Utilization',
                        'Average Age of Accounts',
                        'Revolving vs Installment Balances',
                        'Payment History',
                        'Number of Open Tradelines',
                        'Active Collections or Charge-offs',
                        'Bankruptcy / Public Records',
                        'Thin File / Credit Depth'
                      ].map((item, index) => (
                        <div key={index} className="flex items-center gap-3">
                          <CheckCircle size={16} className="text-intelligence flex-shrink-0" />
                          <span className="text-sm text-black">{item}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </AnimatedText>

              {/* Personal Income & Capital */}
              <AnimatedText delay={0.2}>
                <Card className="shadow-elegant h-full">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3 text-dental-peach">
                      <TrendingUp size={24} />
                      Personal Income & Capital
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {[
                        'Verified Monthly Income',
                        'Income Stability (Job Duration)',
                        'Bank Account Balance Trends',
                        'Direct Deposit Patterns',
                        'Disposable Income Calculation',
                        'Rent/Mortgage Payment History',
                        'Number of Dependents',
                        'Recent Major Purchases',
                        'Tax Return / Paystub Validation',
                        'Overdraft / NSF Frequency'
                      ].map((item, index) => (
                        <div key={index} className="flex items-center gap-3">
                          <CheckCircle size={16} className="text-dental-peach flex-shrink-0" />
                          <span className="text-sm text-black">{item}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </AnimatedText>

              {/* Business Credit Resources */}
              <AnimatedText delay={0.3}>
                <Card className="shadow-elegant h-full">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3 text-dental-blue">
                      <Database size={24} />
                      Business Credit Resources
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {[
                        'Business Entity Status',
                        'Monthly Gross Receipts',
                        'Client Volume Consistency',
                        'Merchant Processor Statements',
                        'Business Credit Score',
                        'Equipment Financing / Lines',
                        'Age of Business',
                        'Operating Account Stability',
                        'Web Presence / Listings',
                        'Invoice-to-Payment Lag Time'
                      ].map((item, index) => (
                        <div key={index} className="flex items-center gap-3">
                          <CheckCircle size={16} className="text-dental-blue flex-shrink-0" />
                          <span className="text-sm text-black">{item}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </AnimatedText>
            </div>
          </div>
        </div>
      </section>

      {/* Integration Benefits */}
      <ParallaxSection className="py-24 bg-background" offset={-30}>
        <div className="container mx-auto px-6">
          <AnimatedText className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-black">
              The Power of Integrated Intelligence
            </h2>
            <p className="text-xl text-black max-w-3xl mx-auto">
              When PATH and SCOPE work together, they create an unprecedented 
              level of financial intelligence that transforms dental practices
            </p>
          </AnimatedText>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                icon: TrendingUp,
                title: 'Revenue Growth',
                metric: '300%',
                description: 'Average increase in treatment acceptance and practice revenue'
              },
              {
                icon: Shield,
                title: 'Risk Reduction',
                metric: '99.2%',
                description: 'Payment security with advanced fraud detection and prevention'
              },
              {
                icon: Users,
                title: 'Patient Satisfaction',
                metric: '4.9/5',
                description: 'Patient satisfaction score from seamless financing experience'
              }
            ].map((stat, index) => {
              const Icon = stat.icon;
              return (
                <AnimatedText key={index} delay={index * 0.2}>
                  <Card className="text-center hover:shadow-elegant transition-smooth hover:-translate-y-1">
                    <CardContent className="p-8">
                      <div className="w-16 h-16 rounded-2xl bg-intelligence/10 flex items-center justify-center mx-auto mb-6">
                        <Icon size={32} className="text-intelligence" />
                      </div>
                      <div className="text-4xl font-bold text-intelligence mb-2">{stat.metric}</div>
                      <h3 className="text-xl font-bold mb-3">{stat.title}</h3>
                      <p className="text-muted-foreground">{stat.description}</p>
                    </CardContent>
                  </Card>
                </AnimatedText>
              );
            })}
          </div>
        </div>
      </ParallaxSection>

      {/* Traditional vs. Intelligent Financing */}
      <section className="py-24 bg-gradient-subtle">
        <div className="container mx-auto px-6">
          <AnimatedText className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-black">
              Traditional Lending Asks One Question. SCOPE Answers With Thirty.
            </h2>
          </AnimatedText>

          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
              <AnimatedText>
                <Card className="p-8 bg-red-50 border-red-200">
                  <h3 className="text-2xl font-bold text-red-700 mb-4">Traditional Industry Approval Process</h3>
                  <p className="text-lg text-red-600 mb-4 italic">"How would you like to pay for your treatment?"</p>
                  
                  <div className="space-y-3 mb-6">
                    <h4 className="font-semibold text-red-700">Limited Analysis:</h4>
                    <div className="space-y-2 text-red-600">
                      <div>• Soft credit pull only</div>
                      <div>• Stated income verification</div>
                      <div>• Binary approve/deny decision</div>
                      <div>• No treatment-specific consideration</div>
                    </div>
                  </div>
                  
                  <div className="bg-red-100 p-4 rounded-lg">
                    <p className="text-red-700 font-semibold">Results: 45% approval rates, patient uncertainty, delayed treatment</p>
                  </div>
                </Card>
              </AnimatedText>

              <AnimatedText delay={0.2}>
                <Card className="p-8 bg-green-50 border-green-200">
                  <h3 className="text-2xl font-bold text-green-700 mb-4">DentiPay's SCOPE Engine</h3>
                  <p className="text-lg text-green-600 mb-4 italic font-bold">"You're Approved!"</p>
                  
                  <div className="space-y-3 mb-6">
                    <h4 className="font-semibold text-green-700">Comprehensive Analysis:</h4>
                    <div className="space-y-2 text-green-600">
                      <div>• <strong>30+ Data Points</strong> processed per decision</div>
                      <div>• <strong>Approval Intelligence</strong> with confidence scoring</div>
                      <div>• <strong>Pre-Underwritten Clarity</strong> before patient visit</div>
                      <div>• <strong>Treatment-Specific</strong> risk assessment</div>
                    </div>
                  </div>
                  
                  <div className="bg-green-100 p-4 rounded-lg">
                    <p className="text-green-700 font-semibold">Results: 94% approval rates, instant decisions, confident patients</p>
                  </div>
                </Card>
              </AnimatedText>
            </div>
          </div>
        </div>
      </section>

      {/* Why SCOPE Changes Everything */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-6">
          <AnimatedText className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Why SCOPE™ Changes Everything
            </h2>
            <p className="text-xl text-muted-foreground">Intelligence-Driven Philosophy</p>
          </AnimatedText>

          <div className="max-w-4xl mx-auto">
            <AnimatedText delay={0.2}>
              <Card className="shadow-elegant mb-8">
                <CardContent className="p-8">
                  <div className="grid md:grid-cols-2 gap-8">
                    <div>
                      <h3 className="text-xl font-bold mb-4">Core Beliefs:</h3>
                      <div className="space-y-3 text-muted-foreground">
                        <p className="italic">"Because dentistry without intelligence is guesswork"</p>
                        <p className="italic">"Because approvals without packaging are worthless"</p>
                        <p className="italic">"Because dentists should not be bankers"</p>
                      </div>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-4">The Intelligence Difference:</h3>
                      <div className="space-y-3">
                        <div className="flex items-start gap-3">
                          <CheckCircle size={16} className="text-intelligence mt-1 flex-shrink-0" />
                          <span className="text-sm"><strong>Predictive certainty</strong> instead of reactive responses</span>
                        </div>
                        <div className="flex items-start gap-3">
                          <CheckCircle size={16} className="text-intelligence mt-1 flex-shrink-0" />
                          <span className="text-sm"><strong>Treatment-specific intelligence</strong> instead of generic lending</span>
                        </div>
                        <div className="flex items-start gap-3">
                          <CheckCircle size={16} className="text-intelligence mt-1 flex-shrink-0" />
                          <span className="text-sm"><strong>Provider empowerment</strong> instead of financial burden</span>
                        </div>
                        <div className="flex items-start gap-3">
                          <CheckCircle size={16} className="text-intelligence mt-1 flex-shrink-0" />
                          <span className="text-sm"><strong>Patient confidence</strong> instead of financing anxiety</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </AnimatedText>
          </div>
        </div>
      </section>

      {/* Technical Architecture */}
      <ParallaxSection className="py-24 bg-secondary" offset={30}>
        <div className="container mx-auto px-6">
          <AnimatedText className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Built on Advanced AI Infrastructure
            </h2>
          </AnimatedText>

          <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <AnimatedText>
              <Card className="group hover:shadow-elegant transition-smooth hover:-translate-y-1 h-full">
                <CardHeader>
                  <div className="w-16 h-16 rounded-2xl bg-intelligence/10 flex items-center justify-center group-hover:bg-intelligence/20 transition-smooth mb-4">
                    <Brain size={32} className="text-intelligence" />
                  </div>
                  <CardTitle className="text-xl font-bold">Machine Learning Foundation</CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <CheckCircle size={16} className="text-intelligence mt-1 flex-shrink-0" />
                      <span className="text-sm">Training Data: Millions of successful dental financing interactions</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle size={16} className="text-intelligence mt-1 flex-shrink-0" />
                      <span className="text-sm">Model Updates: Continuous learning and optimization</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle size={16} className="text-intelligence mt-1 flex-shrink-0" />
                      <span className="text-sm">Performance Monitoring: Real-time accuracy tracking</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </AnimatedText>

            <AnimatedText delay={0.1}>
              <Card className="group hover:shadow-elegant transition-smooth hover:-translate-y-1 h-full">
                <CardHeader>
                  <div className="w-16 h-16 rounded-2xl bg-dental-blue/10 flex items-center justify-center group-hover:bg-dental-blue/20 transition-smooth mb-4">
                    <Monitor size={32} className="text-dental-blue" />
                  </div>
                  <CardTitle className="text-xl font-bold">Integration Capabilities</CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <CheckCircle size={16} className="text-dental-blue mt-1 flex-shrink-0" />
                      <span className="text-sm">Practice Management Systems: Seamless data flow</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle size={16} className="text-dental-blue mt-1 flex-shrink-0" />
                      <span className="text-sm">Clinical Records: Treatment-specific risk assessment</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle size={16} className="text-dental-blue mt-1 flex-shrink-0" />
                      <span className="text-sm">Financial Systems: Real-time payment processing</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </AnimatedText>

            <AnimatedText delay={0.2}>
              <Card className="group hover:shadow-elegant transition-smooth hover:-translate-y-1 h-full">
                <CardHeader>
                  <div className="w-16 h-16 rounded-2xl bg-dental-peach/10 flex items-center justify-center group-hover:bg-dental-peach/20 transition-smooth mb-4">
                    <Lock size={32} className="text-dental-peach" />
                  </div>
                  <CardTitle className="text-xl font-bold">Security & Compliance</CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <CheckCircle size={16} className="text-dental-peach mt-1 flex-shrink-0" />
                      <span className="text-sm">Enterprise-grade encryption for all data processing</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle size={16} className="text-dental-peach mt-1 flex-shrink-0" />
                      <span className="text-sm">Bank-level security protocols for transactions</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle size={16} className="text-dental-peach mt-1 flex-shrink-0" />
                      <span className="text-sm">Advanced fraud detection using behavioral analysis</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </AnimatedText>
          </div>
        </div>
      </ParallaxSection>

      {/* Intelligence in Action */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-6">
          <AnimatedText className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Intelligence in Action
            </h2>
            <p className="text-xl text-muted-foreground">See the Technology Transform Practice Operations</p>
          </AnimatedText>

          <div className="max-w-4xl mx-auto">
            <AnimatedText delay={0.2}>
              <Card className="shadow-elegant mb-8">
                <CardHeader>
                  <CardTitle className="text-2xl font-bold text-center">Real-World Implementation</CardTitle>
                </CardHeader>
                <CardContent className="p-8">
                  <div className="space-y-4">
                    <div className="flex items-center gap-4 p-4 bg-gradient-subtle rounded-lg">
                      <div className="w-8 h-8 rounded-full bg-intelligence text-white flex items-center justify-center text-sm font-bold">1</div>
                      <span><strong>Patient arrives</strong> → SCOPE pre-qualifies based on appointment scheduling</span>
                    </div>
                    <div className="flex items-center gap-4 p-4 bg-gradient-subtle rounded-lg">
                      <div className="w-8 h-8 rounded-full bg-intelligence text-white flex items-center justify-center text-sm font-bold">2</div>
                      <span><strong>Consultation begins</strong> → PATH provides instant approval probability</span>
                    </div>
                    <div className="flex items-center gap-4 p-4 bg-gradient-subtle rounded-lg">
                      <div className="w-8 h-8 rounded-full bg-intelligence text-white flex items-center justify-center text-sm font-bold">3</div>
                      <span><strong>Treatment presented</strong> → Financial options automatically optimized</span>
                    </div>
                    <div className="flex items-center gap-4 p-4 bg-gradient-subtle rounded-lg">
                      <div className="w-8 h-8 rounded-full bg-intelligence text-white flex items-center justify-center text-sm font-bold">4</div>
                      <span><strong>Decision made</strong> → Patient approved and scheduled same-day</span>
                    </div>
                    <div className="flex items-center gap-4 p-4 bg-gradient-subtle rounded-lg">
                      <div className="w-8 h-8 rounded-full bg-intelligence text-white flex items-center justify-center text-sm font-bold">5</div>
                      <span><strong>Treatment completed</strong> → Payment processing and follow-up automated</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-elegant">
                <CardHeader>
                  <CardTitle className="text-xl font-bold text-center">Provider Dashboard Preview</CardTitle>
                  <p className="text-center text-muted-foreground">Today's Intelligence Summary</p>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-4 gap-4">
                    <div className="text-center p-4 bg-intelligence/10 rounded-lg">
                      <div className="text-2xl font-bold text-intelligence">23</div>
                      <div className="text-sm text-muted-foreground">Pre-qualified patients</div>
                    </div>
                    <div className="text-center p-4 bg-dental-green/10 rounded-lg">
                      <div className="text-2xl font-bold text-dental-green">21</div>
                      <div className="text-sm text-muted-foreground">Instant approvals</div>
                    </div>
                    <div className="text-center p-4 bg-dental-peach/10 rounded-lg">
                      <div className="text-2xl font-bold text-dental-peach">$47,300</div>
                      <div className="text-sm text-muted-foreground">Revenue generated</div>
                    </div>
                    <div className="text-center p-4 bg-dental-blue/10 rounded-lg">
                      <div className="text-2xl font-bold text-dental-blue">+28%</div>
                      <div className="text-sm text-muted-foreground">Average case value</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </AnimatedText>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-intelligence text-intelligence-foreground">
        <div className="container mx-auto px-6 text-center">
          <AnimatedText>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Experience the Future of Dental Finance
            </h2>
            <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
              See how PATH & SCOPE can transform your practice with intelligence-driven financing solutions that predict success and optimize outcomes.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <Button
                size="lg"
                className="bg-white text-intelligence hover:bg-white/90 text-lg px-8"
              >
                Request Demo <ArrowRight className="ml-2" size={20} />
              </Button>
              
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-intelligence text-lg px-8"
              >
                Download Intelligence Whitepaper
              </Button>
            </div>

            <div className="text-center opacity-80">
              <p className="mb-2">Technical Resources:</p>
              <div className="flex flex-wrap justify-center gap-4 text-sm">
                <span>Intelligence Platform Overview (PDF)</span>
                <span>•</span>
                <span>API Documentation</span>
                <span>•</span>
                <span>Integration Guide</span>
                <span>•</span>
                <span>ROI Calculator</span>
              </div>
            </div>
          </AnimatedText>
        </div>
      </section>
    </div>
  );
};

export default IntelligentFinancing;