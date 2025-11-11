-- Add missing referral information fields to temp_patient_applications table
ALTER TABLE public.temp_patient_applications
ADD COLUMN IF NOT EXISTS referring_provider_name TEXT,
ADD COLUMN IF NOT EXISTS referring_contact_info TEXT;

-- Add comments for clarity
COMMENT ON COLUMN public.temp_patient_applications.referring_practice IS 'Name of the dental practice/office referring the patient';
COMMENT ON COLUMN public.temp_patient_applications.referring_provider_name IS 'Name of the referring provider/dentist (e.g., Dr. John Smith)';
COMMENT ON COLUMN public.temp_patient_applications.referring_contact_info IS 'Contact information for the referring provider (phone or email)';
COMMENT ON COLUMN public.temp_patient_applications.referring_provider_email IS 'Email address of the referring provider';
COMMENT ON COLUMN public.temp_patient_applications.estimated_treatment_cost IS 'Estimated cost of the dental treatment';