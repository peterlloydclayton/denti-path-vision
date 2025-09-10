import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Home, Users, Search, Brain, Building, MessageSquare } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const navItems = [
  { href: '/', label: 'Home', icon: Home },
  { href: '/providers', label: 'Providers', icon: Users },
  { href: '/patients', label: 'Patients', icon: Search },
  { href: '/intelligent-financing', label: 'Intelligence', icon: Brain },
  { href: '/about', label: 'About', icon: Building },
];

export const DesktopNav = () => {
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
        fixed top-6 left-6 z-50
        bg-background/90 backdrop-blur-md border rounded-2xl
        transition-smooth px-6 py-3
        ${scrolled ? 'shadow-elegant' : 'shadow-soft'}
      `}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-center gap-1">
        {/* Logo/Brand */}
        <Link
          to="/"
          className="font-bold text-xl mr-6 text-primary hover:text-intelligence transition-smooth"
          onClick={() => setCurrentPath('/')}
        >
          DentiPay
        </Link>

        {/* Navigation Items */}
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
              <span>{item.label}</span>
            </Link>
          );
        })}

        {/* AI Assistant Button */}
        <div className="ml-4 pl-4 border-l border-border">
          <Button
            size="sm"
            className="bg-dental-blue text-primary hover:bg-dental-blue/80 shadow-soft"
          >
            <MessageSquare size={16} className="mr-2" />
            AI Assistant
          </Button>
        </div>
      </div>
    </motion.nav>
  );
};