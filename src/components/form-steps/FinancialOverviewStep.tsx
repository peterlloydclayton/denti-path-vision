import React from 'react';
import { FormData } from '../MultiStepPatientForm';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface StepProps {
  formData: FormData;
  updateFormData: (data: Partial<FormData>) => void;
  onNext: () => void;
  onPrev: () => void;
  isSubmitting: boolean;
  setIsSubmitting: (val: boolean) => void;
}

const FinancialOverviewStep: React.FC<StepProps> = ({ formData, updateFormData, onNext, onPrev }) => {
  return (
    <div className="space-y-6">
      {/* Account Balances */}
      <h3 className="text-lg font-semibold">Account Balances</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="checking_balance">Checking Account Balance</Label>
          <Input
            id="checking_balance"
            type="number"
            value={formData.checking_balance}
            onChange={(e) => updateFormData({ checking_balance: e.target.value })}
            placeholder="$"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="savings_balance">Savings Account Balance</Label>
          <Input
            id="savings_balance"
            type="number"
            value={formData.savings_balance}
            onChange={(e) => updateFormData({ savings_balance: e.target.value })}
            placeholder="$"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="retirement_accounts">Retirement Accounts (401k, IRA, etc.)</Label>
          <Input
            id="retirement_accounts"
            type="number"
            value={formData.retirement_accounts}
            onChange={(e) => updateFormData({ retirement_accounts: e.target.value })}
            placeholder="$"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="investment_accounts">Investment Accounts</Label>
          <Input
            id="investment_accounts"
            type="number"
            value={formData.investment_accounts}
            onChange={(e) => updateFormData({ investment_accounts: e.target.value })}
            placeholder="$"
          />
        </div>
      </div>

      {/* Monthly Expenses */}
      <div className="border-t pt-6 mt-6">
        <h3 className="text-lg font-semibold mb-4">Monthly Expenses</h3>
        
        <div className="space-y-2">
          <Label htmlFor="mortgage_rent_payment">Mortgage/Rent Payment *</Label>
          <Input
            id="mortgage_rent_payment"
            type="number"
            value={formData.mortgage_rent_payment}
            onChange={(e) => updateFormData({ mortgage_rent_payment: e.target.value })}
            placeholder="$"
            required
          />
        </div>
      </div>

      {/* Credit Score */}
      <div className="border-t pt-6 mt-6">
        <h3 className="text-lg font-semibold mb-4">Credit Information</h3>
        
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="credit_score">Credit Score (if known)</Label>
            <Input
              id="credit_score"
              type="number"
              value={formData.credit_score}
              onChange={(e) => updateFormData({ credit_score: e.target.value })}
              placeholder="300-850"
              disabled={formData.credit_score_unknown}
            />
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="credit_score_unknown"
              checked={formData.credit_score_unknown}
              onCheckedChange={(checked) => {
                updateFormData({ 
                  credit_score_unknown: checked as boolean,
                  credit_score: checked ? '' : formData.credit_score
                });
              }}
            />
            <Label htmlFor="credit_score_unknown" className="cursor-pointer">
              I don't know my credit score
            </Label>
          </div>
        </div>
      </div>

      <div className="bg-muted p-4 rounded-lg mt-6">
        <p className="text-sm text-muted-foreground">
          <strong>Note:</strong> This information helps us determine the best financing options for you. 
          All information is securely encrypted and protected.
        </p>
      </div>

      <div className="flex justify-between pt-6">
        <Button onClick={onPrev} variant="outline" className="gap-2">
          <ChevronLeft className="h-4 w-4" /> Previous
        </Button>
        <Button onClick={onNext} className="gap-2">
          Next <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default FinancialOverviewStep;
