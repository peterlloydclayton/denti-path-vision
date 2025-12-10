import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, Mic, X } from 'lucide-react';

interface CentralVoiceHubProps {
  onTextChat: () => void;
  onVoiceChat: () => void;
}

export const CentralVoiceHub = ({ onTextChat, onVoiceChat }: CentralVoiceHubProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleTextChat = () => {
    setIsExpanded(false);
    onTextChat();
  };

  const handleVoiceChat = () => {
    setIsExpanded(false);
    onVoiceChat();
  };

  return (
    <>
      {/* Backdrop */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-background/40 backdrop-blur-sm z-40"
            onClick={() => setIsExpanded(false)}
          />
        )}
      </AnimatePresence>

      {/* Hub Container - using left: 50% with transform for true centering */}
      <div 
        className="fixed bottom-6 z-50"
        style={{ left: '50%', transform: 'translateX(-50%)' }}
      >
        {/* Option Pills */}
        <AnimatePresence>
          {isExpanded && (
            <>
              {/* Voice Chat Option - Left */}
              <motion.button
                initial={{ opacity: 0, x: 0, y: 0 }}
                animate={{ opacity: 1, x: -120, y: -20 }}
                exit={{ opacity: 0, x: 0, y: 0 }}
                transition={{ type: 'spring', damping: 20, stiffness: 300 }}
                onClick={handleVoiceChat}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center gap-2 px-4 py-3 bg-dental-blue rounded-full shadow-lg hover:bg-dental-blue/90 transition-colors z-[60]"
              >
                <div className="w-8 h-8 rounded-full bg-black/20 flex items-center justify-center">
                  <Mic className="w-4 h-4 text-black" />
                </div>
                <span className="text-sm font-medium whitespace-nowrap text-black">Talk to Echo</span>
              </motion.button>

              {/* Text Chat Option - Right */}
              <motion.button
                initial={{ opacity: 0, x: 0, y: 0 }}
                animate={{ opacity: 1, x: 120, y: -20 }}
                exit={{ opacity: 0, x: 0, y: 0 }}
                transition={{ type: 'spring', damping: 20, stiffness: 300, delay: 0.05 }}
                onClick={handleTextChat}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center gap-2 px-4 py-3 bg-foreground text-background rounded-full shadow-lg hover:bg-foreground/90 transition-colors z-[60]"
              >
                <span className="text-sm font-medium whitespace-nowrap">Text Chat</span>
                <div className="w-8 h-8 rounded-full bg-background/20 flex items-center justify-center">
                  <MessageCircle className="w-4 h-4" />
                </div>
              </motion.button>
            </>
          )}
        </AnimatePresence>

        {/* Main Hub Button */}
        <motion.button
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 400, damping: 25 }}
          onClick={() => setIsExpanded(!isExpanded)}
          className="relative w-16 h-16 rounded-full bg-foreground shadow-2xl flex items-center justify-center overflow-hidden"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {/* Pulse Ring */}
          <motion.div
            className="absolute inset-0 rounded-full border-2 border-dental-blue/50 pointer-events-none"
            animate={{
              scale: [1, 1.4, 1.4],
              opacity: [0.6, 0, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeOut',
            }}
          />

          {/* Icon */}
          <AnimatePresence mode="wait">
            {isExpanded ? (
              <motion.div
                key="close"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <X className="w-7 h-7 text-dental-blue" />
              </motion.div>
            ) : (
              <motion.div
                key="mic"
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.5, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <Mic className="w-7 h-7 text-dental-blue" />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.button>

        {/* Label above button */}
        <motion.span
          className="absolute -top-10 left-1/2 -translate-x-1/2 text-sm font-medium text-foreground bg-background px-4 py-2 rounded-lg shadow-lg whitespace-nowrap border border-border pointer-events-none"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: isExpanded ? 0 : 1, y: isExpanded ? 10 : 0 }}
        >
          Chat with Echo
          <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-background border-r border-b border-border rotate-45" />
        </motion.span>
      </div>
    </>
  );
};
