import { motion } from 'framer-motion';

export const AnimatedSoundwaves = () => {
  const waves = Array.from({ length: 8 }, (_, i) => i);
  
  return (
    <div className="absolute inset-0 flex items-center justify-center overflow-hidden z-0">
      {waves.map((wave, index) => (
        <motion.div
          key={wave}
          className="absolute bg-blue-900/30 rounded-full"
          style={{
            width: `${120 + index * 40}px`,
            height: `${120 + index * 40}px`,
          }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.1, 0.3],
          }}
          transition={{
            duration: 2 + index * 0.2,
            repeat: Infinity,
            ease: "easeInOut",
            delay: index * 0.1,
          }}
        />
      ))}
      
      {/* Vertical sound bars */}
      <div className="absolute left-1/4 top-1/2 transform -translate-y-1/2 flex space-x-1">
        {Array.from({ length: 5 }).map((_, i) => (
          <motion.div
            key={`left-${i}`}
            className="bg-blue-900/50 w-1 rounded-full"
            animate={{
              height: [20, 60, 20],
            }}
            transition={{
              duration: 0.8,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.1,
            }}
          />
        ))}
      </div>
      
      <div className="absolute right-1/4 top-1/2 transform -translate-y-1/2 flex space-x-1">
        {Array.from({ length: 5 }).map((_, i) => (
          <motion.div
            key={`right-${i}`}
            className="bg-blue-900/50 w-1 rounded-full"
            animate={{
              height: [20, 60, 20],
            }}
            transition={{
              duration: 0.8,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.1 + 0.4,
            }}
          />
        ))}
      </div>
    </div>
  );
};