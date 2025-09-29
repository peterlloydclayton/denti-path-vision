import { Card, CardContent } from '@/components/ui/card';
import { AnimatedText } from '@/components/ui/animated-text';

export const FoundersSection = () => {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-6">
        <AnimatedText className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-black">
            Founder's Circle: From Vision to Velocity
          </h2>
          <p className="text-xl text-black max-w-4xl mx-auto">
            Breaking Barriers in Innovation, Access, and Profitability
          </p>
        </AnimatedText>

        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Dr. Charles Zahédi */}
            <AnimatedText delay={0.1}>
              <Card className="shadow-elegant hover:shadow-elegant transition-smooth hover:-translate-y-1 h-full">
                <CardContent className="p-8">
                  <div className="mb-6">
                    <h3 className="text-2xl font-bold mb-2 text-black">Dr. Charles Zahédi</h3>
                    <p className="text-lg text-intelligence font-medium">Co-Founder</p>
                  </div>
                  <p className="text-muted-foreground leading-relaxed">
                    Dr. Charles Zahédi is an accomplished clinician, innovator, and business strategist with over 34 years of experience in dentistry and healthcare systems. After earning his dental degree, he built a reputation for developing advanced treatment protocols and scalable care delivery models that improve patient outcomes while expanding access to care.
                  </p>
                  <p className="text-muted-foreground leading-relaxed mt-4">
                    Throughout his career, Dr. Zahédi has combined clinical expertise with a passion for innovation, integrating technologies like AI-driven treatment planning, in-house lab workflows, and patient-friendly financing models. He has served diverse patient populations, with a focus on underserved and aging communities, and has trained teams to deliver care at scale without sacrificing quality.
                  </p>
                  <p className="text-muted-foreground leading-relaxed mt-4">
                    Dr. Zahédi's work reflects a lifelong commitment to transforming dental care by bridging the gap between clinical excellence, patient affordability, and operational efficiency.
                  </p>
                </CardContent>
              </Card>
            </AnimatedText>

            {/* Dr. Emelio Arguello */}
            <AnimatedText delay={0.2}>
              <Card className="shadow-elegant hover:shadow-elegant transition-smooth hover:-translate-y-1 h-full">
                <CardContent className="p-8">
                  <div className="mb-6">
                    <h3 className="text-2xl font-bold mb-2 text-black">Dr. Emilio Argüello</h3>
                    <p className="text-lg text-intelligence font-medium">Co-Founder</p>
                  </div>
                  <p className="text-muted-foreground leading-relaxed">
                    Dr. Emilio Argüello was born and raised in Mexico City. After graduating from dental school at the Universidad Autónoma Metropolitana, he moved to the U.S. in 1998 following time abroad as a competitive fencer. He earned his dental degree and specialty training in Periodontics at Tufts University and is now a Board-Certified Periodontist.
                  </p>
                  <p className="text-muted-foreground leading-relaxed mt-4">
                    For nearly 20 years, Dr. Argüello has served as core faculty and researcher at Harvard University, co-authoring textbooks and numerous peer-reviewed publications. Over the last 15 years, he has built and transitioned multiple dental companies, advised leading organizations, and served on academic and industry boards.
                  </p>
                  <p className="text-muted-foreground leading-relaxed mt-4">
                    Most recently, he co-founded Mexico Dental Implants, delivering advanced oral rehabilitation services to international patients across certified clinics in Mexico. He also maintains a private practice at Altura Periodontics in Denver, while his wife, Dr. Caitlin White, practices at Foundations Orthodontics.
                  </p>
                </CardContent>
              </Card>
            </AnimatedText>
          </div>
        </div>
      </div>
    </section>
  );
};