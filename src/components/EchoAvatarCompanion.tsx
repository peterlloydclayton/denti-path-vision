import { useState, useEffect, useCallback, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Minus, Mic, MicOff, FileText, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { VoiceAgent, VoiceAgentStatus, PageContext } from '@/utils/VoiceAgent';
import { useToast } from '@/hooks/use-toast';
import { FORM_STEP_CHANGE_EVENT, FormStepChangeDetail } from '@/hooks/useFormContext';
import echoAvatar from '@/assets/echo-avatar.png';

type CompanionState = 'active' | 'minimized' | 'closed';

interface EchoAvatarCompanionProps {
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

export const EchoAvatarCompanion = ({ 
  isOpen, 
  onClose, 
  onNavigate, 
  autoStart = true 
}: EchoAvatarCompanionProps) => {
  const { toast } = useToast();
  const location = useLocation();
  const [companionState, setCompanionState] = useState<CompanionState>('active');
  const [status, setStatus] = useState<VoiceAgentStatus>('idle');
  const [messages, setMessages] = useState<Message[]>([]);
  const [currentTranscript, setCurrentTranscript] = useState('');
  const [currentRole, setCurrentRole] = useState<'user' | 'assistant'>('assistant');
  const agentRef = useRef<VoiceAgent | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const hasStartedRef = useRef(false);

  // Send page context to voice agent when location changes
  const sendPageContext = useCallback((context: PageContext) => {
    if (agentRef.current?.isActive()) {
      agentRef.current.sendPageContext(context);
    }
  }, []);

  // Listen for form step changes
  useEffect(() => {
    const handleStepChange = (event: CustomEvent<FormStepChangeDetail>) => {
      const { stepNumber, stepTitle, fields } = event.detail;
      sendPageContext({
        page: 'Patient Financing Application',
        stepNumber,
        stepTitle,
        fields
      });
    };

    window.addEventListener(FORM_STEP_CHANGE_EVENT, handleStepChange as EventListener);
    return () => {
      window.removeEventListener(FORM_STEP_CHANGE_EVENT, handleStepChange as EventListener);
    };
  }, [sendPageContext]);

  // Send initial page context when agent connects
  useEffect(() => {
    if (status === 'connected') {
      const isOnForm = location.pathname === '/patient-financing-application' || 
                       location.pathname === '/apply';
      if (isOnForm) {
        sendPageContext({
          page: 'Patient Financing Application',
          stepNumber: 1,
          stepTitle: 'Personal Information',
          fields: ['First Name', 'Last Name', 'Date of Birth', 'SSN', 'Email', 'Phone']
        });
      } else {
        sendPageContext({ page: location.pathname });
      }
    }
  }, [status, location.pathname, sendPageContext]);

  const handleToolCall = useCallback((toolName: string, _args: Record<string, unknown>) => {
    console.log('Tool call received:', toolName);
    
    switch (toolName) {
      case 'navigate_to_patients':
        toast({
          title: "Navigating to Patients",
          description: "Taking you to learn about dental financing options...",
        });
        setTimeout(() => onNavigate('/patients'), 1500);
        break;

      case 'navigate_to_providers':
        toast({
          title: "Navigating to Providers",
          description: "Taking you to learn about offering financing...",
        });
        setTimeout(() => onNavigate('/providers'), 1500);
        break;

      case 'navigate_to_financing_application':
        toast({
          title: "Opening Financing Application",
          description: "Taking you to apply for dental financing...",
        });
        setTimeout(() => onNavigate('/patient-financing-application'), 1500);
        break;

      case 'navigate_to_about':
        toast({
          title: "Navigating to About",
          description: "Taking you to learn about DentiPay...",
        });
        setTimeout(() => onNavigate('/about'), 1500);
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
    if (isOpen && autoStart && !hasStartedRef.current) {
      hasStartedRef.current = true;
      setCompanionState('active');
      const timer = setTimeout(() => startAgent(), 500);
      return () => clearTimeout(timer);
    }
  }, [isOpen, autoStart, startAgent]);

  // Cleanup on close
  useEffect(() => {
    if (!isOpen) {
      stopAgent();
      hasStartedRef.current = false;
      setMessages([]);
      setCurrentTranscript('');
    }
  }, [isOpen, stopAgent]);

  // Cleanup on unmount
  useEffect(() => {
    return () => stopAgent();
  }, [stopAgent]);

  // Auto-scroll messages
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, currentTranscript]);

  const handleClose = () => {
    setCompanionState('closed');
    stopAgent();
    onClose();
  };

  const handleMinimize = () => {
    setCompanionState('minimized');
  };

  const handleExpand = () => {
    setCompanionState('active');
  };

  const getStatusText = () => {
    switch (status) {
      case 'connecting': return 'Connecting...';
      case 'connected': return 'Connected';
      case 'speaking': return 'Speaking...';
      case 'listening': return 'Listening...';
      case 'error': return 'Error';
      default: return 'Tap mic to start';
    }
  };

  // Wave bar count for visualization
  const waveBarCount = 12;

  if (!isOpen) return null;

  return (
    <AnimatePresence mode="wait">
      {companionState === 'active' && (
        <motion.div
          key="expanded"
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="fixed bottom-6 right-6 w-[360px] max-w-[calc(100vw-48px)] bg-background/95 backdrop-blur-xl border border-border rounded-3xl shadow-2xl z-[100] overflow-hidden"
        >
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-border/50">
            <div className="flex items-center gap-3">
              <div className="relative w-10 h-10 rounded-full overflow-hidden ring-2 ring-dental-blue/30">
                <img src={echoAvatar} alt="Echo" className="w-full h-full object-cover" />
                {(status === 'speaking' || status === 'listening') && (
                  <motion.div
                    className="absolute inset-0 rounded-full border-2 border-dental-blue-dark"
                    animate={{ scale: [1, 1.2, 1], opacity: [0.8, 0, 0.8] }}
                    transition={{ duration: 1, repeat: Infinity }}
                  />
                )}
              </div>
              <div>
                <h3 className="font-semibold text-foreground text-sm">Echo</h3>
                <p className="text-xs text-muted-foreground">{getStatusText()}</p>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <Button variant="ghost" size="icon" className="h-8 w-8" onClick={handleMinimize}>
                <Minus className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="icon" className="h-8 w-8" onClick={handleClose}>
                <X className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Avatar with Waves */}
          <div className="relative p-6 bg-gradient-to-b from-dental-blue/5 to-transparent flex flex-col items-center">
            {/* Radial wave animation behind avatar */}
            <div className="relative">
              {(status === 'speaking' || status === 'listening') && (
                <>
                  <motion.div
                    className="absolute inset-0 rounded-full bg-dental-blue-dark/20"
                    animate={{ scale: [1, 1.5, 1], opacity: [0.4, 0, 0.4] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    style={{ margin: '-20px' }}
                  />
                  <motion.div
                    className="absolute inset-0 rounded-full bg-dental-blue-dark/15"
                    animate={{ scale: [1, 1.8, 1], opacity: [0.3, 0, 0.3] }}
                    transition={{ duration: 2, repeat: Infinity, delay: 0.3 }}
                    style={{ margin: '-30px' }}
                  />
                </>
              )}
              <div className="w-24 h-24 rounded-full overflow-hidden ring-4 ring-dental-blue-dark/30 shadow-lg">
                <img src={echoAvatar} alt="Echo" className="w-full h-full object-cover" />
              </div>
            </div>

            {/* Wave visualization bars */}
            <div className="flex items-end justify-center gap-1 mt-4 h-8">
              {Array.from({ length: waveBarCount }).map((_, i) => {
                const isActive = status === 'speaking' || status === 'listening';
                return (
                  <motion.div
                    key={i}
                    className="w-1 rounded-full bg-dental-blue-dark"
                    animate={{
                      height: isActive 
                        ? [8, 24 * (0.5 + Math.random() * 0.5), 8]
                        : 4,
                      opacity: isActive ? 1 : 0.3,
                    }}
                    transition={{
                      duration: 0.4 + Math.random() * 0.2,
                      repeat: isActive ? Infinity : 0,
                      delay: i * 0.05,
                      ease: 'easeInOut',
                    }}
                  />
                );
              })}
            </div>
          </div>

          {/* Transcript Area */}
          <ScrollArea className="h-[140px] px-4" ref={scrollRef}>
            <div className="space-y-3 py-2">
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl px-3 py-2 text-sm ${
                      message.role === 'user'
                        ? 'bg-dental-blue text-white'
                        : 'bg-muted text-foreground'
                    }`}
                  >
                    {message.text}
                  </div>
                </motion.div>
              ))}

              {currentTranscript && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className={`flex ${currentRole === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl px-3 py-2 text-sm ${
                      currentRole === 'user'
                        ? 'bg-dental-blue/70 text-white'
                        : 'bg-muted/70 text-foreground'
                    }`}
                  >
                    {currentTranscript}
                    <motion.span
                      animate={{ opacity: [0, 1, 0] }}
                      transition={{ duration: 0.8, repeat: Infinity }}
                    >
                      ▋
                    </motion.span>
                  </div>
                </motion.div>
              )}

              {messages.length === 0 && !currentTranscript && (
                <p className="text-xs text-center text-muted-foreground py-4">
                  Tap the mic to start a conversation
                </p>
              )}
            </div>
          </ScrollArea>

          {/* Quick Navigation */}
          <div className="px-4 py-2 border-t border-border/50 flex gap-2">
            <Button
              variant="outline"
              size="sm"
              className="flex-1 text-xs h-8"
              onClick={() => onNavigate('/patient-financing-application')}
            >
              <FileText className="w-3 h-3 mr-1" />
              Apply Now
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="flex-1 text-xs h-8"
              onClick={() => onNavigate('/about')}
            >
              <Info className="w-3 h-3 mr-1" />
              About Us
            </Button>
          </div>

          {/* Mic Control */}
          <div className="p-4 pt-2 flex justify-center">
            <Button
              size="lg"
              className={`rounded-full w-14 h-14 ${
                status === 'listening' ? 'bg-dental-blue-dark hover:bg-dental-blue-dark/90' :
                status === 'speaking' ? 'bg-dental-blue hover:bg-dental-blue-dark' :
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
                  className="w-6 h-6 border-2 border-current border-t-transparent rounded-full"
                />
              ) : agentRef.current?.isActive() ? (
                <MicOff className="w-6 h-6" />
              ) : (
                <Mic className="w-6 h-6" />
              )}
            </Button>
          </div>
        </motion.div>
      )}

      {companionState === 'minimized' && (
        <motion.div
          key="minimized"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.5 }}
          transition={{ type: 'spring', damping: 20, stiffness: 300 }}
          className="fixed bottom-6 right-6 z-[100]"
        >
          <div className="relative">
            {/* Pulse animation when active */}
            {(status === 'speaking' || status === 'listening') && (
              <motion.div
                className="absolute inset-0 rounded-full bg-dental-blue-dark"
                animate={{ scale: [1, 1.3, 1], opacity: [0.4, 0, 0.4] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
            )}
            
            {/* Avatar bubble */}
            <button
              onClick={handleExpand}
              className="relative w-16 h-16 rounded-full overflow-hidden ring-4 ring-dental-blue-dark/40 shadow-xl hover:ring-dental-blue transition-all cursor-pointer"
            >
              <img src={echoAvatar} alt="Echo" className="w-full h-full object-cover" />
              
              {/* Status indicator */}
              <div className={`absolute bottom-0 right-0 w-4 h-4 rounded-full border-2 border-background ${
                status === 'listening' ? 'bg-green-500' :
                status === 'speaking' ? 'bg-dental-blue' :
                status === 'connecting' ? 'bg-yellow-500' :
                'bg-muted-foreground'
              }`} />
            </button>

            {/* Close button */}
            <button
              onClick={handleClose}
              className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-muted hover:bg-muted-foreground/20 flex items-center justify-center transition-colors"
            >
              <X className="w-3 h-3" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
