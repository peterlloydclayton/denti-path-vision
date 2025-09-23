import { Card, CardContent } from '@/components/ui/card';
import { Zap, Globe, Brain } from 'lucide-react';

export const TrinitySection = () => {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            One Brand. One Portal. One System.
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            The DentiPay Trinity: Brand leverage, patient portal, and intelligence engine working in perfect harmony.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 relative">
          {/* Connecting Lines */}
          <div className="hidden md:block absolute top-1/2 left-1/3 w-1/3 h-0.5 bg-border"></div>
          <div className="hidden md:block absolute top-1/2 right-1/3 w-1/3 h-0.5 bg-border"></div>

          {/* DentiPay Card */}
          <Card className="group hover:shadow-elegant hover:-translate-y-2 transition-all duration-300 border-navy/20">
            <CardContent className="p-8 text-center">
              <div className="w-16 h-16 bg-navy text-white rounded-xl flex items-center justify-center mx-auto mb-6">
                <Zap className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold mb-2 text-navy">DentiPay</h3>
              <p className="text-muted-foreground mb-4">Brand Layer</p>
              <ul className="space-y-2 text-sm mb-6">
                <li>• Trusted dental financing brand</li>
                <li>• Provider network leverage</li>
                <li>• Patient confidence builder</li>
              </ul>
              <blockquote className="text-sm italic text-muted-foreground border-l-4 border-navy pl-4">
                "The brand patients trust for dental financing"
              </blockquote>
            </CardContent>
          </Card>

          {/* PATH Card */}
          <Card className="group hover:shadow-elegant hover:-translate-y-2 transition-all duration-300 border-primary/50">
            <CardContent className="p-8 text-center">
              <div className="w-16 h-16 bg-primary text-foreground rounded-xl flex items-center justify-center mx-auto mb-6">
                <Globe className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold mb-2">PATH</h3>
              <p className="text-muted-foreground mb-4">Patient Portal</p>
              <ul className="space-y-2 text-sm mb-6">
                <li>• 94% approval accuracy</li>
                <li>• 30-second decisions</li>
                <li>• Seamless integration</li>
              </ul>
              <blockquote className="text-sm italic text-muted-foreground border-l-4 border-primary pl-4">
                "Instant financing decisions that work"
              </blockquote>
            </CardContent>
          </Card>

          {/* SCOPE Card */}
          <Card className="group hover:shadow-elegant hover:-translate-y-2 transition-all duration-300 border-success/50">
            <CardContent className="p-8 text-center">
              <div className="w-16 h-16 bg-success text-white rounded-xl flex items-center justify-center mx-auto mb-6">
                <Brain className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold mb-2 text-success">SCOPE</h3>
              <p className="text-muted-foreground mb-4">Intelligence Engine</p>
              <div className="space-y-3 text-sm mb-6">
                <div>
                  <strong>Clinical Triage:</strong> Treatment necessity analysis
                </div>
                <div>
                  <strong>Financial Engine:</strong> 30+ data point assessment
                </div>
              </div>
              <blockquote className="text-sm italic text-muted-foreground border-l-4 border-success pl-4">
                "Intelligence that understands dental care"
              </blockquote>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};