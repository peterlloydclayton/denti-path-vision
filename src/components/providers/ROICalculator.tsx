import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Calculator } from 'lucide-react';

export const ROICalculator = () => {
  const [monthlyPatients, setMonthlyPatients] = useState('50');
  const [avgTreatment, setAvgTreatment] = useState('2500');
  const [currentApproval, setCurrentApproval] = useState('60');

  const calculateROI = () => {
    const patients = parseInt(monthlyPatients) || 0;
    const treatment = parseInt(avgTreatment) || 0;
    const current = parseInt(currentApproval) || 0;
    
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

  return (
    <section className="py-24 bg-muted">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Calculate Your ROI Potential</h2>
        </div>

        <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Calculator Inputs */}
          <Card>
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold mb-6">Practice Information</h3>
              <div className="space-y-6">
                <div>
                  <Label htmlFor="patients">Monthly Patients</Label>
                  <Input
                    id="patients"
                    type="number"
                    value={monthlyPatients}
                    onChange={(e) => setMonthlyPatients(e.target.value)}
                    className="mt-2"
                  />
                </div>
                <div>
                  <Label htmlFor="treatment">Average Treatment Value ($)</Label>
                  <Input
                    id="treatment"
                    type="number"
                    value={avgTreatment}
                    onChange={(e) => setAvgTreatment(e.target.value)}
                    className="mt-2"
                  />
                </div>
                <div>
                  <Label htmlFor="approval">Current Approval Rate (%)</Label>
                  <Input
                    id="approval"
                    type="number"
                    value={currentApproval}
                    onChange={(e) => setCurrentApproval(e.target.value)}
                    className="mt-2"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Results Display */}
          <Card>
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold mb-6">Projected Outcomes</h3>
              <div className="space-y-6">
                <div className="bg-success/10 rounded-lg p-4">
                  <div className="text-2xl font-bold text-success">
                    ${roi.monthlyIncrease.toLocaleString()}
                  </div>
                  <div className="text-sm text-muted-foreground">Monthly Revenue Increase</div>
                </div>
                <div className="bg-navy/10 rounded-lg p-4">
                  <div className="text-2xl font-bold text-navy">
                    ${roi.annualIncrease.toLocaleString()}
                  </div>
                  <div className="text-sm text-muted-foreground">Annual Revenue Increase</div>
                </div>
                <div className="bg-primary/50 rounded-lg p-4">
                  <div className="text-2xl font-bold text-foreground">
                    +{roi.approvalImprovement}%
                  </div>
                  <div className="text-sm text-muted-foreground">Approval Rate Improvement</div>
                </div>
              </div>
              <Button className="w-full mt-6 bg-navy hover:bg-navy/90" size="lg">
                <Calculator className="w-5 h-5 mr-2" />
                Launch Full Calculator
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};