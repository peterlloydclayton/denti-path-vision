import { motion } from 'framer-motion';
import { AnimatedCounter } from './AnimatedCounter';
import { StaggerContainer, StaggerItem } from '@/components/ui/enhanced-animations';

export const StatsSection = () => {
  const stats = [
    { value: 94, suffix: '%', label: 'Approval Accuracy' },
    { value: 40, suffix: '%', label: 'Higher Acceptance' },
    { value: 30, prefix: '<', suffix: 's', label: 'Decision Speed' },
    { value: 1200, suffix: '+', label: 'Active Providers' }
  ];

  return (
    <section className="py-24 bg-background border-b border-dental-blue/20">
      <div className="container mx-auto px-6">
        <StaggerContainer>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {stats.map((stat, index) => (
              <StaggerItem key={index}>
                <motion.div
                  className="group"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="text-4xl md:text-5xl font-bold text-dental-blue-dark mb-2 group-hover:text-intelligence transition-colors duration-300">
                    <AnimatedCounter 
                      value={stat.value} 
                      suffix={stat.suffix}
                      prefix={stat.prefix}
                    />
                  </div>
                  <div className="text-muted-foreground group-hover:text-foreground transition-colors duration-300 font-medium">
                    {stat.label}
                  </div>
                </motion.div>
              </StaggerItem>
            ))}
          </div>
        </StaggerContainer>
      </div>
    </section>
  );
};