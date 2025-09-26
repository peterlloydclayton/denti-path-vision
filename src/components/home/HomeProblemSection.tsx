import { motion } from 'framer-motion';
import { Zap, ArrowRight } from 'lucide-react';
import { ScrollReveal } from '@/components/ui/enhanced-animations';
import { HomeProblemCards } from './HomeProblemCards';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import womanDoctorImage from '@/assets/woman-doctor-african-transparent.png';

export const HomeProblemSection = () => {
  const { t } = useTranslation('marketing');

  return (
    <section className="pt-24 bg-gradient-to-b from-surface to-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
        <ScrollReveal className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            {t('home.problem.title')}
          </h2>
          <p className="text-xl text-muted-foreground max-w-4xl mx-auto mb-8">
            {t('home.problem.description')}
          </p>
        </ScrollReveal>

        <HomeProblemCards />
        
        {/* CTA Buttons */}
        <ScrollReveal className="mt-16">
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Link to="/patients">
              <Button
                className="w-72 h-14 bg-foreground text-background rounded-full hover:bg-foreground/90 font-semibold text-lg px-16 transition-all duration-300 hover:scale-105 hover:shadow-lg"
              >
                <span>{t('home.problem.ctaPatients')}</span>
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link to="/providers">
              <Button
                className="w-72 h-14 bg-foreground text-background rounded-full hover:bg-foreground/90 font-semibold text-lg px-20 transition-all duration-300 hover:scale-105 hover:shadow-lg"
              >
                <span>{t('home.problem.ctaProviders')}</span>
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </ScrollReveal>
      </div>

      {/* Fighting For Impact Summary - Outside padded container */}
      <ScrollReveal className="mt-8 text-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Main Heading */}
          <motion.h3 
            className="text-4xl md:text-5xl font-bold text-foreground mb-12"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {t('home.problem.impactTitle')}
          </motion.h3>

          {/* Mobile Layout */}
          <div className="block lg:hidden mb-12">
            <motion.img 
              src={womanDoctorImage} 
              alt="Professional healthcare provider" 
              className="w-96 h-96 mx-auto object-contain scale-[1.275]"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            />
            <div className="grid gap-8">
              <motion.div 
                className="text-center"
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.3, ease: "easeOut" }}
              >
                <div className="text-4xl font-bold text-foreground mb-2">{t('home.problem.impactPatients')}</div>
                <div className="text-sm text-slate-600">{t('home.problem.impactPatientsDesc')}</div>
              </motion.div>
              <motion.div 
                className="text-center"
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.5, ease: "easeOut" }}
              >
                <div className="text-4xl font-bold text-foreground mb-2">{t('home.problem.impactProviders')}</div>
                <div className="text-sm text-slate-600">{t('home.problem.impactProvidersDesc')}</div>
              </motion.div>
              <motion.div 
                className="text-center"
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.7, ease: "easeOut" }}
              >
                <div className="text-4xl font-bold text-foreground mb-2">{t('home.problem.impactAccess')}</div>
                <div className="text-sm text-slate-600">{t('home.problem.impactAccessDesc')}</div>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Landscape Layout - Full width for flush bottom image */}
        <div className="hidden lg:block lg:mt-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 lg:gap-16 lg:items-end">
              {/* Content Column - 50% width */}
              <div className="text-left space-y-8 pb-16 pl-48">
                <motion.div 
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
                >
                  <div className="text-3xl font-bold text-foreground mb-2">{t('home.problem.impactPatients')}</div>
                  <div className="text-base text-slate-600">{t('home.problem.impactPatientsDesc')}</div>
                </motion.div>
                
                <motion.div 
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
                >
                  <div className="text-3xl font-bold text-foreground mb-2">{t('home.problem.impactProviders')}</div>
                  <div className="text-base text-slate-600">{t('home.problem.impactProvidersDesc')}</div>
                </motion.div>
                
                <motion.div 
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.8, ease: "easeOut" }}
                >
                  <div className="text-3xl font-bold text-foreground mb-2">{t('home.problem.impactAccess')}</div>
                  <div className="text-base text-slate-600">{t('home.problem.impactAccessDesc')}</div>
                </motion.div>
              </div>

              {/* Image Column - 50% width, flush bottom */}
              <motion.div 
                className="flex justify-center items-end h-full"
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <img 
                  src={womanDoctorImage} 
                  alt="Professional healthcare provider" 
                  className="w-96 h-96 object-contain scale-[1.275] translate-y-8"
                />
              </motion.div>
            </div>
          </div>
        </div>
      </ScrollReveal>
    </section>
  );
};