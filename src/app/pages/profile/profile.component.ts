import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div style="padding: 24px 20px 20px 20px; flex: 1; padding-bottom: 90px;">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px; padding-bottom: 16px; border-bottom: 1px solid #e2e8f0;">
        <div>
          <h2 style="font-size: 24px; font-weight: 800; color: #1e293b;">{{user.fullname || user.name}}</h2>
        </div>
        <div style="width: 54px; height: 54px; background: #769f2e; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: #ffffff;">
          <i class="fa-solid fa-user" style="font-size: 28px;"></i>
        </div>
      </div>

      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px;">
        <span style="font-size: 16px; font-weight: 700; color: #1e293b;"><i class="fa-regular fa-rectangle-list" style="margin-right: 8px;"></i> Quản lý đơn hàng</span>
        <i class="fa-solid fa-chevron-right" style="color: #94a3b8;"></i>
      </div>

      <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; margin-bottom: 30px;">
        <div style="border: 1.5px solid #769f2e; border-radius: 16px; padding: 14px 8px; text-align: center;">
          <i class="fa-solid fa-bag-shopping" style="font-size: 24px; color: #769f2e; margin-bottom: 8px;"></i>
          <div style="font-size: 12px; font-weight: 700; color: #1e293b; line-height: 1.3;">Xác nhận đơn hàng</div>
        </div>
        <a routerLink="/order-tracking" style="border: 1.5px solid #769f2e; border-radius: 16px; padding: 14px 8px; text-align: center; text-decoration: none;">
          <i class="fa-solid fa-truck" style="font-size: 24px; color: #769f2e; margin-bottom: 8px;"></i>
          <div style="font-size: 12px; font-weight: 700; color: #1e293b; line-height: 1.3;">Theo dõi đơn hàng</div>
        </a>
        <div style="border: 1.5px solid #769f2e; border-radius: 16px; padding: 14px 8px; text-align: center;">
          <i class="fa-solid fa-ticket" style="font-size: 24px; color: #769f2e; margin-bottom: 8px;"></i>
          <div style="font-size: 12px; font-weight: 700; color: #1e293b; line-height: 1.3;">Khuyến mãi của tôi</div>
        </div>
        <div style="border: 1.5px solid #769f2e; border-radius: 16px; padding: 14px 8px; text-align: center;">
          <i class="fa-solid fa-rotate-left" style="font-size: 24px; color: #769f2e; margin-bottom: 8px;"></i>
          <div style="font-size: 12px; font-weight: 700; color: #1e293b; line-height: 1.3;">Trả hàng</div>
        </div>
        <div style="border: 1.5px solid #769f2e; border-radius: 16px; padding: 14px 8px; text-align: center;">
          <i class="fa-solid fa-circle-check" style="font-size: 24px; color: #769f2e; margin-bottom: 8px;"></i>
          <div style="font-size: 12px; font-weight: 700; color: #1e293b; line-height: 1.3;">Đơn đã hoàn thành</div>
        </div>
        <div style="border: 1.5px solid #769f2e; border-radius: 16px; padding: 14px 8px; text-align: center;">
          <i class="fa-solid fa-circle-xmark" style="font-size: 24px; color: #769f2e; margin-bottom: 8px;"></i>
          <div style="font-size: 12px; font-weight: 700; color: #1e293b; line-height: 1.3;">Đơn đã hủy</div>
        </div>
      </div>

      <div style="display: flex; flex-direction: column; gap: 20px;">
        <a routerLink="/edit-profile" style="display: flex; justify-content: space-between; align-items: center; font-weight: 700; color: #334155; text-decoration: none;">
          <div style="display: flex; align-items: center; gap: 12px;">
            <i class="fa-regular fa-id-card" style="font-size: 20px; color: #769f2e;"></i>
            <span>Thông tin cá nhân</span>
          </div>
          <i class="fa-solid fa-chevron-right" style="color: #94a3b8;"></i>
        </a>

        <a routerLink="/chat-staff" style="display: flex; justify-content: space-between; align-items: center; font-weight: 700; color: #334155; text-decoration: none;">
          <div style="display: flex; align-items: center; gap: 12px;">
            <i class="fa-regular fa-handshake" style="font-size: 20px; color: #769f2e;"></i>
            <span>Hỗ trợ</span>
          </div>
          <i class="fa-solid fa-chevron-right" style="color: #94a3b8;"></i>
        </a>

        <a routerLink="/confirm-delete-account" style="display: flex; align-items: center; gap: 12px; font-weight: 700; color: #dc2626; text-decoration: none;">
          <i class="fa-regular fa-trash-can" style="font-size: 20px;"></i>
          <span>Yêu cầu xóa tài khoản</span>
        </a>

        <a (click)="handleLogout()" style="display: flex; align-items: center; gap: 12px; font-weight: 700; color: #769f2e; text-decoration: none; cursor: pointer;">
          <i class="fa-solid fa-arrow-right-from-bracket" style="font-size: 20px;"></i>
          <span>Đăng xuất</span>
        </a>
      </div>
    </div>
  `
})
export class ProfileComponent {
  private authService = inject(AuthService);
  private router = inject(Router);
  user = this.authService.getCurrentUser();

  handleLogout() {
    this.authService.logout();
    this.router.navigateByUrl('/login');
  }
}
