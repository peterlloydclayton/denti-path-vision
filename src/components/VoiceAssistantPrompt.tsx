import { motion, AnimatePresence } from 'framer-motion';
import { Mic, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import echoAvatar from '@/assets/echo-avatar.png';

interface VoiceAssistantPromptProps {
  isVisible: boolean;
  onAccept: () => void;
  onDismiss: () => void;
}

export const VoiceAssistantPrompt = ({ isVisible, onAccept, onDismiss }: VoiceAssistantPromptProps) => {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="fixed bottom-24 left-1/2 -translate-x-1/2 z-[200] w-[90%] max-w-md"
        >
          <div className="relative bg-gradient-to-br from-dental-blue/95 to-dental-blue-dark/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20 overflow-hidden">
            {/* Animated background glow */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-white/10 via-white/5 to-white/10"
              animate={{ x: ['-100%', '100%'] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
            />
            
            {/* Close button */}
            <button
              onClick={onDismiss}
              className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors z-10"
            >
              <X className="w-4 h-4 text-white" />
            </button>

            <div className="relative p-6 flex items-center gap-4">
              {/* Avatar with pulse */}
              <div className="relative flex-shrink-0">
                <motion.div
                  className="absolute inset-0 rounded-full bg-white/30"
                  animate={{ scale: [1, 1.3, 1], opacity: [0.5, 0, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  style={{ margin: '-4px' }}
                />
                <div className="w-16 h-16 rounded-full overflow-hidden ring-3 ring-white/40 shadow-lg">
                  <img src={echoAvatar} alt="Echo" className="w-full h-full object-cover" />
                </div>
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <h3 className="text-white font-semibold text-lg mb-1">
                  Hi! I'm Echo 👋
                </h3>
                <p className="text-white/80 text-sm leading-relaxed">
                  Would you like me to help guide you through DentiPay?
                </p>
              </div>
            </div>

            {/* Action buttons */}
            <div className="relative px-6 pb-5 flex gap-3">
              <Button
                onClick={onDismiss}
                variant="ghost"
                className="flex-1 h-11 bg-white/10 hover:bg-white/20 text-white border-0"
              >
                Maybe Later
              </Button>
              <Button
                onClick={onAccept}
                className="flex-1 h-11 bg-white hover:bg-white/90 text-dental-blue-dark font-semibold shadow-lg"
              >
                <Mic className="w-4 h-4 mr-2" />
                Let's Chat
              </Button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};