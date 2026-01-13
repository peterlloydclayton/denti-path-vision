import { AnimatedText } from '@/components/ui/animated-text';
import { Button } from '@/components/ui/button';
import { Play } from 'lucide-react';
import { useState, useEffect } from 'react';

export const HowItWorksSection = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 100);

    return () => {
      clearTimeout(timer);
    };
  }, []);
  
  const handlePlayClick = () => {
    setIsPlaying(true);
  };

  const getVimeoEmbedUrl = (url: string) => {
    // Extract Vimeo video ID from URL
    const match = url.match(/vimeo\.com\/(\d+)/);
    const videoId = match ? match[1] : '';
    return `https://player.vimeo.com/video/${videoId}?autoplay=1&title=0&byline=0&portrait=0`;
  };

  return (
    <section className="py-20 bg-gradient-to-br from-background via-secondary/10 to-background">
      <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto">
          <div className="bg-card/80 backdrop-blur-sm rounded-3xl overflow-hidden shadow-2xl border border-border/50">
            <div className="grid lg:grid-cols-2 min-h-[600px]">
              {/* Video Side */}
              <div className="relative group cursor-pointer order-1 lg:order-1">
                {!isPlaying ? (
                  <div 
                    className="relative w-full h-full min-h-[400px] lg:min-h-full"
                    onClick={handlePlayClick}
                  >
                    <img 
                      src="https://res.cloudinary.com/drxvhwze4/image/upload/v1759199955/dental-network-community_gdikrs.png" 
                      alt="DentiPay Trinity System"
                      className={`w-full h-full object-cover transition-opacity duration-700 ${isLoaded ? 'opacity-100 animate-fade-in' : 'opacity-0'}`}
                      style={{ objectPosition: '50% center' }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-black/40 group-hover:from-primary/30 group-hover:to-black/50 transition-all duration-500" />
                    
                    {/* Play Button */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="relative">
                        <div className="absolute inset-0 bg-white/20 rounded-full animate-ping scale-150"></div>
                        <Button 
                          size="lg" 
                          className="relative w-24 h-24 rounded-full bg-dental-blue hover:bg-dental-blue/90 text-dental-blue-dark hover:text-dental-blue-dark shadow-2xl transform group-hover:scale-110 transition-all duration-300 border-4 border-dental-blue/50"
                        >
                          <Play size={36} fill="currentColor" className="ml-1" />
                        </Button>
                      </div>
                    </div>

                    {/* Bottom Overlay Text */}
                    <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-black/80 via-black/40 to-transparent">
                      <div className="text-white">
                        <p className="text-sm opacity-90 mb-2">Watch Video</p>
                        <h3 className="text-lg font-semibold">See the Trinity in Action</h3>
                      </div>
                    </div>
                  </div>
                ) : (
                  <iframe
                    src={getVimeoEmbedUrl("https://vimeo.com/1154002963")}
                    title="How DentiPay Works"
                    className="w-full h-full min-h-[400px] lg:min-h-full"
                    frameBorder="0"
                    allow="autoplay; fullscreen; picture-in-picture"
                    allowFullScreen
                  />
                )}
              </div>

              {/* Text Content Side */}
              <div className="flex flex-col justify-center p-8 lg:p-12 bg-gradient-to-br from-primary/5 via-transparent to-secondary/10 order-2 lg:order-2">
                <AnimatedText>
                  <div className="space-y-6">
                    <div className="inline-flex items-center px-4 py-2 rounded-full bg-dental-blue text-dental-blue-dark text-sm font-medium">
                      Service Overview
                    </div>
                    <h2 className="text-4xl lg:text-5xl font-bold text-foreground leading-tight">
                      How It Works
                    </h2>
                    <p className="text-xl text-muted-foreground leading-relaxed">
                      From patient intake to case funding—we handle the entire financing journey so you can focus on delivering exceptional care.
                    </p>
                    <div className="flex items-center gap-4 pt-4">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                        Watch the 2-min overview
                      </div>
                    </div>
                    <div className="flex justify-center md:justify-end mt-6 px-6 md:mr-4">
                      <Button className="bg-black text-white hover:bg-black/90 rounded-full px-10 py-4 md:px-8 md:py-3 text-base font-medium">
                        Get Started
                      </Button>
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
