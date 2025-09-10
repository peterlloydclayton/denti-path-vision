import { motion } from 'framer-motion';
import { ArrowRight, Brain, Zap, Shield, Users, TrendingUp, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ParallaxSection } from '@/components/ui/parallax-section';
import { AnimatedText, SplitText } from '@/components/ui/animated-text';
import { Link } from 'react-router-dom';

const Index = () => {
  const features = [
    {
      icon: Brain,
      title: 'AI-Driven Intelligence',
      description: 'PATH & SCOPE technology revolutionizes patient financing with predictive approvals',
      color: 'dental-blue'
    },
    {
      icon: Zap,
      title: 'Instant Decisions',
      description: 'Real-time approvals that eliminate waiting and maximize treatment acceptance',
      color: 'dental-lavender'
    },
    {
      icon: Shield,
      title: 'Secure & Compliant',
      description: 'Enterprise-grade security with full HIPAA and financial compliance',
      color: 'dental-peach'
    },
    {
      icon: Users,
      title: 'Patient-Centric',
      description: 'Seamless experience that puts patients first and providers second to none',
      color: 'dental-green'
    }
  ];

  const stats = [
    { value: '95%', label: 'Approval Rate', subtext: 'Higher than traditional financing' },
    { value: '<30s', label: 'Decision Time', subtext: 'Average approval speed' },
    { value: '300%', label: 'ROI Increase', subtext: 'For partner practices' },
    { value: '99.9%', label: 'Uptime', subtext: 'System reliability' }
  ];

  return (
    <div className="relative overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center bg-gradient-hero">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
        
        <ParallaxSection className="container mx-auto px-6 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: [0.25, 0.25, 0.25, 0.75] }}
            className="max-w-5xl mx-auto"
          >
            <AnimatedText delay={0.2}>
              <h1 className="text-hero-mobile md:text-hero font-bold text-white mb-6">
                The Future of{' '}
                <span className="bg-gradient-to-r from-dental-peach to-dental-lavender bg-clip-text text-transparent">
                  Patient Financing
                </span>
              </h1>
            </AnimatedText>

            <AnimatedText delay={0.4}>
              <p className="text-xl md:text-2xl text-white/90 mb-8 leading-relaxed max-w-3xl mx-auto">
                Where CareCredit Ends, <strong>DentiPay Begins</strong> — 
                Intelligent, Instant, and Integrated
              </p>
            </AnimatedText>

            <AnimatedText delay={0.6} from="bottom">
              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
                <Button
                  size="lg"
                  className="bg-white text-primary hover:bg-white/90 shadow-elegant text-lg px-8"
                  asChild
                >
                  <Link to="/providers">
                    For Providers <ArrowRight className="ml-2" size={20} />
                  </Link>
                </Button>
                
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white text-white hover:bg-white hover:text-primary text-lg px-8"
                  asChild
                >
                  <Link to="/patients">
                    For Patients
                  </Link>
                </Button>
              </div>
            </AnimatedText>

            <AnimatedText delay={0.8}>
              <div className="flex items-center justify-center gap-6 text-white/80">
                <div className="flex items-center gap-2">
                  <CheckCircle size={20} />
                  <span>No Credit Checks</span>
                </div>
                <div className="hidden sm:block w-px h-6 bg-white/20" />
                <div className="flex items-center gap-2">
                  <CheckCircle size={20} />
                  <span>Instant Approvals</span>
                </div>
                <div className="hidden sm:block w-px h-6 bg-white/20" />
                <div className="flex items-center gap-2">
                  <CheckCircle size={20} />
                  <span>AI-Powered</span>
                </div>
              </div>
            </AnimatedText>
          </motion.div>
        </ParallaxSection>
      </section>

      {/* Stats Section */}
      <ParallaxSection className="py-24 bg-background" offset={50}>
        <div className="container mx-auto px-6">
          <AnimatedText className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Transforming Dental Finance
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Real results from practices using DentiPay's intelligent financing platform
            </p>
          </AnimatedText>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <AnimatedText key={index} delay={index * 0.1}>
                <Card className="text-center hover:shadow-soft transition-smooth">
                  <CardContent className="p-6">
                    <div className="text-3xl md:text-4xl font-bold text-intelligence mb-2">
                      {stat.value}
                    </div>
                    <div className="font-semibold mb-1">{stat.label}</div>
                    <div className="text-sm text-muted-foreground">{stat.subtext}</div>
                  </CardContent>
                </Card>
              </AnimatedText>
            ))}
          </div>
        </div>
      </ParallaxSection>

      {/* Features Section */}
      <section className="py-24 bg-gradient-subtle">
        <div className="container mx-auto px-6">
          <AnimatedText className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Intelligence-First Platform
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Our PATH & SCOPE technology doesn't just process payments — 
              it predicts outcomes and optimizes every interaction
            </p>
          </AnimatedText>

          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <AnimatedText key={index} delay={index * 0.2}>
                  <Card className="group hover:shadow-elegant transition-smooth hover:-translate-y-1 h-full">
                    <CardContent className="p-8">
                      <div className={`w-16 h-16 rounded-2xl bg-${feature.color}/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-smooth`}>
                        <Icon size={32} className={`text-${feature.color.replace('-', '')}`} />
                      </div>
                      <h3 className="text-2xl font-bold mb-4">{feature.title}</h3>
                      <p className="text-muted-foreground leading-relaxed">
                        {feature.description}
                      </p>
                    </CardContent>
                  </Card>
                </AnimatedText>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <ParallaxSection className="py-24 bg-intelligence text-intelligence-foreground" offset={-30}>
        <div className="container mx-auto px-6 text-center">
          <AnimatedText>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Ready to Transform Your Practice?
            </h2>
            <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
              Join the revolution in dental financing. Experience the power of 
              intelligent approvals and watch your treatment acceptance soar.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-white text-intelligence hover:bg-white/90 text-lg px-8"
                asChild
              >
                <Link to="/providers">
                  Get Started Today <ArrowRight className="ml-2" size={20} />
                </Link>
              </Button>
              
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-intelligence text-lg px-8"
                asChild
              >
                <Link to="/intelligent-financing">
                  Learn About PATH & SCOPE
                </Link>
              </Button>
            </div>
          </AnimatedText>
        </div>
      </ParallaxSection>
    </div>
  );
};

export default Index;