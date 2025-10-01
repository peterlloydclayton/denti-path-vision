import React from 'react';
import NavigationHeader from '../components/NavigationHeader';
import MultiStepPatientForm from '../components/MultiStepPatientForm';
import { Footer } from '../components/layout/Footer';

const Patients2 = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <NavigationHeader />
      <MultiStepPatientForm />
      <Footer />
    </div>
  );
};

export default Patients2;
