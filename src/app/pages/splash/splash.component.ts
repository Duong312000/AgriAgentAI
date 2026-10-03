import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-splash',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div style="background: url('https://res.cloudinary.com/zdavpzw2/image/upload/v1791068887/agriagent_ai/splash_banner.jpg') no-repeat center top / cover; min-height: 100vh; display: flex; flex-direction: column; align-items: center; text-align: center; position: relative; padding: 0 24px 40px 24px; box-sizing: border-box;">
      <div style="margin-top: 18vh; display: flex; flex-direction: column; align-items: center; width: 100%;">
        <img src="https://res.cloudinary.com/zdavpzw2/image/upload/v1791068883/agriagent_ai/logo.png" alt="Nông Thương Logo" style="width: 350px; max-width: 88%; height: auto; margin-bottom: -10px; filter: drop-shadow(0 6px 14px rgba(0,0,0,0.1));">
        <h1 style="font-size: 36px; font-weight: 800; color: #1c522a; letter-spacing: 0.5px; margin-top: -26px; margin-bottom: 4px; text-shadow: 0 3px 6px rgba(0,0,0,0.25), 0 1px 2px rgba(255,255,255,0.8);">
          NÔNG THƯƠNG
        </h1>
        <p style="font-family: 'Dancing Script', 'Georgia', cursive, serif; font-size: 22px; font-weight: 700; color: #234d20; margin-top: 2px; text-shadow: 0 1px 2px rgba(255,255,255,0.6);">Nông sản Việt, giá trị Việt</p>
      </div>

      <div style="margin-top: 11vh; width: 100%; max-width: 340px;">
        <a routerLink="/login" class="btn-primary" style="background-color: #88ad37; color: #ffffff; font-size: 18px; padding: 16px 20px; border-radius: 30px; font-weight: 800; box-shadow: 0 8px 22px rgba(0,0,0,0.22), 0 4px 12px rgba(100,135,40,0.3); filter: drop-shadow(0 4px 8px rgba(0,0,0,0.18)); display: flex; align-items: center; justify-content: center; text-decoration: none; width: 100%;">
          Đăng nhập
        </a>
        <p style="margin-top: 18px; font-size: 15px; color: #2d4612; font-weight: 600; text-shadow: 0 2px 4px rgba(0,0,0,0.25), 0 1px 2px rgba(255,255,255,0.8); filter: drop-shadow(0 2px 4px rgba(0,0,0,0.15));">
          Bạn chưa có tài khoản, <a routerLink="/register" style="color: #1c522a; font-weight: 800; text-decoration: underline;">Đăng ký ngay</a>
        </p>
      </div>
    </div>
  `
})
export class SplashComponent {}
