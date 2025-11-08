
import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-50 border-t border-gray-200 py-8 mt-16">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center mb-4 md:mb-0">
            <img 
              src="/lovable-uploads/c952a978-93be-4aa3-9c22-073ca3743ceb.png" 
              alt="DentiPay Logo" 
              className="h-8 sm:h-8 md:h-9 w-auto object-contain mr-4"
            />
            <span className="text-gray-600 text-sm">© 2025 DentiPay. All rights reserved.</span>
          </div>
          
          <nav className="flex items-center space-x-6">
            <Link 
              to="/privacy-policy" 
              className="text-gray-600 hover:text-primary-blue transition-colors text-sm font-medium"
            >
              Privacy Policy
            </Link>
            <Link 
              to="/terms-of-service" 
              className="text-gray-600 hover:text-primary-blue transition-colors text-sm font-medium"
            >
              Terms of Service
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
