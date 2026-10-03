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
  usedPercentage: number;
}

@Component({
  selector: 'app-my-vouchers',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div style="background-color: #f5f5f5; min-height: 100vh; padding-bottom: 80px; box-sizing: border-box;">
      <!-- Shopee / Lazada Header Bar -->
      <div style="position: sticky; top: 0; z-index: 100; background: #ffffff; border-bottom: 1px solid #e5e5e5; padding: 12px 16px; display: flex; align-items: center; justify-content: space-between;">
        <a routerLink="/profile" style="display: flex; align-items: center; justify-content: center; width: 36px; height: 36px; border-radius: 50%; color: #333333; text-decoration: none; font-size: 18px;">
          <i class="fa-solid fa-chevron-left"></i>
        </a>
        <h1 style="font-size: 17px; font-weight: 700; color: #222222; margin: 0;">Kho Voucher Nông Thương</h1>
        <a routerLink="/buyer-home" style="color: #769f2e; font-size: 13px; font-weight: 700; text-decoration: none;">
          Lịch sử
        </a>
      </div>

      <!-- Voucher Search/Input Box -->
      <div style="background: #ffffff; padding: 12px 16px; margin-bottom: 8px; display: flex; gap: 8px; border-bottom: 1px solid #eeeeee;">
        <div style="flex: 1; position: relative;">
          <i class="fa-solid fa-ticket" style="position: absolute; left: 14px; top: 50%; transform: translateY(-50%); color: #769f2e; font-size: 15px;"></i>
          <input type="text" placeholder="Nhập mã voucher Nông Thương..." style="width: 100%; height: 40px; background: #f5f5f5; border: 1px solid #e0e0e0; border-radius: 5%; padding-left: 38px; padding-right: 12px; font-size: 13px; outline: none; box-sizing: border-box;">
        </div>
        <button style="background-color: #769f2e; color: #ffffff; border: none; padding: 0 16px; border-radius: 5%; font-size: 13px; font-weight: 700; cursor: pointer;">
          Lưu mã
        </button>
      </div>

      <!-- Shopee Tab Horizontal Scroll Bar -->
      <div style="display: flex; background: #ffffff; border-bottom: 1px solid #eeeeee; overflow-x: auto; position: sticky; top: 61px; z-index: 99;">
        <button (click)="activeTab = 'all'" [style.color]="activeTab === 'all' ? '#769f2e' : '#555555'" [style.borderBottom]="activeTab === 'all' ? '2.5px solid #769f2e' : '2.5px solid transparent'" style="flex: 1; min-width: 90px; padding: 12px 8px; background: transparent; border: none; font-size: 13px; font-weight: 700; cursor: pointer; text-align: center; white-space: nowrap;">
          Tất cả (4)
        </button>
        <button (click)="activeTab = 'ship'" [style.color]="activeTab === 'ship' ? '#769f2e' : '#555555'" [style.borderBottom]="activeTab === 'ship' ? '2.5px solid #769f2e' : '2.5px solid transparent'" style="flex: 1; min-width: 140px; padding: 12px 8px; background: transparent; border: none; font-size: 13px; font-weight: 700; cursor: pointer; text-align: center; white-space: nowrap;">
          🚚 Miễn Phí Vận Chuyển
        </button>
        <button (click)="activeTab = 'discount'" [style.color]="activeTab === 'discount' ? '#769f2e' : '#555555'" [style.borderBottom]="activeTab === 'discount' ? '2.5px solid #769f2e' : '2.5px solid transparent'" style="flex: 1; min-width: 140px; padding: 12px 8px; background: transparent; border: none; font-size: 13px; font-weight: 700; cursor: pointer; text-align: center; white-space: nowrap;">
          🏷️ Giảm Giá Nông Sản
        </button>
      </div>

      <!-- Shopee / Lazada Voucher Ticket Cards -->
      <div style="padding: 12px 14px; display: flex; flex-direction: column; gap: 12px;">
        <div *ngFor="let item of filteredVouchers" style="display: flex; background: #ffffff; border-radius: 5%; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.04); border: 1px solid #e0e0e0; min-height: 110px;">
          <!-- Left Ticket Badge -->
          <div [style.background]="item.badgeBg" style="width: 105px; display: flex; flex-direction: column; align-items: center; justify-content: center; color: #ffffff; padding: 10px; text-align: center; border-radius: 5% 0 0 5%;">
            <i [class]="item.icon" style="font-size: 26px; margin-bottom: 6px;"></i>
            <span style="font-size: 11px; font-weight: 800; text-transform: uppercase; line-height: 1.2;">{{item.discount}}</span>
          </div>

          <!-- Vertical Ticket Cut Divider -->
          <div style="width: 1px; border-left: 2px dashed #dddddd; height: 100%;"></div>

          <!-- Ticket Content -->
          <div style="flex: 1; padding: 12px 14px; display: flex; flex-direction: column; justify-content: space-between;">
            <div>
              <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 4px;">
                <span style="font-size: 14px; font-weight: 800; color: #222222;">{{item.title}}</span>
                <span style="font-size: 10px; font-weight: 700; color: #ee4d2d; border: 1px solid #ee4d2d; padding: 1px 5px; border-radius: 5%;">Số lượng có hạn</span>
              </div>
              <div style="font-size: 12px; color: #666666; margin-bottom: 6px;">{{item.desc}}</div>
            </div>

            <div>
              <!-- Progress bar for remaining voucher -->
              <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 6px;">
                <div style="flex: 1; height: 5px; background: #eee; border-radius: 5%; overflow: hidden;">
                  <div [style.width.%]="item.usedPercentage" style="height: 100%; background: #769f2e; border-radius: 5%;"></div>
                </div>
                <span style="font-size: 10px; color: #888888;">Đã dùng {{item.usedPercentage}}%</span>
              </div>

              <div style="display: flex; justify-content: space-between; align-items: center;">
                <span style="font-size: 11px; color: #999999;"><i class="fa-regular fa-clock"></i> HSD: {{item.expiry}}</span>
                <a routerLink="/buyer-home" style="background: #769f2e; color: #ffffff; padding: 6px 14px; border-radius: 5%; font-size: 12px; font-weight: 700; text-decoration: none; box-shadow: 0 2px 6px rgba(118,159,46,0.3);">
                  Dùng Ngay
                </a>
              </div>
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
      desc: 'Đơn tối thiểu 100k · Tất cả hình thức thanh toán',
      discount: 'FREESHIP 15K',
      minOrder: '100k',
      expiry: '31/10/2026',
      type: 'ship',
      badgeBg: 'linear-gradient(135deg, #0284c7, #0369a1)',
      icon: 'fa-solid fa-truck-fast',
      usedPercentage: 65
    },
    {
      id: 'V-02',
      title: 'Voucher Nông Sản 10%',
      code: 'NONGSAN10',
      desc: 'Giảm tối đa 30k cho trái cây thu hoạch tại vườn',
      discount: 'GIẢM 10%',
      minOrder: '150k',
      expiry: '15/10/2026',
      type: 'discount',
      badgeBg: 'linear-gradient(135deg, #769f2e, #587820)',
      icon: 'fa-solid fa-apple-whole',
      usedPercentage: 80
    },
    {
      id: 'V-03',
      title: 'Freeship Ghép Chuyến',
      code: 'GHEPCHUYEN0K',
      desc: 'Miễn phí giao hàng khi gom chuyến cùng người mua lân cận',
      discount: 'FREESHIP 100%',
      minOrder: '200k',
      expiry: '20/10/2026',
      type: 'ship',
      badgeBg: 'linear-gradient(135deg, #0284c7, #0369a1)',
      icon: 'fa-solid fa-truck-ramp-box',
      usedPercentage: 42
    },
    {
      id: 'V-04',
      title: 'Khách Hàng Thân Thiết',
      code: 'NONGTHUONG20K',
      desc: 'Giảm thẳng 20k trực tiếp vào tổng bill mua hàng',
      discount: 'GIẢM 20K',
      minOrder: '120k',
      expiry: '30/11/2026',
      type: 'discount',
      badgeBg: 'linear-gradient(135deg, #d97706, #b45309)',
      icon: 'fa-solid fa-gift',
      usedPercentage: 90
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
