import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, Brain, Shield, BarChart3, Cog } from 'lucide-react';

interface HomeScopeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const scopeCards = [
  {
    title: "Clinical Intelligence Network",
    subtitle: "AI that understands dental medicine like a specialist",
    points: [
      "Real-time analysis of clinical data and treatment histories",
      "Prioritizes treatments based on medical necessity and urgency",
      "Identifies potential complications before they occur",
      "Suggests optimal treatment sequencing for complex cases"
    ],
    visual: "🩺 Clinical decision tree",
    icon: Brain,
    color: "success",
    stat: "67%",
    statLabel: "Faster Clinical Decisions"
  },
  {
    title: "50+ Data Point Analysis",
    subtitle: "Traditional systems see one dimension. SCOPE sees everything.",
    points: [
      "Credit history, income verification, and banking patterns",
      "Practice performance metrics and provider relationships",
      "Treatment history, seasonal capacity, and timing factors",
      "Market conditions, insurance status, and alternative funding sources"
    ],
    visual: "📊 Multi-dimensional data cube",
    icon: BarChart3,
    color: "primary",
    stat: "50+",
    statLabel: "Analyzed Data Points"
  },
  {
    title: "Predictive Revenue Intelligence",
    subtitle: "Know your practice's financial future before it happens",
    points: [
      "Forecasts treatment acceptance rates by patient demographics",
      "Predicts seasonal revenue patterns and capacity optimization",
      "Models various financing scenarios and their success probabilities",
      "Identifies highest-value opportunities in your patient pipeline"
    ],
    visual: "📈 Revenue prediction model",
    icon: Cog,
    color: "accent",
    stat: "300%",
    statLabel: "Revenue Optimization"
  },
  {
    title: "Risk-Free Provider Protection",
    subtitle: "SCOPE protects your practice while maximizing approvals",
    points: [
      "Zero recourse financing - providers paid upfront regardless of defaults",
      "Real-time fraud detection with machine learning algorithms",
      "Chargeback protection and dispute resolution automation",
      "Performance-based pricing rewards high-quality providers"
    ],
    visual: "🛡️ Multi-layer protection system",
    icon: Shield,
    color: "success",
    stat: "100%",
    statLabel: "Provider Protection"
  }
];

export const HomeScopeModal = ({ isOpen, onClose }: HomeScopeModalProps) => {
  const [currentCard, setCurrentCard] = useState(0);

  const nextCard = () => {
    setCurrentCard((prev) => (prev + 1) % scopeCards.length);
  };

  const prevCard = () => {
    setCurrentCard((prev) => (prev - 1 + scopeCards.length) % scopeCards.length);
  };

  const goToCard = (index: number) => {
    setCurrentCard(index);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
          
          {/* Modal */}
          <motion.div
            className="relative w-full max-w-5xl mx-4 md:mx-6 bg-background rounded-3xl shadow-2xl max-h-[90vh] overflow-hidden border border-success/20"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
          >
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-6 right-6 z-10 p-2 rounded-full bg-background/80 hover:bg-background transition-colors border border-success/20"
            >
              <X className="w-5 h-5 text-foreground" />
            </button>

            {/* Header */}
            <div className="p-8 md:p-12 border-b border-success/10">
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 bg-success/20 rounded-2xl">
                  <Brain className="w-8 h-8 text-success" />
                </div>
                <div>
                  <h2 className="text-3xl font-bold text-foreground">SCOPE</h2>
                  <p className="text-lg text-muted-foreground">Strategic Clinical Operations Engine</p>
                </div>
              </div>
              <p className="text-muted-foreground max-w-2xl">
                Advanced intelligence that understands dental practice dynamics, clinical necessity, 
                and revenue optimization to make the smartest financing decisions possible.
              </p>
            </div>

            {/* Content */}
            <div className="p-8 md:p-12">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentCard}
                  className="text-center"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="mb-8">
                    <div className="flex items-center justify-center gap-3 mb-4">
                        <div className={`p-3 bg-${scopeCards[currentCard].color}/20 rounded-xl`}>
                          {currentCard === 0 && <Brain className={`w-6 h-6 text-${scopeCards[currentCard].color}`} />}
                          {currentCard === 1 && <BarChart3 className={`w-6 h-6 text-${scopeCards[currentCard].color}`} />}
                          {currentCard === 2 && <Cog className={`w-6 h-6 text-${scopeCards[currentCard].color}`} />}
                          {currentCard === 3 && <Shield className={`w-6 h-6 text-${scopeCards[currentCard].color}`} />}
                        </div>
                      <h3 className="text-2xl font-bold text-foreground">
                        {scopeCards[currentCard].title}
                      </h3>
                    </div>
                    <p className="text-lg text-muted-foreground mb-6">
                      {scopeCards[currentCard].subtitle}
                    </p>
                  </div>

                  <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                    <div className="space-y-4 text-left">
                      {scopeCards[currentCard].points.map((point, index) => (
                        <motion.div 
                          key={index} 
                          className="flex items-start gap-3 p-3 rounded-lg hover:bg-success/5 transition-colors"
                          whileHover={{ x: 4 }}
                        >
                          <div className={`w-2 h-2 rounded-full bg-${scopeCards[currentCard].color} mt-2 flex-shrink-0`} />
                          <span className="text-foreground">{point}</span>
                        </motion.div>
                      ))}
                    </div>
                    
                    <div className="flex flex-col items-center justify-center space-y-6">
                      <div className="p-8 bg-gradient-to-br from-success/10 to-primary/5 rounded-2xl border border-success/20 text-center">
                        <div className="text-6xl mb-4">{scopeCards[currentCard].visual.split(' ')[0]}</div>
                        <p className="text-sm text-muted-foreground font-medium mb-4">
                          {scopeCards[currentCard].visual.split(' ').slice(1).join(' ')}
                        </p>
                      </div>
                      
                      <motion.div 
                        className={`p-6 rounded-xl bg-gradient-to-r from-${scopeCards[currentCard].color}/20 to-${scopeCards[currentCard].color}/10 border border-${scopeCards[currentCard].color}/30 text-center`}
                        whileHover={{ scale: 1.05 }}
                      >
                        <div className={`text-3xl font-bold text-${scopeCards[currentCard].color} mb-1`}>
                          {scopeCards[currentCard].stat}
                        </div>
                        <div className="text-xs text-muted-foreground font-medium">
                          {scopeCards[currentCard].statLabel}
                        </div>
                      </motion.div>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Navigation */}
              <div className="flex justify-center items-center space-x-6 mt-12">
                <button
                  onClick={prevCard}
                  className="p-3 rounded-full hover:bg-success/10 transition-colors border border-success/20"
                >
                  <ChevronLeft className="w-5 h-5 text-foreground" />
                </button>
                
                <div className="flex space-x-2">
                  {scopeCards.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => goToCard(index)}
                      className={`w-3 h-3 rounded-full transition-colors ${
                        index === currentCard ? 'bg-success' : 'bg-muted-foreground/30'
                      }`}
                    />
                  ))}
                </div>
                
                <button
                  onClick={nextCard}
                  className="p-3 rounded-full hover:bg-success/10 transition-colors border border-success/20"
                >
                  <ChevronRight className="w-5 h-5 text-foreground" />
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};