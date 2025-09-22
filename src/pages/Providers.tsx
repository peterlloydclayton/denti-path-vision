import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Progress } from '@/components/ui/progress';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { AnimatedText } from '@/components/ui/animated-text';
import { FloatingNav } from '@/components/layout/FloatingNav';
import { Footer } from '@/components/layout/Footer';
import { 
  CheckCircle, 
  XCircle, 
  Play, 
  Users, 
  TrendingUp, 
  Clock, 
  Zap, 
  Brain, 
  Shield, 
  Target,
  ChevronRight,
  Star,
  Calculator,
  BarChart3,
  MessageSquare,
  Lightbulb,
  Award,
  Lock
} from 'lucide-react';

const Providers = () => {
  const [activeTab, setActiveTab] = useState('pipeline');
  const [practiceSize, setPracticeSize] = useState(50);
  const [monthlyPatients, setMonthlyPatients] = useState(200);
  const [avgTreatmentCost, setAvgTreatmentCost] = useState(3500);

  // ROI Calculator
  const calculateROI = () => {
    const currentAcceptance = 0.65; // 65% typical acceptance rate
    const improvedAcceptance = 0.87; // 87% with DentiPay
    const improvementFactor = improvedAcceptance / currentAcceptance;
    
    const monthlyRevenue = monthlyPatients * avgTreatmentCost * currentAcceptance;
    const improvedRevenue = monthlyPatients * avgTreatmentCost * improvedAcceptance;
    const monthlyIncrease = improvedRevenue - monthlyRevenue;
    const annualIncrease = monthlyIncrease * 12;
    
    return {
      monthlyIncrease: Math.round(monthlyIncrease),
      annualIncrease: Math.round(annualIncrease),
      percentIncrease: Math.round((improvementFactor - 1) * 100)
    };
  };

  const roiResults = calculateROI();

  return (
    <div className="min-h-screen bg-background">
      <FloatingNav />
      
      {/* Hero Section */}
      <section className="pt-20 pb-16 bg-primary text-white">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <AnimatedText>
              <h1 className="text-5xl md:text-6xl font-bold mb-6">
                Intelligence That Amplifies Your Practice
              </h1>
              <p className="text-xl md:text-2xl mb-8 text-primary-foreground/90">
                Transform patient acceptance rates with AI-powered financing that understands dental care. 
                Where traditional financing fails, DentiPay's SCOPE & PATH intelligence delivers.
              </p>
            </AnimatedText>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Button size="lg" variant="secondary" className="text-lg px-8">
                Get Provider Demo
              </Button>
              <Button size="lg" variant="outline" className="text-lg px-8 text-white border-white hover:bg-white hover:text-primary">
                Calculate Your ROI
              </Button>
            </div>

            {/* Video Placeholder */}
            <div className="relative mb-12 max-w-3xl mx-auto">
              <div className="video-placeholder">
                <Button size="lg" variant="secondary" className="rounded-full">
                  <Play className="h-6 w-6 mr-2" />
                  Watch Demo
                </Button>
              </div>
            </div>

            {/* Animated Statistics Bar */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-4xl font-bold mb-2 text-teal">94%</div>
                <div className="text-sm text-primary-foreground/80">Approval Accuracy</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold mb-2 text-teal">40%</div>
                <div className="text-sm text-primary-foreground/80">Higher Acceptance</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold mb-2 text-teal">&lt;30s</div>
                <div className="text-sm text-primary-foreground/80">Decision Speed</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold mb-2 text-teal">1,200+</div>
                <div className="text-sm text-primary-foreground/80">Active Providers</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="py-24 bg-slate-900 text-white">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <AnimatedText>
                <h2 className="text-4xl md:text-5xl font-bold mb-6">
                  Traditional Financing Wasn't Built for Dental Care
                </h2>
                <p className="text-xl mb-8 text-gray-300">
                  Dental practices face unique challenges that generic financing can't solve. 
                  The result? Lost patients, reduced treatment acceptance, and missed revenue opportunities.
                </p>
              </AnimatedText>

              <div className="space-y-4">
                <Card className="bg-red-900/20 border-red-800">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4">
                      <XCircle className="h-8 w-8 text-red-400 flex-shrink-0" />
                      <div>
                        <h3 className="font-semibold mb-2">One-Size-Fits-All Approach</h3>
                        <p className="text-sm text-gray-300">Generic credit scoring ignores dental-specific patient behavior</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-red-900/20 border-red-800">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4">
                      <XCircle className="h-8 w-8 text-red-400 flex-shrink-0" />
                      <div>
                        <h3 className="font-semibold mb-2">Slow Decision Making</h3>
                        <p className="text-sm text-gray-300">Patients leave while waiting for approval decisions</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-red-900/20 border-red-800">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4">
                      <XCircle className="h-8 w-8 text-red-400 flex-shrink-0" />
                      <div>
                        <h3 className="font-semibold mb-2">Limited Understanding</h3>
                        <p className="text-sm text-gray-300">No insight into treatment urgency or patient circumstances</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            <div>
              <Card className="bg-slate-800 border-slate-700">
                <CardContent className="p-8">
                  <h3 className="text-2xl font-bold mb-6 text-center">Financial Care Gap</h3>
                  <div className="space-y-6">
                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="text-sm">Traditional Approval Rate</span>
                        <span className="text-sm">62%</span>
                      </div>
                      <Progress value={62} className="h-3" />
                    </div>
                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="text-sm">DentiPay Approval Rate</span>
                        <span className="text-sm text-teal">94%</span>
                      </div>
                      <Progress value={94} className="h-3" />
                    </div>
                    <div className="text-center pt-4">
                      <div className="text-3xl font-bold text-teal">32%</div>
                      <div className="text-sm text-gray-400">More Patients Approved</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Deep Dive Problem - Accordion */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-6">
          <AnimatedText className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              The Hidden Costs of Broken Financing
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Every denied application represents more than just a "no" – it's a cascade of consequences 
              that undermines your practice's potential.
            </p>
          </AnimatedText>

          <div className="max-w-4xl mx-auto">
            <Accordion type="single" collapsible className="space-y-4">
              <AccordionItem value="trap" className="border rounded-lg">
                <AccordionTrigger className="px-6 py-4 hover:no-underline">
                  <div className="flex items-center gap-4">
                    <div className="bg-red-100 dark:bg-red-900/30 p-3 rounded-full">
                      <Target className="h-6 w-6 text-red-600" />
                    </div>
                    <div className="text-left">
                      <h3 className="text-xl font-semibold">The Trap: A System Built for Banks</h3>
                      <p className="text-sm text-muted-foreground">Why traditional financing fails dental practices</p>
                    </div>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-6">
                  <div className="pl-16">
                    <p className="mb-4 text-muted-foreground">
                      Traditional financing companies optimize for their bottom line, not yours. They use generic 
                      credit models that can't distinguish between a patient who needs emergency treatment and 
                      someone shopping for luxury items.
                    </p>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li>• Credit scores don't reflect dental treatment urgency</li>
                      <li>• Rigid algorithms miss nuanced patient circumstances</li>
                      <li>• Banks profit from higher interest rates, not approval rates</li>
                      <li>• No understanding of treatment value or necessity</li>
                    </ul>
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="stakes" className="border rounded-lg">
                <AccordionTrigger className="px-6 py-4 hover:no-underline">
                  <div className="flex items-center gap-4">
                    <div className="bg-orange-100 dark:bg-orange-900/30 p-3 rounded-full">
                      <TrendingUp className="h-6 w-6 text-orange-600" />
                    </div>
                    <div className="text-left">
                      <h3 className="text-xl font-semibold">The Stakes: When Dentistry Loses</h3>
                      <p className="text-sm text-muted-foreground">The ripple effects of financing failures</p>
                    </div>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-6">
                  <div className="pl-16">
                    <p className="mb-4 text-muted-foreground">
                      Every financing denial creates a cascade of negative outcomes that extend far beyond 
                      a single lost case. The compound effect undermines your practice's growth and reputation.
                    </p>
                    <div className="grid md:grid-cols-2 gap-4 text-sm">
                      <div>
                        <h4 className="font-semibold mb-2">Immediate Impact</h4>
                        <ul className="space-y-1 text-muted-foreground">
                          <li>• Treatment delays worsen conditions</li>
                          <li>• Patient trust and confidence eroded</li>
                          <li>• Lost revenue from declined cases</li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-2">Long-term Damage</h4>
                        <ul className="space-y-1 text-muted-foreground">
                          <li>• Negative reviews and referral loss</li>
                          <li>• Reduced case acceptance rates</li>
                          <li>• Practice growth stagnation</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="price" className="border rounded-lg">
                <AccordionTrigger className="px-6 py-4 hover:no-underline">
                  <div className="flex items-center gap-4">
                    <div className="bg-red-100 dark:bg-red-900/30 p-3 rounded-full">
                      <Calculator className="h-6 w-6 text-red-600" />
                    </div>
                    <div className="text-left">
                      <h3 className="text-xl font-semibold">The Price Paid for Guesswork</h3>
                      <p className="text-sm text-muted-foreground">Quantifying the cost of inefficient financing</p>
                    </div>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-6">
                  <div className="pl-16">
                    <p className="mb-4 text-muted-foreground">
                      The financial impact of traditional financing extends beyond denied applications. 
                      It's about missed opportunities, inefficient workflows, and compromised patient relationships.
                    </p>
                    <div className="bg-muted p-4 rounded-lg">
                      <h4 className="font-semibold mb-3">Average Practice Losses Per Month</h4>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <div className="text-2xl font-bold text-red-600">$47,000</div>
                          <div className="text-muted-foreground">Lost revenue from denials</div>
                        </div>
                        <div>
                          <div className="text-2xl font-bold text-red-600">23hrs</div>
                          <div className="text-muted-foreground">Staff time on financing issues</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </section>

      {/* Solution Trinity Section */}
      <section className="py-24 bg-muted/30">
        <div className="container mx-auto px-6">
          <AnimatedText className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              One Brand. One Portal. One Intelligence. One System.
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              The DentiPay Trinity: Brand leverage, patient portal, and intelligence engine working in perfect harmony.
            </p>
          </AnimatedText>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* DentiPay Brand */}
            <Card className="group hover:shadow-elegant transition-all duration-300 hover:-translate-y-2">
              <CardContent className="p-8 text-center">
                <div className="bg-primary text-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6">
                  <Award className="h-8 w-8" />
                </div>
                <h3 className="text-2xl font-bold mb-4">DentiPay</h3>
                <p className="text-dental-blue font-semibold mb-4">The Trusted Brand</p>
                <ul className="text-left space-y-2 text-sm text-muted-foreground">
                  <li>• Established credibility with patients</li>
                  <li>• Instant recognition and trust</li>
                  <li>• Professional branding alignment</li>
                  <li>• Seamless practice integration</li>
                </ul>
              </CardContent>
            </Card>

            {/* PATH Portal */}
            <Card className="group hover:shadow-peach transition-all duration-300 hover:-translate-y-2">
              <CardContent className="p-8 text-center">
                <div className="bg-teal text-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6">
                  <Users className="h-8 w-8" />
                </div>
                <h3 className="text-2xl font-bold mb-4">PATH</h3>
                <p className="text-dental-peach font-semibold mb-4">Patient Portal</p>
                <ul className="text-left space-y-2 text-sm text-muted-foreground">
                  <li>• Intuitive patient experience</li>
                  <li>• Real-time application processing</li>
                  <li>• Multiple financing options</li>
                  <li>• Automated payment scheduling</li>
                </ul>
              </CardContent>
            </Card>

            {/* SCOPE Intelligence */}
            <Card className="group hover:shadow-lavender transition-all duration-300 hover:-translate-y-2">
              <CardContent className="p-8 text-center">
                <div className="bg-dental-blue-dark text-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6">
                  <Brain className="h-8 w-8" />
                </div>
                <h3 className="text-2xl font-bold mb-4">SCOPE</h3>
                <p className="text-dental-lavender font-semibold mb-4">Intelligence Engine</p>
                <ul className="text-left space-y-2 text-sm text-muted-foreground">
                  <li>• AI-powered decision making</li>
                  <li>• Dental-specific algorithms</li>
                  <li>• Predictive approval modeling</li>
                  <li>• Continuous learning optimization</li>
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* Connected visualization */}
          <div className="flex justify-center mt-12">
            <div className="flex items-center space-x-4 text-muted-foreground">
              <div className="w-3 h-3 bg-primary rounded-full"></div>
              <div className="w-8 h-px bg-border"></div>
              <div className="w-3 h-3 bg-teal rounded-full"></div>
              <div className="w-8 h-px bg-border"></div>
              <div className="w-3 h-3 bg-dental-blue-dark rounded-full"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Intelligence Features Section */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-6">
          <AnimatedText className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Intelligence That Amplifies Your Practice
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              See how DentiPay's AI-powered platform transforms every aspect of your financing workflow.
            </p>
          </AnimatedText>

          <div className="max-w-6xl mx-auto">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-3 mb-8">
                <TabsTrigger value="pipeline" className="text-sm md:text-base">
                  Patient Pipeline Intelligence
                </TabsTrigger>
                <TabsTrigger value="analytics" className="text-sm md:text-base">
                  Practice Analytics Dashboard  
                </TabsTrigger>
                <TabsTrigger value="communications" className="text-sm md:text-base">
                  Patient Communications
                </TabsTrigger>
              </TabsList>

              <TabsContent value="pipeline">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                  <div>
                    <h3 className="text-2xl font-bold mb-4">Predictive Patient Intelligence</h3>
                    <p className="text-muted-foreground mb-6">
                      AI algorithms analyze patient behavior, treatment history, and financial patterns to 
                      predict approval likelihood before they even apply.
                    </p>
                    <div className="space-y-4">
                      <div className="flex items-center gap-3">
                        <CheckCircle className="h-5 w-5 text-success flex-shrink-0" />
                        <span className="text-sm">Real-time approval probability scoring</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <CheckCircle className="h-5 w-5 text-success flex-shrink-0" />
                        <span className="text-sm">Treatment urgency assessment</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <CheckCircle className="h-5 w-5 text-success flex-shrink-0" />
                        <span className="text-sm">Alternative option recommendations</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <CheckCircle className="h-5 w-5 text-success flex-shrink-0" />
                        <span className="text-sm">Optimal timing predictions</span>
                      </div>
                    </div>
                  </div>
                  <Card>
                    <CardContent className="p-6">
                      <div className="space-y-4">
                        <div className="flex justify-between items-center">
                          <span className="text-sm font-medium">High Probability Approvals</span>
                          <Badge variant="secondary" className="bg-success text-success-foreground">
                            87%
                          </Badge>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm font-medium">Medium Probability</span>
                          <Badge variant="secondary" className="bg-warning text-warning-foreground">
                            23%
                          </Badge>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm font-medium">Needs Alternative Options</span>
                          <Badge variant="secondary" className="bg-teal text-teal-foreground">
                            12%
                          </Badge>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="analytics">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                  <Card>
                    <CardContent className="p-6">
                      <h4 className="font-semibold mb-4">Practice Performance Metrics</h4>
                      <div className="space-y-6">
                        <div>
                          <div className="flex justify-between mb-2">
                            <span className="text-sm">Approval Rate</span>
                            <span className="text-sm font-semibold">94%</span>
                          </div>
                          <Progress value={94} className="h-2" />
                        </div>
                        <div>
                          <div className="flex justify-between mb-2">
                            <span className="text-sm">Patient Satisfaction</span>
                            <span className="text-sm font-semibold">96%</span>
                          </div>
                          <Progress value={96} className="h-2" />
                        </div>
                        <div>
                          <div className="flex justify-between mb-2">
                            <span className="text-sm">Processing Speed</span>
                            <span className="text-sm font-semibold">28s avg</span>
                          </div>
                          <Progress value={85} className="h-2" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  <div>
                    <h3 className="text-2xl font-bold mb-4">Real-Time Practice Insights</h3>
                    <p className="text-muted-foreground mb-6">
                      Comprehensive dashboard showing financing performance, patient trends, and 
                      revenue optimization opportunities across your entire practice.
                    </p>
                    <div className="space-y-4">
                      <div className="flex items-center gap-3">
                        <BarChart3 className="h-5 w-5 text-primary flex-shrink-0" />
                        <span className="text-sm">Revenue tracking by treatment type</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <TrendingUp className="h-5 w-5 text-primary flex-shrink-0" />
                        <span className="text-sm">Seasonal trend analysis</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <Users className="h-5 w-5 text-primary flex-shrink-0" />
                        <span className="text-sm">Patient demographic insights</span>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="communications">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                  <div>
                    <h3 className="text-2xl font-bold mb-4">Automated Patient Engagement</h3>
                    <p className="text-muted-foreground mb-6">
                      Intelligent communication system that keeps patients informed, engaged, and 
                      confident throughout their financing journey.
                    </p>
                    
                    {/* Echo AI Callout */}
                    <Card className="border-2 border-teal bg-teal/5 mb-6">
                      <CardContent className="p-6">
                        <div className="flex items-center gap-3 mb-3">
                          <div className="bg-teal text-white rounded-full p-2">
                            <MessageSquare className="h-4 w-4" />
                          </div>
                          <h4 className="font-semibold text-teal">Echo AI Assistant</h4>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          AI-powered chatbot provides instant answers to patient questions, 
                          reducing staff workload while improving patient experience.
                        </p>
                      </CardContent>
                    </Card>

                    <div className="space-y-4">
                      <div className="flex items-center gap-3">
                        <CheckCircle className="h-5 w-5 text-success flex-shrink-0" />
                        <span className="text-sm">Automated approval notifications</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <CheckCircle className="h-5 w-5 text-success flex-shrink-0" />
                        <span className="text-sm">Payment reminder system</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <CheckCircle className="h-5 w-5 text-success flex-shrink-0" />
                        <span className="text-sm">Treatment follow-up sequences</span>
                      </div>
                    </div>
                  </div>
                  <Card>
                    <CardContent className="p-6">
                      <div className="space-y-4">
                        <div className="bg-muted p-3 rounded-lg">
                          <div className="text-xs text-muted-foreground mb-1">Patient Message</div>
                          <div className="text-sm">"What's my payment schedule?"</div>
                        </div>
                        <div className="bg-teal text-white p-3 rounded-lg ml-4">
                          <div className="text-xs mb-1 opacity-80">Echo AI Response</div>
                          <div className="text-sm">Your next payment of $127 is due on March 15th. Would you like me to send a reminder?</div>
                        </div>
                        <div className="text-center">
                          <Badge variant="outline" className="text-xs">Response time: 0.3s</Badge>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </section>

      {/* Workflow Comparison */}
      <section className="py-24 bg-muted/30">
        <div className="container mx-auto px-6">
          <AnimatedText className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              AI Powered Approvals. Instant Decisions.
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              See the dramatic difference between traditional financing workflows and DentiPay's intelligent system.
            </p>
          </AnimatedText>

          <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Traditional Flow */}
            <Card className="border-red-200 dark:border-red-800">
              <CardContent className="p-8">
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold text-red-600 mb-2">Traditional Flow</h3>
                  <Badge variant="destructive">Slow & Inefficient</Badge>
                </div>
                
                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="bg-red-100 dark:bg-red-900/30 text-red-600 rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">1</div>
                    <div className="flex-1">
                      <div className="font-semibold">Manual Application</div>
                      <div className="text-sm text-muted-foreground">Patient fills lengthy forms</div>
                    </div>
                    <XCircle className="h-5 w-5 text-red-500" />
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <div className="bg-red-100 dark:bg-red-900/30 text-red-600 rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">2</div>
                    <div className="flex-1">
                      <div className="font-semibold">Credit Check Wait</div>
                      <div className="text-sm text-muted-foreground">24-48 hour processing time</div>
                    </div>
                    <XCircle className="h-5 w-5 text-red-500" />
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <div className="bg-red-100 dark:bg-red-900/30 text-red-600 rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">3</div>
                    <div className="flex-1">
                      <div className="font-semibold">Generic Scoring</div>
                      <div className="text-sm text-muted-foreground">One-size-fits-all decisions</div>
                    </div>
                    <XCircle className="h-5 w-5 text-red-500" />
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <div className="bg-red-100 dark:bg-red-900/30 text-red-600 rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">4</div>
                    <div className="flex-1">
                      <div className="font-semibold">High Denial Rate</div>
                      <div className="text-sm text-muted-foreground">62% approval rate</div>
                    </div>
                    <XCircle className="h-5 w-5 text-red-500" />
                  </div>

                  <div className="border-t pt-4 text-center">
                    <div className="text-2xl font-bold text-red-600">2-3 Days</div>
                    <div className="text-sm text-muted-foreground">Average Decision Time</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* DentiPay Flow */}
            <Card className="border-success">
              <CardContent className="p-8">
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold text-success mb-2">DentiPay Flow</h3>
                  <Badge className="bg-success text-success-foreground">Fast & Intelligent</Badge>
                </div>
                
                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="bg-success text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">1</div>
                    <div className="flex-1">
                      <div className="font-semibold">Smart Pre-Screen</div>
                      <div className="text-sm text-muted-foreground">AI predicts approval likelihood</div>
                    </div>
                    <CheckCircle className="h-5 w-5 text-success" />
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <div className="bg-success text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">2</div>
                    <div className="flex-1">
                      <div className="font-semibold">Instant Analysis</div>
                      <div className="text-sm text-muted-foreground">&lt;30 second decisions</div>
                    </div>
                    <CheckCircle className="h-5 w-5 text-success" />
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <div className="bg-success text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">3</div>
                    <div className="flex-1">
                      <div className="font-semibold">Dental-Specific AI</div>
                      <div className="text-sm text-muted-foreground">Treatment-aware algorithms</div>
                    </div>
                    <CheckCircle className="h-5 w-5 text-success" />
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <div className="bg-success text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">4</div>
                    <div className="flex-1">
                      <div className="font-semibold">High Approval Rate</div>
                      <div className="text-sm text-muted-foreground">94% approval rate</div>
                    </div>
                    <CheckCircle className="h-5 w-5 text-success" />
                  </div>

                  <div className="border-t pt-4 text-center">
                    <div className="text-2xl font-bold text-success">&lt;30 Seconds</div>
                    <div className="text-sm text-muted-foreground">Average Decision Time</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Performance Metrics */}
      <section className="py-24 bg-primary text-white">
        <div className="container mx-auto px-6">
          <AnimatedText className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Proven Results Across 1,200+ Practices
            </h2>
          </AnimatedText>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="text-center">
              <div className="text-6xl font-bold mb-4 text-teal">87%</div>
              <div className="text-xl font-semibold mb-2">Patient Confidence</div>
              <div className="text-primary-foreground/80">Higher trust in treatment recommendations</div>
            </div>
            <div className="text-center">
              <div className="text-6xl font-bold mb-4 text-teal">23%</div>
              <div className="text-xl font-semibold mb-2">Revenue Increase</div>
              <div className="text-primary-foreground/80">Average monthly revenue growth</div>
            </div>
            <div className="text-center">
              <div className="text-6xl font-bold mb-4 text-teal">4.5hrs</div>
              <div className="text-xl font-semibold mb-2">Daily Time Saved</div>
              <div className="text-primary-foreground/80">Reduced administrative burden</div>
            </div>
          </div>

          <div className="grid md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="text-3xl font-bold text-teal">98%</div>
              <div className="text-sm text-primary-foreground/80">Provider Satisfaction</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-teal">32%</div>
              <div className="text-sm text-primary-foreground/80">More Approvals</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-teal">15min</div>
              <div className="text-sm text-primary-foreground/80">Setup Time</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-teal">24/7</div>
              <div className="text-sm text-primary-foreground/80">Support Available</div>
            </div>
          </div>
        </div>
      </section>

      {/* ROI Calculator Section */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-6">
          <AnimatedText className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Calculate Your ROI Potential
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              See how DentiPay's intelligence could transform your practice's financing performance and revenue.
            </p>
          </AnimatedText>

          <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            <Card>
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold mb-6">Practice Information</h3>
                <div className="space-y-6">
                  <div>
                    <Label htmlFor="practiceSize">Practice Size (providers)</Label>
                    <Input
                      id="practiceSize"
                      type="number"
                      value={practiceSize}
                      onChange={(e) => setPracticeSize(Number(e.target.value))}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="monthlyPatients">Monthly Patients</Label>
                    <Input
                      id="monthlyPatients"
                      type="number"
                      value={monthlyPatients}
                      onChange={(e) => setMonthlyPatients(Number(e.target.value))}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="avgTreatmentCost">Average Treatment Cost</Label>
                    <Input
                      id="avgTreatmentCost"
                      type="number"
                      value={avgTreatmentCost}
                      onChange={(e) => setAvgTreatmentCost(Number(e.target.value))}
                      className="mt-1"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-success">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold mb-6 text-success">Your ROI Projection</h3>
                <div className="space-y-6">
                  <div className="text-center p-6 bg-success/10 rounded-lg">
                    <div className="text-4xl font-bold text-success mb-2">
                      ${roiResults.monthlyIncrease.toLocaleString()}
                    </div>
                    <div className="text-sm text-muted-foreground">Additional Monthly Revenue</div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-4 bg-muted rounded-lg">
                      <div className="text-2xl font-bold">{roiResults.percentIncrease}%</div>
                      <div className="text-sm text-muted-foreground">Revenue Increase</div>
                    </div>
                    <div className="text-center p-4 bg-muted rounded-lg">
                      <div className="text-2xl font-bold">${roiResults.annualIncrease.toLocaleString()}</div>
                      <div className="text-sm text-muted-foreground">Annual Growth</div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm">Current Approval Rate</span>
                      <span className="font-semibold">65%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">DentiPay Approval Rate</span>
                      <span className="font-semibold text-success">94%</span>
                    </div>
                    <div className="flex justify-between border-t pt-2">
                      <span className="text-sm font-semibold">Improvement</span>
                      <span className="font-bold text-success">+29%</span>
                    </div>
                  </div>

                  <Button className="w-full" size="lg">
                    <Calculator className="h-4 w-4 mr-2" />
                    Launch Full Calculator
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Testimonials Carousel */}
      <section className="py-24 bg-muted/30">
        <div className="container mx-auto px-6">
          <AnimatedText className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Join 1,200+ DentiPay-Enabled Providers
            </h2>
          </AnimatedText>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <Card>
              <CardContent className="p-8">
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <blockquote className="text-lg mb-6">
                  "DentiPay transformed our practice. We've seen a 40% increase in treatment acceptance 
                  and patients are happier with the financing process."
                </blockquote>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-semibold">Dr. Sarah Johnson</div>
                    <div className="text-sm text-muted-foreground">Cosmetic Dentistry</div>
                  </div>
                  <Badge className="bg-primary text-white">
                    DentiPay Verified
                  </Badge>
                </div>
                <div className="mt-4 text-center">
                  <div className="text-2xl font-bold text-success">$127K</div>
                  <div className="text-sm text-muted-foreground">Additional Annual Revenue</div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-8">
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <blockquote className="text-lg mb-6">
                  "The AI recommendations are incredibly accurate. Our denial rate dropped from 35% to just 6%. 
                  It's like having a financing expert on staff."
                </blockquote>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-semibold">Dr. Michael Chen</div>
                    <div className="text-sm text-muted-foreground">Periodontics</div>
                  </div>
                  <Badge className="bg-primary text-white">
                    DentiPay Verified
                  </Badge>
                </div>
                <div className="mt-4 text-center">
                  <div className="text-2xl font-bold text-success">94%</div>
                  <div className="text-sm text-muted-foreground">Approval Rate</div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-8">
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <blockquote className="text-lg mb-6">
                  "Our staff loves how simple it is. Patients get instant decisions and we spend 
                  less time on paperwork. It's a win-win for everyone."
                </blockquote>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-semibold">Dr. Lisa Martinez</div>
                    <div className="text-sm text-muted-foreground">General Practice</div>
                  </div>
                  <Badge className="bg-primary text-white">
                    DentiPay Verified
                  </Badge>
                </div>
                <div className="mt-4 text-center">
                  <div className="text-2xl font-bold text-success">4.5hrs</div>
                  <div className="text-sm text-muted-foreground">Daily Time Saved</div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-6">
          <AnimatedText className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              See DentiPay Intelligence in Your Practice
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Ready to transform your financing workflow? Get started in three simple steps.
            </p>
          </AnimatedText>

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto mb-12">
            <Card className="text-center">
              <CardContent className="p-8">
                <div className="bg-primary text-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6">
                  <span className="text-2xl font-bold">1</span>
                </div>
                <h3 className="text-xl font-bold mb-4">Schedule Demo</h3>
                <p className="text-muted-foreground">
                  Book a personalized demo to see DentiPay in action with your practice data.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="p-8">
                <div className="bg-teal text-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6">
                  <span className="text-2xl font-bold">2</span>
                </div>
                <h3 className="text-xl font-bold mb-4">Quick Setup</h3>
                <p className="text-muted-foreground">
                  Our team handles integration. Get up and running in under 15 minutes.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="p-8">
                <div className="bg-dental-blue-dark text-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6">
                  <span className="text-2xl font-bold">3</span>
                </div>
                <h3 className="text-xl font-bold mb-4">Start Approving</h3>
                <p className="text-muted-foreground">
                  Begin processing applications with 94% approval rates immediately.
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="text-center space-y-6">
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="text-lg px-8">
                Schedule Your Demo
                <ChevronRight className="h-5 w-5 ml-2" />
              </Button>
              <Button size="lg" variant="outline" className="text-lg px-8">
                Start Free Trial
              </Button>
            </div>

            {/* Trust Badges */}
            <div className="flex justify-center items-center gap-8 pt-8">
              <div className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">HIPAA Compliant</span>
              </div>
              <div className="flex items-center gap-2">
                <Lock className="h-5 w-5 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">Bank-Level Security</span>
              </div>
              <div className="flex items-center gap-2">
                <Award className="h-5 w-5 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">SOC 2 Certified</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Providers;