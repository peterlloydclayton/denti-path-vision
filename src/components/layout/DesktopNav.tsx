import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Home, Users, Stethoscope, Brain, Building } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useTranslation } from 'react-i18next';
import { LanguageSelector } from '@/components/ui/language-selector';

const navItems = [
  { href: '/', label: 'navigation.home', icon: Home },
  { href: '/providers', label: 'navigation.providers', icon: Stethoscope },
  { href: '/patients', label: 'navigation.patients', icon: Users },
  { href: '/intelligent-financing', label: 'navigation.intelligence', icon: Brain },
  { href: '/about', label: 'navigation.about', icon: Building },
];

export const DesktopNav = () => {
  const { t } = useTranslation();
  const [scrolled, setScrolled] = useState(false);
  const [currentPath, setCurrentPath] = useState('/');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    
    const updatePath = () => {
      setCurrentPath(window.location.pathname);
    };
    
    updatePath();
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('popstate', updatePath);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('popstate', updatePath);
    };
  }, []);

  return (
    <motion.nav
      className={`
        fixed top-0 left-0 right-0 z-50 w-full
        bg-background border-b
        transition-smooth px-8 py-4
        ${scrolled ? 'shadow-elegant' : ''}
      `}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo/Brand - Left */}
        <Link
          to="/"
          className="flex items-center hover:opacity-80 transition-smooth"
          onClick={() => setCurrentPath('/')}
        >
          <img 
            src="/lovable-uploads/174d7e2f-f31a-4e96-b02e-b5ae61fff9a9.png" 
            alt="DentiPay" 
            className="h-12 w-auto"
          />
        </Link>

        {/* Navigation Items - Center */}
        <div className="flex items-center gap-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentPath === item.href;
            
            return (
              <Link
                key={item.href}
                to={item.href}
                onClick={() => setCurrentPath(item.href)}
                className={`
                  flex items-center gap-2 px-4 py-2 rounded-xl
                  transition-smooth font-medium text-sm
                  ${isActive 
                    ? 'bg-primary text-primary-foreground shadow-soft' 
                    : 'text-muted-foreground hover:text-primary hover:bg-secondary/50'
                  }
                `}
                >
                <Icon size={16} />
                <span>{t(item.label)}</span>
              </Link>
            );
          })}
        </div>

        {/* Right Section - Login/Signup/Language */}
        <div className="flex items-center gap-4">
          {/* Language Selector */}
          <LanguageSelector />
          
          {/* Login/Signup Links */}
          <div className="flex items-center gap-4">
            <a
              href="https://dental-docs-hub.lovable.app/login"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-smooth font-medium"
            >
              {t('navigation.login')}
            </a>
            <a
              href="https://dental-docs-hub.lovable.app/signup"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-smooth font-medium"
            >
              {t('navigation.signup')}
            </a>
          </div>
        </div>
      </div>
    </motion.nav>
  );
};