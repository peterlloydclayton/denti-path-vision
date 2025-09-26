import { motion } from 'framer-motion';
import { AnimatedText } from '@/components/ui/animated-text';
import { ScrollReveal, StaggerContainer, StaggerItem } from '@/components/ui/enhanced-animations';
import { HoverCard, CountUp } from '@/components/ui/micro-interactions';
import { ParallaxSection } from '@/components/ui/parallax-section';

export const HomeStatsSection = () => {
  const stats = [
    { value: '95%', label: 'Approval Rate' },
    { value: '30', label: 'Seconds Average Decision' },
    { value: '300%', label: 'Revenue Increase' },
    { value: '10,000+', label: 'Happy Practices' },
    { value: '99.9%', label: 'Uptime Reliability' },
    { value: '4.9/5', label: 'Provider Satisfaction' }
  ];

  return (
    <ParallaxSection className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal className="text-center mb-12">
          <AnimatedText>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Results That Speak for Themselves
            </h2>
          </AnimatedText>
        </ScrollReveal>
        
        <StaggerContainer className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8" staggerDelay={0.1}>
          {stats.map((stat, index) => (
            <StaggerItem key={index}>
              <motion.div
                className="text-center"
                whileHover={{ y: -5 }}
                transition={{ duration: 0.3 }}
              >
                <HoverCard className="text-center p-6 rounded-lg bg-background/50 backdrop-blur-sm border border-border/50">
                  <motion.div 
                    className="text-3xl md:text-4xl font-bold text-primary mb-2"
                    initial={{ scale: 0.5, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1, duration: 0.6 }}
                  >
                    {stat.value.includes('%') || stat.value.includes('/') ? 
                      stat.value : 
                      <><CountUp end={parseInt(stat.value.replace(/[^\d]/g, ''))} duration={2} />{stat.value.replace(/[0-9]/g, '')}</>
                    }
                  </motion.div>
                  <div className="text-muted-foreground text-sm">{stat.label}</div>
                </HoverCard>
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </ParallaxSection>
  );
};