import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-edit-product',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  template: `
    <div class="app-header">
      <a routerLink="/ai-pricing" class="btn-back"><i class="fa-solid fa-chevron-left"></i></a>
      <h2 class="header-title">Đăng bài / chỉnh sửa</h2>
    </div>

    <div style="padding: 16px; flex: 1;">
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-bottom: 20px;">
        <div style="position: relative; height: 130px; border-radius: 16px; overflow: hidden;">
          <img [src]="product?.image || 'assets/image/Trái cây/chom chom ban.jpg'" style="width: 100%; height: 100%; object-fit: cover;">
          <button style="position: absolute; bottom: 8px; left: 8px; background: rgba(255,255,255,0.9); border: none; padding: 4px 10px; border-radius: 12px; font-size: 11px; font-weight: 700; cursor: pointer;">
            <i class="fa-solid fa-image"></i> Thay ảnh
          </button>
        </div>
        <div style="background: #fef08a; border-radius: 16px; display: flex; flex-direction: column; align-items: center; justify-content: center; height: 130px; border: 2px dashed #ca8a04; cursor: pointer;">
          <i class="fa-solid fa-plus" style="font-size: 28px; color: #854d0e;"></i>
          <span style="font-size: 11px; font-weight: 700; color: #854d0e; margin-top: 4px;">Thêm hình ảnh tại đây</span>
        </div>
      </div>

      <div class="form-group">
        <label class="form-label">Tên sản phẩm</label>
        <input type="text" class="form-input" [(ngModel)]="name" placeholder="Nhập tên sản phẩm">
      </div>

      <div class="form-group">
        <label class="form-label">Giá bán (AI gợi ý)</label>
        <div style="position: relative;">
          <input type="text" class="form-input" [(ngModel)]="price" placeholder="Nhập giá bán (đ/kg)">
          <i class="fa-solid fa-pen" style="position: absolute; right: 14px; top: 50%; transform: translateY(-50%); color: #64748b;"></i>
        </div>
      </div>

      <div class="form-group">
        <label class="form-label">Mô tả sản phẩm</label>
        <textarea class="form-input" rows="3" [(ngModel)]="desc" placeholder="Nhập mô tả sản phẩm..."></textarea>
        <div style="text-align: right; font-size: 11px; color: #94a3b8; margin-top: 4px;">{{desc.length}}/200</div>
      </div>

      <div class="form-group">
        <label class="form-label">Địa chỉ</label>
        <input type="text" class="form-input" [(ngModel)]="location" placeholder="Nhập địa chỉ (ấp/xã/tỉnh)...">
      </div>

      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-top: 24px;">
        <a routerLink="/manage-products" class="btn-secondary" style="border-color: #334155;">Lưu nháp</a>
        <a [routerLink]="['/product-detail', productId]" class="btn-primary" style="background-color: #8db837;">Đăng ngay</a>
      </div>
    </div>
  `
})
export class EditProductComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private productService = inject(ProductService);

  productId = 'chom-chom';
  product?: Product;
  name = '';
  price = '';
  desc = '';
  location = '';

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.productId = params['id'] || 'chom-chom';
      this.product = this.productService.getProductById(this.productId);
      if (this.product) {
        this.name = this.product.name;
        this.price = this.product.priceText;
        this.desc = this.product.desc;
        this.location = this.product.location;
      }
    });
  }
}
