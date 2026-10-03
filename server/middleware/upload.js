const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('../config/cloudinary');

// Cấu hình lưu trữ ảnh tự động lên Cloudinary theo đúng thư mục sản phẩm
const productStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'agriagent_ai/products',
    allowed_formats: ['jpg', 'png', 'jpeg', 'webp'],
    transformation: [{ quality: 'auto', fetch_format: 'auto' }]
  }
});

// Cấu hình lưu trữ avatar người dùng
const avatarStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'agriagent_ai/avatars',
    allowed_formats: ['jpg', 'png', 'jpeg', 'webp'],
    transformation: [{ width: 300, height: 300, crop: 'fill', quality: 'auto' }]
  }
});

const uploadProductImage = multer({ storage: productStorage });
const uploadAvatar = multer({ storage: avatarStorage });

module.exports = {
  uploadProductImage,
  uploadAvatar
};
