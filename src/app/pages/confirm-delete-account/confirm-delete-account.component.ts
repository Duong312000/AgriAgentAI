import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-confirm-delete-account',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div style="padding: 24px; background-color: #64748b; min-height: 100vh; position: relative;">
      <div style="opacity: 0.3;">
        <h2 style="font-size: 24px; color: #ffffff;">Trang cá nhân</h2>
      </div>

      <div class="modal-overlay">
        <div class="modal-card" style="padding: 30px 20px;">
          <h3 style="font-size: 22px; font-weight: 800; color: #1e293b; margin-bottom: 14px;">Xóa tài khoản</h3>
          <p style="font-size: 16px; color: #475569; margin-bottom: 28px;">
            Bạn có chắc chắn muốn xóa tài khoản?
          </p>

          <div style="display: grid; grid-template-columns: 1fr 1fr; border-top: 1px solid #e2e8f0; margin: 0 -20px -30px -20px;">
            <a routerLink="/splash" style="padding: 16px; font-weight: 800; color: #dc2626; border-right: 1px solid #e2e8f0; text-decoration: none; font-size: 16px;">Xóa</a>
            <a routerLink="/profile" style="padding: 16px; font-weight: 800; color: #1e293b; text-decoration: none; font-size: 16px;">Không xóa</a>
          </div>
        </div>
      </div>
    </div>
  `
})
export class ConfirmDeleteAccountComponent {}
