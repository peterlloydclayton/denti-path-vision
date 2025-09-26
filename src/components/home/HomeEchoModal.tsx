import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, Mic, MessageCircle, Clock, Zap } from 'lucide-react';

interface HomeEchoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const echoCards = [
  {
    title: "Natural Voice Intelligence",
    subtitle: "Conversations that feel human, powered by AI",
    points: [
      "Understands medical terminology and dental concerns naturally",
      "Responds to patient emotions and adjusts communication style",
      "Multilingual support with cultural sensitivity built-in",
      "Voice biometric analysis for stress and anxiety detection"
    ],
    visual: "🎤 Voice wave visualization",
    icon: Mic,
    color: "primary"
  },
  {
    title: "24/7 Pre-Consultation Support",
    subtitle: "AI assistant that never sleeps, always ready to help",
    points: [
      "Instant responses to patient questions at any time",
      "Pre-visit anxiety reduction through educational conversations",
      "Symptom collection and initial triage before appointments",
      "Appointment scheduling with intelligent calendar optimization"
    ],
    visual: "🌙 Always-on availability graphic",
    icon: Clock,
    color: "accent"
  },
  {
    title: "Intelligent Patient Guidance",
    subtitle: "Pre-cognitive coaching that improves outcomes",
    points: [
      "Guides patients through pre-treatment preparation steps",
      "Predicts and addresses common concerns before they arise",
      "Personalized education based on treatment complexity",
      "Real-time emotional support during decision-making"
    ],
    visual: "🧠 Guidance flow diagram",
    icon: MessageCircle,
    color: "success"
  },
  {
    title: "Seamless Practice Integration",
    subtitle: "AI that enhances human care, never replaces it",
    points: [
      "Integrates with existing phone systems and chat platforms",
      "Intelligent handoff to human staff when needed",
      "Comprehensive conversation logs for provider review", 
      "HIPAA-compliant voice processing and storage"
    ],
    visual: "⚡ Integration network diagram",
    icon: Zap,
    color: "primary"
  }
];

export const HomeEchoModal = ({ isOpen, onClose }: HomeEchoModalProps) => {
  const [currentCard, setCurrentCard] = useState(0);

  const nextCard = () => {
    setCurrentCard((prev) => (prev + 1) % echoCards.length);
  };

  const prevCard = () => {
    setCurrentCard((prev) => (prev - 1 + echoCards.length) % echoCards.length);
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
            className="relative w-full max-w-5xl mx-4 md:mx-6 bg-background rounded-3xl shadow-2xl max-h-[90vh] overflow-hidden border border-primary/20"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
          >
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-6 right-6 z-10 p-2 rounded-full bg-background/80 hover:bg-background transition-colors border border-primary/20"
            >
              <X className="w-5 h-5 text-foreground" />
            </button>

            {/* Header */}
            <div className="p-8 md:p-12 border-b border-primary/10">
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 bg-primary/20 rounded-2xl">
                  <Mic className="w-8 h-8 text-primary" />
                </div>
                <div>
                  <h2 className="text-3xl font-bold text-foreground">ECHO</h2>
                  <p className="text-lg text-muted-foreground">Voice-Enabled AI Assistant</p>
                </div>
              </div>
              <p className="text-muted-foreground max-w-2xl">
                Revolutionary voice AI that provides 24/7 patient support with natural language processing 
                and emotional intelligence built for healthcare.
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
                        <div className={`p-3 bg-${echoCards[currentCard].color}/20 rounded-xl`}>
                          {currentCard === 0 && <Mic className={`w-6 h-6 text-${echoCards[currentCard].color}`} />}
                          {currentCard === 1 && <Clock className={`w-6 h-6 text-${echoCards[currentCard].color}`} />}
                          {currentCard === 2 && <MessageCircle className={`w-6 h-6 text-${echoCards[currentCard].color}`} />}
                          {currentCard === 3 && <Zap className={`w-6 h-6 text-${echoCards[currentCard].color}`} />}
                        </div>
                      <h3 className="text-2xl font-bold text-foreground">
                        {echoCards[currentCard].title}
                      </h3>
                    </div>
                    <p className="text-lg text-muted-foreground mb-6">
                      {echoCards[currentCard].subtitle}
                    </p>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                    <div className="space-y-4 text-left">
                      {echoCards[currentCard].points.map((point, index) => (
                        <motion.div 
                          key={index} 
                          className="flex items-start gap-3 p-3 rounded-lg hover:bg-primary/5 transition-colors"
                          whileHover={{ x: 4 }}
                        >
                          <div className={`w-2 h-2 rounded-full bg-${echoCards[currentCard].color} mt-2 flex-shrink-0`} />
                          <span className="text-foreground">{point}</span>
                        </motion.div>
                      ))}
                    </div>
                    
                    <div className="flex items-center justify-center p-8 bg-gradient-to-br from-primary/10 to-accent/5 rounded-2xl border border-primary/20">
                      <div className="text-center">
                        <div className="text-6xl mb-4">{echoCards[currentCard].visual.split(' ')[0]}</div>
                        <p className="text-sm text-muted-foreground font-medium">
                          {echoCards[currentCard].visual.split(' ').slice(1).join(' ')}
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Navigation */}
              <div className="flex justify-center items-center space-x-6 mt-12">
                <button
                  onClick={prevCard}
                  className="p-3 rounded-full hover:bg-primary/10 transition-colors border border-primary/20"
                >
                  <ChevronLeft className="w-5 h-5 text-foreground" />
                </button>
                
                <div className="flex space-x-2">
                  {echoCards.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => goToCard(index)}
                      className={`w-3 h-3 rounded-full transition-colors ${
                        index === currentCard ? 'bg-primary' : 'bg-muted-foreground/30'
                      }`}
                    />
                  ))}
                </div>
                
                <button
                  onClick={nextCard}
                  className="p-3 rounded-full hover:bg-primary/10 transition-colors border border-primary/20"
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