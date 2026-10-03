import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div style="padding: 24px; background-color: #ffffff; min-height: 100vh; display: flex; flex-direction: column; box-sizing: border-box;">
      <div style="margin-bottom: 40px;">
        <a routerLink="/login" class="btn-back" style="display: inline-flex; align-items: center; gap: 8px; font-weight: 600; color: #587820; text-decoration: none;"><i class="fa-solid fa-chevron-left"></i> Quay lại</a>
      </div>

      <div style="text-align: center; margin-bottom: 32px;">
        <h2 style="font-size: 28px; font-weight: 800; color: #587820; margin-bottom: 12px;">Quên mật khẩu</h2>
        <p style="font-size: 15px; color: #64748b; line-height: 1.5; padding: 0 10px;">
          Chúng tôi sẽ gửi mã xác thực OTP qua email khôi phục tài khoản của bạn.
        </p>
      </div>

      <div class="form-group" style="margin-bottom: 24px;">
        <label class="form-label" style="display: block; color: #475569; font-weight: 600; margin-bottom: 8px;">Số điện thoại hoặc email khôi phục</label>
        <div style="position: relative;">
          <i class="fa-regular fa-envelope" style="position: absolute; left: 16px; top: 50%; transform: translateY(-50%); color: #769f2e; font-size: 18px;"></i>
          <input type="email" class="form-input" placeholder="Nhập số điện thoại hoặc email khôi phục" style="width: 100%; padding-left: 48px; border: 1px solid #bcd886; height: 50px; border-radius: 14px; outline: none; box-sizing: border-box;">
        </div>
      </div>

      <a routerLink="/enter-otp" class="btn-primary" style="display: flex; align-items: center; justify-content: center; background-color: #8db837; color: #ffffff; height: 52px; font-size: 17px; font-weight: 800; border-radius: 26px; text-decoration: none; box-shadow: 0 4px 14px rgba(136,173,55,0.35);">
        Gửi mã xác thực
      </a>
    </div>
  `
})
export class ForgotPasswordComponent {}

