import { Users } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { ParallaxSection } from '@/components/ui/parallax-section';
import { AnimatedText } from '@/components/ui/animated-text';
import { patientStories } from '@/data/patientsData';
import { useEffect, useRef } from 'react';

export const PatientStoriesSection = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    if (!scrollContainer) return;

    const scrollSpeed = 0.5; // pixels per frame
    let animationFrameId: number;

    const scroll = () => {
      if (scrollContainer) {
        scrollContainer.scrollTop += scrollSpeed;
        
        // Reset scroll when we've scrolled past the first set of stories
        const maxScroll = scrollContainer.scrollHeight / 2;
        if (scrollContainer.scrollTop >= maxScroll) {
          scrollContainer.scrollTop = 0;
        }
        
        animationFrameId = requestAnimationFrame(scroll);
      }
    };

    // Start scrolling after a small delay
    const startScrolling = setTimeout(() => {
      animationFrameId = requestAnimationFrame(scroll);
    }, 2000);

    return () => {
      clearTimeout(startScrolling);
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, []);

  // Create duplicated stories for seamless looping
  const duplicatedStories = [...patientStories, ...patientStories];

  const StoryCard = ({ story, index }: { story: typeof patientStories[0], index: number }) => (
    <Card className="hover:shadow-elegant transition-smooth hover:-translate-y-1 mb-8 flex-shrink-0">
      <CardContent className="p-8">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-16 h-16 rounded-full bg-dental-peach/30 flex items-center justify-center">
            <Users className="text-dental-peach" size={24} />
          </div>
          <div>
            <h3 className="font-bold text-lg">{story.name}</h3>
            <p className="text-muted-foreground">{story.subtitle}</p>
          </div>
        </div>
        
        <blockquote className="text-lg italic mb-4">
          "{story.quote}"
        </blockquote>
        
        <div className="border-t pt-4">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Treatment:</span>
            <span className="font-semibold">{story.treatment}</span>
          </div>
          <div className="flex justify-between text-sm mt-1">
            <span className="text-muted-foreground">Payment:</span>
            <span className="font-semibold text-dental-blue-custom">{story.payment}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <ParallaxSection className="py-24 bg-gradient-subtle" offset={30}>
      <div className="container mx-auto px-6">
        <AnimatedText className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            What patients are saying
          </h2>
        </AnimatedText>

        <div className="max-w-4xl mx-auto">
          <div 
            ref={scrollContainerRef}
            className="h-[600px] overflow-hidden scroll-smooth"
            style={{ scrollBehavior: 'auto' }}
          >
            <div className="space-y-0">
              {duplicatedStories.map((story, index) => (
                <StoryCard key={`${story.name}-${index}`} story={story} index={index} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </ParallaxSection>
  );
};