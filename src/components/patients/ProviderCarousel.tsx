import { MapPin, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { AnimatedText } from '@/components/ui/animated-text';
import { sampleProviders } from '@/data/patientsData';

export const ProviderCarousel = () => {
  return (
    <div className="relative max-w-4xl mx-auto">
      <AnimatedText delay={0.3}>
        <Carousel
          opts={{
            align: "center",
            loop: true,
            skipSnaps: false,
            dragFree: false,
          }}
          className="w-full"
        >
          <CarouselContent className="-ml-2 md:-ml-4">
            {sampleProviders.map((provider, index) => (
              <CarouselItem key={index} className="pl-2 md:pl-4 basis-4/5 sm:basis-2/5 lg:basis-1/3">
                <Card className="hover:shadow-elegant transition-smooth hover:-translate-y-1">
                  <CardContent className="p-0">
                    {/* Full width image at top */}
                    <div className="w-full h-48 overflow-hidden rounded-t-lg bg-muted">
                      <img 
                        src={provider.image} 
                        alt={`${provider.name} headshot`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    
                    {/* Information below image */}
                    <div className="p-6">
                      <div className="mb-4">
                        <h3 className="font-bold text-lg">{provider.name}</h3>
                        <p className="text-muted-foreground">{provider.specialty}</p>
                      </div>
                      
                      <div className="flex items-center gap-2 mb-2">
                        <MapPin size={16} className="text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">{provider.location}</span>
                      </div>
                      
                      <div className="flex items-center gap-2 mb-4">
                        <Star size={16} className="text-dental-peach fill-current" />
                        <span className="font-bold text-xl text-slate-600">{provider.rating}</span>
                        <span className="font-semibold text-slate-600">({provider.reviews} reviews)</span>
                        {provider.verified && (
                          <span className="text-xs bg-slate-100 text-slate-600 px-2 py-1 rounded-full ml-auto">
                            DentiPay Verified ✓
                          </span>
                        )}
                      </div>
                      
                      <Button className="w-full bg-intelligence hover:bg-intelligence/90">
                        View Profile & Book
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="hidden sm:flex" />
          <CarouselNext className="hidden sm:flex" />
        </Carousel>
      </AnimatedText>
    </div>
  );
};