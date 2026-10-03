import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ChatService } from '../../services/chat.service';
import { ChatUser } from '../../models/chat.model';

@Component({
  selector: 'app-chat-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div style="background-color: #f8f8f8; flex: 1; display: flex; flex-direction: column; padding-bottom: 90px; color: #000000;">
      <!-- Top Header -->
      <div style="padding: 20px 20px 12px 20px; display: flex; align-items: center; gap: 14px;">
        <img [src]="currentUser.avatar || 'https://res.cloudinary.com/zdavpzw2/image/upload/v1791068876/agriagent_ai/bf6893740faf9b9fd905b3094897788d.jpg'" [alt]="currentUser.fullname" style="width: 48px; height: 48px; border-radius: 50%; object-fit: cover;">
        <div>
          <h1 style="font-size: 22px; font-weight: 800; color: #000000; margin: 0;">{{currentUser.fullname}}</h1>
          <div style="font-size: 12px; color: #16a34a; font-weight: 700;">● {{currentUser.role === 'farmer' ? 'Nông dân Bán hàng' : 'Thương lái Mua hàng'}}</div>
        </div>
      </div>

      <!-- Search Bar Capsule -->
      <div style="padding: 0 20px 14px 20px;">
        <div style="display: flex; align-items: center; gap: 10px; border: none; border-radius: 14px; padding: 10px 16px; background-color: rgba(0, 0, 0, 0.05);">
          <i class="fa-solid fa-magnifying-glass" style="color: #000000; font-size: 16px;"></i>
          <input type="text" placeholder="Tìm kiếm hội thoại..." style="flex: 1; border: none; outline: none; background: transparent; font-size: 16px; color: #000000; font-family: inherit;">
        </div>
      </div>

      <!-- Top Horizontal Scrollable Active Avatars -->
      <div style="display: flex; gap: 16px; overflow-x: auto; padding: 4px 20px 16px 20px; flex-shrink: 0; background-color: #f8f8f8;">
        <a *ngFor="let user of chatUsers" [routerLink]="user.id === 'agri-ai' ? '/chat-ai' : user.id === 'support-staff' ? '/chat-staff' : ['/chat-user', user.id]" style="text-align: center; flex-shrink: 0; text-decoration: none;">
          <div style="position: relative; width: 62px; height: 62px; margin: 0 auto 6px;">
            <img [src]="user.avatar" [alt]="user.name" style="width: 100%; height: 100%; border-radius: 50%; object-fit: cover;">
            <span style="position: absolute; bottom: 2px; right: 2px; width: 14px; height: 14px; background-color: #22c55e; border: 2.5px solid #ffffff; border-radius: 50%;"></span>
          </div>
          <div style="font-size: 12px; font-weight: 600; color: #000000; width: 64px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">{{user.name}}</div>
        </a>
      </div>

      <!-- Recent Chat List -->
      <div style="padding: 12px 18px; flex: 1; background-color: #f8f8f8; display: flex; flex-direction: column; gap: 16px;">
        <a *ngFor="let user of chatUsers" [routerLink]="user.id === 'agri-ai' ? '/chat-ai' : user.id === 'support-staff' ? '/chat-staff' : ['/chat-user', user.id]" style="display: flex; gap: 14px; align-items: center; text-decoration: none; color: #000000;">
          <img [src]="user.avatar" [alt]="user.name" style="width: 60px; height: 60px; border-radius: 50%; object-fit: cover; flex-shrink: 0;">
          <div style="flex: 1; min-width: 0;">
            <div style="font-weight: 800; font-size: 16px; color: #000000; margin-bottom: 3px;">{{user.name}}</div>
            <div style="font-size: 14px; color: #475569; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">
              {{user.initialMessages && user.initialMessages.length > 0 ? user.initialMessages[user.initialMessages.length - 1].text : user.status}}
            </div>
          </div>
          <i class="fa-solid fa-chevron-right" style="color: #cbd5e1; font-size: 14px;"></i>
        </a>
      </div>
    </div>
  `
})
export class ChatListComponent {
  private authService = inject(AuthService);
  private chatService = inject(ChatService);

  currentUser = this.authService.getCurrentUser();
  chatUsers: ChatUser[] = this.chatService.getAllChatUsers();
}
