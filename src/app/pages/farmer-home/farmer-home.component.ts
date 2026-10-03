import { Component, ElementRef, ViewChild, inject } from '@angular/core';
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
    <div class="farmer-home">
      <section class="home-top">
        <header class="home-header">
          <a routerLink="/farmer-home" class="brand" aria-label="Nông Thương - Trang chủ">
            <img src="assets/image/logo.png" alt="">
            <span>NÔNG THƯƠNG</span>
          </a>
          <a routerLink="/notifications" class="notification-button" aria-label="Thông báo">
            <i class="fa-regular fa-bell"></i>
          </a>
        </header>

        <div class="search-row">
          <form class="search-box" (ngSubmit)="onSearchChange()">
            <i class="fa-solid fa-magnifying-glass" aria-hidden="true"></i>
            <input
              type="search"
              [(ngModel)]="searchQuery"
              name="searchQuery"
              placeholder="Tìm kiếm"
              aria-label="Tìm kiếm trái cây">
            <button class="search-button" type="submit">Tìm</button>
          </form>
        </div>

        <a routerLink="/add-product-input" class="btn-sell-now">
          BÁN NÔNG SẢN NGAY
        </a>

        <div class="category-scroll" aria-label="Lọc theo loại trái cây">
          <button
            type="button"
            class="category-card all-category"
            [class.selected]="selectedCategory === 'all'"
            [attr.aria-pressed]="selectedCategory === 'all'"
            (click)="selectCategory('all')">
            <span class="category-image all-icon"><i class="fa-solid fa-leaf"></i></span>
            <span>Tất cả</span>
          </button>
          <button
            *ngFor="let cat of categories"
            type="button"
            class="category-card"
            [class.selected]="selectedCategory === cat.key"
            [attr.aria-pressed]="selectedCategory === cat.key"
            (click)="selectCategory(cat.key)">
            <img class="category-image" [src]="cat.image" [alt]="cat.name">
            <span>{{cat.name}}</span>
          </button>
        </div>
      </section>

      <section class="home-main">
        <div class="banner-carousel" aria-label="Banner quảng cáo">
          <div
            #bannerTrack
            class="banner-track"
            (scroll)="onBannerScroll()">
            <div class="banner-slide" *ngFor="let banner of banners">
              <img [src]="banner.image" [alt]="banner.alt">
            </div>
          </div>
          <div class="banner-dots" aria-label="Chọn banner">
            <button
              *ngFor="let banner of banners; let i = index"
              type="button"
              [class.active]="activeBanner === i"
              [attr.aria-label]="'Chuyển đến banner ' + (i + 1)"
              [attr.aria-current]="activeBanner === i ? 'true' : null"
              (click)="showBanner(i)">
            </button>
          </div>
        </div>

        <div class="section-heading">
          <div>
            <h1>Trái cây tươi ngon</h1>
            <p>Đặc sản từ những nhà vườn Việt Nam</p>
          </div>
        </div>

        <div class="product-grid" *ngIf="filteredProducts.length; else noProducts">
          <a
            *ngFor="let p of filteredProducts"
            [routerLink]="['/product-detail', p.id]"
            class="product-card">
            <img class="product-image" [src]="p.image" [alt]="p.name">
            <div class="product-info">
              <div class="product-name">{{p.name}}</div>
              <div class="product-rating"><span>★</span> 4.8 <span class="rating-count">(120)</span></div>
              <div class="product-price">{{p.priceText}}</div>
            </div>
          </a>
        </div>
        <ng-template #noProducts>
          <p class="empty-state">Không tìm thấy sản phẩm phù hợp.</p>
        </ng-template>
      </section>
    </div>
  `,
  styles: [`
    .farmer-home {
      min-height: 100vh;
      padding-bottom: 76px;
      background: #f5f5f5;
    }

    .home-top {
      padding: 12px 16px 14px;
      background: #fff7c5;
    }

    .home-header,
    .search-row,
    .section-heading {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    .home-header {
      margin-bottom: 12px;
    }

    .brand {
      display: inline-flex;
      align-items: center;
      gap: 7px;
      color: #587820;
      font-size: 17px;
      font-weight: 800;
      text-decoration: none;
    }

    .brand img {
      width: 30px;
      height: 34px;
      object-fit: contain;
    }

    .notification-button {
      display: inline-flex;
      width: 36px;
      height: 36px;
      align-items: center;
      justify-content: center;
      border: 0;
      border-radius: 50%;
      background: #eaf3d8;
      color: #587820;
      font-size: 16px;
      text-decoration: none;
    }

    .search-row {
      gap: 9px;
      margin-bottom: 12px;
    }

    .search-box {
      display: flex;
      height: 38px;
      flex: 1;
      align-items: center;
      gap: 9px;
      padding: 0 12px;
      margin: 0;
      border-radius: 22px;
      background: #fff;
      color: #64748b;
      box-shadow: none;
      border: 0;
    }

    .search-box input {
      width: 100%;
      border: 0;
      outline: 0;
      background: transparent;
      color: #334155;
      font: inherit;
      font-size: 13px;
    }

    .search-box input::-webkit-search-cancel-button {
      cursor: pointer;
    }

    .search-button {
      flex: 0 0 auto;
      padding: 5px 10px;
      border: 0;
      border-radius: 16px;
      background: #769f2e;
      color: #fff;
      cursor: pointer;
      font: inherit;
      font-size: 12px;
      font-weight: 700;
    }

    .btn-sell-now {
      display: flex;
      width: 100%;
      max-width: none;
      height: 42px;
      min-height: 42px;
      align-items: center;
      justify-content: center;
      margin-bottom: 13px;
      padding: 0 16px;
      border: 0;
      border-radius: 5px;
      background: #ffdc54;
      color: #76540a;
      font-size: 13px;
      font-weight: 800;
      box-shadow: none;
      filter: none;
      text-decoration: none;
    }

    .btn-sell-now:hover {
      transform: none;
      background: #ffdc54;
      color: #76540a;
      box-shadow: none;
      filter: none;
    }

    .category-scroll {
      display: flex;
      gap: 8px;
      overflow-x: auto;
      margin: 0 -16px;
      padding: 0 16px 2px;
      scrollbar-width: none;
      -webkit-overflow-scrolling: touch;
    }

    .category-scroll::-webkit-scrollbar,
    .banner-track::-webkit-scrollbar {
      display: none;
    }

    .category-card {
      display: flex;
      width: 62px;
      flex: 0 0 62px;
      flex-direction: column;
      align-items: center;
      gap: 4px;
      padding: 0;
      border: 0;
      background: transparent;
      color: #475569;
      cursor: pointer;
      font: inherit;
      font-size: 10px;
      line-height: 1.2;
      text-align: center;
    }

    .category-image {
      display: flex;
      width: 52px;
      height: 52px;
      align-items: center;
      justify-content: center;
      border-radius: 11px;
      border: 2px solid transparent;
      box-sizing: border-box;
      object-fit: cover;
      background: #fff;
    }

    .all-icon {
      color: #769f2e;
      font-size: 18px;
    }

    .category-card.selected .category-image {
      border-color: #769f2e;
    }

    .category-card.selected {
      color: #45651e;
      font-weight: 700;
    }

    .home-main {
      min-height: calc(100vh - 210px);
      padding-bottom: 18px;
      background: #f5f5f5;
    }

    .banner-carousel {
      margin-bottom: 16px;
    }

    .banner-track {
      display: flex;
      overflow-x: auto;
      scroll-snap-type: x mandatory;
      scrollbar-width: none;
      -webkit-overflow-scrolling: touch;
    }

    .banner-slide {
      width: 100%;
      flex: 0 0 100%;
      scroll-snap-align: start;
    }

    .banner-slide img {
      display: block;
      width: 100%;
      height: 136px;
      object-fit: cover;
    }

    .banner-dots {
      display: flex;
      justify-content: center;
      gap: 6px;
      padding-top: 8px;
    }

    .banner-dots button {
      width: 6px;
      height: 6px;
      padding: 0;
      border: 0;
      border-radius: 50%;
      background: #cbd5c0;
      cursor: pointer;
    }

    .banner-dots button.active {
      width: 16px;
      border-radius: 5px;
      background: #769f2e;
    }

    .section-heading {
      gap: 12px;
      padding: 0 16px;
      margin-bottom: 10px;
    }

    .section-heading h1 {
      margin: 0;
      color: #2d4612;
      font-size: 17px;
      font-weight: 800;
    }

    .section-heading p {
      margin: 2px 0 0;
      color: #64748b;
      font-size: 11px;
    }

    .product-grid {
      display: grid;
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: 9px;
      padding: 0 10px;
    }

    .product-card {
      min-width: 0;
      overflow: hidden;
      border: 1px solid #e6e6e6;
      border-radius: 9px;
      background: #fff;
      color: inherit;
      text-decoration: none;
    }

    .product-image {
      display: block;
      width: 100%;
      height: auto;
      aspect-ratio: 1;
      border-radius: 0;
      box-shadow: none;
      object-fit: cover;
    }

    .product-info {
      padding: 5px 7px 7px;
    }

    .product-name {
      overflow: hidden;
      color: #333;
      font-size: 11px;
      line-height: 1.35;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .product-rating {
      margin-top: 2px;
      color: #555;
      font-size: 10px;
    }

    .product-rating > span:first-child {
      color: #f4b400;
    }

    .rating-count {
      color: #888;
    }

    .product-price {
      margin-top: 2px;
      color: #222;
      font-size: 10px;
      font-weight: 700;
    }

    .empty-state {
      padding: 20px 16px;
      color: #64748b;
      font-size: 14px;
      text-align: center;
    }
  `]
})
export class FarmerHomeComponent {
  private productService = inject(ProductService);

  @ViewChild('bannerTrack') private bannerTrack?: ElementRef<HTMLDivElement>;

  selectedCategory = 'all';
  searchQuery = '';
  filteredProducts: Product[] = [];
  activeBanner = 0;

  categories = [
    { key: 'xoai', name: 'Xoài', image: 'assets/image/Trái cây/xoai.jpg' },
    { key: 'chom-chom', name: 'Chôm chôm', image: 'assets/image/Trái cây/chom chom ban.jpg' },
    { key: 'oi', name: 'Ổi', image: 'assets/image/Trái cây/oi.jpg' },
    { key: 'dua-hau', name: 'Dưa hấu', image: 'assets/image/Trái cây/dua hau.jpg' },
    { key: 'sau-rieng', name: 'Sầu riêng', image: 'assets/image/Trái cây/sau rieng.jpg' },
    { key: 'vai', name: 'Vải', image: 'assets/image/Trái cây/vai.jpg' },
    { key: 'thanh-long', name: 'Thanh long', image: 'assets/image/Trái cây/thanh long.jpg' }
  ];

  banners = [
    { image: 'assets/image/banner.jpg', alt: 'Nông sản tươi tại chợ quê' },
    { image: 'assets/image/co ban trai cay tren thuyen.jpg', alt: 'Những trái cây tươi ngon từ nhà vườn' },
    { image: 'assets/image/4d6db1ad7275923ce24c19acbf3b0ad1.jpg', alt: 'Thu hoạch nông sản sạch tại vườn' }
  ];

  constructor() {
    this.updateProducts();
  }

  selectCategory(key: string): void {
    this.selectedCategory = key;
    this.updateProducts();
  }

  onSearchChange(): void {
    this.updateProducts();
  }

<<<<<<< HEAD
  private updateProducts() {
    this.productService.getProductsFromApi().subscribe(products => {
      const cleanQuery = this.searchQuery.trim().toLowerCase();
      this.filteredProducts = products.filter(p => {
        const matchCat = (!this.selectedCategory || this.selectedCategory === 'all' || p.category === this.selectedCategory || p.id === this.selectedCategory);
        const matchQuery = !cleanQuery || p.name.toLowerCase().includes(cleanQuery) || p.location.toLowerCase().includes(cleanQuery);
        return matchCat && matchQuery;
      });
    });
=======
  onBannerScroll(): void {
    const track = this.bannerTrack?.nativeElement;
    if (track) {
      this.activeBanner = Math.round(track.scrollLeft / track.clientWidth);
    }
  }

  showBanner(index: number): void {
    const track = this.bannerTrack?.nativeElement;
    if (!track) {
      return;
    }

    track.scrollTo({ left: index * track.clientWidth, behavior: 'smooth' });
    this.activeBanner = index;
  }

  private updateProducts(): void {
    this.filteredProducts = this.productService.filterProducts(this.selectedCategory, this.searchQuery);
>>>>>>> 6d8312c78ec5abee60af7d63260515ef267bb55c
  }
}
