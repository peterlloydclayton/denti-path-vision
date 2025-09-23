import { motion } from 'framer-motion';
import { AnimatedCounter } from './AnimatedCounter';
import { StaggerContainer, StaggerItem } from '@/components/ui/enhanced-animations';
import { Card } from '@/components/ui/card';

export const StatsSection = () => {
  const stats = [
    { value: 94, suffix: '%', label: 'Approval Accuracy', description: 'Precision in approval decisions' },
    { value: 40, suffix: '%', label: 'Higher Acceptance', description: 'Increase in patient acceptance' },
    { value: 30, prefix: '<', suffix: 's', label: 'Decision Speed', description: 'Average processing time' },
    { value: 1200, suffix: '+', label: 'Active Providers', description: 'Growing network nationwide' }
  ];

  return (
    <section className="py-32 bg-gradient-to-b from-background to-muted/30 border-b border-dental-blue/10">
      <div className="container mx-auto px-6">
        <StaggerContainer>
          {/* Section Header */}
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Proven Results Across Our Network
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Data-driven outcomes that transform dental practices and patient experiences
            </p>
          </motion.div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {stats.map((stat, index) => (
              <StaggerItem key={index}>
                <Card className="group relative overflow-hidden border-0 bg-card/50 backdrop-blur-sm hover:bg-card/80 transition-all duration-500 hover:shadow-xl hover:shadow-dental-blue/5">
                  <motion.div
                    className="p-8 text-center relative z-10"
                    whileHover={{ y: -2 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                  >
                    {/* Animated Background Gradient */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-br from-dental-blue/5 via-transparent to-intelligence/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                      initial={false}
                    />
                    
                    {/* Number */}
                    <div className="relative mb-4">
                      <motion.div 
                        className="text-5xl md:text-6xl font-bold bg-gradient-to-br from-dental-blue-dark to-intelligence bg-clip-text text-transparent group-hover:from-intelligence group-hover:to-dental-blue-dark transition-all duration-500"
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.2 }}
                      >
                        <AnimatedCounter 
                          value={stat.value} 
                          suffix={stat.suffix}
                          prefix={stat.prefix}
                        />
                      </motion.div>
                      
                      {/* Subtle glow effect */}
                      <motion.div
                        className="absolute inset-0 blur-xl opacity-0 group-hover:opacity-20 transition-opacity duration-500"
                        style={{
                          background: 'radial-gradient(circle, hsl(var(--dental-blue)) 0%, transparent 70%)'
                        }}
                      />
                    </div>
                    
                    {/* Label */}
                    <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-dental-blue-dark transition-colors duration-300">
                      {stat.label}
                    </h3>
                    
                    {/* Description */}
                    <p className="text-sm text-muted-foreground group-hover:text-foreground/80 transition-colors duration-300 leading-relaxed">
                      {stat.description}
                    </p>
                  </motion.div>
                  
                  {/* Subtle border animation */}
                  <motion.div
                    className="absolute inset-0 rounded-lg border border-dental-blue/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    initial={false}
                  />
                </Card>
              </StaggerItem>
            ))}
          </div>
        </StaggerContainer>
      </div>
    </section>
  );
};