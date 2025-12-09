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
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50">
      <AnimatePresence>
        {isExpanded && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-background/40 backdrop-blur-sm z-40"
              onClick={() => setIsExpanded(false)}
            />

            {/* Options */}
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.8 }}
              transition={{ type: 'spring', damping: 20, stiffness: 300 }}
              className="absolute bottom-20 right-0 flex flex-col gap-3 items-end z-50"
            >
              {/* Voice Chat Option */}
              <motion.button
                initial={{ x: 20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.05 }}
                onClick={handleVoiceChat}
                className="flex items-center gap-3 px-4 py-3 bg-dental-blue text-white rounded-full shadow-lg hover:bg-dental-blue-dark transition-colors group"
              >
                <span className="text-sm font-medium whitespace-nowrap">Talk to Echo</span>
                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                  <Mic className="w-5 h-5" />
                </div>
              </motion.button>

              {/* Text Chat Option */}
              <motion.button
                initial={{ x: 20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.1 }}
                onClick={handleTextChat}
                className="flex items-center gap-3 px-4 py-3 bg-foreground text-background rounded-full shadow-lg hover:bg-foreground/90 transition-colors group"
              >
                <span className="text-sm font-medium whitespace-nowrap">Text Chat</span>
                <div className="w-10 h-10 rounded-full bg-background/20 flex items-center justify-center">
                  <MessageCircle className="w-5 h-5" />
                </div>
              </motion.button>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Main Hub Button */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', stiffness: 400, damping: 25 }}
        onClick={() => setIsExpanded(!isExpanded)}
        className={`
          relative w-[120px] h-[120px] rounded-full 
          bg-foreground text-dental-blue
          shadow-2xl
          transition-all duration-300
          flex items-center justify-center
          border-4 border-dental-blue/30
          z-50
        `}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        {/* Glow Effect */}
        <motion.div
          className="absolute inset-0 rounded-full bg-foreground"
          animate={{
            boxShadow: [
              '0 0 20px 5px rgba(255, 255, 255, 0.3), 0 0 30px 10px rgba(0, 149, 255, 0.2)',
              '0 0 30px 10px rgba(255, 255, 255, 0.5), 0 0 50px 15px rgba(0, 149, 255, 0.4)',
              '0 0 20px 5px rgba(255, 255, 255, 0.3), 0 0 30px 10px rgba(0, 149, 255, 0.2)',
            ],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />

        {/* Pulse Ring */}
        <motion.div
          className="absolute inset-0 rounded-full border-2 border-dental-blue/50"
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
              <X className="w-12 h-12 relative z-10 text-dental-blue" />
            </motion.div>
          ) : (
            <motion.div
              key="mic"
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.5, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="relative z-10"
            >
              <Mic className="w-12 h-12 text-dental-blue" />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Label - centered above button */}
        <motion.span
          className="absolute -top-12 left-1/2 -translate-x-1/2 text-sm font-medium text-foreground bg-background px-4 py-2 rounded-lg shadow-lg whitespace-nowrap border border-border"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: isExpanded ? 0 : 1, y: isExpanded ? 10 : 0 }}
        >
          Chat with Echo
          <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-background border-r border-b border-border rotate-45" />
        </motion.span>
      </motion.button>
    </div>
  );
};
