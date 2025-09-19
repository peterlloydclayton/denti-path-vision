import { CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { AnimatedText } from '@/components/ui/animated-text';

export const FinalCTASection = () => {
  const trustElements = [
    'No impact to credit score for pre-qualification',
    'Instant decisions in under 60 seconds',
    '24/7 patient support'
  ];

  return (
    <section className="py-24 bg-dental-blue/10">
      <div className="container mx-auto px-6 text-center">
        <AnimatedText>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Your Perfect Smile Awaits
          </h2>
          <p className="text-xl mb-8 text-muted-foreground max-w-3xl mx-auto">
            Don't let cost be a barrier to the dental care you deserve. Over 1,200 providers 
            nationwide with financing options available at your first visit.
          </p>
          
          <div className="flex justify-center mb-8">
            <Button
              size="lg"
              variant="outline"
              className="text-lg px-8 border-2"
            >
              Get Pre-Approved Now
            </Button>
          </div>

          {/* Final Trust Elements */}
          <div className="flex flex-col md:flex-row justify-center items-center gap-6 text-sm text-muted-foreground max-w-4xl mx-auto">
            {trustElements.map((element, index) => (
              <div key={index} className="flex items-center gap-2">
                <CheckCircle size={16} className="text-dental-blue flex-shrink-0" />
                <span>{element}</span>
              </div>
            ))}
          </div>
        </AnimatedText>
      </div>
    </section>
  );
};