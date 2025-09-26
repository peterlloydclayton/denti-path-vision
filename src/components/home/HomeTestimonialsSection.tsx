import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { AnimatedText } from '@/components/ui/animated-text';
import { ScrollReveal } from '@/components/ui/enhanced-animations';
import { ProgressiveImage } from '@/components/ui/micro-interactions';
import { Star, Quote } from 'lucide-react';
import teamImage from '@/assets/dental-team.jpg';

export const HomeTestimonialsSection = () => {
  const testimonials = [
    {
      quote: "DentiPay transformed our practice. Patient acceptance rates increased 300% and we get paid the same day.",
      author: "Dr. Sarah Mitchell, DDS",
      specialty: "Cosmetic & Restorative Dentistry"
    },
    {
      quote: "The AI actually understands dental procedures. Approvals that used to take weeks now happen instantly.",
      author: "Dr. Michael Chen, DDS", 
      specialty: "Oral Surgery Specialist"
    }
  ];

  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal className="text-center mb-16">
          <AnimatedText>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Trusted by Leading Dental Professionals Nationwide
            </h2>
          </AnimatedText>
        </ScrollReveal>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <ScrollReveal>
            <ProgressiveImage 
              src={teamImage} 
              alt="Professional dental team" 
              className="rounded-2xl shadow-2xl w-full aspect-[4/3]"
            />
          </ScrollReveal>
          
          <ScrollReveal>
            <div className="space-y-8">
              {testimonials.map((testimonial, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2 }}
                  whileHover={{ scale: 1.02 }}
                >
                  <Card className="border-border bg-surface p-6 hover:shadow-elegant transition-all duration-300">
                    <div className="flex mb-4">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-accent-peach text-accent-peach" />
                      ))}
                    </div>
                    <Quote className="h-8 w-8 text-accent-blue mb-4" />
                    <p className="text-muted-foreground mb-4 italic">
                      "{testimonial.quote}"
                    </p>
                    <div>
                      <div className="font-semibold text-foreground">{testimonial.author}</div>
                      <div className="text-sm text-muted-foreground">{testimonial.specialty}</div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};