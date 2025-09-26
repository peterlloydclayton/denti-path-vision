import { motion } from 'framer-motion';
import { Zap } from 'lucide-react';
import { ScrollReveal } from '@/components/ui/enhanced-animations';
import { HomeProblemCards } from './HomeProblemCards';
import womanDoctorImage from '@/assets/woman-doctor-african-transparent.png';

export const HomeProblemSection = () => {

  return (
    <section className="py-24 bg-gradient-to-b from-surface to-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Transforming Dental Finance
          </h2>
          <p className="text-xl text-muted-foreground max-w-4xl mx-auto mb-8">
            Traditional financing creates walls between patients and dental care, and between providers and fair compensation. 
            We're transforming the landscape with intelligent, dental-specific solutions that open new possibilities.
          </p>
        </ScrollReveal>

        <HomeProblemCards />

        {/* Fighting For Impact Summary */}
        <ScrollReveal className="mt-16 text-center">
          <div className="max-w-7xl mx-auto">
            {/* Main Heading */}
            <motion.h3 
              className="text-2xl md:text-3xl font-semibold text-slate-600 mb-12"
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              Transforming a future where financing never limits dental care
            </motion.h3>

            {/* Mobile Layout */}
            <div className="block lg:hidden">
              <motion.img 
                src={womanDoctorImage} 
                alt="Professional healthcare provider" 
                className="w-96 h-96 mx-auto mb-8 object-contain"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
              />
              <div className="grid gap-8">
                <motion.div 
                  className="text-center"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                >
                  <div className="text-4xl font-bold text-foreground mb-2">Patients</div>
                  <div className="text-sm text-slate-600">No longer denied care due to traditional limits</div>
                </motion.div>
                <motion.div 
                  className="text-center"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  <div className="text-4xl font-bold text-foreground mb-2">Providers</div>
                  <div className="text-sm text-slate-600">Get paid immediately, no more financing delays</div>
                </motion.div>
                <motion.div 
                  className="text-center"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                >
                  <div className="text-4xl font-bold text-foreground mb-2">Access</div>
                  <div className="text-sm text-slate-600">Intelligent matching of need with capability</div>
                </motion.div>
              </div>
            </div>

            {/* Landscape Layout - Equal Width Columns */}
            <div className="hidden lg:grid lg:grid-cols-2 lg:gap-16 lg:items-center">
              {/* Image Column - 50% width */}
              <motion.div 
                className="flex justify-center"
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <img 
                  src={womanDoctorImage} 
                  alt="Professional healthcare provider" 
                  className="w-96 h-96 object-contain"
                />
              </motion.div>

              {/* Content Column - 50% width */}
              <div className="text-left space-y-8">
                <motion.div 
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                >
                  <div className="text-3xl font-bold text-foreground mb-2">Patients</div>
                  <div className="text-base text-slate-600">No longer denied care due to traditional limits</div>
                </motion.div>
                
                <motion.div 
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                >
                  <div className="text-3xl font-bold text-foreground mb-2">Providers</div>
                  <div className="text-base text-slate-600">Get paid immediately, no more financing delays</div>
                </motion.div>
                
                <motion.div 
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                >
                  <div className="text-3xl font-bold text-foreground mb-2">Access</div>
                  <div className="text-base text-slate-600">Intelligent matching of need with capability</div>
                </motion.div>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};