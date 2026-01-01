import { Component, inject, signal, output } from '@angular/core';
import { ChatService } from '../../services/chat.service';

@Component({
  selector: 'app-new-chat',
  standalone: true,
  templateUrl: './new-chat.component.html',
  styleUrl: './new-chat.component.css'
})
export class NewChatComponent {
  private chatService = inject(ChatService);
  
  closeModal = output();
  
  contactName = signal('');
  avatarUrl = signal('');

  updateName(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.contactName.set(input.value);
  }

  updateAvatar(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.avatarUrl.set(input.value);
  }

  createChat(): void {
    const name = this.contactName().trim();
    
    if (name) {
      const randomNum = Math.floor(Math.random() * 70) + 1;
      const avatar = this.avatarUrl().trim() || `https://i.pravatar.cc/150?img=${randomNum}`;
      
      const newChat = this.chatService.addChat({
        contactName: name,
        avatar: avatar,
        status: 'online',
        lastMessage: 'Chat creado',
        lastMessageTime: new Date()
      });
      
      this.chatService.setActiveChat(newChat.id);
      this.close();
    }
  }

  close(): void {
    this.closeModal.emit();
  }

  onBackdropClick(event: Event): void {
    if (event.target === event.currentTarget) {
      this.close();
    }
  }
}