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

// Map ảnh Cloudinary
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
      ChatParticipant.deleteMany({}),
      ChatMessage.deleteMany({}),
      Voucher.deleteMany({}),
      Notification.deleteMany({}),
      ProductReview.deleteMany({}),
      Banner.deleteMany({})
    ]);
    console.log('🧹 Đã dọn dẹp toàn bộ Collections cũ.');

    // 1. Categories
    const categories = await Category.insertMany([
      { name: 'Trái cây', iconUrl: getCloudUrl('buyer_icon.png', 'https://res.cloudinary.com/zdavpzw2/image/upload/v1791068878/agriagent_ai/buyer_icon.jpg') },
      { name: 'Rau củ', iconUrl: getCloudUrl('buyer_icon.png', 'https://res.cloudinary.com/zdavpzw2/image/upload/v1791068878/agriagent_ai/buyer_icon.jpg') },
      { name: 'Nông sản thô', iconUrl: getCloudUrl('buyer_icon.png', 'https://res.cloudinary.com/zdavpzw2/image/upload/v1791068878/agriagent_ai/buyer_icon.jpg') },
      { name: 'Thủy sản', iconUrl: getCloudUrl('buyer_icon.png', 'https://res.cloudinary.com/zdavpzw2/image/upload/v1791068878/agriagent_ai/buyer_icon.jpg') }
    ]);

    // 2. TAO 5 NGƯỜI DÙNG ẢO (2 NGƯỜI BÁN - FARMER, 3 NGƯỜI MUA - BUYER)
    // --- NGƯỜI BÁN 1 (User Đặc Biệt - Có Đầy Đủ Data Minh Họa) ---
    const farmer1 = await User.create({
      phoneNumber: '0901234567',
      email: 'chubay@agri.com',
      passwordHash: 'hashed_password_123',
      firstName: 'Nông',
      lastName: 'Nguyễn Văn',
      userName: 'chubaybentre',
      role: 'FARMER',
      town: 'Châu Thành',
      province: 'Bến Tre',
      address: 'Ấp 3, Xã Tân Thạch',
      avatarUrl: getCloudUrl('bf6893740faf9b9fd905b3094897788d.jpg', 'https://res.cloudinary.com/zdavpzw2/image/upload/v1791068876/agriagent_ai/bf6893740faf9b9fd905b3094897788d.jpg')
    });

    // --- NGƯỜI BÁN 2 ---
    const farmer2 = await User.create({
      phoneNumber: '0909876543',
      email: 'covuon@dalat.com',
      passwordHash: 'hashed_password_123',
      firstName: 'Vườn',
      lastName: 'Trần Thị',
      userName: 'covuondalat',
      role: 'FARMER',
      town: 'Đức Trọng',
      province: 'Lâm Đồng',
      address: 'Thôn 2, Xã Hiệp An',
      avatarUrl: getCloudUrl('co ban trai cay tren thuyen.jpg', 'https://res.cloudinary.com/zdavpzw2/image/upload/v1791068880/agriagent_ai/co_ban_trai_cay_tren_thuyen.jpg')
    });

    // --- NGƯỜI MUA 1 (Thương Lái Chính Minh Họa) ---
    const buyer1 = await User.create({
      phoneNumber: '0988888888',
      email: 'thuonglai_minh@gmail.com',
      passwordHash: 'hashed_password_123',
      firstName: 'Thương',
      lastName: 'Lê Văn',
      userName: 'thuonglaiminh',
      role: 'BUYER',
      town: 'Bình Chánh',
      province: 'TP. Hồ Chí Minh',
      address: 'Chợ Đầu Mối Bình Điền',
      avatarUrl: getCloudUrl('74acf8d5fc78215adb7b31123fc10cc7.jpg', 'https://res.cloudinary.com/zdavpzw2/image/upload/v1791068873/agriagent_ai/74acf8d5fc78215adb7b31123fc10cc7.jpg')
    });

    // --- NGƯỜI MUA 2 ---
    const buyer2 = await User.create({
      phoneNumber: '0977112233',
      email: 'chuvua_hanoi@gmail.com',
      passwordHash: 'hashed_password_123',
      firstName: 'Lái',
      lastName: 'Phạm Minh',
      userName: 'chuvuahanoi',
      role: 'BUYER',
      town: 'Hoàng Mai',
      province: 'Hà Nội',
      address: 'Chợ Nông Sản Đền Lừ',
      avatarUrl: getCloudUrl('nguoi mua.jpg', 'https://res.cloudinary.com/zdavpzw2/image/upload/v1791068885/agriagent_ai/nguoi_mua.jpg')
    });

    // --- NGƯỜI MUA 3 ---
    const buyer3 = await User.create({
      phoneNumber: '0966554433',
      email: 'xnk_viet@agrigroup.vn',
      passwordHash: 'hashed_password_123',
      firstName: 'Vụ',
      lastName: 'Hoàng Kim',
      userName: 'hoangkimvu',
      role: 'BUYER',
      town: 'Thuận An',
      province: 'Bình Dương',
      address: 'KCN Việt Hương',
      avatarUrl: getCloudUrl('89e2835624d9b5924a7d257483a8024b.jpg', 'https://res.cloudinary.com/zdavpzw2/image/upload/v1791068874/agriagent_ai/89e2835624d9b5924a7d257483a8024b.jpg')
    });

    console.log('✅ Đã tạo 5 người dùng ảo (2 Người bán, 3 Người mua).');

    // 3. SẢN PHẨM / BÀI ĐĂNG (Farmer 1 có 5 bài đăng đầy đủ, Farmer 2 có 2 bài đăng)
    const p1_f1 = await Product.create({
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

    const p2_f1 = await Product.create({
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

    const p3_f1 = await Product.create({
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

    const p4_f1 = await Product.create({
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

    const p5_f1 = await Product.create({
      farmerId: farmer1._id,
      name: 'Xoài Cát Hòa Lộc Tiền Giang',
      description: 'Xoài cát Hòa Lộc chính hiệu, thơm lừng ngọt lịm.',
      priceNum: 45000,
      unit: 'kg',
      stockQuantity: 450,
      location: 'Cái Bè, Tiền Giang',
      images: [getCloudUrl('xoai.jpg', 'https://res.cloudinary.com/zdavpzw2/image/upload/v1791068896/agriagent_ai/tr%C3%A1i_c%C3%A2y/xoai.jpg')],
      category: 'Trái cây',
      status: 'AVAILABLE'
    });

    // Farmer 2: 2 bài đăng
    const p1_f2 = await Product.create({
      farmerId: farmer2._id,
      name: 'Vải Thiều U Hồng Chín Sớm',
      description: 'Vải U Hồng mọng nước, vỏ đỏ tươi, ngọt mát chuẩn VietGAP.',
      priceNum: 38000,
      unit: 'kg',
      stockQuantity: 600,
      location: 'Đức Trọng, Lâm Đồng',
      images: [getCloudUrl('vai.jpg', 'https://res.cloudinary.com/zdavpzw2/image/upload/v1791068895/agriagent_ai/tr%C3%A1i_c%C3%A2y/vai.jpg')],
      category: 'Trái cây',
      status: 'AVAILABLE'
    });

    const p2_f2 = await Product.create({
      farmerId: farmer2._id,
      name: 'Dưa Hấu An Tiêm Long An',
      description: 'Dưa hấu vỏ mỏng ruột đỏ tươi, độ đường cao, giải nhiệt cực tốt.',
      priceNum: 15000,
      unit: 'kg',
      stockQuantity: 1500,
      location: 'Đức Trọng, Lâm Đồng',
      images: [getCloudUrl('dua hau.jpg', 'https://res.cloudinary.com/zdavpzw2/image/upload/v1791068890/agriagent_ai/tr%C3%A1i_c%C3%A2y/dua_hau.jpg')],
      category: 'Trái cây',
      status: 'AVAILABLE'
    });

    console.log('✅ Đã tạo các bài đăng sản phẩm cho 2 người bán.');

    // 4. ĐƠN HÀNG (Mỗi người mua có từ 1 đến 4 đơn hàng)
    // --- Đơn hàng của Farmer 1 & Buyer 1 (Đơn hàng mẫu đầy đủ trạng thái) ---
    const order1 = await Order.create({
      orderCode: 'AGRI-88421',
      buyerId: buyer1._id,
      farmerId: farmer1._id,
      items: [{
        productId: p1_f1._id,
        productName: p1_f1.name,
        quantity: 10,
        unitPrice: p1_f1.priceNum
      }],
      subtotal: 250000,
      shippingFee: 15000,
      totalAmount: 265000,
      shippingType: 'EXPRESS',
      receiverName: 'Lê Văn Thương',
      receiverPhone: '0988888888',
      shippingAddress: 'Chợ Đầu Mối Bình Điền, Bình Chánh, TP. Hồ Chí Minh',
      status: 'SHIPPING',
      paymentMethod: 'COD',
      statusLogs: [
        { statusName: 'Đơn hàng đã được tạo', locationNote: 'Hệ thống AgriAgentAI', timestamp: new Date('2026-10-02T14:15:00Z') },
        { statusName: 'Nhà vườn Nông Văn Bảy đã bàn giao đơn hàng cho nhà xe gom', locationNote: 'Kho Bến Tre', timestamp: new Date('2026-10-02T16:30:00Z') },
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
        productId: p3_f1._id,
        productName: p3_f1.name,
        quantity: 5,
        unitPrice: p3_f1.priceNum
      }],
      subtotal: 170000,
      shippingFee: 15000,
      totalAmount: 185000,
      shippingType: 'EXPRESS',
      receiverName: 'Lê Văn Thương',
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
        productId: p4_f1._id,
        productName: p4_f1.name,
        quantity: 8,
        unitPrice: p4_f1.priceNum
      }],
      subtotal: 280000,
      shippingFee: 15000,
      totalAmount: 295000,
      shippingType: 'GROUP',
      receiverName: 'Lê Văn Thương',
      receiverPhone: '0988888888',
      shippingAddress: 'Chợ Đầu Mối Bình Điền, Bình Chánh, TP. Hồ Chí Minh',
      status: 'COMPLETED',
      paymentMethod: 'BANK_QR',
      paymentStatus: 'PAID',
      statusLogs: [
        { statusName: 'Đã hoàn thành đơn hàng', locationNote: 'Khách đã nhận hàng & thanh toán', timestamp: new Date('2026-09-28T10:00:00Z') }
      ]
    });

    // --- Đơn hàng của Buyer 2 (Phạm Minh Lái - Chủ vựa Hà Nội đặt 2 đơn) ---
    await Order.create({
      orderCode: 'AGRI-44312',
      buyerId: buyer2._id,
      farmerId: farmer1._id,
      items: [{
        productId: p4_f1._id,
        productName: p4_f1.name,
        quantity: 50,
        unitPrice: p4_f1.priceNum
      }],
      subtotal: 1750000,
      shippingFee: 120000,
      totalAmount: 1870000,
      shippingType: 'GROUP',
      receiverName: 'Phạm Minh Lái',
      receiverPhone: '0977112233',
      shippingAddress: 'Chợ Nông Sản Đền Lừ, Hoàng Mai, Hà Nội',
      status: 'CONFIRMED',
      paymentMethod: 'BANK_QR',
      paymentStatus: 'PAID'
    });

    await Order.create({
      orderCode: 'AGRI-55412',
      buyerId: buyer2._id,
      farmerId: farmer2._id,
      items: [{
        productId: p1_f2._id,
        productName: p1_f2.name,
        quantity: 30,
        unitPrice: p1_f2.priceNum
      }],
      subtotal: 1140000,
      shippingFee: 85000,
      totalAmount: 1225000,
      shippingType: 'EXPRESS',
      receiverName: 'Phạm Minh Lái',
      receiverPhone: '0977112233',
      shippingAddress: 'Chợ Nông Sản Đền Lừ, Hoàng Mai, Hà Nội',
      status: 'SHIPPING',
      paymentMethod: 'COD'
    });

    // --- Đơn hàng của Buyer 3 (Hoàng Kim Vụ đặt 1 đơn lớn) ---
    await Order.create({
      orderCode: 'AGRI-66789',
      buyerId: buyer3._id,
      farmerId: farmer1._id,
      items: [{
        productId: p2_f1._id,
        productName: p2_f1.name,
        quantity: 100,
        unitPrice: p2_f1.priceNum
      }],
      subtotal: 3500000,
      shippingFee: 150000,
      totalAmount: 3650000,
      shippingType: 'GROUP',
      receiverName: 'Hoàng Kim Vụ',
      receiverPhone: '0966554433',
      shippingAddress: 'KCN Việt Hương, Thuận An, Bình Dương',
      status: 'COMPLETED',
      paymentMethod: 'BANK_QR',
      paymentStatus: 'PAID'
    });

    console.log('✅ Đã tạo đủ các đơn hàng cho 3 người mua.');

    // 5. TRÒ CHUYỆN (CHAT ROOMS) - ĐẢM BẢO MỖI NGƯỜI CHỈ CHAT VỚI 3 HOẶC 4 NGƯỜI CÒN LẠI
    // Sơ đồ kết nối Chat:
    // User 1 (Farmer1): Chat với User 2, User 3, User 4, User 5 (4 chats)
    // User 2 (Farmer2): Chat với User 1, User 3, User 4 (3 chats)
    // User 3 (Buyer1) : Chat với User 1, User 2, User 4, User 5 (4 chats)
    // User 4 (Buyer2) : Chat với User 1, User 2, User 3, User 5 (4 chats)
    // User 5 (Buyer3) : Chat với User 1, User 3, User 4 (3 chats)

    const createRoomWithMessages = async (uA, uB, messages) => {
      const room = await ChatRoom.create({ roomType: 'BUYER_FARMER' });
      await ChatParticipant.create({ roomId: room._id, userId: uA._id });
      await ChatParticipant.create({ roomId: room._id, userId: uB._id });
      for (const msg of messages) {
        await ChatMessage.create({
          roomId: room._id,
          senderId: msg.sender._id,
          content: msg.text,
          sentAt: msg.time || new Date()
        });
      }
      return room;
    };

    // Chat 1: Farmer 1 & Buyer 1
    await createRoomWithMessages(farmer1, buyer1, [
      { sender: buyer1, text: 'Dạ em chào chú Bảy! Ổi vú sữa Bến Tre hôm nay chất lượng giòn ngọt thế nào chú?' },
      { sender: farmer1, text: 'Chào cháu Thương! Ổi nhà chú mới hái sáng nay tươi ngon bao giòn ngọt nghen.' },
      { sender: buyer1, text: 'Dạ em lấy trước 10kg giao qua Bình Chánh nha chú.' }
    ]);

    // Chat 2: Farmer 1 & Farmer 2
    await createRoomWithMessages(farmer1, farmer2, [
      { sender: farmer2, text: 'Anh Bảy ơi, vụ ổi mùa này giá thu mua dưới Bến Tre ổn không anh?' },
      { sender: farmer1, text: 'Giá tầm 25k/kg cô Vườn ơi, thương lái đang đặt gom nhiều lắm.' }
    ]);

    // Chat 3: Farmer 1 & Buyer 2
    await createRoomWithMessages(farmer1, buyer2, [
      { sender: buyer2, text: 'Chú Bảy cho cháu hỏi Sầu Riêng Ri6 đợt này chuyển ra Hà Nội đi đường gom mất mấy ngày ạ?' },
      { sender: farmer1, text: 'Tầm 2 ngày rưỡi ra tới nơi nghen cháu Lái. Cơm vàng hạt lép đóng thùng xốp kỹ lắm.' }
    ]);

    // Chat 4: Farmer 1 & Buyer 5
    await createRoomWithMessages(farmer1, buyer3, [
      { sender: buyer3, text: 'Chào chú Bảy, công ty em muốn nhập 100kg Thanh Long Ruột Đỏ đóng công xuất khẩu.' },
      { sender: farmer1, text: 'Dạ chú sẵn sàng hàng đẹp 600g trở lên nghen cháu Vụ.' }
    ]);

    // Chat 5: Farmer 2 & Buyer 1
    await createRoomWithMessages(farmer2, buyer1, [
      { sender: buyer1, text: 'Chị Vườn ơi dưa hấu An Tiêm Long An đợt này độ đường bao nhiêu ạ?' },
      { sender: farmer2, text: 'Dưa ngọt đậm độ brix 12-13 luôn em Thương ơi.' }
    ]);

    // Chat 6: Farmer 2 & Buyer 2
    await createRoomWithMessages(farmer2, buyer2, [
      { sender: buyer2, text: 'Chị Vườn gửi giúp em 30kg Vải Thiều ra Hà Nội nhé.' },
      { sender: farmer2, text: 'Ok em Lái, chị đã gửi nhà xe rồi nhé.' }
    ]);

    // Chat 7: Buyer 1 & Buyer 2
    await createRoomWithMessages(buyer1, buyer2, [
      { sender: buyer1, text: 'Anh Lái đợt này gom chuyến ra miền Bắc có dư tải cho em gửi ké vài thùng sầu riêng không?' },
      { sender: buyer2, text: 'Có nhé Thương ơi, tối nay xe anh ghé Chợ Bình Điền bốc hàng luôn.' }
    ]);

    // Chat 8: Buyer 1 & Buyer 3
    await createRoomWithMessages(buyer1, buyer3, [
      { sender: buyer3, text: 'Anh Thương có biết mối nào cung cấp xoài cát Hòa Lộc sỉ số lượng lớn không?' },
      { sender: buyer1, text: 'Có chú Bảy Bến Tre chuyên hàng chuẩn VietGAP đó em, anh gửi thông tin chú qua nhé.' }
    ]);

    // Chat 9: Buyer 2 & Buyer 3
    await createRoomWithMessages(buyer2, buyer3, [
      { sender: buyer2, text: 'Chào bên XNK Việt, đợt này có chuyến gom hàng nông sản ra phía Bắc không ạ?' },
      { sender: buyer3, text: 'Dạ có anh Lái ơi, bên em chạy tuyến Bình Dương - Hà Nội hàng tuần.' }
    ]);

    console.log('✅ Đã tạo các phòng chat (Mỗi người chat đúng 3 hoặc 4 người còn lại).');

    // 6. THÔNG BÁO, VÍ TIỀN & ĐƠN TRẢ HÀNG CHO USER 1 (ĐẠI DIỆN MINH HỌA)
    await OrderReturn.create({
      returnCode: 'RET-8821',
      orderId: order1._id,
      buyerId: buyer1._id,
      refundAmount: 125000,
      reason: 'Bị móp dập quá 30% khi vận chuyển',
      status: 'PENDING',
      adminNote: 'Đang kiểm tra ảnh chụp từ phía đơn vị vận chuyển'
    });

    await Notification.create({
      userId: farmer1._id,
      title: 'Đơn hàng mới mã AGRI-88421 🚚',
      content: 'Thương lái Lê Văn Thương vừa đặt 10kg Ổi Vú Sữa Bến Tre. Vui lòng chuẩn bị hàng!',
      type: 'ORDER_UPDATE',
      referenceId: order1._id.toString(),
      isRead: false
    });

    await Notification.create({
      userId: farmer1._id,
      title: 'Cập nhật giá nông sản hôm nay 📈',
      content: 'Giá Sầu Riêng Ri6 tại Cai Lậy tăng 5% hôm nay, đạt 35.000đ/kg.',
      type: 'PRICE_ALERT',
      referenceId: p4_f1._id.toString(),
      isRead: true
    });

    await Notification.create({
      userId: buyer1._id,
      title: 'Voucher giảm giá 20k Vận Chuyển 🎟️',
      content: 'Bạn vừa nhận được Voucher FREESHIP20K áp dụng cho các đơn gom chuyến.',
      type: 'SYSTEM',
      referenceId: '',
      isRead: false
    });

    await FarmerWallet.create({
      farmerId: farmer1._id,
      balance: 12450000,
      pendingBalance: 2650000,
      bankName: 'Vietcombank',
      bankAccountNumber: '0071000123456',
      bankAccountName: 'NGUYEN VAN NONG'
    });

    console.log('\n🎉 HOÀN TẤT SEED TOÀN BỘ CSDL VỚI 5 NGƯỜI DÙNG ẢO VÀ DỮ LIỆU ĐẦY ĐỦ VÀO MONGO DB ATLAS!');
    process.exit(0);

  } catch (error) {
    console.error('❌ Lỗi khi seed CSDL:', error);
    process.exit(1);
  }
};

seedData();

