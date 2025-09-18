import { motion } from 'framer-motion';
import { Bot } from 'lucide-react';

interface ConstellationHubProps {
  className?: string;
}

export const ConstellationHub = ({ className = '' }: ConstellationHubProps) => {
  // Create particle configurations for 3 concentric circles
  const createParticles = (radius: number, count: number, speed: number) => {
    return Array.from({ length: count }, (_, i) => ({
      id: `particle-${radius}-${i}`,
      angle: (360 / count) * i,
      radius,
      speed,
      delay: i * 0.1
    }));
  };

  const innerParticles = createParticles(60, 6, 20);
  const middleParticles = createParticles(90, 8, -15);
  const outerParticles = createParticles(120, 8, 10);

  const allParticles = [...innerParticles, ...middleParticles, ...outerParticles];

  return (
    <div className={`relative w-80 h-80 mx-auto ${className}`}>
      {/* Central AI Hub */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center"
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <motion.div
          className="relative w-24 h-24 rounded-full bg-intelligence text-intelligence-foreground flex items-center justify-center shadow-elegant"
          animate={{
            boxShadow: [
              '0 0 20px hsl(var(--dental-blue) / 0.3)',
              '0 0 40px hsl(var(--dental-lavender) / 0.4)',
              '0 0 20px hsl(var(--dental-blue) / 0.3)'
            ]
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <Bot size={36} />
          
          {/* Central pulse effect */}
          <motion.div
            className="absolute inset-0 rounded-full border-2 border-dental-blue/30"
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.5, 0, 0.5]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeOut"
            }}
          />
        </motion.div>
      </motion.div>

      {/* Rotating Particles */}
      {allParticles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute w-3 h-3 rounded-full"
          style={{
            background: particle.radius <= 60 
              ? 'hsl(var(--dental-blue))' 
              : particle.radius <= 90 
                ? 'hsl(var(--dental-lavender))' 
                : 'hsl(var(--dental-blue) / 0.7)',
            left: '50%',
            top: '50%',
            x: '-50%',
            y: '-50%'
          }}
          animate={{
            rotate: 360
          }}
          transition={{
            duration: particle.speed,
            repeat: Infinity,
            ease: "linear",
            delay: particle.delay
          }}
          transformTemplate={({ rotate }) => 
            `translate(-50%, -50%) rotate(${rotate}) translateY(-${particle.radius}px)`
          }
        >
          <motion.div
            className="w-full h-full rounded-full"
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.7, 1, 0.7]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: particle.delay
            }}
          />
        </motion.div>
      ))}

      {/* Orbital rings */}
      <div className="absolute inset-0 rounded-full border border-dental-blue/10" 
           style={{ width: '120px', height: '120px', left: '50%', top: '50%', transform: 'translate(-50%, -50%)' }} />
      <div className="absolute inset-0 rounded-full border border-dental-lavender/10" 
           style={{ width: '180px', height: '180px', left: '50%', top: '50%', transform: 'translate(-50%, -50%)' }} />
      <div className="absolute inset-0 rounded-full border border-dental-blue/5" 
           style={{ width: '240px', height: '240px', left: '50%', top: '50%', transform: 'translate(-50%, -50%)' }} />
    </div>
  );
};