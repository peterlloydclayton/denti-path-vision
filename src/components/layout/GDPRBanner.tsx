import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Cookie, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { initGA, disableGA } from '@/lib/analytics';

export const GDPRBanner = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const hasAccepted = localStorage.getItem('gdpr-accepted');
    if (!hasAccepted) {
      // Show banner after a short delay
      setTimeout(() => setIsVisible(true), 2000);
    }
  }, []);

  const acceptAll = () => {
    localStorage.setItem('gdpr-accepted', 'true');
    initGA(true);
    setIsVisible(false);
  };

  const acceptNecessary = () => {
    localStorage.setItem('gdpr-accepted', 'necessary-only');
    disableGA();
    setIsVisible(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed bottom-6 left-6 right-6 md:left-auto md:right-6 md:max-w-md z-50"
          initial={{ opacity: 0, y: 100, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 100, scale: 0.95 }}
          transition={{ type: "spring", stiffness: 400, damping: 25 }}
        >
          <div className="bg-card border rounded-2xl shadow-elegant p-6 backdrop-blur-md">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-10 h-10 bg-dental-blue/20 rounded-full flex items-center justify-center">
                <Cookie size={20} className="text-intelligence" />
              </div>
              
              <div className="flex-grow">
                <h3 className="font-semibold text-card-foreground mb-2">
                  Privacy & Data Protection
                </h3>
                <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                  We use cookies and similar technologies to enhance your experience, 
                  analyze performance, and provide personalized content. Your privacy matters to us.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-2">
                  <Button
                    onClick={acceptAll}
                    className="bg-intelligence text-intelligence-foreground hover:bg-intelligence/90"
                  >
                    Accept All
                  </Button>
                  <Button
                    onClick={acceptNecessary}
                    variant="outline"
                    className="border-intelligence/20 text-intelligence hover:bg-intelligence/10"
                  >
                    Necessary Only
                  </Button>
                </div>
              </div>

              <Button
                onClick={() => setIsVisible(false)}
                variant="ghost"
                size="sm"
                className="flex-shrink-0 text-muted-foreground hover:text-card-foreground"
              >
                <X size={16} />
              </Button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};