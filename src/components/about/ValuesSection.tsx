import { Users, Heart, Target, Lightbulb, Shield, Sparkles } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { AnimatedText } from '@/components/ui/animated-text';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

export const ValuesSection = () => {
  const { t } = useTranslation('marketing');
  const values = [
    {
      icon: Heart,
      title: t('about.values.patientFirst.title'),
      description: t('about.values.patientFirst.description')
    },
    {
      icon: Lightbulb,
      title: t('about.values.innovation.title'),
      description: t('about.values.innovation.description')
    },
    {
      icon: Target,
      title: t('about.values.excellence.title'),
      description: t('about.values.excellence.description')
    },
    {
      icon: Users,
      title: t('about.values.partnership.title'),
      description: t('about.values.partnership.description')
    },
    {
      icon: Shield,
      title: t('about.values.integrity.title'),
      description: t('about.values.integrity.description')
    },
    {
      icon: Sparkles,
      title: t('about.values.impact.title'),
      description: t('about.values.impact.description')
    }
  ];

  // Different entrance animations for variety
  const getEntranceVariant = (index: number) => {
    const variants = [
      { opacity: 0, x: -80, rotate: -8, scale: 0.85 },
      { opacity: 0, y: -80, rotate: 8, scale: 0.85 },
      { opacity: 0, x: 80, rotate: -8, scale: 0.85 },
      { opacity: 0, x: -80, rotate: 8, scale: 0.85 },
      { opacity: 0, y: 80, rotate: -8, scale: 0.85 },
      { opacity: 0, x: 80, rotate: 8, scale: 0.85 }
    ];
    return variants[index % variants.length];
  };

  return (
    <section className="py-24 bg-gradient-to-b from-background to-dental-blue/10 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0 pointer-events-none opacity-5">
        <div className="absolute top-20 left-10 w-32 h-32 bg-dental-blue rounded-full blur-3xl" />
        <div className="absolute bottom-40 right-20 w-40 h-40 bg-dental-lavender rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/3 w-24 h-24 bg-dental-peach rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <AnimatedText className="text-center mb-20">
          <h2 className="text-5xl md:text-6xl font-bold mb-6 text-foreground">
            {t('about.values.title')}
          </h2>
          <p className="text-2xl text-foreground/80 max-w-4xl mx-auto leading-relaxed">
            {t('about.values.subtitle')}
          </p>
        </AnimatedText>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {values.map((value, index) => {
            const Icon = value.icon;
            
            return (
              <motion.div
                key={index}
                initial={getEntranceVariant(index)}
                whileInView={{ opacity: 1, x: 0, y: 0, rotate: 0, scale: 1 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{
                  duration: 0.7,
                  delay: index * 0.15,
                  type: "spring",
                  stiffness: 80,
                  damping: 12
                }}
                whileHover={{ 
                  y: -10, 
                  scale: 1.03,
                  transition: { duration: 0.3 }
                }}
                className="relative h-full"
              >
                <Card className="h-full bg-card border-2 border-border/10 hover:border-dental-blue/50 transition-all duration-500 shadow-lg hover:shadow-2xl group overflow-hidden">
                  <CardContent className="p-8 h-full flex flex-col relative">
                    {/* Dental blue gradient background on hover */}
                    <motion.div 
                      className="absolute inset-0 bg-gradient-to-br from-dental-blue/20 to-dental-blue/10 opacity-0 group-hover:opacity-100"
                      transition={{ duration: 0.4 }}
                    />
                    
                    <div className="relative z-10 flex flex-col h-full">
                      {/* Icon with pulse effect */}
                      <motion.div 
                        className="w-20 h-20 rounded-3xl bg-black flex items-center justify-center mb-6 mx-auto relative overflow-hidden transition-colors duration-300"
                        whileHover={{ 
                          scale: 1.15, 
                          rotate: [0, -8, 8, 0],
                          transition: { duration: 0.5 }
                        }}
                        initial={{ scale: 0, rotate: 180 }}
                        whileInView={{ scale: 1, rotate: 0 }}
                        transition={{ 
                          delay: index * 0.15 + 0.3,
                          duration: 0.5,
                          type: "spring",
                          stiffness: 200
                        }}
                        viewport={{ once: true }}
                      >
                        {/* Ripple effect */}
                        <motion.div
                          className="absolute inset-0 bg-dental-blue/30 rounded-full"
                          initial={{ scale: 0, opacity: 0.5 }}
                          whileHover={{ 
                            scale: 2, 
                            opacity: 0,
                            transition: { duration: 0.6 }
                          }}
                        />
                        <Icon size={36} className="text-dental-blue relative z-10 transition-colors duration-300" />
                      </motion.div>
                      
                      <motion.h3 
                        className="text-2xl font-bold mb-4 text-foreground text-center group-hover:text-foreground transition-colors"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ delay: index * 0.15 + 0.5, duration: 0.4 }}
                        viewport={{ once: true }}
                      >
                        {value.title}
                      </motion.h3>
                      
                      <motion.p 
                        className="text-foreground/70 group-hover:text-foreground/80 leading-relaxed text-center flex-grow transition-colors"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ delay: index * 0.15 + 0.7, duration: 0.4 }}
                        viewport={{ once: true }}
                      >
                        {value.description}
                      </motion.p>
                    </div>

                    {/* Corner decorative elements */}
                    <div className="absolute top-3 right-3 w-2 h-2 border-t-2 border-r-2 border-border/20 group-hover:border-foreground/40 transition-colors duration-300" />
                    <div className="absolute bottom-3 left-3 w-2 h-2 border-b-2 border-l-2 border-border/20 group-hover:border-foreground/40 transition-colors duration-300" />
                  </CardContent>
                </Card>

                {/* Floating glow effect */}
                <motion.div
                  className="absolute inset-0 rounded-lg bg-foreground/5 -z-10 blur-xl"
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileHover={{ 
                    opacity: 0.6, 
                    scale: 1.1,
                    transition: { duration: 0.3 }
                  }}
                />

                {/* Animated particles */}
                <motion.div
                  className="absolute -top-1 -right-1 w-1.5 h-1.5 bg-foreground/30 rounded-full"
                  animate={{
                    y: [0, -8, 0],
                    opacity: [0.3, 0.7, 0.3]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: index * 0.3
                  }}
                />
                <motion.div
                  className="absolute -bottom-1 -left-1 w-1 h-1 bg-foreground/20 rounded-full"
                  animate={{
                    y: [0, 6, 0],
                    opacity: [0.2, 0.5, 0.2]
                  }}
                  transition={{
                    duration: 2.5,
                    repeat: Infinity,
                    delay: index * 0.4 + 0.5
                  }}
                />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};