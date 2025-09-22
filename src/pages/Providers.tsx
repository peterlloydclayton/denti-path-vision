import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  Play, 
  ChevronDown, 
  ChevronRight,
  Brain,
  Shield,
  TrendingUp,
  Users,
  Clock,
  CheckCircle,
  XCircle,
  Star,
  Calculator,
  Phone,
  ArrowRight,
  Zap,
  BarChart3,
  MessageSquare,
  Target,
  Award,
  Lock,
  Globe,
  Headphones
} from 'lucide-react';

// Animated Counter Component
const AnimatedCounter = ({ value, suffix = '', prefix = '' }: { value: number; suffix?: string; prefix?: string }) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          const increment = value / 50;
          let current = 0;
          const timer = setInterval(() => {
            current += increment;
            if (current >= value) {
              setCount(value);
              clearInterval(timer);
            } else {
              setCount(Math.floor(current));
            }
          }, 40);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [value]);

  return (
    <span ref={ref} className="font-bold">
      {prefix}{count}{suffix}
    </span>
  );
};

// Hero Section
const HeroSection = () => {
  return (
    <section className="relative min-h-screen bg-primary text-foreground overflow-hidden">
      {/* Abstract AI Pattern Background */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-20 w-32 h-32 border border-foreground rounded-full"></div>
        <div className="absolute top-40 right-40 w-24 h-24 border border-foreground rotate-45"></div>
        <div className="absolute bottom-40 left-1/3 w-16 h-16 border border-foreground rounded-full"></div>
        <div className="absolute bottom-20 right-20 w-20 h-20 border border-foreground"></div>
      </div>

      <div className="relative container mx-auto px-6 pt-32 pb-20">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            The Future of Patient Financing
            <span className="block text-4xl md:text-6xl mt-2">Built on AI</span>
          </h1>
          
          <p className="text-xl md:text-2xl mb-12 max-w-3xl mx-auto text-muted-foreground">
            Transform patient acceptance rates with AI-powered financing that understands dental care. 
            Where traditional financing fails, DentiPay's SCOPE & PATH intelligence delivers.
          </p>

          <Button size="lg" className="bg-navy hover:bg-navy/90 text-white px-12 py-6 text-xl rounded-xl">
            Get Started
          </Button>
        </div>
      </div>
    </section>
  );
};

// Sticky Stats Bar
const StatsBar = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show stats bar after scrolling past 80% of the hero section
      setIsVisible(window.scrollY > window.innerHeight * 0.8);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className={`fixed top-20 left-0 right-0 bg-background/95 backdrop-blur-sm border-b transition-transform duration-300 z-20 ${
      isVisible ? 'translate-y-0' : '-translate-y-full'
    }`}>
      <div className="container mx-auto px-6 py-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div>
            <div className="text-2xl font-bold text-navy">
              <AnimatedCounter value={94} suffix="%" />
            </div>
            <div className="text-sm text-muted-foreground">Approval Accuracy</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-navy">
              <AnimatedCounter value={40} suffix="%" />
            </div>
            <div className="text-sm text-muted-foreground">Higher Acceptance</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-navy">
              <AnimatedCounter value={30} prefix="<" suffix="s" />
            </div>
            <div className="text-sm text-muted-foreground">Decision Speed</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-navy">
              <AnimatedCounter value={1200} suffix="+" />
            </div>
            <div className="text-sm text-muted-foreground">Active Providers</div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Video Section
const VideoSection = () => {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Personalized Video For Practitioners</h2>
        </div>
        
        <div className="relative max-w-4xl mx-auto">
          <div className="aspect-video bg-card rounded-2xl shadow-elegant overflow-hidden group cursor-pointer">
            <div className="relative h-full bg-muted flex items-center justify-center">
              <div className="absolute inset-0 bg-black/50"></div>
              <Button 
                size="lg" 
                className="relative z-10 bg-white/20 hover:bg-white/30 border border-white/40 text-white rounded-full p-6 group-hover:scale-110 transition-transform"
              >
                <Play className="w-8 h-8" fill="currentColor" />
              </Button>
            </div>
          </div>
          
          <p className="text-center mt-6 text-lg text-muted-foreground">
            AI-Powered Behavioural Financing - Intelligence that Drives Approvals
          </p>
        </div>
      </div>
    </section>
  );
};

// Problem Section
const ProblemSection = () => {
  return (
    <section className="py-24 bg-foreground text-background">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Traditional Financing Wasn't Built for Dental Care
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-12 mb-16">
          {/* Pain Points */}
          <div className="space-y-6">
            <Card className="bg-background/10 border-background/20 text-background">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <XCircle className="w-6 h-6 text-red-400 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold mb-2">Emergency affordability crisis</h3>
                    <p className="text-sm opacity-90">Patients face unexpected dental costs without proper financing options</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-background/10 border-background/20 text-background">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <XCircle className="w-6 h-6 text-red-400 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold mb-2">Timeline mismatch</h3>
                    <p className="text-sm opacity-90">Traditional approval processes don't align with dental treatment urgency</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-background/10 border-background/20 text-background">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <XCircle className="w-6 h-6 text-red-400 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold mb-2">Low approval rates</h3>
                    <p className="text-sm opacity-90">Generic underwriting fails to understand dental-specific patient needs</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-background/10 border-background/20 text-background">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <XCircle className="w-6 h-6 text-red-400 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold mb-2">Generic understanding</h3>
                    <p className="text-sm opacity-90">Banks don't comprehend the unique value and necessity of dental treatments</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Comparison Table */}
          <div className="bg-background/10 border border-background/20 rounded-xl p-6">
            <h3 className="text-2xl font-bold mb-6 text-center">Financial Care Gap</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center py-3 border-b border-background/20">
                <span>Traditional Banking</span>
                <span className="text-red-400">20-40% Approval</span>
              </div>
              <div className="flex justify-between items-center py-3 border-b border-background/20">
                <span>Generic Financing</span>
                <span className="text-red-400">45-60% Approval</span>
              </div>
              <div className="flex justify-between items-center py-3 border-b border-background/20">
                <span>DentiPay Intelligence</span>
                <span className="text-green-400">94% Approval</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Expandable Problem Deep Dive
const ProblemDeepDive = () => {
  const [openSection, setOpenSection] = useState<string | null>(null);

  const sections = [
    {
      id: 'trap',
      title: 'The Trap: A System Built for Banks',
      teaser: 'Traditional financing systems prioritize bank profits over patient care',
      issues: [
        'Patients Rejected: 60-80% denial rates leave patients without care options',
        'Providers Losing Revenue: Practices lose $200K+ annually from failed financing',
        'Banks Profit: Financial institutions profit regardless of patient outcomes'
      ],
      answer: 'Intelligence Revolution: DentiPay\'s AI understands dental care value, not just credit scores'
    },
    {
      id: 'stakes',
      title: 'The Stakes: When Dentistry Loses',
      teaser: 'The cost of inadequate financing extends beyond individual practices',
      issues: [
        '1. No Underwriting Experience: Banks lack dental-specific risk assessment',
        '2. Blind Financing: Generic algorithms miss treatment necessity and value',
        '3. Strained Relationships: Provider-patient trust erodes with financing failures',
        '4. Internal Risk: Practices absorb financial risk without proper tools'
      ],
      answer: '80% Approval • 40% Higher Acceptance • $265K Average Revenue Increase'
    },
    {
      id: 'price',
      title: 'The Price: Paid for Guesswork',
      teaser: 'Traditional financing guesswork costs practices and patients dearly',
      issues: [
        'Lost Treatment Opportunities: Delayed or denied care affects patient health',
        'Administrative Burden: Staff spend hours on failed financing attempts',
        'Competitive Disadvantage: Practices without financing solutions lose patients',
        'Revenue Volatility: Unpredictable financing success impacts cash flow'
      ],
      answer: 'Guesswork Declines. SCOPE Approves. 30+ data points create intelligent decisions'
    }
  ];

  return (
    <section className="py-24 bg-muted">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Providers Shouldn't Be Bankers
          </h2>
        </div>

        <div className="max-w-4xl mx-auto space-y-6">
          {sections.map((section) => (
            <Collapsible
              key={section.id}
              open={openSection === section.id}
              onOpenChange={() => setOpenSection(openSection === section.id ? null : section.id)}
            >
              <CollapsibleTrigger asChild>
                <Card className="cursor-pointer hover:shadow-elegant transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-xl font-bold mb-2">{section.title}</h3>
                        <p className="text-muted-foreground">{section.teaser}</p>
                      </div>
                      <ChevronDown className={`w-6 h-6 transition-transform ${
                        openSection === section.id ? 'rotate-180' : ''
                      }`} />
                    </div>
                  </CardContent>
                </Card>
              </CollapsibleTrigger>

              <CollapsibleContent className="mt-4">
                <Card className="border-l-4 border-l-navy">
                  <CardContent className="p-6">
                    {/* Issues Section */}
                    <div className="mb-8">
                      <h4 className="text-lg font-semibold mb-4 text-red-600">Issues</h4>
                      <div className="space-y-3">
                        {section.issues.map((issue, index) => (
                          <div key={index} className="flex items-start gap-3">
                            <XCircle className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
                            <span className="text-sm">{issue}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Separator */}
                    <div className="border-t border-border my-6"></div>

                    {/* DentiPay Answer */}
                    <div>
                      <h4 className="text-lg font-semibold mb-4 text-green-600">DentiPay Answer</h4>
                      <div className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                        <span className="text-sm font-medium">{section.answer}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </CollapsibleContent>
            </Collapsible>
          ))}
        </div>
      </div>
    </section>
  );
};

// Trinity Section
const TrinitySection = () => {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            One Brand. One Portal. One System.
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            The DentiPay Trinity: Brand leverage, patient portal, and intelligence engine working in perfect harmony.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 relative">
          {/* Connecting Lines */}
          <div className="hidden md:block absolute top-1/2 left-1/3 w-1/3 h-0.5 bg-border"></div>
          <div className="hidden md:block absolute top-1/2 right-1/3 w-1/3 h-0.5 bg-border"></div>

          {/* DentiPay Card */}
          <Card className="group hover:shadow-elegant hover:-translate-y-2 transition-all duration-300 border-navy/20">
            <CardContent className="p-8 text-center">
              <div className="w-16 h-16 bg-navy text-white rounded-xl flex items-center justify-center mx-auto mb-6">
                <Zap className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold mb-2 text-navy">DentiPay</h3>
              <p className="text-muted-foreground mb-4">Brand Layer</p>
              <ul className="space-y-2 text-sm mb-6">
                <li>• Trusted dental financing brand</li>
                <li>• Provider network leverage</li>
                <li>• Patient confidence builder</li>
              </ul>
              <blockquote className="text-sm italic text-muted-foreground border-l-4 border-navy pl-4">
                "The brand patients trust for dental financing"
              </blockquote>
            </CardContent>
          </Card>

          {/* PATH Card */}
          <Card className="group hover:shadow-elegant hover:-translate-y-2 transition-all duration-300 border-primary/50">
            <CardContent className="p-8 text-center">
              <div className="w-16 h-16 bg-primary text-foreground rounded-xl flex items-center justify-center mx-auto mb-6">
                <Globe className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold mb-2">PATH</h3>
              <p className="text-muted-foreground mb-4">Patient Portal</p>
              <ul className="space-y-2 text-sm mb-6">
                <li>• 94% approval accuracy</li>
                <li>• 30-second decisions</li>
                <li>• Seamless integration</li>
              </ul>
              <blockquote className="text-sm italic text-muted-foreground border-l-4 border-primary pl-4">
                "Instant financing decisions that work"
              </blockquote>
            </CardContent>
          </Card>

          {/* SCOPE Card */}
          <Card className="group hover:shadow-elegant hover:-translate-y-2 transition-all duration-300 border-success/50">
            <CardContent className="p-8 text-center">
              <div className="w-16 h-16 bg-success text-white rounded-xl flex items-center justify-center mx-auto mb-6">
                <Brain className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold mb-2 text-success">SCOPE</h3>
              <p className="text-muted-foreground mb-4">Intelligence Engine</p>
              <div className="space-y-3 text-sm mb-6">
                <div>
                  <strong>Clinical Triage:</strong> Treatment necessity analysis
                </div>
                <div>
                  <strong>Financial Engine:</strong> 30+ data point assessment
                </div>
              </div>
              <blockquote className="text-sm italic text-muted-foreground border-l-4 border-success pl-4">
                "Intelligence that understands dental care"
              </blockquote>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

// Intelligence Section
const IntelligenceSection = () => {
  return (
    <section className="py-24 bg-muted">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Intelligence That Amplifies Your Practice
          </h2>
        </div>

        {/* Echo AI Callout */}
        <div className="max-w-2xl mx-auto mb-16">
          <Card className="bg-navy text-white border-0 shadow-elegant">
            <CardContent className="p-8 text-center">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Headphones className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold mb-2">Meet Echo</h3>
              <p className="text-lg opacity-90">
                Voice-enabled AI assistant that enhances every patient interaction with intelligent financing insights
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Three Pillars */}
        <Tabs defaultValue="pipeline" className="max-w-4xl mx-auto">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="pipeline">Patient Pipeline</TabsTrigger>
            <TabsTrigger value="analytics">Analytics Dashboard</TabsTrigger>
            <TabsTrigger value="communications">Communications</TabsTrigger>
          </TabsList>

          <TabsContent value="pipeline" className="mt-8">
            <Card>
              <CardContent className="p-8">
                <div className="flex items-center gap-4 mb-6">
                  <Target className="w-8 h-8 text-navy" />
                  <h3 className="text-2xl font-bold">Patient Pipeline Intelligence</h3>
                </div>
                <ul className="space-y-4 mb-6">
                  <li className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-success" />
                    <span>Pre-qualify patients before consultation</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-success" />
                    <span>Intelligent treatment plan matching</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-success" />
                    <span>Automated follow-up sequences</span>
                  </li>
                </ul>
                <div className="bg-primary/20 rounded-lg p-4">
                  <div className="text-3xl font-bold text-navy">87%</div>
                  <div className="text-sm text-muted-foreground">Patient confidence improvement</div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="mt-8">
            <Card>
              <CardContent className="p-8">
                <div className="flex items-center gap-4 mb-6">
                  <BarChart3 className="w-8 h-8 text-navy" />
                  <h3 className="text-2xl font-bold">Practice Analytics Dashboard</h3>
                </div>
                <ul className="space-y-4 mb-6">
                  <li className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-success" />
                    <span>Real-time approval rate tracking</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-success" />
                    <span>Revenue impact analytics</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-success" />
                    <span>Patient acceptance predictions</span>
                  </li>
                </ul>
                <div className="bg-success/20 rounded-lg p-4">
                  <div className="text-3xl font-bold text-success">23%</div>
                  <div className="text-sm text-muted-foreground">Average revenue increase</div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="communications" className="mt-8">
            <Card>
              <CardContent className="p-8">
                <div className="flex items-center gap-4 mb-6">
                  <MessageSquare className="w-8 h-8 text-navy" />
                  <h3 className="text-2xl font-bold">Patient Communications</h3>
                </div>
                <ul className="space-y-4 mb-6">
                  <li className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-success" />
                    <span>Automated approval notifications</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-success" />
                    <span>Treatment plan explanations</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-success" />
                    <span>Payment reminders and support</span>
                  </li>
                </ul>
                <div className="bg-blue-100 rounded-lg p-4">
                  <div className="text-3xl font-bold text-navy">4.5hrs</div>
                  <div className="text-sm text-muted-foreground">Daily time savings</div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
};

// Workflow Comparison
const WorkflowComparison = () => {
  const traditionalSteps = [
    'Patient inquiry about financing',
    'Manual credit application',
    'Wait 24-48 hours for response',
    'Often rejected or insufficient amount',
    'Patient seeks alternatives',
    'Treatment delayed or cancelled',
    'Lost revenue and patient trust',
    'Administrative burden continues'
  ];

  const dentipaySteps = [
    'Patient expresses treatment interest',
    'Instant SCOPE intelligence analysis',
    'Real-time approval in <30 seconds',
    'Personalized financing options',
    'Patient accepts treatment',
    'Immediate treatment scheduling',
    'Guaranteed payment to provider',
    'Automated payment management'
  ];

  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            AI Powered Approvals. Instant Decisions
          </h2>
          <h3 className="text-2xl text-muted-foreground">
            From Consultation to Payment in Minutes
          </h3>
        </div>

        <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Traditional Flow */}
          <div>
            <h3 className="text-2xl font-bold text-red-600 mb-8 text-center">Traditional Financing Flow</h3>
            <div className="space-y-4">
              {traditionalSteps.map((step, index) => (
                <div key={index} className="flex items-start gap-4 p-4 bg-red-50 rounded-lg border-l-4 border-red-500">
                  <div className="w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                    {index + 1}
                  </div>
                  <div className="flex items-start gap-2">
                    <XCircle className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
                    <span className="text-sm">{step}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* DentiPay Flow */}
          <div>
            <h3 className="text-2xl font-bold text-success mb-8 text-center">DentiPay Intelligence Flow</h3>
            <div className="space-y-4">
              {dentipaySteps.map((step, index) => (
                <div key={index} className="flex items-start gap-4 p-4 bg-green-50 rounded-lg border-l-4 border-success">
                  <div className="w-8 h-8 bg-success text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                    {index + 1}
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-success mt-0.5 flex-shrink-0" />
                    <span className="text-sm">{step}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Performance Metrics
const PerformanceMetrics = () => {
  return (
    <section className="py-24 bg-primary">
      <div className="container mx-auto px-6 text-center">
        {/* Row 1 - Performance Impact */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-12 text-foreground">Performance Impact</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-5xl md:text-6xl font-bold mb-2 text-navy">
                <AnimatedCounter value={87} suffix="%" />
              </div>
              <div className="text-xl text-muted-foreground">Patient Confidence Improvement</div>
            </div>
            <div className="text-center">
              <div className="text-5xl md:text-6xl font-bold mb-2 text-navy">
                <AnimatedCounter value={23} suffix="%" />
              </div>
              <div className="text-xl text-muted-foreground">Revenue Increase</div>
            </div>
            <div className="text-center">
              <div className="text-5xl md:text-6xl font-bold mb-2 text-navy">
                <AnimatedCounter value={4.5} suffix="hrs" />
              </div>
              <div className="text-xl text-muted-foreground">Daily Time Savings</div>
            </div>
          </div>
        </div>

        {/* Row 2 - Aggregate Network Results */}
        <div>
          <h3 className="text-2xl font-bold mb-8 text-foreground">Aggregate Network Results</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold mb-1 text-navy">
                <AnimatedCounter value={95} suffix="%" />
              </div>
              <div className="text-sm text-muted-foreground">Approval Rate</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold mb-1 text-navy">
                <AnimatedCounter value={300} suffix="%" />
              </div>
              <div className="text-sm text-muted-foreground">Revenue Increase</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold mb-1 text-navy">
                <AnimatedCounter value={10000} suffix="+" />
              </div>
              <div className="text-sm text-muted-foreground">Happy Practices</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold mb-1 text-navy">4.9/5</div>
              <div className="text-sm text-muted-foreground">Provider Rating</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// ROI Calculator
const ROICalculator = () => {
  const [monthlyPatients, setMonthlyPatients] = useState('50');
  const [avgTreatment, setAvgTreatment] = useState('2500');
  const [currentApproval, setCurrentApproval] = useState('60');

  const calculateROI = () => {
    const patients = parseInt(monthlyPatients) || 0;
    const treatment = parseInt(avgTreatment) || 0;
    const current = parseInt(currentApproval) || 0;
    
    const currentRevenue = (patients * treatment * current) / 100;
    const newRevenue = (patients * treatment * 94) / 100; // 94% DentiPay approval
    const increase = newRevenue - currentRevenue;
    const annualIncrease = increase * 12;
    
    return {
      monthlyIncrease: increase,
      annualIncrease: annualIncrease,
      approvalImprovement: 94 - current
    };
  };

  const roi = calculateROI();

  return (
    <section className="py-24 bg-muted">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Calculate Your ROI Potential</h2>
        </div>

        <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Calculator Inputs */}
          <Card>
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold mb-6">Practice Information</h3>
              <div className="space-y-6">
                <div>
                  <Label htmlFor="patients">Monthly Patients</Label>
                  <Input
                    id="patients"
                    type="number"
                    value={monthlyPatients}
                    onChange={(e) => setMonthlyPatients(e.target.value)}
                    className="mt-2"
                  />
                </div>
                <div>
                  <Label htmlFor="treatment">Average Treatment Value ($)</Label>
                  <Input
                    id="treatment"
                    type="number"
                    value={avgTreatment}
                    onChange={(e) => setAvgTreatment(e.target.value)}
                    className="mt-2"
                  />
                </div>
                <div>
                  <Label htmlFor="approval">Current Approval Rate (%)</Label>
                  <Input
                    id="approval"
                    type="number"
                    value={currentApproval}
                    onChange={(e) => setCurrentApproval(e.target.value)}
                    className="mt-2"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Results Display */}
          <Card>
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold mb-6">Projected Outcomes</h3>
              <div className="space-y-6">
                <div className="bg-success/10 rounded-lg p-4">
                  <div className="text-2xl font-bold text-success">
                    ${roi.monthlyIncrease.toLocaleString()}
                  </div>
                  <div className="text-sm text-muted-foreground">Monthly Revenue Increase</div>
                </div>
                <div className="bg-navy/10 rounded-lg p-4">
                  <div className="text-2xl font-bold text-navy">
                    ${roi.annualIncrease.toLocaleString()}
                  </div>
                  <div className="text-sm text-muted-foreground">Annual Revenue Increase</div>
                </div>
                <div className="bg-primary/50 rounded-lg p-4">
                  <div className="text-2xl font-bold text-foreground">
                    +{roi.approvalImprovement}%
                  </div>
                  <div className="text-sm text-muted-foreground">Approval Rate Improvement</div>
                </div>
              </div>
              <Button className="w-full mt-6 bg-navy hover:bg-navy/90" size="lg">
                <Calculator className="w-5 h-5 mr-2" />
                Launch Full Calculator
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

// Testimonials
const TestimonialsSection = () => {
  const testimonials = [
    {
      quote: "DentiPay transformed our practice. We went from 40% approval rates to 94% overnight. The intelligence behind SCOPE understands dental care in ways traditional financing never could.",
      name: "Dr. Sarah Mitchell",
      specialty: "Cosmetic & Restorative Dentistry",
      metric: "$180K additional annual revenue",
      rating: "4.9/5"
    },
    {
      quote: "The Echo AI integration has revolutionized how we discuss treatment options. Patients feel confident about financing before we even finish the consultation.",
      name: "Dr. Michael Chen",
      specialty: "Oral Surgery",
      metric: "65% faster treatment acceptance",
      rating: "5.0/5"
    },
    {
      quote: "PATH's instant approvals have eliminated the anxiety around financing discussions. Our patients trust the process because it actually works for dental care.",
      name: "Dr. Jennifer Rodriguez",
      specialty: "Family Dentistry",
      metric: "40% increase in case acceptance",
      rating: "4.8/5"
    }
  ];

  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Join 1,200+ DentiPay-Enabled Providers
          </h2>
          <p className="text-xl text-muted-foreground">
            Real results from dental professionals who've transformed their practices with intelligence.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="hover:shadow-elegant transition-shadow">
              <CardContent className="p-8">
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                  <span className="ml-2 text-sm text-muted-foreground">{testimonial.rating}</span>
                </div>
                
                <blockquote className="text-sm mb-6 italic">
                  "{testimonial.quote}"
                </blockquote>
                
                <div className="border-t pt-4">
                  <div className="font-semibold">{testimonial.name}</div>
                  <div className="text-sm text-muted-foreground mb-2">{testimonial.specialty}</div>
                  <div className="text-sm font-medium text-success">{testimonial.metric}</div>
                  <Badge variant="outline" className="mt-2">
                    <CheckCircle className="w-3 h-3 mr-1" />
                    DentiPay Verified
                  </Badge>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

// Final CTA Section
const FinalCTASection = () => {
  return (
    <section className="py-24 bg-navy text-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-8">
            See DentiPay Intelligence in Your Practice
          </h2>
        </div>

        {/* Three Steps */}
        <div className="grid md:grid-cols-3 gap-8 mb-16 max-w-4xl mx-auto">
          <Card className="bg-white/10 border-white/20 text-white text-center">
            <CardContent className="p-6">
              <div className="w-12 h-12 bg-white text-navy rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                1
              </div>
              <h3 className="text-xl font-bold mb-2">Schedule Demo</h3>
              <p className="text-sm opacity-90">See DentiPay intelligence in action</p>
            </CardContent>
          </Card>
          
          <Card className="bg-white/10 border-white/20 text-white text-center">
            <CardContent className="p-6">
              <div className="w-12 h-12 bg-white text-navy rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                2
              </div>
              <h3 className="text-xl font-bold mb-2">Free Trial</h3>
              <p className="text-sm opacity-90">Test with your actual patients</p>
            </CardContent>
          </Card>
          
          <Card className="bg-white/10 border-white/20 text-white text-center">
            <CardContent className="p-6">
              <div className="w-12 h-12 bg-white text-navy rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                3
              </div>
              <h3 className="text-xl font-bold mb-2">Success Support</h3>
              <p className="text-sm opacity-90">Ongoing training and optimization</p>
            </CardContent>
          </Card>
        </div>

        {/* Everything You Need */}
        <div className="max-w-4xl mx-auto mb-16">
          <h3 className="text-2xl font-bold text-center mb-8">Everything You Need to Succeed</h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-green-400" />
                <span>Complete SCOPE & PATH integration</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-green-400" />
                <span>Echo AI voice assistant</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-green-400" />
                <span>Analytics dashboard</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-green-400" />
                <span>Patient communication tools</span>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-green-400" />
                <span>Dedicated success manager</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-green-400" />
                <span>Staff training program</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-green-400" />
                <span>Marketing support materials</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-green-400" />
                <span>No setup or monthly fees</span>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <Button size="lg" className="bg-white text-navy hover:bg-white/90 px-8">
            Schedule Your Demo
          </Button>
          <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-navy px-8">
            Start Free Trial
          </Button>
          <Button size="lg" variant="ghost" className="text-white hover:bg-white/10 px-8">
            Download Playbook
          </Button>
        </div>

        {/* Contact Information */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Phone className="w-5 h-5" />
            <span className="text-lg font-semibold">(555) 123-4567</span>
          </div>
          <div className="text-sm opacity-90">www.dentipay.com</div>
        </div>

        {/* Security Features */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
          <div className="text-center">
            <Shield className="w-8 h-8 mx-auto mb-2" />
            <div className="text-sm font-semibold">Bank-Level Security</div>
          </div>
          <div className="text-center">
            <Lock className="w-8 h-8 mx-auto mb-2" />
            <div className="text-sm font-semibold">HIPAA Compliant</div>
          </div>
          <div className="text-center">
            <TrendingUp className="w-8 h-8 mx-auto mb-2" />
            <div className="text-sm font-semibold">99.9% Uptime</div>
          </div>
          <div className="text-center">
            <Award className="w-8 h-8 mx-auto mb-2" />
            <div className="text-sm font-semibold">Seamless Integration</div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Providers = () => {
  return (
    <div className="overflow-x-hidden pt-20">
      <StatsBar />
      <HeroSection />
      <VideoSection />
      <ProblemSection />
      <ProblemDeepDive />
      <TrinitySection />
      <IntelligenceSection />
      <WorkflowComparison />
      <PerformanceMetrics />
      <ROICalculator />
      <TestimonialsSection />
      <FinalCTASection />
    </div>
  );
};

export default Providers;