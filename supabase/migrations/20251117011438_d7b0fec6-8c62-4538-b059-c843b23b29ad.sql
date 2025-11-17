-- Add missing fields to temp_patient_applications table
ALTER TABLE temp_patient_applications
ADD COLUMN IF NOT EXISTS employer_address text,
ADD COLUMN IF NOT EXISTS treatment_reason text,
ADD COLUMN IF NOT EXISTS urgency_scale integer,
ADD COLUMN IF NOT EXISTS credit_score_unknown boolean DEFAULT false;