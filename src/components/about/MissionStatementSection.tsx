import { AnimatedText } from '@/components/ui/animated-text';

export const MissionStatementSection = () => {
  return (
    <section className="py-20 md:py-24 bg-dental-blue">
      <div className="container mx-auto px-6">
        <AnimatedText>
          <div className="max-w-5xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight">
              To eliminate financial barriers in dental care by creating the most intelligent, patient-centered financing platform in healthcare.
            </h2>
          </div>
        </AnimatedText>
      </div>
    </section>
  );
};
