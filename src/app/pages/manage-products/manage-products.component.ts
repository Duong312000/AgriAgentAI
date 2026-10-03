import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-manage-products',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="app-header">
      <a routerLink="/farmer-home" class="btn-back"><i class="fa-solid fa-chevron-left"></i></a>
      <h2 class="header-title">Quản lý nông sản</h2>
    </div>

    <div style="padding: 16px; flex: 1; padding-bottom: 90px;">
      <div *ngFor="let p of products" class="card green-tint" style="display: flex; gap: 14px; align-items: center; border-radius: 18px; padding: 16px; margin-bottom: 14px;">
        <img [src]="p.image" [alt]="p.name" style="width: 80px; height: 80px; border-radius: 50%; object-fit: cover;">
        <div style="flex: 1;">
          <div style="font-weight: 800; font-size: 16px; color: #1e293b;">{{p.name}}</div>
          <div style="font-weight: 800; font-size: 14px; color: #4d7c0f; margin: 2px 0;">{{p.priceText}}</div>
          <div style="font-size: 12px; color: #64748b; margin-bottom: 8px;">{{p.location}}</div>
          <a [routerLink]="['/edit-product', p.id]" class="btn-primary" style="background-color: #8db837; width: auto; font-size: 12px; padding: 6px 16px; display: inline-flex;">
            Chỉnh sửa
          </a>
        </div>
      </div>
    </div>
  `
})
export class ManageProductsComponent {
  private productService = inject(ProductService);
  products: Product[] = this.productService.getAllProducts();
}
