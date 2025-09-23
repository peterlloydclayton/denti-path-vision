import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Star, CheckCircle, Quote } from 'lucide-react';
import { AnimatedText } from '@/components/ui/animated-text';
import { StaggerContainer, StaggerItem } from '@/components/ui/enhanced-animations';

export const TestimonialsSection = () => {
  const testimonials = [
    {
      quote: "DentiPay transformed our practice. We went from 40% approval rates to 94% overnight. The intelligence behind SCOPE understands dental care in ways traditional financing never could.",
      name: "Dr. Sarah Mitchell",
      specialty: "Cosmetic & Restorative Dentistry",
      metric: "$180K additional annual revenue",
      rating: "4.9/5",
      color: "dental-blue"
    },
    {
      quote: "The Echo AI integration has revolutionized how we discuss treatment options. Patients feel confident about financing before we even finish the consultation.",
      name: "Dr. Michael Chen",
      specialty: "Oral Surgery",
      metric: "65% faster treatment acceptance",
      rating: "5.0/5",
      color: "success"
    },
    {
      quote: "PATH's instant approvals have eliminated the anxiety around financing discussions. Our patients trust the process because it actually works for dental care.",
      name: "Dr. Jennifer Rodriguez",
      specialty: "Family Dentistry",
      metric: "40% increase in case acceptance",
      rating: "4.8/5", 
      color: "dental-blue-dark"
    }
  ];

  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-6">
        <AnimatedText className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Join 1,200+ DentiPay-Enabled Providers
          </h2>
          <p className="text-xl text-muted-foreground">
            Real results from dental professionals who've transformed their practices with intelligence.
          </p>
        </AnimatedText>

        <StaggerContainer>
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <StaggerItem key={index}>
                <motion.div
                  whileHover={{ y: -8, scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                  className="h-full"
                >
                  <Card className={`hover:shadow-elegant transition-all duration-300 border-${testimonial.color}/20 hover:border-${testimonial.color} h-full group`}>
                    <CardContent className="p-8 h-full flex flex-col">
                      {/* Quote Icon */}
                      <motion.div 
                        className={`w-12 h-12 bg-${testimonial.color}/10 rounded-full flex items-center justify-center mb-4 group-hover:bg-${testimonial.color}/20 transition-colors duration-300`}
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        transition={{ duration: 0.2 }}
                      >
                        <Quote className={`w-6 h-6 text-${testimonial.color}`} />
                      </motion.div>

                      {/* Rating */}
                      <div className="flex items-center gap-1 mb-4">
                        {[...Array(5)].map((_, i) => (
                          <motion.div
                            key={i}
                            initial={{ opacity: 0, scale: 0 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: i * 0.1 }}
                          >
                            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                          </motion.div>
                        ))}
                        <span className="ml-2 text-sm text-muted-foreground font-medium">{testimonial.rating}</span>
                      </div>
                      
                      {/* Quote */}
                      <motion.blockquote 
                        className="text-sm mb-6 italic text-foreground/80 flex-grow group-hover:text-foreground transition-colors duration-300"
                        whileHover={{ x: 2 }}
                        transition={{ duration: 0.2 }}
                      >
                        "{testimonial.quote}"
                      </motion.blockquote>
                      
                      {/* Author Info */}
                      <motion.div 
                        className="border-t pt-4"
                        whileHover={{ x: 4 }}
                        transition={{ duration: 0.2 }}
                      >
                        <div className="font-semibold text-foreground group-hover:text-dental-blue-dark transition-colors duration-300">
                          {testimonial.name}
                        </div>
                        <div className="text-sm text-muted-foreground mb-3">{testimonial.specialty}</div>
                        
                        {/* Metric */}
                        <motion.div 
                          className={`text-sm font-medium text-${testimonial.color} mb-3 group-hover:scale-105 transition-transform duration-300`}
                          whileHover={{ scale: 1.05 }}
                        >
                          {testimonial.metric}
                        </motion.div>
                        
                        {/* Badge */}
                        <motion.div
                          whileHover={{ scale: 1.05 }}
                          transition={{ duration: 0.2 }}
                        >
                          <Badge 
                            variant="outline" 
                            className={`border-${testimonial.color} text-${testimonial.color} hover:bg-${testimonial.color}/10 transition-colors duration-300`}
                          >
                            <CheckCircle className="w-3 h-3 mr-1" />
                            DentiPay Verified
                          </Badge>
                        </motion.div>
                      </motion.div>
                    </CardContent>
                  </Card>
                </motion.div>
              </StaggerItem>
            ))}
          </div>
        </StaggerContainer>
      </div>
    </section>
  );
};