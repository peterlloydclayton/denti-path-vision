import { motion } from 'framer-motion';
import { AnimatedCounter } from './AnimatedCounter';
import { StaggerContainer, StaggerItem } from '@/components/ui/enhanced-animations';
import { Card } from '@/components/ui/card';

export const StatsSection = () => {
  console.log('StatsSection rendering');
  
  const stats = [
    { value: 94, suffix: '%', label: 'Approval Accuracy', description: 'Precision in approval decisions' },
    { value: 40, suffix: '%', label: 'Higher Acceptance', description: 'Increase in patient acceptance' },
    { value: 30, prefix: '<', suffix: 's', label: 'Decision Speed', description: 'Average processing time' },
    { value: 1200, suffix: '+', label: 'Active Providers', description: 'Growing network nationwide' }
  ];

  return (
    <section className="py-32 bg-dental-blue border-b border-dental-blue-dark/20">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Proven Results Across Our Network
          </h2>
          <p className="text-dental-blue-light text-lg max-w-2xl mx-auto">
            Data-driven outcomes that transform dental practices and patient experiences
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div 
              key={index} 
              className="group relative bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-8 text-center hover:bg-white/20 hover:border-white/40 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-dental-blue-dark/20"
            >
              {/* Animated background glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-intelligence/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              {/* Number with enhanced styling */}
              <div className="relative mb-6">
                <div className="text-6xl md:text-7xl font-black text-white mb-2 drop-shadow-lg group-hover:text-dental-blue-light transition-colors duration-300">
                  <AnimatedCounter 
                    value={stat.value} 
                    suffix={stat.suffix}
                    prefix={stat.prefix}
                  />
                </div>
                
                {/* Glowing underline */}
                <div className="w-16 h-1 bg-gradient-to-r from-intelligence to-dental-blue-light mx-auto rounded-full opacity-60 group-hover:opacity-100 group-hover:w-24 transition-all duration-500" />
              </div>
              
              {/* Label with enhanced typography */}
              <h3 className="text-xl font-bold text-white mb-3 group-hover:text-dental-blue-light transition-colors duration-300">
                {stat.label}
              </h3>
              
              {/* Description */}
              <p className="text-dental-blue-light/80 text-sm leading-relaxed group-hover:text-white/90 transition-colors duration-300">
                {stat.description}
              </p>
              
              {/* Decorative corner elements */}
              <div className="absolute top-4 right-4 w-3 h-3 border-t-2 border-r-2 border-white/30 group-hover:border-intelligence transition-colors duration-300" />
              <div className="absolute bottom-4 left-4 w-3 h-3 border-b-2 border-l-2 border-white/30 group-hover:border-intelligence transition-colors duration-300" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};