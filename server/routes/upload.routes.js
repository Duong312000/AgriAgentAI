const express = require('express');
const router = express.Router();
const { uploadProductImage, uploadAvatar } = require('../middleware/upload');

// API Tải ảnh nông sản lên Cloudinary
router.post('/product-image', uploadProductImage.single('image'), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: 'Vui lòng chọn file ảnh để tải lên' });
    }
    res.json({
      success: true,
      message: 'Tải ảnh nông sản lên Cloudinary thành công!',
      imageUrl: req.file.path
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// API Tải ảnh đại diện người dùng
router.post('/avatar', uploadAvatar.single('avatar'), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: 'Vui lòng chọn file avatar' });
    }
    res.json({
      success: true,
      message: 'Tải ảnh avatar thành công!',
      avatarUrl: req.file.path
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
