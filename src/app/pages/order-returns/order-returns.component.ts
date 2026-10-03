import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

interface ReturnRequest {
  id: string;
  farmer: string;
  productName: string;
  image: string;
  refundAmount: string;
  reason: string;
  status: string;
  statusBg: string;
  statusColor: string;
  date: string;
}

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
          Tất cả (2)
        </button>
        <button (click)="activeTab = 'processing'" [style.color]="activeTab === 'processing' ? '#769f2e' : '#555555'" [style.borderBottom]="activeTab === 'processing' ? '2.5px solid #769f2e' : '2.5px solid transparent'" style="flex: 1; min-width: 120px; padding: 12px 8px; background: transparent; border: none; font-size: 13px; font-weight: 700; cursor: pointer; text-align: center; white-space: nowrap;">
          Đang xử lý (1)
        </button>
        <button (click)="activeTab = 'refunded'" [style.color]="activeTab === 'refunded' ? '#769f2e' : '#555555'" [style.borderBottom]="activeTab === 'refunded' ? '2.5px solid #769f2e' : '2.5px solid transparent'" style="flex: 1; min-width: 120px; padding: 12px 8px; background: transparent; border: none; font-size: 13px; font-weight: 700; cursor: pointer; text-align: center; white-space: nowrap;">
          Đã hoàn tiền (1)
        </button>
      </div>

      <!-- Returns Order List -->
      <div style="padding: 12px 14px; display: flex; flex-direction: column; gap: 12px;">
        <div *ngFor="let item of filteredReturns" style="background: #ffffff; border-radius: 5%; padding: 14px; box-shadow: 0 1px 4px rgba(0,0,0,0.04); border: 1px solid #eeeeee;">
          <!-- Shop Header -->
          <div style="display: flex; justify-content: space-between; align-items: center; padding-bottom: 10px; border-bottom: 1px solid #f5f5f5; margin-bottom: 12px;">
            <div style="display: flex; align-items: center; gap: 6px; font-size: 13px; font-weight: 700; color: #222222;">
              <i class="fa-solid fa-store" style="color: #769f2e;"></i>
              <span>{{item.farmer}}</span>
            </div>
            <span [style.color]="item.statusColor" style="font-size: 12px; font-weight: 700;">
              {{item.status}}
            </span>
          </div>

          <!-- Product Details -->
          <div style="display: flex; gap: 12px; margin-bottom: 12px;">
            <img [src]="item.image" [alt]="item.productName" style="width: 75px; height: 75px; border-radius: 5%; object-fit: cover; border: 1px solid #f0f0f0;">
            <div style="flex: 1;">
              <h3 style="font-size: 14px; font-weight: 700; color: #222222; margin: 0 0 6px 0;">{{item.productName}}</h3>
              <div style="font-size: 12px; color: #ee4d2d; font-weight: 600; margin-bottom: 4px;">
                <i class="fa-solid fa-circle-exclamation"></i> Lý do: {{item.reason}}
              </div>
              <div style="font-size: 11px; color: #888888;">Mã yêu cầu: {{item.id}} · {{item.date}}</div>
            </div>
          </div>

          <!-- Refund Summary Footer -->
          <div style="display: flex; justify-content: space-between; align-items: center; padding-top: 10px; border-top: 1px solid #f8f8f8;">
            <div>
              <span style="font-size: 12px; color: #666666;">Số tiền hoàn lại: </span>
              <span style="font-size: 16px; font-weight: 800; color: #16a34a;">{{item.refundAmount}}</span>
            </div>
            <a routerLink="/chat-staff" style="background: #ffffff; border: 1px solid #cccccc; color: #444444; padding: 7px 14px; border-radius: 5%; font-size: 12px; font-weight: 700; text-decoration: none;">
              Chi Tiết Hoàn Tiền
            </a>
          </div>
        </div>
      </div>
    </div>
  `
})
export class OrderReturnsComponent {
  activeTab: 'all' | 'processing' | 'refunded' = 'all';

  returns: ReturnRequest[] = [
    {
      id: 'RET-8821',
      farmer: 'Chú Bảy Bến Tre',
      productName: 'Ổi Vú Sữa Bến Tre Giòn Ngọt',
      image: 'assets/image/Trái cây/oi.jpg',
      refundAmount: '125.000đ',
      reason: 'Bị móp dập quá 30% khi vận chuyển',
      status: 'Đang Xét Duyệt',
      statusBg: '#fef9c3',
      statusColor: '#d97706',
      date: '01/10/2026'
    },
    {
      id: 'RET-7719',
      farmer: 'Anh Tuấn Tiền Giang',
      productName: 'Thanh Long Ruột Đỏ Chợ Gạo',
      image: 'assets/image/Trái cây/thanh long.jpg',
      refundAmount: '200.000đ',
      reason: 'Giao thiếu khối lượng đặt mua',
      status: 'Hoàn Tiền Thành Công',
      statusBg: '#dcfce7',
      statusColor: '#16a34a',
      date: '25/09/2026'
    }
  ];

  get filteredReturns(): ReturnRequest[] {
    if (this.activeTab === 'processing') {
      return this.returns.filter(r => r.status === 'Đang Xét Duyệt');
    }
    if (this.activeTab === 'refunded') {
      return this.returns.filter(r => r.status === 'Hoàn Tiền Thành Công');
    }
    return this.returns;
  }
}
