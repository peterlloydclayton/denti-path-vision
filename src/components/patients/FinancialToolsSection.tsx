import { AnimatedText } from '@/components/ui/animated-text';
import { PaymentCalculator } from './PaymentCalculator';

export const FinancialToolsSection = () => {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-6">
        <AnimatedText className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Tools to Help You Plan
          </h2>
        </AnimatedText>

        <PaymentCalculator />
      </div>
    </section>
  );
};