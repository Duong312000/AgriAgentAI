import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { AuthService } from '../../services/auth.service';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-farmer-home',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  template: `
    <div style="background-color: #ffffff; min-height: 100vh; display: flex; flex-direction: column; padding-bottom: 90px; box-sizing: border-box;">
      <!-- Header Top -->
      <div style="display: flex; align-items: center; justify-content: space-between; padding: 16px 20px 10px 20px;">
        <div style="display: flex; align-items: center; gap: 0px; margin-left: -12px;">
          <img src="assets/image/logo.png" alt="Logo" style="height: 72px; width: auto; margin-right: -8px;">
          <span style="font-size: 28px; font-weight: 800; color: #769f2e; letter-spacing: 0.5px;">NÔNG THƯƠNG</span>
        </div>
        <a routerLink="/notifications" style="width: 42px; height: 42px; background-color: #eaf4d8; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: #587820; text-decoration: none; font-size: 18px;">
          <i class="fa-regular fa-bell"></i>
        </a>
      </div>

      <!-- Thanh Tìm kiếm & Nút Lọc sliders -->
      <div style="display: flex; align-items: center; gap: 12px; padding: 0 20px; margin-bottom: 20px;">
        <div style="flex: 1; height: 46px; background-color: #ffffff; border: 1px solid #e2e8f0; border-radius: 25px; display: flex; align-items: center; padding: 0 16px; box-sizing: border-box;">
          <i class="fa-solid fa-magnifying-glass" style="color: #64748b; font-size: 18px;"></i>
          <input type="text" [(ngModel)]="searchQuery" (input)="onSearchChange()" style="border: none; outline: none; background: transparent; width: 100%; font-size: 15px; color: #333333; margin-left: 10px;" placeholder="Tìm kiếm">
        </div>
        <div style="width: 42px; height: 42px; background-color: #eaf4d8; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: #587820; font-size: 18px; cursor: pointer;">
          <i class="fa-solid fa-sliders"></i>
        </div>
      </div>

      <!-- Banner Chào mừng Edge-to-Edge -->
      <div style="margin: 0 0 24px 0; width: 100%; background: url('assets/image/home_banner.jpg') no-repeat center / cover; padding: 24px 20px 28px 20px; position: relative; overflow: hidden; box-sizing: border-box;">
        <img src="assets/image/nhanvat.png" alt="Nhân vật Nông Thương" style="position: absolute; right: -18px; top: 8px; height: 225px; width: auto; object-fit: contain; filter: drop-shadow(0 12px 24px rgba(0, 0, 0, 0.32)); z-index: 2; pointer-events: none;">

        <div style="position: relative; z-index: 3; max-width: 65%; margin-left: 20px;">
          <div style="font-size: 24px; font-weight: 800; color: #1e5234; margin-bottom: 8px;">Chào mừng bạn !</div>
          <div style="display: inline-block; background-color: #0d6847; color: #ffffff; font-size: 16px; font-weight: 700; padding: 6px 28px; border-radius: 4px; margin-bottom: 10px; clip-path: polygon(0 0, 100% 0, 92% 100%, 8% 100%);">{{currentUser.fullname}}</div>
          <div style="font-size: 16px; font-weight: 700; color: #92401d; margin-bottom: 14px;">Một ngày vui vẻ nhé</div>
        </div>

        <div style="display: flex; justify-content: center; width: 100%; margin-top: 16px; position: relative; z-index: 4;">
          <a routerLink="/add-product-input" class="btn-sell-now">
            BÁN SẢN PHẨM NGAY
          </a>
        </div>
      </div>

      <!-- Mục Loại trái cây -->
      <div style="display: flex; justify-content: space-between; align-items: center; padding: 0 20px; margin-bottom: 12px;">
        <span style="font-size: 18px; font-weight: 800; color: #2d4612;">Loại trái cây</span>
        <a (click)="selectCategory('all')" style="font-size: 14px; font-weight: 700; color: #444444; text-decoration: underline; cursor: pointer;">Xem tất cả</a>
      </div>
      <div class="categories-horizontal-scroll">
        <div class="category-pill-card" [class.active]="selectedCategory === 'all'" (click)="selectCategory('all')">
          <span class="category-pill-name" style="font-size: 15px;">🌟 Tất cả</span>
        </div>
        <div *ngFor="let cat of categories" class="category-pill-card" [class.active]="selectedCategory === cat.key" (click)="selectCategory(cat.key)">
          <img [src]="cat.image" [alt]="cat.name" class="category-pill-img">
          <span class="category-pill-name">{{cat.name}}</span>
        </div>
      </div>

      <!-- Mục Danh mục sản phẩm -->
      <div style="display: flex; justify-content: space-between; align-items: center; padding: 0 20px; margin-bottom: 12px;">
        <span style="font-size: 17px; font-weight: 800; color: #333333;">Danh mục sản phẩm</span>
        <a (click)="selectCategory('all')" style="font-size: 14px; font-weight: 700; color: #444444; text-decoration: underline; cursor: pointer;">Xem tất cả</a>
      </div>

      <!-- Grid Sản phẩm -->
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px; padding: 0 20px;">
        <a *ngFor="let p of filteredProducts" [routerLink]="['/product-detail', p.id]" class="product-card-item" style="background-color: #eaf4db; border-radius: 20px; padding: 14px 12px; text-align: center; position: relative; text-decoration: none; box-shadow: 0 6px 16px rgba(0,0,0,0.08); display: flex; flex-direction: column; align-items: center;">
          <div style="position: absolute; top: 10px; right: 10px; width: 26px; height: 26px; background: #ffffff; border: 1px solid #dc2626; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: #dc2626; font-size: 13px;"><i class="fa-regular fa-heart"></i></div>
          <img [src]="p.image" [alt]="p.name" style="width: 95px; height: 95px; border-radius: 50%; object-fit: cover; margin-top: 6px; margin-bottom: 10px; box-shadow: 0 4px 8px rgba(0,0,0,0.1);">
          <div style="font-size: 15px; font-weight: 700; color: #333333; margin-bottom: 4px;">{{p.name}}</div>
          <div style="font-size: 12px; color: #444444; margin-bottom: 4px;"><span style="color: #f59e0b;">★</span> 4.8 <span style="color: #666;">(120)</span></div>
          <div style="font-size: 14px; font-weight: 800; color: #1c522a;">{{p.priceText}}</div>
        </a>
      </div>
    </div>
  `
})
export class FarmerHomeComponent {
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
