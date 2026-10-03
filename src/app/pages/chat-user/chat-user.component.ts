import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { ChatService } from '../../services/chat.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-chat-user',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  template: `
    <div style="height: 100vh; display: flex; flex-direction: column; background-color: #f8fafc;">
      <!-- Top Navigation Header (#ffffff background) -->
      <div style="background-color: #ffffff; padding: 14px 18px; display: flex; align-items: center; justify-content: space-between; border-bottom: 1px solid #e2e8f0; box-shadow: 0 2px 8px rgba(0,0,0,0.04); position: sticky; top: 0; z-index: 50;">
        <div style="display: flex; align-items: center; gap: 12px;">
          <a routerLink="/chat-list" style="color: #1e293b; text-decoration: none; display: flex; align-items: center; justify-content: center; width: 34px; height: 34px; border-radius: 50%; background-color: #f1f5f9;">
            <i class="fa-solid fa-chevron-left" style="font-size: 16px;"></i>
          </a>
          <img [src]="partnerAvatar" alt="Avatar" style="width: 40px; height: 40px; border-radius: 50%; object-fit: cover; border: 1px solid #e2e8f0;">
          <div>
            <div style="font-size: 17px; font-weight: 800; color: #0f172a; margin: 0; line-height: 1.2;">{{ partnerName }}</div>
            <div style="font-size: 11.5px; color: #16a34a; font-weight: 600; display: flex; align-items: center; gap: 4px;">
              <span style="width: 7px; height: 7px; background-color: #16a34a; border-radius: 50%; display: inline-block;"></span>
              Đang trực tuyến
            </div>
          </div>
        </div>

        <div style="display: flex; align-items: center; gap: 14px;">
          <button style="border: none; background: none; color: #769f2e; font-size: 18px; cursor: pointer;">
            <i class="fa-solid fa-phone"></i>
          </button>
          <button style="border: none; background: none; color: #769f2e; font-size: 18px; cursor: pointer;">
            <i class="fa-solid fa-video"></i>
          </button>
        </div>
      </div>

      <!-- Messages Body Area -->
      <div style="padding: 18px 16px; flex: 1; background-color: #f8fafc; display: flex; flex-direction: column; gap: 10px; box-sizing: border-box; overflow-y: auto;">
        <div *ngFor="let msg of messages" [style.alignSelf]="isMyMessage(msg) ? 'flex-end' : 'flex-start'" [style.maxWidth]="isMyMessage(msg) ? '82%' : '85%'" style="margin-bottom: 8px;">
          <div *ngIf="isMyMessage(msg)" style="background: linear-gradient(135deg, #769f2e 0%, #5f8323 100%); color: #ffffff; padding: 12px 16px; border-radius: 18px 18px 4px 18px; font-size: 14.5px; font-weight: 500; line-height: 1.45; box-shadow: 0 3px 10px rgba(118, 159, 46, 0.25);">
            <div>{{ msg.content }}</div>
            <div style="font-size: 10px; opacity: 0.8; text-align: right; margin-top: 4px;">{{ msg.sentAt | date:'HH:mm' }}</div>
          </div>
          <div *ngIf="!isMyMessage(msg)" style="display: flex; gap: 10px; align-items: flex-end;">
            <img [src]="partnerAvatar" alt="Avatar" style="width: 30px; height: 30px; border-radius: 50%; object-fit: cover; flex-shrink: 0; margin-bottom: 2px;">
            <div style="background-color: #ffffff; padding: 12px 16px; border-radius: 18px 18px 18px 4px; font-size: 14.5px; color: #1e293b; font-weight: 500; line-height: 1.45; border: 1px solid #e2e8f0; box-shadow: 0 2px 8px rgba(0,0,0,0.04);">
              <div>{{ msg.content }}</div>
              <div style="font-size: 10px; color: #94a3b8; text-align: right; margin-top: 4px;">{{ msg.sentAt | date:'HH:mm' }}</div>
            </div>
          </div>
        </div>
      </div>

      <!-- Bottom Chat Input Bar (#ffffff background) -->
      <div style="background-color: #ffffff; padding: 12px 14px; display: flex; align-items: center; gap: 10px; border-top: 1px solid #e2e8f0; box-shadow: 0 -2px 10px rgba(0,0,0,0.03); position: sticky; bottom: 0; z-index: 50;">
        <button style="border: none; background: none; color: #769f2e; font-size: 19px; cursor: pointer; padding: 0;">
          <i class="fa-solid fa-circle-plus"></i>
        </button>
        <button style="border: none; background: none; color: #769f2e; font-size: 19px; cursor: pointer; padding: 0;">
          <i class="fa-solid fa-camera"></i>
        </button>
        <button style="border: none; background: none; color: #769f2e; font-size: 19px; cursor: pointer; padding: 0;">
          <i class="fa-regular fa-image"></i>
        </button>

        <div style="flex: 1; display: flex; align-items: center; background-color: #f1f5f9; border-radius: 22px; padding: 8px 14px; border: 1px solid #e2e8f0;">
          <input [(ngModel)]="inputMessage" (keydown.enter)="sendMessage()" type="text" placeholder="Nhập tin nhắn..." style="width: 100%; border: none; outline: none; background: transparent; font-size: 14.5px; color: #0f172a;">
          <i class="fa-regular fa-face-smile" style="font-size: 19px; color: #64748b; cursor: pointer; margin-left: 6px;"></i>
        </div>

        <button (click)="sendMessage()" style="border: none; background-color: #769f2e; color: #ffffff; width: 40px; height: 40px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 16px; cursor: pointer; flex-shrink: 0; box-shadow: 0 3px 10px rgba(118, 159, 46, 0.3);">
          <i class="fa-solid fa-paper-plane"></i>
        </button>
      </div>
    </div>
  `
})
export class ChatUserComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private chatService = inject(ChatService);
  private authService = inject(AuthService);

  currentUser = this.authService.getCurrentUser();
  roomId: string = '';
  partnerName: string = 'Người dùng Nông Thương';
  partnerAvatar: string = 'https://res.cloudinary.com/zdavpzw2/image/upload/v1791068876/agriagent_ai/bf6893740faf9b9fd905b3094897788d.jpg';
  messages: any[] = [];
  inputMessage = '';

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.roomId = params['userId'] || '';
      if (this.roomId) {
        this.loadMessages();
      }
    });
  }

  loadMessages() {
    this.chatService.getMessages(this.roomId).subscribe({
      next: (res) => {
        if (res.success) {
          this.messages = res.data;
          // Partner metadata if available
          if (this.messages.length > 0) {
            const partnerMsg = this.messages.find(m => m.senderId && m.senderId._id !== this.currentUser.id);
            if (partnerMsg?.senderId) {
              this.partnerName = partnerMsg.senderId.fullName || `${partnerMsg.senderId.lastName || ''} ${partnerMsg.senderId.firstName || ''}`;
              this.partnerAvatar = partnerMsg.senderId.avatarUrl || this.partnerAvatar;
            }
          }
        }
      },
      error: (err) => console.error('Lỗi tải lịch sử tin nhắn:', err)
    });
  }

  isMyMessage(msg: any): boolean {
    if (typeof msg.senderId === 'object' && msg.senderId?._id) {
      return msg.senderId._id === this.currentUser.id;
    }
    return msg.senderId === this.currentUser.id;
  }

  sendMessage() {
    if (!this.inputMessage.trim() || !this.roomId) return;
    const text = this.inputMessage.trim();
    this.inputMessage = '';
    const senderId = this.currentUser.id || 'anonymous';
    this.chatService.sendMessage(this.roomId, senderId, text).subscribe({
      next: (res) => {
        if (res.success) {
          this.loadMessages();
        }
      },
      error: (err) => console.error('Lỗi khi gửi tin nhắn:', err)
    });
  }
}
