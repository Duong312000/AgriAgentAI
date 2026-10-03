import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface ChatRoomData {
  id: string;
  roomType: string;
  participants: any[];
  latestMessage: {
    content: string;
    messageType: string;
    sentAt: string;
    senderId: string;
  } | null;
}

export interface ChatMessageData {
  _id?: string;
  roomId: string;
  senderId: any;
  messageType?: string;
  content: string;
  sentAt?: string;
}

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  constructor(private http: HttpClient) {}

  private getBaseUrl(): string {
    if (typeof window !== 'undefined') {
      const hostname = window.location.hostname;
      if (hostname === 'localhost' || hostname === '127.0.0.1') {
        return 'http://localhost:3000/api/chats';
      }
    }
    return '/api/chats';
  }

  getRooms(userId?: string): Observable<{ success: boolean; count: number; data: ChatRoomData[] }> {
    let url = `${this.getBaseUrl()}/rooms`;
    if (userId) {
      url += `?userId=${userId}`;
    }
    return this.http.get<{ success: boolean; count: number; data: ChatRoomData[] }>(url);
  }

  getMessages(roomId: string): Observable<{ success: boolean; count: number; data: any[] }> {
    return this.http.get<{ success: boolean; count: number; data: any[] }>(`${this.getBaseUrl()}/messages/${roomId}`);
  }

  sendMessage(roomId: string, senderId: string, content: string): Observable<{ success: boolean; data: any }> {
    return this.http.post<{ success: boolean; data: any }>(`${this.getBaseUrl()}/messages`, {
      roomId,
      senderId,
      content,
      messageType: 'TEXT'
    });
  }

  getOrCreateRoom(user1Id: string, user2Id: string, roomType: string = 'BUYER_FARMER'): Observable<{ success: boolean; roomId: string; isNew: boolean }> {
    return this.http.post<{ success: boolean; roomId: string; isNew: boolean }>(`${this.getBaseUrl()}/rooms`, {
      user1Id,
      user2Id,
      roomType
    });
  }
}
