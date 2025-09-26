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

        {/* Image with Subtitle Section */}
        <ScrollReveal className="mt-16 mb-16 text-center">
          <div className="max-w-4xl mx-auto">
            <motion.img 
              src={womanDoctorImage} 
              alt="Professional healthcare provider" 
              className="w-96 h-96 mx-auto mb-6 object-contain"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            />
            <motion.h3 
              className="text-2xl md:text-3xl font-semibold text-slate-600"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Transforming a future where financing never limits dental care
            </motion.h3>
          </div>
        </ScrollReveal>

        {/* Fighting For Impact Summary */}
        <ScrollReveal className="mt-16 text-center">
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-3 gap-8 mb-8">
              <motion.div 
                className="text-center"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
              >
                <motion.div 
                  className="text-4xl font-bold text-foreground mb-2"
                  initial={{ opacity: 0, y: -10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                >
                  Patients
                </motion.div>
                <motion.div 
                  className="text-sm text-slate-600"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  No longer denied care due to traditional limits
                </motion.div>
              </motion.div>
              <motion.div 
                className="text-center"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
                initial={{ opacity: 0, y: -30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
              >
                <motion.div 
                  className="text-4xl font-bold text-foreground mb-2"
                  initial={{ opacity: 0, y: -10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                >
                  Providers
                </motion.div>
                <motion.div 
                  className="text-sm text-slate-600"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                >
                  Get paid immediately, no more financing delays
                </motion.div>
              </motion.div>
              <motion.div 
                className="text-center"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 30 }}
              >
                <motion.div 
                  className="text-4xl font-bold text-foreground mb-2"
                  initial={{ opacity: 0, y: -10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                >
                  Access
                </motion.div>
                <motion.div 
                  className="text-sm text-slate-600"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                >
                  Intelligent matching of need with capability
                </motion.div>
              </motion.div>
            </div>
            
            <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary/10 border border-primary/20 text-primary font-semibold">
              <Zap className="w-5 h-5" />
              Powered by Intelligent Finance Solutions
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};