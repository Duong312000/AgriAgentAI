import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-order-tracking',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="tracking-page-container">
      <!-- Top Navigation Header -->
      <div class="tracking-header">
        <a routerLink="/profile" class="header-back-btn">
          <i class="fa-solid fa-arrow-left"></i>
        </a>
        <h2 class="header-title-text">Đang giao hàng</h2>
        <div class="header-right-actions">
          <a routerLink="/chat-staff" class="action-icon-btn" title="Hỗ trợ">
            <i class="fa-solid fa-headset"></i>
          </a>
          <button class="action-icon-btn" title="Trợ giúp">
            <i class="fa-regular fa-circle-question"></i>
          </button>
        </div>
      </div>

      <!-- Live Map Visual Section -->
      <div class="map-visual-container">
        <!-- Animated / Detailed SVG Map Layout -->
        <svg width="100%" height="100%" viewBox="0 0 400 280" preserveAspectRatio="none">
          <!-- Background Zones in Soft #DFF1E6 Greens -->
          <rect width="400" height="280" fill="#e4f2ea"/>
          <path d="M 0,140 Q 70,120 110,160 T 180,260 L 0,260 Z" fill="#DFF1E6" opacity="0.9"/>
          <rect x="240" y="60" width="140" height="100" rx="12" fill="#DFF1E6" opacity="0.9"/>

          <!-- Street Lines -->
          <line x1="30" y1="0" x2="80" y2="280" stroke="#ffffff" stroke-width="10"/>
          <text x="32" y="80" font-size="9" font-weight="bold" fill="#2d6a4f" transform="rotate(78 32 80)">Đ. Lũy Bán Bích</text>

          <line x1="100" y1="0" x2="280" y2="280" stroke="#ffffff" stroke-width="14"/>
          <text x="210" y="170" font-size="9" font-weight="bold" fill="#2d6a4f" transform="rotate(58 210 170)">Đ. Âu Cơ</text>

          <line x1="0" y1="210" x2="400" y2="190" stroke="#ffffff" stroke-width="8"/>
          <text x="180" y="206" font-size="9" font-weight="bold" fill="#2d6a4f">Bình Thới</text>

          <line x1="0" y1="90" x2="400" y2="70" stroke="#ffffff" stroke-width="7"/>

          <!-- District / Landmark Labels -->
          <text x="20" y="180" font-size="10" font-weight="bold" fill="#1b4332">Đầm Sen 🌳</text>
          <text x="255" y="105" font-size="10" font-weight="bold" fill="#1b4332">Sân vận động Phú Thọ 🏟️</text>
          <text x="110" y="115" font-size="10" font-weight="600" fill="#52b788">HOÀ THẠNH</text>
          <text x="260" y="35" font-size="10" font-weight="600" fill="#1b4332">Chợ Tân Bình 🏪</text>

          <!-- Delivery Route Path -->
          <path d="M 160,195 L 250,105 L 205,45 L 165,18" fill="none" stroke="#2d6a4f" stroke-dasharray="5 4" stroke-width="4" stroke-linecap="round"/>

          <!-- Destination Marker -->
          <g transform="translate(160, 195)">
            <circle cx="0" cy="0" r="14" fill="rgba(45,106,79,0.25)"/>
            <circle cx="0" cy="0" r="7" fill="#1b4332"/>
            <circle cx="0" cy="0" r="3" fill="#ffffff"/>
          </g>

          <!-- Shipper Current Location Marker -->
          <g transform="translate(205, 45)">
            <circle cx="0" cy="0" r="16" fill="#2d6a4f"/>
            <circle cx="0" cy="0" r="13" fill="#1b4332"/>
            <path d="M-5,-4 L6,0 L-5,4 L-2,0 Z" fill="#ffffff"/>
          </g>
        </svg>

        <!-- Top Tooltip Floating Card -->
        <div class="map-status-tooltip">
          <i class="fa-solid fa-truck-fast text-success me-2"></i>
          <span>Đơn hàng sắp được giao tới bạn</span>
        </div>

        <!-- Floating GPS Target Button -->
        <button class="gps-target-btn" title="Định vị">
          <i class="fa-solid fa-crosshairs"></i>
        </button>
      </div>

      <!-- Main Tracking Content Cards -->
      <div class="tracking-content-body">
        
        <!-- Estimated Delivery Date Card -->
        <div class="bootstrap-card delivery-date-card">
          <img src="https://res.cloudinary.com/zdavpzw2/image/upload/v1791068895/agriagent_ai/tr%C3%A1i_c%C3%A2y/vai.jpg" alt="Vải Thiều" class="product-thumb-img">
          <div class="delivery-info">
            <div class="info-label">Ngày nhận hàng dự kiến</div>
            <div class="info-date-highlight">Hôm nay, {{todayDateString}}</div>
            <div class="info-subtext">Vận chuyển bởi Nhanh - SPX Express (Nông Thương)</div>
          </div>
        </div>

        <!-- Tracking Number & Inspection Card -->
        <div class="bootstrap-card tracking-code-card">
          <div class="code-row">
            <span class="code-title">Mã vận đơn</span>
            <div class="code-value-group">
              <span class="code-number">SPXVN047140263024</span>
              <button (click)="copyTrackingCode()" class="copy-badge-btn">
                {{copied ? 'ĐÃ SAO CHÉP' : 'SAO CHÉP'}}
              </button>
            </div>
          </div>

          <div class="inspection-row">
            <span class="dong-kiem-tag">
              <i class="fa-solid fa-circle-check me-1"></i> ĐỒNG KIỂM
            </span>
            <span class="inspection-desc">Được đồng kiểm cùng shipper</span>
            <a href="javascript:void(0)" class="inspection-link">Tìm hiểu thêm</a>
          </div>
        </div>

        <!-- Order Timeline Progress Card -->
        <div class="bootstrap-card timeline-card">
          <div class="timeline-card-title">Tiến trình vận chuyển</div>

          <div class="timeline-flex-wrapper">
            <!-- Background Vertical Line perfectly centered through node column -->
            <div class="timeline-continuous-v-line"></div>

            <!-- Active Step: Đang giao hàng -->
            <div class="timeline-flex-row">
              <div class="time-col">
                <span class="time-date">Hôm nay</span>
                <strong class="time-hour active">08:18</strong>
              </div>
              <div class="node-col">
                <div class="active-truck-badge">
                  <i class="fa-solid fa-truck"></i>
                </div>
              </div>
              <div class="content-col">
                <div class="status-title active">Đang giao hàng</div>
                <div class="status-desc">
                  Đơn hàng sẽ sớm được giao, vui lòng chú ý điện thoại. Tài xế Nguyễn Văn Hùng đang tới địa chỉ của bạn.
                </div>
              </div>
            </div>

            <!-- Step 2 -->
            <div class="timeline-flex-row">
              <div class="time-col">
                <span class="time-date">Hôm nay</span>
                <span class="time-hour">06:19</span>
              </div>
              <div class="node-col">
                <div class="dot-badge"></div>
              </div>
              <div class="content-col">
                <div class="status-desc-normal">Đơn hàng đã đến trạm giao hàng 51-HCM DTP/Âu Cơ</div>
              </div>
            </div>

            <!-- Step 3 -->
            <div class="timeline-flex-row">
              <div class="time-col">
                <span class="time-date">Hôm qua</span>
                <span class="time-hour">18:30</span>
              </div>
              <div class="node-col">
                <div class="dot-badge"></div>
              </div>
              <div class="content-col">
                <div class="status-desc-normal">Đơn hàng đã xuất kho Củ Chi SOC</div>
              </div>
            </div>

            <!-- Step 4 -->
            <div class="timeline-flex-row">
              <div class="time-col">
                <span class="time-date">02/10</span>
                <span class="time-hour">14:15</span>
              </div>
              <div class="node-col">
                <div class="dot-badge"></div>
              </div>
              <div class="content-col">
                <div class="status-desc-normal">Nhà vườn Bác Hùng Bắc Giang đã bàn giao đơn hàng cho đơn vị vận chuyển</div>
              </div>
            </div>

          </div>
        </div>

        <!-- Return Home Button -->
        <a routerLink="/buyer-home" class="btn-return-home">
          Trở Về Trang Chủ
        </a>

      </div>
    </div>
  `,
  styles: [`
    .tracking-page-container {
      background-color: #DFF1E6;
      min-height: 100vh;
      padding-bottom: 40px;
      display: flex;
      flex-direction: column;
      box-sizing: border-box;
      font-family: inherit;
    }

    /* Header Styling */
    .tracking-header {
      position: sticky;
      top: 0;
      z-index: 100;
      background-color: #ffffff;
      padding: 12px 16px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      border-bottom: 1px solid #e0ebd4;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
    }

    .header-back-btn {
      width: 36px;
      height: 36px;
      border-radius: 50%;
      background-color: #f1f5f9;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #1e293b;
      text-decoration: none;
      font-size: 16px;
      transition: background-color 0.2s;
    }

    .header-back-btn:hover {
      background-color: #e2e8f0;
    }

    .header-title-text {
      font-size: 16px;
      font-weight: 700;
      color: #1b4332;
      margin: 0;
    }

    .header-right-actions {
      display: flex;
      align-items: center;
      gap: 14px;
    }

    .action-icon-btn {
      background: none;
      border: none;
      color: #2d6a4f;
      font-size: 18px;
      cursor: pointer;
      padding: 0;
      text-decoration: none;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    /* Map Visual Area */
    .map-visual-container {
      position: relative;
      width: 100%;
      height: 270px;
      background-color: #cce7d7;
      overflow: hidden;
      border-bottom: 1px solid #b7dbca;
    }

    .map-status-tooltip {
      position: absolute;
      top: 14px;
      left: 50%;
      transform: translateX(-50%);
      background-color: #ffffff;
      padding: 8px 18px;
      border-radius: 999px;
      box-shadow: 0 4px 14px rgba(0, 0, 0, 0.1);
      border: 1.5px solid #52b788;
      font-size: 13px;
      font-weight: 700;
      color: #1b4332;
      display: flex;
      align-items: center;
      white-space: nowrap;
      z-index: 10;
    }

    .gps-target-btn {
      position: absolute;
      bottom: 14px;
      right: 14px;
      width: 38px;
      height: 38px;
      border-radius: 50%;
      background-color: #ffffff;
      border: none;
      box-shadow: 0 4px 10px rgba(0, 0, 0, 0.12);
      color: #1e293b;
      font-size: 16px;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    /* Content Body & Cards */
    .tracking-content-body {
      padding: 14px 16px;
      display: flex;
      flex-direction: column;
      gap: 12px;
      position: relative;
      z-index: 20;
      margin-top: -8px;
    }

    .bootstrap-card {
      background-color: #ffffff;
      border-radius: 16px;
      padding: 16px;
      box-shadow: 0 4px 16px rgba(0, 0, 0, 0.04);
      border: 1px solid #e2f0e6;
    }

    /* Delivery Date Card */
    .delivery-date-card {
      display: flex;
      align-items: center;
      gap: 14px;
    }

    .product-thumb-img {
      width: 54px;
      height: 54px;
      border-radius: 12px;
      object-fit: cover;
      border: 1px solid #e2e8f0;
    }

    .delivery-info {
      flex: 1;
    }

    .info-label {
      font-size: 12px;
      font-weight: 600;
      color: #64748b;
      margin-bottom: 2px;
    }

    .info-date-highlight {
      font-size: 15px;
      font-weight: 800;
      color: #1b4332;
      margin-bottom: 2px;
    }

    .info-subtext {
      font-size: 11.5px;
      color: #64748b;
    }

    /* Tracking Code Card */
    .code-row {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 12px;
    }

    .code-title {
      font-size: 13.5px;
      font-weight: 700;
      color: #1e293b;
    }

    .code-value-group {
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .code-number {
      font-size: 12.5px;
      font-weight: 600;
      color: #475569;
    }

    .copy-badge-btn {
      background: #eaf5ee;
      border: 1px solid #52b788;
      color: #2d6a4f;
      font-size: 11px;
      font-weight: 700;
      padding: 3px 9px;
      border-radius: 6px;
      cursor: pointer;
      transition: all 0.2s;
    }

    .copy-badge-btn:hover {
      background-color: #2d6a4f;
      color: #ffffff;
    }

    .inspection-row {
      display: flex;
      align-items: center;
      gap: 8px;
      padding-top: 10px;
      border-top: 1px solid #f1f5f9;
      font-size: 12px;
      color: #334155;
    }

    .dong-kiem-tag {
      background-color: #2d6a4f;
      color: #ffffff;
      font-size: 10.5px;
      font-weight: 700;
      padding: 2px 8px;
      border-radius: 4px;
      display: inline-flex;
      align-items: center;
    }

    .inspection-desc {
      font-size: 11.5px;
      color: #334155;
    }

    .inspection-link {
      margin-left: auto;
      color: #2d6a4f;
      font-weight: 600;
      text-decoration: none;
      font-size: 11.5px;
    }

    /* Timeline Card System */
    .timeline-card-title {
      font-size: 14px;
      font-weight: 800;
      color: #1e293b;
      margin-bottom: 16px;
    }

    .timeline-flex-wrapper {
      position: relative;
      display: flex;
      flex-direction: column;
      gap: 20px;
    }

    .timeline-continuous-v-line {
      position: absolute;
      top: 12px;
      bottom: 12px;
      left: 78px;
      width: 2px;
      background-color: #cbd5e1;
      z-index: 1;
      transform: translateX(-50%);
    }

    .timeline-flex-row {
      display: flex;
      align-items: flex-start;
      position: relative;
      z-index: 2;
    }

    .time-col {
      width: 60px;
      flex-shrink: 0;
      text-align: right;
      padding-right: 10px;
      display: flex;
      flex-direction: column;
      font-size: 11px;
      color: #64748b;
      line-height: 1.35;
    }

    .time-date {
      font-size: 11px;
      color: #64748b;
    }

    .time-hour {
      font-size: 11px;
      color: #64748b;
    }

    .time-hour.active {
      color: #1b4332;
      font-weight: 800;
      font-size: 12px;
    }

    .node-col {
      width: 36px;
      flex-shrink: 0;
      display: flex;
      justify-content: center;
      align-items: flex-start;
      position: relative;
    }

    .active-truck-badge {
      width: 26px;
      height: 26px;
      border-radius: 50%;
      background-color: #2d6a4f;
      color: #ffffff;
      font-size: 12px;
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 0 0 4px #DFF1E6;
    }

    .dot-badge {
      width: 10px;
      height: 10px;
      border-radius: 50%;
      background-color: #94a3b8;
      margin-top: 4px;
    }

    .content-col {
      flex: 1;
      padding-left: 6px;
    }

    .status-title.active {
      font-size: 14px;
      font-weight: 800;
      color: #2d6a4f;
      margin-bottom: 3px;
    }

    .status-desc {
      font-size: 12px;
      color: #475569;
      line-height: 1.45;
    }

    .status-desc-normal {
      font-size: 12px;
      color: #64748b;
      line-height: 1.4;
      margin-top: 1px;
    }

    /* Return Button */
    .btn-return-home {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      background-color: #2d6a4f;
      color: #ffffff;
      font-size: 15px;
      font-weight: 700;
      padding: 14px;
      border-radius: 16px;
      text-decoration: none;
      box-shadow: 0 4px 12px rgba(45, 106, 79, 0.25);
      transition: background-color 0.2s;
      margin-top: 4px;
    }

    .btn-return-home:hover {
      background-color: #1b4332;
      color: #ffffff;
    }
  `]
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
