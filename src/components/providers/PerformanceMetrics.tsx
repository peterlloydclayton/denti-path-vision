import { AnimatedCounter } from './AnimatedCounter';

export const PerformanceMetrics = () => {
  return (
    <section className="py-24 bg-primary">
      <div className="container mx-auto px-6 text-center">
        {/* Row 1 - Performance Impact */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-12 text-foreground">Performance Impact</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-5xl md:text-6xl font-bold mb-2 text-navy">
                <AnimatedCounter value={87} suffix="%" />
              </div>
              <div className="text-xl text-muted-foreground">Patient Confidence Improvement</div>
            </div>
            <div className="text-center">
              <div className="text-5xl md:text-6xl font-bold mb-2 text-navy">
                <AnimatedCounter value={23} suffix="%" />
              </div>
              <div className="text-xl text-muted-foreground">Revenue Increase</div>
            </div>
            <div className="text-center">
              <div className="text-5xl md:text-6xl font-bold mb-2 text-navy">
                <AnimatedCounter value={4.5} suffix="hrs" />
              </div>
              <div className="text-xl text-muted-foreground">Daily Time Savings</div>
            </div>
          </div>
        </div>

        {/* Row 2 - Aggregate Network Results */}
        <div>
          <h3 className="text-2xl font-bold mb-8 text-foreground">Aggregate Network Results</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold mb-1 text-navy">
                <AnimatedCounter value={95} suffix="%" />
              </div>
              <div className="text-sm text-muted-foreground">Approval Rate</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold mb-1 text-navy">
                <AnimatedCounter value={300} suffix="%" />
              </div>
              <div className="text-sm text-muted-foreground">Revenue Increase</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold mb-1 text-navy">
                <AnimatedCounter value={10000} suffix="+" />
              </div>
              <div className="text-sm text-muted-foreground">Happy Practices</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold mb-1 text-navy">4.9/5</div>
              <div className="text-sm text-muted-foreground">Provider Rating</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};