import { Component, inject, signal, ViewChild, ElementRef, AfterViewChecked, Output, EventEmitter } from '@angular/core';
import { ChatService } from '../../services/chat.service';
import { DateFormatPipe } from '../../pipes/date-format.pipe';

@Component({
  selector: 'app-chat-window',
  standalone: true,
  imports: [DateFormatPipe],
  templateUrl: './chat-window.component.html',
  styleUrl: './chat-window.component.css'
})
export class ChatWindowComponent implements AfterViewChecked {
  private chatService = inject(ChatService);
  
  @ViewChild('messagesContainer') messagesContainer!: ElementRef;
  @Output() backToList = new EventEmitter<void>();
  
  activeChat = this.chatService.activeChat;
  messages = this.chatService.activeChatMessages;
  newMessage = signal('');

  ngAfterViewChecked(): void {
    this.scrollToBottom();
  }

  updateMessage(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.newMessage.set(input.value);
  }

  sendMessage(): void {
    const content = this.newMessage().trim();
    const chatId = this.activeChat()?.id;
    
    if (content && chatId) {
      this.chatService.sendMessage(chatId, content);
      this.newMessage.set('');
    }
  }

  onKeyPress(event: KeyboardEvent): void {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      this.sendMessage();
    }
  }

  goBack(): void {
    this.backToList.emit();
  }

  private scrollToBottom(): void {
    if (this.messagesContainer) {
      const container = this.messagesContainer.nativeElement;
      container.scrollTop = container.scrollHeight;
    }
  }
}