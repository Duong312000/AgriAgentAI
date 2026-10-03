const express = require('express');
const router = express.Router();
const { User, UserOtp } = require('../models');

// POST /api/auth/register - Đăng ký tài khoản
router.post('/register', async (req, res) => {
  try {
    const { phoneNumber, firstName, lastName, role, password } = req.body;
    
    const existingUser = await User.findOne({ phoneNumber });
    if (existingUser) {
      return res.status(400).json({ success: false, message: 'Số điện thoại này đã được đăng ký' });
    }

    const newUser = await User.create({
      phoneNumber,
      firstName: firstName || 'Người dùng',
      lastName: lastName || 'Mới',
      role: role || 'BUYER',
      passwordHash: password || 'default_password'
    });

    res.status(201).json({ success: true, message: 'Đăng ký tài khoản thành công!', data: newUser });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

// POST /api/auth/login - Đăng nhập
router.post('/login', async (req, res) => {
  try {
    const { phoneNumber, password } = req.body;
    const user = await User.findOne({ phoneNumber });

    if (!user) {
      return res.status(404).json({ success: false, message: 'Số điện thoại không tồn tại trong hệ thống' });
    }

    res.json({ success: true, message: 'Đăng nhập thành công!', data: user });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// GET /api/auth/profile/:id - Lấy thông tin cá nhân
router.get('/profile/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ success: false, message: 'Không tìm thấy thông tin người dùng' });
    }
    res.json({ success: true, data: user });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
