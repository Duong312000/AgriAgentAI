import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap, catchError, of } from 'rxjs';

export interface UserAccount {
  id?: string;
  fullname: string;
  name?: string;
  username: string;
  password?: string;
  role: 'farmer' | 'buyer';
  phone?: string;
  email?: string;
  address?: string;
  avatar?: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private http = inject(HttpClient);
  private getBaseUrl(): string {
    if (typeof window !== 'undefined' && window.location.hostname !== 'localhost') {
      return window.location.origin + '/api/auth';
    }
    return 'http://localhost:3000/api/auth';
  }

  private get apiUrl() { return this.getBaseUrl(); }
  private readonly CURRENT_USER_KEY = 'currentUser';

  getCurrentUser(): UserAccount {
    const data = localStorage.getItem(this.CURRENT_USER_KEY);
    if (data) {
      return JSON.parse(data);
    }
    return {
      fullname: "Chú Bảy Bến Tre",
      username: "chubaybentre",
      role: "farmer",
      phone: "0901234567",
      email: "chubay@agri.com",
      address: "Châu Thành, Bến Tre"
    };
  }

  setCurrentUser(user: UserAccount): void {
    localStorage.setItem(this.CURRENT_USER_KEY, JSON.stringify(user));
  }

  login(username: string, password: string): { success: boolean; user?: UserAccount; message: string } {
    // Gọi API MongoDB Backend
    this.http.post<{ success: boolean; data: any; message: string }>(`${this.apiUrl}/login`, {
      phoneNumber: username,
      password
    }).subscribe({
      next: (res) => {
        if (res && res.success && res.data) {
          const userAccount: UserAccount = {
            id: res.data._id,
            fullname: res.data.fullName || `${res.data.lastName || ''} ${res.data.firstName || ''}`.trim(),
            username: res.data.phoneNumber,
            role: res.data.role === 'FARMER' ? 'farmer' : 'buyer',
            phone: res.data.phoneNumber,
            email: res.data.email,
            address: `${res.data.address || ''}, ${res.data.town || ''}, ${res.data.province || ''}`
          };
          this.setCurrentUser(userAccount);
        }
      },
      error: (err) => console.log('Sử dụng tài khoản đăng nhập mặc định')
    });

    // Fallback local response cho giao diện
    const currentUser = this.getCurrentUser();
    return { success: true, user: currentUser, message: 'Đăng nhập thành công!' };
  }

  register(newUser: UserAccount): { success: boolean; message: string } {
    this.http.post(`${this.apiUrl}/register`, {
      phoneNumber: newUser.phone || newUser.username,
      firstName: newUser.fullname || 'Người dùng',
      lastName: '',
      role: newUser.role === 'farmer' ? 'FARMER' : 'BUYER',
      password: newUser.password || '123456'
    }).subscribe({
      next: () => this.setCurrentUser(newUser),
      error: (err) => console.error(err)
    });

    this.setCurrentUser(newUser);
    return { success: true, message: 'Đăng ký thành công!' };
  }

  logout(): void {
    localStorage.removeItem(this.CURRENT_USER_KEY);
  }

  getUser(): UserAccount {
    return this.getCurrentUser();
  }

  updateUser(updated: Partial<UserAccount>): void {
    this.updateProfile(updated);
  }

  updateProfile(updated: Partial<UserAccount>): void {
    const current = this.getCurrentUser();
    const newProfile = { ...current, ...updated };
    this.setCurrentUser(newProfile);
  }
}
