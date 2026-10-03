import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

interface CompletedOrder {
  id: string;
  farmer: string;
  productName: string;
  image: string;
  weight: string;
  totalPrice: string;
  completedDate: string;
  isRated: boolean;
}

@Component({
  selector: 'app-order-completed',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div style="padding: 20px 20px 80px 20px; background-color: #f8f8f8; min-height: 100vh; box-sizing: border-box;">
      <!-- Header -->
      <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 20px;">
        <a routerLink="/profile" style="display: inline-flex; align-items: center; gap: 8px; background: #ffffff; border: 1px solid #e2e8f0; border-radius: 20px; padding: 8px 16px; color: #505050; font-size: 14px; font-weight: 600; text-decoration: none; box-shadow: 0 1px 3px rgba(0,0,0,0.03);">
          <i class="fa-solid fa-chevron-left" style="font-size: 12px;"></i>
          <span>Quay lại</span>
        </a>
        <h2 style="font-size: 18px; font-weight: 800; color: #2d4612; margin: 0;">Đơn đã hoàn thành</h2>
        <div style="width: 80px;"></div>
      </div>

      <!-- Orders List -->
      <div style="display: flex; flex-direction: column; gap: 16px;">
        <div *ngFor="let item of orders" style="background: #ffffff; border-radius: 16px; padding: 16px; box-shadow: 0 2px 10px rgba(0,0,0,0.04); border: 1px solid #e2e8f0;">
          <div style="display: flex; justify-content: space-between; align-items: center; padding-bottom: 12px; border-bottom: 1px solid #f1f5f9; margin-bottom: 12px;">
            <div style="display: flex; align-items: center; gap: 8px; font-size: 14px; font-weight: 700; color: #1e293b;">
              <i class="fa-solid fa-store" style="color: #769f2e;"></i>
              <span>{{item.farmer}}</span>
            </div>
            <span style="font-size: 12px; font-weight: 700; color: #16a34a; background: #dcfce7; padding: 4px 10px; border-radius: 12px;">
              <i class="fa-solid fa-circle-check"></i> Hoàn thành
            </span>
          </div>

          <div style="display: flex; gap: 14px; margin-bottom: 14px;">
            <img [src]="item.image" [alt]="item.productName" style="width: 70px; height: 70px; border-radius: 12px; object-fit: cover;">
            <div style="flex: 1;">
              <h4 style="font-size: 15px; font-weight: 700; color: #1e293b; margin: 0 0 4px 0;">{{item.productName}}</h4>
              <div style="font-size: 13px; color: #64748b; margin-bottom: 4px;">Khối lượng: {{item.weight}}</div>
              <div style="font-size: 12px; color: #94a3b8;">Giao thành công: {{item.completedDate}}</div>
            </div>
          </div>

          <div style="display: flex; justify-content: space-between; align-items: center; padding-top: 12px; border-top: 1px dashed #e2e8f0;">
            <div>
              <span style="font-size: 12px; color: #64748b;">Tổng tiền: </span>
              <span style="font-size: 16px; font-weight: 800; color: #769f2e;">{{item.totalPrice}}</span>
            </div>
            <div style="display: flex; gap: 8px;">
              <button (click)="item.isRated = true" [style.background]="item.isRated ? '#f1f5f9' : '#fef08a'" [style.color]="item.isRated ? '#94a3b8' : '#854d0e'" style="border: none; padding: 8px 14px; border-radius: 10px; font-size: 13px; font-weight: 700; cursor: pointer;">
                {{item.isRated ? 'Đã đánh giá ★' : 'Đánh giá 5★'}}
              </button>
              <a routerLink="/buyer-home" style="background: #88ad37; color: #ffffff; padding: 8px 14px; border-radius: 10px; font-size: 13px; font-weight: 700; text-decoration: none; box-shadow: 0 2px 8px rgba(136,173,55,0.3);">
                Mua lại
              </a>
            </div>
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
      productName: 'Sầu Riêng Ri6 Chín Cây',
      image: 'assets/image/Trái cây/sau rieng.jpg',
      weight: '8 kg',
      totalPrice: '295.000đ',
      completedDate: '28/09/2026',
      isRated: true
    },
    {
      id: 'COMP-102',
      farmer: 'Anh Minh Cao Lãnh',
      productName: 'Xoài Cát Hòa Lộc',
      image: 'assets/image/Trái cây/xoai.jpg',
      weight: '12 kg',
      totalPrice: '375.000đ',
      completedDate: '20/09/2026',
      isRated: false
    }
  ];
}
