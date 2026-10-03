import { Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
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

      <div style="font-size: 14px; font-weight: 800; color: #587820; margin-bottom: 4px;">Mô tả chi tiết sản phẩm</div>
      <div style="font-size: 12px; color: #64748b; margin-bottom: 12px;">Hãy chọn hình thức để mô tả về sản phẩm của bạn</div>

      <div style="display: grid; grid-template-columns: 1fr 1fr; border-radius: 10px; overflow: hidden; margin-bottom: 24px;">
        <div style="background-color: #92400e; color: #ffffff; text-align: center; padding: 12px; font-weight: 700; font-size: 14px;">Giọng nói</div>
        <a routerLink="/add-product-input" style="background-color: #fef08a; color: #854d0e; text-align: center; padding: 12px; font-weight: 700; font-size: 14px; text-decoration: none;">Nhập chữ</a>
      </div>

      <div style="text-align: center; margin-bottom: 20px;">
        <button
          type="button"
          (click)="toggleRecording()"
          [attr.aria-label]="isRecording ? 'Dừng thu âm' : 'Bắt đầu thu âm'"
          [style.background]="isRecording ? '#b91c1c' : '#4d7c0f'"
          style="width: 110px; height: 110px; border: 0; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 16px; color: #fff; box-shadow: 0 10px 25px rgba(77,124,15,0.3); cursor: pointer;">
          <i [class]="isRecording ? 'fa-solid fa-stop' : 'fa-solid fa-microphone'" style="font-size: 42px;"></i>
        </button>
        <div style="font-size: 16px; font-weight: 800; color: #1e293b;">{{recordingStatus}}</div>
        <p *ngIf="recordingError" role="alert" style="color: #b91c1c; font-size: 13px; margin: 8px 0;">{{recordingError}}</p>
        <audio *ngIf="audioUrl" [src]="audioUrl" controls style="display: block; width: 100%; margin-top: 12px;"></audio>
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
export class AddProductVoiceComponent implements OnDestroy {
  @ViewChild('cameraInput') private cameraInput?: ElementRef<HTMLInputElement>;
  @ViewChild('galleryInput') private galleryInput?: ElementRef<HTMLInputElement>;

  photoPreviewUrl: string | null = null;
  photoError = '';
  audioUrl: string | null = null;
  recordingStatus = 'Nhấn micro để bắt đầu thu âm';
  recordingError = '';
  isRecording = false;

  private recorder?: MediaRecorder;
  private mediaStream?: MediaStream;
  private audioChunks: Blob[] = [];
  private destroyed = false;

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

  async toggleRecording(): Promise<void> {
    if (this.isRecording) {
      this.recorder?.stop();
      this.isRecording = false;
      this.recordingStatus = 'Đang lưu bản ghi...';
      return;
    }

    this.recordingError = '';
    if (!navigator.mediaDevices?.getUserMedia || typeof MediaRecorder === 'undefined') {
      this.recordingError = 'Thiết bị hoặc trình duyệt chưa hỗ trợ thu âm. Hãy mở trang bằng HTTPS và thử lại.';
      return;
    }

    try {
      this.mediaStream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mimeType = ['audio/webm;codecs=opus', 'audio/mp4']
        .find(type => MediaRecorder.isTypeSupported(type));
      this.recorder = mimeType
        ? new MediaRecorder(this.mediaStream, { mimeType })
        : new MediaRecorder(this.mediaStream);
      this.audioChunks = [];
      this.recorder.ondataavailable = event => {
        if (event.data.size > 0) {
          this.audioChunks.push(event.data);
        }
      };
      this.recorder.onstop = () => this.finishRecording();
      this.recorder.onerror = () => {
        this.recordingError = 'Không thể thu âm. Vui lòng kiểm tra quyền sử dụng micro và thử lại.';
        this.recordingStatus = 'Chưa có bản ghi';
        this.releaseMediaStream();
      };
      this.recorder.start();
      this.isRecording = true;
      this.recordingStatus = 'Đang thu âm — nhấn để dừng';
    } catch (error) {
      this.releaseMediaStream();
      this.recordingStatus = 'Chưa có bản ghi';
      if (error instanceof DOMException && error.name === 'NotAllowedError') {
        this.recordingError = 'Bạn chưa cấp quyền sử dụng micro. Hãy cho phép micro trong cài đặt trình duyệt.';
      } else {
        this.recordingError = 'Không mở được micro. Hãy kiểm tra quyền truy cập và thử lại.';
      }
    }
  }

  ngOnDestroy(): void {
    this.destroyed = true;
    if (this.recorder?.state === 'recording') {
      this.recorder.stop();
    }
    this.releaseMediaStream();
    if (this.photoPreviewUrl) {
      URL.revokeObjectURL(this.photoPreviewUrl);
    }
    if (this.audioUrl) {
      URL.revokeObjectURL(this.audioUrl);
    }
  }

  private finishRecording(): void {
    this.releaseMediaStream();
    if (this.destroyed) {
      return;
    }

    const blob = new Blob(this.audioChunks, { type: this.recorder?.mimeType || 'audio/webm' });
    this.audioChunks = [];
    if (blob.size === 0) {
      this.recordingStatus = 'Chưa có bản ghi';
      this.recordingError = 'Không ghi nhận được âm thanh. Vui lòng thử lại.';
      return;
    }
    if (this.audioUrl) {
      URL.revokeObjectURL(this.audioUrl);
    }
    this.audioUrl = URL.createObjectURL(blob);
    this.recordingStatus = 'Đã thu âm — nhấn phát để nghe lại';
  }

  private releaseMediaStream(): void {
    this.mediaStream?.getTracks().forEach(track => track.stop());
    this.mediaStream = undefined;
  }
}
