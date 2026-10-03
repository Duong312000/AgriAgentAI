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

      <div class="card" style="display: flex; gap: 14px; align-items: flex-start; border-radius: 18px; margin-bottom: 12px;">
        <div style="width: 42px; height: 42px; background: #eaf3d8; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: #769f2e; flex-shrink: 0;">
          <i class="fa-solid fa-bell" style="font-size: 20px;"></i>
        </div>
        <div style="flex: 1;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 4px;">
            <div style="font-weight: 800; font-size: 15px;">voucher mua mít</div>
            <span style="font-size: 12px; color: #94a3b8;">9 phút trước</span>
          </div>
          <div style="font-size: 13px; color: #64748b;">voucher mua mít siu ưu đãi 20%</div>
        </div>
        <span style="width: 20px; height: 20px; background: #769f2e; color: #fff; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 11px; font-weight: 700;">2</span>
      </div>

      <div class="card green-tint" style="display: flex; gap: 14px; align-items: flex-start; border-radius: 18px; margin-bottom: 12px;">
        <div style="width: 42px; height: 42px; background: #fee2e2; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: #ef4444; flex-shrink: 0;">
          <i class="fa-solid fa-bell-concierge" style="font-size: 20px;"></i>
        </div>
        <div style="flex: 1;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 4px;">
            <div style="font-weight: 800; font-size: 15px;">vourcher mua chuỗi sắp hết hạn</div>
            <span style="font-size: 12px; color: #94a3b8;">9 phút trước</span>
          </div>
          <div style="font-size: 13px; color: #64748b;">vocher mua chúi 20% sắp hết hạn, đừng bỏ lỡ nhé</div>
        </div>
        <span style="width: 20px; height: 20px; background: #769f2e; color: #fff; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 11px; font-weight: 700;">2</span>
      </div>

      <a routerLink="/order-tracking" class="card" style="display: flex; gap: 14px; align-items: flex-start; border-radius: 18px; margin-bottom: 16px; text-decoration: none; color: inherit;">
        <div style="width: 42px; height: 42px; background: #fce7f3; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: #ec4899; flex-shrink: 0;">
          <i class="fa-solid fa-box" style="font-size: 20px;"></i>
        </div>
        <div style="flex: 1;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 4px;">
            <div style="font-weight: 800; font-size: 15px;">Đơn hàng đang vận chuyển</div>
            <span style="font-size: 12px; color: #94a3b8;">9 phút trước</span>
          </div>
          <div style="font-size: 13px; color: #64748b;">đơn hàng sầu riêng đang được vận chuyển, ráng chờ xíu nhé</div>
        </div>
        <span style="width: 20px; height: 20px; background: #769f2e; color: #fff; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 11px; font-weight: 700;">2</span>
      </a>

      <div style="font-size: 15px; font-weight: 800; color: #1e293b; margin-bottom: 12px;">Hôm qua</div>

      <div class="card" style="display: flex; gap: 14px; align-items: flex-start; border-radius: 18px; margin-bottom: 12px;">
        <div style="width: 42px; height: 42px; background: #e0f2fe; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: #0284c7; flex-shrink: 0;">
          <i class="fa-solid fa-cube" style="font-size: 20px;"></i>
        </div>
        <div style="flex: 1;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 4px;">
            <div style="font-weight: 800; font-size: 15px;">Đơn hàng giao thành công</div>
            <span style="font-size: 12px; color: #94a3b8;">12:53 sáng</span>
          </div>
          <div style="font-size: 13px; color: #64748b;">Hãy để lại đánh giá nhé</div>
        </div>
        <span style="width: 20px; height: 20px; background: #769f2e; color: #fff; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 11px; font-weight: 700;">2</span>
      </div>
    </div>
  `
})
export class NotificationListComponent {}
