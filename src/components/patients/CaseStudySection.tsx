import { AnimatedText } from '@/components/ui/animated-text';
import { Button } from '@/components/ui/button';
import { Play } from 'lucide-react';
import { useState } from 'react';
import caseStudyImage from '@/assets/case-study-patient.jpg';

export const CaseStudySection = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  
  const handlePlayClick = () => {
    setIsPlaying(true);
  };

  const getEmbedUrl = (url: string) => {
    const videoId = url.includes('youtu.be/') 
      ? url.split('youtu.be/')[1].split('?')[0]
      : url.split('v=')[1]?.split('&')[0];
    return `https://www.youtube.com/embed/${videoId}?autoplay=1`;
  };

  return (
    <section className="py-20 bg-gradient-to-br from-background via-secondary/10 to-background">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <AnimatedText>
              <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-6">
                Real Patients, Real Providers, Real Smiles
              </h2>
            </AnimatedText>
            <AnimatedText delay={0.2}>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                How DentiPay covered thousands for dental care.
              </p>
            </AnimatedText>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="relative aspect-video rounded-2xl overflow-hidden shadow-2xl group cursor-pointer">
              {!isPlaying ? (
                <div 
                  className="relative w-full h-full"
                  onClick={handlePlayClick}
                >
                  <img 
                    src={caseStudyImage} 
                    alt="Happy dental patient case study"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-all duration-300" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Button 
                      size="lg" 
                      className="w-20 h-20 rounded-full bg-white/90 hover:bg-white text-primary hover:text-primary shadow-xl transform group-hover:scale-110 transition-all duration-300"
                    >
                      <Play size={32} fill="currentColor" className="ml-1" />
                    </Button>
                  </div>
                </div>
              ) : (
                <iframe
                  src={getEmbedUrl("https://youtu.be/S9DOZEmf9f4?si=ZSIIRlaWhY8cV_ll")}
                  title="DentiPay Case Study"
                  className="w-full h-full"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};