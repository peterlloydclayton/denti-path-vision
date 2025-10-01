import { CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { AnimatedText } from '@/components/ui/animated-text';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import smileImage from '@/assets/smile.png';

export const FinalCTASection = () => {
  const { t } = useTranslation('marketing');
  const navigate = useNavigate();

  const trustElements = [
    t('patients.finalCTA.trustElements.creditScore'),
    t('patients.finalCTA.trustElements.instantDecisions'),
    t('patients.finalCTA.trustElements.support')
  ];

  return (
    <section className="py-24 bg-dental-blue/10">
      <div className="container mx-auto px-6 text-center">
        <AnimatedText>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            {t('patients.finalCTA.title')}
          </h2>
          <p className="text-xl mb-8 text-muted-foreground max-w-3xl mx-auto">
            {t('patients.finalCTA.description')}
          </p>
          
          {/* Final Trust Elements */}
          <div className="grid gap-6 max-w-2xl mx-auto mb-12">
            {trustElements.map((element, index) => (
              <div key={index} className="flex items-start gap-4 text-left">
                <CheckCircle size={28} className="text-dental-blue flex-shrink-0 mt-1" />
                <span className="text-xl font-semibold text-slate-600 leading-tight">
                  {element}
                </span>
              </div>
            ))}
          </div>

          <div className="flex justify-center mb-8">
            <Button
              size="lg"
              className="bg-primary text-primary-foreground hover:bg-primary/90 hover:scale-105 transition-all duration-300 text-xl px-12 py-4 rounded-xl shadow-elegant font-semibold"
              onClick={() => navigate('/patient-financing-application')}
            >
              {t('patients.finalCTA.cta')}
            </Button>
          </div>

          {/* Smile image centered and flush with bottom */}
          <div className="flex justify-center -mb-24">
            <img 
              src={smileImage} 
              alt={t('patients.finalCTA.imageAlt')}
              className="w-auto h-auto max-w-[16rem]"
            />
          </div>
        </AnimatedText>
      </div>
    </section>
  );
};