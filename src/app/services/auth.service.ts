import { Injectable } from '@angular/core';

export interface UserAccount {
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
  private readonly USERS_KEY = 'agri_users';
  private readonly CURRENT_USER_KEY = 'currentUser';

  constructor() {
    this.initDefaultUsers();
  }

  private initDefaultUsers(): void {
    const users = this.getUsers();
    if (users.length === 0) {
      const defaultUsers: UserAccount[] = [
        {
          fullname: "Tiến Thành",
          username: "tienthanh",
          password: "123",
          role: "farmer",
          phone: "0912345678",
          email: "tienthanh@agriagent.ai",
          address: "Lục Ngạn, Bắc Giang"
        },
        {
          fullname: "Thùy Anh",
          username: "thuyanh",
          password: "123",
          role: "buyer",
          phone: "0987654321",
          email: "thuyanh@gmail.com",
          address: "Chợ Gạo, Tiền Giang"
        }
      ];
      this.saveUsers(defaultUsers);
    }
  }

  getUsers(): UserAccount[] {
    const data = localStorage.getItem(this.USERS_KEY);
    return data ? JSON.parse(data) : [];
  }

  saveUsers(users: UserAccount[]): void {
    localStorage.setItem(this.USERS_KEY, JSON.stringify(users));
  }

  getCurrentUser(): UserAccount {
    const data = localStorage.getItem(this.CURRENT_USER_KEY);
    if (data) {
      return JSON.parse(data);
    }
    // Default fallback
    return {
      fullname: "Tiến Thành",
      username: "tienthanh",
      role: "farmer",
      phone: "0912345678",
      email: "tienthanh@agriagent.ai",
      address: "Lục Ngạn, Bắc Giang"
    };
  }

  register(newUser: UserAccount): { success: boolean; message: string } {
    const users = this.getUsers();
    const existing = users.find(u => u.username.toLowerCase() === newUser.username.toLowerCase());
    if (existing) {
      return { success: false, message: 'Tên đăng nhập này đã tồn tại. Vui lòng chọn tên khác!' };
    }

    users.push(newUser);
    this.saveUsers(users);
    this.setCurrentUser(newUser);
    return { success: true, message: 'Đăng ký thành công!' };
  }

  login(username: string, password: string): { success: boolean; user?: UserAccount; message: string } {
    const users = this.getUsers();
    const user = users.find(u => u.username.toLowerCase() === username.toLowerCase() && u.password === password);

    if (user) {
      this.setCurrentUser(user);
      return { success: true, user, message: 'Đăng nhập thành công!' };
    }

    return { success: false, message: 'Tên đăng nhập hoặc mật khẩu không chính xác! Vui lòng thử lại.' };
  }

  setCurrentUser(user: UserAccount): void {
    const { password, ...safeUser } = user;
    localStorage.setItem(this.CURRENT_USER_KEY, JSON.stringify(safeUser));
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
    if (updated.name && !updated.fullname) {
      newProfile.fullname = updated.name;
    }
    this.setCurrentUser(newProfile);

    // Update in users array as well
    const users = this.getUsers();
    const index = users.findIndex(u => u.username === current.username);
    if (index !== -1) {
      users[index] = { ...users[index], ...updated };
      this.saveUsers(users);
    }
  }
}
