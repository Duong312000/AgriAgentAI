import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  template: `
    <div style="background-color: #ffffff; min-height: 100vh; display: flex; flex-direction: column; position: relative; box-sizing: border-box;">
      <div style="height: 250px; position: relative; overflow: hidden; background-color: #e2e8f0;">
        <img src="https://res.cloudinary.com/zdavpzw2/image/upload/v1791068884/agriagent_ai/nendangnhap.jpg" alt="Chợ nổi trái cây" style="width: 100%; height: 100%; object-fit: cover; object-position: center;">
        <svg style="position: absolute; bottom: -1px; left: 0; width: 100%; height: 75px; z-index: 2; pointer-events: none;" viewBox="0 0 500 100" preserveAspectRatio="none">
          <path d="M 0,100 L 0,55 C 35,15 110,-5 190,30 C 280,65 390,75 500,70 L 500,100 Z" fill="#ffffff"/>
        </svg>
      </div>

      <div style="padding: 10px 24px 30px 24px; flex: 1; display: flex; flex-direction: column; position: relative; z-index: 3;">
        <div style="display: flex; flex-direction: row; align-items: center; justify-content: center; gap: 0px; margin-top: -25px; margin-bottom: 8px; margin-left: -130px;">
          <img src="https://res.cloudinary.com/zdavpzw2/image/upload/v1791068883/agriagent_ai/logo.png" alt="Logo Nông Thương" style="height: 105px; width: auto; margin-right: -12px;">
          <h2 style="font-size: 34px; font-weight: 800; color: #769f2e; text-align: center; margin: 0;">Đăng nhập</h2>
        </div>
        <p style="font-size: 14px; color: #555555; text-align: center; margin-top: 0; margin-bottom: 24px;">Đăng nhập tài khoản để tiếp tục hành trình của bạn</p>

        <!-- Input Tên đăng nhập -->
        <div style="margin-bottom: 18px;">
          <label style="display: block; font-size: 14px; font-weight: 700; color: #587820; margin-bottom: 8px;">Tên đăng nhập (*):</label>
          <div style="position: relative;">
            <i class="fa-regular fa-user" style="position: absolute; left: 16px; top: 50%; transform: translateY(-50%); color: #769f2e; font-size: 18px;"></i>
            <input type="text" id="login-username-input" [(ngModel)]="username" name="username" placeholder="Nhập tên đăng nhập" style="width: 100%; height: 48px; border-radius: 14px; border: 1px solid #e2e8f0; padding-left: 48px; padding-right: 16px; font-size: 15px; font-weight: 600; color: #2d3748; outline: none; box-sizing: border-box;">
          </div>
        </div>

        <!-- Input Mật khẩu -->
        <div style="margin-bottom: 18px;">
          <label style="display: block; font-size: 14px; font-weight: 700; color: #587820; margin-bottom: 8px;">Mật khẩu:</label>
          <div style="position: relative;">
            <i class="fa-solid fa-lock" style="position: absolute; left: 16px; top: 50%; transform: translateY(-50%); color: #769f2e; font-size: 18px; z-index: 2;"></i>
            <input [type]="showPassword ? 'text' : 'password'" id="login-password-input" [(ngModel)]="password" name="password" placeholder="Nhập mật khẩu" style="width: 100%; height: 48px; border-radius: 14px; border: 1px solid #e2e8f0; padding-left: 48px; padding-right: 48px; font-size: 15px; font-weight: 600; color: #2d3748; outline: none; box-sizing: border-box; position: relative; z-index: 1;">
            <i (click)="showPassword = !showPassword" [class]="showPassword ? 'fa-regular fa-eye-slash' : 'fa-regular fa-eye'" style="position: absolute; right: 16px; top: 50%; transform: translateY(-50%); color: #769f2e; font-size: 18px; cursor: pointer; z-index: 10;"></i>
          </div>
        </div>

        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px;">
          <label style="display: flex; align-items: center; gap: 8px; font-size: 13px; color: #555555; cursor: pointer;">
            <input type="checkbox" [(ngModel)]="rememberMe" name="rememberMe" style="width: 16px; height: 16px; accent-color: #769f2e; cursor: pointer;">
            Ghi nhớ đăng nhập
          </label>
          <a routerLink="/forgot-password" style="font-size: 13px; font-weight: 700; color: #587820; text-decoration: none;">Quên mật khẩu?</a>
        </div>

        <a (click)="handleLogin($event)" href="javascript:void(0)" style="display: flex; align-items: center; justify-content: center; gap: 10px; background-color: #88ad37; color: #ffffff; font-size: 18px; font-weight: 800; height: 50px; border-radius: 25px; text-decoration: none; box-shadow: 0 4px 14px rgba(136,173,55,0.35); margin-bottom: 28px; cursor: pointer;">
          Đăng nhập <i class="fa-solid fa-arrow-right"></i>
        </a>

        <div style="text-align: center; position: relative; margin-bottom: 16px;">
          <div style="position: absolute; top: 50%; left: 0; right: 0; height: 1px; background-color: #e2e8f0; z-index: 1;"></div>
          <span style="position: relative; z-index: 2; background-color: #ffffff; padding: 0 12px; font-size: 13px; color: #888888;">hoặc tiếp tục bằng mạng xã hội</span>
        </div>
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-bottom: 30px;">
          <button style="display: flex; align-items: center; justify-content: center; gap: 8px; background: #ffffff; border: 1px solid #e2e8f0; border-radius: 12px; height: 44px; font-size: 14px; font-weight: 600; color: #333333; cursor: pointer;"><i class="fa-brands fa-facebook" style="color: #1877f2; font-size: 18px;"></i> Facebook</button>
          <button style="display: flex; align-items: center; justify-content: center; gap: 8px; background: #ffffff; border: 1px solid #e2e8f0; border-radius: 12px; height: 44px; font-size: 14px; font-weight: 600; color: #333333; cursor: pointer;"><i class="fa-brands fa-google" style="color: #ea4335; font-size: 18px;"></i> Google</button>
        </div>

        <div style="text-align: center; font-size: 14px; color: #555555; margin-top: auto;">
          Bạn chưa có tài khoản? <a routerLink="/register" style="color: #769f2e; font-weight: 700; text-decoration: none;">Đăng ký ngay</a>
        </div>
      </div>
    </div>

    <!-- Custom Alert Nông Thương Modal Popup -->
    <div *ngIf="showAlertModal" style="position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0, 0, 0, 0.45); backdrop-filter: blur(2px); z-index: 9999; display: flex; align-items: center; justify-content: center; padding: 20px; box-sizing: border-box;">
      <div style="background: #ffffff; border-radius: 20px; width: 320px; max-width: 90%; box-shadow: 0 16px 32px rgba(0,0,0,0.25); text-align: center; overflow: hidden; z-index: 10000; padding-top: 24px;">
        <h3 style="font-size: 19px; font-weight: 800; color: #769f2e; margin: 0 0 12px 0;">Nông Thương</h3>
        <p style="font-size: 15px; color: #334155; margin: 0 20px 24px 20px; line-height: 1.4;">{{alertMessage}}</p>
        <div style="border-top: 1px solid #e2e8f0;">
          <a (click)="closeAlert()" href="javascript:void(0)" style="display: block; padding: 14px; font-size: 16px; font-weight: 700; color: #769f2e; text-decoration: none; background: #f9faee;">OK</a>
        </div>
      </div>
    </div>
  `
})
export class LoginComponent {
  private authService = inject(AuthService);
  private router = inject(Router);

  username = '';
  password = '';
  showPassword = false;
  rememberMe = false;

  showAlertModal = false;
  alertMessage = '';
  redirectUrl: string | null = null;

  showAlert(message: string, redirectUrl: string | null = null) {
    this.alertMessage = message;
    this.redirectUrl = redirectUrl;
    this.showAlertModal = true;
  }

  closeAlert() {
    this.showAlertModal = false;
    if (this.redirectUrl) {
      this.router.navigateByUrl(this.redirectUrl);
    }
  }

  handleLogin(event: Event) {
    event.preventDefault();

    if (!this.username.trim() || !this.password) {
      this.showAlert('Vui lòng nhập tên đăng nhập và mật khẩu!');
      return;
    }

    const res = this.authService.login(this.username.trim(), this.password);
    if (res.success && res.user) {
      const nextUrl = res.user.role === 'farmer' ? '/farmer-home' : '/buyer-home';
      this.router.navigateByUrl(nextUrl);
    } else {
      this.showAlert(res.message);
    }
  }
}

