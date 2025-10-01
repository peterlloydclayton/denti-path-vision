import React from 'react';
import { FormData } from '../MultiStepPatientForm';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import { Slider } from '@/components/ui/slider';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface StepProps {
  formData: FormData;
  updateFormData: (data: Partial<FormData>) => void;
  onNext: () => void;
  onPrev: () => void;
  isSubmitting: boolean;
  setIsSubmitting: (val: boolean) => void;
}

const EmotionalDecisionStep: React.FC<StepProps> = ({ formData, updateFormData, onNext, onPrev }) => {
  const treatmentReasons = [
    'Pain or Discomfort',
    'Cosmetic Improvement',
    'Preventive Care',
    'Restore Functionality',
    'Doctor Recommendation',
    'Other'
  ];

  const toggleReason = (reason: string) => {
    const current = formData.treatment_reason || [];
    const updated = current.includes(reason)
      ? current.filter(r => r !== reason)
      : [...current, reason];
    updateFormData({ treatment_reason: updated });
  };

  return (
    <div className="space-y-6">
      {/* Time Considering Treatment */}
      <div className="space-y-3">
        <Label>How long have you been considering this dental treatment? *</Label>
        <RadioGroup value={formData.considering_treatment_time} onValueChange={(value) => updateFormData({ considering_treatment_time: value })}>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="less_than_1_month" id="time1" />
            <Label htmlFor="time1" className="cursor-pointer font-normal">Less than 1 month</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="1_3_months" id="time2" />
            <Label htmlFor="time2" className="cursor-pointer font-normal">1-3 months</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="3_6_months" id="time3" />
            <Label htmlFor="time3" className="cursor-pointer font-normal">3-6 months</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="6_12_months" id="time4" />
            <Label htmlFor="time4" className="cursor-pointer font-normal">6-12 months</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="more_than_1_year" id="time5" />
            <Label htmlFor="time5" className="cursor-pointer font-normal">More than 1 year</Label>
          </div>
        </RadioGroup>
      </div>

      {/* Priority Preference */}
      <div className="space-y-3 border-t pt-6">
        <Label>What matters most to you in your financing decision? *</Label>
        <RadioGroup value={formData.priority_preference} onValueChange={(value) => updateFormData({ priority_preference: value })}>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="lowest_payment" id="priority1" />
            <Label htmlFor="priority1" className="cursor-pointer font-normal">Lowest monthly payment</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="lowest_interest" id="priority2" />
            <Label htmlFor="priority2" className="cursor-pointer font-normal">Lowest interest rate</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="fastest_approval" id="priority3" />
            <Label htmlFor="priority3" className="cursor-pointer font-normal">Fastest approval time</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="shortest_term" id="priority4" />
            <Label htmlFor="priority4" className="cursor-pointer font-normal">Shortest loan term</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="flexible_payment" id="priority5" />
            <Label htmlFor="priority5" className="cursor-pointer font-normal">Flexible payment options</Label>
          </div>
        </RadioGroup>
      </div>

      {/* Treatment Reason */}
      <div className="space-y-3 border-t pt-6">
        <Label>Why are you seeking this treatment? (Select all that apply) *</Label>
        <div className="space-y-2">
          {treatmentReasons.map((reason) => (
            <div key={reason} className="flex items-center space-x-2">
              <Checkbox
                id={reason}
                checked={formData.treatment_reason?.includes(reason)}
                onCheckedChange={() => toggleReason(reason)}
              />
              <Label htmlFor={reason} className="cursor-pointer font-normal">
                {reason}
              </Label>
            </div>
          ))}
        </div>
      </div>

      {/* Urgency Scale */}
      <div className="space-y-3 border-t pt-6">
        <Label>How urgent is this treatment for you? *</Label>
        <div className="space-y-4">
          <Slider
            value={[parseInt(formData.urgency_scale) || 5]}
            onValueChange={(value) => updateFormData({ urgency_scale: value[0].toString() })}
            min={1}
            max={10}
            step={1}
            className="w-full"
          />
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>Not Urgent (1)</span>
            <span className="font-medium text-foreground">{formData.urgency_scale || 5}</span>
            <span>Very Urgent (10)</span>
          </div>
        </div>
      </div>

      {/* Ready to Proceed */}
      <div className="space-y-3 border-t pt-6">
        <Label>Are you ready to proceed with treatment if approved? *</Label>
        <RadioGroup value={formData.ready_to_proceed} onValueChange={(value) => updateFormData({ ready_to_proceed: value })}>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="immediately" id="ready1" />
            <Label htmlFor="ready1" className="cursor-pointer font-normal">Yes, immediately</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="within_month" id="ready2" />
            <Label htmlFor="ready2" className="cursor-pointer font-normal">Within the next month</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="within_3_months" id="ready3" />
            <Label htmlFor="ready3" className="cursor-pointer font-normal">Within 3 months</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="still_deciding" id="ready4" />
            <Label htmlFor="ready4" className="cursor-pointer font-normal">Still deciding</Label>
          </div>
        </RadioGroup>
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

export default EmotionalDecisionStep;
