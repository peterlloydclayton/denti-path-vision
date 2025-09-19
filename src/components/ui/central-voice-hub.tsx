import { Bot } from 'lucide-react';
import { motion } from 'framer-motion';
import { AudioVisualizer, Waveform, EqualizerBars } from './audio-visualizer';
import { PulseRipples } from './pulse-ripples';

interface CentralVoiceHubProps {
  className?: string;
}

export const CentralVoiceHub = ({ className = '' }: CentralVoiceHubProps) => {
  return (
    <div className={`relative flex flex-col items-center ${className}`}>
      {/* Main Bot Icon with Ripples */}
      <div className="relative mb-8">
        <PulseRipples isActive={true} className="w-24 h-24" />
        <motion.div
          className="absolute inset-0 flex items-center justify-center z-20"
          animate={{
            rotate: [0, 5, -5, 0],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <Bot className="text-dental-blue" size={48} />
        </motion.div>
        
        {/* Inner glow effect */}
        <motion.div
          className="absolute inset-0 w-24 h-24 rounded-full bg-gradient-radial from-dental-blue/20 to-transparent"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

      {/* Audio Visualizers Stack */}
      <div className="flex flex-col items-center gap-6">
        <motion.div
          animate={{ opacity: [0.7, 1, 0.7] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <AudioVisualizer className="h-10" barCount={15} />
        </motion.div>
        
        <motion.div
          animate={{ opacity: [0.5, 0.9, 0.5] }}
          transition={{ duration: 2.5, repeat: Infinity, delay: 0.5 }}
        >
          <Waveform />
        </motion.div>
        
      </div>

      {/* Speaking indicator text */}
      <motion.p
        className="text-sm text-dental-blue/70 mt-4 font-medium"
        animate={{
          opacity: [0.5, 1, 0.5],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        Echo is explaining your options...
      </motion.p>
    </div>
  );
};