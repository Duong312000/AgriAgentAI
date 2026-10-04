import { Component, ElementRef, ViewChild, inject, OnInit } from '@angular/core';
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
    <div style="background-color: #f8f8f8; min-height: 100vh; display: flex; flex-direction: column; padding-bottom: 80px; box-sizing: border-box;">
      <!-- Top Yellow Header Container (#fff7c5) -->
      <section style="background-color: #fff7c5; padding: 14px 16px 16px 16px;">
        <!-- Top Row Header: Logo Big & Clear + Actions -->
        <header style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 14px;">
          <!-- Big & Clear Logo Nông Thương -->
          <a routerLink="/farmer-home" style="display: flex; align-items: center; gap: 10px; text-decoration: none;">
            <img src="https://res.cloudinary.com/zdavpzw2/image/upload/v1791068883/agriagent_ai/logo.png" alt="Logo" style="height: 44px; width: auto; object-fit: contain;">
            <span style="font-size: 24px; font-weight: 900; color: #587820; letter-spacing: 0.5px;">NÔNG THƯƠNG</span>
          </a>

          <!-- Right Action Buttons: Bell + Cart (Replacing Sliders with Shopping Cart) -->
          <div style="display: flex; gap: 8px; align-items: center;">
            <a routerLink="/notifications" style="width: 40px; height: 40px; background-color: #eaf3d8; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: #587820; text-decoration: none; font-size: 18px;">
              <i class="fa-regular fa-bell"></i>
            </a>
            <a routerLink="/checkout/1" style="width: 40px; height: 40px; background-color: #eaf3d8; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: #587820; text-decoration: none; font-size: 18px;" title="Giỏ hàng">
              <i class="fa-solid fa-cart-shopping"></i>
            </a>
          </div>
        </header>

        <!-- Search Bar with Green "Tìm" Button -->
        <div style="margin-bottom: 12px;">
          <form (ngSubmit)="onSearchChange()" style="display: flex; height: 42px; align-items: center; gap: 8px; padding: 0 6px 0 14px; border-radius: 22px; background: #ffffff; border: 1px solid #e2e8f0; box-shadow: 0 2px 6px rgba(0,0,0,0.03);">
            <i class="fa-solid fa-magnifying-glass" style="color: #94a3b8; font-size: 16px;"></i>
            <input
              type="search"
              [(ngModel)]="searchQuery"
              name="searchQuery"
              (input)="onSearchChange()"
              placeholder="Tìm kiếm trái cây, nông sản..."
              style="flex: 1; border: none; outline: none; background: transparent; font-size: 14px; color: #334155; font-family: inherit;">
            <button type="submit" style="padding: 6px 14px; border: none; border-radius: 16px; background: #769f2e; color: #ffffff; font-size: 13px; font-weight: 700; cursor: pointer;">
              Tìm
            </button>
          </form>
        </div>

        <!-- Big Gold Button: BÁN NÔNG SẢN NGAY -->
        <a routerLink="/add-product-input" style="display: flex; align-items: center; justify-content: center; width: 100%; height: 48px; background: linear-gradient(180deg, #fde047 0%, #eab308 100%); color: #584100; font-size: 16px; font-weight: 800; border-radius: 12px; text-decoration: none; box-shadow: 0 4px 10px rgba(234, 179, 8, 0.35); margin-bottom: 14px; text-transform: uppercase; letter-spacing: 0.5px;">
          BÁN NÔNG SẢN NGAY
        </a>

        <!-- Horizontal Categories with "Tất cả", 1px padding image box & Category Name below -->
        <div style="display: flex; gap: 12px; overflow-x: auto; scrollbar-width: none; padding-bottom: 4px;">
          <!-- "Tất cả" Category Item -->
          <div (click)="selectCategory('all')" style="display: flex; flex-direction: column; align-items: center; gap: 4px; flex-shrink: 0; cursor: pointer;">
            <div [style.borderColor]="selectedCategory === 'all' ? '#769f2e' : 'transparent'" style="width: 58px; height: 58px; background: #ffffff; border-radius: 12px; padding: 1px; display: flex; align-items: center; justify-content: center; border: 2px solid; box-sizing: border-box; box-shadow: 0 2px 6px rgba(0,0,0,0.04);">
              <i class="fa-solid fa-leaf" style="font-size: 24px; color: #769f2e;"></i>
            </div>
            <span style="font-size: 11px; font-weight: 700; color: #334155;">Tất cả</span>
          </div>

          <!-- Individual Category Items -->
          <div *ngFor="let cat of categories" (click)="selectCategory(cat.key)" style="display: flex; flex-direction: column; align-items: center; gap: 4px; flex-shrink: 0; cursor: pointer;">
            <div [style.borderColor]="selectedCategory === cat.key ? '#769f2e' : 'transparent'" style="width: 58px; height: 58px; background: #ffffff; border-radius: 12px; padding: 1px; display: flex; align-items: center; justify-content: center; border: 2px solid; box-sizing: border-box; box-shadow: 0 2px 6px rgba(0,0,0,0.04);">
              <img [src]="cat.image" [alt]="cat.name" style="width: 100%; height: 100%; border-radius: 10px; object-fit: cover;">
            </div>
            <span style="font-size: 11px; font-weight: 700; color: #334155;">{{ cat.name }}</span>
          </div>
        </div>
      </section>

      <!-- Banner Carousel Slide Track -->
      <div style="position: relative; width: 100%; overflow: hidden; background: #f8f8f8;">
        <div #bannerTrack style="display: flex; overflow-x: auto; scroll-snap-type: x mandatory; scrollbar-width: none;" (scroll)="onBannerScroll()">
          <div *ngFor="let banner of banners" style="flex: 0 0 100%; scroll-snap-align: start; height: 160px;">
            <img [src]="banner.image" [alt]="banner.alt" style="width: 100%; height: 100%; object-fit: cover;">
          </div>
        </div>
        <!-- Banner Carousel Dots -->
        <div style="position: absolute; bottom: 8px; left: 0; right: 0; display: flex; justify-content: center; gap: 6px;">
          <span *ngFor="let b of banners; let i = index" [style.background]="activeBanner === i ? '#769f2e' : 'rgba(255,255,255,0.6)'" style="width: 8px; height: 8px; border-radius: 50%; display: inline-block;"></span>
        </div>
      </div>

      <!-- Section Heading -->
      <div style="padding: 14px 16px 6px 16px;">
        <h1 style="font-size: 18px; font-weight: 800; color: #1e293b; margin: 0 0 2px 0;">Trái cây tươi ngon</h1>
        <p style="font-size: 12px; color: #64748b; margin: 0;">Đặc sản từ những nhà vườn Việt Nam</p>
      </div>

      <!-- Product Grid 2 Columns - Cards with border-radius: 5% -->
      <div style="padding: 12px 16px; display: grid; grid-template-columns: 1fr 1fr; gap: 12px; background-color: #f8f8f8;">
        <a *ngFor="let p of filteredProducts" [routerLink]="['/product-detail', p.id]" style="background: #ffffff; border-radius: 5%; overflow: hidden; text-decoration: none; color: inherit; box-shadow: 0 2px 8px rgba(0,0,0,0.06); display: flex; flex-direction: column; border: 1px solid #eeeeee;">
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
  @ViewChild('bannerTrack') bannerTrack!: ElementRef<HTMLDivElement>;
  private productService = inject(ProductService);

  selectedCategory = 'all';
  searchQuery = '';
  filteredProducts: Product[] = [];
  activeBanner = 0;

  banners = [
    { image: 'https://res.cloudinary.com/zdavpzw2/image/upload/v1791068881/agriagent_ai/home_banner.jpg', alt: 'Nông sản tươi tại chợ quê' },
    { image: 'https://res.cloudinary.com/zdavpzw2/image/upload/v1791068880/agriagent_ai/co_ban_trai_cay_tren_thuyen.jpg', alt: 'Những trái cây tươi ngon từ nhà vườn' },
    { image: 'https://res.cloudinary.com/zdavpzw2/image/upload/v1791068871/agriagent_ai/4d6db1ad7275923ce24c19acbf3b0ad1.jpg', alt: 'Thu hoạch nông sản sạch tại vườn' }
  ];

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

  onSearchChange() {
    this.updateProducts();
  }

  onBannerScroll(): void {
    const track = this.bannerTrack?.nativeElement;
    if (track) {
      const width = track.clientWidth || 1;
      this.activeBanner = Math.round(track.scrollLeft / width);
    }
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
