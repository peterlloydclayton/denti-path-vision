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
    <div className={`relative h-96 md:h-[500px] overflow-hidden rounded-3xl mb-20 ${className}`}>
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      />
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/50 to-black/60" />
      
      {/* Decorative Elements */}
      <div className="absolute top-8 right-8 w-3 h-3 bg-white/30 rounded-full animate-pulse" />
      <div className="absolute bottom-12 left-12 w-2 h-2 bg-white/20 rounded-full animate-pulse" style={{ animationDelay: '1s' }} />
      <div className="absolute top-16 left-1/4 w-1.5 h-1.5 bg-white/25 rounded-full animate-pulse" style={{ animationDelay: '2s' }} />
      
      {/* Content Overlay */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center px-6 max-w-5xl mx-auto">
          <AnimatedText className="mb-6">
            <h2 className="text-4xl md:text-6xl font-bold text-white leading-tight">
              {title}
            </h2>
          </AnimatedText>
          
          <AnimatedText delay={0.2}>
            <p className="text-xl md:text-2xl text-white/90 leading-relaxed">
              {subtitle}
            </p>
          </AnimatedText>
          
          {/* Subtle glow effect */}
          <motion.div 
            className="absolute inset-0 -z-10 rounded-3xl"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            style={{
              background: 'radial-gradient(ellipse at center, rgba(255,255,255,0.1) 0%, transparent 70%)',
            }}
          />
        </div>
      </div>
      
      {/* Bottom fade to blend with next section */}
      <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-dental-blue to-transparent" />
    </div>
  );
};