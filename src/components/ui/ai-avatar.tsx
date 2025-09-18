import { motion } from 'framer-motion';
import { Bot } from 'lucide-react';
import { useState, useRef } from 'react';

export const AIAvatar = () => {
  const [isHovered, setIsHovered] = useState(false);
  const mousePosition = useRef({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mousePosition.current = {
      x: ((e.clientX - rect.left - rect.width / 2) / rect.width) * 20,
      y: ((e.clientY - rect.top - rect.height / 2) / rect.height) * 20,
    };
  };

  return (
    <div className="relative flex items-center justify-center">
      {/* Outer glow ring */}
      <motion.div
        className="absolute w-32 h-32 rounded-full bg-gradient-to-r from-intelligence/20 to-primary/20"
        animate={{
          scale: [1, 1.1, 1],
          rotate: [0, 360],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "linear"
        }}
      />
      
      {/* Middle pulse ring */}
      <motion.div
        className="absolute w-24 h-24 rounded-full bg-intelligence/10 border border-intelligence/30"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.8, 0.3],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      {/* Central avatar */}
      <motion.div
        className="relative w-16 h-16 rounded-full bg-gradient-to-br from-intelligence to-primary flex items-center justify-center cursor-pointer shadow-glow"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onMouseMove={handleMouseMove}
        whileHover={{
          scale: 1.1,
          rotateY: 15,
          rotateX: 10,
        }}
        animate={{
          y: [-5, 5, -5],
          rotateX: isHovered ? mousePosition.current.y * 0.1 : 0,
          rotateY: isHovered ? mousePosition.current.x * 0.1 : 0,
        }}
        transition={{
          y: {
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          },
          rotateX: { duration: 0.2 },
          rotateY: { duration: 0.2 }
        }}
        style={{
          transformStyle: 'preserve-3d',
        }}
      >
        <Bot size={32} className="text-white" />
        
        {/* Neural network dots */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white/60 rounded-full"
            style={{
              top: '50%',
              left: '50%',
              transformOrigin: '0 0',
            }}
            animate={{
              rotate: [0, 360],
              scale: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 2 + i * 0.2,
              repeat: Infinity,
              delay: i * 0.2,
            }}
            initial={{
              x: 40 * Math.cos((i * Math.PI * 2) / 8),
              y: 40 * Math.sin((i * Math.PI * 2) / 8),
            }}
          />
        ))}
      </motion.div>

      {/* Data streams */}
      {[...Array(4)].map((_, i) => (
        <motion.div
          key={`stream-${i}`}
          className="absolute w-20 h-0.5 bg-gradient-to-r from-transparent via-intelligence/50 to-transparent"
          style={{
            transformOrigin: 'center',
            rotate: `${i * 90}deg`,
          }}
          animate={{
            scaleX: [0, 1, 0],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            delay: i * 0.5,
            ease: "easeInOut"
          }}
        />
      ))}
    </div>
  );
};