import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { AuthService } from '../../services/auth.service';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-buyer-home',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  template: `
    <div style="background-color: #ffffff; min-height: 100vh; display: flex; flex-direction: column; padding-bottom: 90px; box-sizing: border-box;">
      <div class="app-header" style="justify-content: space-between;">
        <div style="display: flex; align-items: center; gap: 8px;">
          <img src="assets/image/logo.png" style="height: 32px; width: auto;">
          <span style="font-size: 20px; font-weight: 800; color: #587820;">NÔNG THƯƠNG</span>
        </div>
        <div style="display: flex; gap: 10px;">
          <a routerLink="/notifications" style="width: 38px; height: 38px; background: #eaf3d8; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: #587820; text-decoration: none;">
            <i class="fa-regular fa-bell" style="font-size: 18px;"></i>
          </a>
          <div style="width: 38px; height: 38px; background: #eaf3d8; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: #587820; cursor: pointer;">
            <i class="fa-solid fa-sliders" style="font-size: 18px;"></i>
          </div>
        </div>
      </div>

      <div style="padding: 0 16px 20px 16px; flex: 1;">
        <div class="search-box">
          <i class="fa-solid fa-magnifying-glass" style="color: #94a3b8; font-size: 18px;"></i>
          <input type="text" [(ngModel)]="searchQuery" (input)="onSearchChange()" placeholder="Tìm kiếm">
        </div>

        <div class="welcome-banner" style="display: flex; justify-content: space-between; align-items: flex-end; padding-right: 10px;">
          <div>
            <div style="font-size: 18px; color: #2d4612; font-weight: 700;">Chào mừng bạn !</div>
            <div class="tag" style="background-color: #0d9488;">{{currentUser.fullname}}</div>
            <div style="font-size: 14px; color: #475569; font-weight: 600;">Một ngày vui vẻ nhé</div>
          </div>
          <img src="assets/image/Thiết kế chưa có tên-Recovered.png" style="height: 120px; width: auto; object-fit: contain; margin-bottom: -10px;">
        </div>

        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
          <h3 style="font-size: 18px; font-weight: 800; color: #2d4612;">Loại trái cây</h3>
          <a (click)="selectCategory('all')" style="font-size: 14px; font-weight: 700; color: #64748b; cursor: pointer;">Xem tất cả</a>
        </div>
        <div class="categories-horizontal-scroll" style="padding-left: 0; padding-right: 0;">
          <div class="category-pill-card" [class.active]="selectedCategory === 'all'" (click)="selectCategory('all')">
            <span class="category-pill-name" style="font-size: 15px;">🌟 Tất cả</span>
          </div>
          <div *ngFor="let cat of categories" class="category-pill-card" [class.active]="selectedCategory === cat.key" (click)="selectCategory(cat.key)">
            <img [src]="cat.image" [alt]="cat.name" class="category-pill-img">
            <span class="category-pill-name">{{cat.name}}</span>
          </div>
        </div>

        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
          <h3 style="font-size: 16px; font-weight: 800; color: #2d4612;">Danh mục sản phẩm</h3>
          <a (click)="selectCategory('all')" style="font-size: 13px; font-weight: 700; color: #64748b; cursor: pointer;">Xem tất cả</a>
        </div>

        <div class="product-grid">
          <a *ngFor="let p of filteredProducts" [routerLink]="['/product-detail', p.id]" class="product-card">
            <i class="fa-regular fa-heart" style="position: absolute; top: 10px; right: 10px; color: #ef4444; font-size: 16px;"></i>
            <img [src]="p.image" [alt]="p.name">
            <div class="name">{{p.name}}</div>
            <div style="font-size: 12px; color: #f59e0b; margin: 2px 0;"><i class="fa-solid fa-star"></i> 4.8 (120)</div>
            <div class="price">{{p.priceText}}</div>
          </a>
        </div>
      </div>
    </div>
  `
})
export class BuyerHomeComponent {
  private productService = inject(ProductService);
  private authService = inject(AuthService);
  currentUser = this.authService.getCurrentUser();

  selectedCategory = 'all';
  searchQuery = '';
  filteredProducts: Product[] = [];

  categories = [
    { key: 'xoai', name: 'Xoài', image: 'assets/image/Trái cây/xoai.jpg' },
    { key: 'chom-chom', name: 'Chôm chôm', image: 'assets/image/Trái cây/chom chom ban.jpg' },
    { key: 'oi', name: 'Ổi', image: 'assets/image/Trái cây/oi.jpg' },
    { key: 'dua-hau', name: 'Dưa hấu', image: 'assets/image/Trái cây/dua hau.jpg' },
    { key: 'sau-rieng', name: 'Sầu riêng', image: 'assets/image/Trái cây/sau rieng.jpg' },
    { key: 'vai', name: 'Vải', image: 'assets/image/Trái cây/vai.jpg' },
    { key: 'thanh-long', name: 'Thanh long', image: 'assets/image/Trái cây/thanh long.jpg' }
  ];

  constructor() {
    this.updateProducts();
  }

  selectCategory(key: string) {
    this.selectedCategory = (this.selectedCategory === key && key !== 'all') ? 'all' : key;
    this.updateProducts();
  }

  onSearchChange() {
    this.updateProducts();
  }

  private updateProducts() {
    this.filteredProducts = this.productService.filterProducts(this.selectedCategory, this.searchQuery);
  }
}
