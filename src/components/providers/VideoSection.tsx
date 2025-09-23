import { Button } from '@/components/ui/button';
import { Play } from 'lucide-react';

export const VideoSection = () => {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Intelligence that Drives Approvals</h2>
        </div>
        
        <div className="relative max-w-4xl mx-auto">
          <div className="aspect-video bg-card rounded-2xl shadow-elegant overflow-hidden">
            <iframe
              src="https://www.youtube.com/embed/ADNzL1ZH9Rw"
              title="Intelligence that Drives Approvals"
              className="w-full h-full"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          </div>
          
          <p className="text-center mt-6 text-lg text-muted-foreground">
            AI-Powered Behavioural Financing
          </p>
        </div>
      </div>
    </section>
  );
};