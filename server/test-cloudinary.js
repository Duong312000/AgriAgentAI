const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') });
const cloudinary = require('./config/cloudinary');

const testUpload = async () => {
  try {
    console.log('🔄 Đang kết nối và tải ảnh nông sản mẫu lên Cloudinary...');
    const imagePath = path.join(__dirname, '../src/assets/image/Trái cây/chom chom ban.jpg');

    const result = await cloudinary.uploader.upload(imagePath, {
      folder: 'agriagent_ai/products',
      public_id: 'chom_chom_vinh_long_demo',
      transformation: [{ quality: 'auto', fetch_format: 'auto' }]
    });

    console.log('\n🎉 UPLOAD ẢNH LÊN CLOUDINARY THÀNH CÔNG 100%!');
    console.log('-----------------------------------------------------------------');
    console.log('📸 URL ảnh xem trực tiếp:', result.secure_url);
    console.log('📁 Thư mục lưu trữ:', result.public_id);
    console.log('⚡ Dung lượng ảnh sau nén:', (result.bytes / 1024).toFixed(2) + ' KB');
    console.log('-----------------------------------------------------------------\n');
  } catch (error) {
    console.error('❌ Lỗi upload ảnh lên Cloudinary:', error);
  }
};

testUpload();
