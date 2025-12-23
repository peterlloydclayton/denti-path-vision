import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Form } from '@/components/ui/form';
import { FormData } from '../MultiStepPatientForm';
import { Textarea } from '@/components/ui/textarea';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface EmploymentIncomeStepProps {
  formData: FormData;
  updateFormData: (data: Partial<FormData>) => void;
  onNext: () => void;
  onPrev: () => void;
  isSubmitting?: boolean;
  setIsSubmitting?: (value: boolean) => void;
}

const MAX_TEXT_LENGTH = 100;
const MAX_ADDRESS_LENGTH = 200;

const employmentIncomeSchema = z.object({
  current_employer: z.string().min(1, "Current employer is required").max(MAX_TEXT_LENGTH, `Maximum ${MAX_TEXT_LENGTH} characters`),
  employer_address: z.string().min(1, "Employer address is required").max(MAX_ADDRESS_LENGTH, `Maximum ${MAX_ADDRESS_LENGTH} characters`),
  job_title: z.string().min(1, "Job title is required").max(MAX_TEXT_LENGTH, `Maximum ${MAX_TEXT_LENGTH} characters`),
  employment_type: z.string().min(1, "Employment type is required"),
  length_of_employment: z.string().min(1, "Length of employment is required"),
  monthly_gross_income: z.string().min(1, "Monthly gross income is required")
    .refine((val) => {
      const num = parseFloat(val);
      return !isNaN(num) && num >= 0 && num <= 9999999;
    }, { message: "Monthly gross income must be between 0 and 9,999,999" }),
  monthly_net_income: z.string().min(1, "Monthly net income is required")
    .refine((val) => {
      const num = parseFloat(val);
      return !isNaN(num) && num >= 0 && num <= 9999999;
    }, { message: "Monthly net income must be between 0 and 9,999,999" }),
  pay_frequency: z.string().min(1, "Pay frequency is required"),
  secondary_income_sources: z.string().max(75, "Maximum 75 characters").optional(),
  household_total_income: z.string().optional()
    .refine((val) => {
      if (!val || val === '') return true;
      const num = parseFloat(val);
      return !isNaN(num) && num >= 0 && num <= 9999999;
    }, { message: "Household income must be between 0 and 9,999,999" }),
  spouse_employer: z.string().max(MAX_TEXT_LENGTH, `Maximum ${MAX_TEXT_LENGTH} characters`).optional(),
  spouse_income: z.string().optional()
    .refine((val) => {
      if (!val || val === '') return true;
      const num = parseFloat(val);
      return !isNaN(num) && num >= 0 && num <= 9999999;
    }, { message: "Spouse income must be between 0 and 9,999,999" }),
});

const EmploymentIncomeStep: React.FC<EmploymentIncomeStepProps> = ({ 
  formData, 
  updateFormData, 
  onNext,
  onPrev
}) => {
  const { t } = useTranslation();
  const [showErrors, setShowErrors] = useState(false);
  
  const form = useForm({
    resolver: zodResolver(employmentIncomeSchema),
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

  const getEmploymentOptions = () => [
    { value: "Full-Time", label: t('form.employment.fullTime') },
    { value: "Part-Time", label: t('form.employment.partTime') },
    { value: "Self-Employed", label: t('form.employment.selfEmployed') },
    { value: "Unemployed", label: t('form.employment.unemployed') },
    { value: "Retired", label: t('form.employment.retired') },
    { value: "Student", label: t('form.employment.student') },
    { value: "Other", label: t('form.employment.other') },
  ];

  const getEmploymentLengthOptions = () => [
    { value: "Less than 6 months", label: t('form.employment.lessThan6Months') },
    { value: "6 months - 1 year", label: t('form.employment.6MonthsTo1Year') },
    { value: "1 - 2 years", label: t('form.employment.1To2Years') },
    { value: "2 - 5 years", label: t('form.employment.2To5Years') },
    { value: "5+ years", label: t('form.employment.5PlusYears') },
  ];

  const getPayFrequencyOptions = () => [
    { value: "Weekly", label: t('form.employment.weekly') },
    { value: "Bi-Weekly", label: t('form.employment.biWeekly') },
    { value: "Monthly", label: t('form.employment.monthly') },
  ];

  return (
    <Form {...form}>
      <form className="space-y-6">
        <div className="space-y-6">
          <h3 className="text-lg font-semibold">{t('form.steps.employment')}</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="current_employer"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('form.employment.currentEmployer')} *</FormLabel>
                  <FormControl>
                    <Input placeholder="Company Name" maxLength={MAX_TEXT_LENGTH} {...field} />
                  </FormControl>
                  {showErrors && <FormMessage />}
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="employer_address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Employer Address *</FormLabel>
                  <FormControl>
                    <Input placeholder="Street Address, City, State, ZIP" maxLength={MAX_ADDRESS_LENGTH} {...field} />
                  </FormControl>
                  {showErrors && <FormMessage />}
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="job_title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('form.employment.jobTitle')} *</FormLabel>
                  <FormControl>
                    <Input placeholder="Your job title" maxLength={MAX_TEXT_LENGTH} {...field} />
                  </FormControl>
                  {showErrors && <FormMessage />}
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="employment_type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('form.employment.employmentType')} *</FormLabel>
                  <FormControl>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select employment type" />
                      </SelectTrigger>
                      <SelectContent className="bg-popover">
                        {getEmploymentOptions().map((type) => (
                          <SelectItem key={type.value} value={type.value}>
                            {type.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  {showErrors && <FormMessage />}
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="length_of_employment"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('form.employment.lengthOfEmployment')} *</FormLabel>
                  <FormControl>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select length of employment" />
                      </SelectTrigger>
                      <SelectContent className="bg-popover">
                        {getEmploymentLengthOptions().map((length) => (
                          <SelectItem key={length.value} value={length.value}>
                            {length.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  {showErrors && <FormMessage />}
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="monthly_gross_income"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('form.employment.monthlyIncome')} *</FormLabel>
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
                        form.trigger('monthly_gross_income');
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="monthly_net_income"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('form.employment.monthlyNetIncome')} *</FormLabel>
                  <FormControl>
                    <Input 
                      type="number" 
                      min="0" 
                      max="9999999"
                      step="0.01" 
                      placeholder="4000.00" 
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
                        form.trigger('monthly_net_income');
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="pay_frequency"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('form.employment.payFrequency')} *</FormLabel>
                  <FormControl>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select pay frequency" />
                      </SelectTrigger>
                      <SelectContent className="bg-popover">
                        {getPayFrequencyOptions().map((freq) => (
                          <SelectItem key={freq.value} value={freq.value}>
                            {freq.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  {showErrors && <FormMessage />}
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="secondary_income_sources"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('form.employment.secondaryIncomeSources')}</FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder="Describe any additional income sources..."
                    maxLength={75}
                    {...field} 
                  />
                </FormControl>
                {showErrors && <FormMessage />}
              </FormItem>
            )}
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <FormField
              control={form.control}
              name="household_total_income"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('form.employment.householdTotalIncome')}</FormLabel>
                  <FormControl>
                    <Input 
                      type="number" 
                      min="0" 
                      max="9999999"
                      step="0.01" 
                      placeholder="8000.00" 
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
                        form.trigger('household_total_income');
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="spouse_employer"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('form.employment.spouseEmployer')}</FormLabel>
                  <FormControl>
                    <Input placeholder="Spouse's employer" maxLength={MAX_TEXT_LENGTH} {...field} />
                  </FormControl>
                  {showErrors && <FormMessage />}
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="spouse_income"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('form.employment.spouseIncome')}</FormLabel>
                  <FormControl>
                    <Input 
                      type="number" 
                      min="0" 
                      max="9999999"
                      step="0.01" 
                      placeholder="3000.00" 
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
                        form.trigger('spouse_income');
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
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

export default EmploymentIncomeStep;
