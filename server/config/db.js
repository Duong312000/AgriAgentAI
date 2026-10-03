const mongoose = require('mongoose');
const dns = require('dns');

// Khắc phục lỗi DNS SRV trên Windows khi kết nối MongoDB Atlas
try {
  dns.setServers(['8.8.8.8', '1.1.1.1']);
} catch (e) {
  // Bỏ qua nếu môi trường không hỗ trợ đổi DNS
}

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI);
    console.log(`✅ MongoDB đã kết nối thành công: ${conn.connection.host}`);
  } catch (error) {
    console.error(`❌ Kết nối MongoDB thất bại: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;
