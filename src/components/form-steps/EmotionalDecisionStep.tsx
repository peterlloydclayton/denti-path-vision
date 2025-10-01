import React from 'react';
import { FormData } from '../MultiStepPatientForm';

interface StepProps {
  formData: FormData;
  updateFormData: (data: Partial<FormData>) => void;
  onNext: () => void;
  onPrev: () => void;
  isSubmitting: boolean;
  setIsSubmitting: (val: boolean) => void;
}

const EmotionalDecisionStep: React.FC<StepProps> = ({ formData, updateFormData, onNext, onPrev }) => {
  return (
    <div>
      <p className="text-muted-foreground mb-4">Emotional & Decision Urgency form step - To be implemented</p>
      <div className="flex gap-4">
        <button onClick={onPrev} className="px-4 py-2 bg-secondary text-secondary-foreground rounded">
          Previous
        </button>
        <button onClick={onNext} className="px-4 py-2 bg-primary text-primary-foreground rounded">
          Next
        </button>
      </div>
    </div>
  );
};

export default EmotionalDecisionStep;
