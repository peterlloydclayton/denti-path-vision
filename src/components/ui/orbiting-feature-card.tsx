import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle } from 'lucide-react';

interface OrbitingFeatureCardProps {
  feature: string;
  index: number;
  position: { x: number; y: number };
}

export const OrbitingFeatureCard = ({ feature, index, position }: OrbitingFeatureCardProps) => {
  return (
    <motion.div
      className="absolute"
      style={{
        left: `${position.x}%`,
        top: `${position.y}%`,
        transform: 'translate(-50%, -50%)'
      }}
      initial={{ 
        opacity: 0, 
        scale: 0.8,
        x: 0,
        y: 0
      }}
      whileInView={{ 
        opacity: 1, 
        scale: 1,
        x: 0,
        y: 0
      }}
      viewport={{ once: true }}
      transition={{ 
        duration: 0.6, 
        delay: index * 0.15,
        ease: "easeOut"
      }}
      whileHover={{ 
        scale: 1.05,
        y: -8
      }}
    >
      <motion.div
        animate={{
          y: [0, -8, 0]
        }}
        transition={{
          duration: 4 + index * 0.5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: index * 0.8
        }}
      >
        <Card className="w-64 text-center hover:shadow-elegant transition-all duration-300 bg-card border-border hover:border-dental-blue/30">
          <CardContent className="p-6">
            <motion.div
              className="w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4"
              style={{
                background: index % 2 === 0 
                  ? 'hsl(var(--dental-blue) / 0.1)' 
                  : 'hsl(var(--dental-lavender) / 0.1)'
              }}
              whileHover={{
                scale: 1.1,
                backgroundColor: index % 2 === 0 
                  ? 'hsl(var(--dental-blue) / 0.2)' 
                  : 'hsl(var(--dental-lavender) / 0.2)'
              }}
            >
              <CheckCircle 
                size={24} 
                className={index % 2 === 0 ? "text-dental-blue" : "text-dental-lavender"} 
              />
            </motion.div>
            <p className="text-foreground/80 font-medium leading-relaxed">{feature}</p>
          </CardContent>
        </Card>
      </motion.div>

      {/* Connection indicator */}
      <motion.div
        className="absolute -bottom-2 left-1/2 w-2 h-2 rounded-full transform -translate-x-1/2"
        style={{
          background: index % 2 === 0 
            ? 'hsl(var(--dental-blue))' 
            : 'hsl(var(--dental-lavender))'
        }}
        animate={{
          scale: [1, 1.5, 1],
          opacity: [0.6, 1, 0.6]
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
          delay: index * 0.3
        }}
      />
    </motion.div>
  );
};