import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { XCircle, CheckCircle } from 'lucide-react';
import { AnimatedText } from '@/components/ui/animated-text';
import { StaggerContainer, StaggerItem } from '@/components/ui/enhanced-animations';
import focusedProfessional from '@/assets/focused-professional.png';

export const ProblemSection = () => {
  const painPoints = [
    {
      title: "Emergency affordability crisis",
      description: "Patients face unexpected dental costs without proper financing options",
      benefit: "Instant approval available 24/7",
      benefitDescription: "Get approved within minutes, even during dental emergencies"
    },
    {
      title: "Timeline mismatch", 
      description: "Traditional approval processes don't align with dental treatment urgency",
      benefit: "Real-time treatment approval",
      benefitDescription: "Synchronize financing with treatment schedules for seamless care"
    },
    {
      title: "Low approval rates",
      description: "Generic underwriting fails to understand dental-specific patient needs",
      benefit: "94% approval rate",
      benefitDescription: "Dental-specialized AI understands treatment value and patient circumstances"
    },
    {
      title: "Generic understanding",
      description: "Banks don't comprehend the unique value and necessity of dental treatments",
      benefit: "Dental expertise built-in",
      benefitDescription: "Native understanding of dental treatment necessity and health impact"
    }
  ];

  return (
    <section className="py-24 bg-dental-blue-darker text-white relative overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        <AnimatedText className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Traditional Financing Wasn't Built for Dental Care
          </h2>
        </AnimatedText>

        {/* Pain Points - 2x2 Grid */}
        <StaggerContainer>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
            {painPoints.map((point, index) => (
              <StaggerItem key={index}>
                <motion.div
                  className="relative group"
                  whileHover={{ x: 8, scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                >
                  {/* Problem Card */}
                  <Card className="bg-card/10 border-card/20 text-dental-blue hover:bg-card/15 transition-all duration-300 hover:shadow-elegant group-hover:opacity-0">
                    <CardContent className="p-12">
                      <div className="flex items-center gap-4">
                        <XCircle className="w-6 h-6 text-destructive flex-shrink-0" />
                        <div className="flex-1">
                          <h3 className="font-semibold mb-3">{point.title}</h3>
                          <p className="text-sm opacity-90 mb-2">{point.description}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* DentiPay Benefit Card - Hidden until hover */}
                  <Card className="absolute inset-0 bg-dental-blue border-dental-blue text-foreground opacity-0 group-hover:opacity-100 transition-all duration-300 shadow-green">
                    <CardContent className="p-12">
                      <div className="flex items-center gap-4">
                        <CheckCircle className="w-6 h-6 text-success flex-shrink-0" />
                        <div className="flex-1">
                          <div className="text-xs font-medium text-dental-blue-darker mb-2">DENTIPAY BENEFIT</div>
                          <h3 className="font-semibold mb-3">{point.benefit}</h3>
                          <p className="text-sm opacity-90 mb-2">{point.benefitDescription}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </StaggerItem>
            ))}
          </div>
        </StaggerContainer>

        {/* Financial Care Gap Card - Centered Below */}
        <div className="flex justify-center">
          <div className="w-full max-w-md">
            <AnimatedText delay={0.3}>
              <motion.div
                className="relative group"
                whileHover={{ x: 8, scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                {/* Front Card */}
                <Card className="bg-card/10 border-card/20 text-dental-blue hover:bg-card/15 transition-all duration-300 hover:shadow-elegant group-hover:opacity-0">
                  <CardContent className="p-12">
                    <h3 className="text-2xl font-bold mb-6 text-center">Financial Care Gap</h3>
                    <div className="space-y-4">
                      <motion.div 
                        className="flex justify-between items-center py-3 border-b border-card/20"
                        whileHover={{ x: 4 }}
                        transition={{ duration: 0.2 }}
                      >
                        <span>Traditional Banking</span>
                        <span className="text-destructive font-semibold">20-40% Approval</span>
                      </motion.div>
                      <motion.div 
                        className="flex justify-between items-center py-3 border-b border-card/20"
                        whileHover={{ x: 4 }}
                        transition={{ duration: 0.2 }}
                      >
                        <span>Generic Financing</span>
                        <span className="text-destructive font-semibold">45-60% Approval</span>
                      </motion.div>
                    </div>
                  </CardContent>
                </Card>

                {/* Back Card - DentiPay Solution */}
                <Card className="absolute inset-0 bg-dental-blue border-dental-blue text-foreground opacity-0 group-hover:opacity-100 transition-all duration-300 shadow-green">
                  <CardContent className="p-12">
                    <div className="flex items-center justify-center h-full">
                      <div className="text-center">
                        <div className="text-xs font-medium text-dental-blue-darker mb-2">DENTIPAY SOLUTION</div>
                        <h3 className="text-3xl font-bold mb-3">90% Approvals</h3>
                        <p className="text-sm opacity-90">Specialized dental financing that understands your patients' needs</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </AnimatedText>
          </div>
        </div>
      </div>

      {/* Bottom Right Image */}
      <motion.div
        className="absolute bottom-0 right-0 w-48 h-60 opacity-80"
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 0.8, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.5 }}
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