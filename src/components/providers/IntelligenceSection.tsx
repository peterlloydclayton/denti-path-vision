import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Headphones, Target, BarChart3, MessageSquare, CheckCircle } from 'lucide-react';
import { AnimatedText } from '@/components/ui/animated-text';
import { useTranslation } from 'react-i18next';

export const IntelligenceSection = () => {
  const { t } = useTranslation('marketing');
  const tabData = [
    {
      value: "pipeline",
      label: t('providers.intelligence.tabs.pipeline.label'),
      icon: Target,
      title: t('providers.intelligence.tabs.pipeline.title'),
      features: [
        t('providers.intelligence.tabs.pipeline.features.prequalify'),
        t('providers.intelligence.tabs.pipeline.features.matching'), 
        t('providers.intelligence.tabs.pipeline.features.followup')
      ],
      metric: { value: t('providers.intelligence.tabs.pipeline.metric.value'), label: t('providers.intelligence.tabs.pipeline.metric.label') },
      color: "dental-blue"
    },
    {
      value: "analytics", 
      label: t('providers.intelligence.tabs.analytics.label'),
      icon: BarChart3,
      title: t('providers.intelligence.tabs.analytics.title'),
      features: [
        t('providers.intelligence.tabs.analytics.features.tracking'),
        t('providers.intelligence.tabs.analytics.features.revenue'),
        t('providers.intelligence.tabs.analytics.features.predictions')
      ],
      metric: { value: t('providers.intelligence.tabs.analytics.metric.value'), label: t('providers.intelligence.tabs.analytics.metric.label') },
      color: "success"
    },
    {
      value: "communications",
      label: t('providers.intelligence.tabs.communications.label'), 
      icon: MessageSquare,
      title: t('providers.intelligence.tabs.communications.title'),
      features: [
        t('providers.intelligence.tabs.communications.features.notifications'),
        t('providers.intelligence.tabs.communications.features.explanations'),
        t('providers.intelligence.tabs.communications.features.reminders')
      ],
      metric: { value: t('providers.intelligence.tabs.communications.metric.value'), label: t('providers.intelligence.tabs.communications.metric.label') },
      color: "dental-blue-dark"
    }
  ];

  return (
    <section className="py-24 bg-dental-blue-muted">
      <div className="container mx-auto px-6">
        <AnimatedText className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            {t('providers.intelligence.title')}
          </h2>
        </AnimatedText>

        {/* Echo AI Callout */}
        <motion.div 
          className="max-w-2xl mx-auto mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <motion.div
            whileHover={{ scale: 1.02, y: -4 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="bg-intelligence text-intelligence-foreground border-0 shadow-elegant hover:shadow-xl transition-all duration-300">
              <CardContent className="p-8 text-center">
                <motion.div 
                  className="w-16 h-16 bg-intelligence-foreground/20 rounded-full flex items-center justify-center mx-auto mb-4"
                  whileHover={{ rotate: 10, scale: 1.1 }}
                  transition={{ duration: 0.2 }}
                >
                  <Headphones className="w-8 h-8" />
                </motion.div>
                <h3 className="text-2xl font-bold mb-2">{t('providers.intelligence.echo.title')}</h3>
                <p className="text-lg opacity-90">
                  {t('providers.intelligence.echo.description')}
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>

        {/* Three Pillars */}
        <motion.div 
          className="max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Tabs defaultValue="pipeline">
            <TabsList className="grid w-full grid-cols-3 mb-8 bg-background/50 backdrop-blur-sm">
              {tabData.map((tab) => (
                <TabsTrigger 
                  key={tab.value} 
                  value={tab.value}
                  className="data-[state=active]:bg-dental-blue data-[state=active]:text-foreground"
                >
                  {tab.label}
                </TabsTrigger>
              ))}
            </TabsList>

            {tabData.map((tab) => {
              const Icon = tab.icon;
              return (
                <TabsContent key={tab.value} value={tab.value} className="mt-8">
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4 }}
                  >
                    <Card className="hover:shadow-elegant transition-all duration-300">
                      <CardContent className="p-8">
                        <div className="flex items-center gap-4 mb-6">
                          <motion.div
                            whileHover={{ scale: 1.1, rotate: 5 }}
                            transition={{ duration: 0.2 }}
                          >
                            <Icon className={`w-8 h-8 text-${tab.color}`} />
                          </motion.div>
                          <h3 className="text-2xl font-bold">{tab.title}</h3>
                        </div>
                        
                        <ul className="space-y-4 mb-6">
                          {tab.features.map((feature, index) => (
                            <motion.li 
                              key={index}
                              className="flex items-center gap-3"
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: index * 0.1 }}
                              whileHover={{ x: 4 }}
                            >
                              <CheckCircle className="w-5 h-5 text-success" />
                              <span>{feature}</span>
                            </motion.li>
                          ))}
                        </ul>
                        
                        <motion.div 
                          className={`bg-${tab.color}/20 rounded-lg p-4 hover:bg-${tab.color}/30 transition-colors duration-300`}
                          whileHover={{ scale: 1.02 }}
                        >
                          <div className={`text-3xl font-bold text-${tab.color}`}>
                            {tab.metric.value}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            {tab.metric.label}
                          </div>
                        </motion.div>
                      </CardContent>
                    </Card>
                  </motion.div>
                </TabsContent>
              );
            })}
          </Tabs>
        </motion.div>
        
        {/* Get Started button at bottom of section */}
        <motion.div 
          className="flex justify-center mt-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <Button className="bg-black text-white hover:bg-black/90 rounded-full px-8 py-3 text-base font-medium">
            {t('providers.intelligence.getStarted')}
          </Button>
        </motion.div>
      </div>
    </section>
  );
};