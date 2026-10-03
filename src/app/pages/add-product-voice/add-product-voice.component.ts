import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-add-product-voice',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="app-header">
      <a routerLink="/farmer-home" class="btn-back"><i class="fa-solid fa-chevron-left"></i></a>
      <div>
        <h2 style="font-size: 16px; font-weight: 800; color: #587820;">Thu thập thông tin</h2>
        <div style="font-size: 12px; color: #64748b;">Hãy cung cấp thông tin về sản phẩm của bạn</div>
      </div>
    </div>

    <div style="padding: 16px; flex: 1; padding-bottom: 90px;">
      <div style="border: 2px dashed #f59e0b; background-color: #fffbeb; border-radius: 16px; padding: 24px; text-align: center; margin-bottom: 16px;">
        <i class="fa-solid fa-camera" style="font-size: 40px; color: #334155; margin-bottom: 12px;"></i>
        <div style="font-size: 14px; font-weight: 700; color: #78350f;">Chụp ảnh hoặc tải hình ảnh lên</div>
        <div style="font-size: 12px; color: #92400e; margin-top: 4px;">Hình ảnh sẽ hiện lên tại đây</div>
      </div>

      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-bottom: 20px;">
        <button class="btn-secondary" style="border: 1px dashed #769f2e; background: #f4f8ec; font-size: 14px;"><i class="fa-solid fa-camera"></i> Chụp ảnh</button>
        <button class="btn-secondary" style="border: 1px dashed #769f2e; background: #f4f8ec; font-size: 14px;"><i class="fa-solid fa-image"></i> Tải ảnh từ thư viện</button>
      </div>

      <div style="font-size: 14px; font-weight: 800; color: #587820; margin-bottom: 4px;">Mô tả chi tiết sản phẩm</div>
      <div style="font-size: 12px; color: #64748b; margin-bottom: 12px;">Hãy chọn hình thức để mô tả về sản phẩm của bạn</div>

      <div style="display: grid; grid-template-columns: 1fr 1fr; border-radius: 10px; overflow: hidden; margin-bottom: 24px;">
        <div style="background-color: #92400e; color: #ffffff; text-align: center; padding: 12px; font-weight: 700; font-size: 14px;">Giọng nói</div>
        <a routerLink="/add-product-input" style="background-color: #fef08a; color: #854d0e; text-align: center; padding: 12px; font-weight: 700; font-size: 14px; text-decoration: none;">Nhập chữ</a>
      </div>

      <div style="text-align: center; margin-bottom: 20px;">
        <div style="width: 110px; height: 110px; background: #4d7c0f; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 16px; box-shadow: 0 10px 25px rgba(77,124,15,0.3); cursor: pointer;">
          <i class="fa-solid fa-microphone" style="font-size: 50px; color: #ffffff;"></i>
        </div>
        <div style="font-size: 16px; font-weight: 800; color: #1e293b;">Đang thu giọng nói...</div>
        <div style="background: #f1f5f9; padding: 10px 16px; border-radius: 12px; margin-top: 10px; font-size: 14px; color: #475569; font-style: italic;">
          "Tôi muốn bán chôm chôm, 50 kg,"
        </div>
      </div>

      <div style="margin-bottom: 20px;">
        <div style="font-size: 13px; font-weight: 700; color: #334155; margin-bottom: 10px;">Bạn có thể trả lời những câu hỏi như sau:</div>
        <div style="background: #fef08a; padding: 10px 14px; border-radius: 12px; margin-bottom: 8px; font-size: 13px; font-weight: 700;">Loại trái cây: <span style="font-weight: 400;">Bán trái cây gì?</span></div>
        <div style="background: #fef08a; padding: 10px 14px; border-radius: 12px; margin-bottom: 8px; font-size: 13px; font-weight: 700;">Sản lượng: <span style="font-weight: 400;">Cần bán bao nhiêu kg hoặc tấn?</span></div>
        <div style="background: #fef08a; padding: 10px 14px; border-radius: 12px; margin-bottom: 8px; font-size: 13px; font-weight: 700;">Thời gian: <span style="font-weight: 400;">Khi nào thu hoạch hoặc cần bán xong trước ngày nào?</span></div>
      </div>

      <a routerLink="/ai-pricing" class="btn-primary" style="background-color: #8db837; margin-bottom: 20px;">
        Tiếp theo
      </a>
    </div>
  `
})
export class AddProductVoiceComponent {}
