import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div style="padding: 24px; background-color: #ffffff; min-height: 100vh; display: flex; flex-direction: column;">
      <div style="margin-bottom: 40px;">
        <a routerLink="/login" class="btn-back"><i class="fa-solid fa-chevron-left"></i> Quay lại</a>
      </div>

      <div style="text-align: center; margin-bottom: 32px;">
        <h2 style="font-size: 28px; font-weight: 800; color: #587820; margin-bottom: 12px;">Quên mật khẩu</h2>
        <p style="font-size: 15px; color: #64748b; line-height: 1.5; padding: 0 10px;">
          Chúng tôi sẽ gửi mã xác thực OTP qua email khôi phục tài khoản của bạn.
        </p>
      </div>

      <div class="form-group" style="margin-bottom: 24px;">
        <label class="form-label" style="color: #475569; font-weight: 600;">Số điện thoại hoặc email khôi phục</label>
        <div style="position: relative;">
          <i class="fa-regular fa-envelope" style="position: absolute; left: 16px; top: 50%; transform: translateY(-50%); color: #769f2e; font-size: 18px;"></i>
          <input type="email" class="form-input" placeholder="Nhập số điện thoại hoặc email khôi phục" style="padding-left: 48px; border-color: #bcd886; height: 50px;">
        </div>
      </div>

      <a routerLink="/enter-otp" class="btn-primary" style="background-color: #8db837; height: 52px; font-size: 17px;">
        Gửi mã xác thực
      </a>
    </div>
  `
})
export class ForgotPasswordComponent {}
