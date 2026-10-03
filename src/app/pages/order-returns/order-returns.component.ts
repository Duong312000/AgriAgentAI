import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { OrderService } from '../../services/order.service';

@Component({
  selector: 'app-order-returns',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div style="background-color: #f5f5f5; min-height: 100vh; padding-bottom: 80px; box-sizing: border-box;">
      <!-- Shopee / Lazada Top Bar Header -->
      <div style="position: sticky; top: 0; z-index: 100; background: #ffffff; border-bottom: 1px solid #e5e5e5; padding: 12px 16px; display: flex; align-items: center; justify-content: space-between;">
        <a routerLink="/profile" style="display: flex; align-items: center; justify-content: center; width: 36px; height: 36px; border-radius: 50%; color: #333333; text-decoration: none; font-size: 18px;">
          <i class="fa-solid fa-chevron-left"></i>
        </a>
        <h1 style="font-size: 17px; font-weight: 700; color: #222222; margin: 0;">Trả Hàng / Hoàn Tiền</h1>
        <a routerLink="/chat-staff" style="color: #555555; font-size: 18px; text-decoration: none;">
          <i class="fa-regular fa-circle-question"></i>
        </a>
      </div>

      <!-- Shopee Tab Horizontal Scroll Bar -->
      <div style="display: flex; background: #ffffff; border-bottom: 1px solid #eeeeee; overflow-x: auto; position: sticky; top: 61px; z-index: 99;">
        <button (click)="activeTab = 'all'" [style.color]="activeTab === 'all' ? '#769f2e' : '#555555'" [style.borderBottom]="activeTab === 'all' ? '2.5px solid #769f2e' : '2.5px solid transparent'" style="flex: 1; min-width: 100px; padding: 12px 8px; background: transparent; border: none; font-size: 13px; font-weight: 700; cursor: pointer; text-align: center; white-space: nowrap;">
          Tất cả ({{ returns.length }})
        </button>
        <button (click)="activeTab = 'processing'" [style.color]="activeTab === 'processing' ? '#769f2e' : '#555555'" [style.borderBottom]="activeTab === 'processing' ? '2.5px solid #769f2e' : '2.5px solid transparent'" style="flex: 1; min-width: 120px; padding: 12px 8px; background: transparent; border: none; font-size: 13px; font-weight: 700; cursor: pointer; text-align: center; white-space: nowrap;">
          Đang xử lý
        </button>
        <button (click)="activeTab = 'refunded'" [style.color]="activeTab === 'refunded' ? '#769f2e' : '#555555'" [style.borderBottom]="activeTab === 'refunded' ? '2.5px solid #769f2e' : '2.5px solid transparent'" style="flex: 1; min-width: 120px; padding: 12px 8px; background: transparent; border: none; font-size: 13px; font-weight: 700; cursor: pointer; text-align: center; white-space: nowrap;">
          Đã hoàn tiền
        </button>
      </div>

      <!-- Empty State -->
      <div *ngIf="filteredReturns.length === 0" style="text-align: center; padding: 40px 20px; color: #888;">
        <i class="fa-solid fa-arrow-rotate-left" style="font-size: 48px; color: #ccc; margin-bottom: 12px;"></i>
        <p style="font-size: 14px; font-weight: 600;">Không có yêu cầu trả hàng/hoàn tiền nào</p>
      </div>

      <!-- Returns Order List -->
      <div style="padding: 12px 14px; display: flex; flex-direction: column; gap: 12px;">
        <div *ngFor="let item of filteredReturns" style="background: #ffffff; border-radius: 12px; padding: 14px; box-shadow: 0 1px 4px rgba(0,0,0,0.04); border: 1px solid #eeeeee;">
          <!-- Shop Header -->
          <div style="display: flex; justify-content: space-between; align-items: center; padding-bottom: 10px; border-bottom: 1px solid #f5f5f5; margin-bottom: 12px;">
            <div style="display: flex; align-items: center; gap: 6px; font-size: 13px; font-weight: 700; color: #222222;">
              <i class="fa-solid fa-store" style="color: #769f2e;"></i>
              <span>{{ getFarmerName(item) }}</span>
            </div>
            <span [style.color]="getStatusColor(item.status)" style="font-size: 12px; font-weight: 700;">
              {{ getStatusLabel(item.status) }}
            </span>
          </div>

          <!-- Product Details -->
          <div style="display: flex; gap: 12px; margin-bottom: 12px;">
            <img [src]="getReturnProductImage(item)" [alt]="getReturnProductName(item)" style="width: 75px; height: 75px; border-radius: 8px; object-fit: cover; border: 1px solid #f0f0f0;">
            <div style="flex: 1;">
              <h3 style="font-size: 14px; font-weight: 700; color: #222222; margin: 0 0 6px 0;">{{ getReturnProductName(item) }}</h3>
              <div style="font-size: 12px; color: #ee4d2d; font-weight: 600; margin-bottom: 4px;">
                <i class="fa-solid fa-circle-exclamation"></i> Lý do: {{ item.reason }}
              </div>
              <div style="font-size: 11px; color: #888888;">Mã yêu cầu: {{ item.returnCode }} · {{ item.createdAt | date:'dd/MM/yyyy' }}</div>
            </div>
          </div>

          <!-- Refund Summary Footer -->
          <div style="display: flex; justify-content: space-between; align-items: center; padding-top: 10px; border-top: 1px solid #f8f8f8;">
            <div>
              <span style="font-size: 12px; color: #666666;">Số tiền hoàn lại: </span>
              <span style="font-size: 16px; font-weight: 800; color: #16a34a;">{{ item.refundAmount | number:'1.0-0' }}đ</span>
            </div>
            <a routerLink="/chat-staff" style="background: #ffffff; border: 1px solid #cccccc; color: #444444; padding: 7px 14px; border-radius: 6px; font-size: 12px; font-weight: 700; text-decoration: none;">
              Chi Tiết Hoàn Tiền
            </a>
          </div>
        </div>
      </div>
    </div>
  `
})
export class OrderReturnsComponent implements OnInit {
  activeTab: 'all' | 'processing' | 'refunded' = 'all';
  returns: any[] = [];

  constructor(private orderService: OrderService) {}

  ngOnInit(): void {
    this.orderService.getReturnRequests().subscribe({
      next: (res) => {
        if (res.success) {
          this.returns = res.data;
        }
      },
      error: (err) => console.error('Lỗi khi tải yêu cầu trả hàng:', err)
    });
  }

  get filteredReturns(): any[] {
    if (this.activeTab === 'processing') {
      return this.returns.filter(r => r.status === 'PENDING');
    }
    if (this.activeTab === 'refunded') {
      return this.returns.filter(r => r.status === 'APPROVED' || r.status === 'REFUNDED');
    }
    return this.returns;
  }

  getFarmerName(item: any): string {
    if (item?.orderId?.farmerId?.fullName) {
      return item.orderId.farmerId.fullName;
    }
    return 'Chú Bảy Bến Tre';
  }

  getReturnProductName(item: any): string {
    const firstItem = item?.orderId?.items?.[0];
    if (firstItem?.productId?.name) return firstItem.productId.name;
    if (firstItem?.productName) return firstItem.productName;
    return 'Ổi Vú Sữa Bến Tre';
  }

  getReturnProductImage(item: any): string {
    const firstItem = item?.orderId?.items?.[0];
    if (firstItem?.productId?.images?.length > 0) return firstItem.productId.images[0];
    return 'https://res.cloudinary.com/zdavpzw2/image/upload/v1791068891/agriagent_ai/tr%C3%A1i_c%C3%A2y/oi.jpg';
  }

  getStatusLabel(status: string): string {
    switch (status) {
      case 'PENDING': return 'Đang Xét Duyệt';
      case 'APPROVED': return 'Đã Duyệt Hoàn Tiền';
      case 'REFUNDED': return 'Hoàn Tiền Thành Công';
      case 'REJECTED': return 'Từ Chối';
      default: return status;
    }
  }

  getStatusColor(status: string): string {
    switch (status) {
      case 'PENDING': return '#d97706';
      case 'APPROVED':
      case 'REFUNDED': return '#16a34a';
      case 'REJECTED': return '#ef4444';
      default: return '#555555';
    }
  }
}
