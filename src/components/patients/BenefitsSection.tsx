import { motion } from 'framer-motion';
import { AnimatedText } from '@/components/ui/animated-text';
import { Enhanced3DCard } from './Enhanced3DCard';
import { benefits } from '@/data/patientsData';
import approvalPhone from '@/assets/approval-hand-phone.png';

export const BenefitsSection = () => {
  return (
    <section className="py-24 bg-dental-blue/5 relative overflow-hidden">
      {/* Floating approval phone */}
      <motion.div
        initial={{ opacity: 0, x: 100, rotate: -10 }}
        whileInView={{ opacity: 0.6, x: 0, rotate: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
        className="absolute top-16 right-8 lg:right-16 z-10 pointer-events-none"
      >
        <motion.img
          src={approvalPhone}
          alt="Approved dental financing"
          className="w-32 lg:w-48 drop-shadow-2xl"
          animate={{ 
            y: [0, -10, 0],
            rotate: [0, 2, 0, -2, 0]
          }}
          transition={{ 
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </motion.div>

      <div className="container mx-auto px-6 relative z-20">
        <AnimatedText className="text-center mb-20">
          <h2 className="text-4xl md:text-6xl font-bold mb-6 text-foreground">
            Why Patients Love DentiPay
          </h2>
          <p className="text-xl md:text-2xl text-foreground/70 max-w-4xl mx-auto leading-relaxed">
            Experience the easiest way to finance your dental care
          </p>
        </AnimatedText>

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
        <div className="absolute top-1/2 left-4 w-2 h-2 bg-dental-blue/30 rounded-full animate-pulse" />
        <div className="absolute top-1/3 right-1/4 w-1 h-1 bg-dental-blue/20 rounded-full animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute bottom-1/4 left-1/3 w-1.5 h-1.5 bg-dental-blue/25 rounded-full animate-pulse" style={{ animationDelay: '2s' }} />
      </div>
    </section>
  );
};