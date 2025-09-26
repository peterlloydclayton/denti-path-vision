import { motion } from 'framer-motion';
import { 
  Heart, 
  Shield, 
  Sparkles, 
  Users, 
  Brain, 
  Zap, 
  Target, 
  CreditCard,
  Activity,
  Star,
  CheckCircle,
  TrendingUp
} from 'lucide-react';
import { useMemo } from 'react';

interface FloatingIcon {
  id: number;
  Icon: React.ComponentType<any>;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
}

export const FloatingIcons = () => {
  const icons = [
    Heart, Shield, Sparkles, Users, Brain, Zap, 
    Target, CreditCard, Activity, Star, CheckCircle, TrendingUp
  ];

  const floatingIcons = useMemo(() => {
    return Array.from({ length: 15 }, (_, i) => ({
      id: i,
      Icon: icons[i % icons.length],
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 20 + 16, // 16-36px
      duration: Math.random() * 20 + 10, // 10-30s
      delay: Math.random() * 5, // 0-5s delay
    }));
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-10">
      {floatingIcons.map((item) => (
        <motion.div
          key={item.id}
          className="absolute text-white/30"
          style={{
            left: `${item.x}%`,
            top: `${item.y}%`,
          }}
          animate={{
            x: [0, Math.random() * 100 - 50, 0],
            y: [0, Math.random() * 100 - 50, 0],
            rotate: [0, 360],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: item.duration,
            repeat: Infinity,
            ease: "easeInOut",
            delay: item.delay,
          }}
        >
          <item.Icon size={item.size} />
        </motion.div>
      ))}
    </div>
  );
};