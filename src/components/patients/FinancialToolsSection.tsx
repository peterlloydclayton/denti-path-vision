import { AnimatedText } from '@/components/ui/animated-text';
import { PaymentCalculator } from './PaymentCalculator';
import approvalSignal from '@/assets/approval-signal.jpg';

export const FinancialToolsSection = () => {
  return (
    <section className="pt-24 pb-[520px] md:pb-[644px] bg-background relative border-4 border-green-500 md:border-0">
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
      <div className="absolute bottom-0 right-0 z-10 w-screen h-[374px] md:w-[576px] md:h-[718px] border-2 border-red-500 md:border-0">
        <img 
          src={approvalSignal} 
          alt="Approval signal - dental financing approved" 
          className="w-full h-[374px] md:h-[718px] object-cover drop-shadow-lg border-2 border-blue-500 md:border-0"
        />
      </div>
    </section>
  );
};