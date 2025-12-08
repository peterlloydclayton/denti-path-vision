import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Form } from '@/components/ui/form';
import { FormData } from '../MultiStepPatientForm';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface FinancialOverviewStepProps {
  formData: FormData;
  updateFormData: (data: Partial<FormData>) => void;
  onNext: () => void;
  onPrev: () => void;
  isSubmitting?: boolean;
  setIsSubmitting?: (value: boolean) => void;
}

const financialOverviewSchema = z.object({
  checking_balance: z.string().min(1, 'Checking account balance is required')
    .refine((val) => {
      const num = parseFloat(val);
      return !isNaN(num) && num >= 0 && num <= 9999999;
    }, { message: "Checking balance must be between 0 and 9,999,999" }),
  savings_balance: z.string().optional()
    .refine((val) => {
      if (!val || val === '') return true;
      const num = parseFloat(val);
      return !isNaN(num) && num >= 0 && num <= 9999999;
    }, { message: "Savings balance must be between 0 and 9,999,999" }),
  retirement_accounts: z.string().optional()
    .refine((val) => {
      if (!val || val === '') return true;
      const num = parseFloat(val);
      return !isNaN(num) && num >= 0 && num <= 9999999;
    }, { message: "Retirement accounts must be between 0 and 9,999,999" }),
  investment_accounts: z.string().optional()
    .refine((val) => {
      if (!val || val === '') return true;
      const num = parseFloat(val);
      return !isNaN(num) && num >= 0 && num <= 9999999;
    }, { message: "Investment accounts must be between 0 and 9,999,999" }),
  mortgage_rent_payment: z.string().min(1, 'Mortgage/rent payment is required')
    .refine((val) => {
      const num = parseFloat(val);
      return !isNaN(num) && num >= 0 && num <= 9999999;
    }, { message: "Mortgage/rent payment must be between 0 and 9,999,999" }),
  credit_score: z.string().optional(),
  credit_score_unknown: z.boolean(),
}).refine((data) => {
  return data.credit_score_unknown || (data.credit_score && data.credit_score.trim().length > 0);
}, {
  message: "Please either provide your credit score or check 'I don't know my credit score'",
  path: ["credit_score"]
});

const FinancialOverviewStep: React.FC<FinancialOverviewStepProps> = ({ 
  formData, 
  updateFormData, 
  onNext,
  onPrev
}) => {
  const { t } = useTranslation();
  const [showErrors, setShowErrors] = useState(false);
  
  const form = useForm({
    resolver: zodResolver(financialOverviewSchema),
    defaultValues: formData,
  });

  const onSubmit = (data: any) => {
    updateFormData(data);
    onNext();
  };

  const handleNext = () => {
    setShowErrors(true);
    form.handleSubmit(onSubmit)();
  };

  const creditScoreUnknown = form.watch('credit_score_unknown');

  return (
    <Form {...form}>
      <form className="space-y-6">
        <div className="space-y-6">
          <div className="text-center">
            <h3 className="text-lg font-semibold mb-2">{t('form.steps.financial')}</h3>
            <p className="text-muted-foreground">
              Please provide information about your financial situation. This helps us determine the best financing options for you.
            </p>
          </div>

          <div>
            <h4 className="text-lg font-medium mb-4">{t('form.financial.assets')}</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="checking_balance"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('form.financial.checkingBalance')} *</FormLabel>
                    <FormControl>
                      <Input 
                        type="number" 
                        min="0" 
                        max="9999999"
                        step="0.01" 
                        placeholder="5000.00" 
                        {...field}
                        onChange={(e) => {
                          const value = e.target.value;
                          const parts = value.split('.');
                          if (parts[0].length <= 7) {
                            field.onChange(value);
                          }
                        }}
                        onBlur={() => {
                          field.onBlur();
                          form.trigger('checking_balance');
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="savings_balance"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('form.financial.savingsBalance')}</FormLabel>
                    <FormControl>
                      <Input 
                        type="number" 
                        min="0" 
                        max="9999999"
                        step="0.01" 
                        placeholder="10000.00" 
                        {...field}
                        onChange={(e) => {
                          const value = e.target.value;
                          const parts = value.split('.');
                          if (parts[0].length <= 7) {
                            field.onChange(value);
                          }
                        }}
                        onBlur={() => {
                          field.onBlur();
                          form.trigger('savings_balance');
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="retirement_accounts"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('form.financial.retirementAccounts')}</FormLabel>
                    <FormControl>
                      <Input 
                        type="number" 
                        min="0" 
                        max="9999999"
                        step="0.01" 
                        placeholder="50000.00" 
                        {...field}
                        onChange={(e) => {
                          const value = e.target.value;
                          const parts = value.split('.');
                          if (parts[0].length <= 7) {
                            field.onChange(value);
                          }
                        }}
                        onBlur={() => {
                          field.onBlur();
                          form.trigger('retirement_accounts');
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="investment_accounts"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('form.financial.investmentAccounts')}</FormLabel>
                    <FormControl>
                      <Input 
                        type="number" 
                        min="0" 
                        max="9999999"
                        step="0.01" 
                        placeholder="25000.00" 
                        {...field}
                        onChange={(e) => {
                          const value = e.target.value;
                          const parts = value.split('.');
                          if (parts[0].length <= 7) {
                            field.onChange(value);
                          }
                        }}
                        onBlur={() => {
                          field.onBlur();
                          form.trigger('investment_accounts');
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          <div>
            <h4 className="text-lg font-medium mb-4">{t('form.financial.liabilities')}</h4>
            <FormField
              control={form.control}
              name="mortgage_rent_payment"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('form.financial.mortgageRent')} *</FormLabel>
                  <FormControl>
                    <Input 
                      type="number" 
                      min="0" 
                      max="9999999"
                      step="0.01" 
                      placeholder="1200.00" 
                      {...field}
                      onChange={(e) => {
                        const value = e.target.value;
                        const parts = value.split('.');
                        if (parts[0].length <= 7) {
                          field.onChange(value);
                        }
                      }}
                      onBlur={() => {
                        field.onBlur();
                        form.trigger('mortgage_rent_payment');
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="space-y-4">
            <FormField
              control={form.control}
              name="credit_score_unknown"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>
                      {t('form.financial.creditScoreUnknown')}
                    </FormLabel>
                  </div>
                </FormItem>
              )}
            />

            {!creditScoreUnknown && (
              <FormField
                control={form.control}
                name="credit_score"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('form.financial.currentEstimatedCreditScore')} *</FormLabel>
                    <FormControl>
                      <Input 
                        type="number" 
                        min="300" 
                        max="850" 
                        placeholder="720" 
                        {...field}
                        onChange={(e) => {
                          const value = e.target.value;
                          if (value.length <= 3) {
                            field.onChange(value);
                          }
                        }}
                        onBlur={() => {
                          field.onBlur();
                          form.trigger('credit_score');
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
          </div>
        </div>
        
        <div className="flex justify-between pt-6">
          <Button
            type="button"
            onClick={onPrev}
            variant="outline"
          >
            <ChevronLeft className="mr-2 h-4 w-4" />
            {t('form.buttons.previous')}
          </Button>
          
          <Button
            type="button"
            onClick={handleNext}
          >
            {t('form.buttons.next')}
            <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
        
        {showErrors && Object.keys(form.formState.errors).length > 0 && (
          <div className="mt-4 p-4 bg-destructive/10 border border-destructive/20 rounded-md">
            <h4 className="text-sm font-medium text-destructive mb-2">Please fix the following errors:</h4>
            <ul className="text-sm text-destructive space-y-1">
              {Object.entries(form.formState.errors).map(([key, error]) => (
                <li key={key}>
                  {typeof error?.message === 'string' ? error.message : 'This field is required'}
                </li>
              ))}
            </ul>
          </div>
        )}
      </form>
    </Form>
  );
};

export default FinancialOverviewStep;
