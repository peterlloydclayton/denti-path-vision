import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { X, Mic, MicOff, Bot } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { VoiceAgent, VoiceAgentStatus } from '@/utils/VoiceAgent';
import { useToast } from '@/hooks/use-toast';
import logo from '@/assets/dentipay-logo.png';

interface VoiceAgentFullscreenIntroProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (path: string) => void;
}

export const VoiceAgentFullscreenIntro = ({ isOpen, onClose, onNavigate }: VoiceAgentFullscreenIntroProps) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [status, setStatus] = useState<VoiceAgentStatus>('idle');
  const [transcript, setTranscript] = useState('');
  const [transcriptRole, setTranscriptRole] = useState<'user' | 'assistant'>('assistant');
  const agentRef = useRef<VoiceAgent | null>(null);
  const hasStartedRef = useRef(false);

  const handleToolCall = useCallback((toolName: string, _args: Record<string, unknown>) => {
    console.log('Tool call received:', toolName);
    
    switch (toolName) {
      case 'navigate_to_patients':
        toast({
          title: "Navigating to Patients",
          description: "Taking you to learn about dental financing options...",
        });
        setTimeout(() => {
          onNavigate('/patients');
        }, 1000);
        break;

      case 'navigate_to_providers':
        toast({
          title: "Navigating to Providers",
          description: "Taking you to learn about offering financing...",
        });
        setTimeout(() => {
          onNavigate('/providers');
        }, 1000);
        break;

      case 'get_started_providers':
        toast({
          title: "Opening Provider Signup",
          description: "Let's get your practice started with DentiPay...",
        });
        setTimeout(() => {
          onNavigate('/providers');
          window.dispatchEvent(new CustomEvent('openProviderSignup'));
        }, 1000);
        break;
    }
  }, [onNavigate, toast]);

  const startAgent = useCallback(async () => {
    if (agentRef.current?.isActive()) return;

    try {
      const agent = new VoiceAgent({
        onStatusChange: setStatus,
        onTranscript: (text, isFinal, role) => {
          if (!isFinal) {
            setTranscript(text);
            setTranscriptRole(role);
          } else {
            setTranscript('');
          }
        },
        onError: (error) => {
          toast({
            title: "Voice Agent Error",
            description: error,
            variant: "destructive",
          });
        },
        onToolCall: handleToolCall,
      });

      agentRef.current = agent;
      await agent.connect();
    } catch (error) {
      console.error('Failed to start voice agent:', error);
    }
  }, [toast, handleToolCall]);

  const stopAgent = useCallback(() => {
    if (agentRef.current) {
      agentRef.current.disconnect();
      agentRef.current = null;
    }
  }, []);

  // Auto-start when opened
  useEffect(() => {
    if (isOpen && !hasStartedRef.current) {
      hasStartedRef.current = true;
      const timer = setTimeout(() => {
        startAgent();
      }, 800);
      return () => clearTimeout(timer);
    }
  }, [isOpen, startAgent]);

  // Cleanup on close
  useEffect(() => {
    if (!isOpen) {
      stopAgent();
      hasStartedRef.current = false;
    }
  }, [isOpen, stopAgent]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      stopAgent();
    };
  }, [stopAgent]);

  // Generate wave bars for visualization
  const waveBarCount = 40;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[200] bg-background/70 backdrop-blur-xl flex flex-col items-center justify-center"
        >
          {/* Close Button */}
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="absolute top-4 right-4 z-10 text-muted-foreground hover:text-foreground"
          >
            <X className="w-6 h-6" />
          </Button>

          {/* Skip Button */}
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            onClick={onClose}
            className="absolute top-4 left-4 text-sm text-muted-foreground hover:text-foreground transition-colors underline"
          >
            Skip voice assistant
          </motion.button>

          {/* Logo */}
          <motion.img
            src={logo}
            alt="DentiPay"
            className="h-12 md:h-16 mb-8"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          />

          {/* Echo Avatar */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="relative mb-8"
          >
            <div className="w-24 h-24 md:w-32 md:h-32 rounded-full bg-dental-blue/10 flex items-center justify-center">
              <Bot className="w-12 h-12 md:w-16 md:h-16 text-dental-blue" />
            </div>
            {status === 'speaking' && (
              <motion.div
                className="absolute inset-0 rounded-full border-4 border-dental-blue"
                animate={{ scale: [1, 1.15, 1], opacity: [0.8, 0, 0.8] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
            )}
            {status === 'listening' && (
              <motion.div
                className="absolute inset-0 rounded-full border-4 border-green-500"
                animate={{ scale: [1, 1.1, 1], opacity: [0.8, 0.4, 0.8] }}
                transition={{ duration: 0.8, repeat: Infinity }}
              />
            )}
          </motion.div>

          {/* Status Text */}
          <motion.h2
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-xl md:text-2xl font-semibold text-foreground mb-2"
          >
            {status === 'connecting' ? 'Echo is connecting...' :
             status === 'speaking' ? 'Echo is speaking' :
             status === 'listening' ? 'Listening...' :
             'Meet Echo, your AI assistant'}
          </motion.h2>

          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-muted-foreground text-center max-w-md px-4 mb-8"
          >
            {status === 'idle' ? "I'm here to help you navigate DentiPay and answer any questions about dental financing." : ''}
          </motion.p>

          {/* Live Transcript */}
          <AnimatePresence>
            {transcript && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className={`max-w-lg mx-4 mb-8 px-6 py-4 rounded-2xl ${
                  transcriptRole === 'user' 
                    ? 'bg-dental-blue/80 text-white' 
                    : 'bg-muted text-foreground'
                }`}
              >
                <p className="text-center">{transcript}</p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Full-width Wave Visualization */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="w-full max-w-4xl px-4 h-32 md:h-48 flex items-center justify-center gap-1"
          >
            {Array.from({ length: waveBarCount }).map((_, i) => {
              const isActive = status === 'speaking' || status === 'listening';
              const delay = i * 0.03;
              const baseHeight = isActive ? 20 : 8;
              const maxHeight = status === 'speaking' ? 100 : status === 'listening' ? 60 : 8;
              
              return (
                <motion.div
                  key={i}
                  className={`w-1.5 md:w-2 rounded-full ${
                    status === 'speaking' ? 'bg-dental-blue' :
                    status === 'listening' ? 'bg-green-500' :
                    'bg-muted-foreground/30'
                  }`}
                  animate={{
                    height: isActive 
                      ? [baseHeight, maxHeight * (0.5 + Math.random() * 0.5), baseHeight]
                      : baseHeight,
                  }}
                  transition={{
                    duration: isActive ? 0.4 + Math.random() * 0.3 : 0.3,
                    repeat: isActive ? Infinity : 0,
                    delay: delay,
                    ease: 'easeInOut',
                  }}
                />
              );
            })}
          </motion.div>

          {/* Microphone Control */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="mt-8"
          >
            <Button
              size="lg"
              variant={status === 'idle' || status === 'error' ? 'default' : 'outline'}
              className={`rounded-full w-20 h-20 ${
                status === 'listening' ? 'bg-green-500 hover:bg-green-600 border-green-500' :
                status === 'speaking' ? 'bg-dental-blue hover:bg-dental-blue-dark border-dental-blue' :
                'bg-dental-blue hover:bg-dental-blue-dark'
              }`}
              onClick={() => {
                if (agentRef.current?.isActive()) {
                  stopAgent();
                } else {
                  startAgent();
                }
              }}
              disabled={status === 'connecting'}
            >
              {status === 'connecting' ? (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                  className="w-8 h-8 border-3 border-current border-t-transparent rounded-full"
                />
              ) : agentRef.current?.isActive() ? (
                <MicOff className="w-8 h-8" />
              ) : (
                <Mic className="w-8 h-8" />
              )}
            </Button>
            <p className="text-center text-sm text-muted-foreground mt-4">
              {agentRef.current?.isActive() 
                ? 'Click to end conversation' 
                : 'Click to start talking'}
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
