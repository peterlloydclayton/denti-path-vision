import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Home, Users, Stethoscope, Building, ChevronDown, Search, Calendar, FileText } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useTranslation } from 'react-i18next';
import { LanguageSelector } from '@/components/ui/language-selector';
import { useIsMobile } from '@/hooks/use-mobile';
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from '@/components/ui/navigation-menu';

const navItems = [
  { href: '/', label: 'navigation.home', icon: Home },
  { 
    href: '/providers', 
    label: 'navigation.providers', 
    icon: Stethoscope,
    submenu: [
      { href: '/provider-scheduling', label: 'Schedule Consultation', icon: Calendar }
    ]
  },
  { 
    href: '/patients', 
    label: 'navigation.patients', 
    icon: Users,
    submenu: [
      { href: '/patient-financing-application', label: 'Apply for Financing', icon: FileText }
    ]
  },
  { href: '/about', label: 'navigation.about', icon: Building },
];

export const DesktopNavWithSubmenu = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const [scrolled, setScrolled] = useState(false);
  const [currentPath, setCurrentPath] = useState('/');
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    
    const updatePath = () => {
      setCurrentPath(window.location.pathname);
    };
    
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest('nav')) {
        setOpenSubmenu(null);
      }
    };
    
    updatePath();
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('popstate', updatePath);
    document.addEventListener('click', handleClickOutside);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('popstate', updatePath);
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  const isAboutPage = currentPath === '/about';
  const logoSrc = isAboutPage && isMobile && !scrolled 
    ? "https://res.cloudinary.com/drxvhwze4/image/upload/v1760029328/dentipay-logo-dark-tp_mi7atx.png"
    : "/lovable-uploads/174d7e2f-f31a-4e96-b02e-b5ae61fff9a9.png";

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
            src={logoSrc}
            alt="DentiPay" 
            className="h-12 w-auto"
          />
        </Link>

        {/* Navigation Items - Center */}
        <NavigationMenu>
          <NavigationMenuList className="flex items-center gap-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentPath === item.href || (item.submenu && item.submenu.some(sub => currentPath === sub.href));
              
              if (item.submenu) {
                const isSubmenuOpen = openSubmenu === item.href;
                return (
                  <NavigationMenuItem 
                    key={item.href} 
                    value={item.href}
                    onMouseEnter={() => setOpenSubmenu(item.href)}
                    onMouseLeave={() => setOpenSubmenu(null)}
                  >
                    <Link
                      to={item.href}
                      onClick={() => setCurrentPath(item.href)}
                      className={`
                        flex items-center gap-2 px-4 py-2 rounded-xl
                        transition-smooth font-medium text-lg
                        ${isActive 
                          ? 'bg-primary text-primary-foreground shadow-soft' 
                          : 'text-muted-foreground hover:text-primary hover:bg-secondary/50'
                        }
                      `}
                    >
                      <Icon size={16} />
                      <span>{t(item.label)}</span>
                      <ChevronDown
                        size={16}
                        className={`transition-transform ${isSubmenuOpen ? 'rotate-180' : ''}`}
                      />
                    </Link>
                    {isSubmenuOpen && (
                      <div className="absolute top-full mt-2 w-48 p-2 bg-popover border shadow-lg rounded-lg z-50">
                        {item.submenu.map((subItem) => {
                          const SubIcon = subItem.icon;
                          return (
                            <Link
                              key={subItem.href}
                              to={subItem.href}
                              onClick={() => {
                                setCurrentPath(subItem.href);
                                setOpenSubmenu(null);
                              }}
                              className="flex items-center gap-2 px-4 py-3 rounded-md text-lg hover:bg-secondary transition-smooth"
                            >
                              <SubIcon size={16} className="text-muted-foreground" />
                              <span>{subItem.label}</span>
                            </Link>
                          );
                        })}
                      </div>
                    )}
                  </NavigationMenuItem>
                );
              }
              
              return (
                <NavigationMenuItem key={item.href}>
                  <Link
                    to={item.href}
                    onClick={() => setCurrentPath(item.href)}
                    className={`
                      flex items-center gap-2 px-4 py-2 rounded-xl
                      transition-smooth font-medium text-lg
                      ${isActive 
                        ? 'bg-primary text-primary-foreground shadow-soft' 
                        : 'text-muted-foreground hover:text-primary hover:bg-secondary/50'
                      }
                    `}
                  >
                    <Icon size={16} />
                    <span>{t(item.label)}</span>
                  </Link>
                </NavigationMenuItem>
              );
            })}
          </NavigationMenuList>
        </NavigationMenu>

        {/* Right Section - Language/Login/Signup */}
        <div className="flex items-center gap-4">
          {/* Language Selector */}
          <LanguageSelector />
          
          {/* Login/Signup Links */}
          <div className="flex items-center gap-4">
            <a
              href="https://dental-docs-hub.lovable.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-lg text-muted-foreground hover:text-primary transition-smooth font-medium"
            >
              Login
            </a>
          </div>
        </div>
      </div>
    </motion.nav>
  );
};