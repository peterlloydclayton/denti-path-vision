import MultiStepPatientForm from '@/components/MultiStepPatientForm';
import { SEOHead } from '@/components/SEOHead';

const Apply = () => {
  return (
    <>
      <SEOHead
        title="Apply for Dental Financing"
        description="Apply for DentiPay dental financing in under 5 minutes. Get instant approval decisions with flexible payment plans tailored to your needs."
        canonicalUrl="/patient-financing-application"
        noIndex={true}
      />
      <MultiStepPatientForm />
    </>
  );
};

export default Apply;
