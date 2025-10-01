import React, { useState } from 'react';
import { FormData } from '../MultiStepPatientForm';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { ChevronLeft, FileText } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface StepProps {
  formData: FormData;
  updateFormData: (data: Partial<FormData>) => void;
  onNext: () => void;
  onPrev: () => void;
  isSubmitting: boolean;
  setIsSubmitting: (val: boolean) => void;
}

const ComplianceSignatureStep: React.FC<StepProps> = ({ 
  formData, 
  updateFormData, 
  onPrev, 
  isSubmitting,
  setIsSubmitting 
}) => {
  const { toast } = useToast();
  const [signature, setSignature] = useState('');
  const [signatureDate] = useState(new Date().toLocaleDateString());

  const allConsentsChecked = 
    formData.authorize_credit_report &&
    formData.consent_communications &&
    formData.understand_no_credit_impact &&
    formData.confirm_information_accurate;

  const handleSubmit = async () => {
    if (!allConsentsChecked) {
      toast({
        title: "Required Consents",
        description: "Please check all required consent boxes to proceed.",
        variant: "destructive"
      });
      return;
    }

    if (!signature.trim()) {
      toast({
        title: "Signature Required",
        description: "Please enter your full name as your signature.",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulate submission - replace with actual API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast({
        title: "Application Submitted!",
        description: "Your financing application has been successfully submitted. You'll receive a response within 24 hours.",
      });

      // Here you would normally handle the form submission
      console.log('Form Data:', formData);
      console.log('Signature:', signature);
      
    } catch (error) {
      toast({
        title: "Submission Failed",
        description: "There was an error submitting your application. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Consent Statements */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Required Authorizations & Consents</h3>
        
        <div className="space-y-4 border rounded-lg p-4 bg-muted/50">
          <div className="flex items-start space-x-3">
            <Checkbox
              id="authorize_credit"
              checked={formData.authorize_credit_report}
              onCheckedChange={(checked) => updateFormData({ authorize_credit_report: checked as boolean })}
            />
            <Label htmlFor="authorize_credit" className="cursor-pointer font-normal leading-relaxed">
              I authorize DentiPay to obtain my credit report and verify information provided in this application. 
              I understand this is necessary to determine my financing options.
            </Label>
          </div>

          <div className="flex items-start space-x-3">
            <Checkbox
              id="consent_communications"
              checked={formData.consent_communications}
              onCheckedChange={(checked) => updateFormData({ consent_communications: checked as boolean })}
            />
            <Label htmlFor="consent_communications" className="cursor-pointer font-normal leading-relaxed">
              I consent to receive communications from DentiPay via phone, email, or text message regarding my 
              application and financing options.
            </Label>
          </div>

          <div className="flex items-start space-x-3">
            <Checkbox
              id="no_credit_impact"
              checked={formData.understand_no_credit_impact}
              onCheckedChange={(checked) => updateFormData({ understand_no_credit_impact: checked as boolean })}
            />
            <Label htmlFor="no_credit_impact" className="cursor-pointer font-normal leading-relaxed">
              I understand that this initial application uses a soft credit inquiry which will NOT impact my credit score. 
              A hard inquiry will only occur if I choose to proceed with a financing offer.
            </Label>
          </div>

          <div className="flex items-start space-x-3">
            <Checkbox
              id="confirm_accuracy"
              checked={formData.confirm_information_accurate}
              onCheckedChange={(checked) => updateFormData({ confirm_information_accurate: checked as boolean })}
            />
            <Label htmlFor="confirm_accuracy" className="cursor-pointer font-normal leading-relaxed">
              I certify that all information provided in this application is true, accurate, and complete to the 
              best of my knowledge. I understand that providing false information may result in denial of financing.
            </Label>
          </div>
        </div>
      </div>

      {/* Electronic Signature */}
      <div className="border-t pt-6 space-y-4">
        <h3 className="text-lg font-semibold">Electronic Signature</h3>
        
        <div className="space-y-2">
          <Label htmlFor="signature">Full Legal Name (Type to Sign) *</Label>
          <Input
            id="signature"
            value={signature}
            onChange={(e) => setSignature(e.target.value)}
            placeholder="Type your full legal name"
            className="font-serif text-lg"
          />
          <p className="text-sm text-muted-foreground">
            By typing your name above, you are providing an electronic signature that is legally binding 
            and equivalent to a handwritten signature.
          </p>
        </div>

        <div className="bg-muted rounded-lg p-4">
          <div className="flex items-center gap-2 text-sm">
            <FileText className="h-4 w-4" />
            <span className="font-medium">Date:</span>
            <span>{signatureDate}</span>
          </div>
        </div>
      </div>

      {/* Privacy Notice */}
      <div className="bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
        <h4 className="font-semibold mb-2">Privacy & Security Notice</h4>
        <p className="text-sm text-muted-foreground">
          Your information is encrypted and securely stored. We comply with all federal privacy regulations 
          including HIPAA and GLBA. Your data will only be used to process your financing application and 
          will never be sold to third parties.
        </p>
      </div>

      <div className="flex justify-between pt-6">
        <Button onClick={onPrev} variant="outline" className="gap-2" disabled={isSubmitting}>
          <ChevronLeft className="h-4 w-4" /> Previous
        </Button>
        <Button 
          onClick={handleSubmit} 
          disabled={isSubmitting || !allConsentsChecked || !signature.trim()}
          className="gap-2"
        >
          {isSubmitting ? 'Submitting...' : 'Submit Application'}
          {!isSubmitting && <FileText className="h-4 w-4" />}
        </Button>
      </div>
    </div>
  );
};

export default ComplianceSignatureStep;
