import { Card, CardContent } from '@/components/ui/card';
import { AnimatedText } from '@/components/ui/animated-text';
import charlesZahedi from '@/assets/profiles/charles-zahedi.png';
import emilioArguello from '@/assets/profiles/emilio-arguello.jpg';
import drCarmy from '@/assets/profiles/dr-carmy.jpeg';

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
                  <div className="flex flex-col items-center text-center mb-6">
                    <img 
                      src={charlesZahedi} 
                      alt="Dr. Charles Zahédi"
                      className="w-full h-64 object-cover rounded-lg ring-4 ring-primary/20 mb-6"
                    />
                    <h3 className="text-2xl font-bold mb-2 text-black">Dr. Charles Zahédi</h3>
                    <p className="text-lg font-medium text-black">Co-Founder</p>
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
                  <div className="flex flex-col items-center text-center mb-6">
                    <img 
                      src={emilioArguello} 
                      alt="Dr. Emilio Argüello"
                      className="w-full h-64 object-cover rounded-lg ring-4 ring-primary/20 mb-6"
                    />
                    <h3 className="text-2xl font-bold mb-2 text-black">Dr. Emilio Argüello</h3>
                    <p className="text-lg font-medium text-black">Co-Founder</p>
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

            {/* Dr. Carmy Michael */}
            <AnimatedText delay={0.3}>
              <Card className="shadow-elegant hover:shadow-elegant transition-smooth hover:-translate-y-1 h-full">
                <CardContent className="p-8">
                  <div className="flex flex-col items-center text-center mb-6">
                    <img 
                      src={drCarmy} 
                      alt="Dr. Carmy Michael"
                      className="w-full h-64 object-cover rounded-lg ring-4 ring-primary/20 mb-6"
                    />
                    <h3 className="text-2xl font-bold mb-2 text-black">Dr. Carmy Michael</h3>
                    <p className="text-lg font-medium text-black">Co-Founder</p>
                  </div>
                  <p className="text-muted-foreground leading-relaxed">
                    Dr. Carmy Michael began his dental career in 1993 at Cairo University, completing a one-year residency before relocating to Canada. He later earned his Doctor of Dental Surgery (DDS) from the University of Western Ontario – Schulich School of Medicine & Dentistry, followed by a six-month clinical residency focused on oral rehabilitation and sedation dentistry.
                  </p>
                  <p className="text-muted-foreground leading-relaxed mt-4">
                    With over 20 years of advanced training in implantology, digital workflow, and full-arch restoration, Dr. Michael is certified in oral and IV conscious sedation. He holds a Fellowship with the Global Dental Implant Academy (GDIA) and is an active member of the Academy of Osseointegration (AO), ICOI, and other leading implantology and surgical societies.
                  </p>
                  <p className="text-muted-foreground leading-relaxed mt-4">
                    In addition to co-founding the OC Surgical Institute, Dr. Michael leads a high-volume private practice in Southern California focused on full-arch procedures, complex grafting, and advanced oral rehabilitation. He now works closely with DentiPay's SCOPE AI platform, integrating surgical intelligence, real-time patient approvals, and precision case planning to transform how care is delivered.
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