-- Add missing financial columns to temp_patient_applications
ALTER TABLE public.temp_patient_applications
ADD COLUMN IF NOT EXISTS checking_balance NUMERIC,
ADD COLUMN IF NOT EXISTS savings_balance NUMERIC,
ADD COLUMN IF NOT EXISTS cash_on_hand NUMERIC,
ADD COLUMN IF NOT EXISTS investments NUMERIC,
ADD COLUMN IF NOT EXISTS retirement_accounts NUMERIC,
ADD COLUMN IF NOT EXISTS home_equity NUMERIC,
ADD COLUMN IF NOT EXISTS owned_vehicles NUMERIC,
ADD COLUMN IF NOT EXISTS business_ownership NUMERIC,
ADD COLUMN IF NOT EXISTS monthly_housing_cost NUMERIC,
ADD COLUMN IF NOT EXISTS mortgage_balance NUMERIC,
ADD COLUMN IF NOT EXISTS credit_card_balances NUMERIC,
ADD COLUMN IF NOT EXISTS personal_loans NUMERIC,
ADD COLUMN IF NOT EXISTS medical_bills NUMERIC,
ADD COLUMN IF NOT EXISTS alimony_child_support NUMERIC,
ADD COLUMN IF NOT EXISTS open_credit_lines NUMERIC,
ADD COLUMN IF NOT EXISTS late_payments NUMERIC,
ADD COLUMN IF NOT EXISTS bankruptcy_history BOOLEAN,
ADD COLUMN IF NOT EXISTS foreclosure_history BOOLEAN;

-- Add comments for the new financial columns
COMMENT ON COLUMN public.temp_patient_applications.checking_balance IS 'Checking account balance';
COMMENT ON COLUMN public.temp_patient_applications.savings_balance IS 'Savings account balance';
COMMENT ON COLUMN public.temp_patient_applications.cash_on_hand IS 'Cash on hand amount';
COMMENT ON COLUMN public.temp_patient_applications.investments IS 'Investment account values';
COMMENT ON COLUMN public.temp_patient_applications.retirement_accounts IS 'Retirement account balances';
COMMENT ON COLUMN public.temp_patient_applications.home_equity IS 'Home equity value';
COMMENT ON COLUMN public.temp_patient_applications.owned_vehicles IS 'Value of owned vehicles';
COMMENT ON COLUMN public.temp_patient_applications.business_ownership IS 'Business ownership value';
COMMENT ON COLUMN public.temp_patient_applications.monthly_housing_cost IS 'Monthly housing cost (rent/mortgage payment)';
COMMENT ON COLUMN public.temp_patient_applications.mortgage_balance IS 'Outstanding mortgage balance';
COMMENT ON COLUMN public.temp_patient_applications.credit_card_balances IS 'Total credit card balances';
COMMENT ON COLUMN public.temp_patient_applications.personal_loans IS 'Personal loan balances';
COMMENT ON COLUMN public.temp_patient_applications.medical_bills IS 'Medical bill amounts';
COMMENT ON COLUMN public.temp_patient_applications.alimony_child_support IS 'Alimony or child support payments';
COMMENT ON COLUMN public.temp_patient_applications.open_credit_lines IS 'Number of open credit lines';
COMMENT ON COLUMN public.temp_patient_applications.late_payments IS 'Number of late payments';
COMMENT ON COLUMN public.temp_patient_applications.bankruptcy_history IS 'Has bankruptcy history';
COMMENT ON COLUMN public.temp_patient_applications.foreclosure_history IS 'Has foreclosure history';