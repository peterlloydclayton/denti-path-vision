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
    <div className={`relative flex items-center gap-8 mb-20 ${className}`}>
      {/* Image Container */}
      <div className="relative flex-1">
        <motion.div 
          className="relative h-80 md:h-96 rounded-2xl overflow-hidden"
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <img 
            src={backgroundImage} 
            alt="Happy patient" 
            className="w-full h-full object-cover"
          />
          {/* Subtle overlay to ensure good contrast */}
          <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-black/20" />
        </motion.div>
      </div>

      {/* Text Card with Blue Highlight */}
      <div className="relative flex-1">
        {/* Blue highlight offset */}
        <motion.div 
          className="absolute top-6 right-6 w-full h-full bg-dental-blue rounded-2xl -z-10"
          initial={{ opacity: 0, x: 20, y: 20 }}
          whileInView={{ opacity: 1, x: 0, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
        />
        
        {/* Main black card */}
        <motion.div 
          className="relative bg-black/90 backdrop-blur-sm rounded-2xl p-8 md:p-12 border border-white/10"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
        >
          <AnimatedText delay={0.6}>
            <h2 className="text-3xl md:text-5xl font-bold text-white leading-tight mb-6">
              {title}
            </h2>
          </AnimatedText>
          
          <AnimatedText delay={0.8}>
            <p className="text-lg md:text-xl text-white/80 leading-relaxed">
              {subtitle}
            </p>
          </AnimatedText>

          {/* Decorative accent line */}
          <motion.div 
            className="absolute bottom-8 left-8 w-16 h-1 bg-dental-blue rounded-full"
            initial={{ width: 0 }}
            whileInView={{ width: 64 }}
            transition={{ duration: 0.6, delay: 1 }}
          />
        </motion.div>
      </div>
    </div>
  );
};