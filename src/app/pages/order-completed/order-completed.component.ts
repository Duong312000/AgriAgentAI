import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

interface CompletedOrder {
  id: string;
  farmer: string;
  productName: string;
  image: string;
  weight: string;
  price: string;
  totalPrice: string;
  completedDate: string;
  isRated: boolean;
}

@Component({
  selector: 'app-order-completed',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div style="background-color: #f5f5f5; min-height: 100vh; padding-bottom: 80px; box-sizing: border-box;">
      <!-- Shopee / Lazada Top Bar Header -->
      <div style="position: sticky; top: 0; z-index: 100; background: #ffffff; border-bottom: 1px solid #e5e5e5; padding: 12px 16px; display: flex; align-items: center; justify-content: space-between;">
        <a routerLink="/profile" style="display: flex; align-items: center; justify-content: center; width: 36px; height: 36px; border-radius: 50%; color: #333333; text-decoration: none; font-size: 18px;">
          <i class="fa-solid fa-chevron-left"></i>
        </a>
        <h1 style="font-size: 17px; font-weight: 700; color: #222222; margin: 0;">Đơn Hàng Đã Hoàn Thành</h1>
        <a routerLink="/chat-list" style="color: #555555; font-size: 18px; text-decoration: none;">
          <i class="fa-regular fa-comment-dots"></i>
        </a>
      </div>

      <!-- Shopee Orders List -->
      <div style="padding: 12px 14px; display: flex; flex-direction: column; gap: 12px;">
        <div *ngFor="let item of orders" style="background: #ffffff; border-radius: 5%; padding: 14px; box-shadow: 0 1px 4px rgba(0,0,0,0.04); border: 1px solid #eeeeee;">
          <!-- Shop Header -->
          <div style="display: flex; justify-content: space-between; align-items: center; padding-bottom: 10px; border-bottom: 1px solid #f5f5f5; margin-bottom: 12px;">
            <div style="display: flex; align-items: center; gap: 6px; font-size: 13px; font-weight: 700; color: #222222;">
              <span style="background: #769f2e; color: #ffffff; font-size: 10px; padding: 2px 6px; border-radius: 5%; font-weight: 800;">Chính gốc</span>
              <span>{{item.farmer}}</span>
              <i class="fa-solid fa-chevron-right" style="font-size: 10px; color: #888888;"></i>
            </div>
            <span style="font-size: 12px; font-weight: 700; color: #16a34a;">
              <i class="fa-solid fa-truck-fast"></i> Đã Giao Thành Công
            </span>
          </div>

          <!-- Product Body -->
          <div style="display: flex; gap: 12px; margin-bottom: 12px;">
            <img [src]="item.image" [alt]="item.productName" style="width: 75px; height: 75px; border-radius: 5%; object-fit: cover; border: 1px solid #f0f0f0;">
            <div style="flex: 1;">
              <h3 style="font-size: 14px; font-weight: 700; color: #222222; margin: 0 0 6px 0; line-height: 1.3;">{{item.productName}}</h3>
              <div style="font-size: 12px; color: #777777; margin-bottom: 4px;">Khối lượng: {{item.weight}}</div>
              <div style="display: flex; justify-content: space-between; align-items: center;">
                <span style="font-size: 11px; color: #999999;">Ngày nhận: {{item.completedDate}}</span>
                <span style="font-size: 14px; font-weight: 700; color: #769f2e;">{{item.price}}</span>
              </div>
            </div>
          </div>

          <!-- Total Footer -->
          <div style="text-align: right; padding-top: 10px; border-top: 1px solid #f8f8f8; font-size: 13px; color: #444444; margin-bottom: 12px;">
            <span>Thành tiền: </span>
            <span style="font-size: 16px; font-weight: 800; color: #ee4d2d;">{{item.totalPrice}}</span>
          </div>

          <!-- Action Buttons Bar -->
          <div style="display: flex; justify-content: flex-end; gap: 8px;">
            <button (click)="item.isRated = true" [style.background]="item.isRated ? '#f5f5f5' : '#ffffff'" [style.color]="item.isRated ? '#888888' : '#ee4d2d'" [style.borderColor]="item.isRated ? '#e0e0e0' : '#ee4d2d'" style="border: 1px solid; padding: 7px 14px; border-radius: 5%; font-size: 12px; font-weight: 700; cursor: pointer;">
              {{item.isRated ? 'Đã Đánh Giá ★' : 'Đánh Giá 5★'}}
            </button>
            <a routerLink="/buyer-home" style="background: #769f2e; color: #ffffff; padding: 8px 18px; border-radius: 5%; font-size: 12px; font-weight: 700; text-decoration: none; box-shadow: 0 2px 6px rgba(118,159,46,0.3);">
              Mua Lại
            </a>
          </div>
        </div>
      </div>
    </div>
  `
})
export class OrderCompletedComponent {
  orders: CompletedOrder[] = [
    {
      id: 'COMP-101',
      farmer: 'Cô Ba Cai Lậy',
      productName: 'Sầu Riêng Ri6 Cơm Vàng Hạt Lép',
      image: 'https://res.cloudinary.com/zdavpzw2/image/upload/v1791068893/agriagent_ai/tr%C3%A1i_c%C3%A2y/sau_rieng.jpg',
      weight: '8 kg',
      price: '35.000đ / kg',
      totalPrice: '295.000đ',
      completedDate: '28/09/2026',
      isRated: true
    },
    {
      id: 'COMP-102',
      farmer: 'Anh Minh Cao Lãnh',
      productName: 'Xoài Cát Hòa Lộc Loại 1 Cao Lãnh',
      image: 'https://res.cloudinary.com/zdavpzw2/image/upload/v1791068896/agriagent_ai/tr%C3%A1i_c%C3%A2y/xoai.jpg',
      weight: '12 kg',
      price: '30.000đ / kg',
      totalPrice: '375.000đ',
      completedDate: '20/09/2026',
      isRated: false
    }
  ];
}
