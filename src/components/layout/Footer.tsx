import { Heart } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="bg-black text-white py-8 mt-auto">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-2xl font-bold mb-4">DentiPay</h3>
            <p className="text-gray-300 mb-4">
              Revolutionizing dental financing with AI-powered behavioral credit decisions that approve more patients and increase provider profitability.
            </p>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-gray-300">
              <li><a href="/providers" className="hover:text-white transition-colors">Providers</a></li>
              <li><a href="/patients" className="hover:text-white transition-colors">Patients</a></li>
              <li><a href="/intelligent-financing" className="hover:text-white transition-colors">Intelligence</a></li>
              <li><a href="/about" className="hover:text-white transition-colors">About</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact</h4>
            <ul className="space-y-2 text-gray-300">
              <li>Support</li>
              <li>Partnership</li>
              <li>Careers</li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            © 2024 DentiPay. All rights reserved.
          </p>
          <p className="text-gray-400 text-sm flex items-center gap-1 mt-2 md:mt-0">
            Made with <Heart className="w-4 h-4 text-red-500" /> for dental professionals
          </p>
        </div>
      </div>
    </footer>
  );
};