import { motion } from 'framer-motion';
import { AnimatedText } from '@/components/ui/animated-text';
import { StaggerContainer, StaggerItem } from '@/components/ui/enhanced-animations';
import { ExpandableCardStack } from './ExpandableCardStack';
import { SlidingDataPanel } from './SlidingDataPanel';
import { MorphingProgressBar } from './MorphingProgressBar';
import { Fade } from 'react-awesome-reveal';
import focusedProfessional from '@/assets/focused-professional.png';

export const ProblemSection = () => {
  const painPoints = [
    {
      id: "crisis",
      title: "Emergency affordability crisis",
      description: "Patients face unexpected dental costs without proper financing options",
      benefit: "Instant approval available 24/7",
      benefitDescription: "Get approved within minutes, even during dental emergencies"
    },
    {
      id: "timeline",
      title: "Timeline mismatch", 
      description: "Traditional approval processes don't align with dental treatment urgency",
      benefit: "Real-time treatment approval",
      benefitDescription: "Synchronize financing with treatment schedules for seamless care"
    },
    {
      id: "approval",
      title: "Low approval rates",
      description: "Generic underwriting fails to understand dental-specific patient needs",
      benefit: "94% approval rate",
      benefitDescription: "Dental-specialized AI understands treatment value and patient circumstances"
    },
    {
      id: "understanding",
      title: "Generic understanding",
      description: "Banks don't comprehend the unique value and necessity of dental treatments",
      benefit: "Dental expertise built-in",
      benefitDescription: "Native understanding of dental treatment necessity and health impact"
    }
  ];

  return (
    <section className="py-24 pb-72 md:pb-24 bg-dental-blue-darker text-white relative overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        <AnimatedText className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Traditional Financing Wasn't Built for Dental Care
          </h2>
        </AnimatedText>

        {/* Enhanced Interactive Problem Cards */}
        <Fade direction="up" triggerOnce cascade damping={0.1}>
          <div className="mb-16">
            <ExpandableCardStack painPoints={painPoints} />
          </div>
        </Fade>

        {/* Interactive Data Visualization Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {/* Sliding Data Panel */}
          <Fade direction="left" triggerOnce delay={300}>
            <SlidingDataPanel />
          </Fade>

          {/* Morphing Progress Bars */}
          <Fade direction="right" triggerOnce delay={500}>
            <div className="space-y-8">
              <div className="text-center mb-6">
                <h3 className="text-xl font-bold text-foreground mb-2">Approval Rate Evolution</h3>
                <p className="text-sm text-muted-foreground">Watch how DentiPay transforms the financing landscape</p>
              </div>
              
              <MorphingProgressBar
                fromValue={30}
                toValue={94}
                fromLabel="Traditional Banking"
                toLabel="DentiPay Dental Financing"
                fromColor="hsl(var(--destructive))"
                toColor="hsl(var(--success))"
              />
              
              <MorphingProgressBar
                fromValue={52}
                toValue={94}
                fromLabel="Generic Healthcare Financing"
                toLabel="DentiPay Specialized Solution"
                fromColor="hsl(var(--warning))"
                toColor="hsl(var(--success))"
              />
            </div>
          </Fade>
        </div>
      </div>

      {/* Bottom Right Image */}
      <motion.div
        className="absolute bottom-0 right-0 w-48 h-60 md:w-96 md:h-120"
        initial={{ opacity: 0, y: 30, scale: 0.9 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
      >
        <img
          src={focusedProfessional}
          alt="Focused dental professional"
          className="w-full h-full object-cover"
        />
      </motion.div>
    </section>
  );
};