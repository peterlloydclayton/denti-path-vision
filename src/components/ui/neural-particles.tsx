import { motion } from 'framer-motion';
import { useMemo } from 'react';

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
}

export const NeuralParticles = () => {
  const particles = useMemo<Particle[]>(() => 
    Array.from({ length: 20 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1,
      duration: Math.random() * 10 + 5,
      delay: Math.random() * 5,
    })), []
  );

  const connections = useMemo(() => {
    const lines = [];
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const distance = Math.sqrt(
          Math.pow(particles[i].x - particles[j].x, 2) + 
          Math.pow(particles[i].y - particles[j].y, 2)
        );
        if (distance < 25) {
          lines.push({
            id: `${i}-${j}`,
            x1: particles[i].x,
            y1: particles[i].y,
            x2: particles[j].x,
            y2: particles[j].y,
            opacity: (25 - distance) / 25,
          });
        }
      }
    }
    return lines;
  }, [particles]);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Floating particles */}
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full bg-intelligence/20"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
          }}
          animate={{
            y: [-20, 20, -20],
            x: [-10, 10, -10],
            opacity: [0.2, 0.8, 0.2],
            scale: [0.8, 1.2, 0.8],
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            delay: particle.delay,
            ease: "easeInOut"
          }}
        />
      ))}

      {/* Neural network connections */}
      <svg className="absolute inset-0 w-full h-full">
        {connections.map((line) => (
          <motion.line
            key={line.id}
            x1={`${line.x1}%`}
            y1={`${line.y1}%`}
            x2={`${line.x2}%`}
            y2={`${line.y2}%`}
            stroke="hsl(var(--intelligence))"
            strokeWidth="0.5"
            initial={{ opacity: 0 }}
            animate={{
              opacity: [0, line.opacity * 0.6, 0],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: Math.random() * 2,
              ease: "easeInOut"
            }}
          />
        ))}
      </svg>

      {/* Data flow streams */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={`stream-${i}`}
          className="absolute w-0.5 bg-gradient-to-b from-transparent via-primary/30 to-transparent"
          style={{
            left: `${20 + i * 12}%`,
            height: '100%',
          }}
          animate={{
            translateY: ['-100%', '100%'],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: 4 + Math.random() * 2,
            repeat: Infinity,
            delay: i * 0.8,
            ease: "linear"
          }}
        />
      ))}

      {/* Binary code rain effect */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={`binary-${i}`}
          className="absolute text-xs font-mono text-intelligence/20 whitespace-nowrap"
          style={{
            left: `${10 + i * 11}%`,
            top: '-20px',
          }}
          animate={{
            y: ['0vh', '120vh'],
            opacity: [0, 0.6, 0],
          }}
          transition={{
            duration: 8 + Math.random() * 4,
            repeat: Infinity,
            delay: i * 1.2,
            ease: "linear"
          }}
        >
          {Array.from({ length: 15 }, () => Math.random() > 0.5 ? '1' : '0').join('')}
        </motion.div>
      ))}
    </div>
  );
};