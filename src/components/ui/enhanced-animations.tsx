import { motion, useMotionValue, useTransform, useScroll } from 'framer-motion';
import { useEffect, useRef } from 'react';

interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

export const ScrollReveal = ({ children, className = '', delay = 0 }: ScrollRevealProps) => (
  <motion.div
    initial={{ opacity: 0, y: 60 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.8, delay, ease: [0.25, 0.25, 0.25, 0.75] }}
    className={className}
  >
    {children}
  </motion.div>
);

interface StaggerContainerProps {
  children: React.ReactNode;
  className?: string;
  staggerDelay?: number;
}

export const StaggerContainer = ({ children, className = '', staggerDelay = 0.1 }: StaggerContainerProps) => (
  <motion.div
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true }}
    variants={{
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: {
          staggerChildren: staggerDelay
        }
      }
    }}
    className={className}
  >
    {children}
  </motion.div>
);

export const StaggerItem = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => (
  <motion.div
    variants={{
      hidden: { opacity: 0, y: 30 },
      visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
    }}
    className={className}
  >
    {children}
  </motion.div>
);

interface ParallaxTextProps {
  children: React.ReactNode;
  className?: string;
  speed?: number;
}

export const ParallaxText = ({ children, className = '', speed = 0.5 }: ParallaxTextProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], [0, speed * 100]);
  
  return (
    <motion.div ref={ref} style={{ y }} className={className}>
      {children}
    </motion.div>
  );
};

interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  strength?: number;
}

export const MagneticButton = ({ children, className = '', strength = 0.3 }: MagneticButtonProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = element.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      x.set((e.clientX - centerX) * strength);
      y.set((e.clientY - centerY) * strength);
    };

    const handleMouseLeave = () => {
      x.set(0);
      y.set(0);
    };

    element.addEventListener('mousemove', handleMouseMove);
    element.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      element.removeEventListener('mousemove', handleMouseMove);
      element.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [x, y, strength]);

  return (
    <motion.div
      ref={ref}
      style={{ x, y }}
      transition={{ type: 'spring', stiffness: 350, damping: 25 }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export const FloatingElements = () => (
  <div className="fixed inset-0 pointer-events-none overflow-hidden">
    {[...Array(6)].map((_, i) => (
      <motion.div
        key={i}
        className="absolute w-1 h-1 bg-accent-blue/20 rounded-full"
        initial={{
          x: Math.random() * window.innerWidth,
          y: Math.random() * window.innerHeight,
        }}
        animate={{
          y: [null, -20, 20, -20],
          x: [null, -10, 10, -10],
        }}
        transition={{
          duration: 8 + Math.random() * 4,
          repeat: Infinity,
          ease: "easeInOut",
          delay: i * 0.5,
        }}
      />
    ))}
  </div>
);