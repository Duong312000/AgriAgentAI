import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-bottom-nav',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="bottom-nav">
      <a routerLink="/farmer-home" routerLinkActive="active" class="nav-item">
        <i class="fa-solid fa-house"></i>
        <span>Trang chủ</span>
      </a>
      <a routerLink="/chat-list" routerLinkActive="active" class="nav-item">
        <i class="fa-regular fa-comment-dots"></i>
        <span>Trò chuyện</span>
      </a>
      <a routerLink="/notifications" routerLinkActive="active" class="nav-item">
        <i class="fa-regular fa-bell"></i>
        <span>Thông Báo</span>
      </a>
      <a routerLink="/profile" routerLinkActive="active" class="nav-item">
        <i class="fa-regular fa-user"></i>
        <span>Cá nhân</span>
      </a>
    </div>
  `,
  styles: [`
    .bottom-nav {
      position: fixed;
      bottom: 12px;
      left: 50%;
      transform: translateX(-50%);
      width: calc(100% - 24px);
      max-width: 345px;
      height: 56px;
      background-color: #fcebbd;
      border: 1.5px solid #6b5a26;
      border-radius: 32px;
      display: flex;
      justify-content: space-around;
      align-items: center;
      padding: 4px 8px;
      box-sizing: border-box;
      box-shadow: 0 6px 18px rgba(0, 0, 0, 0.15);
      z-index: 1000;
    }

    .nav-item {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 2px;
      color: #7c8c2c;
      text-decoration: none;
      font-size: 11px;
      font-weight: 600;
      padding: 4px 10px;
      height: 46px;
      border-radius: 14px;
      transition: all 0.2s ease;
      min-width: 54px;
      box-sizing: border-box;
    }

    .nav-item.active {
      color: #4f5f0f;
      background-color: #d6ca94;
      border: 1.5px solid #8c7e47;
      font-weight: 700;
    }
  `]
})
export class BottomNavComponent {}
