import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

interface Voucher {
  id: string;
  title: string;
  code: string;
  desc: string;
  discount: string;
  minOrder: string;
  expiry: string;
  type: 'ship' | 'discount' | 'combo';
  badgeBg: string;
  icon: string;
}

@Component({
  selector: 'app-my-vouchers',
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
        <h2 style="font-size: 18px; font-weight: 800; color: #2d4612; margin: 0;">Khuyến mãi của tôi</h2>
        <div style="width: 80px;"></div>
      </div>

      <!-- Voucher Input Code Box -->
      <div style="display: flex; gap: 8px; margin-bottom: 20px;">
        <input type="text" placeholder="Nhập mã voucher Nông Thương..." style="flex: 1; height: 46px; background: #ffffff; border: 1px solid #cbd5e1; border-radius: 14px; padding: 0 16px; font-size: 14px; outline: none; box-sizing: border-box;">
        <button style="background-color: #88ad37; color: #ffffff; border: none; padding: 0 20px; border-radius: 14px; font-size: 14px; font-weight: 700; cursor: pointer; box-shadow: 0 4px 10px rgba(136,173,55,0.25);">
          Áp dụng
        </button>
      </div>

      <!-- Voucher Categories Tabs -->
      <div style="display: flex; gap: 8px; overflow-x: auto; margin-bottom: 20px; padding-bottom: 4px;">
        <button (click)="activeTab = 'all'" [style.background]="activeTab === 'all' ? '#769f2e' : '#ffffff'" [style.color]="activeTab === 'all' ? '#ffffff' : '#475569'" style="border: 1px solid #e2e8f0; border-radius: 20px; padding: 8px 16px; font-size: 13px; font-weight: 700; white-space: nowrap; cursor: pointer;">
          Tất cả (4)
        </button>
        <button (click)="activeTab = 'ship'" [style.background]="activeTab === 'ship' ? '#769f2e' : '#ffffff'" [style.color]="activeTab === 'ship' ? '#ffffff' : '#475569'" style="border: 1px solid #e2e8f0; border-radius: 20px; padding: 8px 16px; font-size: 13px; font-weight: 700; white-space: nowrap; cursor: pointer;">
          🚚 Freeship ghép chuyến
        </button>
        <button (click)="activeTab = 'discount'" [style.background]="activeTab === 'discount' ? '#769f2e' : '#ffffff'" [style.color]="activeTab === 'discount' ? '#ffffff' : '#475569'" style="border: 1px solid #e2e8f0; border-radius: 20px; padding: 8px 16px; font-size: 13px; font-weight: 700; white-space: nowrap; cursor: pointer;">
          🏷️ Giảm giá nông sản
        </button>
      </div>

      <!-- Voucher Tickets (Shopee/Lazada style) -->
      <div style="display: flex; flex-direction: column; gap: 14px;">
        <div *ngFor="let item of filteredVouchers" style="display: flex; background: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 14px rgba(0,0,0,0.05); border: 1px solid #e2e8f0; position: relative;">
          <!-- Left Badge -->
          <div [style.background]="item.badgeBg" style="width: 100px; display: flex; flex-direction: column; align-items: center; justify-content: center; color: #ffffff; padding: 12px; text-align: center; position: relative;">
            <i [class]="item.icon" style="font-size: 26px; margin-bottom: 6px;"></i>
            <span style="font-size: 11px; font-weight: 800; text-transform: uppercase;">{{item.discount}}</span>
          </div>

          <!-- Dotted Separator -->
          <div style="width: 1px; border-left: 2px dashed #e2e8f0; height: 100%;"></div>

          <!-- Voucher Info -->
          <div style="flex: 1; padding: 14px 16px; display: flex; flex-direction: column; justify-content: space-between;">
            <div>
              <div style="font-size: 15px; font-weight: 800; color: #1e293b; margin-bottom: 4px;">{{item.title}}</div>
              <div style="font-size: 12px; color: #64748b; margin-bottom: 6px;">{{item.desc}}</div>
              <div style="font-size: 11px; color: #94a3b8;"><i class="fa-regular fa-clock"></i> HSD: {{item.expiry}}</div>
            </div>
            <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 10px;">
              <span style="font-size: 11px; font-weight: 700; color: #16a34a; background: #dcfce7; padding: 2px 8px; border-radius: 6px;">
                Mã: {{item.code}}
              </span>
              <a routerLink="/buyer-home" style="background: #88ad37; color: #ffffff; padding: 6px 14px; border-radius: 12px; font-size: 12px; font-weight: 700; text-decoration: none; box-shadow: 0 2px 8px rgba(136,173,55,0.3);">
                Dùng ngay
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  `
})
export class MyVouchersComponent {
  activeTab: 'all' | 'ship' | 'discount' = 'all';

  vouchers: Voucher[] = [
    {
      id: 'V-01',
      title: 'Giảm 15k Phí Giao Hàng',
      code: 'AGRISHIP15',
      desc: 'Áp dụng cho đơn ghép chuyến từ 100k',
      discount: 'FREESHIP 15K',
      minOrder: '100k',
      expiry: '31/10/2026',
      type: 'ship',
      badgeBg: 'linear-gradient(135deg, #0284c7, #0369a1)',
      icon: 'fa-solid fa-truck-fast'
    },
    {
      id: 'V-02',
      title: 'Voucher Nông Sản Tươi 10%',
      code: 'NONGSAN10',
      desc: 'Giảm tối đa 30.000đ cho Trái cây thu hoạch tại vườn',
      discount: 'GIẢM 10%',
      minOrder: '150k',
      expiry: '15/10/2026',
      type: 'discount',
      badgeBg: 'linear-gradient(135deg, #16a34a, #15803d)',
      icon: 'fa-solid fa-apple-whole'
    },
    {
      id: 'V-03',
      title: 'Freeship Ghép Chuyến Toàn Quốc',
      code: 'GHEPCHUYEN0K',
      desc: 'Miễn 100% phí giao hàng chuyến xe bà con',
      discount: 'FREESHIP 100%',
      minOrder: '200k',
      expiry: '20/10/2026',
      type: 'ship',
      badgeBg: 'linear-gradient(135deg, #0284c7, #0369a1)',
      icon: 'fa-solid fa-truck-ramp-box'
    },
    {
      id: 'V-04',
      title: 'Khuyến Mãi Khách Hàng Thân Thiết',
      code: 'NONGTHUONG20K',
      desc: 'Giảm ngay 20.000đ trực tiếp vào đơn đặt hàng',
      discount: 'GIẢM 20K',
      minOrder: '120k',
      expiry: '30/11/2026',
      type: 'discount',
      badgeBg: 'linear-gradient(135deg, #eab308, #ca8a04)',
      icon: 'fa-solid fa-gift'
    }
  ];

  get filteredVouchers(): Voucher[] {
    if (this.activeTab === 'ship') {
      return this.vouchers.filter(v => v.type === 'ship');
    }
    if (this.activeTab === 'discount') {
      return this.vouchers.filter(v => v.type === 'discount');
    }
    return this.vouchers;
  }
}
