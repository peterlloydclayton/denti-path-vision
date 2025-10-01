import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { AnimatedCounter } from './AnimatedCounter';
import { StaggerContainer, StaggerItem } from '@/components/ui/enhanced-animations';
import { Card } from '@/components/ui/card';

export const StatsSection = () => {
  console.log('StatsSection rendering');
  
  const stats = [
    { value: 100000, prefix: '$', suffix: '', label: 'Maximum Financing', description: 'Flexible financing options' },
    { value: 80, prefix: '', suffix: '%', label: 'Approval Rates', description: 'High approval success rates' },
    { value: 18, prefix: '', suffix: ' months', label: 'Interest Rates', description: '0% up to 18 months' },
    { value: 32, prefix: '', suffix: '%', label: 'Practice Growth', description: '27 - 32% average growth' }
  ];

  return (
    <section className="pt-8 pb-32 bg-white border-b border-dental-blue/20">
      <div className="container mx-auto px-6">
        {/* Image above section */}
        <motion.div 
          className="flex justify-center mb-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <img 
            src="https://res.cloudinary.com/drxvhwze4/image/upload/v1759280638/child-dental-bib_tcauhp.png"
            alt="Child with dental bib"
            className="max-w-md w-full h-auto object-contain"
          />
        </motion.div>

        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            DentiPay Transforming Dental Financing One Patient at a Time
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Data-driven outcomes that transform dental practices and patient experiences
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div 
              key={index} 
              className="group relative bg-gray-50 border border-gray-200 rounded-2xl p-8 text-center hover:bg-white hover:border-dental-blue/30 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-dental-blue/10"
            >
              {/* Animated background glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-dental-blue/5 to-intelligence/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              {/* Number with enhanced styling */}
              <div className="relative mb-6">
                <div className="text-4xl md:text-5xl font-black text-gray-900 mb-2 group-hover:text-dental-blue-dark transition-colors duration-300 whitespace-nowrap">
                  <AnimatedCounter 
                    value={stat.value}
                    prefix={stat.prefix}
                    suffix={stat.suffix}
                  />
                </div>
                
                {/* Glowing underline */}
                <div className="w-16 h-1 bg-gradient-to-r from-dental-blue to-dental-blue-dark mx-auto rounded-full group-hover:w-24 transition-all duration-500" />
              </div>
              
              {/* Label with enhanced typography */}
              <h3 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-dental-blue-dark transition-colors duration-300">
                {stat.label}
              </h3>
              
              {/* Description */}
              <p className="text-gray-600 text-sm leading-relaxed group-hover:text-gray-700 transition-colors duration-300">
                {stat.description}
              </p>
              
              {/* Decorative corner elements */}
              <div className="absolute top-4 right-4 w-3 h-3 border-t-2 border-r-2 border-gray-300 group-hover:border-dental-blue transition-colors duration-300" />
              <div className="absolute bottom-4 left-4 w-3 h-3 border-b-2 border-l-2 border-gray-300 group-hover:border-dental-blue transition-colors duration-300" />
            </div>
          ))}
        </div>
        
        {/* Get Started button at bottom of section */}
        <div className="flex justify-center mt-16">
          <Button className="bg-black text-white hover:bg-black/90 rounded-full px-12 py-4 text-lg font-medium shadow-lg hover:shadow-xl transition-all duration-300">
            Get Started
          </Button>
        </div>
      </div>
    </section>
  );
};