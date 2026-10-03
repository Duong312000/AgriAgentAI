import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-bottom-nav',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="bottom-nav">
      <a [routerLink]="homeRoute" routerLinkActive="active" class="nav-item">
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
      bottom: 0;
      left: 50%;
      transform: translateX(-50%);
      width: 100%;
      max-width: 480px;
      height: 60px;
      background-color: #ffffff;
      border: none;
      border-radius: 0;
      display: flex;
      justify-content: space-around;
      align-items: center;
      padding: 6px 12px;
      box-sizing: border-box;
      box-shadow: 0 -1px 4px rgba(0, 0, 0, 0.25);
      z-index: 1000;
    }

    .nav-item {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 3px;
      color: #64748b;
      text-decoration: none;
      font-size: 11px;
      font-weight: 600;
      padding: 4px 12px;
      height: 100%;
      border-radius: 8px;
      transition: all 0.2s ease;
      min-width: 60px;
      box-sizing: border-box;
    }

    .nav-item.active {
      color: #769f2e;
      font-weight: 700;
      background-color: #e6f0d9;
      border: 1.5px solid #a3c267;
      border-radius: 10px;
    }

    .nav-item i {
      font-size: 18px;
    }
  `]
})
export class BottomNavComponent {
  private authService = inject(AuthService);
  homeRoute = this.authService.getCurrentUser().role === 'buyer' ? '/buyer-home' : '/farmer-home';
}
