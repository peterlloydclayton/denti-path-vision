import { motion } from 'framer-motion';
import { AnimatedText } from '@/components/ui/animated-text';

interface SectionHeaderProps {
  title: string;
  subtitle: string;
  imageSrc?: string;
  imageAlt?: string;
  variant?: 'default' | 'with-image-circle' | 'split-layout';
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
  if (variant === 'split-layout' && imageSrc) {
    return (
      <div className={`mb-20 ${className}`}>
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left Side - Floating Image */}
            <motion.div 
              className="relative"
              initial={{ opacity: 0, x: -50, rotate: -5 }}
              whileInView={{ opacity: 1, x: 0, rotate: -2 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              {/* Background decorative circle */}
              <div className="absolute -top-8 -left-8 w-80 h-80 rounded-full bg-gradient-to-br from-dental-blue/15 to-dental-blue/5 -z-10" />
              
              {/* Image Card */}
              <div className="relative transform rotate-[-2deg] hover:rotate-[0deg] transition-transform duration-500">
                <div className="bg-white rounded-2xl p-4 shadow-elegant hover:shadow-xl transition-shadow duration-300">
                  <div className="aspect-[4/3] rounded-xl overflow-hidden">
                    <img 
                      src={imageSrc} 
                      alt={imageAlt}
                      className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                    />
                  </div>
                </div>
                
                {/* Floating accent elements */}
                <motion.div 
                  className="absolute -top-4 -right-4 w-8 h-8 bg-dental-blue rounded-full shadow-lg"
                  animate={{ 
                    y: [0, -8, 0],
                    scale: [1, 1.1, 1]
                  }}
                  transition={{ 
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
                <motion.div 
                  className="absolute -bottom-6 -left-6 w-12 h-12 bg-gradient-to-br from-dental-blue to-dental-blue-dark rounded-lg shadow-lg opacity-90"
                  animate={{ 
                    rotate: [0, 5, -5, 0],
                  }}
                  transition={{ 
                    duration: 6,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
              </div>
              
              {/* Connecting line to content */}
              <motion.div 
                className="hidden lg:block absolute top-1/2 -right-16 w-16 h-0.5 bg-gradient-to-r from-dental-blue to-transparent"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.5 }}
              />
            </motion.div>
            
            {/* Right Side - Content */}
            <motion.div 
              className="lg:pl-8"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <motion.h2 
                className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-foreground leading-tight"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                {title.split(' ').map((word, index) => (
                  <motion.span
                    key={index}
                    className="inline-block mr-3"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
                  >
                    {word}
                  </motion.span>
                ))}
              </motion.h2>
              
              <motion.p 
                className="text-xl md:text-2xl text-foreground/80 leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.8 }}
              >
                {subtitle}
              </motion.p>
              
              {/* Decorative elements */}
              <motion.div 
                className="absolute top-8 right-8 w-2 h-2 bg-dental-blue/40 rounded-full"
                animate={{ 
                  scale: [1, 1.5, 1],
                  opacity: [0.4, 0.8, 0.4]
                }}
                transition={{ 
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            </motion.div>
          </div>
        </div>
      </div>
    );
  }

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