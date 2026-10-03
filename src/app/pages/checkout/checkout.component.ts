import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  template: `
    <div class="app-header green">
      <a [routerLink]="['/product-detail', productId]" class="btn-back"><i class="fa-solid fa-chevron-left"></i></a>
      <h2 class="header-title" style="font-size: 17px;">Xác Nhận Đặt Mua Nông Sản</h2>
    </div>

    <form class="checkout-content" (ngSubmit)="submitOrder()">
      <div class="card green-tint product-summary">
        <img [src]="product.image" [alt]="product.name">
        <div>
          <div class="product-name">{{product.name}}</div>
          <div class="product-price">{{product.priceText}}</div>
          <div class="product-location">{{product.location}}</div>
        </div>
      </div>

      <section>
        <h3>Thông tin người nhận</h3>
        <label class="field-label">
          Họ và tên
          <input type="text" class="form-input" name="recipientName" [(ngModel)]="recipientName" autocomplete="name" required placeholder="Nhập họ và tên người nhận">
        </label>
        <label class="field-label">
          Số điện thoại
          <input type="tel" class="form-input" name="recipientPhone" [(ngModel)]="recipientPhone" autocomplete="tel" inputmode="tel" required placeholder="Nhập số điện thoại người nhận">
        </label>

        <details class="address-picker">
          <summary>
            <span><i class="fa-solid fa-location-dot"></i> Chọn tỉnh/thành và xã/phường</span>
            <i class="fa-solid fa-chevron-down picker-chevron"></i>
          </summary>
          <div class="address-fields">
            <label class="field-label">
              Tỉnh / Thành phố
              <select class="form-input" name="province" [(ngModel)]="province" required>
                <option value="" disabled>Chọn tỉnh / thành phố</option>
                <option *ngFor="let item of provinces" [value]="item">{{item}}</option>
              </select>
            </label>
            <label class="field-label">
              Xã / Phường
              <input class="form-input" name="commune" [(ngModel)]="commune" list="commune-suggestions" required placeholder="Chọn hoặc nhập xã / phường">
              <datalist id="commune-suggestions">
                <option *ngFor="let item of communeSuggestions" [value]="item"></option>
              </datalist>
            </label>
          </div>
        </details>
        <label class="field-label">
          Địa chỉ cụ thể
          <input type="text" class="form-input" name="streetAddress" [(ngModel)]="streetAddress" autocomplete="street-address" required placeholder="Số nhà, tên đường, thôn/ấp">
        </label>
      </section>

      <section>
        <label class="field-label">
          Số lượng đặt mua (kg)
          <input type="number" class="form-input" name="quantity" [(ngModel)]="quantity" (input)="updateTotals()" min="1" step="1" required placeholder="Nhập số lượng (kg)">
        </label>
      </section>

      <section>
        <h3><i class="fa-solid fa-truck"></i> Hình thức vận chuyển</h3>
        <label class="choice-card" [class.selected]="shippingMethod === 'group'">
          <input type="radio" name="shippingMethod" [(ngModel)]="shippingMethod" value="group" (change)="updateTotals()">
          <span class="choice-copy">
            <strong>Tham gia gom đơn</strong>
            <small>Giảm 50% phí vận chuyển · Dự kiến giao 2–3 ngày</small>
          </span>
        </label>
        <label class="choice-card" [class.selected]="shippingMethod === 'private'">
          <input type="radio" name="shippingMethod" [(ngModel)]="shippingMethod" value="private" (change)="updateTotals()">
          <span class="choice-copy">
            <strong>Giao riêng</strong>
            <small>Giao riêng theo yêu cầu · Dự kiến hôm nay hoặc ngày mai</small>
          </span>
        </label>
      </section>

      <section>
        <h3>Phương thức thanh toán</h3>
        <div class="payment-choices">
          <label class="choice-card payment-card" [class.selected]="paymentMethod === 'qr'">
            <input type="radio" name="paymentMethod" [(ngModel)]="paymentMethod" value="qr">
            <i class="fa-solid fa-qrcode"></i>
            <span>Chuyển khoản QR</span>
          </label>
          <label class="choice-card payment-card" [class.selected]="paymentMethod === 'cod'">
            <input type="radio" name="paymentMethod" [(ngModel)]="paymentMethod" value="cod">
            <i class="fa-solid fa-money-bill"></i>
            <span>Tiền mặt (COD)</span>
          </label>
        </div>
        <p class="payment-note" *ngIf="paymentMethod === 'qr'">Sau khi đặt hàng, bạn sẽ được chuyển đến bước hướng dẫn thanh toán QR.</p>
        <p class="payment-note" *ngIf="paymentMethod === 'cod'">Thanh toán tiền mặt khi nhận hàng.</p>
      </section>

      <section class="totals">
        <div><span>Tiền hàng:</span><strong>{{subtotal.toLocaleString('vi-VN')}} đ</strong></div>
        <div><span>Phí vận chuyển:</span><strong>{{shipFee.toLocaleString('vi-VN')}} đ</strong></div>
        <div class="grand-total"><span>Tổng thanh toán:</span><strong>{{grandTotal.toLocaleString('vi-VN')}} đ</strong></div>
      </section>

      <p *ngIf="validationMessage" role="alert" class="validation-message">{{validationMessage}}</p>
      <button type="submit" class="btn-primary confirm-button">
        <i class="fa-solid fa-check"></i> Xác Nhận Đặt Hàng
      </button>
    </form>
  `,
  styles: [`
    .checkout-content {
      flex: 1;
      padding: 16px 16px 28px;
    }

    .product-summary {
      display: flex;
      align-items: center;
      gap: 12px;
      margin-bottom: 20px;
      border-radius: 16px;
    }

    .product-summary img {
      width: 70px;
      height: 70px;
      flex: 0 0 70px;
      border-radius: 12px;
      object-fit: cover;
    }

    .product-name {
      font-size: 15px;
      font-weight: 800;
    }

    .product-price {
      color: #4d7c0f;
      font-size: 14px;
      font-weight: 800;
    }

    .product-location {
      color: #64748b;
      font-size: 11px;
    }

    section {
      margin-bottom: 20px;
    }

    section h3 {
      margin: 0 0 10px;
      color: #1e293b;
      font-size: 14px;
      font-weight: 800;
    }

    .field-label {
      display: block;
      margin-bottom: 12px;
      color: #475569;
      font-size: 13px;
      font-weight: 700;
    }

    .field-label .form-input {
      display: block;
      margin-top: 5px;
      font-weight: 400;
    }

    .address-picker {
      margin: 0 0 12px;
      overflow: hidden;
      border: 1px solid #dce5d0;
      border-radius: 12px;
      background: #fff;
    }

    .address-picker summary {
      display: flex;
      min-height: 46px;
      align-items: center;
      justify-content: space-between;
      padding: 0 14px;
      color: #38551a;
      cursor: pointer;
      font-size: 13px;
      font-weight: 700;
      list-style: none;
    }

    .address-picker summary::-webkit-details-marker {
      display: none;
    }

    .picker-chevron {
      transition: transform 0.2s ease;
    }

    .address-picker[open] .picker-chevron {
      transform: rotate(180deg);
    }

    .address-fields {
      padding: 12px 12px 0;
      border-top: 1px solid #e2e8f0;
    }

    .choice-card {
      display: flex;
      min-height: 64px;
      align-items: center;
      gap: 10px;
      padding: 11px 12px;
      margin-bottom: 9px;
      border: 1px solid #e2e8f0;
      border-radius: 14px;
      background: #fff;
      cursor: pointer;
    }

    .choice-card.selected {
      border: 2px solid #769f2e;
      background: #f4f8ec;
    }

    .choice-card input {
      width: 18px;
      height: 18px;
      flex: 0 0 18px;
      accent-color: #769f2e;
    }

    .choice-copy {
      display: flex;
      flex-direction: column;
      gap: 3px;
    }

    .choice-copy strong {
      color: #2d4612;
      font-size: 14px;
    }

    .choice-copy small {
      color: #64748b;
      font-size: 11px;
      font-weight: 400;
    }

    .payment-choices {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 9px;
    }

    .payment-card {
      min-height: 88px;
      flex-direction: column;
      justify-content: center;
      gap: 6px;
      padding: 9px;
      color: #475569;
      font-size: 12px;
      font-weight: 700;
      text-align: center;
    }

    .payment-card i {
      color: #769f2e;
      font-size: 21px;
    }

    .payment-note {
      margin: 2px 0 0;
      color: #64748b;
      font-size: 12px;
    }

    .totals {
      padding-top: 14px;
      border-top: 1px solid #e2e8f0;
    }

    .totals div {
      display: flex;
      justify-content: space-between;
      gap: 12px;
      margin-bottom: 8px;
      color: #64748b;
      font-size: 14px;
    }

    .totals strong {
      color: #334155;
    }

    .totals .grand-total {
      margin-top: 12px;
      color: #1e293b;
      font-size: 16px;
      font-weight: 800;
    }

    .totals .grand-total strong {
      color: #2d4612;
    }

    .validation-message {
      color: #b91c1c;
      font-size: 13px;
    }

    .confirm-button {
      width: 100%;
      border: 0;
      background-color: #8db837;
      font-size: 17px;
      cursor: pointer;
    }
  `]
})
export class CheckoutComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private productService = inject(ProductService);

  productId = 'chom-chom';
  product!: Product;
  quantity = 10;
  shippingMethod: 'group' | 'private' = 'group';
  paymentMethod: 'qr' | 'cod' = 'qr';
  recipientName = '';
  recipientPhone = '';
  province = '';
  commune = '';
  streetAddress = '';
  validationMessage = '';
  shipFee = 7500;
  subtotal = 0;
  grandTotal = 0;

  provinces = [
    'An Giang', 'Bắc Ninh', 'Cà Mau', 'Cao Bằng', 'Đắk Lắk', 'Điện Biên',
    'Đồng Nai', 'Đồng Tháp', 'Gia Lai', 'Hà Nội', 'Hà Tĩnh', 'Hải Phòng',
    'Hưng Yên', 'Khánh Hòa', 'Lai Châu', 'Lâm Đồng', 'Lạng Sơn', 'Lào Cai',
    'Nghệ An', 'Ninh Bình', 'Phú Thọ', 'Quảng Ngãi', 'Quảng Ninh', 'Quảng Trị',
    'Sơn La', 'Tây Ninh', 'Thái Nguyên', 'Thanh Hóa', 'Thành phố Cần Thơ',
    'Thành phố Đà Nẵng', 'Thành phố Huế', 'Thành phố Hồ Chí Minh',
    'Tuyên Quang', 'Vĩnh Long'
  ];

  communeSuggestions = [
    'Chợ Gạo', 'Cai Lậy', 'Cần Đước', 'Châu Thành', 'Cao Lãnh', 'Vĩnh Kim',
    'Lục Ngạn', 'Phường trung tâm', 'Xã khác'
  ];

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.productId = params['id'] || 'chom-chom';
      this.product = this.productService.getProductById(this.productId);
      this.updateTotals();
    });
  }

  updateTotals(): void {
    const qty = Math.max(1, Number(this.quantity) || 1);
    this.subtotal = qty * this.product.priceNum;
    this.shipFee = this.shippingMethod === 'group' ? 7500 : 15000;
    this.grandTotal = this.subtotal + this.shipFee;
  }

  submitOrder(): void {
    this.validationMessage = '';
    if (!this.recipientName.trim() || !this.recipientPhone.trim() ||
        !this.province || !this.commune.trim() || !this.streetAddress.trim()) {
      this.validationMessage = 'Vui lòng điền đầy đủ thông tin nhận hàng và địa chỉ.';
      return;
    }
    if (!Number.isFinite(Number(this.quantity)) || Number(this.quantity) < 1) {
      this.validationMessage = 'Số lượng đặt mua phải từ 1 kg trở lên.';
      return;
    }

    void this.router.navigate(['/payment-success'], {
      queryParams: {
        method: this.paymentMethod,
        amount: this.grandTotal
      }
    });
  }
}
