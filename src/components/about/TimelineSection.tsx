import { Card, CardContent } from '@/components/ui/card';
import { AnimatedText } from '@/components/ui/animated-text';
import { useTranslation } from 'react-i18next';

export const TimelineSection = () => {
  const { t } = useTranslation('marketing');
  
  const milestones = [
    {
      year: '2020',
      title: t('about.timeline.milestones.2020.title'),
      description: t('about.timeline.milestones.2020.description')
    },
    {
      year: '2021',
      title: t('about.timeline.milestones.2021.title'),
      description: t('about.timeline.milestones.2021.description')
    },
    {
      year: '2022',
      title: t('about.timeline.milestones.2022.title'),
      description: t('about.timeline.milestones.2022.description')
    },
    {
      year: '2023',
      title: t('about.timeline.milestones.2023.title'),
      description: t('about.timeline.milestones.2023.description')
    },
    {
      year: '2025',
      title: t('about.timeline.milestones.2025.title'),
      description: t('about.timeline.milestones.2025.description')
    }
  ];

  return (
    <section className="py-24 bg-gradient-subtle">
      <div className="container mx-auto px-6">
        <AnimatedText className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-black">
            {t('about.timeline.title')}
          </h2>
          <p className="text-xl text-black">
            {t('about.timeline.subtitle')}
          </p>
        </AnimatedText>

        <div className="max-w-4xl mx-auto">
          <div className="space-y-12">
            {milestones.map((milestone, index) => (
              <AnimatedText key={index} delay={index * 0.1}>
                <div className="flex gap-8 items-start">
                  <div className="flex-shrink-0 w-24 text-right">
                    <div className="text-2xl font-bold text-intelligence">{milestone.year}</div>
                  </div>
                  
                  <div className="flex-shrink-0 w-4 h-4 rounded-full bg-intelligence mt-2"></div>
                  
                  <Card className="flex-grow hover:shadow-soft transition-smooth">
                    <CardContent className="p-6">
                      <h3 className="text-xl font-bold mb-2">{milestone.title}</h3>
                      <p className="text-muted-foreground">{milestone.description}</p>
                    </CardContent>
                  </Card>
                </div>
              </AnimatedText>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};