import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-payment-failed',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="app-header green">
      <a routerLink="/checkout" class="btn-back"><i class="fa-solid fa-chevron-left"></i></a>
      <h2 class="header-title" style="font-size: 17px;">Thanh Toán QR Chuyển Khoản</h2>
    </div>

    <div style="padding: 24px 16px; flex: 1; text-align: center;">
      <div class="card" style="border-radius: 24px; padding: 24px; border: 1px solid #e2e8f0; margin-bottom: 24px;">
        <div style="font-size: 15px; font-weight: 800; color: #1e293b; margin-bottom: 16px;">Quét mã QR để hoàn tất thanh toán</div>
        <div style="width: 180px; height: 180px; margin: 0 auto 16px; border: 4px solid #1e293b; padding: 10px; border-radius: 16px; background: #fff; display: flex; align-items: center; justify-content: center;">
          <i class="fa-solid fa-qrcode" style="font-size: 140px; color: #dc2626;"></i>
        </div>
        <div style="font-size: 24px; font-weight: 800; color: #2d4612; margin-bottom: 4px;">355.000 đ</div>
        <div style="font-size: 12px; color: #64748b;">Tự động xác nhận sau khi nhận tiền</div>
      </div>

      <div style="font-size: 15px; font-weight: 700; color: #dc2626; margin-bottom: 20px;">Thanh toán không thành công</div>

      <a routerLink="/payment-success" class="btn-secondary" style="margin-bottom: 12px;">Thử lại</a>
      <a routerLink="/buyer-home" class="btn-primary" style="background-color: #8db837;">Quay về trang chủ</a>
    </div>
  `
})
export class PaymentFailedComponent {}
