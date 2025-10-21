import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, Video } from 'lucide-react';

const ProviderScheduling = () => {
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
              Schedule Your Consultation
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
              Book a personalized demo with our team to discover how DentiPay can transform your practice
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
                <span className="text-sm font-medium">30-Minute Session</span>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 }}
                className="flex items-center gap-2 px-6 py-3 bg-background rounded-full shadow-soft border"
              >
                <Video className="w-5 h-5 text-primary" />
                <span className="text-sm font-medium">Virtual Meeting</span>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4 }}
                className="flex items-center gap-2 px-6 py-3 bg-background rounded-full shadow-soft border"
              >
                <Calendar className="w-5 h-5 text-primary" />
                <span className="text-sm font-medium">Flexible Scheduling</span>
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

          {/* Bottom CTA Section */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="text-center mt-16"
          >
            <p className="text-muted-foreground mb-4">
              Questions before scheduling? Contact us at{' '}
              <a 
                href="mailto:peter@mydentipay.com" 
                className="text-primary hover:underline font-medium"
              >
                peter@mydentipay.com
              </a>
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default ProviderScheduling;
