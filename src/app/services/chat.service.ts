import { Injectable, signal, computed } from '@angular/core';
import { Chat } from '../interfaces/chat.interface';
import { Message } from '../interfaces/message.interface';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  
  private chatsSignal = signal<Chat[]>([
    {
      id: '1',
      contactName: 'María García',
      avatar: 'https://i.pravatar.cc/150?img=1',
      status: 'online',
      lastMessage: 'Hola, ¿cómo estás?',
      lastMessageTime: new Date()
    },
    {
      id: '2',
      contactName: 'Carlos López',
      avatar: 'https://i.pravatar.cc/150?img=2',
      status: 'offline',
      lastSeen: new Date(Date.now() - 3600000),
      lastMessage: 'Nos vemos mañana',
      lastMessageTime: new Date(Date.now() - 7200000)
    },
    {
      id: '3',
      contactName: 'Ana Martínez',
      avatar: 'https://i.pravatar.cc/150?img=3',
      status: 'away',
      lastMessage: 'Perfecto!',
      lastMessageTime: new Date(Date.now() - 86400000)
    }
  ]);

  private messagesSignal = signal<Message[]>([
    {
      id: '1',
      chatId: '1',
      content: 'Hola, ¿cómo estás?',
      timestamp: new Date(Date.now() - 60000),
      sender: 'contact',
      read: true
    },
    {
      id: '2',
      chatId: '1',
      content: '¡Muy bien! ¿Y tú?',
      timestamp: new Date(),
      sender: 'user',
      read: true
    }
  ]);

  private activeChatIdSignal = signal<string | null>(null);
  private searchTermSignal = signal<string>('');

  readonly chats = this.chatsSignal.asReadonly();
  readonly messages = this.messagesSignal.asReadonly();
  readonly activeChatId = this.activeChatIdSignal.asReadonly();
  readonly searchTerm = this.searchTermSignal.asReadonly();

  readonly filteredChats = computed(() => {
    const term = this.searchTermSignal().toLowerCase();
    if (!term) return this.chatsSignal();
    return this.chatsSignal().filter(chat => 
      chat.contactName.toLowerCase().includes(term)
    );
  });

  readonly activeChat = computed(() => {
    const id = this.activeChatIdSignal();
    return this.chatsSignal().find(chat => chat.id === id) || null;
  });

  readonly activeChatMessages = computed(() => {
    const id = this.activeChatIdSignal();
    if (!id) return [];
    return this.messagesSignal()
      .filter(msg => msg.chatId === id)
      .sort((a, b) => a.timestamp.getTime() - b.timestamp.getTime());
  });

  setActiveChat(chatId: string | null): void {
    this.activeChatIdSignal.set(chatId);
  }

  setSearchTerm(term: string): void {
    this.searchTermSignal.set(term);
  }

  addChat(chat: Omit<Chat, 'id'>): Chat {
    const newChat: Chat = {
      ...chat,
      id: this.generateId()
    };
    this.chatsSignal.update(chats => [...chats, newChat]);
    return newChat;
  }

  sendMessage(chatId: string, content: string): void {
    const userMessage: Message = {
      id: this.generateId(),
      chatId,
      content,
      timestamp: new Date(),
      sender: 'user',
      read: true
    };

    this.messagesSignal.update(messages => [...messages, userMessage]);
    this.updateLastMessage(chatId, content);

    setTimeout(() => {
      this.generateAutoResponse(chatId);
    }, 1000 + Math.random() * 1000);
  }

  private generateAutoResponse(chatId: string): void {
    const responses = [
      '¡Entendido!',
      '¿Me puedes contar más?',
      'Interesante...',
      '¡Claro que sí!',
      'Déjame pensarlo.',
      '¡Genial!',
      '¿En serio? No lo sabía.',
      'Perfecto, gracias por avisar.'
    ];

    const randomResponse = responses[Math.floor(Math.random() * responses.length)];

    const autoMessage: Message = {
      id: this.generateId(),
      chatId,
      content: randomResponse,
      timestamp: new Date(),
      sender: 'contact',
      read: false
    };

    this.messagesSignal.update(messages => [...messages, autoMessage]);
    this.updateLastMessage(chatId, randomResponse);
  }

  private updateLastMessage(chatId: string, content: string): void {
    this.chatsSignal.update(chats => 
      chats.map(chat => 
        chat.id === chatId 
          ? { ...chat, lastMessage: content, lastMessageTime: new Date() }
          : chat
      )
    );
  }

  private generateId(): string {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  }
}