import React from 'react';
import { Link } from 'react-router-dom';

const NavigationHeader = () => {
  return (
    <header className="fixed top-0 w-full bg-background border-b z-50">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="text-xl font-bold text-primary">
          DentiPay
        </Link>
        <nav className="flex gap-6">
          <Link to="/patients" className="text-foreground hover:text-primary transition-colors">
            Patients
          </Link>
          <Link to="/providers" className="text-foreground hover:text-primary transition-colors">
            Providers
          </Link>
          <Link to="/about" className="text-foreground hover:text-primary transition-colors">
            About
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default NavigationHeader;
