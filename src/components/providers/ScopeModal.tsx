import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

interface ScopeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const scopeCards = [
  {
    title: "AI-Powered Clinical Intelligence",
    subtitle: "Specialist-level guidance for every chair",
    points: [
      "Analyzes clinical inputs in real-time during consultation",
      "Prioritizes treatment based on urgency and medical necessity",
      "Reduces clinical decision time by 67%"
    ],
    visual: "🧠 AI analyzing dental data visualization"
  },
  {
    title: "30+ Data Points Per Decision",
    subtitle: "Traditional lending asks one question. SCOPE answers with thirty.",
    points: [
      "Analyzes credit history, verified income, and business metrics",
      "Goes beyond FICO to understand true payment capacity",
      "Identifies alternative funding sources others miss"
    ],
    visual: "📊 Multi-metric dashboard"
  },
  {
    title: "Know Success Before You Start",
    subtitle: "Strategic Clinical & Outcome Prediction Engine",
    points: [
      "Predicts treatment acceptance probability before presentation",
      "Forecasts payment performance over treatment timeline",
      "Revenue prediction modeling for practice planning"
    ],
    visual: "📈 Predictive probability graph"
  },
  {
    title: "Turn 'Can't Pay' Into 'Can Start Today'",
    subtitle: "Unlocking care for previously unreachable patients",
    points: [
      "Converts 40% more patients than traditional financing",
      "Maximum financing up to $100,000 (vs industry $5-15K)",
      "0% interest options up to 18 months"
    ],
    visual: "💰 Conversion rate comparison chart"
  },
  {
    title: "Revenue Without Risk",
    subtitle: "SCOPE protects while it approves",
    points: [
      "Provider paid upfront - zero recourse on defaults",
      "Real-time fraud detection and chargeback protection",
      "Performance-based pricing rewards quality providers"
    ],
    visual: "🛡️ Shield protection layers graphic"
  }
];

export const ScopeModal = ({ isOpen, onClose }: ScopeModalProps) => {
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
            className="relative w-full max-w-4xl mx-4 md:mx-6 bg-white rounded-2xl shadow-2xl max-h-[90vh] overflow-hidden"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
          >
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/80 hover:bg-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Navigation arrows */}
            <button
              onClick={prevCard}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-white/80 hover:bg-white transition-colors"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={nextCard}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-white/80 hover:bg-white transition-colors"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Content */}
            <div className="p-8 md:p-12">
              <div className="text-center mb-8">
                <h2 className="text-3xl md:text-4xl font-bold text-dental-blue-dark mb-2">SCOPE</h2>
                <p className="text-lg text-muted-foreground">Intelligence Engine Excellence</p>
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={currentCard}
                  className="text-center"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="mb-6">
                    <h3 className="text-2xl font-bold mb-2 text-dental-blue-dark">
                      {scopeCards[currentCard].title}
                    </h3>
                    <p className="text-lg text-muted-foreground mb-6">
                      {scopeCards[currentCard].subtitle}
                    </p>
                  </div>

                  <ul className="space-y-3 text-left max-w-2xl mx-auto">
                    {scopeCards[currentCard].points.map((point, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                        <span className="text-muted-foreground">{point}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              </AnimatePresence>

              {/* Dots indicator */}
              <div className="flex justify-center space-x-2 mt-8">
                {scopeCards.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToCard(index)}
                    className={`w-3 h-3 rounded-full transition-colors ${
                      index === currentCard ? 'bg-primary' : 'bg-gray-300'
                    }`}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};