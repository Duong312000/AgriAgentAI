import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-payment-success',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="app-header green">
      <a routerLink="/buyer-home" class="btn-back"><i class="fa-solid fa-chevron-left"></i></a>
      <h2 class="header-title" style="font-size: 17px;">{{paymentMethod === 'qr' ? 'Thanh Toán QR Chuyển Khoản' : 'Xác Nhận Đặt Hàng'}}</h2>
    </div>

    <div style="padding: 24px 16px; flex: 1; text-align: center;">
      <div *ngIf="paymentMethod === 'qr'" class="card" style="border-radius: 24px; padding: 24px; border: 1px solid #e2e8f0; margin-bottom: 24px;">
        <div style="font-size: 15px; font-weight: 800; color: #1e293b; margin-bottom: 16px;">Quét mã QR để hoàn tất thanh toán</div>
        <div style="width: 180px; height: 180px; margin: 0 auto 16px; border: 4px solid #1e293b; padding: 10px; border-radius: 16px; background: #fff; display: flex; align-items: center; justify-content: center;">
          <i class="fa-solid fa-qrcode" style="font-size: 140px; color: #1e293b;"></i>
        </div>
        <div style="font-size: 24px; font-weight: 800; color: #2d4612; margin-bottom: 4px;">{{amount.toLocaleString('vi-VN')}} đ</div>
        <div style="font-size: 12px; color: #64748b;">Đơn hàng đã ghi nhận. Vui lòng xác nhận thanh toán với người bán.</div>
      </div>

      <div *ngIf="paymentMethod === 'cod'" class="card" style="border-radius: 20px; padding: 24px; margin-bottom: 24px;">
        <i class="fa-solid fa-money-bill-wave" style="font-size: 48px; color: #769f2e; margin-bottom: 12px;"></i>
        <div style="font-size: 18px; font-weight: 800; color: #2d4612;">Đặt hàng thành công</div>
        <div style="font-size: 14px; color: #64748b; margin-top: 8px;">Bạn sẽ thanh toán {{amount.toLocaleString('vi-VN')}} đ bằng tiền mặt khi nhận hàng.</div>
      </div>

      <div *ngIf="paymentMethod === 'qr'" style="font-size: 15px; font-weight: 700; color: #16a34a; margin-bottom: 20px;">Đã ghi nhận yêu cầu thanh toán QR</div>

      <a routerLink="/buyer-home" class="btn-primary" style="background-color: #8db837; margin-bottom: 12px;">
        <i class="fa-solid fa-check"></i> Quay về trang chủ
      </a>
    </div>
  `
})
export class PaymentSuccessComponent implements OnInit {
  private route = inject(ActivatedRoute);
  paymentMethod: 'qr' | 'cod' = 'qr';
  amount = 0;

  ngOnInit(): void {
    this.route.queryParamMap.subscribe(params => {
      this.paymentMethod = params.get('method') === 'cod' ? 'cod' : 'qr';
      const amount = Number(params.get('amount'));
      if (Number.isFinite(amount) && amount >= 0) {
        this.amount = amount;
      }
    });
  }
}
