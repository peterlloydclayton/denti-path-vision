-- Add expires_at column for application expiration
ALTER TABLE public.temp_patient_applications
ADD COLUMN IF NOT EXISTS expires_at TIMESTAMP WITH TIME ZONE;