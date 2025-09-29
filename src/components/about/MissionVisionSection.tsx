import { Card, CardContent } from '@/components/ui/card';
import { ParallaxSection } from '@/components/ui/parallax-section';
import { AnimatedText } from '@/components/ui/animated-text';

export const MissionVisionSection = () => {
  return (
    <ParallaxSection className="py-24 bg-background" offset={30}>
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <AnimatedText>
                <h2 className="text-4xl md:text-5xl font-bold mb-6 text-black">Our Mission</h2>
                <p className="text-xl leading-relaxed text-black mb-8">
                  To eliminate financial barriers in dental care by creating the most 
                  intelligent, patient-centered financing platform in healthcare. 
                  We believe everyone deserves access to quality dental treatment, 
                  regardless of their financial situation.
                </p>
              </AnimatedText>
            </div>

            <AnimatedText delay={0.2} from="right">
              <Card className="shadow-elegant">
                <CardContent className="p-8">
                  <h3 className="text-2xl font-bold mb-4">Our Vision</h3>
                  <p className="text-lg leading-relaxed text-muted-foreground">
                    A world where dental health is never compromised by financial constraints — 
                    where advanced AI technology seamlessly connects patients with the care 
                    they need and providers with the growth they deserve.
                  </p>
                </CardContent>
              </Card>
            </AnimatedText>
          </div>
        </div>
      </div>
    </ParallaxSection>
  );
};