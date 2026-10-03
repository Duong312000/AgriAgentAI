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
    <div style="padding: 20px 20px 30px 20px; background-color: #ffffff; min-height: 100vh; display: flex; flex-direction: column; position: relative; box-sizing: border-box; overflow-x: hidden; overflow-y: auto;">
      <img src="https://res.cloudinary.com/zdavpzw2/image/upload/v1791068883/agriagent_ai/logo.png" alt="Nông Thương Logo" style="position: absolute; top: 16px; left: 16px; height: 42px; width: auto; z-index: 2;">
      <img src="https://res.cloudinary.com/zdavpzw2/image/upload/v1791068877/agriagent_ai/bia.jpg" alt="Hoa văn bìa" style="position: absolute; top: 0; right: 0; width: 160px; height: auto; z-index: 1; pointer-events: none;">

      <div style="text-align: center; margin-top: 45px; margin-bottom: 18px; z-index: 2;">
        <h2 style="font-size: 30px; font-weight: 800; color: #769f2e; margin-bottom: 4px;">Đăng ký</h2>
        <p style="font-size: 14px; color: #555555; margin: 0;">Đăng ký tài khoản để bắt đầu hành trình của bạn</p>
      </div>

      <div style="border: 1.5px solid #b8d67c; background-color: #f9faee; border-radius: 20px; padding: 18px 16px; margin-bottom: 16px; z-index: 2;">
        <div style="text-align: center; font-size: 16px; font-weight: 700; color: #587820; margin-bottom: 14px;">Vai trò</div>
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-bottom: 18px;">
          <div (click)="selectedRole = 'farmer'" 
               [style.border]="selectedRole === 'farmer' ? '2.5px solid #769f2e' : '1.5px solid #cbd5e1'"
               [style.opacity]="selectedRole === 'farmer' ? '1' : '0.65'"
               [style.boxShadow]="selectedRole === 'farmer' ? '0 4px 12px rgba(118, 159, 46, 0.25)' : 'none'"
               style="background: #ffffff; border-radius: 16px; padding: 14px 8px; text-align: center; cursor: pointer; transition: all 0.2s ease;">
            <img src="https://res.cloudinary.com/zdavpzw2/image/upload/v1791068871/agriagent_ai/4d6db1ad7275923ce24c19acbf3b0ad1.jpg" alt="Người nông dân" style="height: 44px; width: auto; margin-bottom: 6px; object-fit: contain;">
            <div style="font-size: 14px; font-weight: 800; color: #2d4612;">Người nông dân</div>
          </div>
          <div (click)="selectedRole = 'buyer'" 
               [style.border]="selectedRole === 'buyer' ? '2.5px solid #769f2e' : '1.5px solid #cbd5e1'"
               [style.opacity]="selectedRole === 'buyer' ? '1' : '0.65'"
               [style.boxShadow]="selectedRole === 'buyer' ? '0 4px 12px rgba(118, 159, 46, 0.25)' : 'none'"
               style="background: #ffffff; border-radius: 16px; padding: 14px 8px; text-align: center; cursor: pointer; transition: all 0.2s ease;">
            <img src="https://res.cloudinary.com/zdavpzw2/image/upload/v1791068885/agriagent_ai/nguoi_mua.jpg" alt="Người mua hàng" style="height: 44px; width: auto; margin-bottom: 6px; object-fit: contain;">
            <div style="font-size: 14px; font-weight: 800; color: #2d4612;">Người mua hàng</div>
          </div>
        </div>

        <div style="margin-bottom: 12px;">
          <label style="display: flex; justify-content: space-between; align-items: center; font-size: 14px; font-weight: 700; color: #587820; margin-bottom: 6px;">
            <span>Tên (*):</span>
            <span style="font-size: 12px; font-weight: 500; color: #64748b; font-style: italic;">Tên của bạn</span>
          </label>
          <input type="text" id="fullname-input" [(ngModel)]="fullname" name="fullname" style="width: 100%; height: 42px; background: #ffffff; border: 1px solid #d4e3b5; border-radius: 22px; padding: 0 16px; font-size: 14px; outline: none; box-sizing: border-box;" placeholder="Nhập họ và tên">
        </div>
        
        <div style="margin-bottom: 12px;">
          <label style="display: flex; justify-content: space-between; align-items: center; font-size: 14px; font-weight: 700; color: #587820; margin-bottom: 6px;">
            <span>Tên đăng nhập(*):</span>
            <span style="font-size: 12px; font-weight: 500; color: #64748b; font-style: italic;">tài khoản dùng để đăng nhập</span>
          </label>
          <input type="text" id="reg-username-input" [(ngModel)]="username" name="username" style="width: 100%; height: 42px; background: #ffffff; border: 1px solid #d4e3b5; border-radius: 22px; padding: 0 16px; font-size: 14px; outline: none; box-sizing: border-box;" placeholder="Nhập tên đăng nhập">
        </div>

        <div style="margin-bottom: 12px;">
          <label for="reg-phone-input" style="display: block; font-size: 14px; font-weight: 700; color: #587820; margin-bottom: 6px;">Số điện thoại(*):</label>
          <input type="tel" id="reg-phone-input" [(ngModel)]="phone" name="phone" inputmode="tel" autocomplete="tel" style="width: 100%; height: 42px; background: #ffffff; border: 1px solid #d4e3b5; border-radius: 22px; padding: 0 16px; font-size: 14px; outline: none; box-sizing: border-box;" placeholder="Nhập số điện thoại">
        </div>
        
        <div style="margin-bottom: 12px;">
          <label style="display: block; font-size: 14px; font-weight: 700; color: #587820; margin-bottom: 6px;">Mật khẩu(*):</label>
          <div style="position: relative;">
            <input [type]="showPassword ? 'text' : 'password'" id="reg-password-input" [(ngModel)]="password" name="password" style="width: 100%; height: 42px; background: #ffffff; border: 1px solid #d4e3b5; border-radius: 22px; padding: 0 48px 0 16px; font-size: 14px; outline: none; box-sizing: border-box; position: relative; z-index: 1;" placeholder="Nhập mật khẩu">
            <i (click)="showPassword = !showPassword" [class]="showPassword ? 'fa-regular fa-eye-slash' : 'fa-regular fa-eye'" style="position: absolute; right: 16px; top: 50%; transform: translateY(-50%); color: #769f2e; font-size: 18px; cursor: pointer; z-index: 10;"></i>
          </div>
        </div>
        
        <div style="margin-bottom: 0;">
          <label style="display: block; font-size: 14px; font-weight: 700; color: #587820; margin-bottom: 6px;">Nhập lại mật khẩu(*):</label>
          <div style="position: relative;">
            <input [type]="showConfirmPassword ? 'text' : 'password'" id="reg-confirm-password" [(ngModel)]="confirmPassword" name="confirmPassword" style="width: 100%; height: 42px; background: #ffffff; border: 1px solid #d4e3b5; border-radius: 22px; padding: 0 48px 0 16px; font-size: 14px; outline: none; box-sizing: border-box; position: relative; z-index: 1;" placeholder="Nhập lại mật khẩu">
            <i (click)="showConfirmPassword = !showConfirmPassword" [class]="showConfirmPassword ? 'fa-regular fa-eye-slash' : 'fa-regular fa-eye'" style="position: absolute; right: 16px; top: 50%; transform: translateY(-50%); color: #769f2e; font-size: 18px; cursor: pointer; z-index: 10;"></i>
          </div>
        </div>
      </div>

      <div style="display: flex; gap: 10px; align-items: center; margin-bottom: 18px; padding: 0 4px; z-index: 2;">
        <input type="checkbox" id="terms" [(ngModel)]="agreeTerms" name="agreeTerms" style="width: 18px; height: 18px; accent-color: #769f2e; cursor: pointer;">
        <label for="terms" style="font-size: 13px; color: #555555; line-height: 1.35; cursor: pointer;">
          Tôi đồng ý với chính sách và điều khoản của Hệ thống của Nông Thương
        </label>
      </div>

      <a id="btn-register" (click)="handleRegister($event)" href="javascript:void(0)" style="display: flex; align-items: center; justify-content: center; background-color: #88ad37; color: #ffffff; font-size: 18px; font-weight: 800; height: 48px; border-radius: 25px; text-decoration: none; box-shadow: 0 4px 12px rgba(136,173,55,0.3); margin-bottom: 16px; z-index: 2; cursor: pointer;">Đăng ký</a>

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
export class RegisterComponent {
  private authService = inject(AuthService);
  private router = inject(Router);

  selectedRole: 'farmer' | 'buyer' = 'farmer';
  fullname = '';
  username = '';
  phone = '';
  password = '';
  confirmPassword = '';
  showPassword = false;
  showConfirmPassword = false;
  agreeTerms = false;

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

  handleRegister(event: Event) {
    event.preventDefault();

    const fullname = this.fullname.trim();
    const username = this.username.trim();
    const phone = this.phone.trim();
    const password = this.password;
    const confirmPassword = this.confirmPassword;

    // 1. Kiểm tra điền đủ thông tin
    if (!fullname || !username || !phone || !password || !confirmPassword) {
      this.showAlert('Vui lòng điền đầy đủ thông tin!');
      return;
    }

    // 2. Kiểm tra mật khẩu khớp
    if (password !== confirmPassword) {
      this.showAlert('Mật khẩu nhập lại không khớp!');
      return;
    }

    // 3. Kiểm tra đã tick vào ô điều khoản chưa
    if (!this.agreeTerms) {
      this.showAlert('Bạn phải đồng ý với chính sách và điều khoản của Nông Thương để tiếp tục!');
      return;
    }

    const res = this.authService.register({
      fullname,
      username,
      phone,
      password,
      role: this.selectedRole
    });

    if (res.success) {
      const nextUrl = this.selectedRole === 'farmer' ? '/farmer-home' : '/buyer-home';
      this.showAlert('Đăng ký thành công!', nextUrl);
    } else {
      this.showAlert(res.message);
    }
  }
}
