import { Card, CardContent } from '@/components/ui/card';
import { ParallaxSection } from '@/components/ui/parallax-section';
import { AnimatedText } from '@/components/ui/animated-text';
import adamZuckerman from '@/assets/profiles/adam-zuckerman.png';
import jayOku from '@/assets/profiles/jay-oku.png';
import donaldThorne from '@/assets/profiles/donald-thorne.png';
import nuttalyaReussi from '@/assets/profiles/nuttalya-reussi.png';
import michaelWeydemuller from '@/assets/profiles/michael-weydemuller.png';
import colinDedely from '@/assets/profiles/colin-dedely.png';

export const LeadershipSection = () => {
  const leaders = [
    {
      name: 'Adam Zuckerman',
      role: 'Founder/CEO',
      color: 'dental-peach',
      description: 'Adam Zuckerman is the Founder and CEO of DentiPay, an AI-powered behavioral financing platform revolutionizing patient approvals and provider profitability. A proven fintech innovator and strategic operator, Adam specializes in building high-growth ventures at the intersection of AI, finance, and healthcare. His leadership has consistently driven rapid expansion and strategic partnerships across multiple ventures in these sectors.',
      image: adamZuckerman
    },
    {
      name: 'Jay Oku',
      role: 'Chief Business Officer',
      color: 'dental-blue',
      description: 'As DentiPay\'s Chief Business Officer, Jay Oku leads business strategy, provider growth, and capital partnerships. With over 15 years in real estate finance, he is known for innovative underwriting and ethical origination. Jay has successfully launched and scaled purpose-driven ventures, expanding brands into 38 international markets. He applies his foundation of integrity and discipline to align fintech with human outcomes at DentiPay, making patient financing intelligent, ethical, and accessible for all.',
      image: jayOku
    },
    {
      name: 'Dr. Donald R. Thorne',
      role: 'Co-Founder & Chairman',
      color: 'intelligence',
      description: 'Dr. Thorne is DentiPay\'s Co-Founder and Chairman. A veteran serial entrepreneur, he brings decades of expertise in marketing, finance, distribution, and M&A. He co-founded NAID and Instashred, leading Instashred to a landmark exit in 2000 for nearly $100 million. Today, Don invests in and advises ventures across technology, healthcare, and fintech, accelerating growth through strategic capital and operational excellence.',
      image: donaldThorne
    },
    {
      name: 'Nuttalya Reussi',
      role: 'Chief Operating Officer',
      color: 'dental-lavender',
      description: 'Ms. Reussi is DentiPay\'s Chief Operating Officer, overseeing operational strategy and market expansion. A seasoned strategic marketer, she excels in building high-impact campaigns that drive provider engagement and brand visibility. With expertise in global communications and cross-market collaborations, Nuttayla holds a master\'s degree from Kyiv National Linguistic University in Ukraine.',
      image: nuttalyaReussi
    },
    {
      name: 'Michael Weydemuller',
      role: 'Growth & Capital',
      color: 'dental-green',
      description: 'Michael Weydemuller is the Founding Partner of Growth & Capital at DentiPay, leading provider acquisition, capital strategy, and market expansion. With over 25 years of experience in taxation, compliance, and capital markets, he is instrumental in fueling DentiPay\'s rapid scale through operational discipline and entrepreneurial instinct.',
      image: michaelWeydemuller
    },
    {
      name: 'Colin Dedely',
      role: 'Technology & Credit Systems',
      color: 'dental-peach',
      description: 'Colin Dedely is the Founding Partner of Technology & Credit Systems at DentiPay, where he leads the development of the platform\'s fintech architecture, patient pre-approval engine, and provider credit optimization systems. With a proven track record of securing more than $80 million in consumer financing at an industry-leading 90% approval rate.',
      image: colinDedely
    }
  ];

  return (
    <ParallaxSection className="py-24 bg-gradient-subtle" offset={30}>
      <div className="container mx-auto px-6">
        <AnimatedText className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-black">
            Leadership That Builds Revolutions
          </h2>
          <p className="text-xl text-black max-w-4xl mx-auto">
            Where innovation meets execution — and disruption becomes inevitable.
          </p>
        </AnimatedText>

        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8">
            {leaders.map((leader, index) => (
              <AnimatedText key={index} delay={index * 0.1}>
                <Card className="shadow-elegant hover:shadow-elegant transition-smooth hover:-translate-y-1 h-full">
                  <CardContent className="p-8">
                    <div className="flex flex-col items-center text-center mb-6">
                      <img 
                        src={leader.image} 
                        alt={leader.name}
                        className="w-48 h-48 object-cover rounded-full ring-4 ring-primary/20 mb-6"
                      />
                      <h3 className="text-2xl font-bold mb-2 text-black">{leader.name}</h3>
                      <p className="text-lg font-medium text-black">{leader.role}</p>
                    </div>
                    
                    <p className="text-muted-foreground leading-relaxed">
                      {leader.description}
                    </p>
                  </CardContent>
                </Card>
              </AnimatedText>
            ))}
          </div>
        </div>
      </div>
    </ParallaxSection>
  );
};