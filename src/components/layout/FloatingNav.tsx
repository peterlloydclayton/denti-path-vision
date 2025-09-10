import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Home, Users, Search, Brain, Building, MessageSquare } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const navItems = [
  { href: '/', label: 'Home', icon: Home },
  { href: '/providers', label: 'Providers', icon: Users },
  { href: '/patients', label: 'Patients', icon: Search },
  { href: '/intelligent-financing', label: 'Intelligence', icon: Brain },
  { href: '/about', label: 'About', icon: Building },
];

export const FloatingNav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const menuVariants = {
    closed: {
      scale: 0,
      opacity: 0,
      transition: {
        type: "spring" as const,
        stiffness: 400,
        damping: 40
      }
    },
    open: {
      scale: 1,
      opacity: 1,
      transition: {
        type: "spring" as const,
        stiffness: 400,
        damping: 40,
        staggerChildren: 0.1,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    closed: { opacity: 0, y: 20 },
    open: { opacity: 1, y: 0 }
  };

  return (
    <>
      {/* Floating Menu Button */}
      <motion.div
        className={`fixed top-6 right-6 z-50 transition-smooth ${
          scrolled ? 'shadow-elegant' : 'shadow-soft'
        }`}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 400, damping: 25 }}
      >
        <Button
          onClick={() => setIsOpen(!isOpen)}
          variant="default"
          size="lg"
          className={`
            relative rounded-full w-14 h-14 p-0 
            bg-primary text-primary-foreground
            hover:bg-intelligence hover:shadow-glow
            transition-smooth border-2 border-white/20
            ${scrolled ? 'backdrop-blur-md bg-primary/90' : ''}
          `}
        >
          <motion.div
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.3 }}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </motion.div>
        </Button>
      </motion.div>

      {/* Floating Menu Panel */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
            />

            {/* Menu Panel */}
            <motion.div
              className="fixed top-24 right-6 z-50 bg-card border rounded-2xl shadow-elegant p-6 min-w-[280px]"
              variants={menuVariants}
              initial="closed"
              animate="open"
              exit="closed"
              style={{ originX: 1, originY: 0 }}
            >
              <div className="space-y-2">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = location.pathname === item.href;
                  
                  return (
                    <motion.div key={item.href} variants={itemVariants}>
                      <Link
                        to={item.href}
                        onClick={() => setIsOpen(false)}
                        className={`
                          flex items-center gap-4 p-4 rounded-xl
                          transition-smooth hover:bg-card-hover
                          ${isActive 
                            ? 'bg-intelligence text-intelligence-foreground shadow-soft' 
                            : 'text-card-foreground hover:text-intelligence'
                          }
                        `}
                      >
                        <Icon size={20} />
                        <span className="font-medium">{item.label}</span>
                      </Link>
                    </motion.div>
                  );
                })}
              </div>

              {/* Chat Button */}
              <motion.div variants={itemVariants} className="mt-6 pt-4 border-t">
                <Button
                  className="w-full bg-dental-blue text-primary hover:bg-dental-blue/80 shadow-soft"
                  onClick={() => setIsOpen(false)}
                >
                  <MessageSquare size={20} className="mr-2" />
                  AI Assistant
                </Button>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};