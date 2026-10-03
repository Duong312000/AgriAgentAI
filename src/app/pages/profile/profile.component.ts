import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div style="padding: 24px 20px 20px 20px; flex: 1; padding-bottom: 90px; color: rgba(0, 0, 0, 0.7);">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px; padding-bottom: 16px; border-bottom: 1px solid rgba(0, 0, 0, 0.7);">
        <div>
          <h2 style="font-size: 24px; font-weight: 800; color: rgba(0, 0, 0, 0.7);">{{user.fullname || user.name}}</h2>
        </div>
        <div style="width: 54px; height: 54px; background: rgba(0, 0, 0, 0.7); border-radius: 50%; display: flex; align-items: center; justify-content: center; color: #ffffff;">
          <i class="fa-solid fa-user" style="font-size: 28px; color: #ffffff;"></i>
        </div>
      </div>

      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px;">
        <span style="font-size: 16px; font-weight: 700; color: rgba(0, 0, 0, 0.7);"><i class="fa-regular fa-rectangle-list" style="margin-right: 8px; color: rgba(0, 0, 0, 0.7);"></i> Quản lý đơn hàng</span>
        <i class="fa-solid fa-chevron-right" style="color: rgba(0, 0, 0, 0.7);"></i>
      </div>

      <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; margin-bottom: 30px;">
        <a routerLink="/order-confirm-list" style="border: 1.5px solid rgba(0, 0, 0, 0.7); border-radius: 5%; padding: 14px 8px; text-align: center; text-decoration: none;">
          <i class="fa-solid fa-bag-shopping" style="font-size: 24px; color: rgba(0, 0, 0, 0.7); margin-bottom: 8px;"></i>
          <div style="font-size: 12px; font-weight: 700; color: rgba(0, 0, 0, 0.7); line-height: 1.3;">Xác nhận đơn hàng</div>
        </a>
        <a routerLink="/order-tracking" style="border: 1.5px solid rgba(0, 0, 0, 0.7); border-radius: 5%; padding: 14px 8px; text-align: center; text-decoration: none;">
          <i class="fa-solid fa-truck" style="font-size: 24px; color: rgba(0, 0, 0, 0.7); margin-bottom: 8px;"></i>
          <div style="font-size: 12px; font-weight: 700; color: rgba(0, 0, 0, 0.7); line-height: 1.3;">Theo dõi đơn hàng</div>
        </a>
        <a routerLink="/my-vouchers" style="border: 1.5px solid rgba(0, 0, 0, 0.7); border-radius: 5%; padding: 14px 8px; text-align: center; text-decoration: none;">
          <i class="fa-solid fa-ticket" style="font-size: 24px; color: rgba(0, 0, 0, 0.7); margin-bottom: 8px;"></i>
          <div style="font-size: 12px; font-weight: 700; color: rgba(0, 0, 0, 0.7); line-height: 1.3;">Khuyến mãi của tôi</div>
        </a>
        <a routerLink="/order-returns" style="border: 1.5px solid rgba(0, 0, 0, 0.7); border-radius: 5%; padding: 14px 8px; text-align: center; text-decoration: none;">
          <i class="fa-solid fa-rotate-left" style="font-size: 24px; color: rgba(0, 0, 0, 0.7); margin-bottom: 8px;"></i>
          <div style="font-size: 12px; font-weight: 700; color: rgba(0, 0, 0, 0.7); line-height: 1.3;">Trả hàng</div>
        </a>
        <a routerLink="/order-completed" style="border: 1.5px solid rgba(0, 0, 0, 0.7); border-radius: 5%; padding: 14px 8px; text-align: center; text-decoration: none;">
          <i class="fa-solid fa-circle-check" style="font-size: 24px; color: rgba(0, 0, 0, 0.7); margin-bottom: 8px;"></i>
          <div style="font-size: 12px; font-weight: 700; color: rgba(0, 0, 0, 0.7); line-height: 1.3;">Đơn đã hoàn thành</div>
        </a>
        <a routerLink="/order-cancelled" style="border: 1.5px solid rgba(0, 0, 0, 0.7); border-radius: 5%; padding: 14px 8px; text-align: center; text-decoration: none;">
          <i class="fa-solid fa-circle-xmark" style="font-size: 24px; color: rgba(0, 0, 0, 0.7); margin-bottom: 8px;"></i>
          <div style="font-size: 12px; font-weight: 700; color: rgba(0, 0, 0, 0.7); line-height: 1.3;">Đơn đã hủy</div>
        </a>
      </div>

      <div style="display: flex; flex-direction: column; gap: 20px;">
        <a routerLink="/edit-profile" style="display: flex; justify-content: space-between; align-items: center; font-weight: 700; color: rgba(0, 0, 0, 0.7); text-decoration: none;">
          <div style="display: flex; align-items: center; gap: 12px;">
            <i class="fa-regular fa-id-card" style="font-size: 20px; color: rgba(0, 0, 0, 0.7);"></i>
            <span style="color: rgba(0, 0, 0, 0.7);">Thông tin cá nhân</span>
          </div>
          <i class="fa-solid fa-chevron-right" style="color: rgba(0, 0, 0, 0.7);"></i>
        </a>

        <a routerLink="/chat-staff" style="display: flex; justify-content: space-between; align-items: center; font-weight: 700; color: rgba(0, 0, 0, 0.7); text-decoration: none;">
          <div style="display: flex; align-items: center; gap: 12px;">
            <i class="fa-regular fa-handshake" style="font-size: 20px; color: rgba(0, 0, 0, 0.7);"></i>
            <span style="color: rgba(0, 0, 0, 0.7);">Hỗ trợ</span>
          </div>
          <i class="fa-solid fa-chevron-right" style="color: rgba(0, 0, 0, 0.7);"></i>
        </a>

        <!-- Keep Red color for account deletion request -->
        <a routerLink="/confirm-delete-account" style="display: flex; align-items: center; gap: 12px; font-weight: 700; color: #dc2626; text-decoration: none;">
          <i class="fa-regular fa-trash-can" style="font-size: 20px; color: #dc2626;"></i>
          <span style="color: #dc2626;">Yêu cầu xóa tài khoản</span>
        </a>

        <a (click)="handleLogout()" style="display: flex; align-items: center; gap: 12px; font-weight: 700; color: rgba(0, 0, 0, 0.7); text-decoration: none; cursor: pointer;">
          <i class="fa-solid fa-arrow-right-from-bracket" style="font-size: 20px; color: rgba(0, 0, 0, 0.7);"></i>
          <span style="color: rgba(0, 0, 0, 0.7);">Đăng xuất</span>
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
