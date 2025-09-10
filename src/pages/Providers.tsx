import { motion } from 'framer-motion';
import { TrendingUp, Users, Clock, Shield, ArrowRight, CheckCircle, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ParallaxSection } from '@/components/ui/parallax-section';
import { AnimatedText } from '@/components/ui/animated-text';
import teamImage from '@/assets/dental-team.jpg';

const Providers = () => {
  const benefits = [
    {
      icon: TrendingUp,
      title: 'Increase Treatment Acceptance',
      description: 'Our AI-driven approvals increase patient acceptance rates by 40% on average',
      metric: '40% Higher Acceptance'
    },
    {
      icon: Clock,
      title: 'Instant Approvals',
      description: 'PATH & SCOPE technology delivers decisions in under 30 seconds',
      metric: '<30 Second Decisions'
    },
    {
      icon: Shield,
      title: 'Risk Protection',
      description: 'Comprehensive fraud protection and guaranteed payments',
      metric: '99.9% Payment Security'
    },
    {
      icon: Users,
      title: 'Patient Satisfaction',
      description: 'Seamless financing experience that patients love',
      metric: '4.9/5 Patient Rating'
    }
  ];

  const features = [
    'Real-time credit decisions',
    'Multiple financing options',
    'Seamless practice integration',
    'Comprehensive reporting dashboard',
    'Dedicated support team',
    'No setup or monthly fees'
  ];

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="py-24 bg-background">
        {/* Hero Image Background */}
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-5"
          style={{ backgroundImage: `url(${teamImage})` }}
        />
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <AnimatedText>
              <h1 className="text-hero-mobile md:text-hero font-bold mb-6">
                Transform Your Practice with{' '}
                <span className="relative">
                  Intelligent Financing
                  <div className="absolute bottom-0 left-0 w-full h-1 bg-dental-lavender rounded-full"></div>
                </span>
              </h1>
            </AnimatedText>
            
            <AnimatedText delay={0.2}>
              <p className="text-xl md:text-2xl mb-8 text-muted-foreground leading-relaxed">
                Join thousands of dental practices using DentiPay's AI-powered 
                financing platform to increase treatment acceptance and grow revenue
              </p>
            </AnimatedText>

            <AnimatedText delay={0.4}>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 text-lg px-8 shadow-elegant">
                  Start Free Trial <ArrowRight className="ml-2" size={20} />
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="border-primary text-primary hover:bg-primary hover:text-primary-foreground text-lg px-8"
                >
                  Schedule Demo
                </Button>
              </div>
            </AnimatedText>
          </div>
        </div>
      </section>

      {/* Benefits Grid */}
      <ParallaxSection className="py-24 bg-background" offset={30}>
        <div className="container mx-auto px-6">
          <AnimatedText className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Why Providers Choose DentiPay
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Our intelligence-first platform delivers measurable results 
              for dental practices of all sizes
            </p>
          </AnimatedText>

          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <AnimatedText key={index} delay={index * 0.1}>
                  <Card className="group hover:shadow-elegant transition-smooth hover:-translate-y-1 h-full">
                    <CardContent className="p-8">
              <div className="flex items-center justify-between mb-6">
                <div className="w-16 h-16 rounded-2xl bg-dental-blue/10 flex items-center justify-center group-hover:bg-dental-blue/20 transition-smooth">
                  <Icon size={32} className="text-dental-blue" />
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-dental-blue">
                    {benefit.metric}
                  </div>
                </div>
              </div>
                      <h3 className="text-2xl font-bold mb-4">{benefit.title}</h3>
                      <p className="text-muted-foreground leading-relaxed">
                        {benefit.description}
                      </p>
                    </CardContent>
                  </Card>
                </AnimatedText>
              );
            })}
          </div>
        </div>
      </ParallaxSection>

      {/* Features Section */}
      <section className="py-24 bg-secondary">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center max-w-6xl mx-auto">
            <div>
              <AnimatedText>
                <h2 className="text-4xl md:text-5xl font-bold mb-6">
                  Everything You Need to Succeed
                </h2>
                <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                  DentiPay provides all the tools and support your practice 
                  needs to offer seamless patient financing
                </p>
              </AnimatedText>

              <div className="space-y-4">
                {features.map((feature, index) => (
                  <AnimatedText key={index} delay={index * 0.1}>
                    <div className="flex items-center gap-3">
                      <CheckCircle size={20} className="text-dental-blue flex-shrink-0" />
                      <span className="text-lg">{feature}</span>
                    </div>
                  </AnimatedText>
                ))}
              </div>
            </div>

            <AnimatedText delay={0.3} from="right">
              <Card className="shadow-elegant">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <Star className="text-dental-peach" size={24} />
                    Provider Dashboard Preview
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="bg-secondary/50 p-6 rounded-lg">
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-muted-foreground">Today's Approvals</span>
                        <span className="text-2xl font-bold text-dental-blue">47</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-muted-foreground">Revenue Generated</span>
                        <span className="text-2xl font-bold text-dental-green">$23,400</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-muted-foreground">Acceptance Rate</span>
                        <span className="text-2xl font-bold text-dental-peach">94%</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </AnimatedText>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <ParallaxSection className="py-24 bg-primary text-primary-foreground" offset={-20}>
        <div className="container mx-auto px-6 text-center">
          <AnimatedText>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Ready to Get Started?
            </h2>
            <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
              Join the revolution in dental financing. Set up your account 
              in minutes and start approving patients today.
            </p>
            
            <Button
              size="lg"
              className="bg-background text-primary hover:bg-background/90 text-lg px-8 shadow-peach"
            >
              Start Your Free Trial <ArrowRight className="ml-2" size={20} />
            </Button>
          </AnimatedText>
        </div>
      </ParallaxSection>
    </div>
  );
};

export default Providers;