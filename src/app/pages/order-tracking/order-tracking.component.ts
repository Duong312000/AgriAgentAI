import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { OrderService, Order } from '../../services/order.service';

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
        <h2 class="header-title-text">{{ order ? getStatusText(order.status) : 'Theo dõi đơn hàng' }}</h2>
        <div class="header-right-actions">
          <a routerLink="/chat-staff" class="action-icon-btn" title="Hỗ trợ">
            <i class="fa-solid fa-headset"></i>
          </a>
          <button class="action-icon-btn" title="Trợ giúp">
            <i class="fa-regular fa-circle-question"></i>
          </button>
        </div>
      </div>

      <!-- If Order Exists -->
      <ng-container *ngIf="order; else emptyState">
        <!-- Live Map Visual Section -->
        <div class="map-visual-container">
          <svg width="100%" height="100%" viewBox="0 0 400 280" preserveAspectRatio="none">
            <rect width="400" height="280" fill="#e4f2ea"/>
            <path d="M 0,140 Q 70,120 110,160 T 180,260 L 0,260 Z" fill="#DFF1E6" opacity="0.9"/>
            <rect x="240" y="60" width="140" height="100" rx="12" fill="#DFF1E6" opacity="0.9"/>

            <line x1="30" y1="0" x2="80" y2="280" stroke="#ffffff" stroke-width="10"/>
            <text x="32" y="80" font-size="9" font-weight="bold" fill="#2d6a4f" transform="rotate(78 32 80)">Đ. Lũy Bán Bích</text>

            <line x1="100" y1="0" x2="280" y2="280" stroke="#ffffff" stroke-width="14"/>
            <text x="210" y="170" font-size="9" font-weight="bold" fill="#2d6a4f" transform="rotate(58 210 170)">Đ. Âu Cơ</text>

            <line x1="0" y1="210" x2="400" y2="190" stroke="#ffffff" stroke-width="8"/>
            <text x="180" y="206" font-size="9" font-weight="bold" fill="#2d6a4f">Bình Thới</text>

            <line x1="0" y1="90" x2="400" y2="70" stroke="#ffffff" stroke-width="7"/>

            <text x="20" y="180" font-size="10" font-weight="bold" fill="#1b4332">Đầm Sen 🌳</text>
            <text x="255" y="105" font-size="10" font-weight="bold" fill="#1b4332">Sân vận động Phú Thọ 🏟️</text>
            <text x="110" y="115" font-size="10" font-weight="600" fill="#52b788">HOÀ THẠNH</text>
            <text x="260" y="35" font-size="10" font-weight="600" fill="#1b4332">Chợ Tân Bình 🏪</text>

            <path d="M 160,195 L 250,105 L 205,45 L 165,18" fill="none" stroke="#2d6a4f" stroke-dasharray="5 4" stroke-width="4" stroke-linecap="round"/>

            <g transform="translate(160, 195)">
              <circle cx="0" cy="0" r="14" fill="rgba(45,106,79,0.25)"/>
              <circle cx="0" cy="0" r="7" fill="#1b4332"/>
              <circle cx="0" cy="0" r="3" fill="#ffffff"/>
            </g>

            <g transform="translate(205, 45)">
              <circle cx="0" cy="0" r="16" fill="#2d6a4f"/>
              <circle cx="0" cy="0" r="13" fill="#1b4332"/>
              <path d="M-5,-4 L6,0 L-5,4 L-2,0 Z" fill="#ffffff"/>
            </g>
          </svg>

          <div class="map-status-tooltip">
            <i class="fa-solid fa-truck-fast text-success me-2"></i>
            <span>Đơn {{ order.orderCode }} {{ getStatusTooltip(order.status) }}</span>
          </div>

          <button class="gps-target-btn" title="Định vị">
            <i class="fa-solid fa-crosshairs"></i>
          </button>
        </div>

        <!-- Main Tracking Content Cards -->
        <div class="tracking-content-body">
          
          <!-- Product Summary Card -->
          <div class="bootstrap-card delivery-date-card">
            <img [src]="getProductImage(order)" [alt]="getProductName(order)" class="product-thumb-img">
            <div class="delivery-info">
              <div class="info-label">{{ getProductName(order) }}</div>
              <div class="info-date-highlight">Tổng tiền: {{ order.totalAmount | number:'1.0-0' }}đ</div>
              <div class="info-subtext">Đơn vị: AgriAgent-Express · Địa chỉ: {{ order.shippingAddress }}</div>
            </div>
          </div>

          <!-- Tracking Number & Inspection Card -->
          <div class="bootstrap-card tracking-code-card">
            <div class="code-row">
              <span class="code-title">Mã vận đơn</span>
              <div class="code-value-group">
                <span class="code-number">{{ order.orderCode }}</span>
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
            </div>
          </div>

          <!-- Order Timeline Progress Card -->
          <div class="bootstrap-card timeline-card">
            <div class="timeline-card-title">Tiến trình vận chuyển</div>

            <div class="timeline-flex-wrapper">
              <div class="timeline-continuous-v-line"></div>

              <div *ngFor="let log of order.statusLogs; let isFirst = first" class="timeline-flex-row">
                <div class="time-col">
                  <span class="time-date">{{ log.timestamp | date:'dd/MM' }}</span>
                  <strong [class.active]="isFirst" class="time-hour">{{ log.timestamp | date:'HH:mm' }}</strong>
                </div>
                <div class="node-col">
                  <div [class.active-truck-badge]="isFirst" [class.dot-badge]="!isFirst">
                    <i *ngIf="isFirst" class="fa-solid fa-truck"></i>
                  </div>
                </div>
                <div class="content-col">
                  <div [class.active]="isFirst" [class.status-title]="isFirst" [class.status-desc-normal]="!isFirst">
                    {{ log.statusName }}
                  </div>
                  <div *ngIf="log.locationNote" class="status-desc">
                    {{ log.locationNote }}
                  </div>
                </div>
              </div>

            </div>
          </div>

          <a routerLink="/buyer-home" class="btn-return-home">
            Trở Về Trang Chủ
          </a>

        </div>
      </ng-container>

      <!-- Empty State Template -->
      <ng-template #emptyState>
        <div style="padding: 60px 24px; text-align: center; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 16px;">
          <div style="width: 88px; height: 88px; border-radius: 50%; background-color: #ffffff; display: flex; align-items: center; justify-content: center; box-shadow: 0 4px 14px rgba(0,0,0,0.06);">
            <i class="fa-solid fa-truck-ramp-box" style="font-size: 38px; color: #2d6a4f;"></i>
          </div>
          <h3 style="font-size: 18px; font-weight: 800; color: #1b4332; margin: 0;">Chưa Có Đơn Hàng Đang Giao</h3>
          <p style="font-size: 14px; color: #475569; max-width: 300px; line-height: 1.5; margin: 0;">
            Bạn hiện chưa chọn hoặc chưa phát sinh đơn hàng nào cần theo dõi tiến trình vận chuyển.
          </p>
          <a routerLink="/buyer-home" class="btn-return-home" style="max-width: 260px; margin-top: 12px;">
            Khám Phá Nông Sản Ngay
          </a>
        </div>
      </ng-template>
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
      gap: 8px;
    }

    .action-icon-btn {
      width: 36px;
      height: 36px;
      border-radius: 50%;
      background: transparent;
      border: none;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #475569;
      font-size: 18px;
      text-decoration: none;
      cursor: pointer;
    }

    .map-visual-container {
      position: relative;
      width: 100%;
      height: 220px;
      background-color: #e4f2ea;
      overflow: hidden;
    }

    .map-status-tooltip {
      position: absolute;
      top: 12px;
      left: 50%;
      transform: translateX(-50%);
      background: rgba(255, 255, 255, 0.95);
      backdrop-filter: blur(6px);
      padding: 8px 16px;
      border-radius: 20px;
      font-size: 13px;
      font-weight: 700;
      color: #1b4332;
      box-shadow: 0 4px 12px rgba(0,0,0,0.08);
      white-space: nowrap;
      z-index: 10;
    }

    .gps-target-btn {
      position: absolute;
      bottom: 12px;
      right: 12px;
      width: 38px;
      height: 38px;
      border-radius: 50%;
      background-color: #ffffff;
      border: none;
      box-shadow: 0 2px 8px rgba(0,0,0,0.15);
      color: #2d6a4f;
      font-size: 16px;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      z-index: 10;
    }

    .tracking-content-body {
      padding: 14px;
      display: flex;
      flex-direction: column;
      gap: 12px;
    }

    .bootstrap-card {
      background: #ffffff;
      border-radius: 16px;
      padding: 16px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
      border: 1px solid #e2e8f0;
    }

    .delivery-date-card {
      display: flex;
      align-items: center;
      gap: 14px;
    }

    .product-thumb-img {
      width: 56px;
      height: 56px;
      border-radius: 12px;
      object-fit: cover;
      border: 1px solid #cbd5e1;
    }

    .delivery-info {
      flex: 1;
    }

    .info-label {
      font-size: 13px;
      font-weight: 700;
      color: #1e293b;
      margin-bottom: 2px;
    }

    .info-date-highlight {
      font-size: 14px;
      font-weight: 800;
      color: #ee4d2d;
      margin-bottom: 2px;
    }

    .info-subtext {
      font-size: 11px;
      color: #94a3b8;
    }

    .tracking-code-card {
      display: flex;
      flex-direction: column;
      gap: 10px;
    }

    .code-row {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .code-title {
      font-size: 13px;
      color: #64748b;
      font-weight: 600;
    }

    .code-value-group {
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .code-number {
      font-size: 14px;
      font-weight: 700;
      color: #1e293b;
      letter-spacing: 0.5px;
    }

    .copy-badge-btn {
      background-color: #f1f5f9;
      border: 1px solid #cbd5e1;
      color: #334155;
      font-size: 10px;
      font-weight: 800;
      padding: 3px 8px;
      border-radius: 6px;
      cursor: pointer;
    }

    .inspection-row {
      display: flex;
      align-items: center;
      gap: 8px;
      font-size: 12px;
      padding-top: 8px;
      border-top: 1px dashed #e2e8f0;
    }

    .dong-kiem-tag {
      background-color: #dcfce7;
      color: #15803d;
      font-weight: 800;
      font-size: 10px;
      padding: 2px 6px;
      border-radius: 4px;
    }

    .inspection-desc {
      color: #475569;
      flex: 1;
    }

    .timeline-card-title {
      font-size: 14px;
      font-weight: 700;
      color: #1e293b;
      margin-bottom: 14px;
    }

    .timeline-flex-wrapper {
      position: relative;
      display: flex;
      flex-direction: column;
      gap: 16px;
    }

    .timeline-continuous-v-line {
      position: absolute;
      left: 71px;
      top: 10px;
      bottom: 10px;
      width: 2px;
      background-color: #cbd5e1;
      z-index: 1;
    }

    .timeline-flex-row {
      display: flex;
      align-items: flex-start;
      z-index: 2;
    }

    .time-col {
      width: 60px;
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      padding-right: 10px;
    }

    .time-date {
      font-size: 10px;
      color: #94a3b8;
    }

    .time-hour {
      font-size: 12px;
      color: #64748b;
    }

    .time-hour.active {
      color: #2d6a4f;
      font-weight: 800;
    }

    .node-col {
      width: 24px;
      display: flex;
      justify-content: center;
      align-items: center;
      padding-top: 2px;
    }

    .active-truck-badge {
      width: 22px;
      height: 22px;
      border-radius: 50%;
      background-color: #2d6a4f;
      color: #ffffff;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 10px;
      box-shadow: 0 0 0 4px #dcfce7;
    }

    .dot-badge {
      width: 10px;
      height: 10px;
      border-radius: 50%;
      background-color: #94a3b8;
    }

    .content-col {
      flex: 1;
      padding-left: 10px;
    }

    .status-title {
      font-size: 13px;
      font-weight: 700;
      color: #1e293b;
    }

    .status-title.active {
      color: #2d6a4f;
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
    }

    .btn-return-home:hover {
      background-color: #1b4332;
      color: #ffffff;
    }
  `]
})
export class OrderTrackingComponent implements OnInit {
  copied = false;
  order: Order | null = null;

  constructor(
    private orderService: OrderService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const code = params['code'];
      this.loadOrder(code);
    });
  }

  loadOrder(code?: string): void {
    this.orderService.getOrders().subscribe({
      next: (res) => {
        if (res.success && res.data.length > 0) {
          if (code) {
            this.order = res.data.find(o => o.orderCode === code) || null;
          } else {
            // Find the most recent active/shipping order
            this.order = res.data.find(o => o.status === 'SHIPPING' || o.status === 'PENDING' || o.status === 'CONFIRMED') || null;
          }
        } else {
          this.order = null;
        }
      },
      error: (err) => {
        console.error('Lỗi khi tải thông tin đơn hàng:', err);
        this.order = null;
      }
    });
  }

  getStatusText(status?: string): string {
    switch (status) {
      case 'PENDING': return 'Chờ xác nhận đơn';
      case 'CONFIRMED': return 'Đang chuẩn bị hàng';
      case 'SHIPPING': return 'Đang giao hàng';
      case 'DELIVERED': return 'Đã giao thành công';
      case 'COMPLETED': return 'Đã hoàn thành';
      case 'CANCELLED': return 'Đơn hàng đã hủy';
      case 'RETURNED': return 'Đã trả hàng/Hoàn tiền';
      default: return 'Theo dõi đơn hàng';
    }
  }

  getStatusTooltip(status?: string): string {
    if (status === 'SHIPPING') return 'sắp được giao tới bạn';
    if (status === 'PENDING') return 'đang chờ nhà vườn xác nhận';
    if (status === 'COMPLETED') return 'đã hoàn thành';
    return 'đang được xử lý';
  }

  getProductName(order: Order | null): string {
    if (!order || !order.items || order.items.length === 0) return 'Nông sản VietGAP';
    const first = order.items[0];
    if (typeof first.productId === 'object' && first.productId?.name) {
      return first.productId.name;
    }
    return first.productName || 'Nông sản VietGAP';
  }

  getProductImage(order: Order | null): string {
    if (!order || !order.items || order.items.length === 0) return 'https://res.cloudinary.com/zdavpzw2/image/upload/v1791068891/agriagent_ai/tr%C3%A1i_c%C3%A2y/oi.jpg';
    const first = order.items[0];
    if (typeof first.productId === 'object' && first.productId?.images?.length > 0) {
      return first.productId.images[0];
    }
    return 'https://res.cloudinary.com/zdavpzw2/image/upload/v1791068891/agriagent_ai/tr%C3%A1i_c%C3%A2y/oi.jpg';
  }

  copyTrackingCode(): void {
    this.copied = true;
    setTimeout(() => {
      this.copied = false;
    }, 2500);
  }
}
