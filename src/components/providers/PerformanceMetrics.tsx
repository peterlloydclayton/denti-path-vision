import { motion } from 'framer-motion';
import { AnimatedCounter } from './AnimatedCounter';
import { AnimatedText } from '@/components/ui/animated-text';
import { StaggerContainer, StaggerItem } from '@/components/ui/enhanced-animations';

export const PerformanceMetrics = () => {
  const networkResults = [
    { value: 95, suffix: "%", label: "Approval Rate" },
    { value: 300, suffix: "%", label: "Revenue Increase" },
    { value: 10000, suffix: "+", label: "Happy Practices" },
    { value: "4.9/5", suffix: "", label: "Provider Rating" }
  ];

  return (
    <section className="py-24 bg-dental-blue">
      <div className="container mx-auto px-6 text-center">
        {/* Aggregate Network Results */}
        <AnimatedText delay={0.3}>
          <h3 className="text-2xl md:text-3xl font-bold mb-8 text-foreground">Aggregate Network Results</h3>
        </AnimatedText>
        
        <StaggerContainer>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {networkResults.map((result, index) => (
              <StaggerItem key={index}>
                <motion.div
                  className="group bg-background/10 backdrop-blur-sm rounded-xl p-6 hover:bg-background/20 transition-all duration-300"
                  whileHover={{ scale: 1.05, y: -2 }}
                  transition={{ duration: 0.2 }}
                >
                  <motion.div 
                    className="text-2xl md:text-3xl font-bold mb-2 text-intelligence group-hover:text-dental-blue-dark transition-colors duration-300"
                    whileHover={{ scale: 1.1 }}
                  >
                    {typeof result.value === 'number' ? (
                      <AnimatedCounter 
                        value={result.value} 
                        suffix={result.suffix}
                      />
                    ) : (
                      result.value
                    )}
                  </motion.div>
                  <div className="text-sm text-foreground/70 group-hover:text-foreground/90 transition-colors duration-300 font-medium">
                    {result.label}
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