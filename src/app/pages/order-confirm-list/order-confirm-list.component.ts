import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

interface OrderItem {
  id: string;
  farmer: string;
  productName: string;
  image: string;
  weight: string;
  price: string;
  totalPrice: string;
  status: string;
  date: string;
}

@Component({
  selector: 'app-order-confirm-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div style="padding: 20px 20px 80px 20px; background-color: #f8f8f8; min-height: 100vh; box-sizing: border-box;">
      <!-- Top Bar Header -->
      <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 20px;">
        <a routerLink="/profile" style="display: inline-flex; align-items: center; gap: 8px; background: #ffffff; border: 1px solid #e2e8f0; border-radius: 20px; padding: 8px 16px; color: #505050; font-size: 14px; font-weight: 600; text-decoration: none; box-shadow: 0 1px 3px rgba(0,0,0,0.03);">
          <i class="fa-solid fa-chevron-left" style="font-size: 12px;"></i>
          <span>Quay lại</span>
        </a>
        <h2 style="font-size: 18px; font-weight: 800; color: #2d4612; margin: 0;">Xác nhận đơn hàng</h2>
        <div style="width: 80px;"></div>
      </div>

      <!-- Filter Tabs (Shopee/Lazada style) -->
      <div style="display: flex; background: #ffffff; border-radius: 14px; padding: 4px; margin-bottom: 20px; box-shadow: 0 2px 8px rgba(0,0,0,0.04);">
        <button (click)="activeTab = 'all'" [style.background]="activeTab === 'all' ? '#88ad37' : 'transparent'" [style.color]="activeTab === 'all' ? '#ffffff' : '#64748b'" style="flex: 1; border: none; padding: 10px; border-radius: 10px; font-size: 13px; font-weight: 700; cursor: pointer; transition: all 0.2s;">
          Tất cả (2)
        </button>
        <button (click)="activeTab = 'pending'" [style.background]="activeTab === 'pending' ? '#88ad37' : 'transparent'" [style.color]="activeTab === 'pending' ? '#ffffff' : '#64748b'" style="flex: 1; border: none; padding: 10px; border-radius: 10px; font-size: 13px; font-weight: 700; cursor: pointer; transition: all 0.2s;">
          Chờ xác nhận (1)
        </button>
        <button (click)="activeTab = 'preparing'" [style.background]="activeTab === 'preparing' ? '#88ad37' : 'transparent'" [style.color]="activeTab === 'preparing' ? '#ffffff' : '#64748b'" style="flex: 1; border: none; padding: 10px; border-radius: 10px; font-size: 13px; font-weight: 700; cursor: pointer; transition: all 0.2s;">
          Đang chuẩn bị (1)
        </button>
      </div>

      <!-- Orders List -->
      <div style="display: flex; flex-direction: column; gap: 16px;">
        <div *ngFor="let order of filteredOrders" style="background: #ffffff; border-radius: 16px; padding: 16px; box-shadow: 0 2px 10px rgba(0,0,0,0.04); border: 1px solid #e2e8f0;">
          <div style="display: flex; justify-content: space-between; align-items: center; padding-bottom: 12px; border-bottom: 1px solid #f1f5f9; margin-bottom: 12px;">
            <div style="display: flex; align-items: center; gap: 8px; font-size: 14px; font-weight: 700; color: #1e293b;">
              <i class="fa-solid fa-store" style="color: #769f2e;"></i>
              <span>{{order.farmer}}</span>
            </div>
            <span style="font-size: 12px; font-weight: 700; color: #eab308; background: #fef9c3; padding: 4px 10px; border-radius: 12px;">
              {{order.status}}
            </span>
          </div>

          <div style="display: flex; gap: 14px; margin-bottom: 14px;">
            <img [src]="order.image" [alt]="order.productName" style="width: 70px; height: 70px; border-radius: 12px; object-fit: cover;">
            <div style="flex: 1;">
              <h4 style="font-size: 15px; font-weight: 700; color: #1e293b; margin: 0 0 6px 0;">{{order.productName}}</h4>
              <div style="font-size: 13px; color: #64748b; margin-bottom: 4px;">Số lượng: {{order.weight}}</div>
              <div style="font-size: 13px; font-weight: 600; color: #769f2e;">{{order.price}}</div>
            </div>
          </div>

          <div style="display: flex; justify-content: space-between; align-items: center; padding-top: 12px; border-top: 1px dashed #e2e8f0;">
            <div>
              <span style="font-size: 12px; color: #64748b;">Tổng số tiền: </span>
              <span style="font-size: 16px; font-weight: 800; color: #dc2626;">{{order.totalPrice}}</span>
            </div>
            <div style="display: flex; gap: 8px;">
              <a routerLink="/chat-staff" style="background: #f1f5f9; color: #475569; padding: 8px 14px; border-radius: 10px; font-size: 13px; font-weight: 700; text-decoration: none;">Liên hệ</a>
              <a routerLink="/order-tracking" style="background: #88ad37; color: #ffffff; padding: 8px 14px; border-radius: 10px; font-size: 13px; font-weight: 700; text-decoration: none;">Xem tiến trình</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  `
})
export class OrderConfirmListComponent {
  activeTab: 'all' | 'pending' | 'preparing' = 'all';

  orders: OrderItem[] = [
    {
      id: 'ORD-001',
      farmer: 'Bác Hùng Bắc Giang',
      productName: 'Vải Thiều Lục Ngạn',
      image: 'assets/image/Trái cây/vai.jpg',
      weight: '10 kg',
      price: '27.000đ / kg',
      totalPrice: '285.000đ',
      status: 'Chờ xác nhận đơn',
      date: '03/10/2026'
    },
    {
      id: 'ORD-002',
      farmer: 'Chú Thành Đồng Tháp',
      productName: 'Chôm Chôm Thái Vĩnh Long',
      image: 'assets/image/Trái cây/chom chom ban.jpg',
      weight: '5 kg',
      price: '34.000đ / kg',
      totalPrice: '185.000đ',
      status: 'Đang chuẩn bị hàng',
      date: '02/10/2026'
    }
  ];

  get filteredOrders(): OrderItem[] {
    if (this.activeTab === 'pending') {
      return this.orders.filter(o => o.status === 'Chờ xác nhận đơn');
    }
    if (this.activeTab === 'preparing') {
      return this.orders.filter(o => o.status === 'Đang chuẩn bị hàng');
    }
    return this.orders;
  }
}
