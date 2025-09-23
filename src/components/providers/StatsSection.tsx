import { AnimatedCounter } from './AnimatedCounter';

export const StatsSection = () => {
  return (
    <section className="py-16 bg-background border-b">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div>
            <div className="text-4xl md:text-5xl font-bold text-navy mb-2">
              <AnimatedCounter value={94} suffix="%" />
            </div>
            <div className="text-muted-foreground">Approval Accuracy</div>
          </div>
          <div>
            <div className="text-4xl md:text-5xl font-bold text-navy mb-2">
              <AnimatedCounter value={40} suffix="%" />
            </div>
            <div className="text-muted-foreground">Higher Acceptance</div>
          </div>
          <div>
            <div className="text-4xl md:text-5xl font-bold text-navy mb-2">
              <AnimatedCounter value={30} prefix="<" suffix="s" />
            </div>
            <div className="text-muted-foreground">Decision Speed</div>
          </div>
          <div>
            <div className="text-4xl md:text-5xl font-bold text-navy mb-2">
              <AnimatedCounter value={1200} suffix="+" />
            </div>
            <div className="text-muted-foreground">Active Providers</div>
          </div>
        </div>
      </div>
    </section>
  );
};