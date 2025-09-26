import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { AnimatedText } from '@/components/ui/animated-text';
import { StaggerContainer, StaggerItem } from '@/components/ui/enhanced-animations';
import { AlertTriangle, TrendingUp, Clock } from 'lucide-react';

export const HomeProblemSection = () => {
  const challenges = [
    {
      icon: AlertTriangle,
      stat: '<50%',
      description: 'of Americans can afford a $1,000 dental emergency',
      benefit: 'Instant approval available 24/7',
      benefitDescription: 'Get approved within minutes, even during dental emergencies with AI-powered decisions'
    },
    {
      icon: TrendingUp,
      stat: '30-45%',
      description: 'higher approval rates with our AI vs traditional banks',
      benefit: '94% approval rate',
      benefitDescription: 'Dental-specialized AI understands treatment value and patient circumstances'
    },
    {
      icon: Clock,
      stat: 'Weeks vs Same-Day',
      description: 'Traditional financing payment time vs DentiPay instant payments',
      benefit: 'Real-time treatment approval',
      benefitDescription: 'Synchronize financing with treatment schedules for seamless care'
    }
  ];

  return (
    <section className="py-24 bg-gray-800 text-white relative overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        <AnimatedText className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Traditional Financing Wasn't Built for Dental Care
          </h2>
          <p className="text-xl text-gray-300 max-w-4xl mx-auto">
            Traditional lenders don't understand dental procedures, patient needs, or practice workflows. 
            This creates barriers that hurt both providers and patients.
          </p>
        </AnimatedText>

        <StaggerContainer>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {challenges.map((challenge, index) => (
              <StaggerItem key={index}>
                <motion.div
                  className="relative group"
                  whileHover={{ x: 8, scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                >
                   {/* Problem Card */}
                   <Card className="bg-card/10 border-card/20 text-white hover:bg-card/15 transition-all duration-300 hover:shadow-elegant group-hover:opacity-0">
                     <CardContent className="p-8 text-center">
                       <div className="flex flex-col items-center">
                         <motion.div 
                           className="p-3 bg-destructive/10 rounded-lg mb-4 w-fit"
                           whileHover={{ rotate: 360 }}
                           transition={{ duration: 0.3 }}
                         >
                           <challenge.icon className="h-8 w-8 text-destructive" />
                         </motion.div>
                         <div className="text-2xl font-bold text-white mb-2">
                           {challenge.stat}
                         </div>
                         <p className="text-gray-300 leading-relaxed text-sm">
                           {challenge.description}
                         </p>
                       </div>
                     </CardContent>
                   </Card>

                   {/* DentiPay Benefit Card - Hidden until hover */}
                   <Card className="absolute inset-0 bg-primary border-primary text-navy opacity-0 group-hover:opacity-100 transition-all duration-300 shadow-green">
                     <CardContent className="p-8 text-center">
                       <div className="flex flex-col items-center justify-center h-full">
                         <div className="text-xs font-medium text-navy/70 mb-2">DENTIPAY BENEFIT</div>
                         <h3 className="text-xl font-semibold mb-3">{challenge.benefit}</h3>
                         <p className="text-sm opacity-90">{challenge.benefitDescription}</p>
                       </div>
                     </CardContent>
                   </Card>
                </motion.div>
              </StaggerItem>
            ))}
          </div>
        </StaggerContainer>
      </div>
    </section>
  );
};