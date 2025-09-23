import { Button } from '@/components/ui/button';
import { Play } from 'lucide-react';

export const VideoSection = () => {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Personalized Video For Practitioners</h2>
        </div>
        
        <div className="relative max-w-4xl mx-auto">
          <div className="aspect-video bg-card rounded-2xl shadow-elegant overflow-hidden group cursor-pointer">
            <div className="relative h-full bg-muted flex items-center justify-center">
              <div className="absolute inset-0 bg-black/50"></div>
              <Button 
                size="lg" 
                className="relative z-10 bg-white/20 hover:bg-white/30 border border-white/40 text-white rounded-full p-6 group-hover:scale-110 transition-transform"
              >
                <Play className="w-8 h-8" fill="currentColor" />
              </Button>
            </div>
          </div>
          
          <p className="text-center mt-6 text-lg text-muted-foreground">
            AI-Powered Behavioural Financing - Intelligence that Drives Approvals
          </p>
        </div>
      </div>
    </section>
  );
};