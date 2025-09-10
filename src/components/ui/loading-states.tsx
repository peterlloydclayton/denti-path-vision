import { motion } from 'framer-motion';

export const SkeletonCard = () => (
  <div className="animate-pulse bg-surface border border-border rounded-xl p-6 space-y-4">
    <div className="h-4 bg-muted rounded w-3/4"></div>
    <div className="h-3 bg-muted rounded w-1/2"></div>
    <div className="h-3 bg-muted rounded w-full"></div>
    <div className="h-3 bg-muted rounded w-2/3"></div>
  </div>
);

export const LoadingDots = () => (
  <div className="flex space-x-1">
    {[0, 1, 2].map((i) => (
      <motion.div
        key={i}
        className="w-2 h-2 bg-primary rounded-full"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.5, 1, 0.5],
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          delay: i * 0.2,
        }}
      />
    ))}
  </div>
);

export const SpinningLoader = ({ size = "md" }: { size?: "sm" | "md" | "lg" }) => {
  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-6 h-6", 
    lg: "w-8 h-8"
  };

  return (
    <motion.div
      className={`${sizeClasses[size]} border-2 border-muted border-t-primary rounded-full`}
      animate={{ rotate: 360 }}
      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
    />
  );
};

export const PulseLoader = () => (
  <motion.div
    className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center"
    animate={{
      scale: [1, 1.2, 1],
    }}
    transition={{
      duration: 2,
      repeat: Infinity,
      ease: "easeInOut"
    }}
  >
    <motion.div
      className="w-6 h-6 bg-primary rounded-full"
      animate={{
        scale: [1, 0.8, 1],
      }}
      transition={{
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    />
  </motion.div>
);

interface ProgressBarProps {
  progress: number;
  className?: string;
}

export const ProgressBar = ({ progress, className = '' }: ProgressBarProps) => (
  <div className={`w-full bg-muted rounded-full h-2 ${className}`}>
    <motion.div
      className="bg-primary h-2 rounded-full"
      initial={{ width: 0 }}
      animate={{ width: `${progress}%` }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    />
  </div>
);

export const ContentLoader = ({ lines = 3 }: { lines?: number }) => (
  <div className="space-y-3 animate-pulse">
    {[...Array(lines)].map((_, i) => (
      <div
        key={i}
        className="h-4 bg-muted rounded"
        style={{ width: `${Math.random() * 40 + 60}%` }}
      />
    ))}
  </div>
);