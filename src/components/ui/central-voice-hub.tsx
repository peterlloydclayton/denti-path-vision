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

  // Button size
  const buttonSize = 80; // px
  const pillOffset = 140; // distance from center to pill center

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

      {/* Hub Container - centered at bottom of viewport */}
      <div 
        className="fixed z-50"
        style={{ 
          bottom: '24px',
          left: '50vw',
          transform: 'translateX(-50%)',
        }}
      >
        {/* Pills container - same center as button */}
        <AnimatePresence>
          {isExpanded && (
            <>
              {/* Voice Chat Option - Left */}
              <motion.button
                initial={{ opacity: 0, x: 0, y: 0, scale: 0.8 }}
                animate={{ opacity: 1, x: -pillOffset, y: -20, scale: 1 }}
                exit={{ opacity: 0, x: 0, y: 0, scale: 0.8 }}
                transition={{ type: 'spring', damping: 20, stiffness: 300 }}
                onClick={handleVoiceChat}
                style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  marginLeft: -80, // half of pill width estimate
                  marginTop: -24, // half of pill height estimate
                }}
                className="flex items-center gap-2 px-4 py-3 bg-dental-blue rounded-full shadow-lg hover:bg-dental-blue/90 transition-colors z-[60]"
              >
                <div className="w-8 h-8 rounded-full bg-black/20 flex items-center justify-center">
                  <Mic className="w-4 h-4 text-black" />
                </div>
                <span className="text-sm font-medium whitespace-nowrap text-black">Talk to Echo</span>
              </motion.button>

              {/* Text Chat Option - Right */}
              <motion.button
                initial={{ opacity: 0, x: 0, y: 0, scale: 0.8 }}
                animate={{ opacity: 1, x: pillOffset, y: -20, scale: 1 }}
                exit={{ opacity: 0, x: 0, y: 0, scale: 0.8 }}
                transition={{ type: 'spring', damping: 20, stiffness: 300, delay: 0.05 }}
                onClick={handleTextChat}
                style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  marginLeft: -60, // half of pill width estimate
                  marginTop: -24, // half of pill height estimate
                }}
                className="flex items-center gap-2 px-4 py-3 bg-foreground text-background rounded-full shadow-lg hover:bg-foreground/90 transition-colors z-[60]"
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
          style={{ width: buttonSize, height: buttonSize }}
          className="relative rounded-full bg-foreground shadow-2xl flex items-center justify-center overflow-hidden"
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
                <X className="w-8 h-8 text-dental-blue" />
              </motion.div>
            ) : (
              <motion.div
                key="mic"
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.5, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <Mic className="w-8 h-8 text-dental-blue" />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.button>

        {/* Label above button */}
        <motion.div
          className="absolute left-1/2 -translate-x-1/2 text-center pointer-events-none"
          style={{ bottom: buttonSize + 20 }}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: isExpanded ? 0 : 1, y: isExpanded ? 10 : 0 }}
        >
          <h2 className="text-2xl md:text-3xl font-semibold text-foreground whitespace-nowrap">
            Click the microphone to start talking with Echo
          </h2>
        </motion.div>
      </div>
    </>
  );
};
