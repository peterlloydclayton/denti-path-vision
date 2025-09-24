import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface PathModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const pathCards = [
  {
    title: "2-Minute Smart Application",
    subtitle: "Frictionless intake that understands patients",
    points: [
      "Unified form captures symptoms, financial data, and consent in one flow",
      "Eliminates awkward financial conversations at the chair",
      "Smart form logic adapts questions based on previous answers"
    ],
    visual: "📱 Mobile-friendly intake form mockup"
  },
  {
    title: "Real-Time Decisions, No Waiting",
    subtitle: "94% approval rate in under 30 seconds",
    points: [
      "Instant underwriting using 30+ data points (vs traditional 3-5)",
      "Real-time banking verification through Plaid integration",
      "Clear, transparent terms presented immediately - no callbacks needed"
    ],
    visual: "✅ Animation showing APPROVED status"
  },
  {
    title: "Psychology-Driven Acceptance",
    subtitle: "Understanding how patients make financial decisions",
    points: [
      "AI presents financing options in order of likelihood to accept",
      "Customizes payment terms based on individual comfort zones",
      "Times financing presentation at moment of highest acceptance"
    ],
    visual: "🧠 Behavioral pattern visualization"
  },
  {
    title: "Case Packaging Intelligence",
    subtitle: "Pre-aligned funding meets clinical needs",
    points: [
      "Automatically packages treatment plans with appropriate financing",
      "Matches urgency of care with payment flexibility",
      "Enables phased treatment plans with guaranteed funding",
      "Provider chooses Fast Pay or Full Pay disbursement"
    ],
    visual: "🔗 Treatment-to-financing flow diagram"
  },
  {
    title: "Works With Your Existing Systems",
    subtitle: "API-first design for any practice management software",
    points: [
      "Direct integration with 50+ practice management systems",
      "No double entry - automatic data sync",
      "HIPAA-compliant with white-label options for DSOs"
    ],
    visual: "⚡ Connected software system icons"
  }
];

export const PathModal = ({ isOpen, onClose }: PathModalProps) => {
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


            {/* Content */}
            <div className="p-8 md:p-12">
              <div className="text-left mb-8">
                <h2 className="text-xl font-bold text-black">PATH</h2>
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
                      {pathCards[currentCard].title}
                    </h3>
                    <p className="text-lg text-muted-foreground mb-6">
                      {pathCards[currentCard].subtitle}
                    </p>
                  </div>

                  <ul className="space-y-3 text-left max-w-2xl mx-auto">
                    {pathCards[currentCard].points.map((point, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                        <span className="text-muted-foreground">{point}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              </AnimatePresence>

              {/* Navigation with dots */}
              <div className="flex justify-center items-center space-x-4 mt-8">
                <button
                  onClick={prevCard}
                  className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                >
                  <ChevronLeft className="w-5 h-5 text-gray-600" />
                </button>
                
                <div className="flex space-x-2">
                  {pathCards.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => goToCard(index)}
                      className={`w-3 h-3 rounded-full transition-colors ${
                        index === currentCard ? 'bg-primary' : 'bg-gray-300'
                      }`}
                    />
                  ))}
                </div>
                
                <button
                  onClick={nextCard}
                  className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                >
                  <ChevronRight className="w-5 h-5 text-gray-600" />
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};