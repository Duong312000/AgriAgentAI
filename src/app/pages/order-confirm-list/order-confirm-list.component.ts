import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

interface OrderItem {
  id: string;
  farmer: string;
  isMall?: boolean;
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
    <div style="background-color: #f5f5f5; min-height: 100vh; padding-bottom: 80px; box-sizing: border-box;">
      <!-- Shopee / Lazada Top Navigation Bar -->
      <div style="position: sticky; top: 0; z-index: 100; background: #ffffff; border-bottom: 1px solid #e5e5e5; padding: 12px 16px; display: flex; align-items: center; justify-content: space-between;">
        <a routerLink="/profile" style="display: flex; align-items: center; justify-content: center; width: 36px; height: 36px; border-radius: 50%; color: #333333; text-decoration: none; font-size: 18px;">
          <i class="fa-solid fa-chevron-left"></i>
        </a>
        <h1 style="font-size: 17px; font-weight: 700; color: #222222; margin: 0;">Đơn Hàng Chờ Xác Nhận</h1>
        <a routerLink="/chat-list" style="color: #555555; font-size: 18px; text-decoration: none;">
          <i class="fa-regular fa-comment-dots"></i>
        </a>
      </div>

      <!-- Shopee Tab Horizontal Scroll Bar -->
      <div style="display: flex; background: #ffffff; border-bottom: 1px solid #eeeeee; overflow-x: auto; position: sticky; top: 61px; z-index: 99;">
        <button (click)="activeTab = 'all'" [style.color]="activeTab === 'all' ? '#769f2e' : '#555555'" [style.borderBottom]="activeTab === 'all' ? '2.5px solid #769f2e' : '2.5px solid transparent'" style="flex: 1; min-width: 100px; padding: 12px 8px; background: transparent; border: none; font-size: 13px; font-weight: 700; cursor: pointer; text-align: center; white-space: nowrap;">
          Tất cả (2)
        </button>
        <button (click)="activeTab = 'pending'" [style.color]="activeTab === 'pending' ? '#769f2e' : '#555555'" [style.borderBottom]="activeTab === 'pending' ? '2.5px solid #769f2e' : '2.5px solid transparent'" style="flex: 1; min-width: 120px; padding: 12px 8px; background: transparent; border: none; font-size: 13px; font-weight: 700; cursor: pointer; text-align: center; white-space: nowrap;">
          Chờ xác nhận (1)
        </button>
        <button (click)="activeTab = 'preparing'" [style.color]="activeTab === 'preparing' ? '#769f2e' : '#555555'" [style.borderBottom]="activeTab === 'preparing' ? '2.5px solid #769f2e' : '2.5px solid transparent'" style="flex: 1; min-width: 120px; padding: 12px 8px; background: transparent; border: none; font-size: 13px; font-weight: 700; cursor: pointer; text-align: center; white-space: nowrap;">
          Đang chuẩn bị (1)
        </button>
      </div>

      <!-- Order Cards List -->
      <div style="padding: 12px 14px; display: flex; flex-direction: column; gap: 12px;">
        <div *ngFor="let order of filteredOrders" style="background: #ffffff; border-radius: 5%; padding: 14px; box-shadow: 0 1px 4px rgba(0,0,0,0.04); border: 1px solid #eeeeee;">
          <!-- Shop Header -->
          <div style="display: flex; justify-content: space-between; align-items: center; padding-bottom: 10px; border-bottom: 1px solid #f5f5f5; margin-bottom: 12px;">
            <div style="display: flex; align-items: center; gap: 6px; font-size: 13px; font-weight: 700; color: #222222;">
              <span style="background: #769f2e; color: #ffffff; font-size: 10px; padding: 2px 6px; border-radius: 5%; font-weight: 800;">Chính gốc</span>
              <span>{{order.farmer}}</span>
              <i class="fa-solid fa-chevron-right" style="font-size: 10px; color: #888888;"></i>
            </div>
            <span style="font-size: 12px; font-weight: 700; color: #d97706;">
              {{order.status}}
            </span>
          </div>

          <!-- Product Body -->
          <div style="display: flex; gap: 12px; margin-bottom: 12px;">
            <img [src]="order.image" [alt]="order.productName" style="width: 75px; height: 75px; border-radius: 5%; object-fit: cover; border: 1px solid #f0f0f0;">
            <div style="flex: 1;">
              <h3 style="font-size: 14px; font-weight: 700; color: #222222; margin: 0 0 6px 0; line-height: 1.3;">{{order.productName}}</h3>
              <div style="font-size: 12px; color: #777777; margin-bottom: 4px;">Phân loại: Tươi ngọt nguyên cành</div>
              <div style="display: flex; justify-content: space-between; align-items: center;">
                <span style="font-size: 12px; color: #888888;">x{{order.weight}}</span>
                <span style="font-size: 14px; font-weight: 700; color: #769f2e;">{{order.price}}</span>
              </div>
            </div>
          </div>

          <!-- Total Footer -->
          <div style="text-align: right; padding-top: 10px; border-top: 1px solid #f8f8f8; font-size: 13px; color: #444444; margin-bottom: 12px;">
            <span>1 sản phẩm · Thành tiền: </span>
            <span style="font-size: 16px; font-weight: 800; color: #ee4d2d;">{{order.totalPrice}}</span>
          </div>

          <!-- Action Buttons Bar -->
          <div style="display: flex; justify-content: flex-end; gap: 8px;">
            <a routerLink="/chat-staff" style="background: #ffffff; border: 1px solid #cccccc; color: #444444; padding: 7px 14px; border-radius: 5%; font-size: 12px; font-weight: 700; text-decoration: none;">
              Liên Hệ Người Bán
            </a>
            <a routerLink="/order-tracking" style="background: #769f2e; color: #ffffff; padding: 8px 16px; border-radius: 5%; font-size: 12px; font-weight: 700; text-decoration: none; box-shadow: 0 2px 6px rgba(118,159,46,0.3);">
              Theo Dõi Đơn
            </a>
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
      productName: 'Vải Thiều Lục Ngạn Hái Tại Vườn',
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
      productName: 'Chôm Chôm Thái Vĩnh Long Róc Hạt',
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
