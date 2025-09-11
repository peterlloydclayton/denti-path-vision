import { motion } from 'framer-motion';
import { Brain, Zap, Target, TrendingUp, Shield, Users, ArrowRight, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ParallaxSection } from '@/components/ui/parallax-section';
import { AnimatedText, SplitText } from '@/components/ui/animated-text';

const IntelligentFinancing = () => {
  const pathFeatures = [
    {
      title: 'Predictive Analytics',
      description: 'Advanced algorithms analyze patient data to predict approval likelihood before application submission'
    },
    {
      title: 'Risk Assessment',
      description: 'Real-time risk evaluation using machine learning models trained on millions of data points'
    },
    {
      title: 'Outcome Optimization', 
      description: 'Continuous learning system that improves approval rates and reduces processing times'
    },
    {
      title: 'Behavioral Intelligence',
      description: 'Patient behavior analysis to customize financing options for maximum acceptance'
    }
  ];

  const scopeFeatures = [
    {
      title: 'Treatment Planning',
      description: 'Integration with practice management systems to optimize treatment recommendations'
    },
    {
      title: 'Financial Modeling',
      description: 'Dynamic pricing and payment plan generation based on patient financial profiles'
    },
    {
      title: 'Provider Intelligence',
      description: 'Practice-specific insights to maximize revenue and improve patient satisfaction'
    },
    {
      title: 'Market Analysis',
      description: 'Competitive intelligence and market positioning for optimal practice growth'
    }
  ];

  return (
    <div className="pt-24">
      {/* Hero Section */}
      <section className="py-24 bg-gradient-intelligence text-intelligence-foreground">
        <div className="container mx-auto px-6">
          <div className="max-w-5xl mx-auto text-center">
            <AnimatedText>
              <h1 className="text-hero-mobile md:text-hero font-bold mb-6">
                <SplitText text="PATH & SCOPE" className="block mb-4" />
                <span className="text-3xl md:text-5xl">
                  The Intelligence Behind DentiPay
                </span>
              </h1>
            </AnimatedText>
            
            <AnimatedText delay={0.3}>
              <p className="text-xl md:text-2xl mb-8 opacity-90 leading-relaxed max-w-3xl mx-auto">
                Our revolutionary AI platform doesn't just process payments — 
                it predicts outcomes, optimizes decisions, and transforms 
                how dental practices approach patient financing
              </p>
            </AnimatedText>

            <AnimatedText delay={0.5}>
              <Button
                size="lg"
                className="bg-white text-intelligence hover:bg-white/90 text-lg px-8"
              >
                See Intelligence in Action <ArrowRight className="ml-2" size={20} />
              </Button>
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
                      <h2 className="text-5xl font-bold">PATH</h2>
                      <p className="text-muted-foreground">Predictive Approval Technology Hub</p>
                    </div>
                  </div>
                </AnimatedText>

                <AnimatedText delay={0.2}>
                  <p className="text-xl leading-relaxed mb-8">
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
                          <p className="text-muted-foreground text-sm">{feature.description}</p>
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
                      <h2 className="text-5xl font-bold">SCOPE</h2>
                      <p className="text-muted-foreground">Strategic Care Optimization Platform Engine</p>
                    </div>
                  </div>
                </AnimatedText>

                <AnimatedText delay={0.2}>
                  <p className="text-xl leading-relaxed mb-8">
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
                          <p className="text-muted-foreground text-sm">{feature.description}</p>
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

      {/* Integration Benefits */}
      <ParallaxSection className="py-24 bg-background" offset={-30}>
        <div className="container mx-auto px-6">
          <AnimatedText className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              The Power of Integrated Intelligence
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
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

      {/* CTA Section */}
      <section className="py-24 bg-intelligence text-intelligence-foreground">
        <div className="container mx-auto px-6 text-center">
          <AnimatedText>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Experience the Future of Dental Finance
            </h2>
            <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
              See how PATH & SCOPE can transform your practice with 
              intelligence-driven financing solutions
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
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
                Download Whitepaper
              </Button>
            </div>
          </AnimatedText>
        </div>
      </section>
    </div>
  );
};

export default IntelligentFinancing;