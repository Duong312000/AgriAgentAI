import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { OrderService, Order } from '../../services/order.service';

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
          Tất cả ({{ orders.length }})
        </button>
        <button (click)="activeTab = 'pending'" [style.color]="activeTab === 'pending' ? '#769f2e' : '#555555'" [style.borderBottom]="activeTab === 'pending' ? '2.5px solid #769f2e' : '2.5px solid transparent'" style="flex: 1; min-width: 120px; padding: 12px 8px; background: transparent; border: none; font-size: 13px; font-weight: 700; cursor: pointer; text-align: center; white-space: nowrap;">
          Chờ xác nhận
        </button>
        <button (click)="activeTab = 'preparing'" [style.color]="activeTab === 'preparing' ? '#769f2e' : '#555555'" [style.borderBottom]="activeTab === 'preparing' ? '2.5px solid #769f2e' : '2.5px solid transparent'" style="flex: 1; min-width: 120px; padding: 12px 8px; background: transparent; border: none; font-size: 13px; font-weight: 700; cursor: pointer; text-align: center; white-space: nowrap;">
          Đang giao/Chuẩn bị
        </button>
      </div>

      <!-- Empty State -->
      <div *ngIf="filteredOrders.length === 0" style="text-align: center; padding: 40px 20px; color: #888;">
        <i class="fa-solid fa-box-open" style="font-size: 48px; color: #ccc; margin-bottom: 12px;"></i>
        <p style="font-size: 14px; font-weight: 600;">Chưa có đơn hàng nào trong mục này</p>
      </div>

      <!-- Order Cards List -->
      <div style="padding: 12px 14px; display: flex; flex-direction: column; gap: 12px;">
        <div *ngFor="let order of filteredOrders" style="background: #ffffff; border-radius: 12px; padding: 14px; box-shadow: 0 1px 4px rgba(0,0,0,0.04); border: 1px solid #eeeeee;">
          <!-- Shop Header -->
          <div style="display: flex; justify-content: space-between; align-items: center; padding-bottom: 10px; border-bottom: 1px solid #f5f5f5; margin-bottom: 12px;">
            <div style="display: flex; align-items: center; gap: 6px; font-size: 13px; font-weight: 700; color: #222222;">
              <span style="background: #769f2e; color: #ffffff; font-size: 10px; padding: 2px 6px; border-radius: 4px; font-weight: 800;">Chính gốc</span>
              <span>{{ getFarmerName(order) }}</span>
              <i class="fa-solid fa-chevron-right" style="font-size: 10px; color: #888888;"></i>
            </div>
            <span style="font-size: 12px; font-weight: 700; color: #d97706;">
              {{ getStatusLabel(order.status) }}
            </span>
          </div>

          <!-- Product Body -->
          <div style="display: flex; gap: 12px; margin-bottom: 12px;" *ngFor="let item of order.items">
            <img [src]="getItemImage(item)" [alt]="getItemName(item)" style="width: 75px; height: 75px; border-radius: 8px; object-fit: cover; border: 1px solid #f0f0f0;">
            <div style="flex: 1;">
              <h3 style="font-size: 14px; font-weight: 700; color: #222222; margin: 0 0 6px 0; line-height: 1.3;">{{ getItemName(item) }}</h3>
              <div style="font-size: 12px; color: #777777; margin-bottom: 4px;">Mã đơn: {{ order.orderCode }}</div>
              <div style="display: flex; justify-content: space-between; align-items: center;">
                <span style="font-size: 12px; color: #888888;">Số lượng: {{ item.quantity }}</span>
                <span style="font-size: 14px; font-weight: 700; color: #769f2e;">{{ item.unitPrice | number:'1.0-0' }}đ</span>
              </div>
            </div>
          </div>

          <!-- Total Footer -->
          <div style="text-align: right; padding-top: 10px; border-top: 1px solid #f8f8f8; font-size: 13px; color: #444444; margin-bottom: 12px;">
            <span>Thành tiền: </span>
            <span style="font-size: 16px; font-weight: 800; color: #ee4d2d;">{{ order.totalAmount | number:'1.0-0' }}đ</span>
          </div>

          <!-- Action Buttons Bar -->
          <div style="display: flex; justify-content: flex-end; gap: 8px;">
            <a routerLink="/chat-staff" style="background: #ffffff; border: 1px solid #cccccc; color: #444444; padding: 7px 14px; border-radius: 6px; font-size: 12px; font-weight: 700; text-decoration: none;">
              Liên Hệ Người Bán
            </a>
            <a [routerLink]="['/order-tracking']" [queryParams]="{ code: order.orderCode }" style="background: #769f2e; color: #ffffff; padding: 8px 16px; border-radius: 6px; font-size: 12px; font-weight: 700; text-decoration: none; box-shadow: 0 2px 6px rgba(118,159,46,0.3);">
              Theo Dõi Đơn
            </a>
          </div>
        </div>
      </div>
    </div>
  `
})
export class OrderConfirmListComponent implements OnInit {
  activeTab: 'all' | 'pending' | 'preparing' = 'all';
  orders: Order[] = [];

  constructor(private orderService: OrderService) {}

  ngOnInit(): void {
    this.orderService.getOrders().subscribe({
      next: (res) => {
        if (res.success) {
          this.orders = res.data;
        }
      },
      error: (err) => console.error('Lỗi tải danh sách đơn:', err)
    });
  }

  get filteredOrders(): Order[] {
    if (this.activeTab === 'pending') {
      return this.orders.filter(o => o.status === 'PENDING');
    }
    if (this.activeTab === 'preparing') {
      return this.orders.filter(o => o.status === 'CONFIRMED' || o.status === 'SHIPPING');
    }
    return this.orders;
  }

  getFarmerName(order: Order): string {
    if (typeof order.farmerId === 'object' && order.farmerId?.fullName) {
      return order.farmerId.fullName;
    }
    return 'Nhà vườn Nông Thương';
  }

  getItemName(item: any): string {
    if (typeof item.productId === 'object' && item.productId?.name) {
      return item.productId.name;
    }
    return item.productName || 'Nông sản';
  }

  getItemImage(item: any): string {
    if (typeof item.productId === 'object' && item.productId?.images?.length > 0) {
      return item.productId.images[0];
    }
    return 'https://res.cloudinary.com/zdavpzw2/image/upload/v1791068891/agriagent_ai/tr%C3%A1i_c%C3%A2y/oi.jpg';
  }

  getStatusLabel(status: string): string {
    switch (status) {
      case 'PENDING': return 'Chờ xác nhận đơn';
      case 'CONFIRMED': return 'Đang chuẩn bị hàng';
      case 'SHIPPING': return 'Đang giao hàng';
      case 'DELIVERED': return 'Đã giao thành công';
      case 'COMPLETED': return 'Đã hoàn thành';
      default: return status;
    }
  }
}
