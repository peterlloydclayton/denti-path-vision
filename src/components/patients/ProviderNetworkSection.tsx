import { AnimatedText } from '@/components/ui/animated-text';
import { AnimatedPhraseCloud } from './AnimatedPhraseCloud';
import { useTranslation } from 'react-i18next';

export const ProviderNetworkSection = () => {
  const { t } = useTranslation('marketing');
  
  return (
    <section className="py-16 bg-gray-800">
      <div className="container mx-auto px-6">
        <AnimatedText className="text-center mb-4">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">
            {t('patients.providerNetwork.title')}
          </h2>
        </AnimatedText>

        <div className="relative">
          <AnimatedPhraseCloud />
        </div>
      </div>
    </section>
  );
};