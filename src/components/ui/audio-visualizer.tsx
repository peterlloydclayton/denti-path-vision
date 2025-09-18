import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

interface AudioVisualizerProps {
  barCount?: number;
  className?: string;
  isActive?: boolean;
}

export const AudioVisualizer = ({ 
  barCount = 20, 
  className = '',
  isActive = true 
}: AudioVisualizerProps) => {
  const [heights, setHeights] = useState<number[]>([]);

  useEffect(() => {
    // Initialize with random heights
    setHeights(Array.from({ length: barCount }, () => Math.random() * 0.8 + 0.2));
    
    if (!isActive) return;

    const interval = setInterval(() => {
      setHeights(prev => 
        prev.map(() => Math.random() * 0.8 + 0.2)
      );
    }, 150);

    return () => clearInterval(interval);
  }, [barCount, isActive]);

  return (
    <div className={`flex items-end justify-center gap-1 ${className}`}>
      {heights.map((height, index) => (
        <motion.div
          key={index}
          className="bg-gradient-to-t from-dental-blue to-dental-lavender rounded-sm"
          style={{
            width: '3px',
            minHeight: '4px',
          }}
          animate={{
            height: isActive ? `${height * 40}px` : '4px',
            opacity: isActive ? 1 : 0.3,
          }}
          transition={{
            duration: 0.15,
            ease: 'easeOut',
            delay: index * 0.01,
          }}
        />
      ))}
    </div>
  );
};

interface WaveformProps {
  className?: string;
  isActive?: boolean;
}

export const Waveform = ({ className = '', isActive = true }: WaveformProps) => {
  return (
    <div className={`flex items-center justify-center ${className}`}>
      <svg
        width="120"
        height="40"
        viewBox="0 0 120 40"
        className="overflow-visible"
      >
        {[...Array(7)].map((_, i) => (
          <motion.path
            key={i}
            d={`M${i * 20} 20 Q${i * 20 + 10} ${10 + Math.sin(i) * 8} ${(i + 1) * 20} 20`}
            stroke="hsl(var(--dental-blue))"
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
            animate={isActive ? {
              d: [
                `M${i * 20} 20 Q${i * 20 + 10} ${20} ${(i + 1) * 20} 20`,
                `M${i * 20} 20 Q${i * 20 + 10} ${10} ${(i + 1) * 20} 20`,
                `M${i * 20} 20 Q${i * 20 + 10} ${30} ${(i + 1) * 20} 20`,
                `M${i * 20} 20 Q${i * 20 + 10} ${20} ${(i + 1) * 20} 20`,
              ],
              opacity: [0.4, 1, 0.6, 0.4]
            } : {}}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: i * 0.2,
              ease: 'easeInOut'
            }}
          />
        ))}
      </svg>
    </div>
  );
};

interface EqualizerBarsProps {
  className?: string;
  isActive?: boolean;
}

export const EqualizerBars = ({ className = '', isActive = true }: EqualizerBarsProps) => {
  const bars = [
    { height: 24, delay: 0 },
    { height: 32, delay: 0.1 },
    { height: 16, delay: 0.2 },
    { height: 28, delay: 0.3 },
    { height: 20, delay: 0.4 },
    { height: 36, delay: 0.5 },
    { height: 18, delay: 0.6 },
    { height: 30, delay: 0.7 },
  ];

  return (
    <div className={`flex items-end justify-center gap-1 ${className}`}>
      {bars.map((bar, index) => (
        <motion.div
          key={index}
          className="bg-gradient-to-t from-dental-lavender to-dental-blue rounded-sm"
          style={{
            width: '4px',
            height: `${bar.height}px`,
          }}
          animate={isActive ? {
            scaleY: [1, 0.3, 0.8, 0.5, 1],
            opacity: [0.6, 1, 0.4, 0.8, 0.6]
          } : {
            scaleY: 0.3,
            opacity: 0.3
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            delay: bar.delay,
            ease: 'easeInOut'
          }}
        />
      ))}
    </div>
  );
};