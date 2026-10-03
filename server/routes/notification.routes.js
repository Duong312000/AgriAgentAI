const express = require('express');
const router = express.Router();
const { Notification } = require('../models');

// GET /api/notifications - Lấy danh sách thông báo
router.get('/', async (req, res) => {
  try {
    const { userId, type } = req.query;
    let query = {};
    if (userId) query.userId = userId;
    if (type) query.type = type;

    const notifications = await Notification.find(query).sort({ createdAt: -1 });
    res.json({ success: true, count: notifications.length, data: notifications });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// GET /api/notifications/:id - Lấy chi tiết thông báo
router.get('/:id', async (req, res) => {
  try {
    const notification = await Notification.findById(req.params.id);
    if (!notification) {
      return res.status(404).json({ success: false, message: 'Không tìm thấy thông báo' });
    }
    res.json({ success: true, data: notification });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// PUT /api/notifications/:id/read - Đánh dấu đã đọc
router.put('/:id/read', async (req, res) => {
  try {
    const notification = await Notification.findByIdAndUpdate(
      req.params.id,
      { isRead: true },
      { new: true }
    );
    res.json({ success: true, data: notification });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
