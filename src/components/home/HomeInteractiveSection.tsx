import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Users, 
  Heart, 
  TrendingUp, 
  DollarSign, 
  Target, 
  ArrowRight,
  CheckCircle,
  Stethoscope,
  CreditCard,
  Clock,
  Zap,
  Building2,
  UserCheck,
  Globe,
  Shield
} from 'lucide-react';
import { ScrollReveal, StaggerContainer, StaggerItem } from '@/components/ui/enhanced-animations';

export const HomeInteractiveSection = () => {
  const [activeTab, setActiveTab] = useState('providers');

  const providerBenefits = [
    { icon: TrendingUp, title: "300% Increase", desc: "in treatment acceptance rates" },
    { icon: Clock, title: "30 Seconds", desc: "average approval time" },
    { icon: DollarSign, title: "Same Day", desc: "payment guaranteed" },
    { icon: Target, title: "94% Success", desc: "approval rate vs 60% industry average" }
  ];

  const patientBenefits = [
    { icon: Heart, title: "Instant Approval", desc: "Know your options in 30 seconds" },
    { icon: CreditCard, title: "Flexible Terms", desc: "3-8 year payment options" },
    { icon: CheckCircle, title: "No Credit Impact", desc: "Soft credit check only" },
    { icon: Zap, title: "Same Day Care", desc: "Start treatment immediately" }
  ];

  const providerFeatures = [
    "AI-powered pre-qualification system",
    "Seamless PMS integration", 
    "Real-time revenue analytics",
    "Zero recourse financing",
    "Automated payment processing",
    "Advanced fraud protection"
  ];

  const patientFeatures = [
    "Voice-enabled AI assistant (Echo)",
    "Instant pre-approval process",
    "Flexible payment structures",
    "Provider network access",
    "Treatment timeline guidance",
    "24/7 support availability"
  ];

  return (
    <section className="py-24 bg-gradient-to-b from-background to-surface">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-primary/10 to-accent/10 border border-primary/20 text-primary font-medium text-sm mb-6">
            <Users className="w-4 h-4" />
            Choose Your Path
          </div>
          
          <h2 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
            Experience the 
            <span className="bg-gradient-to-r from-primary via-accent to-success bg-clip-text text-transparent block">
              DentiPay Revolution
            </span>
          </h2>
          
          <p className="text-xl text-muted-foreground max-w-4xl mx-auto mb-8">
            Whether you're a dental provider looking to transform your practice or a patient seeking better care options, 
            DentiPay has a revolutionary solution designed specifically for you.
          </p>
        </ScrollReveal>

        {/* Interactive Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <div className="flex justify-center mb-12">
            <TabsList className="grid w-full max-w-md grid-cols-2 bg-muted/50 p-1 rounded-2xl">
              <TabsTrigger 
                value="providers" 
                className="flex items-center gap-2 px-6 py-3 rounded-xl data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all duration-300"
              >
                <Stethoscope className="w-4 h-4" />
                <span className="font-medium">For Providers</span>
              </TabsTrigger>
              <TabsTrigger 
                value="patients"
                className="flex items-center gap-2 px-6 py-3 rounded-xl data-[state=active]:bg-accent data-[state=active]:text-accent-foreground transition-all duration-300"
              >
                <Heart className="w-4 h-4" />
                <span className="font-medium">For Patients</span>
              </TabsTrigger>
            </TabsList>
          </div>

          {/* Provider Content */}
          <TabsContent value="providers" className="mt-0">
            <AnimatePresence mode="wait">
              <motion.div
                key="providers"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
              >
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                  {/* Provider Value Proposition */}
                  <Card className="border-primary/30 bg-gradient-to-br from-primary/5 to-primary/10">
                    <CardContent className="p-8">
                      <div className="flex items-center gap-3 mb-6">
                        <div className="p-3 bg-primary/20 rounded-xl">
                          <Building2 className="w-6 h-6 text-primary" />
                        </div>
                        <h3 className="text-2xl font-bold text-foreground">Transform Your Practice</h3>
                      </div>

                      <p className="text-muted-foreground mb-6 leading-relaxed">
                        Join thousands of practices that have revolutionized their financing with DentiPay's 
                        AI-powered platform. See dramatic increases in treatment acceptance while getting paid the same day.
                      </p>

                      <div className="space-y-4 mb-8">
                        {providerFeatures.map((feature, index) => (
                          <motion.div
                            key={index}
                            className="flex items-center gap-3"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.3, delay: index * 0.1 }}
                          >
                            <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                            <span className="text-foreground">{feature}</span>
                          </motion.div>
                        ))}
                      </div>

                      <div className="space-y-4">
                        <Button className="w-full" size="lg">
                          Learn More About Provider Solutions
                          <ArrowRight className="w-4 h-4 ml-2" />
                        </Button>
                        <Button variant="outline" className="w-full" size="lg">
                          Schedule Demo
                          <Globe className="w-4 h-4 ml-2" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Provider Stats & Benefits */}
                  <div className="space-y-8">
                    <div className="text-center lg:text-left">
                      <h3 className="text-3xl font-bold text-foreground mb-4">
                        Results That Transform Practices
                      </h3>
                      <p className="text-muted-foreground mb-6">
                        See the measurable impact DentiPay has on practice revenue, 
                        patient acceptance, and operational efficiency.
                      </p>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <motion.div
                        className="p-6 rounded-xl bg-primary/10 border border-primary/20 text-center"
                        whileHover={{ scale: 1.05, y: -4 }}
                      >
                        <div className="text-3xl font-bold text-primary mb-2">94%</div>
                        <div className="text-sm text-muted-foreground">Approval Rate</div>
                      </motion.div>

                      <motion.div
                        className="p-6 rounded-xl bg-success/10 border border-success/20 text-center"
                        whileHover={{ scale: 1.05, y: -4 }}
                      >
                        <div className="text-3xl font-bold text-success mb-2">300%</div>
                        <div className="text-sm text-muted-foreground">Acceptance Increase</div>
                      </motion.div>

                      <motion.div
                        className="p-6 rounded-xl bg-accent/10 border border-accent/20 text-center"
                        whileHover={{ scale: 1.05, y: -4 }}
                      >
                        <div className="text-3xl font-bold text-accent mb-2">30 sec</div>
                        <div className="text-sm text-muted-foreground">Decision Time</div>
                      </motion.div>

                      <motion.div
                        className="p-6 rounded-xl bg-primary/10 border border-primary/20 text-center"
                        whileHover={{ scale: 1.05, y: -4 }}
                      >
                        <div className="text-3xl font-bold text-primary mb-2">$0</div>
                        <div className="text-sm text-muted-foreground">Setup Costs</div>
                      </motion.div>
                    </div>

                    <motion.div
                      className="p-6 rounded-xl bg-gradient-to-r from-primary/10 to-success/10 border border-primary/20"
                      whileHover={{ scale: 1.02 }}
                    >
                      <div className="flex items-start gap-4">
                        <div className="p-2 bg-primary/20 rounded-lg">
                          <Shield className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-foreground mb-2">Risk-Free Guarantee</h4>
                          <p className="text-sm text-muted-foreground">
                            Zero recourse financing means you get paid upfront regardless of patient defaults. 
                            Your practice is completely protected.
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  </div>
                </div>

                {/* Provider Benefits */}
                <StaggerContainer className="grid md:grid-cols-4 gap-6 mt-16" staggerDelay={0.1}>
                  {providerBenefits.map((benefit, index) => (
                    <StaggerItem key={index}>
                      <motion.div
                        className="text-center p-6 rounded-xl bg-primary/5 border border-primary/20 hover:bg-primary/10 transition-all duration-300"
                        whileHover={{ y: -4 }}
                      >
                        <div className="p-3 bg-primary/20 rounded-full w-fit mx-auto mb-4">
                          <benefit.icon className="w-6 h-6 text-primary" />
                        </div>
                        <h4 className="font-bold text-foreground mb-2">{benefit.title}</h4>
                        <p className="text-sm text-muted-foreground">{benefit.desc}</p>
                      </motion.div>
                    </StaggerItem>
                  ))}
                </StaggerContainer>
              </motion.div>
            </AnimatePresence>
          </TabsContent>

          {/* Patient Content */}
          <TabsContent value="patients" className="mt-0">
            <AnimatePresence mode="wait">
              <motion.div
                key="patients"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
              >
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                  {/* Patient Value Proposition */}
                  <Card className="border-accent/30 bg-gradient-to-br from-accent/5 to-accent/10">
                    <CardContent className="p-8">
                      <div className="flex items-center gap-3 mb-6">
                        <div className="p-3 bg-accent/20 rounded-xl">
                          <UserCheck className="w-6 h-6 text-accent" />
                        </div>
                        <h3 className="text-2xl font-bold text-foreground">Access Better Care</h3>
                      </div>

                      <p className="text-muted-foreground mb-6 leading-relaxed">
                        Don't let finances delay your dental health. DentiPay's revolutionary AI makes 
                        quality dental care accessible with instant approvals and flexible payment solutions designed for you.
                      </p>

                      <div className="space-y-4 mb-8">
                        {patientFeatures.map((feature, index) => (
                          <motion.div
                            key={index}
                            className="flex items-center gap-3"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.3, delay: index * 0.1 }}
                          >
                            <CheckCircle className="w-5 h-5 text-accent flex-shrink-0" />
                            <span className="text-foreground">{feature}</span>
                          </motion.div>
                        ))}
                      </div>

                      <div className="space-y-4">
                        <Button className="w-full bg-accent hover:bg-accent/90" size="lg">
                          Learn More About Patient Benefits
                          <ArrowRight className="w-4 h-4 ml-2" />
                        </Button>
                        <Button variant="outline" className="w-full" size="lg">
                          Find Providers Near You
                          <Globe className="w-4 h-4 ml-2" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Patient Benefits & Features */}
                  <div className="space-y-8">
                    <div className="text-center lg:text-left">
                      <h3 className="text-3xl font-bold text-foreground mb-4">
                        Healthcare Financing Reimagined
                      </h3>
                      <p className="text-muted-foreground mb-6">
                        Experience the future of dental financing with AI that understands 
                        your needs and provides instant, personalized solutions.
                      </p>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <motion.div
                        className="p-6 rounded-xl bg-accent/10 border border-accent/20 text-center"
                        whileHover={{ scale: 1.05, y: -4 }}
                      >
                        <div className="text-3xl font-bold text-accent mb-2">95%</div>
                        <div className="text-sm text-muted-foreground">Approval Rate</div>
                      </motion.div>

                      <motion.div
                        className="p-6 rounded-xl bg-success/10 border border-success/20 text-center"
                        whileHover={{ scale: 1.05, y: -4 }}
                      >
                        <div className="text-3xl font-bold text-success mb-2">30 sec</div>
                        <div className="text-sm text-muted-foreground">To Approval</div>
                      </motion.div>

                      <motion.div
                        className="p-6 rounded-xl bg-primary/10 border border-primary/20 text-center"
                        whileHover={{ scale: 1.05, y: -4 }}
                      >
                        <div className="text-3xl font-bold text-primary mb-2">$100K</div>
                        <div className="text-sm text-muted-foreground">Max Financing</div>
                      </motion.div>

                      <motion.div
                        className="p-6 rounded-xl bg-accent/10 border border-accent/20 text-center"
                        whileHover={{ scale: 1.05, y: -4 }}
                      >
                        <div className="text-3xl font-bold text-accent mb-2">8 Years</div>
                        <div className="text-sm text-muted-foreground">Payment Terms</div>
                      </motion.div>
                    </div>

                    <motion.div
                      className="p-6 rounded-xl bg-gradient-to-r from-accent/10 to-success/10 border border-accent/20"
                      whileHover={{ scale: 1.02 }}
                    >
                      <div className="flex items-start gap-4">
                        <div className="p-2 bg-accent/20 rounded-lg">
                          <Heart className="w-5 h-5 text-accent" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-foreground mb-2">No Credit Score Impact</h4>
                          <p className="text-sm text-muted-foreground">
                            Our soft credit check process means checking your eligibility won't affect your credit score. 
                            Get approved risk-free.
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  </div>
                </div>

                {/* Patient Benefits */}
                <StaggerContainer className="grid md:grid-cols-4 gap-6 mt-16" staggerDelay={0.1}>
                  {patientBenefits.map((benefit, index) => (
                    <StaggerItem key={index}>
                      <motion.div
                        className="text-center p-6 rounded-xl bg-accent/5 border border-accent/20 hover:bg-accent/10 transition-all duration-300"
                        whileHover={{ y: -4 }}
                      >
                        <div className="p-3 bg-accent/20 rounded-full w-fit mx-auto mb-4">
                          <benefit.icon className="w-6 h-6 text-accent" />
                        </div>
                        <h4 className="font-bold text-foreground mb-2">{benefit.title}</h4>
                        <p className="text-sm text-muted-foreground">{benefit.desc}</p>
                      </motion.div>
                    </StaggerItem>
                  ))}
                </StaggerContainer>
              </motion.div>
            </AnimatePresence>
          </TabsContent>
        </Tabs>

        {/* Bottom CTA */}
        <ScrollReveal className="text-center mt-20">
          <motion.div
            className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-gradient-to-r from-primary/10 via-accent/10 to-success/10 border border-primary/20"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          >
            <Users className="w-6 h-6 text-primary" />
            <span className="text-foreground font-semibold text-lg">
              Join 10,000+ practices and patients transforming dental care
            </span>
          </motion.div>
        </ScrollReveal>
      </div>
    </section>
  );
};