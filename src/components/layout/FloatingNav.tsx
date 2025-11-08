import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Home, Users, Stethoscope, Building, Globe, ChevronDown, Search, Calendar, FileText } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useIsMobile } from '@/hooks/use-mobile';
import { useTranslation } from 'react-i18next';
import { LanguageSelector } from '@/components/ui/language-selector';
import { DesktopNavWithSubmenu } from './DesktopNavWithSubmenu';
import dentiPayLogo from '@/assets/dentipay-logo.png';

const navItems = [
  { href: '/', label: 'navigation.home', icon: Home },
  { 
    href: '/providers', 
    label: 'navigation.providers', 
    icon: Stethoscope,
    submenu: [
      { href: '/provider-search', label: 'Provider Search', icon: Search },
      { href: '/provider-scheduling', label: 'Schedule Consultation', icon: Calendar }
    ]
  },
  { 
    href: '/patients', 
    label: 'navigation.patients', 
    icon: Users,
    submenu: [
      { href: '/apply', label: 'Apply for Financing', icon: FileText }
    ]
  },
  { href: '/about', label: 'navigation.about', icon: Building },
];

export const FloatingNav = () => {
  const isMobile = useIsMobile();

  // On desktop, show the floating desktop nav with submenu
  if (!isMobile) {
    return <DesktopNavWithSubmenu />;
  }

  // On mobile and tablet, show the burger menu
  return <MobileNav />;
};

const MobileNav = () => {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [currentPath, setCurrentPath] = useState('/');
  const [expandedItem, setExpandedItem] = useState<string | null>(null);

  const isAboutPage = currentPath === '/about';
  const isHamburgerMenuPage = ['/', '/providers', '/patients'].includes(currentPath);
  
  // Logo logic: 
  // - Home/Providers/Patients: transparent at rest, regular on scroll
  // - About: dark at rest, regular on scroll
  const logoSrc = isHamburgerMenuPage 
    ? (scrolled ? dentiPayLogo : "https://res.cloudinary.com/drxvhwze4/image/upload/v1760037579/dentipay-logo-tp_q7ylxc.png")
    : (isAboutPage 
      ? (scrolled ? dentiPayLogo : "https://res.cloudinary.com/drxvhwze4/image/upload/v1760029328/dentipay-logo-dark-tp_mi7atx.png")
      : "/lovable-uploads/174d7e2f-f31a-4e96-b02e-b5ae61fff9a9.png");
  
  // Show white pill after scrolling on hamburger menu pages and About page
  const showWhitePill = scrolled && (isHamburgerMenuPage || isAboutPage);

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
      {/* Logo - Fixed upper left */}
      <motion.div
        className={`fixed top-6 left-6 z-50 transition-smooth rounded-xl ${
          showWhitePill ? 'bg-white shadow-soft px-3 py-2' : ''
        }`}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 400, damping: 25 }}
      >
        <Link to="/">
          <img 
            src={logoSrc}
            alt="DentiPay" 
            className="h-11 w-auto"
          />
        </Link>
      </motion.div>

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
          size="lg"
          className={`
            relative rounded-full w-14 h-14 p-0 
            bg-dental-blue text-black
            hover:bg-dental-blue/90 hover:shadow-peach
            transition-smooth border-0
            ${scrolled ? 'backdrop-blur-md bg-dental-blue/90' : ''}
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
              className="fixed top-24 right-6 z-50 bg-card border rounded-2xl shadow-elegant p-6 min-w-[280px] max-h-[80vh] overflow-y-auto"
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
                  const isActive = currentPath === item.href || (item.submenu && item.submenu.some(sub => currentPath === sub.href));
                  const isExpanded = expandedItem === item.href;
                  
                  if (item.submenu) {
                    return (
                      <motion.div key={item.href} variants={itemVariants}>
                        <button
                          onClick={() => setExpandedItem(isExpanded ? null : item.href)}
                          className={`
                            w-full flex items-center justify-between gap-4 p-4 rounded-xl
                            transition-smooth hover:bg-card-hover
                            ${isActive 
                              ? 'bg-primary text-primary-foreground shadow-soft' 
                              : 'text-card-foreground hover:text-primary'
                            }
                          `}
                        >
                          <div className="flex items-center gap-4">
                            <Icon size={20} />
                            <span className="font-medium">{t(item.label)}</span>
                          </div>
                          <motion.div
                            animate={{ rotate: isExpanded ? 180 : 0 }}
                            transition={{ duration: 0.2 }}
                          >
                            <ChevronDown size={16} />
                          </motion.div>
                        </button>
                        <AnimatePresence>
                          {isExpanded && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.2 }}
                              className="overflow-hidden"
                            >
                              <div className="ml-4 mt-2 space-y-2">
                                {item.submenu.map((subItem) => {
                                  const SubIcon = subItem.icon;
                                  const isSubActive = currentPath === subItem.href;
                                  
                                  return (
                                    <Link
                                      key={subItem.href}
                                      to={subItem.href}
                                      onClick={() => {
                                        setIsOpen(false);
                                        setCurrentPath(subItem.href);
                                      }}
                                      className={`
                                        flex items-center gap-4 p-3 rounded-xl
                                        transition-smooth hover:bg-card-hover
                                        ${isSubActive 
                                          ? 'bg-secondary text-secondary-foreground' 
                                          : 'text-card-foreground hover:text-primary'
                                        }
                                      `}
                                    >
                                      <SubIcon size={18} />
                                      <span className="font-medium">{subItem.label}</span>
                                    </Link>
                                  );
                                })}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </motion.div>
                    );
                  }
                  
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
                        <span className="font-medium">{item.label.startsWith('navigation.') ? t(item.label) : item.label}</span>
                      </Link>
                    </motion.div>
                  );
                })}
              </div>

              <motion.div variants={itemVariants} className="mt-6 pt-4 border-t">
                {/* Language Selector */}
                <div className="mb-4">
                  <LanguageSelector />
                </div>
                
                <div className="space-y-2">
                  <a
                    href="https://dental-docs-hub.lovable.app/login"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full p-3 text-center rounded-xl bg-secondary hover:bg-secondary/80 transition-smooth font-medium"
                    onClick={() => setIsOpen(false)}
                  >
                    {t('navigation.login')}
                  </a>
                  <a
                    href="https://dental-docs-hub.lovable.app/signup"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full p-3 text-center rounded-xl bg-secondary hover:bg-secondary/80 transition-smooth font-medium"
                    onClick={() => setIsOpen(false)}
                  >
                    {t('navigation.signup')}
                  </a>
                </div>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};