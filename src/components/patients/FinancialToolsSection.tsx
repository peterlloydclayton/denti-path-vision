import { AnimatedText } from '@/components/ui/animated-text';
import { PaymentCalculator } from './PaymentCalculator';
import approvalSignal from '@/assets/approval-signal.jpg';

export const FinancialToolsSection = () => {
  return (
    <section className="pt-24 pb-44 md:pb-52 bg-background relative overflow-hidden border-4 border-green-500">
      <div className="container mx-auto pl-6">
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
      <div className="absolute -bottom-12 right-0 z-10 border-2 border-red-500">
        <img 
          src={approvalSignal} 
          alt="Approval signal - dental financing approved" 
          className="w-48 h-32 md:w-[480px] md:h-40 object-cover drop-shadow-lg border-2 border-blue-500"
        />
      </div>
    </section>
  );
};