export interface Chat {
  id: string;
  contactName: string;
  avatar: string;
  status: 'online' | 'offline' | 'away';
  lastSeen?: Date;
  lastMessage?: string;
  lastMessageTime?: Date;
  unreadCount?: number;
}