import { Injectable } from '@angular/core';

export interface UserProfile {
  name: string;
  phone: string;
  email: string;
  role: 'farmer' | 'buyer';
  avatar: string;
  address: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUser: UserProfile = {
    name: "Thùy Anh",
    phone: "0912 345 678",
    email: "thuyanh.nongdan@gmail.com",
    role: "farmer",
    avatar: "assets/image/492be8585cfc89c15c16f933b6b71976.jpg",
    address: "Lục Ngạn, Bắc Giang"
  };

  getUser(): UserProfile {
    return this.currentUser;
  }

  updateUser(updated: Partial<UserProfile>): void {
    this.currentUser = { ...this.currentUser, ...updated };
  }
}
