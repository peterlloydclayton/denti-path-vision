import { useState, useEffect, useRef } from 'react';
import { X, Send, Loader2, MessageCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { chatService } from '@/lib/chatService';
import { useToast } from '@/hooks/use-toast';
import { MessageContent } from '@/components/chat/MessageContent';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

interface ChatWidgetProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ChatWidget = ({ isOpen, onClose }: ChatWidgetProps) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Hi! How can I help you with your dental financing today?',
      sender: 'bot',
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isConnected, setIsConnected] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    // Initialize chat service when component opens
    const initChat = async () => {
      try {
        await chatService.initialize();
        setIsConnected(true);

        // Listen for bot messages
        chatService.onMessage((message) => {
          const botResponse: Message = {
            id: Date.now().toString(),
            text: message,
            sender: 'bot',
            timestamp: new Date(),
          };
          setMessages((prev) => [...prev, botResponse]);
          setIsLoading(false);
        });
      } catch (error) {
        console.error('Failed to initialize chat:', error);
        toast({
          title: 'Connection Error',
          description: 'Unable to connect to chat service. Please try again later.',
          variant: 'destructive',
        });
      }
    };

    initChat();

    return () => {
      chatService.disconnect();
    };
  }, [isOpen, toast]);

  useEffect(() => {
    // Auto-scroll to bottom when new messages arrive
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  const handleSend = async () => {
    if (!inputValue.trim() || !isConnected) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages([...messages, newMessage]);
    setInputValue('');
    setIsLoading(true);

    try {
      await chatService.sendMessage(inputValue);
    } catch (error) {
      console.error('Failed to send message:', error);
      setIsLoading(false);
      toast({
        title: 'Send Error',
        description: 'Failed to send message. Please try again.',
        variant: 'destructive',
      });
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-background/60 backdrop-blur-sm z-[100]"
            onClick={onClose}
          />

          {/* Chat Window - Side Panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 h-full w-full max-w-md bg-background border-l border-border shadow-2xl z-[101] flex flex-col"
          >
            {/* Header */}
            <div className="bg-foreground text-background p-4 flex items-center justify-between border-b-2 border-dental-blue">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-dental-blue flex items-center justify-center">
                  <MessageCircle size={20} className="text-foreground" />
                </div>
                <div>
                  <h3 className="font-bold text-lg">DentiPay Chat</h3>
                  <p className="text-xs text-dental-blue">We're here to help</p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={onClose}
                className="hover:bg-dental-blue/20 text-background hover:text-background"
              >
                <X size={20} />
              </Button>
            </div>

            {/* Messages Area */}
            <ScrollArea className="flex-1 p-4">
              <div className="space-y-4">
                {messages.map((message) => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`
                        max-w-[75%] rounded-2xl px-4 py-3 
                        ${
                          message.sender === 'user'
                            ? 'bg-dental-blue text-white'
                            : 'bg-dental-blue text-white border-2 border-dental-blue'
                        }
                      `}
                    >
                      <MessageContent text={message.text} isUser={message.sender === 'user'} />
                      <p className="text-xs mt-2 text-black/60">
                        {message.timestamp.toLocaleTimeString([], {
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </p>
                    </div>
                  </motion.div>
                ))}
                {isLoading && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex justify-start"
                  >
                    <div className="bg-dental-blue text-foreground border-2 border-foreground rounded-2xl px-4 py-3">
                      <Loader2 className="animate-spin" size={20} />
                    </div>
                  </motion.div>
                )}
                <div ref={scrollRef} />
              </div>
            </ScrollArea>

            {/* Input Area */}
            <div className="p-4 border-t-2 border-dental-blue bg-background">
              <div className="flex gap-2">
                <Input
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Type your message..."
                  disabled={!isConnected || isLoading}
                  className="flex-1 border-2 border-foreground focus:border-dental-blue transition-smooth disabled:opacity-50"
                />
                <Button
                  onClick={handleSend}
                  size="icon"
                  disabled={!isConnected || isLoading}
                  className="bg-dental-blue hover:bg-dental-blue-dark text-foreground border-2 border-foreground transition-smooth disabled:opacity-50"
                >
                  {isLoading ? <Loader2 className="animate-spin" size={20} /> : <Send size={20} />}
                </Button>
              </div>
              <p className="text-xs text-muted-foreground mt-2 text-center">
                {isConnected ? 'Powered by DentiPay AI' : 'Connecting...'}
              </p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
