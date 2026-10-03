import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterModule } from '@angular/router';
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

    <div style="padding: 16px; flex: 1;">
      <div class="card green-tint" style="display: flex; gap: 12px; align-items: center; border-radius: 16px; margin-bottom: 16px;">
        <img [src]="product.image" style="width: 70px; height: 70px; border-radius: 50%; object-fit: cover;">
        <div>
          <div style="font-weight: 800; font-size: 15px;">{{product.name}}</div>
          <div style="font-weight: 800; font-size: 14px; color: #4d7c0f;">{{product.priceText}}</div>
          <div style="font-size: 11px; color: #64748b;">{{product.location}}</div>
        </div>
      </div>

      <div style="font-weight: 800; font-size: 14px; color: #1e293b; margin-bottom: 10px;">Thông tin người nhận</div>
      <div class="form-group"><input type="text" class="form-input" placeholder="Nhập họ và tên người nhận"></div>
      <div class="form-group"><input type="text" class="form-input" placeholder="Nhập số điện thoại người nhận"></div>
      <div class="form-group"><input type="text" class="form-input" placeholder="Nhập địa chỉ giao hàng cụ thể"></div>

      <div class="form-group">
        <label class="form-label">Số lượng đặt mua (kg)</label>
        <input type="number" class="form-input" [(ngModel)]="quantity" (input)="updateTotals()" placeholder="Nhập số lượng (kg)">
      </div>

      <div style="font-weight: 800; font-size: 14px; color: #1e293b; margin-bottom: 10px;"><i class="fa-solid fa-truck"></i> Tùy chọn hình thức vận chuyển</div>
      
      <div style="border: 2px solid #769f2e; background: #f4f8ec; padding: 12px; border-radius: 14px; margin-bottom: 10px;">
        <div style="font-weight: 800; font-size: 14px; color: #2d4612;">● Tham gia gom đơn (Giảm 50% phí ship)</div>
        <div style="font-size: 12px; color: #64748b; margin-top: 2px;">Dự kiến giao: 2 - 3 ngày (Chờ gom đủ tuyến)</div>
      </div>

      <div style="border: 1px solid #e2e8f0; padding: 12px; border-radius: 14px; margin-bottom: 20px;">
        <div style="font-weight: 700; font-size: 14px; color: #475569;">○ Giao riêng lập tức</div>
        <div style="font-size: 12px; color: #64748b; margin-top: 2px;">Dự kiến giao: Trong hôm nay hoặc ngày mai</div>
      </div>

      <div style="font-weight: 800; font-size: 14px; color: #1e293b; margin-bottom: 10px;">Phương thức thanh toán</div>
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-bottom: 20px;">
        <div style="border: 2px solid #769f2e; background: #ffffff; padding: 12px; border-radius: 12px; text-align: center; font-size: 13px; font-weight: 700;">
          <i class="fa-solid fa-qrcode" style="font-size: 20px; display: block; margin-bottom: 4px; color: #769f2e;"></i>
          Chuyển khoản QR
        </div>
        <div style="border: 1px solid #e2e8f0; background: #ffffff; padding: 12px; border-radius: 12px; text-align: center; font-size: 13px; font-weight: 700; color: #64748b;">
          <i class="fa-solid fa-money-bill" style="font-size: 20px; display: block; margin-bottom: 4px;"></i>
          Tiền mặt (COD)
        </div>
      </div>

      <div style="border-top: 1px solid #e2e8f0; padding-top: 14px; margin-bottom: 20px;">
        <div style="display: flex; justify-content: space-between; font-size: 14px; color: #64748b; margin-bottom: 6px;">
          <span>Tiền hàng:</span>
          <span>{{subtotal.toLocaleString('vi-VN')}} đ</span>
        </div>
        <div style="display: flex; justify-content: space-between; font-size: 14px; color: #64748b; margin-bottom: 10px;">
          <span>Phí vận chuyển:</span>
          <span>15.000 đ</span>
        </div>
        <div style="display: flex; justify-content: space-between; font-size: 16px; font-weight: 800; color: #1e293b;">
          <span>Tổng thanh toán:</span>
          <span style="color: #2d4612;">{{grandTotal.toLocaleString('vi-VN')}} đ</span>
        </div>
      </div>

      <a routerLink="/payment-success" class="btn-primary" style="background-color: #8db837; font-size: 17px;">
        <i class="fa-solid fa-check"></i> Xác Nhận Đặt Hàng
      </a>
    </div>
  `
})
export class CheckoutComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private productService = inject(ProductService);

  productId = 'chom-chom';
  product!: Product;
  quantity = 10;
  shipFee = 15000;
  subtotal = 0;
  grandTotal = 0;

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.productId = params['id'] || 'chom-chom';
      this.product = this.productService.getProductById(this.productId);
      this.updateTotals();
    });
  }

  updateTotals() {
    let qty = Number(this.quantity) || 1;
    if (qty < 1) qty = 1;
    this.subtotal = qty * this.product.priceNum;
    this.grandTotal = this.subtotal + this.shipFee;
  }
}
