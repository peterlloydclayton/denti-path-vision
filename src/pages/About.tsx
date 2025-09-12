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
    <div className="pt-24">
      {/* Hero Section */}
      <section className="py-24 bg-gradient-hero text-white">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <AnimatedText>
              <h1 className="text-hero-mobile md:text-hero font-bold mb-6 text-black">
                Transforming Dental Finance{' '}
                <span className="bg-gradient-to-r from-dental-peach to-dental-lavender bg-clip-text text-transparent">
                  Through Intelligence
                </span>
              </h1>
            </AnimatedText>
            
            <AnimatedText delay={0.2}>
              <p className="text-xl md:text-2xl mb-8 opacity-90 leading-relaxed text-black">
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
                  <h2 className="text-4xl md:text-5xl font-bold mb-6 text-black">Our Mission</h2>
                  <p className="text-xl leading-relaxed text-black mb-8">
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
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-black">
              Impact by Numbers
            </h2>
            <p className="text-xl text-black">
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
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-black">
              Our Core Values
            </h2>
            <p className="text-xl text-black max-w-3xl mx-auto">
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
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-black">
              Our Journey
            </h2>
            <p className="text-xl text-black">
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

      {/* Founder's Circle */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-6">
          <AnimatedText className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-black">
              Founder's Circle: From Vision to Velocity
            </h2>
            <p className="text-xl text-black max-w-4xl mx-auto">
              Breaking Barriers in Innovation, Access, and Profitability
            </p>
          </AnimatedText>

          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12">
              {/* Dr. Charles Zahédi */}
              <AnimatedText delay={0.1}>
                <Card className="shadow-elegant hover:shadow-elegant transition-smooth hover:-translate-y-1 h-full">
                  <CardContent className="p-8">
                    <div className="mb-6">
                      <h3 className="text-2xl font-bold mb-2 text-black">Dr. Charles Zahédi</h3>
                      <p className="text-lg text-intelligence font-medium">Co-Founder</p>
                    </div>
                    <p className="text-muted-foreground leading-relaxed">
                      Dr. Charles Zahédi is an accomplished clinician, innovator, and business strategist with over 34 years of experience in dentistry and healthcare systems. After earning his dental degree, he built a reputation for developing advanced treatment protocols and scalable care delivery models that improve patient outcomes while expanding access to care.
                    </p>
                    <p className="text-muted-foreground leading-relaxed mt-4">
                      Throughout his career, Dr. Zahédi has combined clinical expertise with a passion for innovation, integrating technologies like AI-driven treatment planning, in-house lab workflows, and patient-friendly financing models. He has served diverse patient populations, with a focus on underserved and aging communities, and has trained teams to deliver care at scale without sacrificing quality.
                    </p>
                    <p className="text-muted-foreground leading-relaxed mt-4">
                      Dr. Zahédi's work reflects a lifelong commitment to transforming dental care by bridging the gap between clinical excellence, patient affordability, and operational efficiency.
                    </p>
                  </CardContent>
                </Card>
              </AnimatedText>

              {/* Dr. Emelio Arguello */}
              <AnimatedText delay={0.2}>
                <Card className="shadow-elegant hover:shadow-elegant transition-smooth hover:-translate-y-1 h-full">
                  <CardContent className="p-8">
                    <div className="mb-6">
                      <h3 className="text-2xl font-bold mb-2 text-black">Dr. Emilio Argüello</h3>
                      <p className="text-lg text-intelligence font-medium">Co-Founder</p>
                    </div>
                    <p className="text-muted-foreground leading-relaxed">
                      Dr. Emilio Argüello was born and raised in Mexico City. After graduating from dental school at the Universidad Autónoma Metropolitana, he moved to the U.S. in 1998 following time abroad as a competitive fencer. He earned his dental degree and specialty training in Periodontics at Tufts University and is now a Board-Certified Periodontist.
                    </p>
                    <p className="text-muted-foreground leading-relaxed mt-4">
                      For nearly 20 years, Dr. Argüello has served as core faculty and researcher at Harvard University, co-authoring textbooks and numerous peer-reviewed publications. Over the last 15 years, he has built and transitioned multiple dental companies, advised leading organizations, and served on academic and industry boards.
                    </p>
                    <p className="text-muted-foreground leading-relaxed mt-4">
                      Most recently, he co-founded Mexico Dental Implants, delivering advanced oral rehabilitation services to international patients across certified clinics in Mexico. He also maintains a private practice at Altura Periodontics in Denver, while his wife, Dr. Caitlin White, practices at Foundations Orthodontics.
                    </p>
                  </CardContent>
                </Card>
              </AnimatedText>
            </div>
          </div>
        </div>
      </section>

      {/* Leadership Team */}
      <ParallaxSection className="py-24 bg-gradient-subtle" offset={30}>
        <div className="container mx-auto px-6">
          <AnimatedText className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-black">
              Leadership That Builds Revolutions
            </h2>
            <p className="text-xl text-black max-w-4xl mx-auto">
              Where innovation meets execution — and disruption becomes inevitable.
            </p>
          </AnimatedText>

          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8">
              {/* Adam Zuckerman */}
              <AnimatedText delay={0.1}>
                <Card className="shadow-elegant hover:shadow-elegant transition-smooth hover:-translate-y-1 h-full">
                  <CardContent className="p-8">
                    <div className="mb-6">
                      <h3 className="text-2xl font-bold mb-2 text-black">Adam Zuckerman</h3>
                      <p className="text-lg text-dental-peach font-medium">Founder/CEO</p>
                    </div>
                    <p className="text-muted-foreground leading-relaxed">
                      Adam Zuckerman is the Founder and CEO of DentiPay, an AI-powered behavioral financing platform revolutionizing patient approvals and provider profitability. A proven fintech innovator and strategic operator, Adam specializes in building high-growth ventures at the intersection of AI, finance, and healthcare. His leadership has consistently driven rapid expansion and strategic partnerships across multiple ventures in these sectors.
                    </p>
                  </CardContent>
                </Card>
              </AnimatedText>

              {/* Jay Oku */}
              <AnimatedText delay={0.2}>
                <Card className="shadow-elegant hover:shadow-elegant transition-smooth hover:-translate-y-1 h-full">
                  <CardContent className="p-8">
                    <div className="mb-6">
                      <h3 className="text-2xl font-bold mb-2 text-black">Jay Oku</h3>
                      <p className="text-lg text-dental-blue font-medium">Chief Business Officer</p>
                    </div>
                    <p className="text-muted-foreground leading-relaxed">
                      As DentiPay's Chief Business Officer, Jay Oku leads business strategy, provider growth, and capital partnerships. With over 15 years in real estate finance, he is known for innovative underwriting and ethical origination. Jay has successfully launched and scaled purpose-driven ventures, expanding brands into 38 international markets. He applies his foundation of integrity and discipline to align fintech with human outcomes at DentiPay, making patient financing intelligent, ethical, and accessible for all.
                    </p>
                  </CardContent>
                </Card>
              </AnimatedText>

              {/* Dr. Donald R. Thorne */}
              <AnimatedText delay={0.3}>
                <Card className="shadow-elegant hover:shadow-elegant transition-smooth hover:-translate-y-1 h-full">
                  <CardContent className="p-8">
                    <div className="mb-6">
                      <h3 className="text-2xl font-bold mb-2 text-black">Dr. Donald R. Thorne</h3>
                      <p className="text-lg text-intelligence font-medium">Co-Founder & Chairman</p>
                    </div>
                    <p className="text-muted-foreground leading-relaxed">
                      Dr. Thorne is DentiPay's Co-Founder and Chairman. A veteran serial entrepreneur, he brings decades of expertise in marketing, finance, distribution, and M&A. He co-founded NAID and Instashred, leading Instashred to a landmark exit in 2000 for nearly $100 million. Today, Don invests in and advises ventures across technology, healthcare, and fintech, accelerating growth through strategic capital and operational excellence.
                    </p>
                  </CardContent>
                </Card>
              </AnimatedText>

              {/* Nuttalya Reussi */}
              <AnimatedText delay={0.4}>
                <Card className="shadow-elegant hover:shadow-elegant transition-smooth hover:-translate-y-1 h-full">
                  <CardContent className="p-8">
                    <div className="mb-6">
                      <h3 className="text-2xl font-bold mb-2 text-black">Nuttalya Reussi</h3>
                      <p className="text-lg text-dental-lavender font-medium">Chief Operating Officer</p>
                    </div>
                    <p className="text-muted-foreground leading-relaxed">
                      Ms. Reussi is DentiPay's Chief Operating Officer, overseeing operational strategy and market expansion. A seasoned strategic marketer, she excels in building high-impact campaigns that drive provider engagement and brand visibility. With expertise in global communications and cross-market collaborations, Nuttayla holds a master's degree from Kyiv National Linguistic University in Ukraine.
                    </p>
                  </CardContent>
                </Card>
              </AnimatedText>

              {/* Michael Weydemuller */}
              <AnimatedText delay={0.5}>
                <Card className="shadow-elegant hover:shadow-elegant transition-smooth hover:-translate-y-1 h-full">
                  <CardContent className="p-8">
                    <div className="mb-6">
                      <h3 className="text-2xl font-bold mb-2 text-black">Michael Weydemuller</h3>
                      <p className="text-lg text-dental-green font-medium">Growth & Capital</p>
                    </div>
                    <p className="text-muted-foreground leading-relaxed">
                      Michael Weydemuller is the Founding Partner of Growth & Capital at DentiPay, leading provider acquisition, capital strategy, and market expansion. With over 25 years of experience in taxation, compliance, and capital markets, he is instrumental in fueling DentiPay's rapid scale through operational discipline and entrepreneurial instinct.
                    </p>
                  </CardContent>
                </Card>
              </AnimatedText>

              {/* Colin Dedely */}
              <AnimatedText delay={0.6}>
                <Card className="shadow-elegant hover:shadow-elegant transition-smooth hover:-translate-y-1 h-full">
                  <CardContent className="p-8">
                    <div className="mb-6">
                      <h3 className="text-2xl font-bold mb-2 text-black">Colin Dedely</h3>
                      <p className="text-lg text-dental-peach font-medium">Technology & Credit Systems</p>
                    </div>
                    <p className="text-muted-foreground leading-relaxed">
                      Colin Dedely is the Founding Partner of Technology & Credit Systems at DentiPay, where he leads the development of the platform's fintech architecture, patient pre-approval engine, and provider credit optimization systems. With a proven track record of securing more than $80 million in consumer financing at an industry-leading 90% approval rate.
                    </p>
                  </CardContent>
                </Card>
              </AnimatedText>
            </div>
          </div>
        </div>
      </ParallaxSection>

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
              <Card className="bg-background/95 backdrop-blur border-border shadow-soft">
                <CardContent className="p-6 text-center">
                  <TrendingUp className="mx-auto mb-3 text-accent-peach" size={32} />
                  <div className="font-bold text-foreground">Global Expansion</div>
                  <div className="text-sm text-muted-foreground">Bringing intelligent financing worldwide</div>
                </CardContent>
              </Card>
              
              <Card className="bg-background/95 backdrop-blur border-border shadow-soft">
                <CardContent className="p-6 text-center">
                  <Award className="mx-auto mb-3 text-accent-lavender" size={32} />
                  <div className="font-bold text-foreground">Healthcare Integration</div>
                  <div className="text-sm text-muted-foreground">Expanding beyond dental to all healthcare</div>
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