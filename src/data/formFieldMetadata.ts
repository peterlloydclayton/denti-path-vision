/**
 * Form Field Metadata for Echo Lite Form Awareness
 * Maps each form step to its fields with descriptions for voice agent context
 */

export interface FieldMetadata {
  name: string;
  label: string;
  description: string;
  type: 'text' | 'number' | 'select' | 'checkbox' | 'date' | 'phone' | 'email' | 'ssn' | 'currency' | 'slider' | 'multi-select';
  required: boolean;
  sensitive?: boolean;
  validationHint?: string;
}

export interface StepMetadata {
  stepNumber: number;
  title: string;
  description: string;
  fields: FieldMetadata[];
}

export const FORM_STEPS: StepMetadata[] = [
  {
    stepNumber: 1,
    title: 'Personal Information',
    description: 'Basic identity, contact details, and treatment cost estimate',
    fields: [
      { name: 'first_name', label: 'First Name', description: 'Your legal first name', type: 'text', required: true },
      { name: 'middle_name', label: 'Middle Name', description: 'Your middle name if applicable', type: 'text', required: false },
      { name: 'last_name', label: 'Last Name', description: 'Your legal last name', type: 'text', required: true },
      { name: 'date_of_birth', label: 'Date of Birth', description: 'Your birth date for identity verification', type: 'date', required: true },
      { name: 'ssn', label: 'Social Security Number', description: 'Required for credit verification - encrypted and secure', type: 'ssn', required: true, sensitive: true, validationHint: 'Format: XXX-XX-XXXX' },
      { name: 'drivers_license', label: "Driver's License", description: 'Your license number for identity verification', type: 'text', required: false },
      { name: 'sex', label: 'Sex', description: 'Your biological sex', type: 'select', required: true },
      { name: 'marital_status', label: 'Marital Status', description: 'Your current marital status', type: 'select', required: true },
      { name: 'primary_phone', label: 'Primary Phone', description: 'Best number to reach you', type: 'phone', required: true, validationHint: 'Format: (XXX) XXX-XXXX' },
      { name: 'secondary_phone', label: 'Secondary Phone', description: 'Alternate contact number', type: 'phone', required: false },
      { name: 'email', label: 'Email Address', description: 'For application updates and documents', type: 'email', required: true },
      { name: 'street_address', label: 'Street Address', description: 'Your current home address', type: 'text', required: true },
      { name: 'city', label: 'City', description: 'City of residence', type: 'text', required: true },
      { name: 'state', label: 'State', description: 'State of residence', type: 'select', required: true },
      { name: 'zip_code', label: 'ZIP Code', description: 'Your postal code', type: 'text', required: true, validationHint: '5-digit ZIP code' },
      { name: 'time_at_address', label: 'Time at Address', description: 'How long you have lived at this address', type: 'select', required: true },
      { name: 'rent_or_own', label: 'Rent or Own', description: 'Whether you rent or own your home', type: 'select', required: true },
      { name: 'previous_address', label: 'Previous Address', description: 'If less than 2 years at current address', type: 'text', required: false },
      { name: 'emergency_contact_name', label: 'Emergency Contact Name', description: 'Someone we can contact in emergencies', type: 'text', required: true },
      { name: 'emergency_contact_relationship', label: 'Emergency Contact Relationship', description: 'Relationship to emergency contact', type: 'text', required: true },
      { name: 'emergency_contact_phone', label: 'Emergency Contact Phone', description: 'Phone number for emergency contact', type: 'phone', required: true },
      { name: 'referring_practice', label: 'Referring Practice', description: 'Dental practice that referred you (optional)', type: 'text', required: false },
      { name: 'referring_provider_name', label: 'Referring Provider Name', description: 'Name of your dentist', type: 'text', required: false },
      { name: 'referring_contact_info', label: 'Referring Contact Info', description: 'Practice contact information', type: 'text', required: false },
      { name: 'referring_provider_email', label: 'Referring Provider Email', description: 'Email for provider communications', type: 'email', required: false },
      { name: 'estimated_cost', label: 'Estimated Treatment Cost', description: 'Approximate cost of your dental treatment', type: 'currency', required: true, validationHint: 'Enter the amount quoted by your dentist' },
    ]
  },
  {
    stepNumber: 2,
    title: 'Employment & Income',
    description: 'Work status and income to determine affordability',
    fields: [
      { name: 'current_employer', label: 'Current Employer', description: 'Name of your employer', type: 'text', required: true },
      { name: 'employer_address', label: 'Employer Address', description: 'Work location address', type: 'text', required: false },
      { name: 'job_title', label: 'Job Title', description: 'Your current position', type: 'text', required: true },
      { name: 'employment_type', label: 'Employment Type', description: 'Full-time, part-time, self-employed, etc.', type: 'select', required: true },
      { name: 'length_of_employment', label: 'Length of Employment', description: 'How long at current job', type: 'select', required: true },
      { name: 'monthly_gross_income', label: 'Monthly Gross Income', description: 'Income before taxes', type: 'currency', required: true, sensitive: true },
      { name: 'monthly_net_income', label: 'Monthly Net Income', description: 'Take-home pay after taxes', type: 'currency', required: true, sensitive: true },
      { name: 'pay_frequency', label: 'Pay Frequency', description: 'How often you get paid', type: 'select', required: true },
      { name: 'secondary_income_sources', label: 'Secondary Income Sources', description: 'Any additional income sources', type: 'text', required: false },
      { name: 'household_total_income', label: 'Household Total Income', description: 'Combined household monthly income', type: 'currency', required: false, sensitive: true },
      { name: 'spouse_employer', label: 'Spouse Employer', description: "Spouse's employer if applicable", type: 'text', required: false },
      { name: 'spouse_income', label: 'Spouse Income', description: "Spouse's monthly income", type: 'currency', required: false, sensitive: true },
    ]
  },
  {
    stepNumber: 3,
    title: 'Financial Overview',
    description: 'Assets and existing obligations to understand the full picture',
    fields: [
      { name: 'checking_balance', label: 'Checking Account Balance', description: 'Approximate current balance', type: 'currency', required: false, sensitive: true },
      { name: 'savings_balance', label: 'Savings Account Balance', description: 'Total savings on hand', type: 'currency', required: false, sensitive: true },
      { name: 'retirement_accounts', label: 'Retirement Accounts', description: '401k, IRA, pension values', type: 'currency', required: false, sensitive: true },
      { name: 'investment_accounts', label: 'Investment Accounts', description: 'Stocks, bonds, other investments', type: 'currency', required: false, sensitive: true },
      { name: 'mortgage_rent_payment', label: 'Monthly Housing Payment', description: 'Mortgage or rent amount', type: 'currency', required: true },
      { name: 'credit_score', label: 'Credit Score', description: 'Your estimated credit score', type: 'number', required: false, sensitive: true, validationHint: 'Typically between 300-850' },
      { name: 'credit_score_unknown', label: "I Don't Know My Credit Score", description: "Check if you're unsure of your score", type: 'checkbox', required: false },
    ]
  },
  {
    stepNumber: 4,
    title: 'Emotional & Decision Factors',
    description: 'Understanding your motivations helps us serve you better',
    fields: [
      { name: 'considering_treatment_time', label: 'Time Considering Treatment', description: 'How long have you been thinking about this treatment', type: 'select', required: true },
      { name: 'priority_preference', label: 'Priority Preference', description: 'What matters most: speed, cost, or quality', type: 'select', required: true },
      { name: 'treatment_reason', label: 'Reasons for Treatment', description: 'Why you want this dental work', type: 'multi-select', required: true },
      { name: 'urgency_scale', label: 'Urgency Level', description: 'How urgent is this treatment (1-10)', type: 'slider', required: true },
      { name: 'ready_to_proceed', label: 'Ready to Proceed', description: 'Your readiness to start treatment', type: 'select', required: true },
    ]
  },
  {
    stepNumber: 5,
    title: 'Compliance & Signature',
    description: 'Legal consents and electronic signature - almost done!',
    fields: [
      { name: 'authorize_credit_report', label: 'Authorize Credit Report', description: 'Permission to check credit for financing options', type: 'checkbox', required: true },
      { name: 'consent_communications', label: 'Consent to Communications', description: 'Allow us to contact you about your application', type: 'checkbox', required: true },
      { name: 'understand_no_credit_impact', label: 'Understand Soft Pull', description: 'Initial check does not impact your credit score', type: 'checkbox', required: true },
      { name: 'confirm_information_accurate', label: 'Confirm Information Accurate', description: 'Certify all provided information is true', type: 'checkbox', required: true },
      { name: 'signerName', label: 'Signature Name', description: 'Type your full legal name as signature', type: 'text', required: true },
      { name: 'signatureDate', label: 'Signature Date', description: 'Date of electronic signature', type: 'date', required: true },
    ]
  },
  {
    stepNumber: 6,
    title: 'Confirmation',
    description: 'Review submission status - congratulations!',
    fields: []
  }
];

/**
 * Get step metadata by step number (1-indexed)
 */
export const getStepByNumber = (stepNumber: number): StepMetadata | undefined => {
  return FORM_STEPS.find(step => step.stepNumber === stepNumber);
};

/**
 * Get field names for a specific step
 */
export const getFieldNamesForStep = (stepNumber: number): string[] => {
  const step = getStepByNumber(stepNumber);
  return step ? step.fields.map(f => f.label) : [];
};

/**
 * Get field metadata by field name
 */
export const getFieldMetadata = (fieldName: string): FieldMetadata | undefined => {
  for (const step of FORM_STEPS) {
    const field = step.fields.find(f => f.name === fieldName);
    if (field) return field;
  }
  return undefined;
};

/**
 * Check if a field is sensitive
 */
export const isFieldSensitive = (fieldName: string): boolean => {
  const field = getFieldMetadata(fieldName);
  return field?.sensitive ?? false;
};
