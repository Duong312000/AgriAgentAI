import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-farmer-home',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  template: `
    <div style="background-color: #f5f5f5; min-height: 100vh; display: flex; flex-direction: column; padding-bottom: 80px; box-sizing: border-box;">
      <!-- Top Yellow Header Container (#fff7c5) -->
      <section style="background-color: #fff7c5; padding: 14px 16px 16px 16px;">
        <!-- Top Row Header -->
        <header style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 14px;">
          <!-- Logo + Brand Name -->
          <a routerLink="/farmer-home" style="display: flex; align-items: center; gap: 8px; text-decoration: none;">
            <img src="https://res.cloudinary.com/zdavpzw2/image/upload/v1791068883/agriagent_ai/logo.png" alt="Logo" style="height: 36px; width: auto;">
            <span style="font-size: 20px; font-weight: 800; color: #587820;">NÔNG THƯƠNG</span>
          </a>

          <!-- Stacked Right Action Buttons (Bell + Sliders) -->
          <div style="display: flex; flex-direction: column; gap: 8px; align-items: center;">
            <a routerLink="/notifications" style="width: 38px; height: 38px; background-color: #eaf3d8; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: #587820; text-decoration: none;">
              <i class="fa-regular fa-bell" style="font-size: 18px;"></i>
            </a>
            <button style="width: 38px; height: 38px; background-color: #eaf3d8; border-radius: 50%; border: none; display: flex; align-items: center; justify-content: center; color: #587820; cursor: pointer;">
              <i class="fa-solid fa-sliders" style="font-size: 18px;"></i>
            </button>
          </div>
        </header>

        <!-- Big Gold Button: BÁN NÔNG SẢN NGAY -->
        <a routerLink="/add-product-input" style="display: flex; align-items: center; justify-content: center; width: 100%; height: 48px; background: linear-gradient(180deg, #fde047 0%, #eab308 100%); color: #584100; font-size: 16px; font-weight: 800; border-radius: 12px; text-decoration: none; box-shadow: 0 4px 10px rgba(234, 179, 8, 0.35); margin-bottom: 14px; text-transform: uppercase; letter-spacing: 0.5px;">
          BÁN NÔNG SẢN NGAY
        </a>

        <!-- Horizontal Category Scroll Pills -->
        <div style="display: flex; gap: 10px; overflow-x: auto; scrollbar-width: none; padding-bottom: 4px;">
          <div *ngFor="let cat of categories" (click)="selectCategory(cat.key)" [style.border]="selectedCategory === cat.key ? '2px solid #769f2e' : '2px solid transparent'" style="width: 60px; height: 60px; min-width: 60px; background: #ffffff; border-radius: 14px; display: flex; align-items: center; justify-content: center; cursor: pointer; box-shadow: 0 2px 6px rgba(0,0,0,0.04);">
            <img [src]="cat.image" [alt]="cat.name" style="width: 44px; height: 44px; border-radius: 10px; object-fit: cover;">
          </div>
        </div>
      </section>

      <!-- Market Hero Banner -->
      <div style="width: 100%; height: 160px; overflow: hidden;">
        <img src="https://res.cloudinary.com/zdavpzw2/image/upload/v1791068881/agriagent_ai/home_banner.jpg" alt="Chợ nông sản" style="width: 100%; height: 100%; object-fit: cover;">
      </div>

      <!-- Product Grid 2 Columns -->
      <div style="padding: 14px; display: grid; grid-template-columns: 1fr 1fr; gap: 12px; background-color: #f5f5f5;">
        <a *ngFor="let p of filteredProducts" [routerLink]="['/product-detail', p.id]" style="background: #ffffff; border-radius: 14px; overflow: hidden; text-decoration: none; color: inherit; box-shadow: 0 2px 8px rgba(0,0,0,0.06); display: flex; flex-direction: column;">
          <img [src]="p.image" [alt]="p.name" style="width: 100%; aspect-ratio: 1/1; object-fit: cover;">
          <div style="padding: 10px 12px; flex: 1; display: flex; flex-direction: column; justify-content: space-between;">
            <div style="font-size: 14px; font-weight: 700; color: #1e293b; margin-bottom: 4px; line-height: 1.3;">{{ p.name }}</div>
            <div style="font-size: 12px; color: #f59e0b; margin-bottom: 4px; font-weight: 600;">
              <i class="fa-solid fa-star"></i> 4.5 <span style="color: #94a3b8; font-weight: 400;">(672)</span>
            </div>
            <div style="font-size: 14px; font-weight: 800; color: #1e293b;">{{ p.priceText }}</div>
          </div>
        </a>
      </div>
    </div>
  `
})
export class FarmerHomeComponent implements OnInit {
  private productService = inject(ProductService);

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

  ngOnInit() {
    this.updateProducts();
  }

  selectCategory(key: string) {
    this.selectedCategory = (this.selectedCategory === key && key !== 'all') ? 'all' : key;
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
