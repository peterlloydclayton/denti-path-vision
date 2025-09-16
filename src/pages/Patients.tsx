import { motion } from 'framer-motion';
import { Search, Heart, CreditCard, Clock, Shield, MapPin, Star, ChevronDown, Calculator, Users, Zap, Award, Headphones, TrendingUp, CheckCircle, Bot } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ParallaxSection } from '@/components/ui/parallax-section';
import { AnimatedText } from '@/components/ui/animated-text';
import { VideoSection } from '@/components/ui/video-section';
import { Link } from 'react-router-dom';
import patientImage from '@/assets/happy-patient.jpg';

const Patients = () => {
  const benefits = [
    {
      icon: CreditCard,
      title: 'Flexible Payment Plans',
      description: '6, 12, 18, and 24-month payment options available',
      detail: 'Choose from multiple financing options that fit your budget and lifestyle'
    },
    {
      icon: Clock,
      title: 'Instant Approval',
      description: 'Decisions in under 60 seconds with 94% approval rate',
      detail: 'Get approved in seconds, not days. Start your treatment immediately'
    },
    {
      icon: Shield,
      title: 'No Hidden Fees',
      description: 'Clear terms, no prepayment penalties, competitive rates',
      detail: 'Transparent pricing with no surprise charges or hidden costs'
    },
    {
      icon: Heart,
      title: 'Better Oral Health',
      description: 'Access to full range of treatments without financial barriers',
      detail: 'Get the dental care you deserve without compromising on quality'
    }
  ];

  const specialties = [
    'General Dentistry',
    'Cosmetic Dentistry', 
    'Orthodontics',
    'Oral Surgery',
    'Periodontics',
    'Endodontics',
    'Pediatric Dentistry'
  ];

  const sampleProviders = [
    {
      name: 'Dr. Sarah Martinez',
      specialty: 'Cosmetic Dentistry',
      location: 'Beverly Hills, CA',
      rating: 4.9,
      reviews: 247,
      verified: true
    },
    {
      name: 'Dr. Michael Chen',
      specialty: 'Orthodontics',
      location: 'Austin, TX',
      rating: 4.8,
      reviews: 189,
      verified: true
    },
    {
      name: 'Dr. Emily Rodriguez',
      specialty: 'General Dentistry',
      location: 'Miami, FL',
      rating: 4.9,
      reviews: 312,
      verified: true
    }
  ];

  const patientStories = [
    {
      name: 'Sarah, 28',
      subtitle: 'Young Professional',
      treatment: 'Invisalign',
      payment: '$89/month',
      quote: 'I finally got the dental care I needed without the financial stress. The approval was instant and the monthly payments fit perfectly in my budget.'
    },
    {
      name: 'The Johnson Family',
      subtitle: 'Family of Four',
      treatment: 'Family dental care package',
      payment: '25% savings by bundling',
      quote: 'DentiPay made it possible for our whole family to get healthy smiles. We could schedule everyone\'s treatment at once.'
    },
    {
      name: 'Robert, 67',
      subtitle: 'Retiree',
      treatment: 'Full mouth restoration',
      payment: '24 months, 0% interest',
      quote: 'I thought I couldn\'t afford dental care in retirement, but DentiPay changed that. The process was so simple.'
    },
    {
      name: 'Maria, 35',
      subtitle: 'Emergency Patient',
      treatment: 'Emergency root canal',
      payment: 'Approved in 32 seconds',
      quote: 'When I needed emergency dental care, DentiPay was there immediately. I got approved in 30 seconds and started treatment the same day.'
    }
  ];

  const financialTools = [
    {
      icon: Calculator,
      title: 'Treatment Cost Estimator',
      description: 'Get an estimated cost range for your treatment',
      benefit: 'Plan your budget before your appointment',
      cta: 'Try Cost Estimator'
    },
    {
      icon: CreditCard,
      title: 'Payment Plan Calculator',
      description: 'Explore monthly payment options for different treatment costs',
      benefit: 'See what fits in your budget',
      cta: 'Calculate Payments'
    },
    {
      icon: Shield,
      title: 'Insurance Benefit Optimizer',
      description: 'Maximize your insurance benefits alongside DentiPay financing',
      benefit: 'Use your benefits efficiently and reduce out-of-pocket costs',
      cta: 'Check Benefits'
    }
  ];

  const peaceOfMindFeatures = [
    {
      icon: Zap,
      title: 'Instant Pre-Approval',
      features: [
        'Decisions in under 60 seconds',
        'No impact to your credit score for pre-qualification',
        'Clear approval amounts before you visit the dentist'
      ]
    },
    {
      icon: CreditCard,
      title: 'Flexible Payments',
      features: [
        'Choose payment terms that fit your lifestyle',
        'No prepayment penalties',
        'Automatic payment options available'
      ]
    },
    {
      icon: Headphones,
      title: '24/7 Support',
      features: [
        'Patient advocates available around the clock',
        'Echo AI assistant for instant answers',
        'Live chat and phone support'
      ]
    },
    {
      icon: TrendingUp,
      title: 'Credit Building Opportunity',
      features: [
        'On-time payments can help improve your credit score',
        'Positive payment history reported to credit bureaus',
        'Build credit while improving your health'
      ]
    }
  ];

  return (
    <div className="overflow-x-hidden">
      {/* Hero Section - New Design */}
      <section className="min-h-screen bg-dental-blue-muted relative z-30 sm:overflow-visible md:overflow-hidden">
        <div className="container mx-auto px-2 md:px-6 min-h-screen sm:overflow-visible md:overflow-hidden">
          {/* Mobile Landscape Layout */}
          <div className="hidden md:flex lg:hidden relative min-h-screen border-4 border-red-500 z-[9999] overflow-hidden">
            {/* Image - Right aligned, moved 40% from left */}
            <div className="absolute left-[40%] top-0 h-full flex items-center justify-end z-[9998]">
              <img 
                src="https://res.cloudinary.com/drxvhwze4/image/upload/v1758032045/patient-woman-latina_t6hmm3.png"
                alt="Happy patient with dental financing"
                className="w-auto h-[85%] object-contain object-bottom z-[110]"
              />
            </div>
            
            {/* Subtitle - Middle of container */}
            <div className="absolute top-1/2 left-12 -translate-y-1/2 z-20 w-1/2">
              <AnimatedText delay={0.2}>
                <h2 className="text-lg text-gray-600 font-medium leading-relaxed italic">
                  Ai Driven Financing For Smarter & More Affordable Payment Options
                </h2>
              </AnimatedText>
            </div>
            
            {/* Button - Shifted right but left aligned, in front of image */}
            <div className="absolute bottom-[12%] left-[20%] z-[150]">
              <Button className="h-16 text-xl bg-primary text-primary-foreground hover:bg-primary/90 shadow-elegant px-12 font-semibold">
                Get Financing
              </Button>
            </div>
          </div>

          {/* Desktop Layout */}
          <div className="hidden md:flex justify-center items-center min-h-screen">
            {/* Right Hero Image - Centered */}
            <div className="w-full max-w-md xl:max-w-lg 2xl:max-w-xl min-h-screen relative z-[100]">
              <img 
                src="https://res.cloudinary.com/drxvhwze4/image/upload/v1758032045/patient-woman-latina_t6hmm3.png"
                alt="Happy patient with dental financing"
                className="absolute bottom-0 left-1/2 xl:left-[40%] 2xl:left-[40%] -translate-x-1/2 xl:-translate-x-1/2 2xl:-translate-x-1/2 w-auto object-contain object-bottom z-[110] max-w-none hero-image h-[85vh]"
              />
            </div>
          </div>

          {/* Mobile Portrait Layout */}
          <div className="flex sm:hidden justify-start items-start pt-20 h-[calc(100vh-5rem)] ml-[25%]">
            {/* Right Hero Image - Centered */}
            <div className="w-full max-w-md h-[calc(100vh-5rem)] relative z-[100]">
              <img 
                src="https://res.cloudinary.com/drxvhwze4/image/upload/v1758032045/patient-woman-latina_t6hmm3.png"
                alt="Happy patient with dental financing"
                className="absolute bottom-16 left-[-150px] transform-none w-auto object-contain object-bottom z-[110] max-w-none hero-image h-[calc(100vh-12rem)]"
              />
            </div>
          </div>
        </div>
        
        {/* Mobile Portrait Title */}
        <div className="block sm:hidden absolute top-[15%] left-6 z-20 w-3/4" style={{ transform: 'translateY(0.5em)' }}>
          <AnimatedText>
            <h1 className="text-4xl font-bold mb-6 text-foreground leading-tight">
              Making Your<br />
              Dream Smile<br />
              Affordable
            </h1>
          </AnimatedText>
        </div>
        
        {/* Desktop Title - positioned where subtitle was on mobile */}
        <div className="hidden lg:block absolute top-[20%] left-12 z-20 w-1/2" style={{ transform: 'translateY(0.5em)' }}>
          <AnimatedText>
            <h1 className="text-6xl lg:text-7xl font-bold text-foreground leading-tight">
              Making Your<br />
              Dream Smile<br />
              Affordable
            </h1>
          </AnimatedText>
        </div>
        
        {/* Tablet Title - closer to top */}
        <div className="hidden md:block lg:hidden absolute top-[8%] left-12 z-[110] w-1/2 border-2 border-blue-500 p-4" style={{ transform: 'translateY(0.5em)' }}>
          <AnimatedText>
            <h1 className="text-6xl lg:text-7xl font-bold text-black leading-tight">
              Making Your<br />
              Dream Smile<br />
              Affordable
            </h1>
          </AnimatedText>
        </div>
        
        {/* Desktop Subtitle - positioned below title */}
        <div className="hidden md:block absolute top-[50%] left-12 z-20 w-1/2" style={{ transform: 'translateY(0.5em)' }}>
          <AnimatedText delay={0.2}>
            <h2 className="text-xl text-gray-600 font-medium leading-relaxed text-left italic">
              Ai Driven Financing For Smarter & More Affordable Payment Options
            </h2>
          </AnimatedText>
        </div>
        
        {/* Mobile Portrait Subtitle */}
        <div className="block sm:hidden absolute top-[34%] left-6 z-20 w-1/2" style={{ transform: 'translateY(0.5em)' }}>
          <AnimatedText delay={0.2}>
            <h2 className="text-lg text-gray-600 font-medium leading-relaxed text-left italic">
              Ai Driven Financing For Smarter & More Affordable Payment Options
            </h2>
          </AnimatedText>
        </div>
        
        {/* Desktop Button */}
        <div className="hidden md:block absolute bottom-[12%] left-12 z-[120]" style={{ transform: 'translateY(0.3em)' }}>
          <Button className="h-16 text-xl bg-primary text-primary-foreground hover:bg-primary/90 shadow-elegant px-12 font-semibold">
            Get Financing
          </Button>
        </div>

        {/* Mobile Portrait Button */}
        <div className="block sm:hidden absolute bottom-6 left-6 z-[150]" style={{ transform: 'translateY(0.3em)' }}>
          <Button className="h-12 text-lg bg-primary text-primary-foreground hover:bg-primary/90 shadow-elegant px-8 font-semibold">
            Get Financing
          </Button>
        </div>
      </section>

      {/* Find Your Provider Section */}
      <section className="py-24 bg-gradient-subtle">
        <div className="container mx-auto px-6">
          <AnimatedText className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Find a Provider Near You
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Search our network of over 1,200 DentiPay-enabled practices.
            </p>
          </AnimatedText>

          {/* Search Interface */}
          <div className="max-w-2xl mx-auto mb-16">
            <AnimatedText delay={0.2}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className="relative">
                  <Input
                    placeholder="Enter your zip code or city..."
                    className="h-12 pl-12 pr-4 bg-background text-primary border-2 border-dental-blue/20 focus:border-dental-blue"
                  />
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={20} />
                </div>
                <div className="relative">
                  <select className="w-full h-12 pl-4 pr-10 bg-background text-primary border-2 border-dental-blue/20 rounded-md focus:border-dental-blue appearance-none">
                    <option>Select Specialty</option>
                    {specialties.map((specialty) => (
                      <option key={specialty} value={specialty}>{specialty}</option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={20} />
                </div>
              </div>
            </AnimatedText>
          </div>

          {/* Sample Provider Results */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto mb-12">
            {sampleProviders.map((provider, index) => (
              <AnimatedText key={index} delay={index * 0.1}>
                <Card className="hover:shadow-elegant transition-smooth hover:-translate-y-1">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-16 h-16 rounded-full bg-dental-blue/20 flex items-center justify-center">
                        <Heart className="text-dental-blue" size={24} />
                      </div>
                      <div>
                        <h3 className="font-bold text-lg">{provider.name}</h3>
                        <p className="text-muted-foreground">{provider.specialty}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2 mb-2">
                      <MapPin size={16} className="text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">{provider.location}</span>
                    </div>
                    
                    <div className="flex items-center gap-2 mb-2">
                      <Star size={16} className="text-dental-peach fill-current" />
                      <span className="font-semibold">{provider.rating}</span>
                      <span className="text-sm text-muted-foreground">({provider.reviews} reviews)</span>
                      {provider.verified && (
                        <span className="text-xs bg-dental-blue/10 text-dental-blue px-2 py-1 rounded-full ml-auto">
                          DentiPay Verified ✓
                        </span>
                      )}
                    </div>
                    
                    <Button className="w-full bg-intelligence hover:bg-intelligence/90">
                      View Profile & Book
                    </Button>
                  </CardContent>
                </Card>
              </AnimatedText>
            ))}
          </div>

          <AnimatedText className="text-center">
            <Button size="lg" variant="outline" className="text-lg px-8">
              View All Providers in Your Area
            </Button>
          </AnimatedText>
        </div>
      </section>

      {/* Your Journey to Confident Dental Care */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-6">
          <AnimatedText className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Your Journey to Confident Dental Care
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Getting Started is Simple
            </p>
          </AnimatedText>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {[
              { 
                step: '1', 
                title: 'Find Your Provider', 
                desc: 'Search for dental providers near you who accept DentiPay',
                benefit: 'Know financing is available before you visit'
              },
              { 
                step: '2', 
                title: 'Instant Pre-Qualification', 
                desc: 'Complete our simple application and get approved in seconds',
                benefit: 'Get clear payment options immediately with no credit score impact'
              },
              { 
                step: '3', 
                title: 'Treatment Planning', 
                desc: 'Work with your provider to create a treatment plan',
                benefit: 'Flexible payment plans that match your budget and timeline'
              },
              { 
                step: '4', 
                title: 'Treatment & Payment', 
                desc: 'Begin your dental care with confidence',
                benefit: 'Focus on your health, not financial stress'
              }
            ].map((item, index) => (
              <AnimatedText key={index} delay={index * 0.2}>
                <div className="text-center">
                  <div className="w-16 h-16 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                    {item.step}
                  </div>
                  <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                  <p className="text-muted-foreground mb-2">{item.desc}</p>
                  <p className="text-sm text-dental-blue font-medium">{item.benefit}</p>
                </div>
              </AnimatedText>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section - Why Patients Love DentiPay */}
      <ParallaxSection className="py-24 bg-gradient-subtle" offset={30}>
        <div className="container mx-auto px-6">
          <AnimatedText className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Why Patients Love DentiPay
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Experience the easiest way to finance your dental care
            </p>
          </AnimatedText>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <AnimatedText key={index} delay={index * 0.1}>
                  <Card className="text-center hover:shadow-soft transition-smooth hover:-translate-y-1 h-full">
                    <CardContent className="p-6">
                      <div className="w-16 h-16 rounded-2xl bg-dental-blue/10 flex items-center justify-center mx-auto mb-4">
                        <Icon size={32} className="text-dental-blue" />
                      </div>
                      <h3 className="text-xl font-bold mb-3">{benefit.title}</h3>
                      <p className="text-muted-foreground mb-2">{benefit.detail}</p>
                      <p className="text-sm text-dental-blue font-medium">{benefit.description}</p>
                    </CardContent>
                  </Card>
                </AnimatedText>
              );
            })}
          </div>
        </div>
      </ParallaxSection>

      {/* Echo AI Assistant Section */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-6">
          <AnimatedText className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="flex items-center justify-center gap-3">
                <Bot className="text-dental-blue" size={48} />
                Meet Echo, Your Personalized Healthcare AI
              </span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Our proprietary voice-enabled AI specializes in understanding your healthcare needs 
              to help you navigate your financial journey with confidence.
            </p>
          </AnimatedText>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {[
              'Answers financing questions 24/7',
              'Explains treatment payment options',  
              'Provides appointment reminders and payment notifications',
              'Guides you through the application process'
            ].map((feature, index) => (
              <AnimatedText key={index} delay={index * 0.1}>
                <Card className="text-center hover:shadow-soft transition-smooth hover:-translate-y-1">
                  <CardContent className="p-6">
                    <div className="w-12 h-12 rounded-xl bg-intelligence/10 flex items-center justify-center mx-auto mb-4">
                      <CheckCircle size={24} className="text-intelligence" />
                    </div>
                    <p className="text-muted-foreground">{feature}</p>
                  </CardContent>
                </Card>
              </AnimatedText>
            ))}
          </div>
        </div>
      </section>

      {/* Real Stories from Real Patients */}
      <ParallaxSection className="py-24 bg-gradient-subtle" offset={30}>
        <div className="container mx-auto px-6">
          <AnimatedText className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Real Stories from Real Patients
            </h2>
          </AnimatedText>

          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {patientStories.map((story, index) => (
              <AnimatedText key={index} delay={index * 0.2}>
                <Card className="hover:shadow-elegant transition-smooth hover:-translate-y-1 h-full">
                  <CardContent className="p-8">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-16 h-16 rounded-full bg-dental-peach/20 flex items-center justify-center">
                        <Users className="text-dental-peach" size={24} />
                      </div>
                      <div>
                        <h3 className="font-bold text-lg">{story.name}</h3>
                        <p className="text-muted-foreground">{story.subtitle}</p>
                      </div>
                    </div>
                    
                    <blockquote className="text-lg italic mb-4">
                      "{story.quote}"
                    </blockquote>
                    
                    <div className="border-t pt-4">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Treatment:</span>
                        <span className="font-semibold">{story.treatment}</span>
                      </div>
                      <div className="flex justify-between text-sm mt-1">
                        <span className="text-muted-foreground">Payment:</span>
                        <span className="font-semibold text-dental-blue">{story.payment}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </AnimatedText>
            ))}
          </div>
        </div>
      </ParallaxSection>

      {/* Financial Tools & Education */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-6">
          <AnimatedText className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Tools to Help You Plan
            </h2>
          </AnimatedText>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {financialTools.map((tool, index) => {
              const Icon = tool.icon;
              return (
                <AnimatedText key={index} delay={index * 0.2}>
                  <Card className="text-center hover:shadow-soft transition-smooth hover:-translate-y-1 h-full">
                    <CardContent className="p-6">
                      <div className="w-16 h-16 rounded-2xl bg-intelligence/10 flex items-center justify-center mx-auto mb-4">
                        <Icon size={32} className="text-intelligence" />
                      </div>
                      <h3 className="text-xl font-bold mb-3">{tool.title}</h3>
                      <p className="text-muted-foreground mb-2">{tool.description}</p>
                      <p className="text-sm text-dental-blue font-medium mb-4">{tool.benefit}</p>
                      <Button variant="outline" className="w-full">
                        {tool.cta}
                      </Button>
                    </CardContent>
                  </Card>
                </AnimatedText>
              );
            })}
          </div>
        </div>
      </section>

      {/* Peace of Mind Features */}
      <ParallaxSection className="py-24 bg-gradient-subtle" offset={30}>
        <div className="container mx-auto px-6">
          <AnimatedText className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Peace of Mind, Built-In
            </h2>
          </AnimatedText>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {peaceOfMindFeatures.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <AnimatedText key={index} delay={index * 0.1}>
                  <Card className="hover:shadow-soft transition-smooth hover:-translate-y-1 h-full">
                    <CardContent className="p-6">
                      <div className="w-16 h-16 rounded-2xl bg-dental-blue/10 flex items-center justify-center mx-auto mb-4">
                        <Icon size={32} className="text-dental-blue" />
                      </div>
                      <h3 className="text-lg font-bold mb-4">{feature.title}</h3>
                      <ul className="space-y-2">
                        {feature.features.map((item, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-sm text-muted-foreground">
                            <CheckCircle size={16} className="text-dental-blue mt-0.5 flex-shrink-0" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </AnimatedText>
              );
            })}
          </div>
        </div>
      </ParallaxSection>

      {/* Provider Network Highlights */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-6">
          <AnimatedText className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Trusted Providers in Your Area
            </h2>
          </AnimatedText>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-4xl mx-auto mb-12">
            <AnimatedText>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-2">1,200+</div>
                <div className="text-muted-foreground">verified providers nationwide</div>
              </div>
            </AnimatedText>
            <AnimatedText delay={0.1}>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-2">4.8/5</div>
                <div className="text-muted-foreground">average provider rating</div>
              </div>
            </AnimatedText>
            <AnimatedText delay={0.2}>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-2">All</div>
                <div className="text-muted-foreground">specialties covered</div>
              </div>
            </AnimatedText>
            <AnimatedText delay={0.3}>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-2">Same-Day</div>
                <div className="text-muted-foreground">treatment starts available</div>
              </div>
            </AnimatedText>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {[
              'Pre-screened, qualified dental professionals',
              'Consistent high-quality patient experience',
              'Standardized financial processes',
              'Guaranteed pricing transparency'
            ].map((benefit, index) => (
              <AnimatedText key={index} delay={index * 0.1}>
                <Card className="text-center hover:shadow-soft transition-smooth hover:-translate-y-1">
                  <CardContent className="p-6">
                    <div className="w-12 h-12 rounded-xl bg-dental-peach/10 flex items-center justify-center mx-auto mb-4">
                      <Award size={24} className="text-dental-peach" />
                    </div>
                    <p className="text-muted-foreground">{benefit}</p>
                  </CardContent>
                </Card>
              </AnimatedText>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-24 bg-dental-blue/10">
        <div className="container mx-auto px-6 text-center">
          <AnimatedText>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Your Perfect Smile Awaits
            </h2>
            <p className="text-xl mb-8 text-muted-foreground max-w-3xl mx-auto">
              Don't let cost be a barrier to the dental care you deserve. Over 1,200 providers 
              nationwide with financing options available at your first visit.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <Button
                size="lg"
                className="bg-primary text-primary-foreground hover:bg-primary/90 text-lg px-8 shadow-peach"
              >
                Find Providers Near Me
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="text-lg px-8 border-2"
              >
                Get Pre-Approved Now
              </Button>
              <Button
                size="lg"
                variant="link"
                className="text-lg px-8 text-primary"
              >
                Calculate My Payment
              </Button>
            </div>

            {/* Final Trust Elements */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-muted-foreground max-w-2xl mx-auto">
              <div className="flex items-center justify-center gap-2">
                <CheckCircle size={16} className="text-dental-blue" />
                No impact to credit score for pre-qualification
              </div>
              <div className="flex items-center justify-center gap-2">
                <CheckCircle size={16} className="text-dental-blue" />
                Instant decisions in under 60 seconds
              </div>
              <div className="flex items-center justify-center gap-2">
                <CheckCircle size={16} className="text-dental-blue" />
                24/7 patient support
              </div>
            </div>
          </AnimatedText>
        </div>
      </section>
    </div>
  );
};

export default Patients;