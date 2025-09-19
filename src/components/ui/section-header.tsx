import { motion } from 'framer-motion';
import { AnimatedText } from '@/components/ui/animated-text';

interface SectionHeaderProps {
  title: string;
  subtitle: string;
  imageSrc?: string;
  imageAlt?: string;
  variant?: 'default' | 'with-image-circle';
  className?: string;
}

export const SectionHeader = ({ 
  title, 
  subtitle, 
  imageSrc, 
  imageAlt = '',
  variant = 'default',
  className = '' 
}: SectionHeaderProps) => {
  if (variant === 'with-image-circle' && imageSrc) {
    return (
      <div className={`text-center mb-20 ${className}`}>
        <div className="relative max-w-4xl mx-auto">
          {/* Large Dental Blue Circle Background */}
          <motion.div 
            className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-8 w-80 h-80 md:w-96 md:h-96 rounded-full bg-gradient-to-br from-dental-blue/20 to-dental-blue/10 backdrop-blur-sm"
            initial={{ scale: 0, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          />
          
          {/* Image Container */}
          <motion.div 
            className="relative z-10 mx-auto w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden shadow-elegant mb-8"
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <img 
              src={imageSrc} 
              alt={imageAlt}
              className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
            />
            
            {/* Subtle overlay gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-dental-blue/10 to-transparent" />
          </motion.div>
          
          {/* Title and Subtitle */}
          <AnimatedText className="relative z-10" delay={0.4}>
            <h2 className="text-4xl md:text-6xl font-bold mb-6 text-foreground">
              {title}
            </h2>
            <p className="text-xl md:text-2xl text-foreground/80 max-w-3xl mx-auto leading-relaxed">
              {subtitle}
            </p>
          </AnimatedText>
          
          {/* Decorative floating elements */}
          <motion.div 
            className="absolute top-16 right-8 w-3 h-3 bg-dental-blue/30 rounded-full"
            animate={{ 
              y: [0, -10, 0],
              opacity: [0.3, 0.6, 0.3]
            }}
            transition={{ 
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.div 
            className="absolute bottom-16 left-8 w-2 h-2 bg-dental-blue/40 rounded-full"
            animate={{ 
              y: [0, 8, 0],
              opacity: [0.4, 0.7, 0.4]
            }}
            transition={{ 
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1
            }}
          />
        </div>
      </div>
    );
  }

  // Default variant
  return (
    <AnimatedText className={`text-center mb-20 ${className}`}>
      <h2 className="text-4xl md:text-6xl font-bold mb-6 text-foreground">
        {title}
      </h2>
      <p className="text-xl md:text-2xl text-foreground/80 max-w-4xl mx-auto leading-relaxed">
        {subtitle}
      </p>
    </AnimatedText>
  );
};