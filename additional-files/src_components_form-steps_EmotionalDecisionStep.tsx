import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Form } from '@/components/ui/form';
import { FormData } from '../MultiStepPatientForm';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface EmotionalDecisionStepProps {
  formData: FormData;
  updateFormData: (data: Partial<FormData>) => void;
  onNext: () => void;
  onPrev: () => void;
  isSubmitting?: boolean;
  setIsSubmitting?: (value: boolean) => void;
}

const emotionalDecisionSchema = z.object({
  considering_treatment_time: z.string().min(1, "Please specify how long you've been considering treatment"),
  priority_preference: z.string().min(1, "Please select your priority"),
  treatment_reason: z.array(z.string()).min(1, "Please select at least one reason"),
  urgency_scale: z.string().min(1, "Please rate the urgency"),
  ready_to_proceed: z.string().min(1, "Please specify if you're ready to proceed"),
});

const EmotionalDecisionStep: React.FC<EmotionalDecisionStepProps> = ({ 
  formData, 
  updateFormData, 
  onNext,
  onPrev
}) => {
  const { t } = useTranslation();
  const [showErrors, setShowErrors] = useState(false);
  
  const form = useForm({
    resolver: zodResolver(emotionalDecisionSchema),
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

  const getConsideringTimeOptions = () => [
    { value: "Less than 1 month", label: t('form.emotional.lessThan1Month') },
    { value: "1-3 months", label: t('form.emotional.1To3Months') },
    { value: "3-6 months", label: t('form.emotional.3To6Months') },
    { value: "6-12 months", label: t('form.emotional.6To12Months') },
    { value: "More than 1 year", label: t('form.emotional.moreThan1Year') },
    { value: "Several years", label: t('form.emotional.severalYears') },
  ];

  const getTreatmentReasons = () => [
    { id: "confidence-appearance", label: t('form.emotional.reasons.confidence'), value: "Confidence / Appearance" },
    { id: "pain-relief", label: t('form.emotional.reasons.pain'), value: "Pain Relief" },
    { id: "ability-eat", label: t('form.emotional.reasons.abilityToEat'), value: "Ability to Eat Normally" },
    { id: "work-social", label: t('form.emotional.reasons.workSocial'), value: "Work / Social Impact" },
  ];

  return (
    <Form {...form}>
      <form className="space-y-8">
        <div className="space-y-6">
          <div className="text-center">
            <h3 className="text-lg font-semibold mb-2">{t('form.emotional.title')}</h3>
            <p className="text-muted-foreground">
              {t('form.emotional.description')}
            </p>
          </div>

          <FormField
            control={form.control}
            name="considering_treatment_time"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('form.emotional.consideringTime')} *</FormLabel>
                <FormControl>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select time period" />
                    </SelectTrigger>
                    <SelectContent>
                      {getConsideringTimeOptions().map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
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
            name="priority_preference"
            render={({ field }) => (
              <FormItem className="space-y-3">
                <FormLabel>{t('form.emotional.priorityPreference')} *</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    value={field.value}
                    className="space-y-2"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="Lowest monthly payment" id="lowest-payment" />
                      <label htmlFor="lowest-payment">{t('form.emotional.lowestPayment')}</label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="Fastest approval" id="fastest-approval" />
                      <label htmlFor="fastest-approval">{t('form.emotional.fastestApproval')}</label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="Minimizing overall cost" id="minimizing-cost" />
                      <label htmlFor="minimizing-cost">{t('form.emotional.minimizingCost')}</label>
                    </div>
                  </RadioGroup>
                </FormControl>
                {showErrors && <FormMessage />}
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="treatment_reason"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('form.emotional.treatmentReason')} *</FormLabel>
                <div className="space-y-2">
                  {getTreatmentReasons().map((reason) => (
                    <div key={reason.id} className="flex items-center space-x-2">
                      <Checkbox
                        id={reason.id}
                        checked={field.value?.includes(reason.value) || false}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            field.onChange([...(field.value || []), reason.value]);
                          } else {
                            field.onChange(field.value?.filter((v: string) => v !== reason.value) || []);
                          }
                        }}
                      />
                      <label htmlFor={reason.id} className="text-sm">
                        {reason.label}
                      </label>
                    </div>
                  ))}
                </div>
                {showErrors && <FormMessage />}
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="urgency_scale"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('form.emotional.urgencyScale')} *</FormLabel>
                <FormControl>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger>
                      <SelectValue placeholder={t('form.emotional.urgencyLevel')} />
                    </SelectTrigger>
                    <SelectContent>
                      {[1,2,3,4,5,6,7,8,9,10].map(num => (
                        <SelectItem key={num} value={num.toString()}>
                          {num} {num === 1 ? t('form.emotional.notUrgent') : num === 10 ? t('form.emotional.extremelyUrgent') : ''}
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
            name="ready_to_proceed"
            render={({ field }) => (
              <FormItem className="space-y-3">
                <FormLabel>{t('form.emotional.readyToProceed')} *</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    value={field.value}
                    className="flex flex-row space-x-6"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="Yes" id="ready-yes" />
                      <label htmlFor="ready-yes">{t('form.emotional.yes')}</label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="No" id="ready-no" />
                      <label htmlFor="ready-no">{t('form.emotional.no')}</label>
                    </div>
                  </RadioGroup>
                </FormControl>
                {showErrors && <FormMessage />}
              </FormItem>
            )}
          />
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

export default EmotionalDecisionStep;