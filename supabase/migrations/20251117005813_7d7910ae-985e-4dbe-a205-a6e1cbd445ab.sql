-- Add missing compliance checkbox fields to temp_patient_applications table
ALTER TABLE temp_patient_applications
ADD COLUMN IF NOT EXISTS confirm_information_accurate boolean DEFAULT false,
ADD COLUMN IF NOT EXISTS authorize_credit_report boolean DEFAULT false,
ADD COLUMN IF NOT EXISTS consent_communications boolean DEFAULT false,
ADD COLUMN IF NOT EXISTS understand_no_credit_impact boolean DEFAULT false;