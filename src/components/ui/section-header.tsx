import { motion } from 'framer-motion';
import { ReactNode } from 'react';
import { AnimatedText } from './animated-text';

interface SectionHeaderProps {
  title: string;
  subtitle: string;
  backgroundImage: string;
  className?: string;
}

export const SectionHeader = ({ 
  title, 
  subtitle, 
  backgroundImage,
  className = "" 
}: SectionHeaderProps) => {
  return (
    <div className={`relative max-w-4xl mx-auto ${className}`}>
      {/* Full Background Image */}
      <motion.div 
        className="relative h-48 md:h-32 w-full rounded-xl overflow-hidden"
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <img 
          src={backgroundImage} 
          alt="Happy patient" 
          className="w-full h-full object-cover"
        />
        {/* Subtle overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-black/10 via-transparent to-black/30" />
      </motion.div>

      {/* Overlapping Text Card */}
      <div className="absolute -bottom-8 left-4 right-4 md:left-6 md:right-1/3">
        {/* Blue highlight offset */}
        <motion.div 
          className="absolute top-3 left-3 w-full h-full bg-dental-blue rounded-xl"
          initial={{ opacity: 0, x: 20, y: 20 }}
          whileInView={{ opacity: 1, x: 0, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
        />
        
        {/* Main black card */}
        <motion.div 
          className="relative bg-black/95 backdrop-blur-sm rounded-xl p-4 md:p-6 border border-white/10 shadow-2xl"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
        >
          <AnimatedText delay={0.6}>
            <h2 className="text-xl md:text-2xl font-bold text-white leading-tight mb-2">
              {title}
            </h2>
          </AnimatedText>
          
          <AnimatedText delay={0.8}>
            <p className="text-sm md:text-base text-white/80 leading-relaxed">
              {subtitle}
            </p>
          </AnimatedText>

          {/* Decorative accent line */}
          <motion.div 
            className="absolute bottom-3 left-4 w-8 h-0.5 bg-dental-blue rounded-full"
            initial={{ width: 0 }}
            whileInView={{ width: 32 }}
            transition={{ duration: 0.6, delay: 1 }}
          />
        </motion.div>
      </div>
    </div>
  );
};