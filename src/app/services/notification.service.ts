import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface NotificationItem {
  _id: string;
  userId: string;
  title: string;
  content: string;
  type: 'ORDER_UPDATE' | 'PRICE_ALERT' | 'SYSTEM';
  referenceId?: string;
  isRead: boolean;
  createdAt: string;
}

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  constructor(private http: HttpClient) {}

  private getBaseUrl(): string {
    if (typeof window !== 'undefined') {
      const hostname = window.location.hostname;
      if (hostname === 'localhost' || hostname === '127.0.0.1') {
        return 'http://localhost:3000/api/notifications';
      }
    }
    return '/api/notifications';
  }

  getNotifications(userId?: string): Observable<{ success: boolean; data: NotificationItem[] }> {
    let url = this.getBaseUrl();
    if (userId) {
      url += `?userId=${userId}`;
    }
    return this.http.get<{ success: boolean; data: NotificationItem[] }>(url);
  }

  getNotificationById(id: string): Observable<{ success: boolean; data: NotificationItem }> {
    return this.http.get<{ success: boolean; data: NotificationItem }>(`${this.getBaseUrl()}/${id}`);
  }

  markAsRead(id: string): Observable<{ success: boolean; data: NotificationItem }> {
    return this.http.put<{ success: boolean; data: NotificationItem }>(`${this.getBaseUrl()}/${id}/read`, {});
  }
}
