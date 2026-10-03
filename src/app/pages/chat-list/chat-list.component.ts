import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-chat-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div style="background-color: #FFFAD4; flex: 1; display: flex; flex-direction: column; padding-bottom: 90px;">
      <!-- Top Header -->
      <div style="padding: 20px 20px 12px 20px; display: flex; align-items: center; gap: 14px;">
        <img src="assets/image/a28917e48c7907a6a465f308c3e68ba2.jpg" alt="Thùy Anh" style="width: 48px; height: 48px; border-radius: 50%; object-fit: cover;">
        <h1 style="font-size: 28px; font-weight: 800; color: #111827; margin: 0;">Thùy Anh</h1>
      </div>

      <!-- Search Bar Capsule -->
      <div style="padding: 0 20px 14px 20px;">
        <div style="display: flex; align-items: center; gap: 10px; border: 1.5px solid #111827; border-radius: 14px; padding: 10px 16px; background-color: rgba(255,255,255,0.15);">
          <i class="fa-solid fa-magnifying-glass" style="color: #64748b; font-size: 16px;"></i>
          <input type="text" placeholder="Search" style="flex: 1; border: none; outline: none; background: transparent; font-size: 16px; color: #111827; font-family: inherit;">
        </div>
      </div>

      <!-- Top Horizontal Scrollable Active Avatars -->
      <div style="display: flex; gap: 16px; overflow-x: auto; padding: 4px 20px 16px 20px; flex-shrink: 0; background-color: #FFFAD4;">
        <a [routerLink]="['/chat-user', 'duong-mit']" style="text-align: center; flex-shrink: 0; text-decoration: none;">
          <div style="position: relative; width: 62px; height: 62px; margin: 0 auto 6px;">
            <img src="assets/image/622f949df277af76c811644427ebcace.jpg" alt="Dương Mít" style="width: 100%; height: 100%; border-radius: 50%; object-fit: cover;">
            <span style="position: absolute; bottom: 2px; right: 2px; width: 14px; height: 14px; background-color: #22c55e; border: 2.5px solid #ffffff; border-radius: 50%;"></span>
          </div>
          <div style="font-size: 13px; font-weight: 600; color: #b5a468;">Dương Mít</div>
        </a>

        <a [routerLink]="['/chat-user', 'khang-xoai']" style="text-align: center; flex-shrink: 0; text-decoration: none;">
          <div style="position: relative; width: 64px; height: 64px; margin: 0 auto 6px;">
            <img src="assets/image/74acf8d5fc78215adb7b31123fc10cc7.jpg" alt="Khang Xoài" style="width: 100%; height: 100%; border-radius: 50%; object-fit: cover;">
            <span style="position: absolute; bottom: 2px; right: 2px; width: 14px; height: 14px; background-color: #22c55e; border: 2.5px solid #ffffff; border-radius: 50%;"></span>
          </div>
          <div style="font-size: 13px; font-weight: 600; color: #887a38;">Khang Xoài</div>
        </a>

        <a [routerLink]="['/chat-user', 'thanh']" style="text-align: center; flex-shrink: 0; text-decoration: none;">
          <div style="position: relative; width: 64px; height: 64px; margin: 0 auto 6px;">
            <img src="assets/image/492be8585cfc89c15c16f933b6b71976.jpg" alt="Thanh" style="width: 100%; height: 100%; border-radius: 50%; object-fit: cover;">
            <span style="position: absolute; bottom: 2px; right: 2px; width: 14px; height: 14px; background-color: #22c55e; border: 2.5px solid #ffffff; border-radius: 50%;"></span>
          </div>
          <div style="font-size: 13px; font-weight: 600; color: #887a38;">Thanh</div>
        </a>

        <a routerLink="/chat-staff" style="text-align: center; flex-shrink: 0; text-decoration: none;">
          <div style="position: relative; width: 64px; height: 64px; margin: 0 auto 6px;">
            <img src="assets/image/bf6893740faf9b9fd905b3094897788d.jpg" alt="Tiến Thành" style="width: 100%; height: 100%; border-radius: 50%; object-fit: cover;">
            <span style="position: absolute; bottom: 2px; right: 2px; width: 14px; height: 14px; background-color: #22c55e; border: 2.5px solid #ffffff; border-radius: 50%;"></span>
          </div>
          <div style="font-size: 13px; font-weight: 600; color: #887a38;">Tiến Thành</div>
        </a>

        <a routerLink="/chat-ai" style="text-align: center; flex-shrink: 0; text-decoration: none;">
          <div style="position: relative; width: 64px; height: 64px; margin: 0 auto 6px;">
            <img src="assets/image/logo.png" alt="AgriAgent AI" style="width: 100%; height: 100%; border-radius: 50%; object-fit: cover; background: #ffffff;">
            <span style="position: absolute; bottom: 2px; right: 2px; width: 14px; height: 14px; background-color: #22c55e; border: 2.5px solid #ffffff; border-radius: 50%;"></span>
          </div>
          <div style="font-size: 13px; font-weight: 600; color: #887a38;">AgriAgent AI</div>
        </a>
      </div>

      <!-- Recent Chat List -->
      <div style="padding: 12px 18px; flex: 1; background-color: #FFFAD4; display: flex; flex-direction: column; gap: 16px;">
        <a [routerLink]="['/chat-user', 'khang-xoai']" style="display: flex; gap: 14px; align-items: center; text-decoration: none; color: inherit;">
          <img src="assets/image/74acf8d5fc78215adb7b31123fc10cc7.jpg" alt="Khang Xoài" style="width: 60px; height: 60px; border-radius: 50%; object-fit: cover; flex-shrink: 0;">
          <div style="flex: 1; min-width: 0;">
            <div style="font-weight: 800; font-size: 16px; color: #111827; margin-bottom: 3px;">Khang Xoài</div>
            <div style="font-size: 14px; color: #64748b; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">
              Bạn: Xoài này ngon lắm anh · 9:40 AM
            </div>
          </div>
          <i class="fa-regular fa-circle" style="color: #cbd5e1; font-size: 20px;"></i>
        </a>

        <a [routerLink]="['/chat-user', 'truong-giang']" style="display: flex; gap: 14px; align-items: center; text-decoration: none; color: inherit;">
          <img src="assets/image/a28917e48c7907a6a465f308c3e68ba2.jpg" alt="Trường Giang" style="width: 60px; height: 60px; border-radius: 50%; object-fit: cover; flex-shrink: 0;">
          <div style="flex: 1; min-width: 0;">
            <div style="font-weight: 800; font-size: 16px; color: #111827; margin-bottom: 3px;">Trường Giang</div>
            <div style="font-size: 14px; color: #64748b; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">
              Bạn: Xin lỗi vì trời mưa · 9:25 AM
            </div>
          </div>
          <i class="fa-solid fa-circle-check" style="color: #cbd5e1; font-size: 20px;"></i>
        </a>

        <a [routerLink]="['/chat-user', 'thanh']" style="display: flex; gap: 14px; align-items: center; text-decoration: none; color: inherit;">
          <img src="assets/image/492be8585cfc89c15c16f933b6b71976.jpg" alt="Thanh" style="width: 60px; height: 60px; border-radius: 50%; object-fit: cover; flex-shrink: 0;">
          <div style="flex: 1; min-width: 0;">
            <div style="font-weight: 800; font-size: 16px; color: #111827; margin-bottom: 3px;">Thanh</div>
            <div style="font-size: 14px; color: #64748b; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">
              Bạn: Mình xin xác nhận lại đơ... · Fri
            </div>
          </div>
          <i class="fa-solid fa-circle-check" style="color: #cbd5e1; font-size: 20px;"></i>
        </a>

        <a routerLink="/chat-staff" style="display: flex; gap: 14px; align-items: center; text-decoration: none; color: inherit;">
          <img src="assets/image/bf6893740faf9b9fd905b3094897788d.jpg" alt="Tiến Thành" style="width: 60px; height: 60px; border-radius: 50%; object-fit: cover; flex-shrink: 0;">
          <div style="flex: 1; min-width: 0;">
            <div style="font-weight: 800; font-size: 16px; color: #111827; margin-bottom: 3px;">Tiến Thành</div>
            <div style="font-size: 14px; color: #64748b; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">
              Hỗ trợ khách hàng trực tuyến · Vừa xong
            </div>
          </div>
          <i class="fa-solid fa-circle-check" style="color: #cbd5e1; font-size: 20px;"></i>
        </a>

        <a [routerLink]="['/chat-user', 'duong-mit']" style="display: flex; gap: 14px; align-items: center; text-decoration: none; color: inherit;">
          <img src="assets/image/622f949df277af76c811644427ebcace.jpg" alt="Dương Mít" style="width: 60px; height: 60px; border-radius: 50%; object-fit: cover; flex-shrink: 0;">
          <div style="flex: 1; min-width: 0;">
            <div style="font-weight: 800; font-size: 16px; color: #111827; margin-bottom: 3px;">Dương Mít</div>
            <div style="font-size: 14px; color: #64748b; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">
              Lô mít này của tôi hỏn... · Thu
            </div>
          </div>
          <i class="fa-solid fa-circle-check" style="color: #cbd5e1; font-size: 20px;"></i>
        </a>
      </div>
    </div>
  `
})
export class ChatListComponent {}
