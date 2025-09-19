import { motion } from 'framer-motion';
import { SectionHeader } from '@/components/ui/section-header';
import { Enhanced3DCard } from './Enhanced3DCard';
import { benefits } from '@/data/patientsData';
import happyPatientImg from '@/assets/happy-patient.jpg';

export const BenefitsSection = () => {
  return (
    <>
      {/* Section Header outside blue area */}
      <div className="container mx-auto px-6 py-12">
        <SectionHeader 
          title="Why Patients Love DentiPay"
          subtitle="Experience the easiest way to finance your dental care"
          backgroundImage={happyPatientImg}
        />
      </div>

      {/* Blue section with benefits cards */}
      <section className="py-24 bg-dental-blue relative overflow-hidden">
        <div className="container mx-auto px-6 relative z-20">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto perspective-1000">
            {benefits.map((benefit, index) => (
              <Enhanced3DCard 
                key={index} 
                benefit={benefit} 
                index={index} 
              />
            ))}
          </div>

          {/* Decorative elements */}
          <div className="absolute top-1/2 left-4 w-2 h-2 bg-white/30 rounded-full animate-pulse" />
          <div className="absolute top-1/3 right-1/4 w-1 h-1 bg-white/20 rounded-full animate-pulse" style={{ animationDelay: '1s' }} />
          <div className="absolute bottom-1/4 left-1/3 w-1.5 h-1.5 bg-white/25 rounded-full animate-pulse" style={{ animationDelay: '2s' }} />
        </div>
      </section>
    </>
  );
};