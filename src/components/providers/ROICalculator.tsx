import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Calculator, TrendingUp } from 'lucide-react';
import { AnimatedText } from '@/components/ui/animated-text';

export const ROICalculator = () => {
  const [monthlyPatients, setMonthlyPatients] = useState('50');
  const [avgTreatment, setAvgTreatment] = useState(2500);
  const [currentApproval, setCurrentApproval] = useState(60);

  const calculateROI = () => {
    const patients = parseInt(monthlyPatients) || 0;
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

  const roi = calculateROI();

  const inputFields = [
    { 
      id: 'patients', 
      label: 'Monthly Patients', 
      value: monthlyPatients, 
      onChange: setMonthlyPatients 
    },
    { 
      id: 'treatment', 
      label: 'Average Treatment Value ($)', 
      value: avgTreatment, 
      onChange: setAvgTreatment 
    },
    { 
      id: 'approval', 
      label: 'Current Approval Rate (%)', 
      value: currentApproval, 
      onChange: setCurrentApproval 
    }
  ];

  const results = [
    {
      value: roi.monthlyIncrease,
      label: "Monthly Revenue Increase",
      color: "success",
      icon: TrendingUp
    },
    {
      value: roi.annualIncrease,
      label: "Annual Revenue Increase", 
      color: "dental-blue-dark",
      icon: Calculator
    },
    {
      value: roi.approvalImprovement,
      label: "Approval Rate Improvement",
      color: "dental-blue",
      suffix: "%",
      prefix: "+"
    }
  ];

  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-6">
        <AnimatedText className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Calculate Your ROI Potential</h2>
          <p className="text-xl text-muted-foreground">See your practice's transformation potential</p>
        </AnimatedText>

        <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Calculator Inputs */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Card className="hover:shadow-elegant transition-all duration-300 border-dental-blue/20">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold mb-6 text-dental-blue-dark">Practice Information</h3>
                <div className="space-y-6">
                  {/* Monthly Patients - Regular Input */}
                  <motion.div 
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0 * 0.1 }}
                  >
                    <Label htmlFor="patients" className="font-medium">Monthly Patients</Label>
                    <Input
                      id="patients"
                      type="number"
                      value={monthlyPatients}
                      onChange={(e) => setMonthlyPatients(e.target.value)}
                      className="mt-2 focus:border-dental-blue focus:ring-dental-blue/20 transition-all duration-300"
                    />
                  </motion.div>

                  {/* Average Treatment Value - Slider */}
                  <motion.div 
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 1 * 0.1 }}
                  >
                    <Label className="font-medium">Average Treatment Value</Label>
                    <div className="mt-2 space-y-3">
                      <div className="text-2xl font-bold text-dental-blue-dark">
                        ${avgTreatment.toLocaleString()}
                      </div>
                      <Slider
                        value={[avgTreatment]}
                        onValueChange={(value) => setAvgTreatment(value[0])}
                        min={1000}
                        max={10000}
                        step={250}
                        className="w-full"
                      />
                      <div className="flex justify-between text-sm text-muted-foreground">
                        <span>$1,000</span>
                        <span>$10,000</span>
                      </div>
                    </div>
                  </motion.div>

                  {/* Current Approval Rate - Slider */}
                  <motion.div 
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 2 * 0.1 }}
                  >
                    <Label className="font-medium">Current Approval Rate</Label>
                    <div className="mt-2 space-y-3">
                      <div className="text-2xl font-bold text-dental-blue-dark">
                        {currentApproval}%
                      </div>
                      <Slider
                        value={[currentApproval]}
                        onValueChange={(value) => setCurrentApproval(value[0])}
                        min={0}
                        max={100}
                        step={5}
                        className="w-full"
                      />
                      <div className="flex justify-between text-sm text-muted-foreground">
                        <span>0%</span>
                        <span>100%</span>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Results Display */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Card className="hover:shadow-elegant transition-all duration-300 border-dental-blue/20">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold mb-6 text-dental-blue-dark">Projected Outcomes</h3>
                <div className="space-y-6">
                  {results.map((result, index) => {
                    const Icon = result.icon;
                    return (
                      <motion.div 
                        key={index}
                        className={`bg-${result.color}/10 border border-${result.color}/20 rounded-lg p-4 hover:bg-${result.color}/20 transition-all duration-300 group`}
                        whileHover={{ scale: 1.02, x: 4 }}
                        transition={{ duration: 0.2 }}
                      >
                        <div className="flex items-center gap-3 mb-2">
                          {Icon && <Icon className={`w-5 h-5 text-${result.color}`} />}
                          <div className={`text-2xl font-bold text-${result.color} group-hover:scale-105 transition-transform`}>
                            {result.prefix || ''}${typeof result.value === 'number' ? result.value.toLocaleString() : result.value}{result.suffix || ''}
                          </div>
                        </div>
                        <div className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">
                          {result.label}
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
                
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button 
                    className="w-full mt-6 bg-intelligence hover:bg-intelligence/90 text-intelligence-foreground shadow-elegant hover:shadow-xl transition-all duration-300" 
                    size="lg"
                  >
                    <Calculator className="w-5 h-5 mr-2" />
                    Launch Full Calculator
                  </Button>
                </motion.div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
};