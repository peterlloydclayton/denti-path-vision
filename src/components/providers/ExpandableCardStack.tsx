import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { XCircle, CheckCircle, ChevronDown } from 'lucide-react';
import { Tilt } from 'react-next-tilt';

interface PainPoint {
  title: string;
  description: string;
  benefit: string;
  benefitDescription: string;
  id: string;
}

interface ExpandableCardStackProps {
  painPoints: PainPoint[];
}

export const ExpandableCardStack = ({ painPoints }: ExpandableCardStackProps) => {
  const [expandedCard, setExpandedCard] = useState<string | null>(null);
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  const handleCardClick = (id: string) => {
    setExpandedCard(expandedCard === id ? null : id);
  };

  return (
    <div className="relative w-full max-w-4xl mx-auto">
      {painPoints.map((point, index) => {
        const isExpanded = expandedCard === point.id;
        const isHovered = hoveredCard === point.id;
        const zIndex = isExpanded ? 50 : painPoints.length - index;
        const yOffset = isExpanded ? 0 : index * 20;
        const scale = isExpanded ? 1.05 : isHovered ? 1.02 : 1;
        
        return (
          <Tilt
            key={point.id}
            className="absolute w-full transition-all duration-500 ease-out"
            style={{
              zIndex,
              transform: `translateY(${yOffset}px)`,
            }}
            onMouseEnter={() => setHoveredCard(point.id)}
            onMouseLeave={() => setHoveredCard(null)}
          >
            <motion.div
              animate={{ 
                scale,
                y: isExpanded ? -yOffset : 0 
              }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              <Card 
                className="bg-card/10 border-card/20 backdrop-blur-sm cursor-pointer hover:bg-card/15 transition-all duration-300"
                onClick={() => handleCardClick(point.id)}
              >
                <CardContent className="p-6">
                  {/* Problem State */}
                  <div className="flex items-center gap-4 mb-4">
                    <XCircle className="w-6 h-6 text-destructive flex-shrink-0" />
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h3 className="font-semibold text-foreground">{point.title}</h3>
                        <motion.div
                          animate={{ rotate: isExpanded ? 180 : 0 }}
                          transition={{ duration: 0.2 }}
                        >
                          <ChevronDown className="w-5 h-5 text-muted-foreground" />
                        </motion.div>
                      </div>
                      <p className="text-sm text-muted-foreground mt-2">{point.description}</p>
                    </div>
                  </div>

                  {/* Expandable Solution State */}
                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ opacity: 0, height: 0, y: -10 }}
                        animate={{ opacity: 1, height: 'auto', y: 0 }}
                        exit={{ opacity: 0, height: 0, y: -10 }}
                        transition={{ duration: 0.3, ease: "easeOut" }}
                        className="border-t border-card/20 pt-4 mt-4"
                      >
                        <div className="flex items-center gap-4">
                          <CheckCircle className="w-6 h-6 text-success flex-shrink-0" />
                          <div className="flex-1">
                            <div className="text-xs font-medium text-primary mb-2">DENTIPAY SOLUTION</div>
                            <h4 className="font-semibold text-foreground mb-2">{point.benefit}</h4>
                            <p className="text-sm text-muted-foreground">{point.benefitDescription}</p>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </CardContent>
              </Card>
            </motion.div>
          </Tilt>
        );
      })}
    </div>
  );
};