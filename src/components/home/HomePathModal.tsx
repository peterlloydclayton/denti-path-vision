import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, Target, Brain, Zap, TrendingUp } from 'lucide-react';

interface HomePathModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const pathCards = [
  {
    title: "Pre-Cognitive Predictions",
    subtitle: "AI that knows the answer before you ask the question",
    points: [
      "Analyzes patient behavior patterns before they enter the office",
      "Predicts treatment acceptance probability with 95% accuracy",
      "Pre-qualifies financing options based on historical data",
      "Identifies optimal timing for treatment recommendations"
    ],
    visual: "🧠 Predictive brain network",
    icon: Brain,
    color: "primary",
    stat: "95%",
    statLabel: "Prediction Accuracy"
  },
  {
    title: "Behavioral Intelligence Engine",
    subtitle: "Understanding the psychology of dental decisions",
    points: [
      "Tracks micro-expressions and verbal cues during consultations",
      "Maps emotional journey from anxiety to acceptance",
      "Identifies resistance patterns and suggests interventions",
      "Personalizes communication style to patient personality type"
    ],
    visual: "💭 Behavioral analysis dashboard",
    icon: Target,
    color: "accent", 
    stat: "50+",
    statLabel: "Behavioral Indicators"
  },
  {
    title: "Instant Decision Architecture",
    subtitle: "30-second approvals powered by deep learning",
    points: [
      "Real-time processing of 50+ data points simultaneously",
      "Integration with banking APIs for instant verification",
      "Dynamic risk assessment using proprietary algorithms",
      "Immediate treatment plan financing with personalized terms"
    ],
    visual: "⚡ Speed processing visualization",
    icon: Zap,
    color: "success",
    stat: "30 sec",
    statLabel: "Average Decision Time"
  },
  {
    title: "Acceptance Optimization",
    subtitle: "300% increase in treatment acceptance rates",
    points: [
      "AI-powered timing for financial discussions",
      "Dynamic pricing optimization based on patient capacity",
      "Emotional state recognition for optimal presentation moments",
      "Customized payment structures that match spending patterns"
    ],
    visual: "📈 Acceptance rate growth chart",
    icon: TrendingUp,
    color: "primary",
    stat: "300%",
    statLabel: "Acceptance Increase"
  }
];

export const HomePathModal = ({ isOpen, onClose }: HomePathModalProps) => {
  const [currentCard, setCurrentCard] = useState(0);

  const nextCard = () => {
    setCurrentCard((prev) => (prev + 1) % pathCards.length);
  };

  const prevCard = () => {
    setCurrentCard((prev) => (prev - 1 + pathCards.length) % pathCards.length);
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
            className="relative w-full max-w-5xl mx-4 md:mx-6 bg-background rounded-3xl shadow-2xl max-h-[90vh] overflow-hidden border border-accent/20"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
          >
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-6 right-6 z-10 p-2 rounded-full bg-background/80 hover:bg-background transition-colors border border-accent/20"
            >
              <X className="w-5 h-5 text-foreground" />
            </button>

            {/* Header */}
            <div className="p-8 md:p-12 border-b border-accent/10">
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 bg-accent/20 rounded-2xl">
                  <Target className="w-8 h-8 text-accent" />
                </div>
                <div>
                  <h2 className="text-3xl font-bold text-foreground">PATH</h2>
                  <p className="text-lg text-muted-foreground">Patient Acceptance Treatment Hub</p>
                </div>
              </div>
              <p className="text-muted-foreground max-w-2xl">
                Pre-cognitive intelligence that predicts treatment acceptance and optimizes financing decisions 
                before patients even realize they need them.
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
                        <div className={`p-3 bg-${pathCards[currentCard].color}/20 rounded-xl`}>
                          {currentCard === 0 && <Brain className={`w-6 h-6 text-${pathCards[currentCard].color}`} />}
                          {currentCard === 1 && <Target className={`w-6 h-6 text-${pathCards[currentCard].color}`} />}
                          {currentCard === 2 && <Zap className={`w-6 h-6 text-${pathCards[currentCard].color}`} />}
                          {currentCard === 3 && <TrendingUp className={`w-6 h-6 text-${pathCards[currentCard].color}`} />}
                        </div>
                      <h3 className="text-2xl font-bold text-foreground">
                        {pathCards[currentCard].title}
                      </h3>
                    </div>
                    <p className="text-lg text-muted-foreground mb-6">
                      {pathCards[currentCard].subtitle}
                    </p>
                  </div>

                  <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                    <div className="space-y-4 text-left">
                      {pathCards[currentCard].points.map((point, index) => (
                        <motion.div 
                          key={index} 
                          className="flex items-start gap-3 p-3 rounded-lg hover:bg-accent/5 transition-colors"
                          whileHover={{ x: 4 }}
                        >
                          <div className={`w-2 h-2 rounded-full bg-${pathCards[currentCard].color} mt-2 flex-shrink-0`} />
                          <span className="text-foreground">{point}</span>
                        </motion.div>
                      ))}
                    </div>
                    
                    <div className="flex flex-col items-center justify-center space-y-6">
                      <div className="p-8 bg-gradient-to-br from-accent/10 to-primary/5 rounded-2xl border border-accent/20 text-center">
                        <div className="text-6xl mb-4">{pathCards[currentCard].visual.split(' ')[0]}</div>
                        <p className="text-sm text-muted-foreground font-medium mb-4">
                          {pathCards[currentCard].visual.split(' ').slice(1).join(' ')}
                        </p>
                      </div>
                      
                      <motion.div 
                        className={`p-6 rounded-xl bg-gradient-to-r from-${pathCards[currentCard].color}/20 to-${pathCards[currentCard].color}/10 border border-${pathCards[currentCard].color}/30 text-center`}
                        whileHover={{ scale: 1.05 }}
                      >
                        <div className={`text-3xl font-bold text-${pathCards[currentCard].color} mb-1`}>
                          {pathCards[currentCard].stat}
                        </div>
                        <div className="text-xs text-muted-foreground font-medium">
                          {pathCards[currentCard].statLabel}
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
                  className="p-3 rounded-full hover:bg-accent/10 transition-colors border border-accent/20"
                >
                  <ChevronLeft className="w-5 h-5 text-foreground" />
                </button>
                
                <div className="flex space-x-2">
                  {pathCards.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => goToCard(index)}
                      className={`w-3 h-3 rounded-full transition-colors ${
                        index === currentCard ? 'bg-accent' : 'bg-muted-foreground/30'
                      }`}
                    />
                  ))}
                </div>
                
                <button
                  onClick={nextCard}
                  className="p-3 rounded-full hover:bg-accent/10 transition-colors border border-accent/20"
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