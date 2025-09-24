import { useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { AnimatedCounter } from './AnimatedCounter';
import { TrendingDown, TrendingUp } from 'lucide-react';
import { useRef } from 'react';

export const SlidingDataPanel = () => {
  const [activeView, setActiveView] = useState<'problem' | 'solution'>('problem');
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) {
      const timer = setTimeout(() => {
        setActiveView('solution');
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [isInView]);

  const problemData = [
    { label: "Traditional Banking", rate: 30, color: "text-destructive" },
    { label: "Generic Financing", rate: 52, color: "text-destructive" },
  ];

  const solutionData = [
    { label: "DentiPay Approval Rate", rate: 94, color: "text-success" },
  ];

  return (
    <div ref={ref} className="relative w-full max-w-md mx-auto h-80">
      {/* Problem Panel */}
      <motion.div
        className="absolute inset-0"
        initial={{ x: 0, opacity: 1 }}
        animate={{ 
          x: activeView === 'solution' ? '-100%' : 0,
          opacity: activeView === 'solution' ? 0 : 1
        }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
      >
        <Card className="h-full bg-card/10 border-card/20 backdrop-blur-sm">
          <CardContent className="p-8 h-full flex flex-col justify-center">
            <div className="flex items-center gap-3 mb-6">
              <TrendingDown className="w-6 h-6 text-destructive" />
              <h3 className="text-xl font-bold text-foreground">Financial Care Gap</h3>
            </div>
            
            <div className="space-y-6">
              {problemData.map((item, index) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.2 + 0.3 }}
                  className="flex justify-between items-center py-3 border-b border-card/20"
                >
                  <span className="text-sm text-muted-foreground">{item.label}</span>
                  <div className="flex items-center gap-2">
                    <AnimatedCounter value={item.rate} suffix="%" />
                    <span className="text-xs opacity-60">Approval</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Solution Panel */}
      <motion.div
        className="absolute inset-0"
        initial={{ x: '100%', opacity: 0 }}
        animate={{ 
          x: activeView === 'solution' ? 0 : '100%',
          opacity: activeView === 'solution' ? 1 : 0
        }}
        transition={{ duration: 0.8, ease: "easeInOut", delay: 0.2 }}
      >
        <Card className="h-full bg-gradient-to-br from-primary/20 to-success/20 border-primary/30 backdrop-blur-sm">
          <CardContent className="p-8 h-full flex flex-col justify-center">
            <div className="flex items-center gap-3 mb-6">
              <TrendingUp className="w-6 h-6 text-success" />
              <h3 className="text-xl font-bold text-foreground">DentiPay Solution</h3>
            </div>
            
            <div className="text-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: activeView === 'solution' ? 1 : 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="mb-4"
              >
                <div className="text-4xl font-bold text-success mb-2">
                  <AnimatedCounter value={94} suffix="%" />
                </div>
                <div className="text-sm text-success/80 mb-4">Approval Rate</div>
              </motion.div>
              
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ 
                  opacity: activeView === 'solution' ? 1 : 0,
                  y: activeView === 'solution' ? 0 : 20
                }}
                transition={{ duration: 0.5, delay: 0.7 }}
                className="text-sm text-muted-foreground"
              >
                Specialized dental financing that understands your patients' needs
              </motion.p>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};