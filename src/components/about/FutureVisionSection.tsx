import { TrendingUp, Award } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { ParallaxSection } from '@/components/ui/parallax-section';
import { AnimatedText } from '@/components/ui/animated-text';
import { useTranslation } from 'react-i18next';

export const FutureVisionSection = () => {
  const { t } = useTranslation('marketing');
  return (
    <ParallaxSection className="py-24 bg-navy text-white" offset={-30}>
      <div className="container mx-auto px-6 text-center">
        <AnimatedText>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            {t('about.futureVision.title')}
          </h2>
          <p className="text-xl mb-8 opacity-90 max-w-3xl mx-auto leading-relaxed">
            {t('about.futureVision.description')}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Card className="bg-background/95 backdrop-blur border-border shadow-soft">
              <CardContent className="p-6 text-center">
                <TrendingUp className="mx-auto mb-3 text-dental-blue-darker" size={32} />
                <div className="font-bold text-foreground">{t('about.futureVision.globalExpansion.title')}</div>
                <div className="text-sm text-muted-foreground">{t('about.futureVision.globalExpansion.description')}</div>
              </CardContent>
            </Card>
            
            <Card className="bg-background/95 backdrop-blur border-border shadow-soft">
              <CardContent className="p-6 text-center">
                <Award className="mx-auto mb-3 text-dental-blue-dark" size={32} />
                <div className="font-bold text-foreground">{t('about.futureVision.healthcareIntegration.title')}</div>
                <div className="text-sm text-muted-foreground">{t('about.futureVision.healthcareIntegration.description')}</div>
              </CardContent>
            </Card>
          </div>
        </AnimatedText>
      </div>
    </ParallaxSection>
  );
};