import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div style="flex: 1; display: flex; flex-direction: column;">
      <div style="height: 240px; position: relative;">
        <img [src]="product.image" style="width: 100%; height: 100%; object-fit: cover;">
        <a routerLink="/buyer-home" style="position: absolute; top: 16px; left: 16px; width: 36px; height: 36px; background: rgba(255,255,255,0.8); border-radius: 50%; display: flex; align-items: center; justify-content: center; color: #1e293b; text-decoration: none;">
          <i class="fa-solid fa-chevron-left"></i>
        </a>
      </div>

      <div style="padding: 16px; flex: 1; background: #f9f8ee; padding-bottom: 80px;">
        <div style="display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 8px;">
          <div style="font-size: 26px; font-weight: 800; color: #769f2e;">{{product.priceText}}</div>
          <span style="background: #eaf3d8; color: #4d7c0f; padding: 4px 10px; border-radius: 12px; font-size: 12px; font-weight: 700;">📦 Còn {{product.stock}}</span>
        </div>

        <h2 style="font-size: 22px; font-weight: 800; color: #1e293b; margin-bottom: 8px;">{{product.name}}</h2>
        <div style="font-size: 13px; color: #64748b; margin-bottom: 16px;"><i class="fa-solid fa-location-dot" style="color: #769f2e;"></i> {{product.location}}</div>

        <div class="card" style="display: flex; justify-content: space-between; align-items: center; border-radius: 16px; margin-bottom: 16px;">
          <div style="display: flex; gap: 12px; align-items: center;">
            <div style="width: 44px; height: 44px; background: #cbd5e1; border-radius: 50%; display: flex; align-items: center; justify-content: center;">
              <i class="fa-solid fa-user-nurse" style="font-size: 22px; color: #475569;"></i>
            </div>
            <div>
              <div style="font-weight: 800; font-size: 14px; color: #1e293b;">{{product.farmer}} <i class="fa-solid fa-circle-check" style="color: #769f2e;"></i></div>
              <div style="font-size: 11px; color: #64748b;">Đã xác minh hộ nông dân</div>
            </div>
          </div>
          <button class="btn-secondary" style="width: auto; padding: 6px 12px; font-size: 12px;">Xem vườn</button>
        </div>

        <div class="card" style="border-radius: 16px; margin-bottom: 20px;">
          <h3 style="font-size: 15px; font-weight: 800; color: #1e293b; margin-bottom: 8px;">Mô tả sản phẩm</h3>
          <p style="font-size: 13px; color: #475569; line-height: 1.6; margin-bottom: 14px;">
            {{product.desc}}
          </p>
          <div style="display: flex; gap: 8px; flex-wrap: wrap;">
            <span *ngFor="let tag of product.tags" style="background: #f1f5f9; padding: 4px 10px; border-radius: 8px; font-size: 11px; font-weight: 700; color: #475569;">{{tag}}</span>
          </div>
        </div>
      </div>

      <div style="background: #ffffff; padding: 12px 16px; border-top: 1px solid #e2e8f0; display: flex; gap: 10px; align-items: center; position: sticky; bottom: 0; z-index: 10;">
        <a routerLink="/chat-list" style="width: 44px; height: 44px; border: 1.5px solid #cbd5e1; border-radius: 12px; display: flex; align-items: center; justify-content: center; color: #475569; text-decoration: none;">
          <i class="fa-regular fa-comment-dots" style="font-size: 20px;"></i>
        </a>
        <a href="tel:0901234567" style="width: 44px; height: 44px; border: 1.5px solid #cbd5e1; border-radius: 12px; display: flex; align-items: center; justify-content: center; color: #475569; text-decoration: none;">
          <i class="fa-solid fa-phone" style="font-size: 18px;"></i>
        </a>
        <a [routerLink]="['/checkout', productId]" class="btn-primary" style="flex: 1; background-color: #2d4612;">
          <i class="fa-solid fa-cart-shopping"></i> Giải cứu ngay
        </a>
      </div>
    </div>
  `
})
export class ProductDetailComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private productService = inject(ProductService);

  productId = 'chom-chom';
  product!: Product;

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.productId = params['id'] || 'chom-chom';
      this.product = this.productService.getProductById(this.productId);
    });
  }
}
