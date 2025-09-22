import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { AnimatedText } from '@/components/ui/animated-text';
import { CountUp } from '@/components/ui/micro-interactions';
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
  Play,
  Calculator,
  X,
  DollarSign,
  ChevronRight,
  Award,
  Lightbulb
} from 'lucide-react';

const Providers = () => {
  const [roiData, setRoiData] = useState({
    monthlyPatients: 100,
    averageCaseValue: 2500,
    currentAcceptanceRate: 65
  });

  const calculateROI = () => {
    const currentRevenue = roiData.monthlyPatients * roiData.averageCaseValue * (roiData.currentAcceptanceRate / 100);
    const newAcceptanceRate = Math.min(roiData.currentAcceptanceRate + 40, 94);
    const newRevenue = roiData.monthlyPatients * roiData.averageCaseValue * (newAcceptanceRate / 100);
    const increase = newRevenue - currentRevenue;
    return {
      currentRevenue,
      newRevenue,
      increase,
      percentageIncrease: ((increase / currentRevenue) * 100).toFixed(1)
    };
  };

  const roi = calculateROI();

  const heroMetrics = [
    { value: "94%", label: "Approval Accuracy", icon: Target },
    { value: "40%", label: "Higher Acceptance", icon: TrendingUp },
    { value: "<30s", label: "Decision Speed", icon: Clock },
    { value: "1,200+", label: "Active Providers", icon: Users }
  ];

  const problemAccordions = [
    {
      value: "banks",
      title: "The Trap: A System Built for Banks",
      content: "Traditional financing platforms were designed for general consumer lending, not the unique needs of dental care. This mismatch creates systematic failures that hurt both practices and patients."
    },
    {
      value: "stakes", 
      title: "The Stakes: When Dentistry Loses",
      content: "Every declined application means delayed care, frustrated patients, and lost revenue. The compounding effect of financing friction can reduce practice growth by 30-50% annually."
    },
    {
      value: "price",
      title: "The Price Paid for Guesswork",
      content: "Without intelligent financing, practices operate on hope rather than data. This guesswork approach costs the industry billions in unrealized revenue and millions of patients go without needed care."
    }
  ];

  const trinityCards = [
    {
      title: "DentiPay",
      subtitle: "The Brand Layer",
      tagline: "The trusted face for dentistry finance",
      points: [
        "Market leverage through unified brand recognition",
        "Network effect strengthens with every provider",
        "Patient trust accelerates decision making",
        "Reduces hesitation and shortens sales cycles"
      ],
      icon: Users,
      color: "from-blue-600 to-blue-800"
    },
    {
      title: "PATH",
      subtitle: "The Portal",
      tagline: "Patient Acceptance Treatment Hub",
      points: [
        "2-minute application with instant decisions",
        "94% approval rates vs 45% industry average",
        "Transparent terms with no surprises",
        "Behavioral optimization for higher conversion"
      ],
      icon: Target,
      color: "from-teal-500 to-cyan-600"
    },
    {
      title: "SCOPE",
      subtitle: "The Intelligence Engine",
      tagline: "Sentient Capable Outcome Predictive Engine",
      points: [
        "Clinical decision support in real-time",
        "30+ data points per financing decision",
        "Predictive modeling for treatment outcomes",
        "Personalized recommendations for each patient"
      ],
      icon: Brain,
      color: "from-indigo-600 to-purple-700"
    }
  ];

  const workflowSteps = {
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

  const testimonials = [
    {
      name: "Dr. Sarah Johnson",
      title: "Cosmetic & General Dentistry",
      quote: "DentiPay's intelligence system transformed our practice. We see 45% higher case acceptance and 92% patient satisfaction with the financing process.",
      results: "45% case acceptance increase",
      rating: 5
    },
    {
      name: "Dr. Michael Chen",
      title: "Periodontics Specialist",
      quote: "The predictive analytics help us present treatments at exactly the right moment. Patient retention increased 25% since implementing DentiPay.",
      results: "25% retention increase", 
      rating: 5
    },
    {
      name: "Bright Smile Dental Group",
      title: "Multi-Location Practice",
      quote: "SCOPE intelligence across all locations gives us unprecedented insights. 28% higher case values practice-wide with better patient outcomes.",
      results: "28% case value increase",
      rating: 5
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-900 via-blue-800 to-teal-600 text-white overflow-hidden">
        <div className="absolute inset-0 bg-[url('/lovable-uploads/hero-dental-office-clean.jpg')] bg-cover bg-center opacity-10" />
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              Intelligence That Amplifies Your Practice
            </h1>
            
            <p className="text-xl md:text-2xl mb-8 max-w-4xl mx-auto opacity-90">
              Transform patient acceptance rates with AI-powered financing that understands dental care. 
              Where traditional financing fails, DentiPay's SCOPE & PATH intelligence delivers.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Button size="lg" className="text-lg px-8 py-6 bg-teal-500 hover:bg-teal-600 text-white">
                <Calendar className="mr-2 h-5 w-5" />
                Get Provider Demo
              </Button>
              <Button variant="outline" size="lg" className="text-lg px-8 py-6 border-white text-white hover:bg-white hover:text-blue-900">
                <Calculator className="mr-2 h-5 w-5" />
                Calculate Your ROI
              </Button>
            </div>

            {/* Video Placeholder */}
            <motion.div 
              className="relative max-w-4xl mx-auto mb-12"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              <div className="aspect-video bg-black/20 rounded-lg border border-white/20 flex items-center justify-center group cursor-pointer hover:bg-black/30 transition-colors">
                <div className="w-20 h-20 rounded-full bg-white/20 flex items-center justify-center group-hover:bg-white/30 transition-colors">
                  <Play className="h-8 w-8 text-white ml-1" />
                </div>
              </div>
            </motion.div>

            {/* Animated Metrics */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
              {heroMetrics.map((metric, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 + index * 0.1 }}
                  className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center border border-white/20"
                >
                  <metric.icon className="h-8 w-8 mx-auto mb-2 text-teal-300" />
                  <div className="text-2xl font-bold">
                    <CountUp end={parseInt(metric.value.replace(/[^\d]/g, '') || '94')} />
                    {metric.value.includes('%') && '%'}
                    {metric.value.includes('+') && '+'}
                    {metric.value.includes('<') && metric.value.replace(/\d/g, '')}
                  </div>
                  <div className="text-sm opacity-90">{metric.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="py-20 bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Traditional Financing Wasn't Built for Dental Care
            </h2>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto">
              The stark reality facing dental practices today demands a financing solution that understands both clinical needs and patient psychology.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-red-500 mt-3 flex-shrink-0" />
                <p className="text-lg text-slate-300">Less than 50% of Americans can afford a $1,000 dental emergency</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-red-500 mt-3 flex-shrink-0" />
                <p className="text-lg text-slate-300">Traditional financing takes weeks vs same-day dental needs</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-red-500 mt-3 flex-shrink-0" />
                <p className="text-lg text-slate-300">Standard lenders achieve 30-45% lower approval rates</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-red-500 mt-3 flex-shrink-0" />
                <p className="text-lg text-slate-300">Generic financing doesn't understand dental procedures or patient psychology</p>
              </div>
            </div>

            <Card className="bg-slate-800 border-slate-700">
              <CardHeader>
                <CardTitle className="text-2xl text-white">The Financial Care Gap</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-slate-300">Traditional Approval Rate</span>
                  <Badge variant="destructive">~55%</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-300">Decision Timeline</span>
                  <Badge variant="destructive">24-72 hours</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-300">Clinical Understanding</span>
                  <Badge variant="destructive">Generic</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-300">Patient Experience</span>
                  <Badge variant="destructive">Frustrating</Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Deep Dive Problem - Accordion */}
      <section className="py-16 bg-slate-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Accordion type="single" collapsible className="space-y-4">
            {problemAccordions.map((item) => (
              <AccordionItem key={item.value} value={item.value} className="border border-slate-600 rounded-lg bg-slate-700">
                <AccordionTrigger className="px-6 py-4 text-white hover:text-teal-300 text-left">
                  <div className="flex items-center gap-3">
                    <Lightbulb className="h-5 w-5 text-teal-400" />
                    <span className="text-lg font-semibold">{item.title}</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-4 text-slate-300">
                  {item.content}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* Solution Trinity */}
      <section className="py-20 bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
              One Brand. One Portal. One Intelligence. One System.
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              The DentiPay Trinity: Brand leverage, patient portal, and intelligence engine working in perfect harmony.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {trinityCards.map((card, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="group"
              >
                <Card className="h-full bg-white border-slate-200 shadow-lg hover:shadow-xl transition-all duration-300">
                  <CardHeader className="text-center pb-4">
                    <div className={`w-16 h-16 mx-auto rounded-full bg-gradient-to-r ${card.color} flex items-center justify-center mb-4`}>
                      <card.icon className="h-8 w-8 text-white" />
                    </div>
                    <CardTitle className="text-2xl text-slate-900">{card.title}</CardTitle>
                    <p className="text-teal-600 font-semibold">{card.subtitle}</p>
                    <CardDescription className="text-slate-600 italic">
                      "{card.tagline}"
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {card.points.map((point, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-slate-700">
                          <CheckCircle className="h-4 w-4 text-teal-500 mt-0.5 flex-shrink-0" />
                          <span className="text-sm">{point}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Intelligence Features - Tabs */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
              Intelligence That Amplifies Your Practice
            </h2>
          </div>

          <Tabs defaultValue="pipeline" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-8">
              <TabsTrigger value="pipeline">Patient Pipeline Intelligence</TabsTrigger>
              <TabsTrigger value="analytics">Practice Analytics Dashboard</TabsTrigger>
              <TabsTrigger value="communications">Patient Communications</TabsTrigger>
            </TabsList>
            
            <TabsContent value="pipeline" className="space-y-8">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <h3 className="text-3xl font-bold text-slate-900 mb-4">Transform Leads into Loyal Patients</h3>
                  <p className="text-slate-600 mb-6">Predictive insights that help you identify, prioritize, and convert the right patients at the right time.</p>
                  <ul className="space-y-3">
                    <li className="flex items-center gap-2">
                      <ArrowRight className="h-4 w-4 text-teal-500" />
                      <span>Pre-qualified patient matching</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <ArrowRight className="h-4 w-4 text-teal-500" />
                      <span>Approval probability scoring</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <ArrowRight className="h-4 w-4 text-teal-500" />
                      <span>Optimal scheduling recommendations</span>
                    </li>
                  </ul>
                  <div className="mt-6 p-4 bg-teal-50 rounded-lg border border-teal-200">
                    <div className="flex items-center gap-2 mb-2">
                      <Brain className="h-5 w-5 text-teal-600" />
                      <span className="font-semibold text-teal-800">Echo AI Enhancement</span>
                    </div>
                    <p className="text-sm text-teal-700">Real-time patient sentiment analysis and behavioral prediction for optimal engagement timing.</p>
                  </div>
                </div>
                <div className="bg-slate-100 rounded-lg p-8 text-center">
                  <div className="text-4xl font-bold text-teal-600 mb-2"><CountUp end={87} />%</div>
                  <div className="text-slate-700">Patient Confidence Improvement</div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="analytics" className="space-y-8">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <h3 className="text-3xl font-bold text-slate-900 mb-4">Real-Time Practice Intelligence</h3>
                  <p className="text-slate-600 mb-6">Comprehensive dashboard that gives you visibility into every aspect of your practice performance.</p>
                  <ul className="space-y-3">
                    <li className="flex items-center gap-2">
                      <ArrowRight className="h-4 w-4 text-teal-500" />
                      <span>Live revenue tracking</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <ArrowRight className="h-4 w-4 text-teal-500" />
                      <span>Acceptance rate monitoring</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <ArrowRight className="h-4 w-4 text-teal-500" />
                      <span>Predictive revenue modeling</span>
                    </li>
                  </ul>
                </div>
                <div className="bg-slate-100 rounded-lg p-8 text-center">
                  <div className="text-4xl font-bold text-teal-600 mb-2"><CountUp end={23} />%</div>
                  <div className="text-slate-700">Revenue Increase</div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="communications" className="space-y-8">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <h3 className="text-3xl font-bold text-slate-900 mb-4">Automated Patient Engagement</h3>
                  <p className="text-slate-600 mb-6">Intelligent communication system that builds trust and drives action at every touchpoint.</p>
                  <ul className="space-y-3">
                    <li className="flex items-center gap-2">
                      <ArrowRight className="h-4 w-4 text-teal-500" />
                      <span>Pre-approval notifications</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <ArrowRight className="h-4 w-4 text-teal-500" />
                      <span>Treatment plan explanations</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <ArrowRight className="h-4 w-4 text-teal-500" />
                      <span>Retention campaigns</span>
                    </li>
                  </ul>
                </div>
                <div className="bg-slate-100 rounded-lg p-8 text-center">
                  <div className="text-4xl font-bold text-teal-600 mb-2"><CountUp end={4.5} />hrs</div>
                  <div className="text-slate-700">Daily Time Savings</div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Workflow Comparison */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
              AI Powered Approvals. Instant Decisions
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              See the dramatic difference between traditional financing friction and DentiPay intelligence.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            {/* Traditional Flow */}
            <Card className="bg-red-50 border-red-200">
              <CardHeader>
                <CardTitle className="text-2xl text-slate-900 flex items-center gap-2">
                  <X className="h-6 w-6 text-red-500" />
                  Traditional Flow
                </CardTitle>
                <CardDescription className="text-red-700">
                  Multiple days → uncertainty → admin burden → delayed revenue
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {workflowSteps.traditional.map((step, index) => (
                    <div key={index} className="flex items-center gap-3 p-3 rounded-lg bg-red-100">
                      <div className="w-8 h-8 rounded-full bg-red-200 flex items-center justify-center text-sm font-medium text-red-800">
                        {index + 1}
                      </div>
                      <span className="text-slate-700">{step}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* DentiPay Flow */}
            <Card className="bg-teal-50 border-teal-200">
              <CardHeader>
                <CardTitle className="text-2xl text-slate-900 flex items-center gap-2">
                  <CheckCircle className="h-6 w-6 text-teal-500" />
                  DentiPay Flow
                </CardTitle>
                <CardDescription className="text-teal-700">
                  Instant decisions → clear options → immediate confidence → higher conversions
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {workflowSteps.dentipay.map((step, index) => (
                    <div key={index} className="flex items-center gap-3 p-3 rounded-lg bg-teal-100">
                      <div className="w-8 h-8 rounded-full bg-teal-200 flex items-center justify-center text-sm font-medium text-teal-800">
                        {index + 1}
                      </div>
                      <span className="text-slate-700">{step}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Performance Metrics */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-teal-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-5xl font-bold mb-2"><CountUp end={87} />%</div>
              <div className="text-xl opacity-90">Patient Confidence</div>
            </div>
            <div>
              <div className="text-5xl font-bold mb-2"><CountUp end={23} />%</div>
              <div className="text-xl opacity-90">Revenue Increase</div>
            </div>
            <div>
              <div className="text-5xl font-bold mb-2"><CountUp end={4.5} /></div>
              <div className="text-xl opacity-90">Hours Saved Daily</div>
            </div>
          </div>
          
          <div className="grid md:grid-cols-4 gap-6 mt-12 text-center">
            <div>
              <div className="text-3xl font-bold mb-1"><CountUp end={95} />%</div>
              <div className="text-sm opacity-80">Approval Rate</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-1"><CountUp end={300} />%</div>
              <div className="text-sm opacity-80">ROI Improvement</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-1"><CountUp end={10000} />+</div>
              <div className="text-sm opacity-80">Happy Patients</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-1">4.9/5</div>
              <div className="text-sm opacity-80">Provider Rating</div>
            </div>
          </div>
        </div>
      </section>

      {/* ROI Calculator */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
              Calculate Your ROI Potential
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              See your potential revenue increase with DentiPay's intelligent financing platform.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-start">
            <Card className="bg-slate-50 border-slate-200">
              <CardHeader>
                <CardTitle className="text-2xl text-slate-900">Practice Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Monthly New Patients</label>
                  <input
                    type="number"
                    value={roiData.monthlyPatients}
                    onChange={(e) => setRoiData({...roiData, monthlyPatients: parseInt(e.target.value) || 0})}
                    className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Average Case Value ($)</label>
                  <input
                    type="number"
                    value={roiData.averageCaseValue}
                    onChange={(e) => setRoiData({...roiData, averageCaseValue: parseInt(e.target.value) || 0})}
                    className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Current Acceptance Rate (%)</label>
                  <input
                    type="number"
                    value={roiData.currentAcceptanceRate}
                    onChange={(e) => setRoiData({...roiData, currentAcceptanceRate: parseInt(e.target.value) || 0})}
                    className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                  />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-teal-50 to-blue-50 border-teal-200">
              <CardHeader>
                <CardTitle className="text-2xl text-slate-900 flex items-center gap-2">
                  <TrendingUp className="h-6 w-6 text-teal-600" />
                  Your ROI Projection
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-4 bg-white rounded-lg">
                    <div className="text-sm text-slate-600 mb-1">Current Monthly Revenue</div>
                    <div className="text-2xl font-bold text-slate-900">
                      ${roi.currentRevenue.toLocaleString()}
                    </div>
                  </div>
                  <div className="text-center p-4 bg-teal-100 rounded-lg">
                    <div className="text-sm text-teal-700 mb-1">Projected Monthly Revenue</div>
                    <div className="text-2xl font-bold text-teal-800">
                      ${roi.newRevenue.toLocaleString()}
                    </div>
                  </div>
                </div>
                
                <div className="text-center p-6 bg-gradient-to-r from-teal-500 to-blue-500 text-white rounded-lg">
                  <div className="text-sm opacity-90 mb-2">Monthly Revenue Increase</div>
                  <div className="text-3xl font-bold mb-1">
                    ${roi.increase.toLocaleString()}
                  </div>
                  <div className="text-lg">
                    (+{roi.percentageIncrease}% improvement)
                  </div>
                </div>

                <div className="text-center">
                  <div className="text-4xl font-bold text-teal-600 mb-2">
                    ${(roi.increase * 12).toLocaleString()}
                  </div>
                  <div className="text-slate-700">Annual Revenue Increase</div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="text-center mt-12">
            <Button size="lg" className="text-lg px-8 py-6 bg-teal-500 hover:bg-teal-600">
              <Calculator className="mr-2 h-5 w-5" />
              Launch Full Calculator
            </Button>
          </div>
        </div>
      </section>

      {/* Testimonials Carousel */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
              Join 1,200+ DentiPay-Enabled Providers
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Real results from dental professionals who've transformed their practices with intelligence.
            </p>
          </div>

          <Carousel className="max-w-5xl mx-auto">
            <CarouselContent>
              {testimonials.map((testimonial, index) => (
                <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                  <Card className="h-full bg-white border-slate-200 shadow-lg">
                    <CardContent className="p-6">
                      <div className="flex items-center gap-1 mb-4">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        ))}
                      </div>
                      <blockquote className="text-slate-700 mb-4">
                        "{testimonial.quote}"
                      </blockquote>
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 rounded-full bg-teal-100 flex items-center justify-center">
                          <Users className="h-5 w-5 text-teal-600" />
                        </div>
                        <div>
                          <div className="font-semibold text-slate-900">{testimonial.name}</div>
                          <div className="text-sm text-slate-600">{testimonial.title}</div>
                        </div>
                      </div>
                      <Badge variant="secondary" className="bg-teal-100 text-teal-800">
                        {testimonial.results}
                      </Badge>
                      <div className="mt-3 flex items-center gap-2">
                        <Award className="h-4 w-4 text-teal-600" />
                        <span className="text-sm text-teal-700 font-medium">DentiPay Verified</span>
                      </div>
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-blue-900 via-blue-800 to-teal-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            See DentiPay Intelligence in Your Practice
          </h2>
          <p className="text-xl mb-12 max-w-3xl mx-auto opacity-90">
            Get a customized demo with your practice data, scheduled within 24 hours. 
            Join the intelligence revolution transforming dental care.
          </p>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-center">
              <CardContent className="p-6">
                <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-teal-500 flex items-center justify-center">
                  <span className="text-2xl font-bold">1</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">Schedule Demo</h3>
                <p className="text-white/80">See DentiPay with your practice data</p>
              </CardContent>
            </Card>
            
            <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-center">
              <CardContent className="p-6">
                <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-teal-500 flex items-center justify-center">
                  <span className="text-2xl font-bold">2</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">Free Trial</h3>
                <p className="text-white/80">30-day risk-free implementation</p>
              </CardContent>
            </Card>
            
            <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-center">
              <CardContent className="p-6">
                <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-teal-500 flex items-center justify-center">
                  <span className="text-2xl font-bold">3</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">Success Support</h3>
                <p className="text-white/80">Dedicated team ensures your success</p>
              </CardContent>
            </Card>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button size="lg" className="text-lg px-8 py-6 bg-teal-500 hover:bg-teal-600">
              <Calendar className="mr-2 h-5 w-5" />
              Schedule Your Demo
            </Button>
            <Button variant="outline" size="lg" className="text-lg px-8 py-6 border-white text-white hover:bg-white hover:text-blue-900">
              <Zap className="mr-2 h-5 w-5" />
              Start Free Trial
            </Button>
            <Button variant="secondary" size="lg" className="text-lg px-8 py-6 bg-white/20 hover:bg-white/30 text-white border-white/20">
              <Download className="mr-2 h-5 w-5" />
              Download Playbook
            </Button>
          </div>

          <div className="flex flex-wrap justify-center gap-8 text-sm opacity-80">
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4" />
              Industry Recognition
            </div>
            <div className="flex items-center gap-2">
              <Star className="h-4 w-4" />
              4.9/5 Provider Rating
            </div>
            <div className="flex items-center gap-2">
              <Shield className="h-4 w-4" />
              Certified Professionals
            </div>
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              1,200+ Active Providers
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Providers;