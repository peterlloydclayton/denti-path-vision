import { Search, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { AnimatedText } from '@/components/ui/animated-text';
import { specialties } from '@/data/patientsData';
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

        {/* Search Interface */}
        <div className="max-w-2xl mx-auto mb-16">
          <AnimatedText delay={0.2}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div className="relative">
                <Input
                  placeholder="Enter your zip code or city..."
                  className="h-12 pl-12 pr-4 bg-background text-primary border-2 border-dental-blue/20 focus:border-dental-blue"
                />
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={20} />
              </div>
              <div className="relative">
                <select className="w-full h-12 pl-4 pr-10 bg-background text-primary border-2 border-dental-blue/20 rounded-md focus:border-dental-blue appearance-none">
                  <option>Select Specialty</option>
                  {specialties.map((specialty) => (
                    <option key={specialty} value={specialty}>{specialty}</option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={20} />
              </div>
            </div>
          </AnimatedText>
        </div>

        {/* Provider Carousel */}
        <div className="mb-12">
          <ProviderCarousel />
        </div>

        <AnimatedText className="text-center">
          <Button size="lg" variant="outline" className="text-lg px-8">
            View All Providers in Your Area
          </Button>
        </AnimatedText>
      </div>
    </section>
  );
};