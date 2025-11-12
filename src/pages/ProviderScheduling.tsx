import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, Video } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const ProviderScheduling = () => {
  const { t } = useTranslation('marketing');
  
  useEffect(() => {
    // Load Calendly widget script
    const script = document.createElement('script');
    script.src = 'https://assets.calendly.com/assets/external/widget.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      // Cleanup script on unmount
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/20">
      {/* Header Section */}
      <section className="pt-32 pb-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-dental-blue-darker mb-6">
              {t('scheduling.title')}
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
              {t('scheduling.description')}
            </p>

            {/* Feature Pills */}
            <div className="flex flex-wrap justify-center gap-4 mb-12">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
                className="flex items-center gap-2 px-6 py-3 bg-background rounded-full shadow-soft border"
              >
                <Clock className="w-5 h-5 text-primary" />
                <span className="text-sm font-medium">{t('scheduling.duration')}</span>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 }}
                className="flex items-center gap-2 px-6 py-3 bg-background rounded-full shadow-soft border"
              >
                <Video className="w-5 h-5 text-primary" />
                <span className="text-sm font-medium">{t('scheduling.virtual')}</span>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4 }}
                className="flex items-center gap-2 px-6 py-3 bg-background rounded-full shadow-soft border"
              >
                <Calendar className="w-5 h-5 text-primary" />
                <span className="text-sm font-medium">{t('scheduling.flexible')}</span>
              </motion.div>
            </div>
          </motion.div>

          {/* Calendly Widget Container */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="bg-background rounded-2xl shadow-elegant border p-4 md:p-8"
          >
            <div 
              className="calendly-inline-widget" 
              data-url="https://calendly.com/peter-mydentipay/30min"
              style={{ minWidth: '320px', height: '700px' }}
            />
          </motion.div>

        </div>
      </section>
    </div>
  );
};

export default ProviderScheduling;
