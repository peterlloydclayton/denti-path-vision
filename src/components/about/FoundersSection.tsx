import { Card, CardContent } from '@/components/ui/card';
import { AnimatedText } from '@/components/ui/animated-text';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { useCallback, useEffect, useState } from 'react';
import { type CarouselApi } from '@/components/ui/carousel';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import adamZuckerman from '@/assets/profiles/adam-zuckerman.png';
import emilioArguello from '@/assets/profiles/emilio-arguello.jpg';
import drCarmy from '@/assets/profiles/dr-carmy.jpeg';
import { useTranslation } from 'react-i18next';

export const FoundersSection = () => {
  const { t } = useTranslation('marketing');
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [isLandscape, setIsLandscape] = useState(false);
  const [selectedFounder, setSelectedFounder] = useState<typeof founders[0] | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

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

  const openModal = (founder: typeof founders[0]) => {
    setSelectedFounder(founder);
    setIsModalOpen(true);
  };

  const founders = [
    {
      name: t('about.founders.bios.adamZuckerman.name'),
      role: t('about.founders.bios.adamZuckerman.role'),
      description: t('about.founders.bios.adamZuckerman.description'),
      image: adamZuckerman
    },
    {
      name: t('about.founders.bios.emilioArguello.name'),
      role: t('about.founders.bios.emilioArguello.role'),
      description: t('about.founders.bios.emilioArguello.description'),
      image: emilioArguello
    },
    {
      name: t('about.founders.bios.carmyMichael.name'),
      role: t('about.founders.bios.carmyMichael.role'),
      description: t('about.founders.bios.carmyMichael.description'),
      image: drCarmy
    }
  ];

  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-6">
        <AnimatedText className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-black">
            {t('about.founders.title')}
          </h2>
          <p className="text-xl text-black max-w-4xl mx-auto">
            {t('about.founders.subtitle')}
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
                        <p className="text-muted-foreground leading-relaxed text-sm line-clamp-6">
                          {founder.description}
                        </p>
                        <Button
                          variant="link"
                          onClick={() => openModal(founder)}
                          className="mt-2 text-black hover:text-black/80 font-semibold"
                        >
                          {t('about.founders.readMore')}
                        </Button>
                      </CardContent>
                    </Card>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="z-30 -left-4 h-12 w-12 bg-navy text-dental-blue hover:bg-navy/90 border-none">
                <ChevronLeft className="h-6 w-6" />
              </CarouselPrevious>
              <CarouselNext className="z-30 -right-4 h-12 w-12 bg-navy text-dental-blue hover:bg-navy/90 border-none">
                <ChevronRight className="h-6 w-6" />
              </CarouselNext>
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
                    <p className="text-muted-foreground leading-relaxed line-clamp-6">
                      {founder.description}
                    </p>
                    <Button
                      variant="link"
                      onClick={() => openModal(founder)}
                      className="mt-2 text-black hover:text-black/80 font-semibold"
                    >
                      {t('about.founders.readMore')}
                    </Button>
                  </CardContent>
                </Card>
              </AnimatedText>
            ))}
          </div>
        </div>

        {/* Modal for full profile */}
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
            {selectedFounder && (
              <>
                <DialogHeader>
                  <DialogTitle className="sr-only">{selectedFounder.name}</DialogTitle>
                </DialogHeader>
                <div className="flex flex-col items-center text-center">
                  <img 
                    src={selectedFounder.image} 
                    alt={selectedFounder.name}
                    className="w-64 h-80 object-cover rounded-lg ring-4 ring-primary/20 mb-6"
                  />
                  <h3 className="text-3xl font-bold mb-2 text-black">{selectedFounder.name}</h3>
                  <p className="text-xl font-medium text-black mb-6">{selectedFounder.role}</p>
                  <p className="text-muted-foreground leading-relaxed text-left">
                    {selectedFounder.description}
                  </p>
                </div>
              </>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </section>
  );
};
