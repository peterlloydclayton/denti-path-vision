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

interface PersonalInfoStepProps {
  formData: FormData;
  updateFormData: (data: Partial<FormData>) => void;
  onNext: () => void;
  onPrev: () => void;
  isSubmitting?: boolean;
  setIsSubmitting?: (value: boolean) => void;
}

const personalInfoSchema = z.object({
  first_name: z.string().min(1, "First name is required"),
  middle_name: z.string().optional(),
  last_name: z.string().min(1, "Last name is required"),
  date_of_birth: z.object({
    day: z.string().min(1, "Day is required"),
    month: z.string().min(1, "Month is required"),
    year: z.string().min(1, "Year is required"),
  }),
  ssn: z.string().regex(/^\d{9}$/, "Social Security Number must be exactly 9 digits"),
  drivers_license: z.string().min(1, "Driver's License/State ID is required"),
  sex: z.string().min(1, "Sex (Assigned At Birth) is required"),
  marital_status: z.string().min(1, "Marital status is required"),
  primary_phone: z.string().min(10, "Valid phone number is required"),
  secondary_phone: z.string().optional(),
  email: z.string().email("Valid email is required"),
  street_address: z.string().min(1, "Street address is required"),
  city: z.string().min(1, "City is required"),
  state: z.string().min(1, "State is required"),
  zip_code: z.string().min(5, "Valid ZIP code is required"),
  time_at_address: z.string().min(1, "Time at address is required"),
  rent_or_own: z.string().min(1, "Please specify if you rent or own"),
  previous_address: z.string().optional(),
  emergency_contact_name: z.string().min(1, "Emergency contact name is required"),
  emergency_contact_relationship: z.string().min(1, "Emergency contact relationship is required"),
  emergency_contact_phone: z.string().min(10, "Valid emergency contact phone is required"),
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
                  <Input placeholder="John" {...field} />
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
                  <Input placeholder="Michael" {...field} />
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
                  <Input placeholder="Doe" {...field} />
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
                    placeholder="123-45-6789" 
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
                  <Input placeholder="DL123456789" {...field} />
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
                  <Input type="tel" placeholder="(555) 123-4567" {...field} />
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
                  <Input type="tel" placeholder="(555) 123-4567" {...field} />
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
                  <Input type="email" placeholder="john@example.com" {...field} />
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
                <Input placeholder="123 Main Street" {...field} />
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
                  <Input placeholder="Anytown" {...field} />
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
                      <SelectItem value="Less than 6 months">Less than 6 months</SelectItem>
                      <SelectItem value="6 months - 1 year">6 months - 1 year</SelectItem>
                      <SelectItem value="1 - 2 years">1 - 2 years</SelectItem>
                      <SelectItem value="2 - 5 years">2 - 5 years</SelectItem>
                      <SelectItem value="5+ years">5+ years</SelectItem>
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
                <Input placeholder="456 Previous St, Old City, ST 67890" {...field} />
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
                  <Input placeholder="Jane Doe" {...field} />
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
                  <Input type="tel" placeholder="(555) 123-4567" {...field} />
                </FormControl>
                {showErrors && <FormMessage />}
              </FormItem>
            )}
          />
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
