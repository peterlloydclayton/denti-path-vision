# Field Mapping Debug Document

## Form Fields by Step

### Step 1: Personal Info
- first_name → DB: first_name
- middle_name → DB: middle_name
- last_name → DB: last_name
- date_of_birth (object) → DB: date_of_birth (string YYYY-MM-DD)
- ssn → DB: ssn
- drivers_license → DB: drivers_license
- sex → DB: sex
- marital_status → DB: marital_status
- primary_phone → DB: mobile_phone
- secondary_phone → DB: secondary_phone
- email → DB: email
- street_address → DB: home_street_address
- city → DB: home_city
- state → DB: home_state
- zip_code → DB: home_zip
- time_at_address → DB: time_at_address
- rent_or_own → DB: rent_or_own
- previous_address → DB: previous_address
- emergency_contact_name → DB: emergency_contact_name
- emergency_contact_relationship → DB: emergency_contact_relationship
- emergency_contact_phone → DB: emergency_contact_phone
- referring_practice → DB: referring_practice
- referring_provider_name → DB: referring_provider_name
- referring_contact_info → DB: referring_contact_info
- referring_provider_email → DB: referring_provider_email
- estimated_treatment_cost → DB: estimated_treatment_cost

### Step 2: Employment & Income
- current_employer → DB: employer_name
- employer_address → DB: employer_address
- job_title → DB: job_title
- employment_type → DB: employment_status
- length_of_employment → DB: length_of_employment
- monthly_gross_income → DB: monthly_income
- monthly_net_income → DB: monthly_net_income
- pay_frequency → DB: pay_frequency
- secondary_income_sources → DB: secondary_income_sources
- household_total_income → NOT SENT (not in allowedFields)
- spouse_employer → DB: spouse_employer
- spouse_income → NOT SENT (not in allowedFields)

### Step 3: Financial Overview
- checking_balance → DB: checking_balance
- savings_balance → NOT SENT (not in allowedFields)
- retirement_accounts → NOT SENT (not in allowedFields)
- investment_accounts → DB: investments (via mortgage_rent_payment mapping)
- mortgage_rent_payment → DB: monthly_housing_cost
- credit_score → NOT SENT (not in allowedFields)
- credit_score_unknown → NOT SENT (not in allowedFields)

### Step 4: Emotional & Decision
- considering_treatment_time → DB: considering_treatment_time
- priority_preference → DB: priority_preference
- treatment_reason (array) → DB: treatment_reason (needs array conversion)
- urgency_scale → DB: urgency_scale (as integer)
- ready_to_proceed → DB: ready_to_proceed

### Step 5: Compliance
- authorize_credit_report → DB: consent_credit_pull
- consent_communications → DB: consent_communications
- understand_no_credit_impact → DB: understand_no_credit_impact
- confirm_information_accurate → DB: confirm_information_accurate

## Fields Missing from Current Submit:
- household_total_income (form field exists, not being sent)
- spouse_income (form field exists, not being sent)
- savings_balance (form field exists, not being sent)
- retirement_accounts (form field exists, not being sent)
- credit_score (form field exists, not being sent)
- credit_score_unknown (form field exists, not being sent)

## Fields in allowedFields that don't exist in form:
- None identified

## Action Required:
Add missing financial fields to the allowedFields object in the edge function.
