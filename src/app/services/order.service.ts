import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface OrderItem {
  productId: any;
  productName: string;
  quantity: number;
  unitPrice: number;
}

export interface StatusLog {
  statusName: string;
  locationNote?: string;
  timestamp?: string;
}

export interface Order {
  _id?: string;
  orderCode: string;
  buyerId?: any;
  farmerId?: any;
  items: OrderItem[];
  subtotal: number;
  shippingFee: number;
  discountAmount?: number;
  totalAmount: number;
  shippingType: 'GROUP' | 'EXPRESS';
  receiverName: string;
  receiverPhone: string;
  shippingAddress: string;
  status: 'PENDING' | 'CONFIRMED' | 'SHIPPING' | 'DELIVERED' | 'COMPLETED' | 'CANCELLED' | 'RETURNED';
  paymentMethod: 'COD' | 'BANK_QR';
  paymentStatus?: 'UNPAID' | 'PAID' | 'REFUNDED';
  statusLogs?: StatusLog[];
  createdAt?: string;
}

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  constructor(private http: HttpClient) {}

  private getBaseUrl(): string {
    if (typeof window !== 'undefined') {
      const hostname = window.location.hostname;
      if (hostname === 'localhost' || hostname === '127.0.0.1') {
        return 'http://localhost:3000/api/orders';
      }
    }
    return '/api/orders';
  }

  getOrders(params?: { buyerId?: string; farmerId?: string; status?: string }): Observable<{ success: boolean; data: Order[] }> {
    let url = this.getBaseUrl();
    const queryParams: string[] = [];
    if (params?.buyerId) queryParams.push(`buyerId=${params.buyerId}`);
    if (params?.farmerId) queryParams.push(`farmerId=${params.farmerId}`);
    if (params?.status) queryParams.push(`status=${params.status}`);
    if (queryParams.length > 0) {
      url += '?' + queryParams.join('&');
    }
    return this.http.get<{ success: boolean; data: Order[] }>(url);
  }

  getOrderById(id: string): Observable<{ success: boolean; data: Order }> {
    return this.http.get<{ success: boolean; data: Order }>(`${this.getBaseUrl()}/${id}`);
  }

  createOrder(orderData: Partial<Order>): Observable<{ success: boolean; data: Order; message: string }> {
    return this.http.post<{ success: boolean; data: Order; message: string }>(this.getBaseUrl(), orderData);
  }

  updateOrderStatus(id: string, status: string, note?: string): Observable<{ success: boolean; data: Order }> {
    return this.http.put<{ success: boolean; data: Order }>(`${this.getBaseUrl()}/${id}/status`, { status, note });
  }

  getReturnRequests(): Observable<{ success: boolean; data: any[] }> {
    return this.http.get<{ success: boolean; data: any[] }>(`${this.getBaseUrl()}/returns`);
  }
}
