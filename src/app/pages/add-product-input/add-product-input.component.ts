import { Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-add-product-input',
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

    <div style="padding: 16px; flex: 1; padding-bottom: 24px;">
      <button type="button" (click)="openCamera()" style="display: block; width: 100%; border: 2px dashed #f59e0b; background-color: #fffbeb; border-radius: 16px; padding: 20px; text-align: center; margin-bottom: 10px; cursor: pointer;">
        <img *ngIf="photoPreviewUrl; else cameraIcon" [src]="photoPreviewUrl" alt="Ảnh nông sản đã chụp" style="display: block; width: 100%; max-height: 220px; object-fit: contain; margin-bottom: 8px;">
        <ng-template #cameraIcon><i class="fa-solid fa-camera" style="font-size: 36px; color: #334155; margin-bottom: 8px;"></i></ng-template>
        <div style="font-size: 13px; font-weight: 700; color: #78350f;">{{photoPreviewUrl ? 'Chụp lại ảnh' : 'Chụp ảnh nông sản'}}</div>
        <input #cameraInput type="file" accept="image/*" capture="environment" hidden (change)="onPhotoSelected($event)">
      </button>
      <div style="display: flex; justify-content: flex-end; margin-bottom: 12px;">
        <button type="button" (click)="openGallery()" style="border: 0; background: transparent; color: #587820; font-size: 13px; font-weight: 700; cursor: pointer;">
          <i class="fa-regular fa-image"></i> Chọn từ thư viện
        </button>
        <input #galleryInput type="file" accept="image/*" hidden (change)="onPhotoSelected($event)">
      </div>
      <p *ngIf="photoError" role="alert" style="color: #b91c1c; font-size: 12px; margin: 0 0 12px;">{{photoError}}</p>

      <div style="font-size: 14px; font-weight: 800; color: #587820; margin-bottom: 8px;">Mô tả chi tiết sản phẩm</div>

      <div style="display: grid; grid-template-columns: 1fr 1fr; border-radius: 10px; overflow: hidden; margin-bottom: 16px;">
        <a routerLink="/add-product-voice" style="background-color: #fef08a; color: #854d0e; text-align: center; padding: 10px; font-weight: 700; font-size: 14px; text-decoration: none;">Giọng nói</a>
        <div style="background-color: #92400e; color: #ffffff; text-align: center; padding: 10px; font-weight: 700; font-size: 14px;">Nhập chữ</div>
      </div>

      <div class="form-group">
        <label class="form-label">Loại trái cây muốn bán</label>
        <input type="text" class="form-input" placeholder="Nhập loại trái cây (ví dụ: Xoài, Chôm chôm...)">
      </div>

      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px;">
        <div class="form-group">
          <label class="form-label">Số điện thoại</label>
          <input type="text" class="form-input" placeholder="Nhập số điện thoại">
        </div>
        <div class="form-group">
          <label class="form-label">Ngày thu hoạch</label>
          <input type="text" class="form-input" placeholder="Nhập ngày thu hoạch (ví dụ: 20/10/2026)">
        </div>
      </div>

      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px;">
        <div class="form-group">
          <label class="form-label">Sản lượng</label>
          <input type="text" class="form-input" placeholder="Nhập sản lượng (ví dụ: 50kg)">
        </div>
        <div class="form-group">
          <label class="form-label">Giá cả/ kg</label>
          <input type="text" class="form-input" placeholder="Nhập giá bán (ví dụ: 30.000đ)">
        </div>
      </div>

      <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 8px;">
        <div class="form-group">
          <label class="form-label">Ấp</label>
          <input type="text" class="form-input" placeholder="Nhập Ấp/Thôn">
        </div>
        <div class="form-group">
          <label class="form-label">Xã</label>
          <input type="text" class="form-input" placeholder="Nhập Xã/Phường">
        </div>
        <div class="form-group">
          <label class="form-label">Tỉnh</label>
          <input type="text" class="form-input" placeholder="Nhập Tỉnh/Thành">
        </div>
      </div>

      <div class="form-group">
        <label class="form-label">Mô tả chi tiết sản phẩm</label>
        <textarea class="form-input" rows="3" placeholder="Nhập mô tả chi tiết sản phẩm..."></textarea>
      </div>

      <a routerLink="/edit-product/chom-chom" class="btn-primary" style="background-color: #8db837; margin-bottom: 20px;">
        Tiếp theo
      </a>
    </div>
  `
})
export class AddProductInputComponent implements OnDestroy {
  @ViewChild('cameraInput') private cameraInput?: ElementRef<HTMLInputElement>;
  @ViewChild('galleryInput') private galleryInput?: ElementRef<HTMLInputElement>;

  photoPreviewUrl: string | null = null;
  photoError = '';

  openCamera(): void {
    this.cameraInput?.nativeElement.click();
  }

  openGallery(): void {
    this.galleryInput?.nativeElement.click();
  }

  onPhotoSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    const photo = input.files?.[0];
    input.value = '';
    this.photoError = '';

    if (!photo) {
      return;
    }
    if (!photo.type.startsWith('image/')) {
      this.photoError = 'Vui lòng chọn một tệp hình ảnh.';
      return;
    }

    if (this.photoPreviewUrl) {
      URL.revokeObjectURL(this.photoPreviewUrl);
    }
    this.photoPreviewUrl = URL.createObjectURL(photo);
  }

  ngOnDestroy(): void {
    if (this.photoPreviewUrl) {
      URL.revokeObjectURL(this.photoPreviewUrl);
    }
  }
}
