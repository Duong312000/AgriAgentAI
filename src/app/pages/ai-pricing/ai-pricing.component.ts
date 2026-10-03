import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-ai-pricing',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="app-header">
      <a routerLink="/add-product-voice" class="btn-back"><i class="fa-solid fa-chevron-left"></i></a>
      <h2 class="header-title">Kết quả định giá từ AI</h2>
    </div>

    <div style="padding: 16px; flex: 1;">
      <div class="card yellow-tint" style="display: flex; gap: 14px; align-items: center; border-radius: 20px; padding: 16px; margin-bottom: 20px;">
        <img src="https://res.cloudinary.com/zdavpzw2/image/upload/v1791068889/agriagent_ai/tr%C3%A1i_c%C3%A2y/chom_chom_ban.jpg" style="width: 80px; height: 80px; border-radius: 14px; object-fit: cover;">
        <div>
          <h3 style="font-size: 16px; font-weight: 800; color: #1e293b; margin-bottom: 4px;">Chôm Chôm Vĩnh Long</h3>
          <div style="font-size: 18px; font-weight: 800; color: #4d7c0f;">32.000 - 36.000đ/kg</div>
        </div>
      </div>

      <h3 style="font-size: 16px; font-weight: 800; color: #1e293b; margin-bottom: 16px;">Vì sao có mức giá này?</h3>
      <p style="font-size: 13px; color: #64748b; margin-bottom: 16px;">AI đã phân tích các yếu tố kinh tế và môi trường theo thời gian thực:</p>

      <div style="display: flex; flex-direction: column; gap: 16px; margin-bottom: 24px;">
        <div style="display: flex; gap: 14px; align-items: center;">
          <div style="width: 42px; height: 42px; background: #eaf3d8; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: #4d7c0f;">
            <i class="fa-solid fa-star"></i>
          </div>
          <div>
            <div style="font-weight: 800; font-size: 14px; color: #1e293b;">Giá thị trường hiện tại</div>
            <div style="font-size: 12px; color: #64748b;">Tăng 8% so với tuần trước</div>
          </div>
        </div>

        <div style="display: flex; gap: 14px; align-items: center;">
          <div style="width: 42px; height: 42px; background: #eaf3d8; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: #4d7c0f;">
            <i class="fa-solid fa-sun"></i>
          </div>
          <div>
            <div style="font-weight: 800; font-size: 14px; color: #1e293b;">Thời tiết</div>
            <div style="font-size: 12px; color: #64748b;">Thời tiết nắng tốt, dự báo thuận lợi cho thu hoạch sớm.</div>
          </div>
        </div>

        <div style="display: flex; gap: 14px; align-items: center;">
          <div style="width: 42px; height: 42px; background: #eaf3d8; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: #4d7c0f;">
            <i class="fa-solid fa-box"></i>
          </div>
          <div>
            <div style="font-weight: 800; font-size: 14px; color: #1e293b;">Nguồn cung</div>
            <div style="font-size: 12px; color: #64748b;">Sản lượng khu vực đang giảm nhẹ.</div>
          </div>
        </div>
      </div>

      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px;">
        <span style="font-size: 13px; font-weight: 700; color: #1e293b;">Bạn còn câu hỏi nào khác ?</span>
        <a routerLink="/chat-ai" class="btn-primary" style="background-color: #854d0e; width: auto; font-size: 13px; padding: 8px 14px;">Đặt câu hỏi cho AI</a>
      </div>

      <a routerLink="/edit-product/chom-chom" class="btn-primary" style="background-color: #8db837;">
        Tiếp theo
      </a>
    </div>
  `
})
export class AiPricingComponent {}
