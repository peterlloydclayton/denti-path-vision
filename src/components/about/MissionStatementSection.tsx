import { AnimatedText } from '@/components/ui/animated-text';
import { useTranslation } from 'react-i18next';

export const MissionStatementSection = () => {
  const { t } = useTranslation('marketing');
  return (
    <section className="py-12 md:py-16 bg-dental-blue">
      <div className="container mx-auto px-6">
        <div className="max-w-5xl mx-auto text-center">
          <AnimatedText>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
              {t('about.mission.title')}
            </h2>
          </AnimatedText>
          <AnimatedText delay={0.2}>
            <p className="text-lg md:text-xl lg:text-2xl text-foreground/90 leading-relaxed">
              {t('about.mission.description')}
            </p>
          </AnimatedText>
        </div>
      </div>
    </section>
  );
};
