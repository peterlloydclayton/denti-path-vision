import { Search, ChevronDown, Heart, MapPin, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { AnimatedText } from '@/components/ui/animated-text';
import { specialties, sampleProviders } from '@/data/patientsData';

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

        {/* Sample Provider Results */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto mb-12">
          {sampleProviders.map((provider, index) => (
            <AnimatedText key={index} delay={index * 0.1}>
              <Card className="hover:shadow-elegant transition-smooth hover:-translate-y-1">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-16 h-16 rounded-full bg-dental-blue/20 flex items-center justify-center">
                      <Heart className="text-dental-blue" size={24} />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg">{provider.name}</h3>
                      <p className="text-muted-foreground">{provider.specialty}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2 mb-2">
                    <MapPin size={16} className="text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">{provider.location}</span>
                  </div>
                  
                  <div className="flex items-center gap-2 mb-2">
                    <Star size={16} className="text-dental-peach fill-current" />
                    <span className="font-semibold">{provider.rating}</span>
                    <span className="text-sm text-muted-foreground">({provider.reviews} reviews)</span>
                    {provider.verified && (
                      <span className="text-xs bg-dental-blue/10 text-dental-blue px-2 py-1 rounded-full ml-auto">
                        DentiPay Verified ✓
                      </span>
                    )}
                  </div>
                  
                  <Button className="w-full bg-intelligence hover:bg-intelligence/90">
                    View Profile & Book
                  </Button>
                </CardContent>
              </Card>
            </AnimatedText>
          ))}
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