import { motion } from 'framer-motion';
import { Users, Award, TrendingUp, Heart, Target, Lightbulb } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { ParallaxSection } from '@/components/ui/parallax-section';
import { AnimatedText } from '@/components/ui/animated-text';

const About = () => {
  const values = [
    {
      icon: Heart,
      title: 'Patient-First',
      description: 'Every decision we make prioritizes patient access to quality dental care'
    },
    {
      icon: Lightbulb,
      title: 'Innovation',
      description: 'Pioneering AI-driven solutions that reshape the healthcare finance industry'
    },
    {
      icon: Target,
      title: 'Excellence',
      description: 'Delivering unparalleled service and outcomes for providers and patients alike'
    },
    {
      icon: Users,
      title: 'Partnership',
      description: 'Building lasting relationships based on trust, transparency, and mutual success'
    }
  ];

  const milestones = [
    {
      year: '2020',
      title: 'Company Founded',
      description: 'DentiPay was founded with a mission to democratize access to dental care through intelligent financing'
    },
    {
      year: '2021',
      title: 'PATH Technology Launch',
      description: 'Introduced our revolutionary Predictive Approval Technology Hub, transforming approval processes'
    },
    {
      year: '2022',
      title: 'SCOPE Integration',
      description: 'Launched Strategic Care Optimization Platform Engine for comprehensive practice intelligence'
    },
    {
      year: '2023',
      title: 'National Expansion',
      description: 'Reached 10,000+ dental practices nationwide, processing over $1B in patient financing'
    },
    {
      year: '2024',
      title: 'AI Enhancement',
      description: 'Advanced our AI capabilities with machine learning models achieving 97%+ predictive accuracy'
    }
  ];

  const stats = [
    { value: '10,000+', label: 'Dental Practices' },
    { value: '2M+', label: 'Patients Served' },
    { value: '$1.5B+', label: 'Financing Processed' },
    { value: '97%', label: 'Approval Accuracy' }
  ];

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="py-24 bg-gradient-hero text-white">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <AnimatedText>
              <h1 className="text-hero-mobile md:text-hero font-bold mb-6">
                Transforming Dental Finance{' '}
                <span className="bg-gradient-to-r from-dental-peach to-dental-lavender bg-clip-text text-transparent">
                  Through Intelligence
                </span>
              </h1>
            </AnimatedText>
            
            <AnimatedText delay={0.2}>
              <p className="text-xl md:text-2xl mb-8 opacity-90 leading-relaxed">
                DentiPay is pioneering a new category of healthcare finance — 
                where artificial intelligence meets human compassion to make 
                dental care accessible to everyone
              </p>
            </AnimatedText>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <ParallaxSection className="py-24 bg-background" offset={30}>
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div>
                <AnimatedText>
                  <h2 className="text-4xl md:text-5xl font-bold mb-6">Our Mission</h2>
                  <p className="text-xl leading-relaxed text-muted-foreground mb-8">
                    To eliminate financial barriers in dental care by creating the most 
                    intelligent, patient-centered financing platform in healthcare. 
                    We believe everyone deserves access to quality dental treatment, 
                    regardless of their financial situation.
                  </p>
                </AnimatedText>
              </div>

              <AnimatedText delay={0.2} from="right">
                <Card className="shadow-elegant">
                  <CardContent className="p-8">
                    <h3 className="text-2xl font-bold mb-4">Our Vision</h3>
                    <p className="text-lg leading-relaxed text-muted-foreground">
                      A world where dental health is never compromised by financial constraints — 
                      where advanced AI technology seamlessly connects patients with the care 
                      they need and providers with the growth they deserve.
                    </p>
                  </CardContent>
                </Card>
              </AnimatedText>
            </div>
          </div>
        </div>
      </ParallaxSection>

      {/* Company Stats */}
      <section className="py-24 bg-gradient-subtle">
        <div className="container mx-auto px-6">
          <AnimatedText className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Impact by Numbers
            </h2>
            <p className="text-xl text-muted-foreground">
              Measurable results that demonstrate our commitment to transforming dental finance
            </p>
          </AnimatedText>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            {stats.map((stat, index) => (
              <AnimatedText key={index} delay={index * 0.1}>
                <div className="text-center">
                  <div className="text-4xl md:text-5xl font-bold text-intelligence mb-2">
                    {stat.value}
                  </div>
                  <div className="text-muted-foreground font-medium">{stat.label}</div>
                </div>
              </AnimatedText>
            ))}
          </div>
        </div>
      </section>

      {/* Company Values */}
      <ParallaxSection className="py-24 bg-background" offset={-20}>
        <div className="container mx-auto px-6">
          <AnimatedText className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Our Core Values
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              The principles that guide every decision, innovation, and relationship we build
            </p>
          </AnimatedText>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <AnimatedText key={index} delay={index * 0.15}>
                  <Card className="hover:shadow-elegant transition-smooth hover:-translate-y-1 h-full">
                    <CardContent className="p-8">
                      <div className="flex items-start gap-6">
                        <div className="w-16 h-16 rounded-2xl bg-intelligence/10 flex items-center justify-center flex-shrink-0">
                          <Icon size={32} className="text-intelligence" />
                        </div>
                        <div>
                          <h3 className="text-2xl font-bold mb-3">{value.title}</h3>
                          <p className="text-muted-foreground leading-relaxed">
                            {value.description}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </AnimatedText>
              );
            })}
          </div>
        </div>
      </ParallaxSection>

      {/* Company Timeline */}
      <section className="py-24 bg-gradient-subtle">
        <div className="container mx-auto px-6">
          <AnimatedText className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Our Journey
            </h2>
            <p className="text-xl text-muted-foreground">
              Key milestones in our mission to transform dental finance
            </p>
          </AnimatedText>

          <div className="max-w-4xl mx-auto">
            <div className="space-y-12">
              {milestones.map((milestone, index) => (
                <AnimatedText key={index} delay={index * 0.1}>
                  <div className="flex gap-8 items-start">
                    <div className="flex-shrink-0 w-24 text-right">
                      <div className="text-2xl font-bold text-intelligence">{milestone.year}</div>
                    </div>
                    
                    <div className="flex-shrink-0 w-4 h-4 rounded-full bg-intelligence mt-2"></div>
                    
                    <Card className="flex-grow hover:shadow-soft transition-smooth">
                      <CardContent className="p-6">
                        <h3 className="text-xl font-bold mb-2">{milestone.title}</h3>
                        <p className="text-muted-foreground">{milestone.description}</p>
                      </CardContent>
                    </Card>
                  </div>
                </AnimatedText>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Future Vision */}
      <ParallaxSection className="py-24 bg-intelligence text-intelligence-foreground" offset={-30}>
        <div className="container mx-auto px-6 text-center">
          <AnimatedText>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              The Future We're Building
            </h2>
            <p className="text-xl mb-8 opacity-90 max-w-3xl mx-auto leading-relaxed">
              We're just getting started. Our vision extends beyond dental finance 
              to revolutionize healthcare accessibility through intelligent technology, 
              compassionate service, and unwavering commitment to patient care.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Card className="bg-white/10 backdrop-blur border-white/20">
                <CardContent className="p-6 text-center">
                  <TrendingUp className="mx-auto mb-3 text-dental-peach" size={32} />
                  <div className="font-bold">Global Expansion</div>
                  <div className="text-sm opacity-80">Bringing intelligent financing worldwide</div>
                </CardContent>
              </Card>
              
              <Card className="bg-white/10 backdrop-blur border-white/20">
                <CardContent className="p-6 text-center">
                  <Award className="mx-auto mb-3 text-dental-lavender" size={32} />
                  <div className="font-bold">Healthcare Integration</div>
                  <div className="text-sm opacity-80">Expanding beyond dental to all healthcare</div>
                </CardContent>
              </Card>
            </div>
          </AnimatedText>
        </div>
      </ParallaxSection>
    </div>
  );
};

export default About;