import { io, Socket } from 'socket.io-client';

// Get API URLs from environment or use defaults
const API_URL = import.meta.env.VITE_API_URL || 'https://dentipay-chat-backend-z2ac3jvjza-uc.a.run.app';
const WS_URL = import.meta.env.VITE_WS_URL || 'https://dentipay-chat-backend-z2ac3jvjza-uc.a.run.app';

export interface ChatMessage {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

class ChatService {
  private socket: Socket | null = null;
  private sessionId: string;
  private guestToken: string | null = null;

  constructor() {
    this.sessionId = this.getOrCreateSessionId();
  }

  private getOrCreateSessionId(): string {
    let sessionId = localStorage.getItem('dentipay_session_id');
    if (!sessionId) {
      sessionId = crypto.randomUUID();
      localStorage.setItem('dentipay_session_id', sessionId);
    }
    return sessionId;
  }

  async initialize(): Promise<void> {
    try {
      // Get guest token
      const response = await fetch(`${API_URL}/api/auth/guest-token?sessionId=${this.sessionId}`);
      
      if (!response.ok) throw new Error('Failed to get guest token');
      const data = await response.json();
      this.guestToken = data.token;

      // Initialize Socket.IO connection
      const wsUrl = WS_URL.replace('https://', 'wss://').replace('http://', 'ws://');
      
      this.socket = io(wsUrl, {
        auth: {
          token: this.guestToken,
        },
        transports: ['websocket', 'polling'],
        reconnection: true,
        reconnectionDelay: 1000,
        reconnectionAttempts: 5,
      });

      this.socket.on('connect', () => {
        // Connected to chat server
      });

      this.socket.on('disconnect', () => {
        // Disconnected from chat server
      });

      this.socket.on('connect_error', () => {
        // Connection error - will retry
      });

      this.socket.on('error', () => {
        // Socket error
      });

      this.socket.on('message', () => {
        // Message received - handled by onMessage callback
      });
    } catch (error) {
      throw error;
    }
  }

  sendMessage(message: string): Promise<void> {
    return new Promise((resolve, reject) => {
      if (!this.socket) {
        reject(new Error('Socket not initialized'));
        return;
      }

      if (!this.socket.connected) {
        reject(new Error('Not connected to chat server'));
        return;
      }

      this.socket.emit('message', { content: message }, (response: { error?: string }) => {
        if (response?.error) {
          reject(new Error(response.error));
        } else {
          resolve();
        }
      });
    });
  }

  onMessage(callback: (message: string) => void): void {
    if (!this.socket) return;
    this.socket.on('message', (data: { content?: string; message?: string }) => {
      const messageContent = data.content || data.message || JSON.stringify(data);
      callback(messageContent);
    });
  }

  disconnect(): void {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
    }
  }
}

export const chatService = new ChatService();
