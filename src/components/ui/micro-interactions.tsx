import { motion, useAnimation } from 'framer-motion';
import { useState, useEffect } from 'react';

interface RippleButtonProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

export const RippleButton = ({ children, className = '', onClick }: RippleButtonProps) => {
  const [ripples, setRipples] = useState<Array<{ x: number; y: number; id: number }>>([]);
  
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const newRipple = { x, y, id: Date.now() };
    setRipples(prev => [...prev, newRipple]);
    
    setTimeout(() => {
      setRipples(prev => prev.filter(ripple => ripple.id !== newRipple.id));
    }, 600);
    
    onClick?.();
  };

  return (
    <motion.button
      className={`relative overflow-hidden ${className}`}
      onClick={handleClick}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      {children}
      {ripples.map(ripple => (
        <motion.span
          key={ripple.id}
          className="absolute bg-white/30 rounded-full pointer-events-none"
          style={{
            left: ripple.x - 25,
            top: ripple.y - 25,
            width: 50,
            height: 50,
          }}
          initial={{ scale: 0, opacity: 1 }}
          animate={{ scale: 4, opacity: 0 }}
          transition={{ duration: 0.6 }}
        />
      ))}
    </motion.button>
  );
};

interface FloatingLabelInputProps {
  label: string;
  type?: string;
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

export const FloatingLabelInput = ({ 
  label, 
  type = "text", 
  value, 
  onChange, 
  className = '' 
}: FloatingLabelInputProps) => {
  const [focused, setFocused] = useState(false);
  const hasValue = value.length > 0;
  
  return (
    <div className={`relative ${className}`}>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        className="w-full px-4 py-3 border border-border rounded-lg bg-surface focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all duration-200"
      />
      <motion.label
        className="absolute left-4 text-muted-foreground pointer-events-none transition-colors duration-200"
        animate={{
          top: focused || hasValue ? 8 : 20,
          fontSize: focused || hasValue ? 12 : 16,
          color: focused ? 'hsl(var(--primary))' : 'hsl(var(--muted-foreground))'
        }}
        transition={{ duration: 0.2 }}
      >
        {label}
      </motion.label>
    </div>
  );
};

export const HoverCard = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => (
  <motion.div
    className={`cursor-pointer ${className}`}
    whileHover={{ 
      y: -4,
      boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
    }}
    transition={{ duration: 0.2 }}
  >
    {children}
  </motion.div>
);

export const CountUp = ({ end, duration = 2 }: { end: number; duration?: number }) => {
  const controls = useAnimation();
  const [count, setCount] = useState(0);

  useEffect(() => {
    const startCount = 0;
    const increment = end / (duration * 60);
    
    const timer = setInterval(() => {
      setCount(prev => {
        const next = prev + increment;
        if (next >= end) {
          clearInterval(timer);
          return end;
        }
        return next;
      });
    }, 1000 / 60);

    return () => clearInterval(timer);
  }, [end, duration]);

  return <span>{Math.floor(count)}</span>;
};

interface ProgressiveImageProps {
  src: string;
  alt: string;
  className?: string;
  placeholder?: string;
}

export const ProgressiveImage = ({ src, alt, className = '', placeholder }: ProgressiveImageProps) => {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {!loaded && !error && (
        <div className="absolute inset-0 bg-muted animate-pulse flex items-center justify-center">
          <div className="w-8 h-8 border-2 border-muted-foreground border-t-transparent rounded-full animate-spin" />
        </div>
      )}
      <motion.img
        src={src}
        alt={alt}
        onLoad={() => setLoaded(true)}
        onError={() => setError(true)}
        initial={{ opacity: 0, scale: 1.1 }}
        animate={{ 
          opacity: loaded ? 1 : 0,
          scale: loaded ? 1 : 1.1
        }}
        transition={{ duration: 0.6 }}
        className="w-full h-full object-cover"
      />
    </div>
  );
};

export const GlowButton = ({ children, className = '', onClick }: { 
  children: React.ReactNode; 
  className?: string; 
  onClick?: () => void; 
}) => (
  <motion.button
    className={`relative overflow-hidden ${className}`}
    whileHover="hover"
    whileTap="tap"
    onClick={onClick}
  >
    <motion.div
      className="absolute inset-0 bg-gradient-to-r from-primary/0 via-primary/20 to-primary/0"
      variants={{
        hover: { 
          x: ['-100%', '100%'],
          transition: { duration: 0.6, ease: 'easeInOut' }
        }
      }}
    />
    {children}
  </motion.button>
);