import React from 'react';
import { FormData } from '../MultiStepPatientForm';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ChevronRight } from 'lucide-react';

interface StepProps {
  formData: FormData;
  updateFormData: (data: Partial<FormData>) => void;
  onNext: () => void;
  onPrev: () => void;
  isSubmitting: boolean;
  setIsSubmitting: (val: boolean) => void;
}

const PersonalInfoStep: React.FC<StepProps> = ({ formData, updateFormData, onNext }) => {
  return (
    <div className="space-y-6">
      {/* Name Fields */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="space-y-2">
          <Label htmlFor="first_name">First Name *</Label>
          <Input
            id="first_name"
            value={formData.first_name}
            onChange={(e) => updateFormData({ first_name: e.target.value })}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="middle_name">Middle Name</Label>
          <Input
            id="middle_name"
            value={formData.middle_name}
            onChange={(e) => updateFormData({ middle_name: e.target.value })}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="last_name">Last Name *</Label>
          <Input
            id="last_name"
            value={formData.last_name}
            onChange={(e) => updateFormData({ last_name: e.target.value })}
            required
          />
        </div>
      </div>

      {/* Date of Birth */}
      <div className="space-y-2">
        <Label>Date of Birth *</Label>
        <div className="grid grid-cols-3 gap-4">
          <Input
            placeholder="MM"
            value={formData.date_of_birth.month}
            onChange={(e) => updateFormData({ date_of_birth: { ...formData.date_of_birth, month: e.target.value } })}
            maxLength={2}
          />
          <Input
            placeholder="DD"
            value={formData.date_of_birth.day}
            onChange={(e) => updateFormData({ date_of_birth: { ...formData.date_of_birth, day: e.target.value } })}
            maxLength={2}
          />
          <Input
            placeholder="YYYY"
            value={formData.date_of_birth.year}
            onChange={(e) => updateFormData({ date_of_birth: { ...formData.date_of_birth, year: e.target.value } })}
            maxLength={4}
          />
        </div>
      </div>

      {/* SSN and Driver's License */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="ssn">Social Security Number *</Label>
          <Input
            id="ssn"
            type="password"
            value={formData.ssn}
            onChange={(e) => updateFormData({ ssn: e.target.value })}
            placeholder="XXX-XX-XXXX"
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="drivers_license">Driver's License</Label>
          <Input
            id="drivers_license"
            value={formData.drivers_license}
            onChange={(e) => updateFormData({ drivers_license: e.target.value })}
          />
        </div>
      </div>

      {/* Sex and Marital Status */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="sex">Sex *</Label>
          <Select value={formData.sex} onValueChange={(value) => updateFormData({ sex: value })}>
            <SelectTrigger>
              <SelectValue placeholder="Select sex" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="male">Male</SelectItem>
              <SelectItem value="female">Female</SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="marital_status">Marital Status *</Label>
          <Select value={formData.marital_status} onValueChange={(value) => updateFormData({ marital_status: value })}>
            <SelectTrigger>
              <SelectValue placeholder="Select status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="single">Single</SelectItem>
              <SelectItem value="married">Married</SelectItem>
              <SelectItem value="divorced">Divorced</SelectItem>
              <SelectItem value="widowed">Widowed</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Contact Information */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="primary_phone">Primary Phone *</Label>
          <Input
            id="primary_phone"
            type="tel"
            value={formData.primary_phone}
            onChange={(e) => updateFormData({ primary_phone: e.target.value })}
            placeholder="(XXX) XXX-XXXX"
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="secondary_phone">Secondary Phone</Label>
          <Input
            id="secondary_phone"
            type="tel"
            value={formData.secondary_phone}
            onChange={(e) => updateFormData({ secondary_phone: e.target.value })}
            placeholder="(XXX) XXX-XXXX"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="email">Email Address *</Label>
        <Input
          id="email"
          type="email"
          value={formData.email}
          onChange={(e) => updateFormData({ email: e.target.value })}
          required
        />
      </div>

      {/* Address */}
      <div className="space-y-2">
        <Label htmlFor="street_address">Street Address *</Label>
        <Input
          id="street_address"
          value={formData.street_address}
          onChange={(e) => updateFormData({ street_address: e.target.value })}
          required
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="space-y-2">
          <Label htmlFor="city">City *</Label>
          <Input
            id="city"
            value={formData.city}
            onChange={(e) => updateFormData({ city: e.target.value })}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="state">State *</Label>
          <Input
            id="state"
            value={formData.state}
            onChange={(e) => updateFormData({ state: e.target.value })}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="zip_code">Zip Code *</Label>
          <Input
            id="zip_code"
            value={formData.zip_code}
            onChange={(e) => updateFormData({ zip_code: e.target.value })}
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="time_at_address">Time at Address *</Label>
          <Select value={formData.time_at_address} onValueChange={(value) => updateFormData({ time_at_address: value })}>
            <SelectTrigger>
              <SelectValue placeholder="Select time" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="less_than_1">Less than 1 year</SelectItem>
              <SelectItem value="1_3">1-3 years</SelectItem>
              <SelectItem value="3_5">3-5 years</SelectItem>
              <SelectItem value="more_than_5">More than 5 years</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="rent_or_own">Rent or Own *</Label>
          <Select value={formData.rent_or_own} onValueChange={(value) => updateFormData({ rent_or_own: value })}>
            <SelectTrigger>
              <SelectValue placeholder="Select option" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="rent">Rent</SelectItem>
              <SelectItem value="own">Own</SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="previous_address">Previous Address (if less than 2 years)</Label>
        <Input
          id="previous_address"
          value={formData.previous_address}
          onChange={(e) => updateFormData({ previous_address: e.target.value })}
        />
      </div>

      {/* Emergency Contact */}
      <div className="border-t pt-6 mt-6">
        <h3 className="text-lg font-semibold mb-4">Emergency Contact</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label htmlFor="emergency_contact_name">Name *</Label>
            <Input
              id="emergency_contact_name"
              value={formData.emergency_contact_name}
              onChange={(e) => updateFormData({ emergency_contact_name: e.target.value })}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="emergency_contact_relationship">Relationship *</Label>
            <Input
              id="emergency_contact_relationship"
              value={formData.emergency_contact_relationship}
              onChange={(e) => updateFormData({ emergency_contact_relationship: e.target.value })}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="emergency_contact_phone">Phone *</Label>
            <Input
              id="emergency_contact_phone"
              type="tel"
              value={formData.emergency_contact_phone}
              onChange={(e) => updateFormData({ emergency_contact_phone: e.target.value })}
              required
            />
          </div>
        </div>
      </div>

      <div className="flex justify-end pt-6">
        <Button onClick={onNext} className="gap-2">
          Next <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default PersonalInfoStep;
