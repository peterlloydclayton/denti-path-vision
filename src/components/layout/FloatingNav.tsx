import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Home, Users, Stethoscope, Brain, Building, MessageSquare } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useIsMobile } from '@/hooks/use-mobile';
import { DesktopNav } from './DesktopNav';

const navItems = [
  { href: '/', label: 'Home', icon: Home },
  { href: '/providers', label: 'Providers', icon: Stethoscope },
  { href: '/patients', label: 'Patients', icon: Users },
  { href: '/intelligent-financing', label: 'Intelligence', icon: Brain },
  { href: '/about', label: 'About', icon: Building },
];

export const FloatingNav = () => {
  const isMobile = useIsMobile();

  // On desktop/tablet, show the floating desktop nav
  if (!isMobile) {
    return <DesktopNav />;
  }

  // On mobile, show the burger menu
  return <MobileNav />;
};

const MobileNav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [currentPath, setCurrentPath] = useState('/');

  useEffect(() => {
    const updatePath = () => {
      setCurrentPath(window.location.pathname);
    };
    
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    
    updatePath();
    window.addEventListener('popstate', updatePath);
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('popstate', updatePath);
      window.removeEventListener('scroll', handleScroll);
    };
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
      {/* Mobile Menu Button - Floating over hero */}
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
            hover:bg-primary/90 hover:shadow-peach
            transition-smooth border-2 border-dental-blue/20
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

      {/* Mobile Menu Panel */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
            />

            <motion.div
              className="fixed top-24 right-6 z-50 bg-card border rounded-2xl shadow-elegant p-6 min-w-[280px]"
              variants={menuVariants}
              initial="closed"
              animate="open"
              exit="closed"
              style={{ originX: 1, originY: 0 }}
            >
              {/* Logo at top of mobile menu */}
              <div className="mb-6 pb-4 border-b flex justify-center">
                <img 
                  src="/lovable-uploads/174d7e2f-f31a-4e96-b02e-b5ae61fff9a9.png" 
                  alt="DentiPay" 
                  className="h-9 w-auto"
                />
              </div>
              
              <div className="space-y-2">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = currentPath === item.href;
                  
                  return (
                    <motion.div key={item.href} variants={itemVariants}>
                      <Link
                        to={item.href}
                        onClick={() => {
                          setIsOpen(false);
                          setCurrentPath(item.href);
                        }}
                        className={`
                          flex items-center gap-4 p-4 rounded-xl
                          transition-smooth hover:bg-card-hover
                          ${isActive 
                            ? 'bg-primary text-primary-foreground shadow-soft' 
                            : 'text-card-foreground hover:text-primary'
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

              <motion.div variants={itemVariants} className="mt-6 pt-4 border-t">
                <div className="space-y-2 mb-4">
                  <a
                    href="https://dental-docs-hub.lovable.app/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full p-3 text-center rounded-xl bg-secondary hover:bg-secondary/80 transition-smooth font-medium"
                    onClick={() => setIsOpen(false)}
                  >
                    Login
                  </a>
                  <a
                    href="https://dental-docs-hub.lovable.app/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full p-3 text-center rounded-xl bg-secondary hover:bg-secondary/80 transition-smooth font-medium"
                    onClick={() => setIsOpen(false)}
                  >
                    Sign Up
                  </a>
                </div>
                <Button
                  className="w-full bg-dental-blue text-black hover:bg-dental-blue/80 shadow-soft"
                  onClick={() => setIsOpen(false)}
                >
                  <MessageSquare size={20} className="mr-2" />
                  Meet Echo
                </Button>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};