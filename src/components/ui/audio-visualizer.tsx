import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

export const AudioVisualizer = () => {
  const [bars] = useState(Array.from({ length: 12 }, (_, i) => i));
  const [isActive, setIsActive] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsActive(prev => !prev);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
      {/* Left side bars */}
      <div className="absolute left-1/2 top-1/2 -translate-x-full -translate-y-1/2 flex items-end gap-1 -ml-24">
        {bars.slice(0, 6).map((_, i) => (
          <motion.div
            key={`left-${i}`}
            className="w-1 bg-gradient-to-t from-intelligence/60 to-primary/40 rounded-full"
            animate={{
              height: isActive ? [4, Math.random() * 30 + 10, 4] : [4, 8, 4],
              opacity: [0.3, 1, 0.3],
            }}
            transition={{
              duration: 0.8 + Math.random() * 0.4,
              repeat: Infinity,
              delay: i * 0.1,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>

      {/* Right side bars */}
      <div className="absolute left-1/2 top-1/2 translate-x-0 -translate-y-1/2 flex items-end gap-1 ml-24">
        {bars.slice(6).map((_, i) => (
          <motion.div
            key={`right-${i}`}
            className="w-1 bg-gradient-to-t from-primary/60 to-intelligence/40 rounded-full"
            animate={{
              height: isActive ? [4, Math.random() * 30 + 10, 4] : [4, 8, 4],
              opacity: [0.3, 1, 0.3],
            }}
            transition={{
              duration: 0.8 + Math.random() * 0.4,
              repeat: Infinity,
              delay: i * 0.1,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>

      {/* Center waveform */}
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div
          className="w-32 h-0.5 bg-gradient-to-r from-transparent via-intelligence/40 to-transparent"
          animate={{
            scaleX: isActive ? [1, 1.5, 1] : [1, 1.2, 1],
            opacity: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>
    </div>
  );
};