import { TrendingUp, Users } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { ParallaxSection } from '@/components/ui/parallax-section';
import { AnimatedText } from '@/components/ui/animated-text';
import { useTranslation } from 'react-i18next';

export const PartnershipSection = () => {
  const { t } = useTranslation('marketing');
  return (
    <ParallaxSection className="py-24 bg-background" offset={20}>
      <div className="container mx-auto px-6">
        <AnimatedText className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-black">
            {t('about.partnership.title')}
          </h2>
          <p className="text-xl text-black max-w-4xl mx-auto">
            {t('about.partnership.subtitle')}
          </p>
        </AnimatedText>

        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* For Investors */}
            <AnimatedText delay={0.1}>
              <Card className="shadow-elegant hover:shadow-elegant transition-smooth hover:-translate-y-1 h-full">
                <CardContent className="p-8">
                  <div className="mb-6">
                    <TrendingUp className="w-12 h-12 text-dental-blue-darker mb-4" />
                    <h3 className="text-3xl font-bold mb-4 text-black">{t('about.partnership.investors.title')}</h3>
                  </div>
                  <p className="text-muted-foreground leading-relaxed mb-6">
                    {t('about.partnership.investors.description')}
                  </p>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 rounded-full bg-intelligence mt-3 flex-shrink-0"></div>
                      <div>
                        <div className="font-bold text-black">{t('about.partnership.investors.scalable.title')}</div>
                        <div className="text-muted-foreground">{t('about.partnership.investors.scalable.description')}</div>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 rounded-full bg-intelligence mt-3 flex-shrink-0"></div>
                      <div>
                        <div className="font-bold text-black">{t('about.partnership.investors.proven.title')}</div>
                        <div className="text-muted-foreground">{t('about.partnership.investors.proven.description')}</div>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 rounded-full bg-intelligence mt-3 flex-shrink-0"></div>
                      <div>
                        <div className="font-bold text-black">{t('about.partnership.investors.expansion.title')}</div>
                        <div className="text-muted-foreground">{t('about.partnership.investors.expansion.description')}</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </AnimatedText>

            {/* For Partners */}
            <AnimatedText delay={0.2}>
              <Card className="shadow-elegant hover:shadow-elegant transition-smooth hover:-translate-y-1 h-full">
                <CardContent className="p-8">
                  <div className="mb-6">
                    <Users className="w-12 h-12 text-dental-blue-dark mb-4" />
                    <h3 className="text-3xl font-bold mb-4 text-black">{t('about.partnership.partners.title')}</h3>
                  </div>
                  <p className="text-muted-foreground leading-relaxed mb-6">
                    {t('about.partnership.partners.description')}
                  </p>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 rounded-full bg-dental-peach mt-3 flex-shrink-0"></div>
                      <div>
                        <div className="font-bold text-black">{t('about.partnership.partners.revenue.title')}</div>
                        <div className="text-muted-foreground">{t('about.partnership.partners.revenue.description')}</div>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 rounded-full bg-dental-peach mt-3 flex-shrink-0"></div>
                      <div>
                        <div className="font-bold text-black">{t('about.partnership.partners.operational.title')}</div>
                        <div className="text-muted-foreground">{t('about.partnership.partners.operational.description')}</div>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 rounded-full bg-dental-peach mt-3 flex-shrink-0"></div>
                      <div>
                        <div className="font-bold text-black">{t('about.partnership.partners.success.title')}</div>
                        <div className="text-muted-foreground">{t('about.partnership.partners.success.description')}</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </AnimatedText>
          </div>
        </div>
      </div>
    </ParallaxSection>
  );
};