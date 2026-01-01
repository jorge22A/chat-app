import { Component, signal, HostListener } from '@angular/core';
import { ChatNavigationService } from './services/chat-navigation.service';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { ChatListComponent } from './components/chat-list/chat-list.component';
import { ChatWindowComponent } from './components/chat-window/chat-window.component';
import { NewChatComponent } from './components/new-chat/new-chat.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    SidebarComponent,
    ChatListComponent,
    ChatWindowComponent,
    NewChatComponent
  ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  showNewChatModal = signal(false);
  
  constructor(public navigationService: ChatNavigationService) {}
  
  openNewChat() {
    this.showNewChatModal.set(true);
  }
  
  closeNewChat() {
    this.showNewChatModal.set(false);
  }
  
  onChatSelected() {
    if (this.navigationService.isMobile()) {
      this.navigationService.showConversation();
    }
  }
  
  onBackToList() {
    this.navigationService.showList();
  }
  
  @HostListener('window:resize')
  onResize() {
    if (!this.navigationService.isMobile()) {
      this.navigationService.showList();
    }
  }
}