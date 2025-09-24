import { motion, useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';

interface MorphingProgressBarProps {
  fromValue: number;
  toValue: number;
  fromLabel: string;
  toLabel: string;
  fromColor?: string;
  toColor?: string;
  duration?: number;
}

export const MorphingProgressBar = ({
  fromValue,
  toValue,
  fromLabel,
  toLabel,
  fromColor = 'hsl(var(--destructive))',
  toColor = 'hsl(var(--success))',
  duration = 2000
}: MorphingProgressBarProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [currentValue, setCurrentValue] = useState(fromValue);
  const [currentLabel, setCurrentLabel] = useState(fromLabel);
  const [currentColor, setCurrentColor] = useState(fromColor);

  useEffect(() => {
    if (isInView) {
      const timer = setTimeout(() => {
        setCurrentValue(toValue);
        setCurrentLabel(toLabel);
        setCurrentColor(toColor);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [isInView, toValue, toLabel, toColor]);

  return (
    <div ref={ref} className="w-full">
      <div className="flex justify-between items-center mb-3">
        <motion.span
          key={currentLabel}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="text-sm font-medium text-foreground"
        >
          {currentLabel}
        </motion.span>
        <motion.span
          className="text-sm font-bold"
          style={{ color: currentColor }}
          animate={{ color: currentColor }}
          transition={{ duration: 0.5 }}
        >
          {currentValue}%
        </motion.span>
      </div>
      
      <div className="w-full h-3 bg-card/20 rounded-full overflow-hidden">
        <motion.div
          className="h-full rounded-full relative"
          style={{ backgroundColor: currentColor }}
          initial={{ width: `${fromValue}%` }}
          animate={{ 
            width: `${currentValue}%`,
            backgroundColor: currentColor
          }}
          transition={{ 
            width: { duration: 1.5, ease: "easeOut", delay: 0.2 },
            backgroundColor: { duration: 0.5, delay: 0.8 }
          }}
        >
          {/* Animated shine effect */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
            initial={{ x: '-100%' }}
            animate={{ x: '200%' }}
            transition={{ 
              duration: 1.5, 
              repeat: Infinity, 
              repeatDelay: 3,
              ease: "easeInOut" 
            }}
          />
        </motion.div>
      </div>
    </div>
  );
};