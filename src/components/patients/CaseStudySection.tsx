import { AnimatedText } from '@/components/ui/animated-text';
import { Button } from '@/components/ui/button';
import { Play } from 'lucide-react';
import { useState, useEffect } from 'react';
import caseStudyImage from '@/assets/case-study-patient.jpg';

interface CaseStudySectionProps {
  imagePosition?: 'left' | 'right';
}

export const CaseStudySection = ({ imagePosition = 'left' }: CaseStudySectionProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [objectPosition, setObjectPosition] = useState('65% center');

  useEffect(() => {
    const updateObjectPosition = () => {
      if (window.innerWidth < 768) {
        setObjectPosition('75% center');
      } else if (window.innerWidth < 1024) {
        setObjectPosition('60% center');
      } else {
        setObjectPosition('65% center');
      }
    };

    updateObjectPosition();
    window.addEventListener('resize', updateObjectPosition);
    return () => window.removeEventListener('resize', updateObjectPosition);
  }, []);
  
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
        <div className="max-w-7xl mx-auto">
          <div className="bg-card/80 backdrop-blur-sm rounded-3xl overflow-hidden shadow-2xl border border-border/50">
            <div className="grid lg:grid-cols-2 min-h-[600px]">
              {/* Video/Image Side */}
              <div className={`relative group cursor-pointer ${imagePosition === 'right' ? 'lg:order-2' : ''}`}>
                {!isPlaying ? (
                  <div 
                    className="relative w-full h-full min-h-[400px] lg:min-h-full"
                    onClick={handlePlayClick}
                  >
                    <img 
                      src={caseStudyImage} 
                      alt="Happy dental patient case study"
                      className="w-full h-full object-cover"
                      style={{ objectPosition }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-black/40 group-hover:from-primary/30 group-hover:to-black/50 transition-all duration-500" />
                    
                    {/* Play Button */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="relative">
                        <div className="absolute inset-0 bg-white/20 rounded-full animate-ping scale-150"></div>
                        <Button 
                          size="lg" 
                          className="relative w-24 h-24 rounded-full bg-white/95 hover:bg-white text-primary hover:text-primary shadow-2xl transform group-hover:scale-110 transition-all duration-300 border-4 border-white/50"
                        >
                          <Play size={36} fill="currentColor" className="ml-1" />
                        </Button>
                      </div>
                    </div>

                    {/* Bottom Overlay Text */}
                    <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-black/80 via-black/40 to-transparent">
                      <div className="text-white">
                        <p className="text-sm opacity-90 mb-2">Featured Story</p>
                        <h3 className="text-lg font-semibold">How DentiPay covered thousands for dental care</h3>
                      </div>
                    </div>
                  </div>
                ) : (
                  <iframe
                    src={getEmbedUrl("https://youtu.be/S9DOZEmf9f4?si=ZSIIRlaWhY8cV_ll")}
                    title="DentiPay Case Study"
                    className="w-full h-full min-h-[400px] lg:min-h-full"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                  />
                )}
              </div>

              {/* Text Content Side */}
              <div className={`flex flex-col justify-center p-8 lg:p-12 bg-gradient-to-br from-primary/5 via-transparent to-secondary/10 ${imagePosition === 'right' ? 'lg:order-1' : ''}`}>
                <AnimatedText>
                  <div className="space-y-6">
                    <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium">
                      Case Study
                    </div>
                    <h2 className="text-4xl lg:text-5xl font-bold text-foreground leading-tight">
                      Real Patients.<br />
                      Real Providers.<br />
                      <span className="text-primary">Real Smiles.</span>
                    </h2>
                    <p className="text-xl text-muted-foreground leading-relaxed">
                      Discover how DentiPay has transformed dental care accessibility, 
                      covering thousands of patients and connecting them with trusted providers 
                      for life-changing treatments.
                    </p>
                    <div className="flex items-center gap-4 pt-4">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                        Watch Success Stories
                      </div>
                    </div>
                  </div>
                </AnimatedText>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};