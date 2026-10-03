import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

interface ReturnRequest {
  id: string;
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
    <div style="padding: 20px 20px 80px 20px; background-color: #f8f8f8; min-height: 100vh; box-sizing: border-box;">
      <!-- Header -->
      <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 20px;">
        <a routerLink="/profile" style="display: inline-flex; align-items: center; gap: 8px; background: #ffffff; border: 1px solid #e2e8f0; border-radius: 20px; padding: 8px 16px; color: #505050; font-size: 14px; font-weight: 600; text-decoration: none; box-shadow: 0 1px 3px rgba(0,0,0,0.03);">
          <i class="fa-solid fa-chevron-left" style="font-size: 12px;"></i>
          <span>Quay lại</span>
        </a>
        <h2 style="font-size: 18px; font-weight: 800; color: #2d4612; margin: 0;">Trả hàng / Hoàn tiền</h2>
        <div style="width: 80px;"></div>
      </div>

      <!-- Filter Tabs -->
      <div style="display: flex; background: #ffffff; border-radius: 14px; padding: 4px; margin-bottom: 20px; box-shadow: 0 2px 8px rgba(0,0,0,0.04);">
        <button (click)="activeTab = 'all'" [style.background]="activeTab === 'all' ? '#88ad37' : 'transparent'" [style.color]="activeTab === 'all' ? '#ffffff' : '#64748b'" style="flex: 1; border: none; padding: 10px; border-radius: 10px; font-size: 13px; font-weight: 700; cursor: pointer; transition: all 0.2s;">
          Tất cả (2)
        </button>
        <button (click)="activeTab = 'processing'" [style.background]="activeTab === 'processing' ? '#88ad37' : 'transparent'" [style.color]="activeTab === 'processing' ? '#ffffff' : '#64748b'" style="flex: 1; border: none; padding: 10px; border-radius: 10px; font-size: 13px; font-weight: 700; cursor: pointer; transition: all 0.2s;">
          Đang xử lý (1)
        </button>
        <button (click)="activeTab = 'refunded'" [style.background]="activeTab === 'refunded' ? '#88ad37' : 'transparent'" [style.color]="activeTab === 'refunded' ? '#ffffff' : '#64748b'" style="flex: 1; border: none; padding: 10px; border-radius: 10px; font-size: 13px; font-weight: 700; cursor: pointer; transition: all 0.2s;">
          Đã hoàn tiền (1)
        </button>
      </div>

      <!-- Returns List -->
      <div style="display: flex; flex-direction: column; gap: 16px;">
        <div *ngFor="let item of filteredReturns" style="background: #ffffff; border-radius: 16px; padding: 16px; box-shadow: 0 2px 10px rgba(0,0,0,0.04); border: 1px solid #e2e8f0;">
          <div style="display: flex; justify-content: space-between; align-items: center; padding-bottom: 12px; border-bottom: 1px solid #f1f5f9; margin-bottom: 12px;">
            <span style="font-size: 13px; font-weight: 700; color: #64748b;">Mã yêu cầu: {{item.id}}</span>
            <span [style.background]="item.statusBg" [style.color]="item.statusColor" style="font-size: 12px; font-weight: 700; padding: 4px 10px; border-radius: 12px;">
              {{item.status}}
            </span>
          </div>

          <div style="display: flex; gap: 14px; margin-bottom: 12px;">
            <img [src]="item.image" [alt]="item.productName" style="width: 66px; height: 66px; border-radius: 12px; object-fit: cover;">
            <div style="flex: 1;">
              <h4 style="font-size: 15px; font-weight: 700; color: #1e293b; margin: 0 0 4px 0;">{{item.productName}}</h4>
              <div style="font-size: 13px; color: #ef4444; font-weight: 600; margin-bottom: 4px;">Lý do: {{item.reason}}</div>
              <div style="font-size: 12px; color: #94a3b8;">Ngày yêu cầu: {{item.date}}</div>
            </div>
          </div>

          <div style="display: flex; justify-content: space-between; align-items: center; padding-top: 12px; border-top: 1px dashed #e2e8f0;">
            <div>
              <span style="font-size: 12px; color: #64748b;">Số tiền hoàn: </span>
              <span style="font-size: 16px; font-weight: 800; color: #16a34a;">{{item.refundAmount}}</span>
            </div>
            <a routerLink="/chat-staff" style="background: #f1f5f9; color: #334155; padding: 8px 14px; border-radius: 10px; font-size: 13px; font-weight: 700; text-decoration: none;">Hỗ trợ Trả hàng</a>
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
      productName: 'Ổi Vú Sữa Bến Tre (5 kg)',
      image: 'assets/image/Trái cây/oi.jpg',
      refundAmount: '125.000đ',
      reason: 'Trái cây bị dập trong khi chuyển hàng',
      status: 'Đang xem xét',
      statusBg: '#fef9c3',
      statusColor: '#ca8a04',
      date: '01/10/2026'
    },
    {
      id: 'RET-7719',
      productName: 'Thanh Long Ruột Đỏ (10 kg)',
      image: 'assets/image/Trái cây/thanh long.jpg',
      refundAmount: '200.000đ',
      reason: 'Giao nhầm số lượng nông sản',
      status: 'Đã hoàn tiền thành công',
      statusBg: '#dcfce7',
      statusColor: '#16a34a',
      date: '25/09/2026'
    }
  ];

  get filteredReturns(): ReturnRequest[] {
    if (this.activeTab === 'processing') {
      return this.returns.filter(r => r.status === 'Đang xem xét');
    }
    if (this.activeTab === 'refunded') {
      return this.returns.filter(r => r.status === 'Đã hoàn tiền thành công');
    }
    return this.returns;
  }
}
