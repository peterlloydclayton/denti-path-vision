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
    <section className="py-32 bg-white border-b border-dental-blue/20">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Proven Results Across Our Network
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Data-driven outcomes that transform dental practices and patient experiences
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white border border-gray-200 rounded-lg p-8 text-center hover:shadow-lg transition-all duration-300">
              {/* Number */}
              <div className="text-5xl md:text-6xl font-bold text-blue-600 mb-4">
                <AnimatedCounter 
                  value={stat.value} 
                  suffix={stat.suffix}
                  prefix={stat.prefix}
                />
              </div>
              
              {/* Label */}
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {stat.label}
              </h3>
              
              {/* Description */}
              <p className="text-sm text-gray-600 leading-relaxed">
                {stat.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};