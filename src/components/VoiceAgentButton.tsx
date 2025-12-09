import { motion } from 'framer-motion';
import { Mic } from 'lucide-react';

interface VoiceAgentButtonProps {
  onClick: () => void;
}

export const VoiceAgentButton = ({ onClick }: VoiceAgentButtonProps) => {
  return (
    <motion.button
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 0.5, type: 'spring', damping: 15 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-dental-blue text-white shadow-lg hover:bg-dental-blue-dark transition-colors flex items-center justify-center group"
      aria-label="Talk to Echo AI Assistant"
    >
      {/* Pulse animation */}
      <motion.div
        className="absolute inset-0 rounded-full bg-dental-blue"
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.5, 0, 0.5],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
      
      <Mic className="w-6 h-6 relative z-10" />
      
      {/* Tooltip */}
      <div className="absolute right-full mr-3 px-3 py-2 bg-foreground text-background text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
        Talk to Echo
        <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1 w-2 h-2 bg-foreground rotate-45" />
      </div>
    </motion.button>
  );
};
