import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-confirm-otp',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div style="padding: 24px; background-color: #ffffff; min-height: 100vh; display: flex; flex-direction: column; box-sizing: border-box;">
      <div style="margin-bottom: 40px;">
        <a routerLink="/enter-otp" class="btn-back" style="display: inline-flex; align-items: center; gap: 8px; font-weight: 600; color: #587820; text-decoration: none;"><i class="fa-solid fa-chevron-left"></i> Quay lại</a>
      </div>

      <div style="text-align: center; margin-bottom: 32px;">
        <h2 style="font-size: 28px; font-weight: 800; color: #587820; margin-bottom: 12px;">Quên mật khẩu</h2>
        <p style="font-size: 15px; color: #64748b; line-height: 1.5; padding: 0 10px;">
          Chúng tôi đã gửi mã xác thực OTP qua email khôi phục tài khoản của bạn.
        </p>
      </div>

      <div style="margin-bottom: 32px; text-align: center;">
        <label style="display: block; font-size: 15px; font-weight: 700; color: #475569; margin-bottom: 16px;">Nhập mã xác thực:</label>
        <div style="display: flex; justify-content: center; gap: 12px;">
          <input type="text" maxlength="1" value="8" style="width: 54px; height: 58px; text-align: center; font-size: 24px; font-weight: 800; border: 2px solid #769f2e; background-color: #f4f8ec; border-radius: 12px; outline: none;">
          <input type="text" maxlength="1" value="6" style="width: 54px; height: 58px; text-align: center; font-size: 24px; font-weight: 800; border: 2px solid #769f2e; background-color: #f4f8ec; border-radius: 12px; outline: none;">
          <input type="text" maxlength="1" value="2" style="width: 54px; height: 58px; text-align: center; font-size: 24px; font-weight: 800; border: 2px solid #769f2e; background-color: #f4f8ec; border-radius: 12px; outline: none;">
          <input type="text" maxlength="1" value="9" style="width: 54px; height: 58px; text-align: center; font-size: 24px; font-weight: 800; border: 2px solid #769f2e; background-color: #f4f8ec; border-radius: 12px; outline: none;">
        </div>
      </div>

      <a routerLink="/reset-password-success" class="btn-primary" style="display: flex; align-items: center; justify-content: center; background-color: #8db837; color: #ffffff; height: 52px; font-size: 17px; font-weight: 800; border-radius: 26px; text-decoration: none; box-shadow: 0 4px 14px rgba(136,173,55,0.35);">
        Xác nhận
      </a>
    </div>
  `
})
export class ConfirmOtpComponent {}

