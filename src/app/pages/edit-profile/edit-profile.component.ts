import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-edit-profile',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  template: `
    <div style="padding: 24px 20px 40px 20px; box-sizing: border-box;">
      <div style="margin-bottom: 20px;">
        <a routerLink="/profile" style="display: inline-flex; align-items: center; gap: 8px; background: #ffffff; border: 1px solid #e2e8f0; border-radius: 20px; padding: 8px 16px; color: #2e4311; font-size: 14px; font-weight: 500; text-decoration: none; box-shadow: 0 1px 3px rgba(0,0,0,0.03);">
          <i class="fa-solid fa-chevron-left" style="font-size: 12px;"></i>
          <span>Quay lại</span>
        </a>
      </div>

      <div style="text-align: center; margin-bottom: 24px;">
        <h2 style="font-size: 20px; font-weight: 700; color: #2e4311; margin: 0 0 8px 0;">Thiết lập hồ sơ cá nhân</h2>
        <p style="font-size: 13px; color: #71717a; margin: 0;">Cập nhật thông tin để nhận hàng thuận tiện hơn.</p>
      </div>

      <div style="text-align: center; margin-bottom: 28px;">
        <div style="position: relative; width: 84px; height: 84px; margin: 0 auto 10px auto;">
          <div style="width: 84px; height: 84px; border-radius: 50%; border: 2px dashed #cbd5e1; background-color: #f1f5f9; display: flex; align-items: center; justify-content: center; box-sizing: border-box;">
            <i class="fa-regular fa-user" style="font-size: 32px; color: #94a3b8;"></i>
          </div>
          <div style="position: absolute; bottom: 2px; right: 2px; width: 24px; height: 24px; background-color: #8c9e37; border-radius: 50%; border: 2px solid #ffffff; display: flex; align-items: center; justify-content: center; color: #ffffff; font-size: 12px; cursor: pointer;">
            <i class="fa-solid fa-plus"></i>
          </div>
        </div>
        <div style="font-size: 13px; font-weight: 500; color: #2e4311;">Tải ảnh đại diện</div>
      </div>

      <div style="display: flex; flex-direction: column; gap: 20px;">
        <div>
          <label style="display: block; font-size: 14px; font-weight: 600; color: #2e4311; margin-bottom: 8px;">
            Họ và tên <span style="color: #dc2626;">*</span>
          </label>
          <input type="text" [(ngModel)]="user.name" placeholder="Nhập họ và tên của bạn" style="width: 100%; background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; padding: 14px 16px; font-size: 15px; color: #262626; outline: none; box-sizing: border-box;">
        </div>

        <div>
          <label style="display: block; font-size: 14px; font-weight: 600; color: #2e4311; margin-bottom: 8px;">
            Số điện thoại <span style="color: #dc2626;">*</span>
          </label>
          <input type="text" [(ngModel)]="user.phone" placeholder="Nhập số điện thoại nhận hàng" style="width: 100%; background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; padding: 14px 16px; font-size: 15px; color: #262626; outline: none; box-sizing: border-box;">
        </div>

        <div>
          <label style="display: block; font-size: 14px; font-weight: 600; color: #2e4311; margin-bottom: 8px;">
            Email (Tùy chọn)
          </label>
          <input type="email" [(ngModel)]="user.email" placeholder="Nhập email" style="width: 100%; background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; padding: 14px 16px; font-size: 15px; color: #262626; outline: none; box-sizing: border-box;">
        </div>

        <div>
          <label style="display: block; font-size: 14px; font-weight: 600; color: #2e4311; margin-bottom: 8px;">
            Địa chỉ giao hàng mặc định
          </label>
          <input type="text" [(ngModel)]="user.address" placeholder="Số nhà, tên đường, phường/xã..." style="width: 100%; background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; padding: 14px 16px; font-size: 15px; color: #262626; outline: none; box-sizing: border-box;">
        </div>
      </div>

      <a (click)="saveProfile()" routerLink="/profile" style="display: block; width: 100%; background-color: #8c9e37; color: #ffffff; text-align: center; padding: 16px 20px; border-radius: 16px; font-size: 17px; font-weight: 600; text-decoration: none; box-sizing: border-box; margin-top: 36px; cursor: pointer;">
        Lưu thông tin
      </a>
    </div>
  `
})
export class EditProfileComponent {
  private authService = inject(AuthService);
  user = { ...this.authService.getUser() };

  saveProfile() {
    this.authService.updateUser(this.user);
  }
}
