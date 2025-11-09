import { useState, useEffect, useRef } from 'react';
import { MessageCircle, X, Send, Loader2 } from 'lucide-react';
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

export const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
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
    // Initialize chat service when component mounts
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
  }, [toast]);

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
    <>
      {/* Floating Chat Button */}
      <motion.div
        className="fixed bottom-6 right-6 z-50"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', stiffness: 400, damping: 25 }}
      >
        <Button
          onClick={() => setIsOpen(!isOpen)}
          size="lg"
          className="
            rounded-full w-16 h-16 p-0 
            bg-black hover:bg-black/90
            shadow-elegant hover:shadow-peach
            transition-smooth
            border-2 border-black
          "
        >
          <MessageCircle size={28} className="text-white" />
        </Button>
      </motion.div>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed bottom-28 right-6 z-50 w-96 h-[600px] bg-background border-2 border-foreground rounded-2xl shadow-elegant overflow-hidden flex flex-col"
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 400, damping: 30 }}
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
                onClick={() => setIsOpen(false)}
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
                      <p
                        className={`text-xs mt-2 ${
                          message.sender === 'user' ? 'text-white/70' : 'text-white/70'
                        }`}
                      >
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
        )}
      </AnimatePresence>
    </>
  );
};
