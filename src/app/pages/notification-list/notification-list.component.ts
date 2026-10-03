import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NotificationService, NotificationItem } from '../../services/notification.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-notification-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="app-header">
      <a [routerLink]="currentUser.role === 'farmer' ? '/farmer-home' : '/buyer-home'" class="btn-back"><i class="fa-solid fa-chevron-left"></i></a>
      <h2 class="header-title" style="font-size: 22px; font-weight: 800;">Thông báo</h2>
    </div>

    <div style="padding: 16px; flex: 1; padding-bottom: 90px;">
      <!-- Empty State -->
      <div *ngIf="notifications.length === 0" style="text-align: center; padding: 40px 20px; color: #888;">
        <i class="fa-solid fa-bell-slash" style="font-size: 48px; color: #ccc; margin-bottom: 12px;"></i>
        <p style="font-size: 14px; font-weight: 600;">Bạn chưa có thông báo nào</p>
      </div>

      <div *ngIf="notifications.length > 0">
        <div style="font-size: 15px; font-weight: 800; color: #1e293b; margin-bottom: 12px;">Danh sách thông báo</div>

        <div *ngFor="let notif of notifications" class="notif-item-card" [class.green-tint]="!notif.isRead" (click)="markAsRead(notif)">
          <div class="icon-circle" [ngClass]="getIconClass(notif.type)">
            <i [class]="getIconFa(notif.type)"></i>
          </div>
          <div class="notif-content">
            <div class="notif-header-row">
              <div class="notif-title" [style.fontWeight]="notif.isRead ? '600' : '800'">{{notif.title}}</div>
              <span class="notif-time">{{notif.createdAt | date:'HH:mm dd/MM'}}</span>
            </div>
            <div class="notif-desc">{{notif.content}}</div>
          </div>
          <span *ngIf="!notif.isRead" class="notif-badge">MỚI</span>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .app-header {
      position: sticky;
      top: 0;
      z-index: 100;
      background: #ffffff;
      padding: 14px 16px;
      display: flex;
      align-items: center;
      gap: 12px;
      border-bottom: 1px solid #e2e8f0;
    }
    .btn-back {
      color: #334155;
      font-size: 18px;
      text-decoration: none;
    }
    .header-title {
      margin: 0;
      color: #0f172a;
    }

    .notif-item-card {
      display: flex;
      flex-direction: row;
      align-items: flex-start;
      gap: 14px;
      background: #ffffff;
      border-radius: 18px;
      padding: 16px;
      margin-bottom: 12px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
      border: 1px solid #f1f5f9;
      text-decoration: none;
      color: inherit;
      cursor: pointer;
    }

    .notif-item-card.green-tint {
      background-color: #f0fdf4;
      border-color: #bbf7d0;
    }

    .icon-circle {
      width: 42px;
      height: 42px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
      font-size: 20px;
    }

    .icon-bell { background: #eaf3d8; color: #769f2e; }
    .icon-concierge { background: #fee2e2; color: #ef4444; }
    .icon-box { background: #fce7f3; color: #ec4899; }
    .icon-cube { background: #e0f2fe; color: #0284c7; }

    .notif-content {
      flex: 1;
    }

    .notif-header-row {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 4px;
    }

    .notif-title {
      font-size: 14px;
      color: #1e293b;
    }

    .notif-time {
      font-size: 11px;
      color: #94a3b8;
    }

    .notif-desc {
      font-size: 13px;
      color: #475569;
      line-height: 1.4;
    }

    .notif-badge {
      background: #ef4444;
      color: white;
      padding: 2px 6px;
      border-radius: 10px;
      font-size: 10px;
      font-weight: 800;
    }
  `]
})
export class NotificationListComponent implements OnInit {
  private authService = inject(AuthService);
  private notificationService = inject(NotificationService);
  currentUser = this.authService.getCurrentUser();

  notifications: NotificationItem[] = [];

  ngOnInit(): void {
    this.loadNotifications();
  }

  loadNotifications(): void {
    this.notificationService.getNotifications().subscribe({
      next: (res) => {
        if (res.success) {
          this.notifications = res.data;
        }
      },
      error: (err) => console.error('Lỗi khi tải thông báo:', err)
    });
  }

  markAsRead(notif: NotificationItem): void {
    if (!notif.isRead) {
      notif.isRead = true;
      this.notificationService.markAsRead(notif._id).subscribe();
    }
  }

  getIconClass(type: string): string {
    switch(type) {
      case 'ORDER_UPDATE': return 'icon-box';
      case 'PRICE_ALERT': return 'icon-bell';
      case 'SYSTEM': return 'icon-cube';
      default: return 'icon-bell';
    }
  }

  getIconFa(type: string): string {
    switch(type) {
      case 'ORDER_UPDATE': return 'fa-solid fa-truck-fast';
      case 'PRICE_ALERT': return 'fa-solid fa-chart-line';
      case 'SYSTEM': return 'fa-solid fa-gear';
      default: return 'fa-solid fa-bell';
    }
  }
}
