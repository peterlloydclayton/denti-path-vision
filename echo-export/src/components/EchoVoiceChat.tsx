import { useState, useEffect, useRef, useCallback } from 'react';
import { X, MessageSquare, Send, Mic, MicOff, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useToast } from '@/hooks/use-toast';
import { VoiceAgent, VoiceAgentStatus, PageContext } from '@/utils/VoiceAgent';


interface Message {
  id: string;
  role: 'user' | 'assistant';
  text: string;
  timestamp: Date;
}

interface EchoVoiceChatProps {
  /**
   * Optional page context to help Echo understand where the user is.
   * For example: { page: 'Dashboard', stepTitle: 'Application Review', fields: [...] }
   */
  pageContext?: PageContext;
}

export const EchoVoiceChat = ({ pageContext }: EchoVoiceChatProps) => {
  const { toast } = useToast();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      role: 'assistant',
      text: "Hi! I'm Echo, DentiPay's AI assistant. How can I help you today?",
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState<VoiceAgentStatus>('idle');
  const [currentTranscript, setCurrentTranscript] = useState('');
  const [currentRole, setCurrentRole] = useState<'user' | 'assistant'>('assistant');

  const agentRef = useRef<VoiceAgent | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, currentTranscript]);

  // Send page context to voice agent when it connects or context changes
  useEffect(() => {
    if (agentRef.current?.isActive() && pageContext) {
      agentRef.current.sendPageContext(pageContext);
    }
  }, [pageContext]);

  const handleVoiceTranscript = useCallback((text: string, _isFinal: boolean, role: 'user' | 'assistant') => {
    setCurrentRole(role);
    if (role === 'assistant') {
      setCurrentTranscript(text);
    } else {
      setCurrentTranscript(text);
    }
  }, []);

  const handleVoiceTranscriptDone = useCallback((text: string, _isFinal: boolean, role: 'user' | 'assistant') => {
    setCurrentTranscript('');
    if (text.trim()) {
      setMessages((prev) => [
        ...prev,
        { id: crypto.randomUUID(), role, text, timestamp: new Date() },
      ]);
    }
  }, []);

  const handleToolCall = useCallback((toolName: string, _args: Record<string, unknown>) => {
    // Backend sites typically don't need consumer-page navigation.
    // You can wire these to your own routes if needed.
    toast({
      title: 'Echo Action',
      description: `Tool called: ${toolName}`,
    });
  }, [toast]);

  const initializeAgent = useCallback(() => {
    if (agentRef.current) return;

    agentRef.current = new VoiceAgent(
      {
        onStatusChange: setStatus,
        onTranscript: (text, isFinal, role) => {
          if (isFinal) {
            handleVoiceTranscriptDone(text, isFinal, role);
          } else {
            handleVoiceTranscript(text, isFinal, role);
          }
        },
        onError: (error) => {
          toast({
            title: 'Voice Error',
            description: error,
            variant: 'destructive',
          });
        },
        onToolCall: handleToolCall,
      },
      'en'
    );
  }, [handleVoiceTranscript, handleVoiceTranscriptDone, handleToolCall, toast]);

  const toggleVoice = useCallback(async () => {
    initializeAgent();

    if (agentRef.current?.isActive()) {
      agentRef.current.disconnect();
      return;
    }

    try {
      await agentRef.current?.connect();
      if (pageContext) {
        agentRef.current?.sendPageContext(pageContext);
      }
    } catch (error) {
      console.error('Voice connection failed:', error);
      toast({
        title: 'Voice Connection Failed',
        description: error instanceof Error ? error.message : 'Could not start voice chat',
        variant: 'destructive',
      });
    }
  }, [initializeAgent, pageContext, toast]);

  const sendTextMessage = useCallback(async () => {
    const trimmed = inputValue.trim();
    if (!trimmed || isLoading) return;

    setInputValue('');
    setIsLoading(true);

    setMessages((prev) => [
      ...prev,
      { id: crypto.randomUUID(), role: 'user', text: trimmed, timestamp: new Date() },
    ]);

    const functionUrl = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/chat`;

    try {
      const response = await fetch(functionUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY || import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
        },
        body: JSON.stringify({
          messages: [
            ...messages.map((m) => ({ role: m.role, content: m.text })),
            { role: 'user', content: trimmed },
          ],
        }),
      });

      if (!response.ok) {
        throw new Error(`Chat function error: ${response.status}`);
      }

      const reader = response.body?.getReader();
      if (!reader) {
        throw new Error('No response body');
      }

      const decoder = new TextDecoder();
      let buffer = '';
      let content = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        buffer += decoder.decode(value, { stream: true });

        const lines = buffer.split('\n');
        buffer = lines.pop() || '';

        for (const line of lines) {
          const trimmedLine = line.trim();
          if (!trimmedLine.startsWith('data: ')) continue;
          const data = trimmedLine.replace('data: ', '');
          if (data === '[DONE]') continue;
          try {
            const parsed = JSON.parse(data);
            const delta = parsed.choices?.[0]?.delta?.content;
            if (delta) content += delta;
          } catch {
            // ignore malformed lines
          }
        }
      }

      setMessages((prev) => [
        ...prev,
        { id: crypto.randomUUID(), role: 'assistant', text: content, timestamp: new Date() },
      ]);
    } catch (error) {
      console.error('Chat error:', error);
      toast({
        title: 'Message Failed',
        description: error instanceof Error ? error.message : 'Could not send message',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  }, [inputValue, isLoading, messages, toast]);

  useEffect(() => {
    return () => {
      agentRef.current?.disconnect();
    };
  }, []);

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col items-end gap-2">
      {isOpen && (
        <div className="w-[360px] max-w-[calc(100vw-2rem)] rounded-2xl border bg-background shadow-2xl flex flex-col overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 border-b bg-primary/5">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center">
                <span className="text-primary-foreground text-xs font-bold">E</span>
              </div>
              <div>
                <p className="font-semibold text-sm">Echo</p>
                <p className="text-xs text-muted-foreground">
                  {status === 'connected' ? 'Listening...' : status === 'speaking' ? 'Speaking...' : 'AI Assistant'}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8"
                onClick={toggleVoice}
                aria-label={status === 'idle' || status === 'error' ? 'Start voice chat' : 'Stop voice chat'}
              >
                {status === 'idle' || status === 'error' ? (
                  <Mic className="h-4 w-4" />
                ) : (
                  <MicOff className="h-4 w-4" />
                )}
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8"
                onClick={() => setIsOpen(false)}
                aria-label="Close chat"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Messages */}
          <ScrollArea className="h-[320px] p-4">
            <div className="space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] rounded-2xl px-3 py-2 text-sm ${
                      message.role === 'user'
                        ? 'bg-primary text-primary-foreground rounded-br-none'
                        : 'bg-muted text-foreground rounded-bl-none'
                    }`}
                  >
                    {message.text}
                  </div>
                </div>
              ))}
              {currentTranscript && (
                <div className={`flex ${currentRole === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className="max-w-[80%] rounded-2xl px-3 py-2 text-sm bg-muted/50 text-foreground italic rounded-bl-none">
                    {currentTranscript}
                    <span className="inline-block w-1 h-3 ml-1 bg-primary animate-pulse" />
                  </div>
                </div>
              )}
              <div ref={scrollRef} />
            </div>
          </ScrollArea>

          {/* Input */}
          <div className="p-3 border-t flex gap-2">
            <Input
              placeholder="Type a message..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && sendTextMessage()}
              className="flex-1"
            />
            <Button
              size="icon"
              onClick={sendTextMessage}
              disabled={isLoading || !inputValue.trim()}
              aria-label="Send message"
            >
              {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
            </Button>
          </div>
        </div>
      )}

      <Button
        size="icon"
        className="h-12 w-12 rounded-full shadow-lg"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-label="Open Echo chat"
      >
        {isOpen ? <X className="h-5 w-5" /> : <MessageSquare className="h-5 w-5" />}
      </Button>
    </div>
  );
};
