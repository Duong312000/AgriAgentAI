import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, of, map } from 'rxjs';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:3000/api/products';
  private uploadUrl = 'http://localhost:3000/api/upload/product-image';

  // Dữ liệu dự phòng nếu chưa bật server backend
  private fallbackProducts: Record<string, Product> = {
    "vai": {
      id: "vai",
      name: "Vải Thiều Lục Ngạn",
      priceText: "27.000đ / kg",
      priceNum: 27000,
      unit: "kg",
      image: "assets/image/Trái cây/vai.jpg",
      location: "Lục Ngạn, Tỉnh Bắc Giang",
      stock: "~120 kg",
      farmer: "Bác Hùng Bắc Giang",
      desc: "Vải thiều Lục Ngạn chín đỏ mọng, vỏ mỏng hạt nhỏ.",
      tags: ["✓ Thu hoạch trong ngày", "✓ Vải thiều chính gốc"],
      category: "vai"
    },
    "oi": {
      id: "oi",
      name: "Ổi Vú Sữa Bến Tre",
      priceText: "25.000đ / kg",
      priceNum: 25000,
      unit: "kg",
      image: "assets/image/Trái cây/oi.jpg",
      location: "Châu Thành, Tỉnh Bến Tre",
      stock: "~60 kg",
      farmer: "Chú Bảy Bến Tre",
      desc: "Ổi vú sữa giòn ngọt xốp, ruột ít hạt, giàu vitamin C.",
      tags: ["✓ Trồng hữu cơ", "✓ Giòn ngọt đậm đà"],
      category: "oi"
    },
    "chom-chom": {
      id: "chom-chom",
      name: "Chôm Chôm Thái Vĩnh Long",
      priceText: "34.000đ / kg",
      priceNum: 34000,
      unit: "kg",
      image: "assets/image/Trái cây/chom chom ban.jpg",
      location: "Vĩnh Long",
      stock: "~50 kg",
      farmer: "Chú Thành Đồng Tháp",
      desc: "Chôm chôm Thái chín cây, trái to, râu xanh giòn.",
      tags: ["✓ Hái tại vườn", "✓ Bao ăn 1 đổi 1"],
      category: "chom-chom"
    }
  };

  // Lấy danh sách sản phẩm từ MongoDB API (hoặc fallback)
  getProductsFromApi(): Observable<Product[]> {
    return this.http.get<{ success: boolean; data: any[] }>(this.apiUrl).pipe(
      map(res => {
        if (res && res.success && res.data && res.data.length > 0) {
          return res.data.map(p => ({
            id: p._id,
            name: p.name,
            priceText: `${p.priceNum.toLocaleString('vi-VN')}đ / ${p.unit}`,
            priceNum: p.priceNum,
            unit: p.unit,
            image: p.images && p.images.length > 0 ? p.images[0] : 'assets/image/Trái cây/chom chom ban.jpg',
            location: p.location,
            stock: `~${p.stockQuantity} ${p.unit}`,
            farmer: p.farmerId ? p.farmerId.fullName : 'Chú Bảy Bến Tre',
            desc: p.description,
            tags: ["✓ Thu hoạch trong ngày", "✓ Chuẩn VietGAP"],
            category: p.category
          }));
        }
        return this.getAllProducts();
      }),
      catchError(() => of(this.getAllProducts()))
    );
  }

  // Tải ảnh nông sản lên Cloudinary
  uploadImageToCloudinary(file: File): Observable<{ success: boolean; imageUrl: string }> {
    const formData = new FormData();
    formData.append('image', file);
    return this.http.post<{ success: boolean; imageUrl: string }>(this.uploadUrl, formData);
  }

  // Tạo sản phẩm nông sản mới lên MongoDB
  createProduct(productData: any): Observable<any> {
    return this.http.post(this.apiUrl, productData);
  }

  getAllProducts(): Product[] {
    return Object.values(this.fallbackProducts);
  }

  getProductById(id: string): Product {
    return this.fallbackProducts[id] || this.fallbackProducts['chom-chom'];
  }

  filterProducts(category: string, query: string): Product[] {
    const cleanQuery = query.trim().toLowerCase();
    return this.getAllProducts().filter(p => {
      const matchCat = (!category || category === 'all' || p.category === category || p.id === category);
      const matchQuery = !cleanQuery || p.name.toLowerCase().includes(cleanQuery) || p.location.toLowerCase().includes(cleanQuery);
      return matchCat && matchQuery;
    });
  }
}
