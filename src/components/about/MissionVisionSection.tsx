import { Card, CardContent } from '@/components/ui/card';
import { AnimatedText } from '@/components/ui/animated-text';
import { motion } from 'framer-motion';
import { Users, Brain, TrendingUp, Heart, Shield, Smile, Star, Sparkles, Zap, CheckCircle } from 'lucide-react';
import { useMemo } from 'react';
import diversePractitioners from '@/assets/diverse-practitioners-new.png';
import { useTranslation } from 'react-i18next';

export const MissionVisionSection = () => {
  const { t } = useTranslation('marketing');
  // Floating dental icons for Mission section
  const dentalIcons = [Heart, Shield, Smile, Star, Sparkles, Zap];
  
  const floatingIcons = useMemo(() => {
    return Array.from({ length: 24 }, (_, i) => ({
      id: i,
      Icon: dentalIcons[i % dentalIcons.length],
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 20 + 20,
      duration: Math.random() * 20 + 15,
      delay: Math.random() * 5,
    }));
  }, []);

  const visionPillars = [
    {
      icon: Users,
      title: t('about.missionVision.visionPillars.universalAccess.title'),
      description: t('about.missionVision.visionPillars.universalAccess.description'),
      color: 'dental-blue'
    },
    {
      icon: Brain,
      title: t('about.missionVision.visionPillars.aiFirst.title'),
      description: t('about.missionVision.visionPillars.aiFirst.description'),
      color: 'dental-lavender'
    },
    {
      icon: TrendingUp,
      title: t('about.missionVision.visionPillars.providerEmpowerment.title'),
      description: t('about.missionVision.visionPillars.providerEmpowerment.description'),
      color: 'dental-peach'
    }
  ];

  return (
    <>
      {/* MISSION SECTION */}
      <section className="pt-24 md:pt-12 lg:pt-24 pb-0 bg-background relative overflow-hidden">
        {/* Mobile Subtitle - Only visible on mobile */}
        <div className="block md:hidden container mx-auto px-6 pb-8 relative z-10">
          <AnimatedText>
            <p className="text-lg text-foreground/80 font-medium leading-relaxed italic">
              {t('about.missionVision.mobileSubtitle')}
            </p>
          </AnimatedText>
        </div>

        {/* Floating Icons Background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-10">
          {floatingIcons.map((item) => (
            <motion.div
              key={item.id}
              className="absolute text-dental-blue"
              style={{
                left: `${item.x}%`,
                top: `${item.y}%`,
              }}
              animate={{
                x: [0, Math.random() * 100 - 50, 0],
                y: [0, Math.random() * 100 - 50, 0],
                rotate: [0, 360],
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: item.duration,
                repeat: Infinity,
                ease: "easeInOut",
                delay: item.delay,
              }}
            >
              <item.Icon size={item.size} />
            </motion.div>
          ))}
        </div>

        <div className="container mx-auto px-6 pb-0 relative z-10">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col lg:flex-row items-end gap-16">
              {/* Image - Left Side */}
              <motion.div 
                className="w-full lg:w-2/5 mb-0"
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <img 
                  src={diversePractitioners}
                  alt="Diverse team of dental professionals"
                  className="w-full h-auto object-contain object-bottom"
                />
              </motion.div>

              {/* Content - Right Side */}
              <div className="w-full lg:w-3/5 pb-12 lg:pb-16">
                <AnimatedText>
                  <h2 className="text-5xl md:text-6xl font-bold mb-6 text-foreground">
                    {t('about.missionVision.missionTitle')}
                  </h2>
                  <p className="text-xl leading-relaxed text-muted-foreground">
                    {t('about.missionVision.missionDescription')}
                  </p>
                </AnimatedText>

                {/* Mission Pillars */}
                <motion.div 
                  className="mt-12 space-y-4"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                >
                  {[t('about.missionVision.missionPillars.patientFirst'), t('about.missionVision.missionPillars.intelligence'), t('about.missionVision.missionPillars.growth')].map((pillar, index) => (
                    <motion.div 
                      key={index}
                      className="flex items-center gap-3"
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.4 + index * 0.1 }}
                      whileHover={{ x: 8 }}
                    >
                      <CheckCircle className="w-6 h-6 text-dental-blue flex-shrink-0" />
                      <span className="text-lg font-medium text-foreground">{pillar}</span>
                    </motion.div>
                  ))}
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* VISION SECTION */}
      <section className="py-24 bg-dental-blue relative overflow-hidden">
        <div className="container mx-auto px-6 relative z-10">
          <AnimatedText className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-bold mb-6 text-foreground">
              {t('about.missionVision.visionTitle')}
            </h2>
            <p className="text-2xl text-foreground/80 max-w-4xl mx-auto leading-relaxed">
              {t('about.missionVision.visionSubtitle')}
            </p>
          </AnimatedText>

          {/* Vision Callout Card */}
          <motion.div
            className="max-w-3xl mx-auto mb-20"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <motion.div
              whileHover={{ scale: 1.02, y: -4 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="bg-intelligence text-intelligence-foreground border-0 shadow-elegant hover:shadow-xl transition-all duration-300">
                <CardContent className="p-8 md:p-12 text-center">
                  <blockquote className="text-xl md:text-2xl font-medium leading-relaxed italic">
                    "{t('about.missionVision.visionQuote')}"
                  </blockquote>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>

          {/* Vision Pillars - 3 Cards */}
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {visionPillars.map((pillar, index) => {
              const Icon = pillar.icon;
              
              const entranceVariants = [
                { opacity: 0, x: -100, rotate: -15, scale: 0.8 },
                { opacity: 0, y: -100, scale: 0.5, rotate: 10 },
                { opacity: 0, x: 100, rotate: 15, scale: 0.8 }
              ];

              return (
                <motion.div
                  key={index}
                  initial={entranceVariants[index]}
                  whileInView={{ opacity: 1, x: 0, y: 0, rotate: 0, scale: 1 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{
                    duration: 0.8,
                    delay: index * 0.2,
                    type: "spring",
                    stiffness: 100,
                    damping: 15
                  }}
                  whileHover={{ 
                    y: -12, 
                    scale: 1.05,
                    transition: { duration: 0.3 }
                  }}
                  className="relative h-full cursor-pointer"
                >
                  <Card className="h-full bg-card border-2 border-border/10 hover:border-foreground/30 transition-all duration-500 shadow-lg hover:shadow-2xl group overflow-hidden">
                    <CardContent className="p-8 h-full flex flex-col relative">
                      {/* Animated background effect */}
                      <motion.div 
                        className="absolute inset-0 bg-gradient-to-br from-foreground/5 to-transparent opacity-0 group-hover:opacity-100"
                        transition={{ duration: 0.5 }}
                      />
                      
                      <div className="relative z-10">
                        <motion.div 
                          className="w-20 h-20 rounded-3xl bg-foreground/10 flex items-center justify-center mx-auto mb-6"
                          whileHover={{ 
                            scale: 1.2, 
                            rotate: [0, -10, 10, 0],
                            transition: { duration: 0.6 }
                          }}
                          initial={{ scale: 0, rotate: 180 }}
                          whileInView={{ scale: 1, rotate: 0 }}
                          transition={{ 
                            delay: index * 0.2 + 0.4,
                            duration: 0.6,
                            type: "spring",
                            stiffness: 200
                          }}
                          viewport={{ once: true }}
                        >
                          <Icon size={36} className="text-foreground" />
                        </motion.div>
                        
                        <h3 className="text-2xl font-bold mb-4 text-foreground text-center">
                          {pillar.title}
                        </h3>
                        
                        <p className="text-foreground/70 leading-relaxed text-center">
                          {pillar.description}
                        </p>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Floating glow effect */}
                  <motion.div
                    className="absolute inset-0 rounded-lg bg-foreground/10 -z-10 blur-xl"
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileHover={{ 
                      opacity: 0.8, 
                      scale: 1.1,
                      transition: { duration: 0.3 }
                    }}
                  />
                </motion.div>
              );
            })}
          </div>

          {/* Decorative elements */}
          <div className="absolute top-1/2 left-4 w-2 h-2 bg-foreground/30 rounded-full animate-pulse" />
          <div className="absolute top-1/3 right-1/4 w-1 h-1 bg-foreground/20 rounded-full animate-pulse" style={{ animationDelay: '1s' }} />
          <div className="absolute bottom-1/4 left-1/3 w-1.5 h-1.5 bg-foreground/25 rounded-full animate-pulse" style={{ animationDelay: '2s' }} />
        </div>
      </section>
    </>
  );
};