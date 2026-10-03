import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-notification-detail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="app-header">
      <a routerLink="/notifications" class="btn-back"><i class="fa-solid fa-chevron-left"></i></a>
      <h2 class="header-title" style="font-size: 22px; font-weight: 800;">Chi tiết thông báo</h2>
    </div>

    <div style="padding: 20px; flex: 1;">
      <div class="card" style="padding: 20px; border-radius: 20px;">
        <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 16px;">
          <div style="width: 48px; height: 48px; background: #eaf3d8; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: #769f2e;">
            <i class="fa-solid fa-bell" style="font-size: 24px;"></i>
          </div>
          <div>
            <h3 style="font-size: 18px; font-weight: 800; color: #1e293b;">Voucher Mua Mít Ưu Đãi</h3>
            <span style="font-size: 12px; color: #94a3b8;">Hôm nay, 9 phút trước</span>
          </div>
        </div>
        <p style="font-size: 15px; color: #475569; line-height: 1.6; margin-bottom: 20px;">
          Chúc mừng bạn nhận được voucher ưu đãi giảm 20% khi đặt hàng nông sản Mít Thái trên hệ thống Nông Thương AgriAgent AI! Voucher có hiệu lực trong vòng 48h.
        </p>
        <a routerLink="/buyer-home" class="btn-primary" style="background-color: #88ad37;">Dùng ngay</a>
      </div>
    </div>
  `
})
export class NotificationDetailComponent {}
