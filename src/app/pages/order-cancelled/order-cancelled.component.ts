import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

interface CancelledOrder {
  id: string;
  farmer: string;
  productName: string;
  image: string;
  weight: string;
  totalPrice: string;
  cancelReason: string;
  cancelledBy: string;
  cancelDate: string;
}

@Component({
  selector: 'app-order-cancelled',
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
        <h2 style="font-size: 18px; font-weight: 800; color: #2d4612; margin: 0;">Đơn đã hủy</h2>
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
            <span style="font-size: 12px; font-weight: 700; color: #ef4444; background: #fee2e2; padding: 4px 10px; border-radius: 12px;">
              <i class="fa-solid fa-circle-xmark"></i> Đã hủy
            </span>
          </div>

          <div style="display: flex; gap: 14px; margin-bottom: 14px;">
            <img [src]="item.image" [alt]="item.productName" style="width: 70px; height: 70px; border-radius: 12px; object-fit: cover;">
            <div style="flex: 1;">
              <h4 style="font-size: 15px; font-weight: 700; color: #1e293b; margin: 0 0 4px 0;">{{item.productName}}</h4>
              <div style="font-size: 13px; color: #ef4444; font-weight: 600; margin-bottom: 4px;">Lý do hủy: {{item.cancelReason}}</div>
              <div style="font-size: 12px; color: #94a3b8;">Hủy bởi {{item.cancelledBy}} ngày {{item.cancelDate}}</div>
            </div>
          </div>

          <div style="display: flex; justify-content: space-between; align-items: center; padding-top: 12px; border-top: 1px dashed #e2e8f0;">
            <div>
              <span style="font-size: 12px; color: #64748b;">Tổng giá trị: </span>
              <span style="font-size: 16px; font-weight: 800; color: #64748b; text-decoration: line-through;">{{item.totalPrice}}</span>
            </div>
            <a routerLink="/buyer-home" style="background: #88ad37; color: #ffffff; padding: 8px 16px; border-radius: 10px; font-size: 13px; font-weight: 700; text-decoration: none; box-shadow: 0 2px 8px rgba(136,173,55,0.3);">
              Mua lại đơn này
            </a>
          </div>
        </div>
      </div>
    </div>
  `
})
export class OrderCancelledComponent {
  orders: CancelledOrder[] = [
    {
      id: 'CNC-201',
      farmer: 'Chú Sáu Long An',
      productName: 'Dưa Hấu Long An Ruột Đỏ',
      image: 'assets/image/Trái cây/dua hau.jpg',
      weight: '15 kg',
      totalPrice: '315.000đ',
      cancelReason: 'Đổi ý chọn sản phẩm nông sản khác',
      cancelledBy: 'Người mua',
      cancelDate: '29/09/2026'
    }
  ];
}
