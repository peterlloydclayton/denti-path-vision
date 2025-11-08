
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { useIsMobile } from '../hooks/use-mobile';
import { Sheet, SheetContent, SheetTrigger } from './ui/sheet';

const NavigationHeader = () => {
  const isMobile = useIsMobile();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200">
      <div className="max-w-6xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to="/" className="flex items-center">
              <img 
                src="/lovable-uploads/c952a978-93be-4aa3-9c22-073ca3743ceb.png" 
                alt="DentiPay Logo" 
                className="h-10 sm:h-10 md:h-12 w-auto object-contain"
              />
            </Link>
            {!isMobile && (
              <span className="text-coral-300 text-sm font-medium italic">
                Check out our new site coming in September
              </span>
            )}
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link 
              to="/" 
              className="text-gray-700 hover:text-primary-blue transition-colors font-medium"
            >
              Home
            </Link>
            <div className="relative group">
              <Link 
                to="/provider" 
                className="text-gray-700 hover:text-primary-blue transition-colors font-medium"
              >
                Providers
              </Link>
              <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-lg shadow-lg border opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                <Link 
                  to="/browse-providers" 
                  className="block px-4 py-3 text-gray-700 hover:text-primary-blue hover:bg-gray-50 transition-colors font-medium"
                >
                  Browse Providers
                </Link>
              </div>
            </div>
            <Link 
              to="/patients" 
              className="text-gray-700 hover:text-primary-blue transition-colors font-medium"
            >
              Patients
            </Link>
            <a 
              href="https://dental-docs-hub.lovable.app/auth" 
              className="text-gray-700 hover:text-primary-blue transition-colors font-medium"
              target="_blank"
              rel="noopener noreferrer"
            >
              Log In
            </a>
            <a 
              href="https://dental-docs-hub.lovable.app/auth" 
              className="bg-primary-blue text-white px-4 py-2 rounded-lg hover:bg-light-blue transition-colors font-medium"
              target="_blank"
              rel="noopener noreferrer"
            >
              Sign Up
            </a>
          </nav>

          {/* Mobile Hamburger Menu */}
          <div className="md:hidden">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <button className="p-2 text-gray-700 hover:text-primary-blue">
                  <Menu size={24} />
                </button>
              </SheetTrigger>
              <SheetContent side="right" className="w-64 p-6">
                <nav className="flex flex-col space-y-6 mt-8">
                  <Link 
                    to="/" 
                    className="text-gray-700 hover:text-primary-blue transition-colors font-medium text-lg"
                    onClick={() => setIsOpen(false)}
                  >
                    Home
                  </Link>
                  <Link 
                    to="/provider" 
                    className="text-gray-700 hover:text-primary-blue transition-colors font-medium text-lg"
                    onClick={() => setIsOpen(false)}
                  >
                    Providers
                  </Link>
                  <Link 
                    to="/browse-providers" 
                    className="text-gray-700 hover:text-primary-blue transition-colors font-medium text-lg pl-4"
                    onClick={() => setIsOpen(false)}
                  >
                    Browse Providers
                  </Link>
                  <Link 
                    to="/patients" 
                    className="text-gray-700 hover:text-primary-blue transition-colors font-medium text-lg" 
                    onClick={() => setIsOpen(false)}
                  >
                    Patients
                  </Link>
                  <a 
                    href="https://dental-docs-hub.lovable.app/auth" 
                    className="text-gray-700 hover:text-primary-blue transition-colors font-medium text-lg"
                    onClick={() => setIsOpen(false)}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Log In
                  </a>
                  <a 
                    href="https://dental-docs-hub.lovable.app/auth" 
                    className="bg-primary-blue text-white px-4 py-3 rounded-lg hover:bg-light-blue transition-colors font-medium text-center text-lg"
                    onClick={() => setIsOpen(false)}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Sign Up
                  </a>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
};

export default NavigationHeader;
