import { Component, inject, Output, EventEmitter } from '@angular/core';
import { NgClass } from '@angular/common';
import { ChatService } from '../../services/chat.service';
import { DateFormatPipe } from '../../pipes/date-format.pipe';

@Component({
  selector: 'app-chat-list',
  standalone: true,
  imports: [DateFormatPipe, NgClass],
  templateUrl: './chat-list.component.html',
  styleUrl: './chat-list.component.css'
})
export class ChatListComponent {
  private chatService = inject(ChatService);
  
  @Output() chatSelected = new EventEmitter<void>();
  
  chats = this.chatService.filteredChats;
  activeChatId = this.chatService.activeChatId;
  searchTerm = this.chatService.searchTerm;

  onSearch(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.chatService.setSearchTerm(input.value);
  }

  selectChat(chatId: string): void {
    this.chatService.setActiveChat(chatId);
    this.chatSelected.emit();
  }

  getStatusClass(status: string): string {
    return `status-${status}`;
  }
}