import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { CustomSlider } from '@/components/ui/custom-slider';
import { 
  Users, 
  Heart, 
  Calculator, 
  TrendingUp, 
  DollarSign, 
  Target, 
  Calendar, 
  ArrowRight,
  CheckCircle,
  Stethoscope,
  CreditCard,
  Clock,
  Zap
} from 'lucide-react';
import { ScrollReveal, StaggerContainer, StaggerItem } from '@/components/ui/enhanced-animations';

export const HomeInteractiveSection = () => {
  const [activeTab, setActiveTab] = useState('providers');
  
  // Provider Calculator State
  const [monthlyPatients, setMonthlyPatients] = useState(50);
  const [avgTreatment, setAvgTreatment] = useState(2500);
  const [currentApproval, setCurrentApproval] = useState(60);

  // Patient Calculator State  
  const [loanAmount, setLoanAmount] = useState(25000);
  const [interestRate, setInterestRate] = useState(8.5);

  // Provider ROI Calculations
  const calculateROI = () => {
    const patients = monthlyPatients || 0;
    const treatment = avgTreatment || 0;
    const current = currentApproval || 0;
    
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

  // Patient Payment Calculations
  const calculatePayment = (principal: number, rate: number, months: number) => {
    const monthlyRate = rate / 100 / 12;
    let monthlyPayment = 0;
    
    if (monthlyRate === 0) {
      monthlyPayment = principal / months;
    } else {
      monthlyPayment = principal * (monthlyRate * Math.pow(1 + monthlyRate, months)) / (Math.pow(1 + monthlyRate, months) - 1);
    }
    
    const totalPayment = monthlyPayment * months;
    const totalInterest = totalPayment - principal;

    return {
      term: months,
      monthlyPayment,
      totalPayment,
      totalInterest
    };
  };

  const roi = calculateROI();
  const paymentOptions = [
    calculatePayment(loanAmount, interestRate, 36),
    calculatePayment(loanAmount, interestRate, 60),
    calculatePayment(loanAmount, interestRate, 96)
  ];

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

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

  return (
    <section className="py-24 bg-gradient-to-b from-background to-surface">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-primary/10 to-accent/10 border border-primary/20 text-primary font-medium text-sm mb-6">
            <Calculator className="w-4 h-4" />
            Interactive Experience
          </div>
          
          <h2 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
            Experience the 
            <span className="bg-gradient-to-r from-primary via-accent to-success bg-clip-text text-transparent block">
              DentiPay Difference
            </span>
          </h2>
          
          <p className="text-xl text-muted-foreground max-w-4xl mx-auto mb-8">
            Discover how DentiPay transforms the financing experience for both providers and patients. 
            Choose your path and see the revolutionary difference firsthand.
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
                <div className="grid lg:grid-cols-2 gap-12 items-start">
                  {/* Provider Calculator */}
                  <Card className="border-primary/30 bg-gradient-to-br from-primary/5 to-primary/10">
                    <CardContent className="p-8">
                      <div className="flex items-center gap-3 mb-6">
                        <div className="p-3 bg-primary/20 rounded-xl">
                          <Calculator className="w-6 h-6 text-primary" />
                        </div>
                        <h3 className="text-2xl font-bold text-foreground">ROI Calculator</h3>
                      </div>

                      <div className="space-y-6">
                        {/* Monthly Patients */}
                        <div>
                          <Label className="font-medium text-foreground mb-2 block">
                            Monthly Patients: {monthlyPatients}
                          </Label>
                          <CustomSlider
                            value={monthlyPatients}
                            onValueChange={setMonthlyPatients}
                            min={10}
                            max={100}
                            step={10}
                            className="mt-3"
                          />
                          <div className="flex justify-between text-sm text-muted-foreground mt-1">
                            <span>10</span>
                            <span>100</span>
                          </div>
                        </div>

                        {/* Average Treatment */}
                        <div>
                          <Label className="font-medium text-foreground mb-2 block">
                            Avg Treatment: {formatCurrency(avgTreatment)}
                          </Label>
                          <CustomSlider
                            value={avgTreatment}
                            onValueChange={setAvgTreatment}
                            min={1000}
                            max={50000}
                            step={250}
                            className="mt-3"
                          />
                          <div className="flex justify-between text-sm text-muted-foreground mt-1">
                            <span>$1,000</span>
                            <span>$50,000</span>
                          </div>
                        </div>

                        {/* Current Approval */}
                        <div>
                          <Label className="font-medium text-foreground mb-2 block">
                            Current Approval Rate: {currentApproval}%
                          </Label>
                          <CustomSlider
                            value={currentApproval}
                            onValueChange={setCurrentApproval}
                            min={20}
                            max={90}
                            step={5}
                            className="mt-3"
                          />
                          <div className="flex justify-between text-sm text-muted-foreground mt-1">
                            <span>20%</span>
                            <span>90%</span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Provider Results */}
                  <div className="space-y-6">
                    <h3 className="text-2xl font-bold text-foreground mb-6">Your Transformation Potential</h3>
                    
                    <div className="grid gap-4">
                      <motion.div
                        className="p-6 rounded-xl bg-primary/10 border border-primary/20"
                        whileHover={{ scale: 1.02, x: 4 }}
                      >
                        <div className="flex items-center gap-3 mb-2">
                          <DollarSign className="w-5 h-5 text-primary" />
                          <div className="text-2xl font-bold text-primary">
                            {formatCurrency(roi.monthlyIncrease)}
                          </div>
                        </div>
                        <div className="text-sm text-muted-foreground">Monthly Revenue Increase</div>
                      </motion.div>

                      <motion.div
                        className="p-6 rounded-xl bg-success/10 border border-success/20"
                        whileHover={{ scale: 1.02, x: 4 }}
                      >
                        <div className="flex items-center gap-3 mb-2">
                          <Calendar className="w-5 h-5 text-success" />
                          <div className="text-2xl font-bold text-success">
                            {formatCurrency(roi.annualIncrease)}
                          </div>
                        </div>
                        <div className="text-sm text-muted-foreground">Annual Revenue Increase</div>
                      </motion.div>

                      <motion.div
                        className="p-6 rounded-xl bg-accent/10 border border-accent/20"
                        whileHover={{ scale: 1.02, x: 4 }}
                      >
                        <div className="flex items-center gap-3 mb-2">
                          <Target className="w-5 h-5 text-accent" />
                          <div className="text-2xl font-bold text-accent">
                            +{roi.approvalImprovement}%
                          </div>
                        </div>
                        <div className="text-sm text-muted-foreground">Approval Rate Improvement</div>
                      </motion.div>
                    </div>

                    <Button className="w-full" size="lg">
                      Transform My Practice
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
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
                <div className="grid lg:grid-cols-2 gap-12 items-start">
                  {/* Patient Calculator */}
                  <Card className="border-accent/30 bg-gradient-to-br from-accent/5 to-accent/10">
                    <CardContent className="p-8">
                      <div className="flex items-center gap-3 mb-6">
                        <div className="p-3 bg-accent/20 rounded-xl">
                          <CreditCard className="w-6 h-6 text-accent" />
                        </div>
                        <h3 className="text-2xl font-bold text-foreground">Payment Calculator</h3>
                      </div>

                      <div className="space-y-6">
                        {/* Loan Amount */}
                        <div>
                          <Label className="font-medium text-foreground mb-2 block">
                            Treatment Cost: {formatCurrency(loanAmount)}
                          </Label>
                          <CustomSlider
                            value={loanAmount}
                            onValueChange={setLoanAmount}
                            min={1000}
                            max={100000}
                            step={1000}
                            className="mt-3"
                          />
                          <div className="flex justify-between text-sm text-muted-foreground mt-1">
                            <span>$1,000</span>
                            <span>$100,000</span>
                          </div>
                        </div>

                        {/* Interest Rate */}
                        <div>
                          <Label className="font-medium text-foreground mb-2 block">
                            Interest Rate: {interestRate.toFixed(1)}%
                          </Label>
                          <CustomSlider
                            value={interestRate}
                            onValueChange={setInterestRate}
                            min={0}
                            max={20}
                            step={0.1}
                            className="mt-3"
                          />
                          <div className="flex justify-between text-sm text-muted-foreground mt-1">
                            <span>0%</span>
                            <span>20%</span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Patient Payment Options */}
                  <div className="space-y-6">
                    <h3 className="text-2xl font-bold text-foreground mb-6">Your Payment Options</h3>
                    
                    <div className="grid gap-4">
                      {paymentOptions.map((option, index) => (
                        <motion.div
                          key={index}
                          className={`p-6 rounded-xl border-2 transition-all duration-300 ${
                            index === 1 
                              ? 'bg-accent/10 border-accent/30 ring-2 ring-accent/20' 
                              : 'bg-accent/5 border-accent/20 hover:border-accent/30'
                          }`}
                          whileHover={{ scale: 1.02, x: 4 }}
                        >
                          <div className="flex justify-between items-start mb-3">
                            <div>
                              <h4 className="font-bold text-accent">{option.term} Months</h4>
                              {index === 1 && <span className="text-xs bg-accent text-accent-foreground px-2 py-1 rounded-full">Most Popular</span>}
                            </div>
                            <div className="text-right">
                              <div className="text-2xl font-bold text-accent">
                                {formatCurrency(option.monthlyPayment)}
                              </div>
                              <div className="text-xs text-muted-foreground">per month</div>
                            </div>
                          </div>
                          <div className="text-sm text-muted-foreground space-y-1">
                            <div className="flex justify-between">
                              <span>Total Payment:</span>
                              <span>{formatCurrency(option.totalPayment)}</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Total Interest:</span>
                              <span>{formatCurrency(option.totalInterest)}</span>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>

                    <Button className="w-full bg-accent hover:bg-accent/90" size="lg">
                      Get Pre-Approved Now
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
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