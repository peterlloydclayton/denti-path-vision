import { Button } from '@/components/ui/button';
import { AnimatedText } from '@/components/ui/animated-text';
import { ProviderCarousel } from './ProviderCarousel';
import { useTranslation } from 'react-i18next';

export const ProviderSearchSection = () => {
  const { t } = useTranslation('marketing');
  
  return (
    <section className="py-24 pb-6 bg-gradient-subtle">
      <div className="container mx-auto px-6">
        <AnimatedText className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            {t('patients.providerSearch.title')}
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            {t('patients.providerSearch.subtitle')}
          </p>
        </AnimatedText>


        {/* Provider Carousel */}
        <div className="mb-12">
          <ProviderCarousel />
        </div>

        <AnimatedText className="text-center mb-0">
          <Button size="lg" variant="outline" className="text-lg px-8 text-white border-white hover:bg-white hover:text-black">
            {t('patients.providerSearch.cta')}
          </Button>
        </AnimatedText>
      </div>
    </section>
  );
};