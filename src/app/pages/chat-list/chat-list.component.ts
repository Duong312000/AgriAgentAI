import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ChatService, ChatRoomData } from '../../services/chat.service';

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

      <!-- Quick Action Shortcuts -->
      <div style="padding: 0 20px 14px 20px; display: flex; gap: 10px;">
        <a routerLink="/chat-ai" style="flex: 1; background: #e0f2fe; color: #0284c7; padding: 10px 12px; border-radius: 12px; font-size: 13px; font-weight: 700; text-decoration: none; display: flex; align-items: center; justify-content: center; gap: 6px;">
          <i class="fa-solid fa-robot"></i> Chat Trợ Lý AI
        </a>
        <a routerLink="/chat-staff" style="flex: 1; background: #fee2e2; color: #ef4444; padding: 10px 12px; border-radius: 12px; font-size: 13px; font-weight: 700; text-decoration: none; display: flex; align-items: center; justify-content: center; gap: 6px;">
          <i class="fa-solid fa-headset"></i> Hỗ Trợ CSKH
        </a>
      </div>

      <!-- Search Bar Capsule -->
      <div style="padding: 0 20px 14px 20px;">
        <div style="display: flex; align-items: center; gap: 10px; border: none; border-radius: 14px; padding: 10px 16px; background-color: rgba(0, 0, 0, 0.05);">
          <i class="fa-solid fa-magnifying-glass" style="color: #000000; font-size: 16px;"></i>
          <input type="text" placeholder="Tìm kiếm hội thoại..." style="flex: 1; border: none; outline: none; background: transparent; font-size: 16px; color: #000000; font-family: inherit;">
        </div>
      </div>

      <!-- Empty State -->
      <div *ngIf="rooms.length === 0" style="text-align: center; padding: 40px 20px; color: #888;">
        <i class="fa-regular fa-comments" style="font-size: 48px; color: #ccc; margin-bottom: 12px;"></i>
        <p style="font-size: 14px; font-weight: 600;">Chưa có đoạn chat nào trong cơ sở dữ liệu</p>
      </div>

      <!-- Recent Chat List from MongoDB -->
      <div style="padding: 12px 18px; flex: 1; background-color: #f8f8f8; display: flex; flex-direction: column; gap: 16px;">
        <a *ngFor="let room of rooms" [routerLink]="['/chat-user', room.id]" style="display: flex; gap: 14px; align-items: center; text-decoration: none; color: #000000; background: #ffffff; padding: 12px; border-radius: 14px; border: 1px solid #eeeeee; box-shadow: 0 1px 4px rgba(0,0,0,0.03);">
          <img [src]="getPartnerAvatar(room)" [alt]="getPartnerName(room)" style="width: 54px; height: 54px; border-radius: 50%; object-fit: cover; flex-shrink: 0;">
          <div style="flex: 1; min-width: 0;">
            <div style="font-weight: 800; font-size: 16px; color: #000000; margin-bottom: 3px;">{{ getPartnerName(room) }}</div>
            <div style="font-size: 14px; color: #475569; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">
              {{ room.latestMessage ? room.latestMessage.content : 'Nhấn để trò chuyện...' }}
            </div>
          </div>
          <i class="fa-solid fa-chevron-right" style="color: #cbd5e1; font-size: 14px;"></i>
        </a>
      </div>
    </div>
  `
})
export class ChatListComponent implements OnInit {
  private authService = inject(AuthService);
  private chatService = inject(ChatService);

  currentUser = this.authService.getCurrentUser();
  rooms: ChatRoomData[] = [];

  ngOnInit(): void {
    this.chatService.getRooms().subscribe({
      next: (res) => {
        if (res.success) {
          this.rooms = res.data;
        }
      },
      error: (err) => console.error('Lỗi khi tải danh sách cuộc trò chuyện:', err)
    });
  }

  getPartnerName(room: ChatRoomData): string {
    if (room.participants && room.participants.length > 0) {
      const partner = room.participants.find(p => p.userId && p.userId._id !== this.currentUser.id) || room.participants[0];
      if (partner?.userId?.fullName) return partner.userId.fullName;
      if (partner?.userId?.firstName) return `${partner.userId.lastName || ''} ${partner.userId.firstName}`;
    }
    return room.roomType === 'USER_STAFF' ? 'Tổng đài CSKH AgriAgent' : 'Nông Dân Nông Thương';
  }

  getPartnerAvatar(room: ChatRoomData): string {
    if (room.participants && room.participants.length > 0) {
      const partner = room.participants.find(p => p.userId && p.userId._id !== this.currentUser.id) || room.participants[0];
      if (partner?.userId?.avatarUrl) return partner.userId.avatarUrl;
    }
    return 'https://res.cloudinary.com/zdavpzw2/image/upload/v1791068876/agriagent_ai/bf6893740faf9b9fd905b3094897788d.jpg';
  }
}
