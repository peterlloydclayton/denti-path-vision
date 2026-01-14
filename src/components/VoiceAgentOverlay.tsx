import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Mic, MicOff, Volume2, Bot } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { AudioVisualizer, Waveform } from '@/components/ui/audio-visualizer';
import { VoiceAgent, VoiceAgentStatus } from '@/utils/VoiceAgent';
import { useToast } from '@/hooks/use-toast';
import { useTranslation } from 'react-i18next';

interface VoiceAgentOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (path: string) => void;
  autoStart?: boolean;
}

interface Message {
  id: string;
  role: 'user' | 'assistant';
  text: string;
  timestamp: Date;
}

export const VoiceAgentOverlay = ({ isOpen, onClose, onNavigate, autoStart = false }: VoiceAgentOverlayProps) => {
  const { toast } = useToast();
  const { i18n } = useTranslation();
  const [status, setStatus] = useState<VoiceAgentStatus>('idle');
  const [messages, setMessages] = useState<Message[]>([]);
  const [currentTranscript, setCurrentTranscript] = useState('');
  const [currentRole, setCurrentRole] = useState<'user' | 'assistant'>('assistant');
  const agentRef = useRef<VoiceAgent | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const hasStartedRef = useRef(false);

  const handleLanguageChange = useCallback((language: 'es' | 'en') => {
    if (i18n.language !== language) {
      i18n.changeLanguage(language);
      toast({
        title: language === 'es' ? "Idioma cambiado" : "Language changed",
        description: language === 'es' ? "El sitio ahora está en español" : "The site is now in English",
      });
    }
  }, [i18n, toast]);

  const handleToolCall = useCallback((toolName: string, _args: Record<string, unknown>) => {
    switch (toolName) {
      case 'navigate_to_patients':
        toast({
          title: "Navigating to Patients",
          description: "Taking you to learn about dental financing options...",
        });
        setTimeout(() => {
          onNavigate('/patients');
        }, 1500);
        break;

      case 'navigate_to_providers':
        toast({
          title: "Navigating to Providers",
          description: "Taking you to learn about offering financing...",
        });
        setTimeout(() => {
          onNavigate('/providers');
        }, 1500);
        break;

      case 'navigate_to_financing_application':
        toast({
          title: "Opening Financing Application",
          description: "Taking you to apply for dental financing...",
        });
        setTimeout(() => {
          onNavigate('/patient-financing-application');
        }, 1500);
        break;

      case 'navigate_to_about':
        toast({
          title: "Navigating to About",
          description: "Learn more about DentiPay...",
        });
        setTimeout(() => {
          onNavigate('/about');
        }, 1500);
        break;

      case 'get_started_providers':
        toast({
          title: "Opening Provider Signup",
          description: "Let's get your practice started with DentiPay...",
        });
        setTimeout(() => {
          onNavigate('/providers');
          window.dispatchEvent(new CustomEvent('openProviderSignup'));
        }, 1500);
        break;
    }
  }, [onNavigate, toast]);

  const startAgent = useCallback(async () => {
    if (agentRef.current?.isActive()) return;

    try {
      const agent = new VoiceAgent({
        onStatusChange: setStatus,
        onTranscript: (text, isFinal, role) => {
          if (isFinal) {
            setMessages(prev => [...prev, {
              id: Date.now().toString(),
              role,
              text,
              timestamp: new Date()
            }]);
            setCurrentTranscript('');
          } else {
            setCurrentTranscript(text);
            setCurrentRole(role);
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
        onLanguageChange: handleLanguageChange,
      });

      agentRef.current = agent;
      await agent.connect();
    } catch {
      // Ignore voice agent start errors
    }
  }, [toast, handleToolCall, handleLanguageChange]);

  const stopAgent = useCallback(() => {
    if (agentRef.current) {
      agentRef.current.disconnect();
      agentRef.current = null;
    }
  }, []);

  // Auto-start when opened with autoStart flag
  useEffect(() => {
    if (isOpen && autoStart && !hasStartedRef.current) {
      hasStartedRef.current = true;
      const timer = setTimeout(() => {
        startAgent();
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [isOpen, autoStart, startAgent]);

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

  // Auto-scroll messages
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, currentTranscript]);

  const getStatusText = () => {
    switch (status) {
      case 'connecting': return 'Connecting...';
      case 'connected': return 'Connected';
      case 'speaking': return 'Echo is speaking...';
      case 'listening': return 'Listening...';
      case 'error': return 'Connection error';
      default: return 'Click microphone to start';
    }
  };

  const getStatusColor = () => {
    switch (status) {
      case 'speaking': return 'text-dental-blue';
      case 'listening': return 'text-green-500';
      case 'error': return 'text-destructive';
      case 'connecting': return 'text-yellow-500';
      default: return 'text-muted-foreground';
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop (visual only — does not block page interactions) */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-background/60 backdrop-blur-sm z-[100] pointer-events-none"
            aria-hidden="true"
          />

          {/* Side Panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 h-full w-full max-w-md bg-background border-l border-border shadow-2xl z-[101] flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-border">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-10 h-10 rounded-full bg-dental-blue/10 flex items-center justify-center">
                    <Bot className="w-5 h-5 text-dental-blue" />
                  </div>
                  {status === 'speaking' && (
                    <motion.div
                      className="absolute -right-1 -bottom-1 w-3 h-3 bg-dental-blue rounded-full"
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 0.5, repeat: Infinity }}
                    />
                  )}
                </div>
                <div>
                  <h2 className="font-semibold text-foreground">Echo</h2>
                  <p className={`text-xs ${getStatusColor()}`}>{getStatusText()}</p>
                </div>
              </div>
              <Button variant="ghost" size="icon" onClick={onClose}>
                <X className="w-5 h-5" />
              </Button>
            </div>

            {/* Audio Visualizer */}
            <div className="p-6 bg-gradient-to-b from-dental-blue/5 to-transparent">
              <div className="flex flex-col items-center gap-4">
                {status === 'speaking' && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="w-full"
                  >
                    <AudioVisualizer className="h-12" barCount={20} isActive={true} />
                  </motion.div>
                )}
                {status === 'listening' && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="w-full"
                  >
                    <Waveform isActive={true} />
                  </motion.div>
                )}
                {(status === 'idle' || status === 'connected') && (
                  <div className="h-12 flex items-center justify-center">
                    <Volume2 className="w-6 h-6 text-muted-foreground" />
                  </div>
                )}
              </div>
            </div>

            {/* Messages Area */}
            <ScrollArea className="flex-1 p-4" ref={scrollRef}>
              <div className="space-y-4">
                {messages.map((message) => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[85%] rounded-2xl px-4 py-2 ${
                        message.role === 'user'
                          ? 'bg-dental-blue text-white'
                          : 'bg-muted text-foreground'
                      }`}
                    >
                      <p className="text-sm">{message.text}</p>
                    </div>
                  </motion.div>
                ))}

                {/* Current transcript (live) */}
                {currentTranscript && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className={`flex ${currentRole === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[85%] rounded-2xl px-4 py-2 ${
                        currentRole === 'user'
                          ? 'bg-dental-blue/70 text-white'
                          : 'bg-muted/70 text-foreground'
                      }`}
                    >
                      <p className="text-sm">{currentTranscript}</p>
                      <motion.span
                        animate={{ opacity: [0, 1, 0] }}
                        transition={{ duration: 0.8, repeat: Infinity }}
                      >
                        ▋
                      </motion.span>
                    </div>
                  </motion.div>
                )}

                {/* Empty state */}
                {messages.length === 0 && !currentTranscript && status === 'idle' && (
                  <div className="text-center py-8">
                    <Bot className="w-12 h-12 mx-auto text-muted-foreground/50 mb-4" />
                    <h2 className="text-2xl md:text-3xl font-semibold text-foreground">
                      Click the microphone to start talking with Echo
                    </h2>
                  </div>
                )}
              </div>
            </ScrollArea>

            {/* Controls */}
            <div className="p-4 border-t border-border">
              <div className="flex items-center justify-center gap-4">
                <Button
                  size="lg"
                  variant={status === 'idle' || status === 'error' ? 'default' : 'outline'}
                  className={`rounded-full w-16 h-16 ${
                    status === 'listening' ? 'bg-green-500 hover:bg-green-600' :
                    status === 'speaking' ? 'bg-dental-blue hover:bg-dental-blue-dark' :
                    ''
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
                      className="w-6 h-6 border-2 border-current border-t-transparent rounded-full"
                    />
                  ) : agentRef.current?.isActive() ? (
                    <MicOff className="w-6 h-6" />
                  ) : (
                    <Mic className="w-6 h-6" />
                  )}
                </Button>
              </div>
              <p className="text-center text-xs text-muted-foreground mt-3">
                {agentRef.current?.isActive() 
                  ? 'Click to end conversation' 
                  : 'Click to start voice conversation'}
              </p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
