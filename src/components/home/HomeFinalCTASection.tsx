import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, Zap, Users, TrendingUp } from "lucide-react";
import { ScrollReveal, StaggerContainer, StaggerItem, MagneticButton } from "@/components/ui/enhanced-animations";
import { ParallaxSection } from "@/components/ui/parallax-section";
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import dentistWomanImage from '@/assets/dentist-woman-white-transparent.png';

export function HomeFinalCTASection() {
  const navigate = useNavigate();
  const { t } = useTranslation('marketing');
  
  const benefits = [{
    icon: Users,
    text: t('home.finalCTA.benefits.patients')
  }, {
    icon: TrendingUp,
    text: t('home.finalCTA.benefits.providers')
  }, {
    icon: Sparkles,
    text: t('home.finalCTA.benefits.intelligence')
  }, {
    icon: Zap,
    text: t('home.finalCTA.benefits.barriers')
  }];
  return <ParallaxSection className="py-32 bg-slate-900 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.02]" />
      <motion.div className="absolute top-1/4 -left-32 w-64 h-64 bg-primary/10 rounded-full blur-3xl" animate={{
      x: [0, 50, 0],
      y: [0, -30, 0],
      scale: [1, 1.1, 1]
    }} transition={{
      duration: 20,
      repeat: Infinity,
      ease: "easeInOut"
    }} />
      <motion.div className="absolute bottom-1/4 -right-32 w-64 h-64 bg-accent/10 rounded-full blur-3xl" animate={{
      x: [0, -50, 0],
      y: [0, 30, 0],
      scale: [1.1, 1, 1.1]
    }} transition={{
      duration: 25,
      repeat: Infinity,
      ease: "easeInOut"
    }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <ScrollReveal className="text-center mb-16">
          
          
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-8 leading-tight">
            <span className="block text-white">{t('home.finalCTA.title')}</span>
          </h2>
          
          <p className="text-xl md:text-2xl text-blue-100 max-w-4xl mx-auto leading-relaxed mb-12">
            {t('home.finalCTA.description')}
          </p>
        </ScrollReveal>

        {/* Benefits Grid */}
        <ScrollReveal>
          <StaggerContainer className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16" staggerDelay={0.1}>
             {benefits.map((benefit, index) => <StaggerItem key={index}>
                 <motion.div className="flex flex-col items-center text-center p-6 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 h-full min-h-[180px] justify-center" initial={{
              opacity: 0,
              y: 50,
              scale: 0.8
            }} whileInView={{
              opacity: 1,
              y: 0,
              scale: 1
            }} transition={{
              duration: 0.6,
              delay: index * 0.15,
              ease: "easeOut"
            }} whileHover={{
              y: -5,
              scale: 1.02
            }} viewport={{
              once: true
            }}>
                   <motion.div className="p-3 bg-blue-500/20 rounded-2xl mb-4" whileHover={{
                rotate: 360
              }} transition={{
                duration: 0.5
              }}>
                     <benefit.icon className="w-6 h-6 text-blue-300" />
                   </motion.div>
                   <p className="font-semibold text-white">{benefit.text}</p>
                 </motion.div>
              </StaggerItem>)}
          </StaggerContainer>
        </ScrollReveal>

        {/* CTA Buttons */}
        <ScrollReveal className="text-center">
          <h3 className="text-3xl md:text-4xl font-bold text-white mb-8">{t('home.finalCTA.learnMore')}</h3>
          <div className="flex flex-col sm:flex-row gap-8 justify-center items-center mb-12">
            <MagneticButton>
              <Button size="lg" className="text-2xl px-20 py-8 bg-white hover:bg-gray-100 text-black border-0 shadow-2xl hover:shadow-gray-500/25 transition-all duration-300 rounded-xl w-72" onClick={() => navigate('/patients')}>
                {t('home.finalCTA.ctaPatients')}
                <ArrowRight className="ml-3 w-6 h-6" />
              </Button>
            </MagneticButton>
            
            <MagneticButton>
              <Button size="lg" className="text-2xl px-16 py-8 bg-white hover:bg-gray-100 text-black border-0 shadow-2xl hover:shadow-gray-500/25 transition-all duration-300 rounded-xl w-72" onClick={() => navigate('/providers')}>
                {t('home.finalCTA.ctaProviders')}
                <ArrowRight className="ml-3 w-6 h-6" />
              </Button>
            </MagneticButton>
          </div>
          
          <motion.p className="text-blue-200" initial={{
          opacity: 0
        }} whileInView={{
          opacity: 1
        }} transition={{
          delay: 0.5,
          duration: 0.8
        }}>
            {t('home.finalCTA.guarantee')}
          </motion.p>
        </ScrollReveal>

      </div>
    </ParallaxSection>;
}