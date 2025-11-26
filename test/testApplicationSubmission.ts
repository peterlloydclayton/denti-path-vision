/**
 * Test Application Submission Function
 * 
 * Generates and submits complete patient financing applications for testing.
 * Tracks submissions in CSV file: test/test-records.csv
 * 
 * Email format: peter+[MM]-[DD]-[aaa]@vypple.com
 * Sequential counter (aaa) resets daily
 * 
 * Usage:
 *   import { testSubmitApplication } from './test/testApplicationSubmission';
 *   await testSubmitApplication();
 */

import { createSignedPDF, generateDocumentHash } from '../src/utils/pdfUtils';
import { getUserIP } from '../src/utils/auditUtils';

// Get user agent (with fallback)
function getUserAgent(): string {
  if (typeof navigator !== 'undefined' && navigator.userAgent) {
    return navigator.userAgent;
  }
  return 'Test-Agent/1.0';
}

// CSV file path (relative to project root)
const CSV_FILE_PATH = '/test/test-records.csv';

// First names for random generation
const FIRST_NAMES = [
  'John', 'Jane', 'Michael', 'Sarah', 'David', 'Emily', 'James', 'Jessica',
  'Robert', 'Ashley', 'William', 'Amanda', 'Richard', 'Melissa', 'Joseph', 'Deborah',
  'Thomas', 'Stephanie', 'Charles', 'Rebecca', 'Christopher', 'Sharon', 'Daniel', 'Laura',
  'Matthew', 'Michelle', 'Anthony', 'Kimberly', 'Mark', 'Amy', 'Donald', 'Angela'
];

// Last names for random generation
const LAST_NAMES = [
  'Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis',
  'Rodriguez', 'Martinez', 'Hernandez', 'Lopez', 'Wilson', 'Anderson', 'Thomas', 'Taylor',
  'Moore', 'Jackson', 'Martin', 'Lee', 'Thompson', 'White', 'Harris', 'Sanchez',
  'Clark', 'Ramirez', 'Lewis', 'Robinson', 'Walker', 'Young', 'Allen', 'King'
];

// Middle names (optional)
const MIDDLE_NAMES = [
  'Michael', 'James', 'Robert', 'John', 'William', 'David', 'Richard', 'Joseph',
  'Thomas', 'Charles', 'Christopher', 'Daniel', 'Matthew', 'Anthony', 'Mark', 'Donald',
  'Steven', 'Paul', 'Andrew', 'Joshua', 'Kenneth', 'Kevin', 'Brian', 'George'
];

// Cities for random generation
const CITIES = [
  'New York', 'Los Angeles', 'Chicago', 'Houston', 'Phoenix', 'Philadelphia', 'San Antonio',
  'San Diego', 'Dallas', 'San Jose', 'Austin', 'Jacksonville', 'Fort Worth', 'Columbus',
  'Charlotte', 'San Francisco', 'Indianapolis', 'Seattle', 'Denver', 'Washington', 'Boston',
  'El Paso', 'Nashville', 'Detroit', 'Oklahoma City', 'Portland', 'Las Vegas', 'Memphis',
  'Louisville', 'Baltimore', 'Milwaukee', 'Albuquerque', 'Tucson', 'Fresno', 'Sacramento'
];

// US States
const US_STATES = [
  'AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA', 'HI', 'ID', 'IL', 'IN',
  'IA', 'KS', 'KY', 'LA', 'ME', 'MD', 'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV',
  'NH', 'NJ', 'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC', 'SD', 'TN',
  'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY'
];

// Job titles
const JOB_TITLES = [
  'Software Engineer', 'Marketing Manager', 'Sales Representative', 'Teacher', 'Nurse',
  'Accountant', 'Project Manager', 'Designer', 'Consultant', 'Analyst', 'Director',
  'Coordinator', 'Specialist', 'Administrator', 'Supervisor', 'Executive', 'Assistant',
  'Developer', 'Manager', 'Engineer', 'Technician', 'Clerk', 'Officer', 'Agent'
];

// Company names
const COMPANY_NAMES = [
  'Tech Solutions Inc', 'Global Industries', 'Digital Services', 'Innovation Corp',
  'Enterprise Systems', 'Advanced Technologies', 'Creative Solutions', 'Strategic Partners',
  'Premier Services', 'Elite Group', 'Dynamic Solutions', 'Progressive Systems',
  'Modern Enterprises', 'Future Technologies', 'Smart Solutions', 'Prime Services'
];

// Referring practices
const DENTAL_PRACTICES = [
  'Bright Smile Dental', 'Family Dentistry', 'Advanced Dental Care', 'Smile Center',
  'Perfect Teeth Dental', 'Comprehensive Dental', 'Elite Dental Group', 'Modern Dentistry',
  'Gentle Care Dental', 'Premier Dental', 'Coastal Dental', 'Mountain View Dental'
];

// Provider names
const PROVIDER_NAMES = [
  'Dr. Smith', 'Dr. Johnson', 'Dr. Williams', 'Dr. Brown', 'Dr. Davis', 'Dr. Miller',
  'Dr. Wilson', 'Dr. Moore', 'Dr. Taylor', 'Dr. Anderson', 'Dr. Thomas', 'Dr. Jackson'
];

// Treatment reasons
const TREATMENT_REASONS = [
  'Confidence / Appearance',
  'Pain Relief',
  'Ability to Eat Normally',
  'Work / Social Impact'
];

// Helper function to generate random number in range
function randomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Helper function to pick random element from array
function randomChoice<T>(array: T[]): T {
  return array[Math.floor(Math.random() * array.length)];
}

// Generate sequential email counter (aaa, aab, aac, ..., zzz)
function generateSequentialCode(sequence: number): string {
  const base = 26;
  let code = '';
  let num = sequence;
  
  for (let i = 0; i < 3; i++) {
    code = String.fromCharCode(97 + (num % base)) + code; // 97 is 'a'
    num = Math.floor(num / base);
  }
  
  return code;
}

// Read CSV and get next sequence number for today
async function getNextSequenceForToday(): Promise<number> {
  try {
    // In browser environment, we'll use localStorage to track sequence
    // For Node.js, we'd read the CSV file
    const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD
    const storageKey = `test_app_seq_${today}`;
    
    // Try to get from localStorage
    if (typeof window !== 'undefined' && window.localStorage) {
      const stored = localStorage.getItem(storageKey);
      if (stored) {
        const nextSeq = parseInt(stored, 10) + 1;
        localStorage.setItem(storageKey, nextSeq.toString());
        return nextSeq;
      } else {
        localStorage.setItem(storageKey, '0');
        return 0;
      }
    }
    
    // Fallback: use timestamp-based sequence
    return Date.now() % (26 * 26 * 26);
  } catch (error) {
    console.error('Error getting sequence:', error);
    return Math.floor(Math.random() * (26 * 26 * 26));
  }
}

// Generate unique email
async function generateEmail(): Promise<string> {
  const now = new Date();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  const sequence = await getNextSequenceForToday();
  const code = generateSequentialCode(sequence);
  
  return `peter+${month}-${day}-${code}@vypple.com`;
}

// Generate random SSN (9 digits)
function generateSSN(): string {
  return Array.from({ length: 9 }, () => randomInt(0, 9)).join('');
}

// Generate random phone number (10 digits)
function generatePhone(): string {
  return Array.from({ length: 10 }, () => randomInt(0, 9)).join('');
}

// Generate random ZIP code (5 digits)
function generateZIP(): string {
  return Array.from({ length: 5 }, () => randomInt(0, 9)).join('');
}

// Generate random date of birth (18-80 years old)
function generateDateOfBirth(): { day: string; month: string; year: string } {
  const currentYear = new Date().getFullYear();
  const year = randomInt(currentYear - 80, currentYear - 18);
  const month = String(randomInt(1, 12)).padStart(2, '0');
  const daysInMonth = new Date(year, parseInt(month), 0).getDate();
  const day = String(randomInt(1, daysInMonth)).padStart(2, '0');
  
  return { day, month, year: year.toString() };
}

// Generate random street address
function generateStreetAddress(): string {
  const numbers = randomInt(100, 9999);
  const streets = ['Main St', 'Oak Ave', 'Park Blvd', 'Elm St', 'Maple Dr', 'Cedar Ln', 'Pine Rd', 'First St', 'Second Ave', 'Washington St'];
  return `${numbers} ${randomChoice(streets)}`;
}

// Generate random driver's license
function generateDriversLicense(): string {
  const letters = Array.from({ length: 2 }, () => String.fromCharCode(65 + randomInt(0, 25))).join('');
  const numbers = Array.from({ length: 7 }, () => randomInt(0, 9)).join('');
  return `${letters}${numbers}`;
}

// Write to CSV (browser-compatible using localStorage)
async function writeToCSV(name: string, email: string, success: boolean): Promise<void> {
  const now = new Date();
  const dateTime = now.toISOString();
  const status = success ? 'Success' : 'Failed';
  
  // Escape commas in name/email for CSV
  const escapeCSV = (str: string) => {
    if (str.includes(',') || str.includes('"') || str.includes('\n')) {
      return `"${str.replace(/"/g, '""')}"`;
    }
    return str;
  };
  
  const csvRow = `${escapeCSV(name)},${escapeCSV(email)},${dateTime},${status}\n`;
  
  try {
    // In browser, we can't directly write to file system
    // So we'll use localStorage to track and provide download
    if (typeof window !== 'undefined') {
      const storageKey = 'test_app_records';
      const existing = localStorage.getItem(storageKey) || 'Name,Email,Submission Date/Time,Success Status\n';
      const updated = existing + csvRow;
      localStorage.setItem(storageKey, updated);
      
      // Also log to console for visibility
      console.log('📝 CSV Record:', csvRow.trim());
    }
  } catch (error) {
    console.error('Error writing to CSV:', error);
  }
}

// Download CSV file
export function downloadTestRecordsCSV(): void {
  try {
    if (typeof window === 'undefined') {
      console.error('Cannot download CSV: not in browser environment');
      return;
    }
    
    const storageKey = 'test_app_records';
    const csvContent = localStorage.getItem(storageKey) || 'Name,Email,Submission Date/Time,Success Status\n';
    
    // Create blob and download
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    
    link.setAttribute('href', url);
    link.setAttribute('download', `test-records-${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    console.log('✅ CSV downloaded successfully');
  } catch (error) {
    console.error('Error downloading CSV:', error);
  }
}

// Generate complete application data
async function generateApplicationData(): Promise<any> {
  const firstName = randomChoice(FIRST_NAMES);
  const lastName = randomChoice(LAST_NAMES);
  const middleName = Math.random() > 0.5 ? randomChoice(MIDDLE_NAMES) : '';
  const email = await generateEmail();
  const dateOfBirth = generateDateOfBirth();
  const city = randomChoice(CITIES);
  const state = randomChoice(US_STATES);
  const zipCode = generateZIP();
  const streetAddress = generateStreetAddress();
  const primaryPhone = generatePhone();
  const secondaryPhone = Math.random() > 0.7 ? generatePhone() : '';
  const ssn = generateSSN();
  const driversLicense = generateDriversLicense();
  const sex = randomChoice(['Male', 'Female', 'Prefer Not To Answer']);
  const maritalStatus = randomChoice(['Single', 'Married', 'Divorced', 'Widowed', 'Separated']);
  const timeAtAddress = randomChoice([
    'Less than 6 months',
    '6 months - 1 year',
    '1 - 2 years',
    '2 - 5 years',
    '5+ years'
  ]);
  const rentOrOwn = randomChoice(['Rent', 'Own']);
  const previousAddress = Math.random() > 0.5 ? `${randomInt(100, 9999)} Previous St, Old City, ${randomChoice(US_STATES)} ${generateZIP()}` : '';
  
  const emergencyContactName = `${randomChoice(FIRST_NAMES)} ${randomChoice(LAST_NAMES)}`;
  const emergencyContactRelationship = randomChoice(['Spouse', 'Family Member', 'Friend', 'Colleague', 'Neighbor', 'Other']);
  const emergencyContactPhone = generatePhone();
  
  const referringPractice = randomChoice(DENTAL_PRACTICES);
  const referringProviderName = randomChoice(PROVIDER_NAMES);
  const referringContactInfo = `(555) ${randomInt(100, 999)}-${randomInt(1000, 9999)}`;
  const referringProviderEmail = `dr.${randomChoice(LAST_NAMES).toLowerCase()}@${referringPractice.toLowerCase().replace(/\s+/g, '')}.com`;
  const estimatedCost = randomInt(1000, 50000);
  
  const currentEmployer = randomChoice(COMPANY_NAMES);
  const employerAddress = `${randomInt(100, 9999)} Business Blvd, ${city}, ${state} ${zipCode}`;
  const jobTitle = randomChoice(JOB_TITLES);
  const employmentType = randomChoice(['Full-Time', 'Part-Time', 'Self-Employed', 'Unemployed', 'Retired', 'Student', 'Other']);
  const lengthOfEmployment = randomChoice([
    'Less than 6 months',
    '6 months - 1 year',
    '1 - 2 years',
    '2 - 5 years',
    '5+ years'
  ]);
  const monthlyGrossIncome = randomInt(2000, 15000);
  const monthlyNetIncome = Math.floor(monthlyGrossIncome * 0.75);
  const payFrequency = randomChoice(['Weekly', 'Bi-Weekly', 'Monthly']);
  const secondaryIncomeSources = Math.random() > 0.6 ? 'Freelance work, investments' : '';
  const householdTotalIncome = maritalStatus === 'Married' ? randomInt(monthlyGrossIncome, monthlyGrossIncome * 2) : monthlyGrossIncome;
  const spouseEmployer = maritalStatus === 'Married' && Math.random() > 0.5 ? randomChoice(COMPANY_NAMES) : '';
  const spouseIncome = maritalStatus === 'Married' && spouseEmployer ? randomInt(1500, 10000) : undefined;
  
  const checkingBalance = randomInt(500, 50000);
  const savingsBalance = randomInt(1000, 100000);
  const retirementAccounts = randomInt(0, 500000);
  const investmentAccounts = randomInt(0, 200000);
  const mortgageRentPayment = randomInt(800, 3000);
  const creditScoreUnknown = Math.random() > 0.7;
  const creditScore = creditScoreUnknown ? undefined : randomInt(550, 850);
  
  const consideringTreatmentTime = randomChoice([
    'Less than 1 month',
    '1-3 months',
    '3-6 months',
    '6-12 months',
    'More than 1 year',
    'Several years'
  ]);
  const priorityPreference = randomChoice([
    'Lowest monthly payment',
    'Fastest approval',
    'Minimizing overall cost'
  ]);
  const treatmentReason = [randomChoice(TREATMENT_REASONS)];
  if (Math.random() > 0.5) {
    const secondReason = randomChoice(TREATMENT_REASONS.filter(r => !treatmentReason.includes(r)));
    if (secondReason) treatmentReason.push(secondReason);
  }
  const urgencyScale = randomInt(1, 10).toString();
  const readyToProceed = randomChoice(['Yes', 'No']);
  
  // Generate signature data
  const documentContent = 'Patient Financing Agreement - Test Document';
  const signerName = `${firstName} ${lastName}`;
  const signerEmail = email;
  const consentGiven = true;
  const ipAddress = await getUserIP();
  const userAgent = getUserAgent();
  const documentHash = await generateDocumentHash(documentContent);
  const documentId = 'patient-financing-agreement';
  const pdfBytes = await createSignedPDF(documentContent, signerName, new Date().toLocaleDateString());
  const pdfBase64 = btoa(String.fromCharCode(...pdfBytes));
  
  // Build application data matching the v2 endpoint format
  const applicationData = {
    first_name: firstName,
    middle_name: middleName,
    last_name: lastName,
    email: email,
    mobile_phone: primaryPhone,
    secondary_phone: secondaryPhone || undefined,
    date_of_birth: `${dateOfBirth.year}-${dateOfBirth.month}-${dateOfBirth.day}`,
    sex: sex,
    ssn: ssn,
    drivers_license: driversLicense,
    marital_status: maritalStatus,
    home_street_address: streetAddress,
    home_city: city,
    home_state: state,
    home_zip: zipCode,
    time_at_address: timeAtAddress,
    rent_or_own: rentOrOwn,
    previous_address: previousAddress || undefined,
    emergency_contact_name: emergencyContactName,
    emergency_contact_relationship: emergencyContactRelationship,
    emergency_contact_phone: emergencyContactPhone,
    referring_practice: referringPractice,
    referring_provider_name: referringProviderName,
    referring_contact_info: referringContactInfo,
    referring_provider_email: referringProviderEmail,
    estimated_cost: estimatedCost,
    employer_name: currentEmployer,
    employer_address: employerAddress,
    job_title: jobTitle,
    employment_type: employmentType,
    length_of_employment: lengthOfEmployment,
    monthly_income: monthlyGrossIncome,
    monthly_net_income: monthlyNetIncome,
    pay_frequency: payFrequency,
    secondary_income_sources: secondaryIncomeSources || undefined,
    household_total_income: householdTotalIncome,
    spouse_employer: spouseEmployer || undefined,
    spouse_income: spouseIncome,
    checking_balance: checkingBalance,
    savings_balance: savingsBalance,
    retirement_accounts: retirementAccounts,
    investments: investmentAccounts,
    monthly_housing_cost: mortgageRentPayment,
    credit_score: creditScore,
    credit_score_unknown: creditScoreUnknown,
    considering_treatment_time: consideringTreatmentTime,
    priority_preference: priorityPreference,
    treatment_reason: treatmentReason,
    urgency_scale: urgencyScale,
    ready_to_proceed: readyToProceed,
    consent_credit_pull: true,
    consent_communications: true,
    understand_no_credit_impact: true,
    confirm_information_accurate: true,
    signature_data: {
      signer_name: signerName,
      signer_email: signerEmail,
      consent_given: consentGiven,
      ip_address: ipAddress,
      user_agent: userAgent,
      document_hash: documentHash,
      document_id: documentId,
      pdf_base64: pdfBase64
    }
  };
  
  return { applicationData, name: `${firstName} ${lastName}`, email };
}

// Main test function
export async function testSubmitApplication(): Promise<{ success: boolean; message: string; data?: any }> {
  try {
    console.log('🧪 Starting test application submission...');
    
    // Generate application data
    const { applicationData, name, email } = await generateApplicationData();
    
    console.log('📝 Generated application for:', name, email);
    console.log('📤 Submitting to v2 endpoint...');
    
    // Check if we're running from an allowed origin
    const currentOrigin = typeof window !== 'undefined' ? window.location.origin : '';
    const allowedOrigins = [
      'https://edebd0262cb9.ngrok-free.app',
      'https://denti-path-vision.lovable.app',
      'https://dental-docs-hub.lovable.app'
    ];
    const isAllowedOrigin = allowedOrigins.some(origin => currentOrigin.includes(origin));
    
    if (!isAllowedOrigin && currentOrigin) {
      console.error('❌ Error: Running from origin that is not allowed:', currentOrigin);
      console.error('💡 You must run this from ngrok URL: https://edebd0262cb9.ngrok-free.app');
      console.error('💡 Or from an allowed domain (lovable.app or mydentipay.com)');
      throw new Error(`CORS Error: Origin ${currentOrigin} is not allowed. Please run from ngrok URL or allowed domain.`);
    }
    
    // Submit to v2 endpoint
    const response = await fetch('https://epkypzawqtpokmatjuzo.supabase.co/functions/v1/submit-patient-application_v2', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'apikey': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVwa3lwemF3cXRwb2ttYXRqdXpvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTU4ODc4MTgsImV4cCI6MjA3MTQ2MzgxOH0.QYx4QwYhBRHhMdfgmuHUHpWN2R1q7CetLCAS69w3yJU'
      },
      body: JSON.stringify(applicationData)
    });
    
    const responseData = await response.json();
    const success = response.ok && responseData?.success;
    
    // Write to CSV
    await writeToCSV(name, email, success);
    
    if (success) {
      console.log('✅ Application submitted successfully!');
      console.log('📋 Application ID:', responseData.id);
      return {
        success: true,
        message: `Application submitted successfully for ${name} (${email})`,
        data: responseData
      };
    } else {
      console.error('❌ Application submission failed:', responseData);
      return {
        success: false,
        message: `Submission failed: ${responseData.error || 'Unknown error'}`,
        data: responseData
      };
    }
  } catch (error: any) {
    console.error('❌ Error in test submission:', error);
    return {
      success: false,
      message: `Error: ${error.message || 'Unknown error'}`
    };
  }
}

// Export for use in browser console or code
if (typeof window !== 'undefined') {
  (window as any).testSubmitApplication = testSubmitApplication;
  (window as any).downloadTestRecordsCSV = downloadTestRecordsCSV;
  console.log('💡 Test functions available:');
  console.log('   - window.testSubmitApplication() - Submit a test application');
  console.log('   - window.downloadTestRecordsCSV() - Download CSV of all test records');
}

