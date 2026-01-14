/**
 * Form Context Hook for Echo Lite Voice Agent Integration
 * Detects current form step and dispatches context updates
 */

import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { getStepByNumber, getFieldNamesForStep } from '@/data/formFieldMetadata';

export interface FormContext {
  isOnForm: boolean;
  currentStep: number | null;
  stepTitle: string | null;
  fields: string[];
}

/**
 * Custom event for step changes that the VoiceAgent can listen to
 */
export const FORM_STEP_CHANGE_EVENT = 'echo-form-step-change';

export interface FormStepChangeDetail {
  stepNumber: number;
  stepTitle: string;
  fields: string[];
}

/**
 * Dispatch a form step change event for the voice agent
 */
export const dispatchStepChange = (stepNumber: number, stepTitle: string, fields: string[]): void => {
  const event = new CustomEvent<FormStepChangeDetail>(FORM_STEP_CHANGE_EVENT, {
    detail: { stepNumber, stepTitle, fields }
  });
  window.dispatchEvent(event);
};

/**
 * Hook to detect if user is on the patient financing form
 */
export const useFormContext = (): FormContext => {
  const location = useLocation();
  const [context, setContext] = useState<FormContext>({
    isOnForm: false,
    currentStep: null,
    stepTitle: null,
    fields: []
  });

  useEffect(() => {
    const isOnForm = location.pathname === '/patient-financing-application' || 
                     location.pathname === '/apply';
    
    setContext(prev => ({
      ...prev,
      isOnForm
    }));
  }, [location.pathname]);

  return context;
};

/**
 * Generate a page context message for Echo Lite
 */
export const getPageContext = (pathname: string, stepNumber?: number): string => {
  const pageContextMap: Record<string, string> = {
    '/': 'Home page - General information about DentiPay',
    '/patients': 'Patients page - Information about dental financing for patients',
    '/providers': 'Providers page - Information for dental practices',
    '/about': 'About page - Company information',
    '/patient-financing-application': 'Patient Financing Application Form',
    '/apply': 'Patient Financing Application Form',
  };

  let context = pageContextMap[pathname] || `Page: ${pathname}`;

  if ((pathname === '/patient-financing-application' || pathname === '/apply') && stepNumber) {
    const stepMeta = getStepByNumber(stepNumber);
    if (stepMeta) {
      context += ` - Step ${stepNumber}: ${stepMeta.title}. ${stepMeta.description}`;
      const fields = getFieldNamesForStep(stepNumber);
      if (fields.length > 0) {
        context += `. Fields: ${fields.slice(0, 5).join(', ')}${fields.length > 5 ? '...' : ''}`;
      }
    }
  }

  return context;
};
