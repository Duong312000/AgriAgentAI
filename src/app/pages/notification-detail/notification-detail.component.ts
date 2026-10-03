import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { NotificationService, NotificationItem } from '../../services/notification.service';

@Component({
  selector: 'app-notification-detail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="app-header">
      <a routerLink="/notification-list" class="btn-back"><i class="fa-solid fa-chevron-left"></i></a>
      <h2 class="header-title" style="font-size: 20px; font-weight: 800;">Chi tiết thông báo</h2>
    </div>

    <div style="padding: 20px; flex: 1;">
      <div class="notif-detail-card" *ngIf="notification">
        <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 16px;">
          <div style="width: 48px; height: 48px; background: #eaf3d8; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: #769f2e; flex-shrink: 0;">
            <i class="fa-solid fa-bell" style="font-size: 24px;"></i>
          </div>
          <div>
            <h3 style="font-size: 18px; font-weight: 800; color: #1e293b; margin: 0 0 2px 0;">{{ notification.title }}</h3>
            <span style="font-size: 12px; color: #94a3b8;">{{ notification.createdAt | date:'HH:mm dd/MM/yyyy' }}</span>
          </div>
        </div>
        <p style="font-size: 15px; color: #475569; line-height: 1.6; margin-bottom: 20px;">
          {{ notification.content }}
        </p>
        <a routerLink="/buyer-home" class="btn-primary" style="background-color: #769f2e; color: #fff; padding: 10px 20px; border-radius: 8px; text-decoration: none; font-weight: 700;">Xem chi tiết trang chủ</a>
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

    .notif-detail-card {
      background: #ffffff;
      border-radius: 20px;
      padding: 20px;
      box-shadow: 0 4px 16px rgba(0, 0, 0, 0.05);
      border: 1px solid #f1f5f9;
    }
  `]
})
export class NotificationDetailComponent implements OnInit {
  notification: NotificationItem | null = null;

  constructor(
    private notificationService: NotificationService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.notificationService.getNotificationById(id).subscribe({
        next: (res) => {
          if (res.success) {
            this.notification = res.data;
          }
        },
        error: (err) => console.error('Lỗi khi tải chi tiết thông báo:', err)
      });
    }
  }
}
