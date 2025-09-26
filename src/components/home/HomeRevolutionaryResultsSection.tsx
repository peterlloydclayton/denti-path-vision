import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { TrendingUp, Clock, Users, DollarSign, Target, Zap, Award, Building2, ArrowUp, Sparkles } from 'lucide-react';
import { ScrollReveal, StaggerContainer, StaggerItem } from '@/components/ui/enhanced-animations';
import approvalMobileImage from '@/assets/approval-mobile-hand-jane-smith.png';
interface AnimatedCounterProps {
  value: number;
  suffix?: string;
  prefix?: string;
  decimals?: number;
}
const AnimatedCounter = ({
  value,
  suffix = '',
  prefix = '',
  decimals = 0
}: AnimatedCounterProps) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        const increment = value / 60;
        let current = 0;
        const timer = setInterval(() => {
          current += increment;
          if (current >= value) {
            setCount(value);
            clearInterval(timer);
          } else {
            setCount(current);
          }
        }, 30);
        observer.disconnect();
      }
    }, {
      threshold: 0.1
    });
    if (ref.current) {
      observer.observe(ref.current);
    }
    return () => observer.disconnect();
  }, [value]);
  const formatNumber = (num: number) => {
    if (decimals > 0) {
      return num.toFixed(decimals);
    }
    return Math.floor(num).toLocaleString();
  };
  return <span ref={ref} className="font-bold">
      {prefix}{formatNumber(count)}{suffix}
    </span>;
};
export const HomeRevolutionaryResultsSection = () => {
  const revolutionaryStats: any[] = [];
  const beforeAfterComparisons = [{
    metric: 'Approval Rate',
    before: {
      value: '20-40%',
      label: 'Traditional Banking'
    },
    after: {
      value: '95%',
      label: 'DentiPay AI'
    }
  }, {
    metric: 'Decision Time',
    before: {
      value: '2-4 Weeks',
      label: 'Manual Process'
    },
    after: {
      value: '30 Seconds',
      label: 'Pre-Cognitive AI'
    }
  }, {
    metric: 'Data Points',
    before: {
      value: '3-5',
      label: 'Basic Credit Check'
    },
    after: {
      value: '50+',
      label: 'Comprehensive Analysis'
    }
  }];
  return <section className="py-24 bg-gradient-to-b from-surface to-background relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-full opacity-5">
          <div className="grid grid-cols-8 gap-4 h-full">
            {Array.from({
            length: 64
          }).map((_, i) => <motion.div key={i} className="bg-primary rounded-full" animate={{
            scale: [0.5, 1, 0.5],
            opacity: [0.3, 0.8, 0.3]
          }} transition={{
            duration: 3 + i % 3,
            repeat: Infinity,
            delay: i * 0.1,
            ease: "easeInOut"
          }} />)}
          </div>
        </div>
      </div>

      {/* Image and Text Container - Above Cards - Full Width Layout */}
      <div className="flex flex-col lg:flex-row items-center lg:items-start mb-16">
        {/* Image Container - Full Width to Left Edge */}
        <div className="w-full lg:w-2/5 lg:pl-0 order-2 lg:order-1">
          <img 
            src={approvalMobileImage} 
            alt="Mobile approval interface"
            className="max-w-md w-full h-auto lg:ml-0"
          />
        </div>
        
        {/* Text Container - Properly Constrained */}
        <div className="w-full lg:w-3/5 max-w-7xl lg:px-4 lg:pr-8 order-1 lg:order-2">
          <div className="text-center lg:text-right px-4 sm:px-6 lg:px-0">
            <h2 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
              Results That 
              <span className="text-foreground block">
                Redefine Possible
              </span>
            </h2>
            
            <p className="text-xl text-muted-foreground mb-8">
              These aren't just improvements—they're revolutionary leaps that transform 
              entire industries. See how DentiPay's pre-cognitive intelligence completely transforms traditional financing metrics across every dimension.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">

        {/* Revolutionary Stats Grid */}
        <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-3 gap-8" staggerDelay={0.1}>
          {revolutionaryStats.map((stat, index) => <StaggerItem key={index}>
              <motion.div className="group relative" whileHover={{
            y: -8
          }} transition={{
            duration: 0.3,
            type: "spring",
            stiffness: 200
          }}>
                <Card className={`border-${stat.color}/30 bg-gradient-to-br from-${stat.color}/5 to-${stat.color}/10 hover:shadow-2xl hover:shadow-${stat.color}/20 transition-all duration-500 h-full`}>
                  <CardContent className="p-8 text-center h-full flex flex-col">
                    {/* Icon with Pulse Effect */}
                    <motion.div className={`p-4 bg-${stat.color}/20 rounded-2xl mx-auto mb-6 w-fit relative overflow-hidden`} whileHover={{
                  scale: 1.1
                }} transition={{
                  duration: 0.3
                }}>
                      <motion.div className="absolute inset-0 bg-white/20 rounded-2xl" animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0, 0.3, 0]
                  }} transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }} />
                      <stat.icon className={`w-8 h-8 text-${stat.color} relative z-10`} />
                    </motion.div>
                    
                    {/* Animated Counter */}
                    <div className={`text-4xl md:text-5xl font-bold text-${stat.color} mb-2 group-hover:scale-110 transition-transform duration-300`}>
                      <AnimatedCounter value={stat.value} prefix={stat.prefix} suffix={stat.suffix} decimals={stat.decimals} />
                    </div>
                    
                    {/* Label */}
                    <h3 className="text-xl font-bold text-foreground mb-2">
                      {stat.label}
                    </h3>
                    
                    {/* Comparison */}
                    <p className={`text-sm text-${stat.color} font-medium mb-4`}>
                      {stat.comparison}
                    </p>
                    
                    {/* Description */}
                    <p className="text-sm text-muted-foreground leading-relaxed flex-grow">
                      {stat.description}
                    </p>
                    
                    {/* Improvement Badge */}
                    <motion.div className={`mt-4 inline-flex items-center gap-1 px-3 py-1 rounded-full bg-${stat.color}/10 border border-${stat.color}/20`} whileHover={{
                  scale: 1.05
                }}>
                      <ArrowUp className={`w-3 h-3 text-${stat.color}`} />
                      <span className={`text-xs font-bold text-${stat.color}`}>
                        {stat.improvement}
                      </span>
                    </motion.div>
                  </CardContent>
                </Card>
              </motion.div>
            </StaggerItem>)}
        </StaggerContainer>

        {/* Split-Screen Transformation Widget */}
        <ScrollReveal>

          <div className="space-y-8">
            {beforeAfterComparisons.map((comparison, index) => (
              <StaggerItem key={index}>
                <motion.div 
                  className="relative overflow-hidden rounded-2xl border border-border bg-background shadow-lg"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  {/* Metric Title */}
                  <div className="text-center py-6 bg-gradient-to-r from-muted/30 to-primary/10 border-b border-border">
                    <h4 className="text-2xl font-bold text-foreground">
                      {comparison.metric}
                    </h4>
                  </div>

                  <div className="grid md:grid-cols-2 min-h-[200px]">
                    {/* Left Side - Old Way (Negative) */}
                    <div className="relative p-8 bg-gradient-to-br from-muted/20 to-muted/40 flex flex-col justify-center">
                      {/* Subtle negative pattern overlay */}
                      <div className="absolute inset-0 opacity-5">
                        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_30%_20%,hsl(var(--destructive))_0%,transparent_50%)]"></div>
                      </div>
                      
                      <div className="relative z-10 text-center">
                        <div className="text-4xl md:text-5xl font-bold text-muted-foreground mb-3">
                          {comparison.before.value}
                        </div>
                        <div className="text-lg text-muted-foreground mb-4">
                          {comparison.before.label}
                        </div>
                        <div className="flex items-center justify-center gap-2 text-muted-foreground">
                          <Clock className="w-5 h-5" />
                          <span className="text-sm font-medium">Legacy System</span>
                        </div>
                      </div>
                    </div>

                    {/* Center Divider with Transformation Arrow */}
                    <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20 hidden md:block">
                      <motion.div 
                        className="bg-primary text-primary-foreground p-4 rounded-full shadow-xl border-4 border-background"
                        animate={{ 
                          scale: [1, 1.1, 1],
                          rotate: [0, 5, -5, 0]
                        }}
                        transition={{ 
                          duration: 2, 
                          repeat: Infinity,
                          ease: "easeInOut"
                        }}
                      >
                        <Zap className="w-6 h-6" />
                      </motion.div>
                    </div>

                    {/* Right Side - New Way (Positive) */}
                    <div className="relative p-8 bg-gradient-to-br from-primary/10 to-primary/20 flex flex-col justify-center border-l border-border md:border-l-2 md:border-l-primary/30">
                      {/* Positive pattern overlay */}
                      <div className="absolute inset-0 opacity-10">
                        <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_70%_80%,hsl(var(--primary))_0%,transparent_50%)]"></div>
                      </div>
                      
                      <div className="relative z-10 text-center">
                        <div className="text-4xl md:text-5xl font-bold text-slate-800 mb-3">
                          {comparison.after.value}
                        </div>
                        <div className="text-lg text-slate-700 mb-4 font-medium">
                          {comparison.after.label}
                        </div>
                        <div className="flex items-center justify-center gap-2 text-slate-700">
                          <Sparkles className="w-5 h-5" />
                          <span className="text-sm font-bold">DentiPay Solution</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </StaggerItem>
            ))}
          </div>
        </ScrollReveal>

        {/* Bottom Impact Statement */}
        <ScrollReveal className="text-center">
          <motion.div className="max-w-4xl mx-auto p-8 rounded-2xl bg-gradient-to-r from-primary/10 via-accent/10 to-success/10 border border-primary/20" whileHover={{
          scale: 1.02
        }} transition={{
          duration: 0.3
        }}>
            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold text-foreground">
                Industry-Defining Impact
              </h3>
            </div>
            <p className="text-lg text-foreground leading-relaxed mb-6">
              These results don't just improve dental financing—they revolutionize it. 
              Every metric represents lives changed, practices transformed, and barriers eliminated.
            </p>
            <div className="flex items-center justify-center gap-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-success" />
                <span>Real Patients</span>
              </div>
              <div className="w-1 h-1 bg-muted-foreground rounded-full"></div>
              <div className="flex items-center gap-2">
                <Building2 className="w-4 h-4 text-primary" />
                <span>Real Practices</span>
              </div>
              <div className="w-1 h-1 bg-muted-foreground rounded-full"></div>
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-accent" />
                <span>Real Revolution</span>
              </div>
            </div>
          </motion.div>
        </ScrollReveal>
      </div>
    </section>;
};