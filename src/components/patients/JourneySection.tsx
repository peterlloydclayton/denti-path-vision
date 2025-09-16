import { AnimatedText } from '@/components/ui/animated-text';

export const JourneySection = () => {
  const journeySteps = [
    { 
      step: '1', 
      title: 'Find Your Provider', 
      desc: 'Search for dental providers near you who accept DentiPay',
      benefit: 'Know financing is available before you visit'
    },
    { 
      step: '2', 
      title: 'Instant Pre-Qualification', 
      desc: 'Complete our simple application and get approved in seconds',
      benefit: 'Get clear payment options immediately with no credit score impact'
    },
    { 
      step: '3', 
      title: 'Treatment Planning', 
      desc: 'Work with your provider to create a treatment plan',
      benefit: 'Flexible payment plans that match your budget and timeline'
    },
    { 
      step: '4', 
      title: 'Treatment & Payment', 
      desc: 'Begin your dental care with confidence',
      benefit: 'Focus on your health, not financial stress'
    }
  ];

  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-6">
        <AnimatedText className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Your Journey to Confident Dental Care
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Getting Started is Simple
          </p>
        </AnimatedText>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
          {journeySteps.map((item, index) => (
            <AnimatedText key={index} delay={index * 0.2}>
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                  {item.step}
                </div>
                <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                <p className="text-muted-foreground mb-2">{item.desc}</p>
                <p className="text-sm text-dental-blue font-medium">{item.benefit}</p>
              </div>
            </AnimatedText>
          ))}
        </div>
      </div>
    </section>
  );
};