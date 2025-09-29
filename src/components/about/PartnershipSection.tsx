import { TrendingUp, Users } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { ParallaxSection } from '@/components/ui/parallax-section';
import { AnimatedText } from '@/components/ui/animated-text';

export const PartnershipSection = () => {
  return (
    <ParallaxSection className="py-24 bg-background" offset={20}>
      <div className="container mx-auto px-6">
        <AnimatedText className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-black">
            Partnership & Investment Opportunities
          </h2>
          <p className="text-xl text-black max-w-4xl mx-auto">
            Join the revolution in healthcare finance and be part of a network that's transforming patient care access
          </p>
        </AnimatedText>

        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* For Investors */}
            <AnimatedText delay={0.1}>
              <Card className="shadow-elegant hover:shadow-elegant transition-smooth hover:-translate-y-1 h-full">
                <CardContent className="p-8">
                  <div className="mb-6">
                    <TrendingUp className="w-12 h-12 text-intelligence mb-4" />
                    <h3 className="text-3xl font-bold mb-4 text-black">For Strategic Investors</h3>
                  </div>
                  <p className="text-muted-foreground leading-relaxed mb-6">
                    DentiPay represents a unique opportunity to invest in the future of healthcare finance. Our AI-powered platform is disrupting a $50+ billion market with proven technology, exceptional leadership, and exponential growth potential.
                  </p>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 rounded-full bg-intelligence mt-3 flex-shrink-0"></div>
                      <div>
                        <div className="font-bold text-black">Scalable Technology Platform</div>
                        <div className="text-muted-foreground">AI-driven solutions with 97%+ predictive accuracy</div>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 rounded-full bg-intelligence mt-3 flex-shrink-0"></div>
                      <div>
                        <div className="font-bold text-black">Proven Market Traction</div>
                        <div className="text-muted-foreground">10,000+ practices, $1.5B+ in financing processed</div>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 rounded-full bg-intelligence mt-3 flex-shrink-0"></div>
                      <div>
                        <div className="font-bold text-black">Healthcare Expansion Ready</div>
                        <div className="text-muted-foreground">Platform architected for multi-specialty growth</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </AnimatedText>

            {/* For Partners */}
            <AnimatedText delay={0.2}>
              <Card className="shadow-elegant hover:shadow-elegant transition-smooth hover:-translate-y-1 h-full">
                <CardContent className="p-8">
                  <div className="mb-6">
                    <Users className="w-12 h-12 text-dental-peach mb-4" />
                    <h3 className="text-3xl font-bold mb-4 text-black">For Network Partners</h3>
                  </div>
                  <p className="text-muted-foreground leading-relaxed mb-6">
                    Join our exclusive network of dental practices, technology partners, and financial institutions. Experience the power of intelligent financing that increases case acceptance while improving patient satisfaction.
                  </p>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 rounded-full bg-dental-peach mt-3 flex-shrink-0"></div>
                      <div>
                        <div className="font-bold text-black">Revenue Growth</div>
                        <div className="text-muted-foreground">Average 40% increase in case acceptance rates</div>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 rounded-full bg-dental-peach mt-3 flex-shrink-0"></div>
                      <div>
                        <div className="font-bold text-black">Operational Excellence</div>
                        <div className="text-muted-foreground">Streamlined workflows and intelligent automation</div>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 rounded-full bg-dental-peach mt-3 flex-shrink-0"></div>
                      <div>
                        <div className="font-bold text-black">Patient Success</div>
                        <div className="text-muted-foreground">Enhanced access to care with personalized financing</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </AnimatedText>
          </div>
        </div>
      </div>
    </ParallaxSection>
  );
};