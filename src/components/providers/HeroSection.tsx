import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { AnimatedText } from '@/components/ui/animated-text';

export const HeroSection = () => {
  return (
    <section className="relative min-h-screen bg-dental-blue text-foreground overflow-hidden">
      {/* Abstract AI Pattern Background */}
      <div className="absolute inset-0 opacity-15">
        <motion.div 
          className="absolute top-20 left-20 w-32 h-32 border border-foreground rounded-full"
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        />
        <motion.div 
          className="absolute top-40 right-40 w-24 h-24 border border-foreground rotate-45"
          animate={{ rotate: [45, 405] }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div 
          className="absolute bottom-40 left-1/3 w-16 h-16 border border-foreground rounded-full"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div 
          className="absolute bottom-20 right-20 w-20 h-20 border border-foreground"
          animate={{ rotate: [0, 180, 360] }}
          transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
        />
      </div>

      <div className="relative container mx-auto px-6 pt-32 pb-20">
        <div className="max-w-4xl mx-auto text-center">
          <AnimatedText>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              The Future of Patient Financing
              <span className="block text-4xl md:text-6xl mt-2 text-intelligence">Built on AI</span>
            </h1>
          </AnimatedText>
          
          <AnimatedText delay={0.2}>
            <p className="text-xl md:text-2xl mb-12 max-w-3xl mx-auto text-foreground/80">
              Transform patient acceptance rates with AI-powered financing that understands dental care. 
              Where traditional financing fails, DentiPay's SCOPE & PATH intelligence delivers.
            </p>
          </AnimatedText>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Button 
              size="lg" 
              className="bg-intelligence hover:bg-intelligence/90 text-intelligence-foreground px-12 py-6 text-xl rounded-xl shadow-elegant hover:shadow-xl transition-all duration-300 hover:scale-105"
            >
              Get Started
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};