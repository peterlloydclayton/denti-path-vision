import { Play, Video } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

interface VideoSectionProps {
  title?: string;
  description?: string;
  placeholder?: boolean;
  aspectRatio?: 'video' | 'square' | 'wide';
  accent?: 'blue' | 'peach' | 'lavender' | 'green';
  className?: string;
}

export const VideoSection = ({ 
  title = "Video Title",
  description = "Video description goes here", 
  placeholder = true,
  aspectRatio = 'video',
  accent = 'blue',
  className = ''
}: VideoSectionProps) => {
  const aspectClasses = {
    video: 'aspect-video',
    square: 'aspect-square',
    wide: 'aspect-[21/9]'
  };

  const accentClasses = {
    blue: 'shadow-elegant hover:shadow-elegant',
    peach: 'shadow-peach hover:shadow-peach', 
    lavender: 'shadow-lavender hover:shadow-lavender',
    green: 'shadow-green hover:shadow-green'
  };

  const iconColors = {
    blue: 'text-dental-blue',
    peach: 'text-dental-peach',
    lavender: 'text-dental-lavender', 
    green: 'text-dental-green'
  };

  return (
    <div className={`space-y-4 ${className}`}>
      {placeholder ? (
        <Card className={`
          ${aspectClasses[aspectRatio]} 
          bg-muted border-2 border-dashed border-border 
          flex flex-col items-center justify-center 
          hover:bg-card-hover transition-smooth cursor-pointer
          ${accentClasses[accent]}
        `}>
          <div className={`w-16 h-16 rounded-full bg-background border-2 border-border flex items-center justify-center mb-4 ${iconColors[accent]}`}>
            <Play size={24} fill="currentColor" />
          </div>
          <Video size={20} className="text-muted-foreground mb-2" />
          <p className="text-sm text-muted-foreground text-center px-4">
            Video placeholder - Click to play
          </p>
        </Card>
      ) : (
        <div className={`${aspectClasses[aspectRatio]} bg-card rounded-2xl overflow-hidden ${accentClasses[accent]}`}>
          {/* Actual video would go here */}
          <div className="w-full h-full bg-muted flex items-center justify-center">
            <Button size="lg" className="rounded-full w-16 h-16 p-0">
              <Play size={24} fill="currentColor" />
            </Button>
          </div>
        </div>
      )}
      
      {title && (
        <div className="space-y-2">
          <h3 className="text-lg font-semibold">{title}</h3>
          {description && (
            <p className="text-muted-foreground">{description}</p>
          )}
        </div>
      )}
    </div>
  );
};