import { AnimatedText } from '@/components/ui/animated-text';
import { StaggerContainer, StaggerItem } from '@/components/ui/enhanced-animations';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

export const JourneySection = () => {
  const navigate = useNavigate();
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start center", "end center"]
  });

  const progressWidth = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  const journeySteps = [
    { 
      step: '1', 
      title: 'Find Your Provider', 
      desc: 'Search for dental providers near you who accept DentiPay',
      benefit: 'Know financing is available before you visit'
    },
    { 
      step: '2', 
      title: 'Instant Pre-Qualification', 
      desc: 'Complete our simple application and get approved in seconds',
      benefit: 'Clear payment options. No credit score impact'
    },
    { 
      step: '3', 
      title: 'Treatment Planning', 
      desc: 'Work with your provider to create a treatment plan',
      benefit: 'Flexible payment plans that match your budget and timeline'
    },
    { 
      step: '4', 
      title: 'Treatment & Payment', 
      desc: 'Begin your dental care with confidence',
      benefit: 'Focus on your health, not financial stress'
    }
  ];

  return (
    <section ref={sectionRef} className="py-24 bg-background relative overflow-hidden">
      <div className="container mx-auto px-6 relative">
        <AnimatedText className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
            Your Journey to Confident Dental Care
          </h2>
          <p className="text-xl text-foreground/80 max-w-2xl mx-auto">
            Getting Started is Simple
          </p>
        </AnimatedText>

        {/* Desktop Timeline */}
        <div className="hidden lg:block max-w-7xl mx-auto">
          <StaggerContainer className="relative">
            {/* Progress Line Background */}
            <div className="absolute top-20 left-0 right-0 h-1 bg-border rounded-full"></div>
            
            {/* Animated Progress Line */}
            <motion.div 
              className="absolute top-20 left-0 h-1 bg-dental-blue rounded-full"
              style={{ width: progressWidth }}
            ></motion.div>

            <div className="grid grid-cols-4 gap-8">
              {journeySteps.map((item, index) => (
                <StaggerItem key={index}>
                  <motion.div 
                    className="group relative"
                    whileHover={{ y: -8 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                  >
                    {/* Step Circle */}
                    <div className="relative z-10 mb-8">
                      <motion.div 
                        className="w-20 h-20 rounded-full bg-dental-blue text-white flex items-center justify-center text-2xl font-bold mx-auto shadow-elegant"
                        whileHover={{ scale: 1.1, backgroundColor: "hsl(var(--dental-lavender))" }}
                        transition={{ duration: 0.2 }}
                      >
                        {item.step}
                      </motion.div>
                    </div>

                    {/* Step Card */}
                    <motion.div 
                      className="bg-card rounded-2xl p-6 shadow-lg border border-border group-hover:shadow-elegant group-hover:border-dental-blue transition-all duration-300 h-[280px] flex flex-col justify-between"
                      whileHover={{ scale: 1.02 }}
                    >
                      <div className="h-[80px] flex items-start">
                        <h3 className="text-xl font-bold text-foreground group-hover:text-dental-blue transition-colors leading-tight">
                          {item.title}
                        </h3>
                      </div>
                      
                      <div className="h-[65px]">
                        <p className="text-foreground/70 text-sm leading-relaxed">
                          {item.desc}
                        </p>
                      </div>
                      
                      {/* Benefit Badge */}
                      <motion.div 
                        className="bg-dental-lavender/20 border border-dental-lavender/30 rounded-lg p-3 group-hover:bg-dental-lavender/30 transition-colors"
                        initial={{ opacity: 0.8 }}
                        whileHover={{ opacity: 1 }}
                      >
                        <div className="flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-dental-blue mt-0.5 flex-shrink-0" />
                          <p className="text-xs text-foreground/80 font-medium leading-relaxed">
                            {item.benefit}
                          </p>
                        </div>
                      </motion.div>
                    </motion.div>
                  </motion.div>
                </StaggerItem>
              ))}
            </div>
          </StaggerContainer>
          
          {/* Get Financing Button - Desktop (50% larger) */}
          <motion.div 
            className="text-center mt-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
          >
            <Button 
              className="h-14 text-lg bg-black text-white hover:bg-black/80 shadow-elegant px-10 font-semibold"
              onClick={() => navigate('/patient-financing-application')}
            >
              Get Financing
            </Button>
          </motion.div>
        </div>

        {/* Mobile/Tablet Vertical Timeline */}
        <div className="lg:hidden max-w-2xl mx-auto">
          <StaggerContainer>
            <div className="relative">
              {/* Vertical Progress Line - ends at final circle */}
              <div className="absolute left-6 top-0 h-[calc(100%-3rem)] w-0.5 bg-border"></div>
              <motion.div 
                className="absolute left-6 top-0 w-0.5 bg-dental-blue"
                style={{ height: useTransform(scrollYProgress, [0, 1], ["0%", "calc(100% - 3rem)"]) }}
              ></motion.div>

                <div className="space-y-12">
                  {journeySteps.map((item, index) => (
                    <StaggerItem key={index}>
                      <div className="flex items-start gap-6">
                        {/* Step Circle */}
                        <motion.div 
                          className="w-16 h-16 rounded-full bg-dental-blue text-white flex items-center justify-center text-xl font-bold flex-shrink-0 shadow-elegant relative z-10"
                          whileHover={{ scale: 1.05, backgroundColor: "hsl(var(--dental-lavender))" }}
                        >
                          {item.step}
                        </motion.div>

                        {/* Step Content */}
                        <motion.div 
                          className="flex-1 bg-card rounded-xl p-6 shadow-lg border border-border"
                          whileHover={{ scale: 1.01, x: 4 }}
                          transition={{ duration: 0.2 }}
                        >
                          <h3 className="text-lg font-bold mb-2">{item.title}</h3>
                          <p className="text-foreground/70 mb-3 text-sm">{item.desc}</p>
                          
                          <div className="bg-dental-lavender/20 border border-dental-lavender/30 rounded-lg p-3">
                             <div className="flex items-start gap-2">
                               <CheckCircle className="w-4 h-4 text-dental-blue mt-0.5 flex-shrink-0" />
                               <p className="text-xs text-foreground/80 font-medium">{item.benefit}</p>
                             </div>
                          </div>
                        </motion.div>
                      </div>
                    </StaggerItem>
                  ))}
                  
                   {/* Final Completion Circle with Button - Mobile */}
                   <StaggerItem>
                     <div className="flex items-start gap-6">
                       <motion.div 
                         className="w-16 h-16 rounded-full bg-emerald-300 text-white flex items-center justify-center shadow-elegant relative z-10 flex-shrink-0"
                         whileHover={{ scale: 1.05 }}
                         transition={{ duration: 0.2 }}
                         initial={{ opacity: 0, scale: 0.8 }}
                         whileInView={{ opacity: 1, scale: 1 }}
                         viewport={{ once: true }}
                       >
                         <CheckCircle className="w-6 h-6" />
                       </motion.div>
                       
                       {/* Get Financing Button - Mobile (next to green circle) */}
                       <motion.div 
                         className="flex items-center"
                         initial={{ opacity: 0, x: 20 }}
                         whileInView={{ opacity: 1, x: 0 }}
                         viewport={{ once: true }}
                         transition={{ delay: 0.5 }}
                       >
                            <Button 
                              className="h-14 text-lg bg-black text-white hover:bg-black/80 shadow-elegant px-10 font-semibold"
                              onClick={() => navigate('/patient-financing-application')}
                            >
                              Get Financing
                            </Button>
                       </motion.div>
                     </div>
                   </StaggerItem>
                </div>
            </div>
          </StaggerContainer>
        </div>
      </div>
    </section>
  );
};