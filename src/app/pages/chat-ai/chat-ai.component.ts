import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ChatService } from '../../services/chat.service';
import { ChatUser, ChatMessage } from '../../models/chat.model';

@Component({
  selector: 'app-chat-ai',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  template: `
    <div style="background-color: #fde047; padding: 16px 20px; display: flex; align-items: center; justify-content: space-between; border-bottom: 1px solid #facc15;">
      <div style="display: flex; align-items: center; gap: 12px;">
        <a routerLink="/chat-list" style="color: #111827; text-decoration: none; font-size: 18px; display: flex; align-items: center;">
          <i class="fa-solid fa-chevron-left"></i>
        </a>
        <img [src]="user.avatar" alt="Avatar" style="height: 38px; width: 38px; border-radius: 50%; object-fit: cover;">
        <div>
          <div style="font-size: 19px; font-weight: 800; color: #111827; margin: 0; line-height: 1.2;">{{user.name}}</div>
          <div style="font-size: 11px; color: #587820; font-weight: 600;">{{user.status}}</div>
        </div>
      </div>
    </div>

    <div style="padding: 24px 18px; flex: 1; background-color: #FFFAD4; display: flex; flex-direction: column; gap: 12px; box-sizing: border-box; overflow-y: auto;">
      <div *ngFor="let msg of messages" [style.alignSelf]="msg.sender === 'me' ? 'flex-end' : 'flex-start'" [style.maxWidth]="msg.sender === 'me' ? '82%' : '85%'" style="margin-bottom: 12px;">
        <div *ngIf="msg.sender === 'me'" style="background-color: #4f52ff; color: #ffffff; padding: 12px 18px; border-radius: 20px 20px 4px 20px; font-size: 15px; font-weight: 500; line-height: 1.4; box-shadow: 0 4px 12px rgba(79, 82, 255, 0.25);">
          <div>{{msg.text}}</div>
          <div style="font-size: 10px; opacity: 0.75; text-align: right; margin-top: 4px;">{{msg.time}}</div>
        </div>
        <div *ngIf="msg.sender === 'them'" style="display: flex; gap: 10px; align-items: flex-end;">
          <img [src]="user.avatar" alt="Avatar" style="width: 28px; height: 28px; border-radius: 50%; object-fit: cover; flex-shrink: 0; margin-bottom: 2px;">
          <div style="background-color: #ffffff; padding: 12px 18px; border-radius: 20px 20px 20px 4px; font-size: 15px; color: #111827; font-weight: 500; line-height: 1.4; box-shadow: 0 3px 10px rgba(0,0,0,0.06);">
            <div>{{msg.text}}</div>
            <div style="font-size: 10px; color: #94a3b8; text-align: right; margin-top: 4px;">{{msg.time}}</div>
          </div>
        </div>
      </div>
    </div>

    <div style="background-color: #fde047; padding: 10px 14px; display: flex; align-items: center; gap: 10px; border-top: 1px solid #facc15;">
      <i class="fa-solid fa-camera" style="font-size: 20px; color: #6b7a22; cursor: pointer;"></i>
      <i class="fa-regular fa-image" style="font-size: 20px; color: #6b7a22; cursor: pointer;"></i>
      <i class="fa-solid fa-microphone" style="font-size: 20px; color: #6b7a22; cursor: pointer;"></i>

      <div style="flex: 1; display: flex; align-items: center; background-color: #ffffff; border-radius: 22px; padding: 6px 14px; box-shadow: 0 2px 6px rgba(0,0,0,0.06);">
        <input [(ngModel)]="inputMessage" (keydown.enter)="sendMessage()" type="text" placeholder="Aa" style="width: 100%; border: none; outline: none; background: transparent; font-size: 15px; color: #111827;">
        <i class="fa-regular fa-face-smile" style="font-size: 20px; color: #6b7a22; cursor: pointer; margin-left: 6px;"></i>
      </div>

      <button (click)="sendMessage()" style="border: none; background: #6b7a22; color: #ffffff; width: 38px; height: 38px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 16px; cursor: pointer; flex-shrink: 0; box-shadow: 0 3px 8px rgba(107,122,34,0.3);">
        <i class="fa-solid fa-paper-plane"></i>
      </button>
    </div>
  `
})
export class ChatAiComponent implements OnInit {
  private chatService = inject(ChatService);
  user!: ChatUser;
  messages: ChatMessage[] = [];
  inputMessage = '';

  ngOnInit() {
    this.user = this.chatService.getChatUser('agri-ai');
    this.messages = [...this.user.initialMessages];
  }

  sendMessage() {
    if (!this.inputMessage.trim()) return;
    const now = new Date();
    const timeStr = `${now.getHours() % 12 || 12}:${now.getMinutes().toString().padStart(2, '0')} ${now.getHours() >= 12 ? 'PM' : 'AM'}`;
    
    this.messages.push({ sender: 'me', text: this.inputMessage.trim(), time: timeStr });
    this.inputMessage = '';

    setTimeout(() => {
      const reply = this.user.replies[Math.floor(Math.random() * this.user.replies.length)];
      this.messages.push({ sender: 'them', text: reply, time: timeStr });
    }, 1000);
  }
}
