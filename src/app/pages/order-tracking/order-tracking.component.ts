import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-order-tracking',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div style="background-color: #DFF1E6; min-height: 100vh; padding-bottom: 80px;" class="d-flex flex-column position-relative">
      <!-- Top Bar Header (Bootstrap Styled with #DFF1E6 Theme) -->
      <div class="sticky-top bg-white border-bottom shadow-sm px-3 py-2 d-flex align-items-center justify-content-between" style="z-index: 100;">
        <a routerLink="/profile" class="btn btn-light rounded-circle d-flex align-items-center justify-content-center p-0" style="width: 38px; height: 38px;">
          <i class="fa-solid fa-arrow-left text-dark"></i>
        </a>
        <h1 class="h6 fw-bold text-dark m-0">Đang giao hàng</h1>
        <div class="d-flex align-items-center gap-3">
          <a routerLink="/chat-staff" class="text-success fs-5 text-decoration-none"><i class="fa-solid fa-headset"></i></a>
          <i class="fa-regular fa-circle-question text-success fs-5 cursor-pointer"></i>
        </div>
      </div>

      <!-- Map Tracking Visual Area -->
      <div class="position-relative overflow-hidden border-bottom" style="height: 310px; background: #cce7d7;">
        <!-- Simulated Google Map SVG with Streets & DFF1E6 Theme -->
        <svg width="100%" height="100%" viewBox="0 0 400 310" preserveAspectRatio="none" style="background: #e8f5ed;">
          <!-- Map Background Features (Soft Green Areas) -->
          <path d="M 0,160 Q 60,140 100,180 T 160,260 L 0,260 Z" fill="#DFF1E6" opacity="0.9"/>
          <text x="30" y="210" font-size="11" font-weight="bold" fill="#1b4332" opacity="0.8">Đầm Sen</text>
          
          <rect x="250" y="80" width="130" height="90" rx="8" fill="#DFF1E6" opacity="0.9"/>
          <text x="260" y="130" font-size="11" font-weight="bold" fill="#1b4332" opacity="0.8">Sân vận động Phú Thọ</text>

          <!-- Grid Streets -->
          <line x1="20" y1="0" x2="60" y2="310" stroke="#ffffff" stroke-width="8"/>
          <text x="22" y="90" font-size="9" fill="#2d6a4f" transform="rotate(75 22 90)">Đ. Lũy Bán Bích</text>

          <line x1="120" y1="0" x2="260" y2="310" stroke="#ffffff" stroke-width="12"/>
          <text x="210" y="190" font-size="9" fill="#2d6a4f" transform="rotate(60 210 190)">Đ. Âu Cơ</text>

          <line x1="0" y1="230" x2="400" y2="210" stroke="#ffffff" stroke-width="8"/>
          <text x="210" y="228" font-size="9" fill="#2d6a4f">Bình Thới</text>

          <line x1="0" y1="110" x2="400" y2="90" stroke="#ffffff" stroke-width="6"/>

          <!-- District Labels -->
          <text x="120" y="125" font-size="10" font-weight="bold" fill="#52b788">HOÀ THẠNH</text>
          <text x="220" y="80" font-size="10" font-weight="bold" fill="#52b788">PHƯỜNG 10</text>
          <text x="290" y="170" font-size="10" font-weight="bold" fill="#52b788">PHƯỜNG 9</text>
          <text x="140" y="250" font-size="10" font-weight="bold" fill="#52b788">PHƯỜNG 3</text>
          <text x="270" y="40" font-size="10" font-weight="bold" fill="#2d6a4f">Chợ Tân Bình 🏪</text>

          <!-- Delivery Route Path Line -->
          <path d="M 175,210 L 260,110 L 210,50 L 170,20" fill="none" stroke="#2d6a4f" stroke-dasharray="4 3" stroke-width="5" stroke-linecap="round"/>

          <!-- Destination Point Pin Marker -->
          <g transform="translate(175, 210)">
            <circle cx="0" cy="0" r="14" fill="rgba(45,106,79,0.2)"/>
            <circle cx="0" cy="0" r="6" fill="#1b4332"/>
            <circle cx="0" cy="0" r="3" fill="#ffffff"/>
          </g>

          <!-- Shipper Icon Position on Route -->
          <g transform="translate(215, 60)">
            <circle cx="0" cy="0" r="16" fill="#2d6a4f"/>
            <path d="M-6,-4 L6,0 L-6,4 L-2,0 Z" fill="#ffffff"/>
          </g>
        </svg>

        <!-- Shipper Callout Tooltip Bubble (Bootstrap Card style) -->
        <div class="position-absolute top-0 start-50 translate-middle-x mt-3 bg-white px-3 py-2 rounded-pill shadow-sm border border-success d-flex align-items-center gap-2">
          <span class="small fw-bold text-success">Đơn hàng sắp được giao tới bạn</span>
        </div>

        <!-- Floating GPS Location Target Button -->
        <button class="position-absolute bottom-0 end-0 m-3 btn btn-white bg-white rounded-circle shadow-sm p-0 d-flex align-items-center justify-content-center" style="width: 40px; height: 40px;">
          <i class="fa-solid fa-crosshairs text-dark"></i>
        </button>
      </div>

      <!-- Bottom Sheet Cards (Bootstrap styled with #DFF1E6 accent) -->
      <div class="container-fluid px-3 pt-2 d-flex flex-direction-column gap-3 position-relative" style="z-index: 10; margin-top: -10px;">

        <!-- Estimated Delivery Date Card -->
        <div class="card border-0 shadow-sm rounded-4 p-3 bg-white d-flex flex-row align-items-center gap-3">
          <img src="assets/image/Trái cây/vai.jpg" alt="Sản phẩm" class="rounded-3 object-fit-cover border" style="width: 54px; height: 54px;">
          <div class="flex-grow-1">
            <div class="small fw-bold text-secondary mb-1">Ngày nhận hàng dự kiến</div>
            <div class="fw-extrabold text-success mb-1" style="font-size: 15px;">Hôm nay, {{todayDateString}}</div>
            <div class="small text-muted" style="font-size: 12px;">Vận chuyển bởi Nhanh - SPX Express (Nông Thương)</div>
          </div>
        </div>

        <!-- Tracking Number & Inspection Guarantee Card -->
        <div class="card border-0 shadow-sm rounded-4 p-3 bg-white">
          <div class="d-flex justify-content-between align-items-center mb-2">
            <span class="small fw-bold text-dark">Mã vận đơn</span>
            <div class="d-flex align-items-center gap-2">
              <span class="small fw-semibold text-secondary">SPXVN047140263024</span>
              <button (click)="copyTrackingCode()" class="btn btn-link p-0 small fw-bold text-success text-decoration-none" style="font-size: 12px;">
                {{copied ? 'ĐÃ SAO CHÉP' : 'SAO CHÉP'}}
              </button>
            </div>
          </div>

          <div class="d-flex align-items-center gap-2 pt-2 border-top text-dark" style="font-size: 12px;">
            <span class="badge bg-success text-white px-2 py-1 rounded-2">
              <i class="fa-solid fa-check me-1"></i> ĐỒNG KIỂM
            </span>
            <span>Được đồng kiểm cùng shipper</span>
            <a href="javascript:void(0)" class="text-success fw-semibold text-decoration-none ms-auto">Tìm hiểu thêm</a>
          </div>
        </div>

        <!-- Live Status Timeline Steps Card -->
        <div class="card border-0 shadow-sm rounded-4 p-3 bg-white">
          <div class="fw-bold text-dark mb-3" style="font-size: 14px;">Tiến trình vận chuyển</div>

          <div class="d-flex flex-column gap-3 position-relative" style="padding-left: 85px;">
            <!-- Vertical Connecting Line -->
            <div class="position-absolute bg-light-subtle" style="left: 104px; top: 12px; bottom: 12px; width: 2px; background-color: #cbd5e1;"></div>

            <!-- Active Step: Đang giao hàng -->
            <div class="d-flex gap-3 position-relative" style="z-index: 2;">
              <div class="position-absolute text-end text-success fw-bold" style="left: -85px; top: 0; font-size: 11px; width: 60px; line-height: 1.3;">
                Hôm nay<br>08:18
              </div>
              <div class="position-absolute bg-success text-white rounded-circle d-flex align-items-center justify-content-center" style="left: -22px; top: 0; width: 20px; height: 20px; font-size: 10px; box-shadow: 0 0 0 3px #DFF1E6;">
                <i class="fa-solid fa-truck"></i>
              </div>
              <div class="flex-grow-1">
                <div class="fw-bold text-success mb-1" style="font-size: 14px;">Đang giao hàng</div>
                <div class="small text-secondary" style="line-height: 1.4;">
                  Đơn hàng sẽ sớm được giao, vui lòng chú ý điện thoại. Tài xế Nguyễn Văn Hùng đang tới địa chỉ của bạn.
                </div>
              </div>
            </div>

            <!-- Step 2: Đơn đã đến trạm giao -->
            <div class="d-flex gap-3 position-relative" style="z-index: 2;">
              <div class="position-absolute text-end text-muted" style="left: -85px; top: 0; font-size: 11px; width: 60px; line-height: 1.3;">
                Hôm nay<br>06:19
              </div>
              <div class="position-absolute bg-secondary rounded-circle" style="left: -18px; top: 3px; width: 12px; height: 12px;"></div>
              <div class="flex-grow-1">
                <div class="small text-muted fw-medium">Đơn hàng đã đến trạm giao hàng 51-HCM DTP/Âu Cơ</div>
              </div>
            </div>

            <!-- Step 3: Đơn đã xuất kho -->
            <div class="d-flex gap-3 position-relative" style="z-index: 2;">
              <div class="position-absolute text-end text-muted" style="left: -85px; top: 0; font-size: 11px; width: 60px; line-height: 1.3;">
                Hôm qua<br>18:30
              </div>
              <div class="position-absolute bg-secondary rounded-circle" style="left: -18px; top: 3px; width: 12px; height: 12px;"></div>
              <div class="flex-grow-1">
                <div class="small text-muted fw-medium">Đơn hàng đã xuất kho Củ Chi SOC</div>
              </div>
            </div>

            <!-- Step 4: Đã bàn giao cho SPX -->
            <div class="d-flex gap-3 position-relative" style="z-index: 2;">
              <div class="position-absolute text-end text-muted" style="left: -85px; top: 0; font-size: 11px; width: 60px; line-height: 1.3;">
                02/10<br>14:15
              </div>
              <div class="position-absolute bg-secondary rounded-circle" style="left: -18px; top: 3px; width: 12px; height: 12px;"></div>
              <div class="flex-grow-1">
                <div class="small text-muted fw-medium">Nhà vườn Bác Hùng Bắc Giang đã bàn giao đơn hàng cho đơn vị vận chuyển</div>
              </div>
            </div>
          </div>
        </div>

        <!-- Back to Home Button -->
        <a routerLink="/buyer-home" class="btn btn-success w-100 rounded-4 py-2 fw-bold text-white shadow-sm" style="background-color: #2d6a4f; border: none; font-size: 15px;">
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
