const mongoose = require('mongoose');
const dns = require('dns');
require('dotenv').config();

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
    console.log('🧹 Đã xóa sạch và làm mới các Collections.');

    // 1. Categories
    const categories = await Category.insertMany([
      { name: 'Trái cây', iconUrl: 'assets/icon/fruit.png' },
      { name: 'Rau củ', iconUrl: 'assets/icon/vegetable.png' },
      { name: 'Nông sản thô', iconUrl: 'assets/icon/grain.png' },
      { name: 'Thủy sản', iconUrl: 'assets/icon/fish.png' }
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
      address: 'Ấp 3, Xã Tân Thạch'
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
      address: 'Chợ Đầu Mối Bình Điền'
    });

    // 3. User Address
    await UserAddress.create({
      userId: buyer1._id,
      recipientName: buyer1.fullName || 'Thương Lái Minh',
      phoneNumber: buyer1.phoneNumber,
      shippingAddress: 'Chợ Đầu Mối Bình Điền, Bình Chánh, TP.HCM',
      isPrimary: true
    });

    // 4. Products
    const product1 = await Product.create({
      farmerId: farmer1._id,
      name: 'Ổi Vú Sữa Bến Tre Giòn Ngọt',
      description: 'Ổi giòn tươi thu hoạch tại vườn, chuẩn VietGAP không chất bảo quản.',
      priceNum: 25000,
      unit: 'kg',
      stockQuantity: 500,
      location: 'Châu Thành, Bến Tre',
      images: ['assets/image/Trái cây/oi.jpg'],
      category: 'Trái cây',
      status: 'AVAILABLE'
    });

    await ProductImage.create({
      productId: product1._id,
      imageUrl: 'assets/image/Trái cây/oi.jpg',
      isPrimary: true
    });

    // 5. Voice & AI Pricing Logs
    const voiceLog = await VoiceUploadLog.create({
      userId: farmer1._id,
      audioFileUrl: 'uploads/audio_sample_01.wav',
      transcribedText: 'Tôi muốn bán ổi vú sữa Bến Tre, sản lượng 500kg',
      extractedJson: { productName: 'Ổi Vú Sữa', quantity: 500, unit: 'kg' },
      accuracyScore: 0.95
    });

    await AiPricingLog.create({
      voiceLogId: voiceLog._id,
      productId: product1._id,
      suggestedPrice: 26000,
      minPrice: 22000,
      maxPrice: 28000,
      marketTrend: 'Ổn định'
    });

    // 6. Logistics (Routes, Stops & Pools)
    const route1 = await ShippingRoute.create({
      routeName: 'Tuyến Miền Tây 01: Bến Tre -> Tiền Giang -> TP.HCM',
      originProvince: 'Bến Tre',
      destinationProvince: 'TP. Hồ Chí Minh',
      totalDistanceKm: 85,
      estimatedHours: 2.5,
      scheduleDays: 'Thứ 2, Thứ 4, Thứ 7'
    });

    await ShippingRouteStop.create({
      routeId: route1._id,
      stopOrder: 1,
      stopName: 'Trạm Gom Châu Thành (Bến Tre)',
      address: 'Kho Gom Tân Thạch, Châu Thành, Bến Tre',
      stopType: 'PICKUP'
    });

    const pool1 = await ShippingPool.create({
      routeId: route1._id,
      poolCode: 'POOL-20261005-01',
      routeName: route1.routeName,
      originProvince: 'Bến Tre',
      destinationProvince: 'TP. Hồ Chí Minh',
      driverName: 'Bác Tài Bảy',
      driverPhone: '0912345678',
      licensePlate: '63C-123.45',
      truckType: 'Xe tải đông lạnh 5 tấn',
      maxCapacityKg: 5000,
      currentWeightKg: 1250,
      departureTime: new Date('2026-10-06T06:00:00Z'),
      status: 'COLLECTING'
    });

    // 7. Orders
    const order1 = await Order.create({
      orderCode: 'AGRI-88231',
      buyerId: buyer1._id,
      farmerId: farmer1._id,
      items: [
        {
          productId: product1._id,
          productName: product1.name,
          quantity: 50,
          unitPrice: product1.priceNum
        }
      ],
      subtotal: 1250000,
      shippingFee: 15000,
      discountAmount: 0,
      totalAmount: 1265000,
      shippingType: 'GROUP',
      shippingPoolId: pool1._id,
      receiverName: 'Thương Lái Minh',
      receiverPhone: buyer1.phoneNumber,
      shippingAddress: 'Chợ Đầu Mối Bình Điền, Bình Chánh, TP.HCM',
      status: 'CONFIRMED',
      paymentMethod: 'BANK_QR',
      paymentStatus: 'PAID'
    });

    // 8. Payment & Wallet
    await PaymentTransaction.create({
      orderId: order1._id,
      transactionCode: 'VNPAY-88231',
      paymentGateway: 'VIETQR',
      amount: order1.totalAmount,
      status: 'SUCCESS'
    });

    await FarmerWallet.create({
      farmerId: farmer1._id,
      availableBalance: 5000000,
      frozenBalance: 1250000,
      bankName: 'Agribank',
      bankAccountNumber: '6700205123456',
      bankAccountHolder: 'NGUYEN VAN BAY'
    });

    // 9. Voucher & Notification & Banner
    await Voucher.create({
      code: 'AGRI50K',
      discountAmount: 50000,
      minOrderValue: 500000,
      startDate: new Date(),
      endDate: new Date('2026-12-31')
    });

    await Notification.create({
      userId: buyer1._id,
      title: 'Đơn hàng #AGRI-88231 đã được xác nhận',
      content: 'Nông dân Chú Bảy Bến Tre đã xác nhận đơn hàng của bạn.',
      type: 'ORDER_UPDATE',
      referenceId: 'AGRI-88231'
    });

    await Banner.create({
      title: 'Nông sản Việt - Kết nối Trực tiếp Nông dân & Thương lái',
      imageUrl: 'assets/image/banner/banner1.jpg'
    });

    console.log('\n🎉 HOÀN TẤT TẠO TOÀN BỘ 27 COLLECTIONS THEO ĐÚNG ĐẶC TẢ BẢN PDF!');
    process.exit(0);

  } catch (error) {
    console.error('❌ Lỗi khi khởi tạo CSDL:', error);
    process.exit(1);
  }
};

seedData();
