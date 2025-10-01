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

const PersonalInfoStep: React.FC<StepProps> = ({ formData, updateFormData, onNext }) => {
  return (
    <div>
      <p className="text-muted-foreground mb-4">Personal information form step - To be implemented</p>
      <button onClick={onNext} className="px-4 py-2 bg-primary text-primary-foreground rounded">
        Next
      </button>
    </div>
  );
};

export default PersonalInfoStep;
