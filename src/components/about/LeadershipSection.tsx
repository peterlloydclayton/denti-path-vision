import { Card, CardContent } from '@/components/ui/card';
import { ParallaxSection } from '@/components/ui/parallax-section';
import { AnimatedText } from '@/components/ui/animated-text';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import jayOku from '@/assets/profiles/jay-oku.png';
import donaldThorne from '@/assets/profiles/donald-thorne.png';
import nuttalyaReussi from '@/assets/profiles/nuttalya-reussi.png';
import michaelWeydemuller from '@/assets/profiles/michael-weydemuller.png';
import colinDedely from '@/assets/profiles/colin-dedely.png';
import peterClayton from '@/assets/profiles/peter-clayton.jpg';
import { useTranslation } from 'react-i18next';

export const LeadershipSection = () => {
  const { t } = useTranslation('marketing');
  const navigate = useNavigate();
  const leaders = [
    {
      name: t('about.leadership.bios.jayOku.name'),
      role: t('about.leadership.bios.jayOku.role'),
      color: 'dental-blue',
      description: t('about.leadership.bios.jayOku.description'),
      image: jayOku
    },
    {
      name: t('about.leadership.bios.donaldThorne.name'),
      role: t('about.leadership.bios.donaldThorne.role'),
      color: 'intelligence',
      description: t('about.leadership.bios.donaldThorne.description'),
      image: donaldThorne
    },
    {
      name: t('about.leadership.bios.nuttalyaReussi.name'),
      role: t('about.leadership.bios.nuttalyaReussi.role'),
      color: 'dental-lavender',
      description: t('about.leadership.bios.nuttalyaReussi.description'),
      image: nuttalyaReussi
    },
    {
      name: t('about.leadership.bios.michaelWeydemuller.name'),
      role: t('about.leadership.bios.michaelWeydemuller.role'),
      color: 'dental-green',
      description: t('about.leadership.bios.michaelWeydemuller.description'),
      image: michaelWeydemuller
    },
    {
      name: t('about.leadership.bios.colinDedely.name'),
      role: t('about.leadership.bios.colinDedely.role'),
      color: 'dental-peach',
      description: t('about.leadership.bios.colinDedely.description'),
      image: colinDedely
    },
    {
      name: t('about.leadership.bios.peterClayton.name'),
      role: t('about.leadership.bios.peterClayton.role'),
      color: 'dental-blue',
      description: t('about.leadership.bios.peterClayton.description'),
      image: peterClayton
    }
  ];

  return (
    <ParallaxSection className="py-24 bg-gradient-subtle" offset={30}>
      <div className="container mx-auto px-6">
        <AnimatedText className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-black">
            {t('about.leadership.title')}
          </h2>
          <p className="text-xl text-black max-w-4xl mx-auto">
            {t('about.leadership.subtitle')}
          </p>
        </AnimatedText>

        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8">
            {leaders.map((leader, index) => (
              <AnimatedText key={index} delay={index * 0.1}>
                <Card className="shadow-elegant hover:shadow-elegant transition-smooth hover:-translate-y-1 h-full">
                  <CardContent className="p-8">
                    <div className="flex flex-col items-center text-center mb-6">
                      <img 
                        src={leader.image} 
                        alt={leader.name}
                        className="w-48 h-48 object-cover object-top rounded-full ring-4 ring-primary/20 mb-6"
                        style={{ objectPosition: leader.name === 'Peter Clayton' ? '50% 20%' : 'center top' }}
                      />
                      <h3 className="text-2xl font-bold mb-2 text-black">{leader.name}</h3>
                      <p className="text-lg font-medium text-black">{leader.role}</p>
                    </div>
                    
                    <p className="text-muted-foreground leading-relaxed">
                      {leader.description}
                    </p>
                  </CardContent>
                </Card>
              </AnimatedText>
            ))}
          </div>
          
          {/* Buttons below bios */}
          <div className="flex gap-4 justify-center mt-12">
            <Button 
              onClick={() => navigate('/patients')}
              className="px-8 py-6 text-lg bg-black text-white hover:bg-black/90"
            >
              {t('about.leadership.forPatients')}
            </Button>
            <Button 
              onClick={() => navigate('/providers')}
              className="px-8 py-6 text-lg bg-white text-black border-2 border-black hover:bg-black/5"
            >
              {t('about.leadership.forProviders')}
            </Button>
          </div>
        </div>
      </div>
    </ParallaxSection>
  );
};