import { motion } from 'framer-motion';
import { ReactNode } from 'react';
import { AnimatedText } from './animated-text';

interface SectionHeaderProps {
  title: string;
  subtitle: string;
  backgroundImage?: string;
  backgroundComponent?: React.ReactNode;
  altText?: string;
  className?: string;
}

export const SectionHeader = ({ 
  title, 
  subtitle, 
  backgroundImage,
  backgroundComponent,
  altText = "Section image",
  className = "" 
}: SectionHeaderProps) => {
  return (
    <div className={`relative max-w-6xl mx-auto ${className}`}>
      {/* Title above image */}
      <div className="mb-8">
        <AnimatedText delay={0.2}>
          <h1 className="text-4xl md:text-6xl font-bold text-foreground leading-tight">
            {title}
          </h1>
        </AnimatedText>
      </div>

      {/* Card positioned above the image */}
      <div className="relative mb-8 ml-8 mr-8 md:ml-12 md:mr-2/3">
        {/* Blue highlight offset */}
        <motion.div 
          className="absolute top-6 left-6 bg-dental-blue rounded-2xl"
          style={{ width: 'calc(100% - 24px)', height: 'calc(100% - 24px)' }}
          initial={{ opacity: 0, x: 20, y: 20 }}
          whileInView={{ opacity: 1, x: 0, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
        />
        
        {/* Main black card */}
        <motion.div 
          className="relative bg-black/95 backdrop-blur-sm rounded-2xl p-8 md:p-10 border border-white/10 shadow-2xl"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
        >
          <AnimatedText delay={0.6}>
            <p className="text-base md:text-lg text-white/80 leading-relaxed">
              {subtitle}
            </p>
          </AnimatedText>

          {/* Decorative accent line */}
          <motion.div 
            className="absolute bottom-6 left-8 w-12 h-1 bg-dental-blue rounded-full"
            initial={{ width: 0 }}
            whileInView={{ width: 48 }}
            transition={{ duration: 0.6, delay: 1 }}
          />
        </motion.div>
      </div>

      {/* Full Background Image or Component */}
      <motion.div 
        className="relative h-80 md:h-96 w-full rounded-2xl overflow-hidden"
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        {backgroundComponent ? (
          backgroundComponent
        ) : (
          <>
            <img 
              src={backgroundImage} 
              alt={altText} 
              className="w-full h-full object-cover"
            />
            {/* Subtle overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-black/10 via-transparent to-black/30" />
          </>
        )}
      </motion.div>
    </div>
  );
};