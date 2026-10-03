import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-reset-success',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div style="padding: 24px; background-color: #ffffff; min-height: 100vh; display: flex; flex-direction: column; position: relative; box-sizing: border-box;">
      <h2 style="font-size: 26px; font-weight: 800; color: #587820; text-align: center; margin-top: 40px; margin-bottom: 12px;">Đặt lại mật khẩu mới</h2>
      <p style="font-size: 14px; color: #64748b; text-align: center; line-height: 1.5; margin-bottom: 32px; padding: 0 10px;">
        Hãy nhập mật khẩu mới của bạn vào bên dưới và xem gợi ý khi thiết lập mật khẩu.
      </p>

      <div style="margin-bottom: 20px;">
        <label style="display: block; font-size: 14px; font-weight: 700; color: #475569; margin-bottom: 8px;">Nhập mật khẩu mới</label>
        <div style="position: relative;">
          <input [type]="showP1 ? 'text' : 'password'" id="pass1_py" placeholder="Nhập mật khẩu mới" style="width: 100%; height: 48px; border-radius: 12px; border: 1px solid #cbd5e1; padding-left: 16px; padding-right: 48px; font-size: 15px; color: #1e293b; outline: none; box-sizing: border-box;">
          <i (click)="showP1 = !showP1" [class]="showP1 ? 'fa-regular fa-eye' : 'fa-regular fa-eye-slash'" style="position: absolute; right: 16px; top: 50%; transform: translateY(-50%); color: #64748b; font-size: 18px; cursor: pointer;"></i>
        </div>
      </div>

      <div style="margin-bottom: 20px;">
        <label style="display: block; font-size: 14px; font-weight: 700; color: #475569; margin-bottom: 8px;">Xác nhận lại mật khẩu</label>
        <div style="position: relative;">
          <input [type]="showP2 ? 'text' : 'password'" id="pass2_py" placeholder="Nhập lại mật khẩu mới" style="width: 100%; height: 48px; border-radius: 12px; border: 1px solid #cbd5e1; padding-left: 16px; padding-right: 48px; font-size: 15px; color: #1e293b; outline: none; box-sizing: border-box;">
          <i (click)="showP2 = !showP2" [class]="showP2 ? 'fa-regular fa-eye' : 'fa-regular fa-eye-slash'" style="position: absolute; right: 16px; top: 50%; transform: translateY(-50%); color: #64748b; font-size: 18px; cursor: pointer;"></i>
        </div>
      </div>

      <button (click)="showSuccessModal = true" style="width: 100%; height: 50px; background-color: #88ad37; color: #ffffff; font-size: 17px; font-weight: 800; border-radius: 25px; border: none; cursor: pointer; margin-top: 16px; box-shadow: 0 4px 14px rgba(136,173,55,0.35);">Đổi mật khẩu</button>

      <!-- Overlay Popup Thông báo thành công -->
      <div *ngIf="showSuccessModal" id="successModalPy" style="position: fixed; top: 0; left: 0; right: 0; bottom: 0; background-color: rgba(30, 41, 59, 0.65); display: flex; align-items: flex-end; justify-content: center; z-index: 999;">
        <div style="background-color: #ffffff; border-top-left-radius: 30px; border-top-right-radius: 30px; width: 100%; max-width: 450px; padding: 36px 24px 45px 24px; text-align: center; box-sizing: border-box;">
          <div style="width: 90px; height: 90px; background-color: #22c55e; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 20px auto; box-shadow: 0 8px 20px rgba(34,197,94,0.3);">
            <i class="fa-solid fa-check" style="font-size: 44px; color: #ffffff;"></i>
          </div>
          <h3 style="font-size: 22px; font-weight: 800; color: #587820; margin-top: 0; margin-bottom: 8px;">Đặt lại mật khẩu thành công</h3>
          <p style="font-size: 14px; color: #64748b; margin-top: 0; margin-bottom: 28px;">Quay lại trang đăng nhập để đăng nhập lại</p>
          <a routerLink="/login" style="display: flex; align-items: center; justify-content: center; background-color: #88ad37; color: #ffffff; font-size: 16px; font-weight: 700; height: 48px; border-radius: 12px; text-decoration: none; width: 80%; margin: 0 auto; box-shadow: 0 4px 12px rgba(136,173,55,0.3);">
            Trở về trang đăng nhập
          </a>
        </div>
      </div>
    </div>
  `
})
export class ResetSuccessComponent {
  showP1 = false;
  showP2 = false;
  showSuccessModal = false;
}

