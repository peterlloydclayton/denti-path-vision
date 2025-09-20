import { AnimatedText } from '@/components/ui/animated-text';
import { PaymentCalculator } from './PaymentCalculator';
import approvalSignal from '@/assets/approval-signal.jpg';

export const FinancialToolsSection = () => {
  return (
    <section className="py-24 bg-background relative">
      <div className="container mx-auto px-6">
        <AnimatedText className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Your Dental Financing Payment Calculator
          </h2>
          <p className="text-xl text-muted-foreground">
            Plan Your Treatment & Your Financing
          </p>
        </AnimatedText>

        <PaymentCalculator />
      </div>
      
      {/* Approval signal image attached to viewport side */}
      <div className="absolute -bottom-12 right-0 w-96 h-64 md:w-[480px] md:h-80 z-10">
        <img 
          src={approvalSignal} 
          alt="Approval signal - dental financing approved" 
          className="w-full h-full object-contain drop-shadow-lg"
        />
      </div>
    </section>
  );
};