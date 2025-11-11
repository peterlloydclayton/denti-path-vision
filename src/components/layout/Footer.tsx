import { Heart } from "lucide-react";
import { useTranslation } from "react-i18next";

export const Footer = () => {
  const { t } = useTranslation('marketing');
  
  return (
    <footer className="bg-black text-white py-8 mt-auto">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-2xl font-bold mb-4">DentiPay</h3>
            <p className="text-gray-300 mb-4">
              {t('footer.description')}
            </p>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">{t('footer.quickLinks')}</h4>
            <ul className="space-y-2 text-gray-300">
              <li><a href="/providers" className="hover:text-white transition-colors">{t('footer.providers')}</a></li>
              <li><a href="/patients" className="hover:text-white transition-colors">{t('footer.patients')}</a></li>
              <li><a href="/about" className="hover:text-white transition-colors">{t('footer.about')}</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">{t('footer.legal')}</h4>
            <ul className="space-y-2 text-gray-300">
              <li><a href="/privacy-policy" className="hover:text-white transition-colors">{t('footer.privacyPolicy')}</a></li>
              <li><a href="/terms-of-use" className="hover:text-white transition-colors">{t('footer.termsOfUse')}</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            {t('footer.copyright', { year: new Date().getFullYear() })}
          </p>
        </div>
      </div>
    </footer>
  );
};