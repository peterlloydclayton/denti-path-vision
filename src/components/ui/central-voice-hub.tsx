import { motion } from 'framer-motion';
import { Mic } from 'lucide-react';
import { Button } from '@/components/ui/button';
import echoAvatar from '@/assets/echo-avatar.png';

interface CentralVoiceHubProps {
  onVoiceChat: () => void;
}

export const CentralVoiceHub = ({ onVoiceChat }: CentralVoiceHubProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, y: 12 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ type: 'spring', stiffness: 400, damping: 25 }}
      className="fixed bottom-24 right-5 md:right-8 z-[100] pointer-events-none"
    >
      <motion.div
        className="relative pointer-events-auto"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.96 }}
      >
        <motion.div
          className="absolute inset-0 rounded-full border-2 border-dental-blue/60 pointer-events-none"
          animate={{ scale: [1, 1.3, 1.3], opacity: [0.65, 0, 0] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: 'easeOut' }}
        />
        <Button
          type="button"
          size="icon"
          onClick={onVoiceChat}
          aria-label="Talk to Echo"
          title="Talk to Echo"
          className="relative h-16 w-16 overflow-hidden rounded-full border-2 border-background bg-foreground p-0 shadow-2xl"
        >
          <img src={echoAvatar} alt="" className="h-full w-full object-cover" />
          <span className="absolute bottom-1 right-1 flex h-5 w-5 items-center justify-center rounded-full bg-dental-blue text-foreground ring-2 ring-background">
            <Mic className="h-3 w-3" />
          </span>
        </Button>
      </motion.div>
    </motion.div>
  );
};
