import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-order-tracking',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div style="background-color: #f5f5f5; min-height: 100vh; box-sizing: border-box; display: flex; flex-direction: column; position: relative; font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
      <!-- Top Bar Header (Shopee SPX Style) -->
      <div style="position: sticky; top: 0; z-index: 100; background: #ffffff; border-bottom: 1px solid #e5e5e5; padding: 12px 16px; display: flex; align-items: center; justify-content: space-between; box-shadow: 0 1px 4px rgba(0,0,0,0.03);">
        <a routerLink="/profile" style="display: flex; align-items: center; justify-content: center; width: 36px; height: 36px; color: #333333; text-decoration: none; font-size: 18px;">
          <i class="fa-solid fa-arrow-left"></i>
        </a>
        <h1 style="font-size: 17px; font-weight: 700; color: #222222; margin: 0;">Đang giao hàng</h1>
        <div style="display: flex; align-items: center; gap: 14px; color: #ee4d2d; font-size: 18px;">
          <a routerLink="/chat-staff" style="color: #ee4d2d; text-decoration: none;"><i class="fa-solid fa-headset"></i></a>
          <i class="fa-regular fa-circle-question" style="cursor: pointer;"></i>
        </div>
      </div>

      <!-- Map Tracking Visual Area -->
      <div style="height: 310px; position: relative; overflow: hidden; background: #e5e3df; border-bottom: 1px solid #d4d4d4;">
        <!-- Simulated Google Map SVG with Streets and Locations -->
        <svg width="100%" height="100%" viewBox="0 0 400 310" preserveAspectRatio="none" style="background: #edf1f5;">
          <!-- Map Background Features (Green areas / water) -->
          <path d="M 0,160 Q 60,140 100,180 T 160,260 L 0,260 Z" fill="#c3ebd4" opacity="0.6"/>
          <text x="30" y="210" font-size="11" font-weight="bold" fill="#047857" opacity="0.8">Đầm Sen</text>
          
          <rect x="250" y="80" width="130" height="90" rx="8" fill="#d1fae5" opacity="0.5"/>
          <text x="260" y="130" font-size="11" font-weight="bold" fill="#047857" opacity="0.8">Sân vận động Phú Thọ</text>

          <!-- Grid Streets -->
          <line x1="20" y1="0" x2="60" y2="310" stroke="#ffffff" stroke-width="8"/>
          <text x="22" y="90" font-size="9" fill="#94a3b8" transform="rotate(75 22 90)">Đ. Lũy Bán Bích</text>

          <line x1="120" y1="0" x2="260" y2="310" stroke="#ffffff" stroke-width="12"/>
          <text x="210" y="190" font-size="9" fill="#94a3b8" transform="rotate(60 210 190)">Đ. Âu Cơ</text>

          <line x1="0" y1="230" x2="400" y2="210" stroke="#ffffff" stroke-width="8"/>
          <text x="210" y="228" font-size="9" fill="#94a3b8">Bình Thới</text>

          <line x1="0" y1="110" x2="400" y2="90" stroke="#ffffff" stroke-width="6"/>

          <!-- District Labels -->
          <text x="120" y="125" font-size="10" font-weight="bold" fill="#94a3b8">HOÀ THẠNH</text>
          <text x="220" y="80" font-size="10" font-weight="bold" fill="#94a3b8">PHƯỜNG 10</text>
          <text x="290" y="170" font-size="10" font-weight="bold" fill="#94a3b8">PHƯỜNG 9</text>
          <text x="140" y="250" font-size="10" font-weight="bold" fill="#94a3b8">PHƯỜNG 3</text>
          <text x="270" y="40" font-size="10" font-weight="bold" fill="#2563eb">Chợ Tân Bình 🏪</text>

          <!-- Delivery Route Path Line -->
          <path d="M 175,210 L 260,110 L 210,50 L 170,20" fill="none" stroke="#ee4d2d" stroke-dasharray="2 2" stroke-width="5" stroke-linecap="round"/>

          <!-- Destination Point Pin Marker -->
          <g transform="translate(175, 210)">
            <circle cx="0" cy="0" r="14" fill="rgba(238,77,45,0.2)"/>
            <circle cx="0" cy="0" r="6" fill="#06b6d4"/>
            <circle cx="0" cy="0" r="3" fill="#ffffff"/>
          </g>

          <!-- Shipper Icon Position on Route -->
          <g transform="translate(215, 60)">
            <circle cx="0" cy="0" r="16" fill="#ee4d2d" shadow="0 4px 10px rgba(0,0,0,0.3)"/>
            <path d="M-6,-4 L6,0 L-6,4 L-2,0 Z" fill="#ffffff"/>
          </g>
        </svg>

        <!-- Shipper Callout Tooltip Bubble (Shopee style) -->
        <div style="position: absolute; top: 12px; left: 50%; transform: translateX(-50%); background: #ffffff; padding: 8px 14px; border-radius: 20px; box-shadow: 0 4px 16px rgba(0,0,0,0.15); display: flex; align-items: center; gap: 8px; border: 1px solid #f0f0f0;">
          <span style="font-size: 13px; font-weight: 700; color: #ee4d2d;">Đơn hàng sắp được giao tới bạn</span>
          <div style="position: absolute; bottom: -6px; left: 50%; transform: translateX(-50%); width: 0; height: 0; border-left: 6px solid transparent; border-right: 6px solid transparent; border-top: 6px solid #ffffff;"></div>
        </div>

        <!-- Floating GPS Location Target Button -->
        <button style="position: absolute; bottom: 16px; right: 16px; width: 40px; height: 40px; border-radius: 50%; background: #ffffff; border: none; box-shadow: 0 2px 10px rgba(0,0,0,0.15); display: flex; align-items: center; justify-content: center; color: #444444; font-size: 18px; cursor: pointer;">
          <i class="fa-solid fa-crosshairs"></i>
        </button>
      </div>

      <!-- Bottom Sheet Information & Live Status (Shopee SPX Express style) -->
      <div style="padding: 14px; display: flex; flex-direction: column; gap: 12px; margin-top: -10px; position: relative; z-index: 10;">

        <!-- Estimated Delivery Date Card -->
        <div style="background: #ffffff; border-radius: 5%; padding: 14px 16px; box-shadow: 0 2px 8px rgba(0,0,0,0.04); display: flex; align-items: center; gap: 14px; border: 1px solid #eeeeee;">
          <img src="assets/image/Trái cây/vai.jpg" alt="Sản phẩm" style="width: 52px; height: 52px; border-radius: 5%; object-fit: cover; border: 1px solid #f0f0f0;">
          <div style="flex: 1;">
            <div style="font-size: 14px; font-weight: 700; color: #222222; margin-bottom: 2px;">Ngày nhận hàng dự kiến</div>
            <div style="font-size: 15px; font-weight: 800; color: #ee4d2d; margin-bottom: 2px;">Hôm nay, {{todayDateString}}</div>
            <div style="font-size: 12px; color: #777777;">Vận chuyển bởi Nhanh - SPX Express (Nông Thương)</div>
          </div>
        </div>

        <!-- Tracking Number & Inspection Guarantee Card -->
        <div style="background: #ffffff; border-radius: 5%; padding: 14px 16px; box-shadow: 0 2px 8px rgba(0,0,0,0.04); border: 1px solid #eeeeee;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
            <span style="font-size: 13px; font-weight: 700; color: #333333;">Mã vận đơn</span>
            <div style="display: flex; align-items: center; gap: 10px;">
              <span style="font-size: 13px; font-weight: 600; color: #666666;">SPXVN047140263024</span>
              <button (click)="copyTrackingCode()" style="background: none; border: none; font-size: 12px; font-weight: 800; color: #0284c7; cursor: pointer; padding: 0;">
                {{copied ? 'ĐÃ SAO CHÉP' : 'SAO CHÉP'}}
              </button>
            </div>
          </div>

          <div style="display: flex; align-items: center; gap: 8px; font-size: 12px; color: #444444; border-top: 1px solid #f5f5f5; padding-top: 10px;">
            <span style="background: #ee4d2d; color: #ffffff; font-size: 10px; font-weight: 800; padding: 2px 6px; border-radius: 5%;">
              <i class="fa-solid fa-check"></i> ĐỒNG KIỂM
            </span>
            <span>Được đồng kiểm cùng shipper</span>
            <a href="javascript:void(0)" style="color: #0284c7; font-weight: 600; text-decoration: none; margin-left: auto;">Tìm hiểu thêm</a>
          </div>
        </div>

        <!-- Live Status Timeline Steps (Shopee Timeline) -->
        <div style="background: #ffffff; border-radius: 5%; padding: 16px; box-shadow: 0 2px 8px rgba(0,0,0,0.04); border: 1px solid #eeeeee;">
          <div style="font-size: 14px; font-weight: 700; color: #222222; margin-bottom: 14px;">Tiến trình vận chuyển</div>

          <div style="display: flex; flex-direction: column; gap: 18px; position: relative; padding-left: 90px;">
            <!-- Vertical Connecting Line -->
            <div style="position: absolute; left: 114px; top: 12px; bottom: 12px; width: 2px; background: #e5e5e5; z-index: 1;"></div>

            <!-- Active Step: Đang giao hàng -->
            <div style="display: flex; gap: 14px; position: relative; z-index: 2;">
              <div style="position: absolute; left: -90px; top: 0; font-size: 11px; color: #059669; font-weight: 700; text-align: right; width: 65px; line-height: 1.3;">
                Hôm nay<br>08:18
              </div>
              <div style="position: absolute; left: -24px; top: 0; width: 20px; height: 20px; background: #059669; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: #ffffff; font-size: 10px; box-shadow: 0 0 0 3px rgba(5,150,105,0.2);">
                <i class="fa-solid fa-truck"></i>
              </div>
              <div style="flex: 1;">
                <div style="font-size: 14px; font-weight: 800; color: #059669; margin-bottom: 2px;">Đang giao hàng</div>
                <div style="font-size: 12px; color: #444444; line-height: 1.4;">
                  Đơn hàng sẽ sớm được giao, vui lòng chú ý điện thoại. Tài xế Nguyễn Văn Hùng đang tới địa chỉ của bạn.
                </div>
              </div>
            </div>

            <!-- Step 2: Đơn đã đến trạm giao -->
            <div style="display: flex; gap: 14px; position: relative; z-index: 2;">
              <div style="position: absolute; left: -90px; top: 0; font-size: 11px; color: #888888; text-align: right; width: 65px; line-height: 1.3;">
                Hôm nay<br>06:19
              </div>
              <div style="position: absolute; left: -20px; top: 2px; width: 12px; height: 12px; background: #cccccc; border-radius: 50%;"></div>
              <div style="flex: 1;">
                <div style="font-size: 13px; font-weight: 600; color: #666666;">Đơn hàng đã đến trạm giao hàng 51-HCM DTP/Âu Cơ</div>
              </div>
            </div>

            <!-- Step 3: Đơn đã xuất kho -->
            <div style="display: flex; gap: 14px; position: relative; z-index: 2;">
              <div style="position: absolute; left: -90px; top: 0; font-size: 11px; color: #888888; text-align: right; width: 65px; line-height: 1.3;">
                Hôm qua<br>18:30
              </div>
              <div style="position: absolute; left: -20px; top: 2px; width: 12px; height: 12px; background: #cccccc; border-radius: 50%;"></div>
              <div style="flex: 1;">
                <div style="font-size: 13px; font-weight: 600; color: #666666;">Đơn hàng đã xuất kho Củ Chi SOC</div>
              </div>
            </div>

            <!-- Step 4: Đã bàn giao cho SPX -->
            <div style="display: flex; gap: 14px; position: relative; z-index: 2;">
              <div style="position: absolute; left: -90px; top: 0; font-size: 11px; color: #888888; text-align: right; width: 65px; line-height: 1.3;">
                02/10<br>14:15
              </div>
              <div style="position: absolute; left: -20px; top: 2px; width: 12px; height: 12px; background: #cccccc; border-radius: 50%;"></div>
              <div style="flex: 1;">
                <div style="font-size: 13px; font-weight: 600; color: #666666;">Nhà vườn Bác Hùng Bắc Giang đã bàn giao đơn hàng cho đơn vị vận chuyển</div>
              </div>
            </div>
          </div>
        </div>

        <!-- Back to Home Action Button -->
        <a routerLink="/buyer-home" style="display: flex; align-items: center; justify-content: center; background-color: #769f2e; color: #ffffff; height: 48px; border-radius: 5%; font-size: 15px; font-weight: 700; text-decoration: none; box-shadow: 0 4px 12px rgba(118,159,46,0.3); margin-top: 6px;">
          Trở Về Trang Chủ
        </a>
      </div>
    </div>
  `
})
export class OrderTrackingComponent {
  copied = false;

  get todayDateString(): string {
    const today = new Date();
    const day = today.getDate();
    const month = today.getMonth() + 1;
    const year = today.getFullYear();
    return `${day} Tháng ${month} ${year}`;
  }

  copyTrackingCode(): void {
    this.copied = true;
    setTimeout(() => {
      this.copied = false;
    }, 2500);
  }
}
