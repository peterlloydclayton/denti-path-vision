import { AnimatedText } from '@/components/ui/animated-text';
import { PaymentCalculator } from './PaymentCalculator';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import approvalSignal from '@/assets/approval-signal.jpg';

export const FinancialToolsSection = () => {
  const navigate = useNavigate();
  
  return (
    <section className="pt-24 pb-[420px] md:pb-[644px] bg-background relative">
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
      
      {/* Get Financing Button - Left side on desktop, below calculator on mobile */}
      <div className="absolute bottom-[400px] left-8 z-10 hidden md:block">
        <Button 
          className="h-14 text-lg bg-black text-white hover:bg-black/80 shadow-elegant px-10 font-semibold"
          onClick={() => navigate('/patient-financing-application')}
        >
          Get Financing
        </Button>
      </div>
      
      <div className="container mx-auto px-6 md:hidden mt-4 mb-1 flex justify-center">
        <Button 
          className="h-14 text-lg bg-black text-white hover:bg-black/80 shadow-elegant px-10 font-semibold"
          onClick={() => navigate('/patient-financing-application')}
        >
          Get Financing
        </Button>
      </div>
      
      {/* Approval signal image attached to viewport side */}
      <div className="absolute bottom-0 right-0 z-10 w-screen h-[374px] md:w-[576px] md:h-[718px]">
        <img 
          src={approvalSignal} 
          alt="Approval signal - dental financing approved" 
          className="w-full h-[374px] md:h-[718px] object-cover drop-shadow-lg"
        />
      </div>
    </section>
  );
};