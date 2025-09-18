import { motion } from 'framer-motion';

interface PulseRipplesProps {
  className?: string;
  isActive?: boolean;
  rippleCount?: number;
}

export const PulseRipples = ({ 
  className = '', 
  isActive = true, 
  rippleCount = 3 
}: PulseRipplesProps) => {
  return (
    <div className={`relative flex items-center justify-center ${className}`}>
      {isActive && [...Array(rippleCount)].map((_, index) => (
        <motion.div
          key={index}
          className="absolute rounded-full border-2 border-dental-blue/30"
          initial={{ scale: 0, opacity: 0 }}
          animate={{
            scale: [0, 2, 3],
            opacity: [0, 0.6, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            delay: index * 0.6,
            ease: 'easeOut',
          }}
          style={{
            width: '60px',
            height: '60px',
          }}
        />
      ))}
      
      {/* Inner glow */}
      {isActive && (
        <motion.div
          className="absolute w-16 h-16 rounded-full bg-dental-blue/10"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      )}
    </div>
  );
};

interface VoiceIndicatorProps {
  className?: string;
  isActive?: boolean;
}

export const VoiceIndicator = ({ className = '', isActive = true }: VoiceIndicatorProps) => {
  return (
    <div className={`relative ${className}`}>
      {/* Outer ripples */}
      <PulseRipples isActive={isActive} />
      
      {/* Voice wave lines */}
      <div className="absolute inset-0 flex items-center justify-center">
        {[...Array(4)].map((_, index) => (
          <motion.div
            key={index}
            className="absolute w-0.5 bg-dental-lavender rounded-full"
            style={{
              height: '8px',
              left: `${45 + index * 3}%`,
            }}
            animate={isActive ? {
              scaleY: [1, 2, 0.5, 1.5, 1],
              opacity: [0.4, 1, 0.3, 0.8, 0.4],
            } : {
              scaleY: 0.5,
              opacity: 0.2,
            }}
            transition={{
              duration: 1,
              repeat: Infinity,
              delay: index * 0.1,
              ease: 'easeInOut',
            }}
          />
        ))}
      </div>
    </div>
  );
};