import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface AnimatedTextProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  from?: 'bottom' | 'top' | 'left' | 'right';
}

export const AnimatedText = ({ 
  children, 
  className = '', 
  delay = 0,
  duration = 0.6,
  from = 'bottom'
}: AnimatedTextProps) => {
  const directions = {
    bottom: { y: 40, x: 0 },
    top: { y: -40, x: 0 },
    left: { y: 0, x: -40 },
    right: { y: 0, x: 40 }
  };

  return (
    <motion.div
      initial={{ 
        opacity: 0,
        ...directions[from]
      }}
      whileInView={{ 
        opacity: 1,
        y: 0,
        x: 0
      }}
      viewport={{ once: true }}
      transition={{
        duration,
        delay,
        ease: [0.25, 0.25, 0.25, 0.75]
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

interface SplitTextProps {
  text: string;
  className?: string;
  wordDelay?: number;
  characterDelay?: number;
  splitBy?: 'words' | 'characters';
}

export const SplitText = ({ 
  text, 
  className = '',
  wordDelay = 0.1,
  characterDelay = 0.05,
  splitBy = 'words'
}: SplitTextProps) => {
  const items = splitBy === 'words' ? text.split(' ') : text.split('');
  const delay = splitBy === 'words' ? wordDelay : characterDelay;

  return (
    <div className={className}>
      {items.map((item, index) => (
        <motion.span
          key={index}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{
            duration: 0.6,
            delay: index * delay,
            ease: [0.25, 0.25, 0.25, 0.75]
          }}
          className="inline-block"
        >
          {item}
          {splitBy === 'words' && index < items.length - 1 && '\u00A0'}
        </motion.span>
      ))}
    </div>
  );
};