const mongoose = require('mongoose');
const dns = require('dns');
const path = require('path');
const fs = require('fs');
require('dotenv').config({ path: path.join(__dirname, '.env') });

// Fix DNS for Windows
try {
  dns.setServers(['8.8.8.8', '1.1.1.1']);
} catch (e) {}

const {
  User,
  UserAddress,
  Category,
  Product,
  ProductImage,
  VoiceUploadLog,
  AiPricingLog,
  MarketPriceBenchmark,
  Order,
  OrderReturn,
  ShippingRoute,
  ShippingRouteStop,
  ShippingPool,
  PaymentTransaction,
  FarmerWallet,
  ChatRoom,
  ChatMessage,
  Voucher,
  Notification,
  ProductReview,
  Banner
} = require('./models');

// Đọc map ảnh Cloudinary vừa được đẩy lên
const imgMapPath = path.join(__dirname, 'cloudinary_images_map.json');
const imgMap = fs.existsSync(imgMapPath) ? JSON.parse(fs.readFileSync(imgMapPath, 'utf8')) : {};

const getCloudUrl = (key, fallback) => imgMap[key] || fallback;

const seedData = async () => {
  try {
    console.log('🔄 Đang kết nối tới MongoDB Atlas...');
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Kết nối MongoDB Atlas thành công!');

    // Clean up collections
    await Promise.all([
      User.deleteMany({}),
      UserAddress.deleteMany({}),
      Category.deleteMany({}),
      Product.deleteMany({}),
      ProductImage.deleteMany({}),
      VoiceUploadLog.deleteMany({}),
      AiPricingLog.deleteMany({}),
      MarketPriceBenchmark.deleteMany({}),
      Order.deleteMany({}),
      OrderReturn.deleteMany({}),
      ShippingRoute.deleteMany({}),
      ShippingRouteStop.deleteMany({}),
      ShippingPool.deleteMany({}),
      PaymentTransaction.deleteMany({}),
      FarmerWallet.deleteMany({}),
      ChatRoom.deleteMany({}),
      ChatMessage.deleteMany({}),
      Voucher.deleteMany({}),
      Notification.deleteMany({}),
      ProductReview.deleteMany({}),
      Banner.deleteMany({})
    ]);
    console.log('🧹 Đã dọn dẹp các Collections cũ.');

    // 1. Categories
    const categories = await Category.insertMany([
      { name: 'Trái cây', iconUrl: getCloudUrl('buyer_icon.png', 'https://res.cloudinary.com/zdavpzw2/image/upload/v1791068878/agriagent_ai/buyer_icon.jpg') },
      { name: 'Rau củ', iconUrl: getCloudUrl('buyer_icon.png', 'https://res.cloudinary.com/zdavpzw2/image/upload/v1791068878/agriagent_ai/buyer_icon.jpg') },
      { name: 'Nông sản thô', iconUrl: getCloudUrl('buyer_icon.png', 'https://res.cloudinary.com/zdavpzw2/image/upload/v1791068878/agriagent_ai/buyer_icon.jpg') },
      { name: 'Thủy sản', iconUrl: getCloudUrl('buyer_icon.png', 'https://res.cloudinary.com/zdavpzw2/image/upload/v1791068878/agriagent_ai/buyer_icon.jpg') }
    ]);

    // 2. Users
    const farmer1 = await User.create({
      phoneNumber: '0901234567',
      email: 'chubay@agri.com',
      passwordHash: 'hashed_password_123',
      firstName: 'Bảy',
      lastName: 'Chú',
      userName: 'chubaybentre',
      role: 'FARMER',
      town: 'Châu Thành',
      province: 'Bến Tre',
      address: 'Ấp 3, Xã Tân Thạch',
      avatarUrl: getCloudUrl('bf6893740faf9b9fd905b3094897788d.jpg', '')
    });

    const buyer1 = await User.create({
      phoneNumber: '0988888888',
      email: 'thuonglai_minh@gmail.com',
      passwordHash: 'hashed_password_123',
      firstName: 'Minh',
      lastName: 'Thương Lái',
      userName: 'thuonglaiminh',
      role: 'BUYER',
      town: 'Bình Chánh',
      province: 'TP. Hồ Chí Minh',
      address: 'Chợ Đầu Mối Bình Điền',
      avatarUrl: getCloudUrl('74acf8d5fc78215adb7b31123fc10cc7.jpg', '')
    });

    // 3. Products với URL Cloudinary chuẩn
    const product1 = await Product.create({
      farmerId: farmer1._id,
      name: 'Ổi Vú Sữa Bến Tre Giòn Ngọt',
      description: 'Ổi giòn tươi thu hoạch tại vườn, chuẩn VietGAP không chất bảo quản.',
      priceNum: 25000,
      unit: 'kg',
      stockQuantity: 500,
      location: 'Châu Thành, Bến Tre',
      images: [getCloudUrl('oi.jpg', 'https://res.cloudinary.com/zdavpzw2/image/upload/v1791068891/agriagent_ai/tr%C3%A1i_c%C3%A2y/oi.jpg')],
      category: 'Trái cây',
      status: 'AVAILABLE'
    });

    const product2 = await Product.create({
      farmerId: farmer1._id,
      name: 'Thanh Long Ruột Đỏ Chợ Gạo',
      description: 'Thanh long ruột đỏ ngọt đậm, trái to đều từ 500g - 800g.',
      priceNum: 35000,
      unit: 'kg',
      stockQuantity: 1200,
      location: 'Chợ Gạo, Tiền Giang',
      images: [getCloudUrl('thanh long.jpg', 'https://res.cloudinary.com/zdavpzw2/image/upload/v1791068894/agriagent_ai/tr%C3%A1i_c%C3%A2y/thanh_long.jpg')],
      category: 'Trái cây',
      status: 'AVAILABLE'
    });

    const product3 = await Product.create({
      farmerId: farmer1._id,
      name: 'Chôm Chôm Thái Vĩnh Long',
      description: 'Chôm chôm Thái chín cây, trái to, râu xanh giòn, thịt tróc róc hạt.',
      priceNum: 34000,
      unit: 'kg',
      stockQuantity: 800,
      location: 'Vĩnh Long',
      images: [getCloudUrl('chom chom ban.jpg', 'https://res.cloudinary.com/zdavpzw2/image/upload/v1791068889/agriagent_ai/tr%C3%A1i_c%C3%A2y/chom_chom_ban.jpg')],
      category: 'Trái cây',
      status: 'AVAILABLE'
    });

    const product4 = await Product.create({
      farmerId: farmer1._id,
      name: 'Sầu Riêng Ri6 Cai Lậy',
      description: 'Sầu riêng Ri6 cơm vàng hạt lép, dẻo ngọt béo ngậy.',
      priceNum: 35000,
      unit: 'kg',
      stockQuantity: 300,
      location: 'Cai Lậy, Tiền Giang',
      images: [getCloudUrl('sau rieng.jpg', 'https://res.cloudinary.com/zdavpzw2/image/upload/v1791068893/agriagent_ai/tr%C3%A1i_c%C3%A2y/sau_rieng.jpg')],
      category: 'Trái cây',
      status: 'AVAILABLE'
    });

    // 4. Banners với URL Cloudinary
    await Banner.insertMany([
      {
        title: 'Nông sản Việt - Kết nối Trực tiếp Nông dân & Thương lái',
        imageUrl: getCloudUrl('home_banner.jpg', 'https://res.cloudinary.com/zdavpzw2/image/upload/v1791068881/agriagent_ai/home_banner.jpg'),
        targetRole: 'ALL',
        isActive: true
      },
      {
        title: 'Gom đơn vận chuyển tuyến Miền Tây - Giảm 50% Phí Ship',
        imageUrl: getCloudUrl('splash_banner.jpg', 'https://res.cloudinary.com/zdavpzw2/image/upload/v1791068887/agriagent_ai/splash_banner.jpg'),
        targetRole: 'BUYER',
        isActive: true
      }
    ]);

    console.log('\n🎉 HOÀN TẤT BƠM TOÀN BỘ CSDL VỚI 100% LINK ĐÁM MÂY CLOUDINARY LÊN MONGO DB ATLAS!');
    process.exit(0);

  } catch (error) {
    console.error('❌ Lỗi khi seed CSDL:', error);
    process.exit(1);
  }
};

seedData();
