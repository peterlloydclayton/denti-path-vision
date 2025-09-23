import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Star, CheckCircle } from 'lucide-react';

export const TestimonialsSection = () => {
  const testimonials = [
    {
      quote: "DentiPay transformed our practice. We went from 40% approval rates to 94% overnight. The intelligence behind SCOPE understands dental care in ways traditional financing never could.",
      name: "Dr. Sarah Mitchell",
      specialty: "Cosmetic & Restorative Dentistry",
      metric: "$180K additional annual revenue",
      rating: "4.9/5"
    },
    {
      quote: "The Echo AI integration has revolutionized how we discuss treatment options. Patients feel confident about financing before we even finish the consultation.",
      name: "Dr. Michael Chen",
      specialty: "Oral Surgery",
      metric: "65% faster treatment acceptance",
      rating: "5.0/5"
    },
    {
      quote: "PATH's instant approvals have eliminated the anxiety around financing discussions. Our patients trust the process because it actually works for dental care.",
      name: "Dr. Jennifer Rodriguez",
      specialty: "Family Dentistry",
      metric: "40% increase in case acceptance",
      rating: "4.8/5"
    }
  ];

  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Join 1,200+ DentiPay-Enabled Providers
          </h2>
          <p className="text-xl text-muted-foreground">
            Real results from dental professionals who've transformed their practices with intelligence.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="hover:shadow-elegant transition-shadow">
              <CardContent className="p-8">
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                  <span className="ml-2 text-sm text-muted-foreground">{testimonial.rating}</span>
                </div>
                
                <blockquote className="text-sm mb-6 italic">
                  "{testimonial.quote}"
                </blockquote>
                
                <div className="border-t pt-4">
                  <div className="font-semibold">{testimonial.name}</div>
                  <div className="text-sm text-muted-foreground mb-2">{testimonial.specialty}</div>
                  <div className="text-sm font-medium text-success">{testimonial.metric}</div>
                  <Badge variant="outline" className="mt-2">
                    <CheckCircle className="w-3 h-3 mr-1" />
                    DentiPay Verified
                  </Badge>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};