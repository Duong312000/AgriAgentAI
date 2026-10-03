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
  ChatParticipant,
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
    // 5. Orders & Status Logs
    const order1 = await Order.create({
      orderCode: 'AGRI-88421',
      buyerId: buyer1._id,
      farmerId: farmer1._id,
      items: [{
        productId: product1._id,
        productName: product1.name,
        quantity: 10,
        unitPrice: product1.priceNum
      }],
      subtotal: 250000,
      shippingFee: 15000,
      totalAmount: 265000,
      shippingType: 'EXPRESS',
      receiverName: 'Nguyễn Văn Minh',
      receiverPhone: '0988888888',
      shippingAddress: 'Chợ Đầu Mối Bình Điền, Bình Chánh, TP. Hồ Chí Minh',
      status: 'SHIPPING',
      paymentMethod: 'COD',
      statusLogs: [
        { statusName: 'Đơn hàng đã được tạo', locationNote: 'Hệ thống AgriAgentAI', timestamp: new Date('2026-10-02T14:15:00Z') },
        { statusName: 'Nhà vườn Bác Hùng Bắc Giang đã bàn giao đơn hàng cho đơn vị vận chuyển', locationNote: 'Kho Bến Tre', timestamp: new Date('2026-10-02T16:30:00Z') },
        { statusName: 'Đơn hàng đã xuất kho Củ Chi SOC', locationNote: 'Củ Chi SOC', timestamp: new Date('2026-10-03T18:30:00Z') },
        { statusName: 'Đơn hàng đã đến trạm giao hàng 51-HCM DTP/Âu Cơ', locationNote: 'Trạm Âu Cơ', timestamp: new Date('2026-10-04T06:19:00Z') },
        { statusName: 'Đang giao hàng', locationNote: 'Tài xế Nguyễn Văn Hùng đang tới địa chỉ của bạn', timestamp: new Date('2026-10-04T08:18:00Z') }
      ]
    });

    const order2 = await Order.create({
      orderCode: 'AGRI-10023',
      buyerId: buyer1._id,
      farmerId: farmer1._id,
      items: [{
        productId: product3._id,
        productName: product3.name,
        quantity: 5,
        unitPrice: product3.priceNum
      }],
      subtotal: 170000,
      shippingFee: 15000,
      totalAmount: 185000,
      shippingType: 'EXPRESS',
      receiverName: 'Nguyễn Văn Minh',
      receiverPhone: '0988888888',
      shippingAddress: 'Chợ Đầu Mối Bình Điền, Bình Chánh, TP. Hồ Chí Minh',
      status: 'PENDING',
      paymentMethod: 'COD',
      statusLogs: [
        { statusName: 'Đơn hàng chờ xác nhận từ nhà vườn', locationNote: 'Hệ thống AgriAgentAI', timestamp: new Date('2026-10-03T09:00:00Z') }
      ]
    });

    const order3 = await Order.create({
      orderCode: 'AGRI-99102',
      buyerId: buyer1._id,
      farmerId: farmer1._id,
      items: [{
        productId: product4._id,
        productName: product4.name,
        quantity: 8,
        unitPrice: product4.priceNum
      }],
      subtotal: 280000,
      shippingFee: 15000,
      totalAmount: 295000,
      shippingType: 'GROUP',
      receiverName: 'Nguyễn Văn Minh',
      receiverPhone: '0988888888',
      shippingAddress: 'Chợ Đầu Mối Bình Điền, Bình Chánh, TP. Hồ Chí Minh',
      status: 'COMPLETED',
      paymentMethod: 'BANK_QR',
      paymentStatus: 'PAID',
      statusLogs: [
        { statusName: 'Đã hoàn thành đơn hàng', locationNote: 'Khách đã nhận hàng & thanh toán', timestamp: new Date('2026-09-28T10:00:00Z') }
      ]
    });

    const order4 = await Order.create({
      orderCode: 'AGRI-77112',
      buyerId: buyer1._id,
      farmerId: farmer1._id,
      items: [{
        productId: product2._id,
        productName: product2.name,
        quantity: 20,
        unitPrice: product2.priceNum
      }],
      subtotal: 700000,
      shippingFee: 20000,
      totalAmount: 720000,
      shippingType: 'EXPRESS',
      receiverName: 'Nguyễn Văn Minh',
      receiverPhone: '0988888888',
      shippingAddress: 'Chợ Đầu Mối Bình Điền, Bình Chánh, TP. Hồ Chí Minh',
      status: 'CANCELLED',
      paymentMethod: 'COD',
      statusLogs: [
        { statusName: 'Đã hủy đơn hàng do đổi ý', locationNote: 'Người mua tự hủy', timestamp: new Date('2026-09-25T15:00:00Z') }
      ]
    });

    // 6. Order Returns
    await OrderReturn.create({
      returnCode: 'RET-8821',
      orderId: order1._id,
      buyerId: buyer1._id,
      refundAmount: 125000,
      reason: 'Bị móp dập quá 30% khi vận chuyển',
      status: 'PENDING',
      adminNote: 'Đang kiểm tra ảnh chụp từ phía đơn vị vận chuyển'
    });

    // 7. Notifications
    await Notification.create({
      userId: buyer1._id,
      title: 'Đơn hàng đang trên đường giao! 🚚',
      content: 'Đơn hàng mã AGRI-88421 (Ổi Vú Sữa Bến Tre) của bạn đang được tài xế Nguyễn Văn Hùng giao tới địa chỉ Chợ Đầu Mối Bình Điền.',
      type: 'ORDER_UPDATE',
      referenceId: order1._id.toString(),
      isRead: false
    });

    await Notification.create({
      userId: buyer1._id,
      title: 'Cập nhật giá nông sản hôm nay 📈',
      content: 'Giá Sầu Riêng Ri6 tại Cai Lậy tăng 5% hôm nay, đạt 35.000đ/kg. Đặt mua ngay!',
      type: 'PRICE_ALERT',
      referenceId: product4._id.toString(),
      isRead: true
    });

    await Notification.create({
      userId: buyer1._id,
      title: 'Voucher giảm giá 20k Vận Chuyển 🎟️',
      content: 'Bạn vừa nhận được Voucher FREESHIP20K áp dụng cho các đơn gom chuyến đường dài.',
      type: 'SYSTEM',
      referenceId: '',
      isRead: false
    });

    // 8. Chat Rooms & Messages giữa Nông dân Chú Bảy và Thương Lái Minh
    const room1 = await ChatRoom.create({ roomType: 'BUYER_FARMER' });
    await ChatParticipant.create({ roomId: room1._id, userId: buyer1._id });
    await ChatParticipant.create({ roomId: room1._id, userId: farmer1._id });

    await ChatMessage.create({
      roomId: room1._id,
      senderId: buyer1._id,
      content: 'Dạ em chào chú Bảy! Ổi vú sữa Bến Tre hôm nay chất lượng giòn ngọt thế nào chú?',
      sentAt: new Date('2026-10-04T08:30:00Z')
    });
    await ChatMessage.create({
      roomId: room1._id,
      senderId: farmer1._id,
      content: 'Chào cháu Minh! Ổi nhà chú thu hoạch tươi ngon bao giòn ngọt nghen.',
      sentAt: new Date('2026-10-04T08:32:00Z')
    });

    console.log('\n🎉 HOÀN TẤT BƠM TOÀN BỘ CSDL VỚI 100% LINK ĐÁM MÂY CLOUDINARY LÊN MONGO DB ATLAS!');
    process.exit(0);

  } catch (error) {
    console.error('❌ Lỗi khi seed CSDL:', error);
    process.exit(1);
  }
};

seedData();

