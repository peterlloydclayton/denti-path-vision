import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { AnimatedText } from '@/components/ui/animated-text';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';

interface CalculatorResult {
  term: number;
  monthlyPayment: number;
  totalPayment: number;
  totalInterest: number;
}

export const PaymentCalculator = () => {
  const [loanAmount, setLoanAmount] = useState(25000);
  const [interestRate, setInterestRate] = useState(8.5);

  const calculatePayment = (principal: number, rate: number, months: number): CalculatorResult => {
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

  const results = [
    calculatePayment(loanAmount, interestRate, 36),
    calculatePayment(loanAmount, interestRate, 60),
    calculatePayment(loanAmount, interestRate, 96)
  ];

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Math.min(Math.max(Number(e.target.value) || 0, 1000), 100000);
    setLoanAmount(value);
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Input Controls */}
      <AnimatedText>
        <div className="grid md:grid-cols-2 gap-8 p-6 rounded-lg border bg-card">
          <div className="space-y-4">
            <div>
              <Label htmlFor="loan-amount" className="text-sm font-medium mb-2 block">
                Loan Amount
              </Label>
              <Input
                id="loan-amount"
                type="number"
                min="1000"
                max="100000"
                step="1000"
                value={loanAmount}
                onChange={handleAmountChange}
                className="text-lg font-semibold"
              />
              <Slider
                value={[loanAmount]}
                onValueChange={(value) => setLoanAmount(value[0])}
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
          </div>

          <div className="space-y-4">
            <div>
              <Label htmlFor="interest-rate" className="text-sm font-medium mb-2 block">
                Interest Rate: {interestRate.toFixed(1)}%
              </Label>
              <Slider
                value={[interestRate]}
                onValueChange={(value) => setInterestRate(value[0])}
                min={0}
                max={20}
                step={0.1}
                className="mt-6"
              />
              <div className="flex justify-between text-sm text-muted-foreground mt-1">
                <span>0%</span>
                <span>20%</span>
              </div>
            </div>
          </div>
        </div>
      </AnimatedText>

      {/* Results Cards */}
      <div className="relative">
        <Carousel className="w-full max-w-3xl mx-auto">
          <CarouselContent className="-ml-2 md:-ml-4">
            {results.map((result, index) => (
              <CarouselItem key={result.term} className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3">
                <AnimatedText delay={index * 0.1}>
                  <Card className="text-center hover:shadow-elegant transition-smooth hover:-translate-y-1 bg-gradient-to-br from-dental-blue-light/10 to-white border-dental-blue-light/20">
                    <CardHeader className="pb-3 bg-dental-blue-light/10 rounded-t-lg">
                      <CardTitle className="text-lg font-bold text-dental-blue-darker">
                        {result.term} Months
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3 pt-4">
                      <div>
                        <p className="text-sm text-dental-blue">Monthly Payment</p>
                        <p className="text-2xl font-bold text-foreground">
                          {formatCurrency(result.monthlyPayment)}
                        </p>
                      </div>
                      <div className="pt-3 border-t border-dental-blue-light/30 space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-dental-blue">Total Payment:</span>
                          <span className="font-medium text-foreground">{formatCurrency(result.totalPayment)}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-dental-blue">Total Interest:</span>
                          <span className="font-medium text-dental-blue-darker">
                            {formatCurrency(result.totalInterest)}
                          </span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </AnimatedText>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="border-dental-blue-light text-dental-blue-darker hover:bg-dental-blue-light/20" />
          <CarouselNext className="border-dental-blue-light text-dental-blue-darker hover:bg-dental-blue-light/20" />
        </Carousel>
      </div>

      <div className="text-center text-sm text-muted-foreground">
        <p>* Calculations are estimates for comparison purposes only.</p>
      </div>
    </div>
  );
};