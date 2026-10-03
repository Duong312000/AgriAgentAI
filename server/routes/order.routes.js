const express = require('express');
const router = express.Router();
const { Order, ShippingPool, OrderReturn } = require('../models');

// GET /api/orders - Lấy danh sách đơn hàng
router.get('/', async (req, res) => {
  try {
    const { buyerId, farmerId, status } = req.query;
    let query = {};
    if (buyerId) query.buyerId = buyerId;
    if (farmerId) query.farmerId = farmerId;
    if (status) query.status = status;

    const orders = await Order.find(query)
      .populate('buyerId', 'fullName phoneNumber')
      .populate('farmerId', 'fullName phoneNumber')
      .populate('items.productId', 'name priceNum images unit')
      .sort({ createdAt: -1 });

    res.json({ success: true, count: orders.length, data: orders });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// POST /api/orders - Tạo đơn hàng mua nông sản
router.post('/', async (req, res) => {
  try {
    const { buyerId, farmerId, items, shippingFee, shippingType, shippingPoolId, receiverName, receiverPhone, shippingAddress, paymentMethod } = req.body;

    let subtotal = 0;
    if (items && Array.isArray(items)) {
      items.forEach(item => {
        subtotal += (item.quantity * item.unitPrice);
      });
    }

    const totalAmount = subtotal + (shippingFee || 15000);
    const orderCode = 'AGRI-' + Math.floor(10000 + Math.random() * 90000);

    const newOrder = await Order.create({
      orderCode,
      buyerId,
      farmerId,
      items,
      subtotal,
      shippingFee: shippingFee || 15000,
      totalAmount,
      shippingType: shippingType || 'EXPRESS',
      shippingPoolId,
      receiverName,
      receiverPhone,
      shippingAddress,
      paymentMethod: paymentMethod || 'COD',
      status: 'PENDING',
      statusLogs: [
        { statusName: 'Đơn hàng đã được tạo', locationNote: 'Hệ thống AgriAgentAI' }
      ]
    });

    res.status(201).json({ success: true, message: 'Đặt mua nông sản thành công!', data: newOrder });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

// GET /api/orders/returns - Lấy danh sách yêu cầu trả hàng / hoàn tiền
router.get('/returns', async (req, res) => {
  try {
    const returns = await OrderReturn.find()
      .populate({
        path: 'orderId',
        populate: { path: 'items.productId farmerId buyerId' }
      })
      .sort({ createdAt: -1 });

    res.json({ success: true, count: returns.length, data: returns });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// GET /api/orders/:id - Lấy chi tiết đơn hàng
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    let order;
    if (id.startsWith('AGRI-')) {
      order = await Order.findOne({ orderCode: id });
    } else {
      order = await Order.findById(id);
    }

    if (!order) {
      return res.status(404).json({ success: false, message: 'Không tìm thấy đơn hàng' });
    }

    await order.populate('buyerId', 'fullName phoneNumber address');
    await order.populate('farmerId', 'fullName phoneNumber address');
    await order.populate('items.productId', 'name priceNum images unit');

    res.json({ success: true, data: order });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// PUT /api/orders/:id/status - Cập nhật trạng thái đơn hàng
router.put('/:id/status', async (req, res) => {
  try {
    const { id } = req.params;
    const { status, note } = req.body;

    const order = await Order.findById(id);
    if (!order) {
      return res.status(404).json({ success: false, message: 'Không tìm thấy đơn hàng' });
    }

    order.status = status;
    order.statusLogs.push({
      statusName: `Cập nhật trạng thái: ${status}`,
      locationNote: note || 'Hệ thống AgriAgentAI'
    });

    await order.save();
    res.json({ success: true, message: 'Cập nhật trạng thái đơn hàng thành công!', data: order });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
