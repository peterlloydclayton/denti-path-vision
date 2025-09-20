import { Button } from '@/components/ui/button';
import { AnimatedText } from '@/components/ui/animated-text';
import { ProviderCarousel } from './ProviderCarousel';

export const ProviderSearchSection = () => {
  return (
    <section className="py-24 bg-gradient-subtle">
      <div className="container mx-auto px-6">
        <AnimatedText className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Find a Provider Near You
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Search our network of over 1,200 DentiPay-enabled practices.
          </p>
        </AnimatedText>


        {/* Provider Carousel */}
        <div className="mb-12">
          <ProviderCarousel />
        </div>

        <AnimatedText className="text-center mb-0">
          <Button size="lg" variant="outline" className="text-lg px-8">
            View All Providers in Your Area
          </Button>
        </AnimatedText>
      </div>
    </section>
  );
};