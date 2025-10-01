import { Card, CardContent } from '@/components/ui/card';
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
import adamZuckerman from '@/assets/profiles/adam-zuckerman.png';
import charlesZahedi from '@/assets/profiles/charles-zahedi.png';
import emilioArguello from '@/assets/profiles/emilio-arguello.jpg';
import drCarmy from '@/assets/profiles/dr-carmy.jpeg';

export const FoundersSection = () => {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [isLandscape, setIsLandscape] = useState(false);

  const onSelect = useCallback((api: CarouselApi) => {
    if (!api) return;
    setCurrent(api.selectedScrollSnap());
  }, []);

  useEffect(() => {
    const checkLandscape = () => {
      setIsLandscape(window.innerWidth >= 1024); // lg breakpoint
    };
    
    checkLandscape();
    window.addEventListener('resize', checkLandscape);
    
    return () => window.removeEventListener('resize', checkLandscape);
  }, []);

  useEffect(() => {
    if (!api) return;
    
    onSelect(api);
    api.on('select', () => onSelect(api));
    
    return () => {
      api.off('select', () => onSelect(api));
    };
  }, [api, onSelect]);

  const founders = [
    {
      name: 'Adam Zuckerman',
      role: 'Founder/CEO',
      description: 'Adam Zuckerman is the Founder and CEO of DentiPay, an AI-powered behavioral financing platform revolutionizing patient approvals and provider profitability. A proven fintech innovator and strategic operator, Adam specializes in building high-growth ventures at the intersection of AI, finance, and healthcare. His leadership has consistently driven rapid expansion and strategic partnerships across multiple ventures in these sectors.',
      image: adamZuckerman
    },
    {
      name: 'Dr. Charles Zahédi',
      role: 'Co-Founder',
      description: 'Dr. Charles Zahédi is an accomplished clinician, innovator, and business strategist with over 34 years of experience in dentistry and healthcare systems. After earning his dental degree, he built a reputation for developing advanced treatment protocols and scalable care delivery models that improve patient outcomes while expanding access to care. Throughout his career, Dr. Zahédi has combined clinical expertise with a passion for innovation, integrating technologies like AI-driven treatment planning, in-house lab workflows, and patient-friendly financing models. He has served diverse patient populations, with a focus on underserved and aging communities, and has trained teams to deliver care at scale without sacrificing quality. Dr. Zahédi\'s work reflects a lifelong commitment to transforming dental care by bridging the gap between clinical excellence, patient affordability, and operational efficiency.',
      image: charlesZahedi
    },
    {
      name: 'Dr. Emilio Argüello',
      role: 'Co-Founder',
      description: 'Dr. Emilio Argüello was born and raised in Mexico City. After graduating from dental school at the Universidad Autónoma Metropolitana, he moved to the U.S. in 1998 following time abroad as a competitive fencer. He earned his dental degree and specialty training in Periodontics at Tufts University and is now a Board-Certified Periodontist. For nearly 20 years, Dr. Argüello has served as core faculty and researcher at Harvard University, co-authoring textbooks and numerous peer-reviewed publications. Over the last 15 years, he has built and transitioned multiple dental companies, advised leading organizations, and served on academic and industry boards. Most recently, he co-founded Mexico Dental Implants, delivering advanced oral rehabilitation services to international patients across certified clinics in Mexico. He also maintains a private practice at Altura Periodontics in Denver, while his wife, Dr. Caitlin White, practices at Foundations Orthodontics.',
      image: emilioArguello
    },
    {
      name: 'Dr. Carmy Michael',
      role: 'Co-Founder',
      description: 'Dr. Carmy Michael began his dental career in 1993 at Cairo University, completing a one-year residency before relocating to Canada. He later earned his Doctor of Dental Surgery (DDS) from the University of Western Ontario – Schulich School of Medicine & Dentistry, followed by a six-month clinical residency focused on oral rehabilitation and sedation dentistry. With over 20 years of advanced training in implantology, digital workflow, and full-arch restoration, Dr. Michael is certified in oral and IV conscious sedation. He holds a Fellowship with the Global Dental Implant Academy (GDIA) and is an active member of the Academy of Osseointegration (AO), ICOI, and other leading implantology and surgical societies. In addition to co-founding the OC Surgical Institute, Dr. Michael leads a high-volume private practice in Southern California focused on full-arch procedures, complex grafting, and advanced oral rehabilitation. He now works closely with DentiPay\'s SCOPE AI platform, integrating surgical intelligence, real-time patient approvals, and precision case planning to transform how care is delivered.',
      image: drCarmy
    }
  ];

  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-6">
        <AnimatedText className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-black">
            Founder's Circle: From Vision to Velocity
          </h2>
          <p className="text-xl text-black max-w-4xl mx-auto">
            Breaking Barriers in Innovation, Access, and Profitability
          </p>
        </AnimatedText>

        {/* Desktop Carousel (landscape) */}
        <div className="hidden lg:block relative max-w-6xl mx-auto py-12">
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
              <CarouselContent className="-ml-4 py-8">
                {founders.map((founder, index) => (
                  <CarouselItem key={index} className="pl-4 basis-1/2 lg:basis-1/3">
                    <Card className="hover:shadow-elegant transition-all duration-500 hover:-translate-y-1 relative shadow-lg">
                      <CardContent className="p-8">
                        <div className="flex flex-col items-center text-center mb-6">
                          <img 
                            src={founder.image} 
                            alt={founder.name}
                            className="w-64 h-80 object-cover rounded-lg ring-4 ring-primary/20 mb-6"
                          />
                          <h3 className="text-2xl font-bold mb-2 text-black">{founder.name}</h3>
                          <p className="text-lg font-medium text-black mb-4">{founder.role}</p>
                        </div>
                        <p className="text-muted-foreground leading-relaxed text-sm">
                          {founder.description}
                        </p>
                      </CardContent>
                    </Card>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="z-30" />
              <CarouselNext className="z-30" />
            </Carousel>
          </AnimatedText>
        </div>

        {/* Mobile/Tablet Grid (portrait) */}
        <div className="lg:hidden max-w-4xl mx-auto">
          <div className="grid sm:grid-cols-2 gap-8">
            {founders.map((founder, index) => (
              <AnimatedText key={index} delay={0.1 * index}>
                <Card className="shadow-elegant hover:shadow-elegant transition-smooth hover:-translate-y-1 h-full">
                  <CardContent className="p-8">
                    <div className="flex flex-col items-center text-center mb-6">
                      <img 
                        src={founder.image} 
                        alt={founder.name}
                        className="w-64 h-80 object-cover rounded-lg ring-4 ring-primary/20 mb-6"
                      />
                      <h3 className="text-2xl font-bold mb-2 text-black">{founder.name}</h3>
                      <p className="text-lg font-medium text-black">{founder.role}</p>
                    </div>
                    <p className="text-muted-foreground leading-relaxed">
                      {founder.description}
                    </p>
                  </CardContent>
                </Card>
              </AnimatedText>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
