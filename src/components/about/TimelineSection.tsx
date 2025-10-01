import { Card, CardContent } from '@/components/ui/card';
import { AnimatedText } from '@/components/ui/animated-text';

export const TimelineSection = () => {
  const milestones = [
    {
      year: '2020',
      title: 'Company Founded',
      description: 'DentiPay was founded with a mission to democratize access to dental care through intelligent financing'
    },
    {
      year: '2021',
      title: 'PATH Technology Launch',
      description: 'Introduced our revolutionary Predictive Approval Technology Hub, transforming approval processes'
    },
    {
      year: '2022',
      title: 'SCOPE Integration',
      description: 'Launched Strategic Care Optimization Platform Engine for comprehensive practice intelligence'
    },
    {
      year: '2023',
      title: 'National Expansion',
      description: 'Reached 10,000+ dental practices nationwide, processing over $1B in patient financing'
    },
    {
      year: '2025',
      title: 'AI Enhancement',
      description: 'Advanced our AI capabilities with machine learning models achieving 97%+ predictive accuracy'
    }
  ];

  return (
    <section className="py-24 bg-gradient-subtle">
      <div className="container mx-auto px-6">
        <AnimatedText className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-black">
            Our Journey
          </h2>
          <p className="text-xl text-black">
            Key milestones in our mission to transform dental finance
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