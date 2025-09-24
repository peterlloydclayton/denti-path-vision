import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

interface DentiPayModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const dentiPayCards = [
  {
    title: "Market Leverage",
    subtitle: "The trusted face for dentistry finance",
    points: [
      "A recognizable, unified financial brand increases patient trust",
      "Accelerates treatment acceptance through established credibility",
      "Patients recognize and trust the DentiPay name across practices"
    ],
    visual: "🏆 Brand recognition graphic"
  },
  {
    title: "Network Effect",
    subtitle: "Every provider strengthens the brand",
    points: [
      "Every provider on DentiPay strengthens brand equity",
      "Creates shared patient familiarity across practices",
      "Network growth benefits all participating providers",
      "Cross-referral opportunities within the trusted network"
    ],
    visual: "🌐 Network effect visualization"
  },
  {
    title: "Speed to Adoption",
    subtitle: "Brand credibility accelerates decisions",
    points: [
      "Brand credibility reduces patient hesitation",
      "Shortens decision cycles and converts more cases faster",
      "Pre-established trust eliminates education overhead",
      "Patients arrive already familiar with financing options"
    ],
    visual: "⚡ Speed conversion chart"
  }
];

export const DentiPayModal = ({ isOpen, onClose }: DentiPayModalProps) => {
  const [currentCard, setCurrentCard] = useState(0);

  const nextCard = () => {
    setCurrentCard((prev) => (prev + 1) % dentiPayCards.length);
  };

  const prevCard = () => {
    setCurrentCard((prev) => (prev - 1 + dentiPayCards.length) % dentiPayCards.length);
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
                <h2 className="text-xl font-bold text-black">DentiPay</h2>
                <p className="text-lg text-muted-foreground">The Brand Layer</p>
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
                      {dentiPayCards[currentCard].title}
                    </h3>
                    <p className="text-lg text-muted-foreground mb-6">
                      {dentiPayCards[currentCard].subtitle}
                    </p>
                  </div>

                  <ul className="space-y-3 text-left max-w-2xl mx-auto">
                    {dentiPayCards[currentCard].points.map((point, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                        <span className="text-muted-foreground">{point}</span>
                      </li>
                    ))}
                  </ul>

                  {currentCard === 2 && (
                    <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                      <p className="text-sm italic text-muted-foreground">
                        "DentiPay isn't just another payment option—it's the financial face of modern dental care."
                      </p>
                    </div>
                  )}
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
                  {dentiPayCards.map((_, index) => (
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