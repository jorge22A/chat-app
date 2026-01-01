import { Component, output } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
  newChatClick = output<void>();
  
  onNewChat(): void {
    this.newChatClick.emit();
  }
}