import { Injectable } from '@angular/core';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private productsData: Record<string, Product> = {
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
      desc: "Vải thiều Lục Ngạn chín đỏ mọng, vỏ mỏng hạt nhỏ, thịt dày mọng nước và ngọt thanh đậm đà. Được hái lứa đầu mùa tươi ngon, không hoá chất bảo quản.",
      tags: ["✓ Thu hoạch trong ngày", "✓ Vải thiều chính gốc", "🚚 Giao nhanh toàn quốc"],
      category: "vai"
    },
    "thanh-long": {
      id: "thanh-long",
      name: "Thanh Long Ruột Đỏ",
      priceText: "20.000đ / kg",
      priceNum: 20000,
      unit: "kg",
      image: "assets/image/Trái cây/thanh long.jpg",
      location: "Chợ Gạo, Tỉnh Tiền Giang",
      stock: "~200 kg",
      farmer: "Anh Tuấn Tiền Giang",
      desc: "Thanh long ruột đỏ ngọt đậm, giàu vitamin và chất chống oxy hoá. Trái to tròn da căng bóng, thu hoạch tươi nguyên cành từ vườn Chợ Gạo.",
      tags: ["✓ Ruột đỏ mọng nước", "✓ Chuẩn VietGAP", "🚚 Ghép chuyến giá rẻ"],
      category: "thanh-long"
    },
    "dua-hau": {
      id: "dua-hau",
      name: "Dưa Hấu Long An",
      priceText: "20.000đ / kg",
      priceNum: 20000,
      unit: "kg",
      image: "assets/image/Trái cây/dua hau.jpg",
      location: "Cần Đước, Tỉnh Long An",
      stock: "~85 kg",
      farmer: "Chú Sáu Long An",
      desc: "Dưa hấu vỏ mỏng ruột đỏ tươi, ngọt lịm giải nhiệt ngày hè. Dưa chín cây rộ cần hỗ trợ nông dân thu hoạch và tiêu thụ gấp.",
      tags: ["✓ Đỏ mọng ngọt lịm", "✓ Bao ăn bao đổi", "🚚 Giao ngay trong ngày"],
      category: "dua-hau"
    },
    "sau-rieng": {
      id: "sau-rieng",
      name: "Sầu Riêng Ri6",
      priceText: "35.000đ / kg",
      priceNum: 35000,
      unit: "kg",
      image: "assets/image/Trái cây/sau rieng.jpg",
      location: "Cai Lậy, Tỉnh Tiền Giang",
      stock: "~40 kg",
      farmer: "Cô Ba Cai Lậy",
      desc: "Sầu riêng Ri6 cơm vàng hạt lép, múi dẻo quánh, vị ngọt béo ngậy tự nhiên. Hái rụng chín cây tỏa hương ngào ngạt.",
      tags: ["✓ Cơm vàng hạt lép", "✓ Chín cây tự nhiên", "🚚 Đóng thùng bảo quản"],
      category: "sau-rieng"
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
      desc: "Ổi vú sữa giòn ngọt xốp, ruột ít hạt, giàu vitamin C. Được trồng sạch theo hướng sinh học an toàn cho sức khỏe.",
      tags: ["✓ Trồng hữu cơ", "✓ Giòn ngọt đậm đà", "🚚 Giao hàng tận nơi"],
      category: "oi"
    },
    "xoai": {
      id: "xoai",
      name: "Xoài Cát Hòa Lộc",
      priceText: "30.000đ / kg",
      priceNum: 30000,
      unit: "kg",
      image: "assets/image/Trái cây/xoai.jpg",
      location: "Cao Lãnh, Tỉnh Đồng Tháp",
      stock: "~90 kg",
      farmer: "Anh Minh Cao Lãnh",
      desc: "Xoài Cát Hòa Lộc loại 1 nổi tiếng miền Tây, da mịn vàng ươm, thịt ngọt đậm hương thơm nức lòng.",
      tags: ["✓ Xoài Cát loại 1", "✓ Trái to ngọt đậm", "🚚 Hỗ trợ vận chuyển"],
      category: "xoai"
    },
    "chom-chom": {
      id: "chom-chom",
      name: "Chôm Chôm Thái Vĩnh Long",
      priceText: "34.000đ / kg",
      priceNum: 34000,
      unit: "kg",
      image: "assets/image/Trái cây/chom chom ban.jpg",
      location: "Ấp Hòa, Xã Vĩnh Kim, Tỉnh Đồng Tháp",
      stock: "~50 kg",
      farmer: "Chú Thành Đồng Tháp",
      desc: "Chôm chôm Thái chín cây, trái to, râu xanh giòn, thịt tróc róc hạt, thơm ngọt tự nhiên. Thu hoạch trực tiếp tại vườn.",
      tags: ["✓ Hái tại vườn", "✓ Bao ăn 1 đổi 1", "🚚 Hỗ trợ ghép chuyến"],
      category: "chom-chom"
    }
  };

  getAllProducts(): Product[] {
    return Object.values(this.productsData);
  }

  getProductById(id: string): Product {
    return this.productsData[id] || this.productsData['chom-chom'];
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
