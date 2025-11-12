-- Add consent_credit_pull column to temp_patient_applications
ALTER TABLE public.temp_patient_applications 
ADD COLUMN consent_credit_pull boolean DEFAULT false;