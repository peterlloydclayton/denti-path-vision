import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { XCircle } from 'lucide-react';
import { AnimatedText } from '@/components/ui/animated-text';
import { StaggerContainer, StaggerItem } from '@/components/ui/enhanced-animations';

export const ProblemSection = () => {
  const painPoints = [
    {
      title: "Emergency affordability crisis",
      description: "Patients face unexpected dental costs without proper financing options"
    },
    {
      title: "Timeline mismatch", 
      description: "Traditional approval processes don't align with dental treatment urgency"
    },
    {
      title: "Low approval rates",
      description: "Generic underwriting fails to understand dental-specific patient needs"
    },
    {
      title: "Generic understanding",
      description: "Banks don't comprehend the unique value and necessity of dental treatments"
    }
  ];

  return (
    <section className="py-24 bg-intelligence text-intelligence-foreground">
      <div className="container mx-auto px-6">
        <AnimatedText className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Traditional Financing Wasn't Built for Dental Care
          </h2>
        </AnimatedText>

        <div className="grid md:grid-cols-2 gap-12 mb-16">
          {/* Pain Points */}
          <StaggerContainer>
            <div className="space-y-6">
              {painPoints.map((point, index) => (
                <StaggerItem key={index}>
                  <motion.div
                    whileHover={{ x: 8, scale: 1.02 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Card className="bg-intelligence-foreground/10 border-intelligence-foreground/20 text-intelligence-foreground hover:bg-intelligence-foreground/15 transition-all duration-300 hover:shadow-elegant">
                      <CardContent className="p-6">
                        <div className="flex items-start gap-4">
                          <XCircle className="w-6 h-6 text-destructive mt-1 flex-shrink-0" />
                          <div>
                            <h3 className="font-semibold mb-2">{point.title}</h3>
                            <p className="text-sm opacity-90">{point.description}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                </StaggerItem>
              ))}
            </div>
          </StaggerContainer>

          {/* Comparison Table */}
          <AnimatedText delay={0.3}>
            <motion.div 
              className="bg-intelligence-foreground/10 border border-intelligence-foreground/20 rounded-xl p-6 hover:bg-intelligence-foreground/15 transition-all duration-300"
              whileHover={{ scale: 1.02 }}
            >
              <h3 className="text-2xl font-bold mb-6 text-center">Financial Care Gap</h3>
              <div className="space-y-4">
                <motion.div 
                  className="flex justify-between items-center py-3 border-b border-intelligence-foreground/20"
                  whileHover={{ x: 4 }}
                  transition={{ duration: 0.2 }}
                >
                  <span>Traditional Banking</span>
                  <span className="text-destructive font-semibold">20-40% Approval</span>
                </motion.div>
                <motion.div 
                  className="flex justify-between items-center py-3 border-b border-intelligence-foreground/20"
                  whileHover={{ x: 4 }}
                  transition={{ duration: 0.2 }}
                >
                  <span>Generic Financing</span>
                  <span className="text-destructive font-semibold">45-60% Approval</span>
                </motion.div>
                <motion.div 
                  className="flex justify-between items-center py-3 border-b border-intelligence-foreground/20"
                  whileHover={{ x: 4, scale: 1.05 }}
                  transition={{ duration: 0.2 }}
                >
                  <span className="font-semibold">DentiPay Intelligence</span>
                  <span className="text-success font-bold text-lg">94% Approval</span>
                </motion.div>
              </div>
            </motion.div>
          </AnimatedText>
        </div>
      </div>
    </section>
  );
};