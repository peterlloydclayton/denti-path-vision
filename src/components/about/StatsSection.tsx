import { AnimatedText } from '@/components/ui/animated-text';

export const StatsSection = () => {
  const stats = [
    { value: '10,000+', label: 'Dental Practices' },
    { value: '2M+', label: 'Patients Served' },
    { value: '$1.5B+', label: 'Financing Processed' },
    { value: '97%', label: 'Approval Accuracy' }
  ];

  return (
    <section className="py-24 bg-gradient-subtle">
      <div className="container mx-auto px-6">
        <AnimatedText className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-black">
            Impact by Numbers
          </h2>
          <p className="text-xl text-black">
            Measurable results that demonstrate our commitment to transforming dental finance
          </p>
        </AnimatedText>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
          {stats.map((stat, index) => (
            <AnimatedText key={index} delay={index * 0.1}>
              <div className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-intelligence mb-2">
                  {stat.value}
                </div>
                <div className="text-muted-foreground font-medium">{stat.label}</div>
              </div>
            </AnimatedText>
          ))}
        </div>
      </div>
    </section>
  );
};