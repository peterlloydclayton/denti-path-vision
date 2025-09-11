import { motion } from 'framer-motion';
import { Search, Heart, CreditCard, Clock, Shield, MapPin, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ParallaxSection } from '@/components/ui/parallax-section';
import { AnimatedText } from '@/components/ui/animated-text';
import { Link } from 'react-router-dom';
import patientImage from '@/assets/happy-patient.jpg';

const Patients = () => {
  const benefits = [
    {
      icon: CreditCard,
      title: 'Flexible Payment Plans',
      description: 'Choose from multiple financing options that fit your budget and lifestyle'
    },
    {
      icon: Clock,
      title: 'Instant Approval',
      description: 'Get approved in seconds, not days. Start your treatment immediately'
    },
    {
      icon: Shield,
      title: 'No Hidden Fees',
      description: 'Transparent pricing with no surprise charges or hidden costs'
    },
    {
      icon: Heart,
      title: 'Better Oral Health',
      description: 'Get the dental care you deserve without compromising on quality'
    }
  ];

  const sampleProviders = [
    {
      name: 'Dr. Sarah Martinez',
      specialty: 'Cosmetic Dentistry',
      location: 'Beverly Hills, CA',
      rating: 4.9,
      reviews: 247,
      image: '/placeholder-dentist-1.jpg'
    },
    {
      name: 'Dr. Michael Chen',
      specialty: 'Orthodontics',
      location: 'Austin, TX',
      rating: 4.8,
      reviews: 189,
      image: '/placeholder-dentist-2.jpg'
    },
    {
      name: 'Dr. Emily Rodriguez',
      specialty: 'General Dentistry',
      location: 'Miami, FL',
      rating: 4.9,
      reviews: 312,
      image: '/placeholder-dentist-3.jpg'
    }
  ];

  return (
    <div className="pt-24">
      {/* Hero Section */}
      <section className="py-24 bg-background">
        {/* Hero Image Background */}
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-5"
          style={{ backgroundImage: `url(${patientImage})` }}
        />
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <AnimatedText>
              <h1 className="text-hero-mobile md:text-hero font-bold mb-6">
                The Smile You{' '}
                <span className="relative">
                  Deserve
                  <div className="absolute bottom-0 left-0 w-full h-1 bg-dental-peach rounded-full"></div>
                </span>{' '}
                is Within Reach
              </h1>
            </AnimatedText>
            
            <AnimatedText delay={0.2}>
              <p className="text-xl md:text-2xl mb-8 text-muted-foreground leading-relaxed">
                Find trusted dental providers and get instant financing approval 
                for the treatment you need, when you need it
              </p>
            </AnimatedText>

            <AnimatedText delay={0.4}>
              <div className="max-w-md mx-auto mb-8">
                <div className="relative">
                  <Input
                    placeholder="Enter your zip code or city..."
                    className="h-14 pl-12 pr-4 text-lg bg-background text-primary border-2 border-dental-blue/20 focus:border-dental-blue"
                  />
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={20} />
                </div>
                <Button className="w-full mt-4 h-14 text-lg bg-primary hover:bg-primary/90 shadow-elegant">
                  Find Providers Near You
                </Button>
              </div>
            </AnimatedText>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <ParallaxSection className="py-24 bg-background" offset={30}>
        <div className="container mx-auto px-6">
          <AnimatedText className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Why Patients Love DentiPay
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Experience the easiest way to finance your dental care with 
              our patient-first approach to healthcare financing
            </p>
          </AnimatedText>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <AnimatedText key={index} delay={index * 0.1}>
                  <Card className="text-center hover:shadow-soft transition-smooth hover:-translate-y-1 h-full">
                    <CardContent className="p-6">
                      <div className="w-16 h-16 rounded-2xl bg-dental-blue/10 flex items-center justify-center mx-auto mb-4">
                        <Icon size={32} className="text-dental-blue" />
                      </div>
                      <h3 className="text-xl font-bold mb-3">{benefit.title}</h3>
                      <p className="text-muted-foreground">{benefit.description}</p>
                    </CardContent>
                  </Card>
                </AnimatedText>
              );
            })}
          </div>
        </div>
      </ParallaxSection>

      {/* Provider Search Preview */}
      <section className="py-24 bg-gradient-subtle">
        <div className="container mx-auto px-6">
          <AnimatedText className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Trusted Providers in Your Area
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Connect with vetted dental professionals who offer DentiPay financing
            </p>
          </AnimatedText>

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
                    
                    <div className="flex items-center gap-2 mb-4">
                      <Star size={16} className="text-dental-peach fill-current" />
                      <span className="font-semibold">{provider.rating}</span>
                      <span className="text-sm text-muted-foreground">({provider.reviews} reviews)</span>
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
            <Button size="lg" variant="outline" className="text-lg px-8" asChild>
              <Link to="/provider-search">
                View All Providers in Your Area
              </Link>
            </Button>
          </AnimatedText>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-6">
          <AnimatedText className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Getting Started is Simple
            </h2>
          </AnimatedText>

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[
              { step: '1', title: 'Find Your Provider', desc: 'Search for dental providers near you who accept DentiPay' },
              { step: '2', title: 'Get Instant Approval', desc: 'Complete our simple application and get approved in seconds' },
              { step: '3', title: 'Start Treatment', desc: 'Begin your dental care immediately with flexible payment options' }
            ].map((item, index) => (
              <AnimatedText key={index} delay={index * 0.2}>
                <div className="text-center">
                  <div className="w-16 h-16 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                    {item.step}
                  </div>
                  <h3 className="text-2xl font-bold mb-3">{item.title}</h3>
                  <p className="text-muted-foreground">{item.desc}</p>
                </div>
              </AnimatedText>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-dental-blue/10">
        <div className="container mx-auto px-6 text-center">
          <AnimatedText>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Your Perfect Smile Awaits
            </h2>
            <p className="text-xl mb-8 text-muted-foreground max-w-2xl mx-auto">
              Don't let cost be a barrier to the dental care you deserve. 
              Find a provider and get approved today.
            </p>
            
            <Button
              size="lg"
              className="bg-primary text-primary-foreground hover:bg-primary/90 text-lg px-8 shadow-peach"
            >
              Find Providers Now
            </Button>
          </AnimatedText>
        </div>
      </section>
    </div>
  );
};

export default Patients;