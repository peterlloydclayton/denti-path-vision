-- Remove old checking_savings column (replaced with separate checking_balance and savings_balance)
ALTER TABLE public.temp_patient_applications
DROP COLUMN IF EXISTS checking_savings;

-- Remove other old combined/duplicate columns that are now handled separately
ALTER TABLE public.temp_patient_applications
DROP COLUMN IF EXISTS credit_cards,
DROP COLUMN IF EXISTS mortgage_rent;