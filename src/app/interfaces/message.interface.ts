export interface Message {
  id: string;
  chatId: string;
  content: string;
  timestamp: Date;
  sender: 'user' | 'contact';
  read: boolean;
}