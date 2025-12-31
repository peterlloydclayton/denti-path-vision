import { supabase } from "@/integrations/supabase/client";

export type VoiceAgentStatus = 'idle' | 'connecting' | 'connected' | 'speaking' | 'listening' | 'error';

export interface VoiceAgentCallbacks {
  onStatusChange: (status: VoiceAgentStatus) => void;
  onTranscript: (text: string, isFinal: boolean, role: 'user' | 'assistant') => void;
  onError: (error: string) => void;
  onToolCall: (toolName: string, args: Record<string, unknown>) => void;
  onLanguageChange?: (language: 'es' | 'en') => void;
}

export interface PageContext {
  page: string;
  stepNumber?: number;
  stepTitle?: string;
  fields?: string[];
  currentFormData?: Record<string, unknown>;
}

export class VoiceAgent {
  private pc: RTCPeerConnection | null = null;
  private dc: RTCDataChannel | null = null;
  private audioEl: HTMLAudioElement;
  private localStream: MediaStream | null = null;
  private callbacks: VoiceAgentCallbacks;
  private currentTranscript = '';
  private isConnected = false;
  private isConnecting = false;
  private lastPageContext: string = '';
  private initialLanguage: string = 'en';

  constructor(callbacks: VoiceAgentCallbacks, initialLanguage: string = 'en') {
    this.callbacks = callbacks;
    this.initialLanguage = initialLanguage;
    this.audioEl = document.createElement("audio");
    this.audioEl.autoplay = true;
  }

  /**
   * Send page context to the voice agent so it knows what the user is viewing
   */
  sendPageContext(context: PageContext): void {
    if (!this.dc || this.dc.readyState !== 'open') {
      console.log('VoiceAgent: Data channel not ready for page context');
      return;
    }

    // Build context message
    let contextMessage = `PAGE_CONTEXT: User is on ${context.page}`;
    
    if (context.stepNumber && context.stepTitle) {
      contextMessage += ` - Form Step ${context.stepNumber}: ${context.stepTitle}`;
    }
    
    if (context.fields && context.fields.length > 0) {
      contextMessage += `. Fields on this step: ${context.fields.join(', ')}`;
    }

    // Avoid sending duplicate context
    if (contextMessage === this.lastPageContext) {
      return;
    }
    this.lastPageContext = contextMessage;

    console.log('VoiceAgent: Sending page context:', contextMessage);

    // Send as a system context message
    this.sendEvent({
      type: 'conversation.item.create',
      item: {
        type: 'message',
        role: 'system',
        content: [
          {
            type: 'input_text',
            text: contextMessage
          }
        ]
      }
    });
  }

  async connect(): Promise<void> {
    // Prevent concurrent connection attempts
    if (this.isConnecting || this.isConnected) {
      console.log('VoiceAgent: Already connecting or connected');
      return;
    }
    
    this.isConnecting = true;
    
    try {
      this.callbacks.onStatusChange('connecting');
      console.log('VoiceAgent: Requesting microphone access...');

      // Request microphone access
      this.localStream = await navigator.mediaDevices.getUserMedia({ 
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true
        } 
      });

      // Check if disconnected while waiting for mic access
      if (!this.isConnecting) {
        this.cleanupLocalStream();
        return;
      }

      console.log('VoiceAgent: Getting ephemeral token...');

      // Get ephemeral token from edge function
      const { data, error } = await supabase.functions.invoke('realtime-voice-token');
      
      // Check if disconnected while waiting for token
      if (!this.isConnecting) {
        this.cleanupLocalStream();
        return;
      }
      
      if (error) {
        console.error('VoiceAgent: Token error:', error);
        throw new Error('Failed to get voice session token');
      }

      if (!data?.client_secret?.value) {
        console.error('VoiceAgent: Invalid token response:', data);
        throw new Error('Invalid token response');
      }

      const ephemeralKey = data.client_secret.value;
      console.log('VoiceAgent: Got ephemeral token, setting up WebRTC...');

      // Create peer connection
      this.pc = new RTCPeerConnection();

      // Set up remote audio playback
      this.pc.ontrack = (e) => {
        console.log('VoiceAgent: Received audio track');
        this.audioEl.srcObject = e.streams[0];
      };

      // Add local audio track
      this.localStream.getTracks().forEach(track => {
        this.pc!.addTrack(track, this.localStream!);
      });

      // Set up data channel for events
      this.dc = this.pc.createDataChannel("oai-events");
      this.setupDataChannelHandlers();

      // Create and set local description
      const offer = await this.pc.createOffer();
      await this.pc.setLocalDescription(offer);

      console.log('VoiceAgent: Connecting to OpenAI Realtime API...');

      // Connect to OpenAI's Realtime API
      const baseUrl = "https://api.openai.com/v1/realtime";
      const model = "gpt-4o-realtime-preview-2024-12-17";
      
      const sdpResponse = await fetch(`${baseUrl}?model=${model}`, {
        method: "POST",
        body: offer.sdp,
        headers: {
          Authorization: `Bearer ${ephemeralKey}`,
          "Content-Type": "application/sdp"
        },
      });

      // Check if disconnected while waiting for SDP response
      if (!this.isConnecting || !this.pc) {
        console.log('VoiceAgent: Disconnected during SDP exchange, aborting');
        return;
      }

      if (!sdpResponse.ok) {
        const errorText = await sdpResponse.text();
        console.error('VoiceAgent: SDP error:', errorText);
        throw new Error('Failed to establish WebRTC connection');
      }

      const answer: RTCSessionDescriptionInit = {
        type: "answer",
        sdp: await sdpResponse.text(),
      };
      
      // Final check before setting remote description
      if (!this.pc) {
        console.log('VoiceAgent: Connection closed before remote description');
        return;
      }
      
      await this.pc.setRemoteDescription(answer);
      console.log('VoiceAgent: WebRTC connection established');

      this.isConnected = true;
      this.isConnecting = false;
      this.callbacks.onStatusChange('connected');

    } catch (error) {
      console.error('VoiceAgent: Connection error:', error);
      this.isConnecting = false;
      this.callbacks.onStatusChange('error');
      this.callbacks.onError(error instanceof Error ? error.message : 'Connection failed');
      throw error;
    }
  }
  
  private cleanupLocalStream(): void {
    if (this.localStream) {
      this.localStream.getTracks().forEach(track => track.stop());
      this.localStream = null;
    }
  }

  private setupDataChannelHandlers(): void {
    if (!this.dc) return;

    this.dc.onopen = () => {
      console.log('VoiceAgent: Data channel opened');
      // Send initial greeting prompt
      setTimeout(() => {
        const greetingInstructions = this.initialLanguage === 'es'
          ? 'Saluda al usuario calurosamente EN ESPAÑOL e introdúcete como Echo, el asistente de IA de DentiPay. Pregunta cómo puedes ayudarles hoy, ya sea que sean un paciente buscando financiamiento dental o una práctica dental interesada en ofrecer opciones de financiamiento.'
          : 'Greet the user warmly IN ENGLISH and introduce yourself as Echo, DentiPay\'s AI assistant. Ask how you can help them today - whether they\'re a patient looking for dental financing or a dental practice interested in offering financing options.';
        
        this.sendEvent({
          type: 'response.create',
          response: {
            modalities: ['audio', 'text'],
            instructions: greetingInstructions
          }
        });
      }, 500);
    };

    this.dc.onmessage = (e) => {
      try {
        const event = JSON.parse(e.data);
        this.handleServerEvent(event);
      } catch (error) {
        console.error('VoiceAgent: Error parsing event:', error);
      }
    };

    this.dc.onerror = (error) => {
      console.error('VoiceAgent: Data channel error:', error);
      this.callbacks.onError('Connection error');
    };

    this.dc.onclose = () => {
      console.log('VoiceAgent: Data channel closed');
      if (this.isConnected) {
        this.callbacks.onStatusChange('idle');
        this.isConnected = false;
      }
    };
  }

  private handleServerEvent(event: Record<string, unknown>): void {
    const eventType = event.type as string;
    
    switch (eventType) {
      case 'session.created':
        console.log('VoiceAgent: Session created');
        break;

      case 'response.audio.delta':
        this.callbacks.onStatusChange('speaking');
        break;

      case 'response.audio.done':
        this.callbacks.onStatusChange('listening');
        break;

      case 'response.audio_transcript.delta':
        this.currentTranscript += event.delta as string;
        this.callbacks.onTranscript(this.currentTranscript, false, 'assistant');
        break;

      case 'response.audio_transcript.done':
        this.callbacks.onTranscript(event.transcript as string, true, 'assistant');
        this.currentTranscript = '';
        break;

      case 'conversation.item.input_audio_transcription.completed':
        this.callbacks.onTranscript(event.transcript as string, true, 'user');
        break;

      case 'input_audio_buffer.speech_started':
        this.callbacks.onStatusChange('listening');
        break;

      case 'response.function_call_arguments.done':
        const toolName = event.name as string;
        let args = {};
        try {
          args = JSON.parse(event.arguments as string || '{}');
        } catch {
          args = {};
        }
        console.log('VoiceAgent: Tool call:', toolName, args);
        
        // Handle language change internally
        if (toolName === 'set_language') {
          const lang = (args as { language?: string }).language;
          console.log('VoiceAgent: Language change detected - switching to', lang);
          if (lang === 'es' || lang === 'en') {
            this.callbacks.onLanguageChange?.(lang);
          }
        }
        
        this.callbacks.onToolCall(toolName, args);
        
        // Send tool result back
        this.sendEvent({
          type: 'conversation.item.create',
          item: {
            type: 'function_call_output',
            call_id: event.call_id,
            output: JSON.stringify({ success: true })
          }
        });
        this.sendEvent({ type: 'response.create' });
        break;

      case 'error':
        console.error('VoiceAgent: Server error:', event);
        this.callbacks.onError((event.error as { message?: string })?.message || 'Unknown error');
        break;

      default:
        // Log other events for debugging
        if (eventType.includes('error')) {
          console.error('VoiceAgent: Error event:', event);
        }
    }
  }

  private sendEvent(event: Record<string, unknown>): void {
    if (this.dc?.readyState === 'open') {
      this.dc.send(JSON.stringify(event));
    }
  }

  disconnect(): void {
    console.log('VoiceAgent: Disconnecting...');
    
    // Stop any in-progress connection
    this.isConnecting = false;
    
    this.cleanupLocalStream();

    if (this.dc) {
      this.dc.close();
      this.dc = null;
    }

    if (this.pc) {
      this.pc.close();
      this.pc = null;
    }

    this.audioEl.srcObject = null;
    this.isConnected = false;
    this.callbacks.onStatusChange('idle');
  }

  isActive(): boolean {
    return this.isConnected;
  }
}
