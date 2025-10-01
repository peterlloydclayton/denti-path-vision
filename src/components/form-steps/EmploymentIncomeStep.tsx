import React from 'react';
import { FormData } from '../MultiStepPatientForm';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface StepProps {
  formData: FormData;
  updateFormData: (data: Partial<FormData>) => void;
  onNext: () => void;
  onPrev: () => void;
  isSubmitting: boolean;
  setIsSubmitting: (val: boolean) => void;
}

const EmploymentIncomeStep: React.FC<StepProps> = ({ formData, updateFormData, onNext, onPrev }) => {
  return (
    <div className="space-y-6">
      {/* Current Employment */}
      <div className="space-y-2">
        <Label htmlFor="current_employer">Current Employer *</Label>
        <Input
          id="current_employer"
          value={formData.current_employer}
          onChange={(e) => updateFormData({ current_employer: e.target.value })}
          required
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="job_title">Job Title *</Label>
          <Input
            id="job_title"
            value={formData.job_title}
            onChange={(e) => updateFormData({ job_title: e.target.value })}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="employment_type">Employment Type *</Label>
          <Select value={formData.employment_type} onValueChange={(value) => updateFormData({ employment_type: value })}>
            <SelectTrigger>
              <SelectValue placeholder="Select type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="full_time">Full-Time</SelectItem>
              <SelectItem value="part_time">Part-Time</SelectItem>
              <SelectItem value="self_employed">Self-Employed</SelectItem>
              <SelectItem value="contract">Contract</SelectItem>
              <SelectItem value="retired">Retired</SelectItem>
              <SelectItem value="unemployed">Unemployed</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="length_of_employment">Length of Employment *</Label>
        <Select value={formData.length_of_employment} onValueChange={(value) => updateFormData({ length_of_employment: value })}>
          <SelectTrigger>
            <SelectValue placeholder="Select duration" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="less_than_6_months">Less than 6 months</SelectItem>
            <SelectItem value="6_12_months">6-12 months</SelectItem>
            <SelectItem value="1_2_years">1-2 years</SelectItem>
            <SelectItem value="2_5_years">2-5 years</SelectItem>
            <SelectItem value="more_than_5">More than 5 years</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Income Information */}
      <div className="border-t pt-6 mt-6">
        <h3 className="text-lg font-semibold mb-4">Income Information</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="monthly_gross_income">Monthly Gross Income *</Label>
            <Input
              id="monthly_gross_income"
              type="number"
              value={formData.monthly_gross_income}
              onChange={(e) => updateFormData({ monthly_gross_income: e.target.value })}
              placeholder="$"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="monthly_net_income">Monthly Net Income *</Label>
            <Input
              id="monthly_net_income"
              type="number"
              value={formData.monthly_net_income}
              onChange={(e) => updateFormData({ monthly_net_income: e.target.value })}
              placeholder="$"
              required
            />
          </div>
        </div>

        <div className="space-y-2 mt-4">
          <Label htmlFor="pay_frequency">Pay Frequency *</Label>
          <Select value={formData.pay_frequency} onValueChange={(value) => updateFormData({ pay_frequency: value })}>
            <SelectTrigger>
              <SelectValue placeholder="Select frequency" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="weekly">Weekly</SelectItem>
              <SelectItem value="bi_weekly">Bi-Weekly</SelectItem>
              <SelectItem value="semi_monthly">Semi-Monthly</SelectItem>
              <SelectItem value="monthly">Monthly</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2 mt-4">
          <Label htmlFor="secondary_income_sources">Secondary Income Sources</Label>
          <Textarea
            id="secondary_income_sources"
            value={formData.secondary_income_sources}
            onChange={(e) => updateFormData({ secondary_income_sources: e.target.value })}
            placeholder="List any additional income sources (e.g., rental income, investments, etc.)"
            rows={3}
          />
        </div>

        <div className="space-y-2 mt-4">
          <Label htmlFor="household_total_income">Total Household Income *</Label>
          <Input
            id="household_total_income"
            type="number"
            value={formData.household_total_income}
            onChange={(e) => updateFormData({ household_total_income: e.target.value })}
            placeholder="$"
            required
          />
        </div>
      </div>

      {/* Spouse Information (if married) */}
      {formData.marital_status === 'married' && (
        <div className="border-t pt-6 mt-6">
          <h3 className="text-lg font-semibold mb-4">Spouse Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="spouse_employer">Spouse's Employer</Label>
              <Input
                id="spouse_employer"
                value={formData.spouse_employer}
                onChange={(e) => updateFormData({ spouse_employer: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="spouse_income">Spouse's Monthly Income</Label>
              <Input
                id="spouse_income"
                type="number"
                value={formData.spouse_income}
                onChange={(e) => updateFormData({ spouse_income: e.target.value })}
                placeholder="$"
              />
            </div>
          </div>
        </div>
      )}

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

export default EmploymentIncomeStep;
