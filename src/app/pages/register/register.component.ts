import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  template: `
    <div style="padding: 20px 20px 30px 20px; background-color: #f8f8f8; min-height: 100vh; display: flex; flex-direction: column; position: relative; box-sizing: border-box; overflow: hidden;">
      <img src="assets/image/logo.png" alt="Nông Thương Logo" style="position: absolute; top: 16px; left: 16px; height: 42px; width: auto; z-index: 2;">
      <img src="assets/image/bia.jpg" alt="Hoa văn bìa" style="position: absolute; top: 0; right: 0; width: 160px; height: auto; z-index: 1; pointer-events: none;">

      <div style="text-align: center; margin-top: 45px; margin-bottom: 18px; z-index: 2;">
        <h2 style="font-size: 30px; font-weight: 800; color: #769f2e; margin-bottom: 4px;">Đăng ký</h2>
        <p style="font-size: 14px; color: #555555; margin: 0;">Đăng ký tài khoản để bắt đầu hành trình của bạn</p>
      </div>

      <!-- Error alert banner -->
      <div *ngIf="errorMessage" style="background-color: #fee2e2; border: 1px solid #f87171; color: #991b1b; padding: 10px 14px; border-radius: 12px; font-size: 13px; font-weight: 600; margin-bottom: 14px; z-index: 2;">
        ⚠️ {{errorMessage}}
      </div>

      <form (ngSubmit)="handleRegister()" style="z-index: 2;">
        <div style="border: 1.5px solid #b8d67c; background-color: #f9faee; border-radius: 20px; padding: 18px 16px; margin-bottom: 16px;">
          <div style="text-align: center; font-size: 16px; font-weight: 700; color: #587820; margin-bottom: 14px;">Vai trò</div>
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-bottom: 18px;">
            <div (click)="selectedRole = 'farmer'" 
                 [style.border]="selectedRole === 'farmer' ? '2.5px solid #769f2e' : '1.5px solid #cbd5e1'"
                 [style.opacity]="selectedRole === 'farmer' ? '1' : '0.65'"
                 [style.boxShadow]="selectedRole === 'farmer' ? '0 4px 12px rgba(118, 159, 46, 0.25)' : 'none'"
                 style="background: #ffffff; border-radius: 16px; padding: 14px 8px; text-align: center; cursor: pointer; transition: all 0.2s ease;">
              <img src="assets/image/4d6db1ad7275923ce24c19acbf3b0ad1.jpg" alt="Người nông dân" style="height: 44px; width: auto; margin-bottom: 6px; object-fit: contain;">
              <div style="font-size: 14px; font-weight: 800; color: #2d4612;">Người nông dân</div>
            </div>
            <div (click)="selectedRole = 'buyer'" 
                 [style.border]="selectedRole === 'buyer' ? '2.5px solid #769f2e' : '1.5px solid #cbd5e1'"
                 [style.opacity]="selectedRole === 'buyer' ? '1' : '0.65'"
                 [style.boxShadow]="selectedRole === 'buyer' ? '0 4px 12px rgba(118, 159, 46, 0.25)' : 'none'"
                 style="background: #ffffff; border-radius: 16px; padding: 14px 8px; text-align: center; cursor: pointer; transition: all 0.2s ease;">
              <img src="assets/image/buyer_icon.png" alt="Người mua hàng" style="height: 44px; width: auto; margin-bottom: 6px; object-fit: contain;">
              <div style="font-size: 14px; font-weight: 800; color: #2d4612;">Người mua hàng</div>
            </div>
          </div>

          <div style="margin-bottom: 12px;">
            <label style="display: block; font-size: 14px; font-weight: 700; color: #587820; margin-bottom: 6px;">Tên (*):</label>
            <input type="text" [(ngModel)]="fullname" name="fullname" style="width: 100%; height: 42px; background: #ffffff; border: 1px solid #d4e3b5; border-radius: 22px; padding: 0 16px; font-size: 14px; outline: none; box-sizing: border-box;" placeholder="Nhập họ và tên">
          </div>
          <div style="margin-bottom: 12px;">
            <label style="display: block; font-size: 14px; font-weight: 700; color: #587820; margin-bottom: 6px;">Tên đăng nhập(*):</label>
            <input type="text" [(ngModel)]="username" name="username" style="width: 100%; height: 42px; background: #ffffff; border: 1px solid #d4e3b5; border-radius: 22px; padding: 0 16px; font-size: 14px; outline: none; box-sizing: border-box;" placeholder="Nhập tên đăng nhập">
          </div>
          <div style="margin-bottom: 12px;">
            <label style="display: block; font-size: 14px; font-weight: 700; color: #587820; margin-bottom: 6px;">Mật khẩu(*):</label>
            <input type="password" [(ngModel)]="password" name="password" style="width: 100%; height: 42px; background: #ffffff; border: 1px solid #d4e3b5; border-radius: 22px; padding: 0 16px; font-size: 14px; outline: none; box-sizing: border-box;" placeholder="Nhập mật khẩu">
          </div>
          <div style="margin-bottom: 0;">
            <label style="display: block; font-size: 14px; font-weight: 700; color: #587820; margin-bottom: 6px;">Nhập lại mật khẩu(*):</label>
            <input type="password" [(ngModel)]="confirmPassword" name="confirmPassword" style="width: 100%; height: 42px; background: #ffffff; border: 1px solid #d4e3b5; border-radius: 22px; padding: 0 16px; font-size: 14px; outline: none; box-sizing: border-box;" placeholder="Nhập lại mật khẩu">
          </div>
        </div>

        <div style="display: flex; gap: 10px; align-items: center; margin-bottom: 18px; padding: 0 4px;">
          <input type="checkbox" id="terms" [(ngModel)]="agreeTerms" name="agreeTerms" style="width: 18px; height: 18px; accent-color: #769f2e; cursor: pointer;">
          <label for="terms" style="font-size: 13px; color: #555555; line-height: 1.35; cursor: pointer;">
            Tôi đồng ý với chính sách và điều khoản của Hệ thống Nông Thương
          </label>
        </div>

        <button type="submit" style="display: flex; width: 100%; border: none; cursor: pointer; align-items: center; justify-content: center; background-color: #88ad37; color: #ffffff; font-size: 18px; font-weight: 800; height: 48px; border-radius: 25px; box-shadow: 0 4px 12px rgba(136,173,55,0.3); margin-bottom: 16px;">
          Đăng ký
        </button>
      </form>

      <div style="text-align: center; font-size: 14px; color: #666666; margin-bottom: 16px; z-index: 2;">
        Đã có tài khoản? <a routerLink="/login" style="color: #769f2e; font-weight: 700; text-decoration: none;">Đăng nhập</a>
      </div>

      <div style="text-align: center; position: relative; margin-top: auto; margin-bottom: 14px; z-index: 2;">
        <span style="position: relative; z-index: 2; background-color: #ffffff; padding: 0 12px; font-size: 13px; color: #888888;">hoặc tiếp tục bằng mạng xã hội</span>
      </div>
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px; z-index: 2;">
        <button style="display: flex; align-items: center; justify-content: center; gap: 8px; background: #ffffff; border: 1px solid #e2e8f0; border-radius: 12px; height: 42px; font-size: 14px; font-weight: 600; color: #333333; cursor: pointer;"><i class="fa-brands fa-facebook" style="color: #1877f2; font-size: 18px;"></i> Facebook</button>
        <button style="display: flex; align-items: center; justify-content: center; gap: 8px; background: #ffffff; border: 1px solid #e2e8f0; border-radius: 12px; height: 42px; font-size: 14px; font-weight: 600; color: #333333; cursor: pointer;"><i class="fa-brands fa-google" style="color: #ea4335; font-size: 18px;"></i> Google</button>
      </div>
    </div>
  `
})
export class RegisterComponent {
  private authService = inject(AuthService);
  private router = inject(Router);

  selectedRole: 'farmer' | 'buyer' = 'farmer';
  fullname = '';
  username = '';
  password = '';
  confirmPassword = '';
  agreeTerms = false;
  errorMessage = '';

  handleRegister() {
    this.errorMessage = '';

    if (!this.fullname.trim() || !this.username.trim() || !this.password || !this.confirmPassword) {
      this.errorMessage = 'Vui lòng điền đầy đủ thông tin!';
      return;
    }

    if (this.password !== this.confirmPassword) {
      this.errorMessage = 'Mật khẩu nhập lại không khớp!';
      return;
    }

    if (!this.agreeTerms) {
      this.errorMessage = 'Bạn phải đồng ý với chính sách và điều khoản của Nông Thương để tiếp tục!';
      return;
    }

    const res = this.authService.register({
      fullname: this.fullname.trim(),
      username: this.username.trim(),
      password: this.password,
      role: this.selectedRole
    });

    if (res.success) {
      const target = this.selectedRole === 'farmer' ? '/farmer-home' : '/buyer-home';
      this.router.navigateByUrl(target);
    } else {
      this.errorMessage = res.message;
    }
  }
}
