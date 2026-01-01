import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ChatNavigationService {
  private currentPanel = signal<'list' | 'conversation'>('list');
  
  panel = this.currentPanel.asReadonly();
  
  showList() {
    this.currentPanel.set('list');
  }
  
  showConversation() {
    this.currentPanel.set('conversation');
  }
  
  isMobile(): boolean {
    return window.innerWidth <= 768;
  }
}