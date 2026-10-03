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
    <div style="background-color: #f8f8f8; min-height: 100vh; display: flex; flex-direction: column; padding-bottom: 90px; box-sizing: border-box;">
      <div class="app-header" style="justify-content: space-between;">
        <div style="display: flex; align-items: center; gap: 8px;">
          <img src="https://res.cloudinary.com/zdavpzw2/image/upload/v1791068883/agriagent_ai/logo.png" style="height: 32px; width: auto;">
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
        <form class="search-box" (ngSubmit)="onSearchChange()">
          <i class="fa-solid fa-magnifying-glass" style="color: #94a3b8; font-size: 18px;"></i>
          <input type="search" name="searchQuery" [(ngModel)]="searchQuery" (input)="onSearchChange()" placeholder="Tìm kiếm" aria-label="Tìm kiếm trái cây">
          <button type="submit" style="border: 0; border-radius: 16px; padding: 5px 10px; background: #769f2e; color: #fff; font: inherit; font-size: 12px; font-weight: 700; cursor: pointer;">Tìm</button>
        </form>

        <div class="welcome-banner" style="display: flex; justify-content: space-between; align-items: flex-end; padding-right: 10px;">
          <div>
            <div style="font-size: 18px; color: #2d4612; font-weight: 700;">Chào mừng bạn !</div>
            <div class="tag" style="background-color: #0d9488;">{{currentUser.fullname}}</div>
            <div style="font-size: 14px; color: #475569; font-weight: 600;">Một ngày vui vẻ nhé</div>
          </div>
          <img src="https://res.cloudinary.com/zdavpzw2/image/upload/v1791068886/agriagent_ai/nhanvat.png" alt="Nông dân" style="height: 120px; width: auto; object-fit: contain; margin-bottom: -10px;">
        </div>

        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
          <h3 style="font-size: 18px; font-weight: 800; color: #2d4612;">Loại trái cây</h3>
        </div>
        <div class="categories-horizontal-scroll" style="padding-left: 0; padding-right: 0;">
          <div class="category-pill-card" [class.active]="selectedCategory === 'all'" (click)="selectCategory('all')">
            <span class="category-pill-img all-category-icon"><i class="fa-solid fa-leaf"></i></span>
            <span class="category-pill-name">Tất cả</span>
          </div>
          <div *ngFor="let cat of categories" class="category-pill-card" [class.active]="selectedCategory === cat.key" (click)="selectCategory(cat.key)">
            <img [src]="cat.image" [alt]="cat.name" class="category-pill-img">
            <span class="category-pill-name">{{cat.name}}</span>
          </div>
        </div>

        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
          <h3 style="font-size: 16px; font-weight: 800; color: #2d4612;">Danh mục sản phẩm</h3>
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
  `,
  styles: [`
    .categories-horizontal-scroll {
      gap: 8px;
      overflow-x: auto;
      padding-bottom: 12px;
      scrollbar-width: none;
    }

    .categories-horizontal-scroll::-webkit-scrollbar {
      display: none;
    }

    .category-pill-card {
      width: 62px;
      flex-basis: 62px;
      gap: 4px;
      font-size: 10px;
    }

    .category-pill-img {
      display: flex;
      width: 52px;
      height: 52px;
      flex: 0 0 52px;
      align-items: center;
      justify-content: center;
      border: 2px solid transparent;
      border-radius: 11px;
      object-fit: cover;
      box-sizing: border-box;
    }

    .all-category-icon {
      background: #fff;
      color: #769f2e;
      font-size: 18px;
    }

    .category-pill-card.active .category-pill-img {
      border-color: #769f2e;
    }

    .category-pill-name {
      font-size: 10px;
      line-height: 1.2;
    }
  `]
})
export class BuyerHomeComponent {
  private productService = inject(ProductService);
  private authService = inject(AuthService);
  currentUser = this.authService.getCurrentUser();

  selectedCategory = 'all';
  searchQuery = '';
  filteredProducts: Product[] = [];

  categories = [
    { key: 'xoai', name: 'Xoài', image: 'https://res.cloudinary.com/zdavpzw2/image/upload/v1791068896/agriagent_ai/tr%C3%A1i_c%C3%A2y/xoai.jpg' },
    { key: 'chom-chom', name: 'Chôm chôm', image: 'https://res.cloudinary.com/zdavpzw2/image/upload/v1791068889/agriagent_ai/tr%C3%A1i_c%C3%A2y/chom_chom_ban.jpg' },
    { key: 'oi', name: 'Ổi', image: 'https://res.cloudinary.com/zdavpzw2/image/upload/v1791068891/agriagent_ai/tr%C3%A1i_c%C3%A2y/oi.jpg' },
    { key: 'dua-hau', name: 'Dưa hấu', image: 'https://res.cloudinary.com/zdavpzw2/image/upload/v1791068890/agriagent_ai/tr%C3%A1i_c%C3%A2y/dua_hau.jpg' },
    { key: 'sau-rieng', name: 'Sầu riêng', image: 'https://res.cloudinary.com/zdavpzw2/image/upload/v1791068893/agriagent_ai/tr%C3%A1i_c%C3%A2y/sau_rieng.jpg' },
    { key: 'vai', name: 'Vải', image: 'https://res.cloudinary.com/zdavpzw2/image/upload/v1791068895/agriagent_ai/tr%C3%A1i_c%C3%A2y/vai.jpg' },
    { key: 'thanh-long', name: 'Thanh long', image: 'https://res.cloudinary.com/zdavpzw2/image/upload/v1791068894/agriagent_ai/tr%C3%A1i_c%C3%A2y/thanh_long.jpg' }
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
    this.productService.getProductsFromApi().subscribe(products => {
      const cleanQuery = this.searchQuery.trim().toLowerCase();
      this.filteredProducts = products.filter(p => {
        let matchCat = true;
        if (this.selectedCategory && this.selectedCategory !== 'all') {
          const catItem = this.categories.find(c => c.key === this.selectedCategory);
          const catName = catItem ? catItem.name.toLowerCase() : this.selectedCategory.toLowerCase();
          matchCat = (p.category && p.category.toLowerCase().includes(catName)) ||
                     (p.name && p.name.toLowerCase().includes(catName)) ||
                     p.id === this.selectedCategory ||
                     p.category === this.selectedCategory;
        }

        const matchQuery = !cleanQuery || 
                           (p.name && p.name.toLowerCase().includes(cleanQuery)) || 
                           (p.location && p.location.toLowerCase().includes(cleanQuery));
        return matchCat && matchQuery;
      });
    });
  }
}
