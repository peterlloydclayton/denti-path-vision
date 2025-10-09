import { AnimatedText } from '@/components/ui/animated-text';

export const MissionStatementSection = () => {
  return (
    <section className="py-12 md:py-16 bg-dental-blue">
      <div className="container mx-auto px-6">
        <div className="max-w-5xl mx-auto text-center">
          <AnimatedText>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
              Our Mission
            </h2>
          </AnimatedText>
          <AnimatedText delay={0.2}>
            <p className="text-lg md:text-xl lg:text-2xl text-foreground/90 leading-relaxed">
              To eliminate financial barriers in dental care by creating the most intelligent, patient-centered financing platform in healthcare.
            </p>
          </AnimatedText>
        </div>
      </div>
    </section>
  );
};
