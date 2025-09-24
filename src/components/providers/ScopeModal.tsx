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
            className="relative w-full max-w-5xl mx-4 md:mx-6 bg-gradient-to-br from-white to-gray-50/30 rounded-3xl shadow-2xl max-h-[90vh] overflow-hidden border border-gray-100"
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

            {/* Navigation tabs */}
            <button
              onClick={prevCard}
              className="absolute -left-4 top-1/2 -translate-y-1/2 z-10 bg-dental-blue-dark text-white p-3 rounded-r-xl shadow-lg hover:bg-dental-blue-dark/90 transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={nextCard}
              className="absolute -right-4 top-1/2 -translate-y-1/2 z-10 bg-dental-blue-dark text-white p-3 rounded-l-xl shadow-lg hover:bg-dental-blue-dark/90 transition-colors"
            >
              <ChevronRight className="w-5 h-5" />
            </button>

            {/* Content */}
            <div className="p-12 md:p-16">
              <div className="text-center mb-12">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-dental-blue-dark rounded-2xl mb-6">
                  <span className="text-2xl font-bold text-white">S</span>
                </div>
                <h2 className="text-4xl md:text-5xl font-bold text-dental-blue-dark mb-4">SCOPE</h2>
                <p className="text-xl text-gray-600">Intelligence Engine Excellence</p>
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
                  <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 mb-8">
                    <div className="mb-8">
                      <h3 className="text-3xl font-bold mb-4 text-dental-blue-dark leading-tight">
                        {scopeCards[currentCard].title}
                      </h3>
                      <p className="text-xl text-gray-600 leading-relaxed">
                        {scopeCards[currentCard].subtitle}
                      </p>
                    </div>

                    <ul className="space-y-5 text-left max-w-3xl mx-auto">
                      {scopeCards[currentCard].points.map((point, index) => (
                        <li key={index} className="flex items-start gap-4">
                          <div className="w-6 h-6 rounded-full bg-gradient-to-r from-dental-blue-dark to-dental-blue-light flex items-center justify-center mt-0.5 flex-shrink-0">
                            <span className="text-white text-xs font-bold">{index + 1}</span>
                          </div>
                          <span className="text-gray-700 text-lg leading-relaxed">{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Dots indicator */}
              <div className="flex justify-center space-x-3 mt-8">
                {scopeCards.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToCard(index)}
                    className={`w-4 h-4 rounded-full transition-all duration-300 ${
                      index === currentCard 
                        ? 'bg-dental-blue-dark scale-125' 
                        : 'bg-gray-300 hover:bg-gray-400'
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