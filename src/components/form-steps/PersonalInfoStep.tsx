import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Form } from '@/components/ui/form';
import { FormData } from '../MultiStepPatientForm';
import ReferringProviderSelector, { PublicProvider } from './ReferringProviderSelector';

interface PersonalInfoStepProps {
  formData: FormData;
  updateFormData: (data: Partial<FormData>) => void;
  onNext: () => void;
  onPrev: () => void;
  isSubmitting?: boolean;
  setIsSubmitting?: (value: boolean) => void;
}

const MAX_NAME_LENGTH = 100;
const MAX_TEXT_LENGTH = 100;
const MAX_EMAIL_LENGTH = 255;
const MAX_ADDRESS_LENGTH = 200;
const MAX_ESTIMATED_COST = 250000;

const personalInfoSchema = z.object({
  first_name: z.string().min(1, "First name is required").max(MAX_TEXT_LENGTH, `Maximum ${MAX_TEXT_LENGTH} characters`),
  middle_name: z.string().max(MAX_TEXT_LENGTH, `Maximum ${MAX_TEXT_LENGTH} characters`).optional(),
  last_name: z.string().min(1, "Last name is required").max(MAX_TEXT_LENGTH, `Maximum ${MAX_TEXT_LENGTH} characters`),
  date_of_birth: z.object({
    day: z.string().min(1, "Day is required"),
    month: z.string().min(1, "Month is required"),
    year: z.string().min(1, "Year is required"),
  }),
  ssn: z.string().regex(/^\d{9}$/, "Social Security Number must be exactly 9 digits"),
  drivers_license: z.string().min(1, "Driver's License/State ID is required").max(MAX_TEXT_LENGTH, `Maximum ${MAX_TEXT_LENGTH} characters`),
  sex: z.string().min(1, "Sex (Assigned At Birth) is required"),
  marital_status: z.string().min(1, "Marital status is required"),
  primary_phone: z.string().regex(/^\d{10}$/, "Phone number must be exactly 10 digits"),
  secondary_phone: z.string().regex(/^\d{10}$/, "Phone number must be exactly 10 digits").optional().or(z.literal('')),
  email: z.string().email("Valid email is required").max(MAX_EMAIL_LENGTH, `Maximum ${MAX_EMAIL_LENGTH} characters`),
  street_address: z.string().min(1, "Street address is required").max(MAX_ADDRESS_LENGTH, `Maximum ${MAX_ADDRESS_LENGTH} characters`),
  city: z.string().min(1, "City is required").max(MAX_TEXT_LENGTH, `Maximum ${MAX_TEXT_LENGTH} characters`),
  state: z.string().min(1, "State is required"),
  zip_code: z.string().min(5, "Valid ZIP code is required").max(10, "Maximum 10 characters"),
  time_at_address: z.string().min(1, "Time at address is required"),
  rent_or_own: z.string().min(1, "Please specify if you rent or own"),
  previous_address: z.string().max(MAX_ADDRESS_LENGTH, `Maximum ${MAX_ADDRESS_LENGTH} characters`).optional(),
  emergency_contact_name: z.string().min(1, "Emergency contact name is required").max(MAX_TEXT_LENGTH, `Maximum ${MAX_TEXT_LENGTH} characters`),
  emergency_contact_relationship: z.string().min(1, "Emergency contact relationship is required"),
  emergency_contact_phone: z.string().regex(/^\d{10}$/, "Emergency contact phone must be exactly 10 digits"),
  // Referral Information
  referring_practice: z.string().min(1, "Referring practice is required").max(MAX_TEXT_LENGTH, `Maximum ${MAX_TEXT_LENGTH} characters`),
  referring_provider_name: z.string().max(MAX_TEXT_LENGTH, `Maximum ${MAX_TEXT_LENGTH} characters`).optional(),
  referring_contact_info: z.string().max(MAX_ADDRESS_LENGTH, `Maximum ${MAX_ADDRESS_LENGTH} characters`).optional(),
  referring_provider_email: z.string().email("Valid email is required").max(MAX_EMAIL_LENGTH, `Maximum ${MAX_EMAIL_LENGTH} characters`).optional().or(z.literal('')),
  estimated_cost: z.string().min(1, "Estimated treatment cost is required")
    .refine((val) => {
      const num = parseFloat(val);
      return !isNaN(num) && num > 0;
    }, { message: "Please enter a valid amount" })
    .refine((val) => {
      const num = parseFloat(val);
      return num <= MAX_ESTIMATED_COST;
    }, { message: `Maximum estimated cost is $${MAX_ESTIMATED_COST.toLocaleString()}` }),
});

const isLeapYear = (year: number): boolean => {
  return (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
};

const getDaysInMonth = (month: number, year: number): number => {
  const daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  if (month === 2 && isLeapYear(year)) {
    return 29;
  }
  return daysInMonth[month - 1];
};

const generateYears = (): string[] => {
  const currentYear = new Date().getFullYear();
  const years = [];
  for (let year = currentYear; year >= currentYear - 100; year--) {
    years.push(year.toString());
  }
  return years;
};

const getMonths = (t: any) => [
  { value: '01', label: t('form.months.january') },
  { value: '02', label: t('form.months.february') },
  { value: '03', label: t('form.months.march') },
  { value: '04', label: t('form.months.april') },
  { value: '05', label: t('form.months.may') },
  { value: '06', label: t('form.months.june') },
  { value: '07', label: t('form.months.july') },
  { value: '08', label: t('form.months.august') },
  { value: '09', label: t('form.months.september') },
  { value: '10', label: t('form.months.october') },
  { value: '11', label: t('form.months.november') },
  { value: '12', label: t('form.months.december') },
];

const US_STATES = [
  { value: "AL", label: "Alabama" },
  { value: "AK", label: "Alaska" },
  { value: "AZ", label: "Arizona" },
  { value: "AR", label: "Arkansas" },
  { value: "CA", label: "California" },
  { value: "CO", label: "Colorado" },
  { value: "CT", label: "Connecticut" },
  { value: "DE", label: "Delaware" },
  { value: "FL", label: "Florida" },
  { value: "GA", label: "Georgia" },
  { value: "HI", label: "Hawaii" },
  { value: "ID", label: "Idaho" },
  { value: "IL", label: "Illinois" },
  { value: "IN", label: "Indiana" },
  { value: "IA", label: "Iowa" },
  { value: "KS", label: "Kansas" },
  { value: "KY", label: "Kentucky" },
  { value: "LA", label: "Louisiana" },
  { value: "ME", label: "Maine" },
  { value: "MD", label: "Maryland" },
  { value: "MA", label: "Massachusetts" },
  { value: "MI", label: "Michigan" },
  { value: "MN", label: "Minnesota" },
  { value: "MS", label: "Mississippi" },
  { value: "MO", label: "Missouri" },
  { value: "MT", label: "Montana" },
  { value: "NE", label: "Nebraska" },
  { value: "NV", label: "Nevada" },
  { value: "NH", label: "New Hampshire" },
  { value: "NJ", label: "New Jersey" },
  { value: "NM", label: "New Mexico" },
  { value: "NY", label: "New York" },
  { value: "NC", label: "North Carolina" },
  { value: "ND", label: "North Dakota" },
  { value: "OH", label: "Ohio" },
  { value: "OK", label: "Oklahoma" },
  { value: "OR", label: "Oregon" },
  { value: "PA", label: "Pennsylvania" },
  { value: "RI", label: "Rhode Island" },
  { value: "SC", label: "South Carolina" },
  { value: "SD", label: "South Dakota" },
  { value: "TN", label: "Tennessee" },
  { value: "TX", label: "Texas" },
  { value: "UT", label: "Utah" },
  { value: "VT", label: "Vermont" },
  { value: "VA", label: "Virginia" },
  { value: "WA", label: "Washington" },
  { value: "WV", label: "West Virginia" },
  { value: "WI", label: "Wisconsin" },
  { value: "WY", label: "Wyoming" },
];

const PersonalInfoStep: React.FC<PersonalInfoStepProps> = ({ 
  formData, 
  updateFormData, 
  onNext,
  onPrev
}) => {
  const { t } = useTranslation();
  const [showErrors, setShowErrors] = useState(false);
  const [availableDays, setAvailableDays] = useState<string[]>([]);
  const [estimatedCostError, setEstimatedCostError] = useState<string | null>(null);
  const [isManualEntry, setIsManualEntry] = useState(false);
  
  const form = useForm({
    resolver: zodResolver(personalInfoSchema),
    defaultValues: formData,
  });

  const watchedMonth = form.watch('date_of_birth.month');
  const watchedYear = form.watch('date_of_birth.year');

  useEffect(() => {
    if (watchedMonth && watchedYear) {
      const month = parseInt(watchedMonth);
      const year = parseInt(watchedYear);
      const daysInMonth = getDaysInMonth(month, year);
      
      const days = [];
      for (let i = 1; i <= daysInMonth; i++) {
        days.push(i.toString().padStart(2, '0'));
      }
      setAvailableDays(days);
    } else {
      const defaultDays = [];
      for (let i = 1; i <= 31; i++) {
        defaultDays.push(i.toString().padStart(2, '0'));
      }
      setAvailableDays(defaultDays);
    }
  }, [watchedMonth, watchedYear]);

  const onSubmit = (data: any) => {
    updateFormData(data);
    onNext();
  };

  const handleNext = () => {
    setShowErrors(true);
    form.handleSubmit(onSubmit)();
  };

  const getRelationshipOptions = () => [
    { value: "Spouse", label: t('form.personal.spouse') },
    { value: "Family Member", label: t('form.personal.familyMember') },
    { value: "Friend", label: t('form.personal.friend') },
    { value: "Colleague", label: t('form.personal.colleague') },
    { value: "Neighbor", label: t('form.personal.neighbor') },
    { value: "Other", label: t('form.personal.other') },
  ];

  const handleProviderSelect = (provider: PublicProvider | null, isManual: boolean) => {
    setIsManualEntry(isManual);
    
    if (isManual) {
      // Clear auto-filled fields for manual entry
      form.setValue('referring_practice', '');
      form.setValue('referring_provider_name', '');
      form.setValue('referring_contact_info', '');
      form.setValue('referring_provider_email', '');
      // Clear the provider ID in formData
      updateFormData({ referring_provider_id: '' });
    } else if (provider) {
      // Auto-fill from selected provider
      form.setValue('referring_practice', provider.practice_name || '');
      form.setValue('referring_provider_name', provider.full_name || '');
      form.setValue('referring_contact_info', provider.contact_phone || '');
      form.setValue('referring_provider_email', provider.contact_email || '');
      // Store the provider ID in formData for submission
      updateFormData({ referring_provider_id: provider.id });
    }
  };

  return (
    <Form {...form}>
      <form className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <FormField
            control={form.control}
            name="first_name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('form.personal.firstName')} *</FormLabel>
                <FormControl>
                  <Input placeholder="John" maxLength={MAX_TEXT_LENGTH} {...field} />
                </FormControl>
                {showErrors && <FormMessage />}
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="middle_name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('form.personal.middleName')}</FormLabel>
                <FormControl>
                  <Input placeholder="Michael" maxLength={MAX_TEXT_LENGTH} {...field} />
                </FormControl>
                {showErrors && <FormMessage />}
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="last_name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('form.personal.lastName')} *</FormLabel>
                <FormControl>
                  <Input placeholder="Doe" maxLength={MAX_TEXT_LENGTH} {...field} />
                </FormControl>
                {showErrors && <FormMessage />}
              </FormItem>
            )}
          />
        </div>

        <div>
          <FormLabel className="text-sm font-medium">{t('form.personal.dateOfBirth')} *</FormLabel>
          <div className="grid grid-cols-3 gap-4 mt-2">
            <FormField
              control={form.control}
              name="date_of_birth.month"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger>
                        <SelectValue placeholder={t('form.personal.month')} />
                      </SelectTrigger>
                      <SelectContent className="bg-popover">
                        {getMonths(t).map((month) => (
                          <SelectItem key={month.value} value={month.value}>
                            {month.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  {showErrors && <FormMessage />}
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="date_of_birth.day"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger>
                        <SelectValue placeholder={t('form.personal.day')} />
                      </SelectTrigger>
                      <SelectContent className="bg-popover">
                        {availableDays.map((day) => (
                          <SelectItem key={day} value={day}>
                            {day}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  {showErrors && <FormMessage />}
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="date_of_birth.year"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger>
                        <SelectValue placeholder={t('form.personal.year')} />
                      </SelectTrigger>
                      <SelectContent className="bg-popover">
                        {generateYears().map((year) => (
                          <SelectItem key={year} value={year}>
                            {year}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  {showErrors && <FormMessage />}
                </FormItem>
              )}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="ssn"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('form.personal.ssn')} *</FormLabel>
                <FormControl>
                  <Input
                    value={field.value ? field.value.replace(/(\d{3})(\d{2})(\d{4})/, '$1-$2-$3') : ''}
                    onChange={(e) => {
                      const value = e.target.value.replace(/\D/g, '');
                      if (value.length <= 9) {
                        field.onChange(value);
                      }
                    }}
                  />
                </FormControl>
                {showErrors && <FormMessage />}
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="drivers_license"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('form.personal.driversLicense')} *</FormLabel>
                <FormControl>
                  <Input maxLength={MAX_TEXT_LENGTH} {...field} />
                </FormControl>
                {showErrors && <FormMessage />}
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="sex"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('form.personal.sex')} *</FormLabel>
                <FormControl>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-popover">
                      <SelectItem value="Male">{t('form.personal.male')}</SelectItem>
                      <SelectItem value="Female">{t('form.personal.female')}</SelectItem>
                      <SelectItem value="Prefer Not To Answer">{t('form.personal.preferNotToAnswer')}</SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                {showErrors && <FormMessage />}
                <p className="text-xs text-muted-foreground mt-1">
                  *{t('form.personal.sexDisclaimer')}
                </p>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="marital_status"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('form.personal.maritalStatus')} *</FormLabel>
                <FormControl>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-popover">
                      <SelectItem value="Single">{t('form.personal.single')}</SelectItem>
                      <SelectItem value="Married">{t('form.personal.married')}</SelectItem>
                      <SelectItem value="Divorced">{t('form.personal.divorced')}</SelectItem>
                      <SelectItem value="Widowed">{t('form.personal.widowed')}</SelectItem>
                      <SelectItem value="Separated">{t('form.personal.separated')}</SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                {showErrors && <FormMessage />}
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="primary_phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('form.personal.primaryPhone')} *</FormLabel>
                <FormControl>
                  <Input 
                    type="tel" 
                    placeholder="5551234567" 
                    maxLength={10}
                    value={field.value || ''}
                    onChange={(e) => {
                      const value = e.target.value.replace(/\D/g, '');
                      field.onChange(value);
                    }}
                  />
                </FormControl>
                {showErrors && <FormMessage />}
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="secondary_phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('form.personal.secondaryPhone')}</FormLabel>
                <FormControl>
                  <Input 
                    type="tel" 
                    placeholder="5551234567" 
                    maxLength={10}
                    value={field.value || ''}
                    onChange={(e) => {
                      const value = e.target.value.replace(/\D/g, '');
                      field.onChange(value);
                    }}
                  />
                </FormControl>
                {showErrors && <FormMessage />}
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('form.personal.email')} *</FormLabel>
                <FormControl>
                  <Input type="email" placeholder="john@example.com" maxLength={MAX_EMAIL_LENGTH} {...field} />
                </FormControl>
                {showErrors && <FormMessage />}
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="street_address"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('form.personal.streetAddress')} *</FormLabel>
              <FormControl>
                <Input placeholder="123 Main Street" maxLength={MAX_ADDRESS_LENGTH} {...field} />
              </FormControl>
              {showErrors && <FormMessage />}
            </FormItem>
          )}
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <FormField
            control={form.control}
            name="city"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('form.personal.city')} *</FormLabel>
                <FormControl>
                  <Input placeholder="Anytown" maxLength={MAX_TEXT_LENGTH} {...field} />
                </FormControl>
                {showErrors && <FormMessage />}
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="state"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('form.personal.state')} *</FormLabel>
                <FormControl>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-popover">
                      {US_STATES.map((state) => (
                        <SelectItem key={state.value} value={state.value}>
                          {state.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
                {showErrors && <FormMessage />}
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="zip_code"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('form.personal.zipCode')} *</FormLabel>
                <FormControl>
                  <Input placeholder="12345" maxLength={5} {...field} />
                </FormControl>
                {showErrors && <FormMessage />}
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="time_at_address"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('form.personal.timeAtAddress')} *</FormLabel>
                <FormControl>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-popover">
                      <SelectItem value="Less than 6 months">{t('form.personal.lessThan6Months')}</SelectItem>
                      <SelectItem value="6 months - 1 year">{t('form.personal.6MonthsTo1Year')}</SelectItem>
                      <SelectItem value="1 - 2 years">{t('form.personal.1To2Years')}</SelectItem>
                      <SelectItem value="2 - 5 years">{t('form.personal.2To5Years')}</SelectItem>
                      <SelectItem value="5+ years">{t('form.personal.5PlusYears')}</SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                {showErrors && <FormMessage />}
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="rent_or_own"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('form.personal.rentOrOwn')} *</FormLabel>
                <FormControl>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-popover">
                      <SelectItem value="Rent">{t('form.personal.rent')}</SelectItem>
                      <SelectItem value="Own">{t('form.personal.own')}</SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                {showErrors && <FormMessage />}
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="previous_address"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('form.personal.previousAddress')}</FormLabel>
              <FormControl>
                <Input placeholder="456 Previous St, Old City, ST 67890" maxLength={MAX_ADDRESS_LENGTH} {...field} />
              </FormControl>
              {showErrors && <FormMessage />}
            </FormItem>
          )}
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <FormField
            control={form.control}
            name="emergency_contact_name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('form.personal.emergencyContactName')} *</FormLabel>
                <FormControl>
                  <Input placeholder="Jane Doe" maxLength={MAX_TEXT_LENGTH} {...field} />
                </FormControl>
                {showErrors && <FormMessage />}
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="emergency_contact_relationship"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('form.personal.emergencyContactRelationship')} *</FormLabel>
                <FormControl>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-popover">
                      {getRelationshipOptions().map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
                {showErrors && <FormMessage />}
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="emergency_contact_phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('form.personal.emergencyContactPhone')} *</FormLabel>
                <FormControl>
                  <Input 
                    type="tel" 
                    placeholder="5551234567" 
                    maxLength={10}
                    value={field.value || ''}
                    onChange={(e) => {
                      const value = e.target.value.replace(/\D/g, '');
                      field.onChange(value);
                    }}
                  />
                </FormControl>
                {showErrors && <FormMessage />}
              </FormItem>
            )}
          />
        </div>

        {/* Referral Information Section */}
        <div className="pt-6 border-t">
          <h3 className="text-lg font-semibold mb-4">{t('form.personal.referralInformation')}</h3>
          <p className="text-sm text-muted-foreground mb-4">{t('form.personal.referralDescription')}</p>
          
          {/* Provider Selector */}
          <div className="mb-4">
            <FormLabel>{t('form.personal.referringPractice')} *</FormLabel>
            <div className="mt-2">
              <ReferringProviderSelector
                onSelect={handleProviderSelect}
                selectedProviderId={formData.referring_provider_id || null}
              />
            </div>
          </div>

          {/* Conditional fields based on selection */}
          {isManualEntry ? (
            // Manual entry mode - show editable fields
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="referring_practice"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('form.personal.referringPractice')} *</FormLabel>
                    <FormControl>
                      <Input placeholder="ABC Dental Group" maxLength={MAX_TEXT_LENGTH} {...field} />
                    </FormControl>
                    {showErrors && <FormMessage />}
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="referring_provider_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('form.personal.referringProviderName')}</FormLabel>
                    <FormControl>
                      <Input placeholder="Dr. John Smith" maxLength={MAX_TEXT_LENGTH} {...field} />
                    </FormControl>
                    {showErrors && <FormMessage />}
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="referring_contact_info"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('form.personal.referringContactInfo')}</FormLabel>
                    <FormControl>
                      <Input placeholder="(555) 123-4567 or contact@example.com" maxLength={MAX_ADDRESS_LENGTH} {...field} />
                    </FormControl>
                    {showErrors && <FormMessage />}
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="referring_provider_email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('form.personal.referringProviderEmail')}</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="doctor@dentalpractice.com" maxLength={MAX_EMAIL_LENGTH} {...field} />
                    </FormControl>
                    {showErrors && <FormMessage />}
                  </FormItem>
                )}
              />
            </div>
          ) : formData.referring_provider_id ? (
            // Provider selected - show read-only summary
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-muted/50 rounded-lg">
              <div>
                <p className="text-sm font-medium text-muted-foreground">{t('form.personal.referringPractice')}</p>
                <p className="text-sm">{form.watch('referring_practice') || '-'}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">{t('form.personal.referringProviderName')}</p>
                <p className="text-sm">{form.watch('referring_provider_name') || '-'}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">{t('form.personal.referringContactInfo')}</p>
                <p className="text-sm">{form.watch('referring_contact_info') || '-'}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">{t('form.personal.referringProviderEmail')}</p>
                <p className="text-sm">{form.watch('referring_provider_email') || '-'}</p>
              </div>
            </div>
          ) : null}

          {/* Estimated Cost - always visible */}
          <div className="mt-4">
            <FormField
              control={form.control}
              name="estimated_cost"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('form.personal.estimatedTreatmentCost')} *</FormLabel>
                  <FormControl>
                    <Input 
                      type="number"
                      min="0"
                      max={MAX_ESTIMATED_COST}
                      step="0.01"
                      placeholder="$5,000" 
                      {...field}
                      onChange={(e) => {
                        const value = e.target.value.replace(/[^\d.]/g, '');
                        const parts = value.split('.');
                        if (parts[0].length <= 7) {
                          field.onChange(value);
                        }
                      }}
                      onBlur={(e) => {
                        field.onBlur();
                        form.trigger('estimated_cost');
                        const num = parseFloat(e.target.value);
                        if (!isNaN(num) && num > MAX_ESTIMATED_COST) {
                          setEstimatedCostError(`Maximum estimated cost is $${MAX_ESTIMATED_COST.toLocaleString()}`);
                        } else if (!isNaN(num) && num <= 0) {
                          setEstimatedCostError('Please enter a valid amount greater than $0');
                        } else {
                          setEstimatedCostError(null);
                        }
                      }}
                    />
                  </FormControl>
                  {estimatedCostError && (
                    <p className="text-sm font-medium text-destructive">{estimatedCostError}</p>
                  )}
                  {showErrors && !estimatedCostError && <FormMessage />}
                </FormItem>
              )}
            />
          </div>
        </div>

        <div className="flex justify-between pt-6">
          <Button
            type="button"
            onClick={onPrev}
            variant="outline"
            disabled
          >
            <ChevronLeft className="mr-2 h-4 w-4" />
            {t('form.buttons.previous')}
          </Button>
          
          <Button
            type="button"
            onClick={handleNext}
          >
            {t('form.buttons.next')}
            <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
        </div>

        {showErrors && Object.keys(form.formState.errors).length > 0 && (
          <div className="mt-4 p-4 bg-destructive/10 border border-destructive/20 rounded-md">
            <h4 className="text-sm font-medium text-destructive mb-2">Please fix the following errors:</h4>
            <ul className="text-sm text-destructive space-y-1">
              {Object.entries(form.formState.errors).map(([key, error]) => (
                <li key={key}>
                  {typeof error?.message === 'string' ? error.message : 'This field is required'}
                </li>
              ))}
            </ul>
          </div>
        )}
      </form>
    </Form>
  );
};

export default PersonalInfoStep;
