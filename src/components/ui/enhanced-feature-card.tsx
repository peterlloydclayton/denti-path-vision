import { motion } from 'framer-motion';
import { CheckCircle } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { useState } from 'react';

interface EnhancedFeatureCardProps {
  feature: string;
  index: number;
}

export const EnhancedFeatureCard = ({ feature, index }: EnhancedFeatureCardProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Card className="relative overflow-hidden bg-background/80 backdrop-blur-sm border-intelligence/20 hover:border-intelligence/40 transition-all duration-300">
        {/* Animated border glow */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-intelligence/20 via-primary/20 to-intelligence/20 opacity-0"
          animate={{
            opacity: isHovered ? 0.3 : 0,
          }}
          transition={{ duration: 0.3 }}
        />
        
        {/* Connection lines to center */}
        <motion.div
          className="absolute top-1/2 left-0 w-8 h-0.5 bg-gradient-to-r from-intelligence/40 to-transparent -translate-y-1/2 -translate-x-8"
          animate={{
            scaleX: isHovered ? 1 : 0,
            opacity: isHovered ? 1 : 0,
          }}
          transition={{ duration: 0.3, delay: 0.1 }}
        />
        
        <CardContent className="p-6 relative z-10">
          <motion.div
            className="w-12 h-12 rounded-xl bg-gradient-to-br from-intelligence/20 to-primary/20 flex items-center justify-center mx-auto mb-4 border border-intelligence/30"
            whileHover={{
              scale: 1.1,
              rotateY: 10,
              boxShadow: "0 10px 30px -10px hsl(var(--intelligence) / 0.4)"
            }}
            transition={{ duration: 0.2 }}
          >
            <motion.div
              animate={{
                rotate: isHovered ? 360 : 0,
              }}
              transition={{ duration: 0.5 }}
            >
              <CheckCircle size={24} className="text-intelligence" />
            </motion.div>
          </motion.div>
          
          <motion.div
            className="overflow-hidden"
            initial={{ height: 'auto' }}
          >
            <motion.p 
              className="text-muted-foreground text-center"
              animate={{
                y: isHovered ? -5 : 0,
                scale: isHovered ? 1.02 : 1,
              }}
              transition={{ duration: 0.2 }}
            >
              {feature.split('').map((char, i) => (
                <motion.span
                  key={i}
                  className="inline-block"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: index * 0.1 + i * 0.02 }}
                >
                  {char}
                </motion.span>
              ))}
            </motion.p>
          </motion.div>
        </CardContent>
        
        {/* Ripple effect */}
        <motion.div
          className="absolute inset-0 bg-intelligence/10 rounded-lg scale-0 opacity-0"
          animate={{
            scale: isHovered ? 1 : 0,
            opacity: isHovered ? 0.1 : 0,
          }}
          transition={{ duration: 0.3 }}
        />
      </Card>
    </motion.div>
  );
};