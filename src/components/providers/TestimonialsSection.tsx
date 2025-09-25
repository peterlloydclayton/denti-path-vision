import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Star, CheckCircle, Quote } from 'lucide-react';
import { AnimatedText } from '@/components/ui/animated-text';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { useCallback, useEffect, useState } from 'react';
import { type CarouselApi } from '@/components/ui/carousel';

export const TestimonialsSection = () => {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);

  const onSelect = useCallback((api: CarouselApi) => {
    if (!api) return;
    setCurrent(api.selectedScrollSnap());
  }, []);

  useEffect(() => {
    if (!api) return;
    
    onSelect(api);
    api.on('select', () => onSelect(api));
    
    return () => {
      api.off('select', () => onSelect(api));
    };
  }, [api, onSelect]);

  const testimonials = [
    {
      quote: "DentiPay transformed our practice. We went from 40% approval rates to 94% overnight. The intelligence behind SCOPE understands dental care in ways traditional financing never could.",
      name: "Dr. Sarah Mitchell",
      specialty: "Cosmetic & Restorative Dentistry",
      metric: "$180K additional annual revenue",
      rating: "4.9/5",
      color: "dental-blue",
      image: "/src/assets/dentist-1.png"
    },
    {
      quote: "The Echo AI integration has revolutionized how we discuss treatment options. Patients feel confident about financing before we even finish the consultation.",
      name: "Dr. Michael Chen",
      specialty: "Oral Surgery",
      metric: "65% faster treatment acceptance",
      rating: "5.0/5",
      color: "success",
      image: "/src/assets/dentist-2.png"
    },
    {
      quote: "PATH's instant approvals have eliminated the anxiety around financing discussions. Our patients trust the process because it actually works for dental care.",
      name: "Dr. Jennifer Rodriguez",
      specialty: "Family Dentistry",
      metric: "40% increase in case acceptance",
      rating: "4.8/5", 
      color: "dental-blue-dark",
      image: "/src/assets/dentist-3.png"
    }
  ];

  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-6">
        <AnimatedText className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Ready to Join thousands of Providers signing up for DentiPay?
          </h2>
          <p className="text-xl text-muted-foreground">
            Real results from dental professionals who've transformed their practices with intelligence.
          </p>
        </AnimatedText>

        <div className="relative max-w-4xl mx-auto py-12">
          <AnimatedText delay={0.3}>
            <Carousel
              setApi={setApi}
              opts={{
                align: "center",
                loop: true,
                skipSnaps: false,
                dragFree: false,
              }}
              className="w-full"
            >
              <CarouselContent className="-ml-2 md:-ml-4 py-8">
                {testimonials.map((testimonial, index) => (
                  <CarouselItem key={index} className="pl-2 md:pl-4 basis-4/5 xs:basis-3/5 sm:basis-1/2 md:basis-2/5 lg:basis-1/3">
                    <Card className={`hover:shadow-elegant transition-all duration-500 hover:-translate-y-1 relative ${
                      index === current 
                        ? 'scale-110 z-20 shadow-2xl' 
                        : 'scale-100 z-10'
                    }`}>
                      <CardContent className="p-0">
                        {/* Full width image at top */}
                        <div className={`w-full overflow-hidden rounded-t-lg bg-muted transition-all duration-500 ${
                          index === current ? 'h-56' : 'h-48'
                        }`}>
                          <img 
                            src={testimonial.image} 
                            alt={`${testimonial.name} headshot`}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        
                        {/* Information below image */}
                        <div className="p-6">
                          {/* Rating */}
                          <div className="flex items-center gap-1 mb-4">
                            {[...Array(5)].map((_, i) => (
                              <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                            ))}
                            <span className="ml-2 text-sm text-muted-foreground font-medium">{testimonial.rating}</span>
                          </div>

                          {/* Quote */}
                          <blockquote className="text-sm mb-4 italic text-foreground/80">
                            "{testimonial.quote}"
                          </blockquote>
                          
                          {/* Author Info */}
                          <div className="mb-4">
                            <h3 className="font-bold text-lg break-words leading-tight">{testimonial.name}</h3>
                            <p className="text-muted-foreground text-sm break-words leading-relaxed">{testimonial.specialty}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="hidden sm:flex z-30" />
              <CarouselNext className="hidden sm:flex z-30" />
            </Carousel>
          </AnimatedText>
        </div>
      </div>
    </section>
  );
};