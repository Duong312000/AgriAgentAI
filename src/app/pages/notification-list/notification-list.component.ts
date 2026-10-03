import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-notification-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="app-header">
      <a routerLink="/farmer-home" class="btn-back"><i class="fa-solid fa-chevron-left"></i></a>
      <h2 class="header-title" style="font-size: 22px; font-weight: 800;">Thông báo</h2>
    </div>

    <div style="padding: 16px; flex: 1; padding-bottom: 90px;">
      <div style="font-size: 15px; font-weight: 800; color: #1e293b; margin-bottom: 12px;">Hôm nay</div>

      <div class="notif-item-card">
        <div class="icon-circle icon-bell">
          <i class="fa-solid fa-bell"></i>
        </div>
        <div class="notif-content">
          <div class="notif-header-row">
            <div class="notif-title">voucher mua mít</div>
            <span class="notif-time">9 phút trước</span>
          </div>
          <div class="notif-desc">voucher mua mít siu ưu đãi 20%</div>
        </div>
        <span class="notif-badge">2</span>
      </div>

      <div class="notif-item-card green-tint">
        <div class="icon-circle icon-concierge">
          <i class="fa-solid fa-bell-concierge"></i>
        </div>
        <div class="notif-content">
          <div class="notif-header-row">
            <div class="notif-title">vourcher mua chuỗi sắp hết hạn</div>
            <span class="notif-time">9 phút trước</span>
          </div>
          <div class="notif-desc">vocher mua chúi 20% sắp hết hạn, đừng bỏ lỡ nhé</div>
        </div>
        <span class="notif-badge">2</span>
      </div>

      <a routerLink="/order-tracking" class="notif-item-card notif-link">
        <div class="icon-circle icon-box">
          <i class="fa-solid fa-box"></i>
        </div>
        <div class="notif-content">
          <div class="notif-header-row">
            <div class="notif-title">Đơn hàng đang vận chuyển</div>
            <span class="notif-time">9 phút trước</span>
          </div>
          <div class="notif-desc">đơn hàng sầu riêng đang được vận chuyển, ráng chờ xíu nhé</div>
        </div>
        <span class="notif-badge">2</span>
      </a>

      <div style="font-size: 15px; font-weight: 800; color: #1e293b; margin-bottom: 12px; margin-top: 20px;">Hôm qua</div>

      <div class="notif-item-card">
        <div class="icon-circle icon-cube">
          <i class="fa-solid fa-cube"></i>
        </div>
        <div class="notif-content">
          <div class="notif-header-row">
            <div class="notif-title">Đơn hàng giao thành công</div>
            <span class="notif-time">12:53 sáng</span>
          </div>
          <div class="notif-desc">Hãy để lại đánh giá nhé</div>
        </div>
        <span class="notif-badge">2</span>
      </div>
    </div>
  `,
  styles: [`
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
    }

    .notif-item-card.green-tint {
      background-color: #e6f2d4;
      border-color: #d6e8ba;
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
      font-weight: 800;
      font-size: 15px;
      color: #1e293b;
    }

    .notif-time {
      font-size: 12px;
      color: #94a3b8;
    }

    .notif-desc {
      font-size: 13px;
      color: #64748b;
      line-height: 1.4;
    }

    .notif-badge {
      width: 20px;
      height: 20px;
      background: #769f2e;
      color: #ffffff;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 11px;
      font-weight: 700;
      flex-shrink: 0;
    }
  `]
})
export class NotificationListComponent {}
