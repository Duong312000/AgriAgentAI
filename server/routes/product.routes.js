const express = require('express');
const router = express.Router();
const { Product, Category, AiPricingLog } = require('../models');

// GET /api/products - Lấy danh sách sản phẩm nông sản từ CSDL MongoDB
router.get('/', async (req, res) => {
  try {
    const { category, search, status } = req.query;
    let query = {};

    if (category) query.category = category;
    if (status) query.status = status;
    if (search) {
      query.name = { $regex: search, $options: 'i' };
    }

    const products = await Product.find(query).populate('farmerId', 'fullName phoneNumber province town avatarUrl').sort({ createdAt: -1 });
    res.json({ success: true, count: products.length, data: products });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// GET /api/products/:id - Lấy chi tiết 1 sản phẩm
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate('farmerId', 'fullName phoneNumber province town address avatarUrl');
    if (!product) {
      return res.status(404).json({ success: false, message: 'Không tìm thấy sản phẩm nông sản' });
    }
    res.json({ success: true, data: product });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// POST /api/products - Thêm sản phẩm mới
router.post('/', async (req, res) => {
  try {
    let { farmerId, name, description, priceNum, unit, stockQuantity, location, images, category, status } = req.body;
    
    if (!farmerId) {
      const defaultFarmer = await User.findOne({ role: 'FARMER' });
      if (defaultFarmer) farmerId = defaultFarmer._id;
    }

    const newProduct = await Product.create({
      farmerId,
      name: name || 'Nông sản mới',
      description: description || 'Nông sản tươi ngon vừa thu hoạch tại vườn.',
      priceNum: priceNum ? Number(priceNum) : 30000,
      unit: unit || 'kg',
      stockQuantity: stockQuantity ? Number(stockQuantity) : 100,
      location: location || 'Châu Thành, Bến Tre',
      images: images && images.length > 0 ? images : ['https://res.cloudinary.com/zdavpzw2/image/upload/v1791068889/agriagent_ai/tr%C3%A1i_c%C3%A2y/chom_chom_ban.jpg'],
      category: category || 'Trái cây',
      status: status || 'AVAILABLE'
    });

    res.status(201).json({ success: true, message: 'Đăng bài sản phẩm nông sản thành công!', data: newProduct });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

// PUT /api/products/:id - Chỉnh sửa sản phẩm
router.put('/:id', async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!updatedProduct) {
      return res.status(404).json({ success: false, message: 'Sản phẩm không tồn tại' });
    }
    res.json({ success: true, message: 'Cập nhật sản phẩm thành công!', data: updatedProduct });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

// DELETE /api/products/:id - Xóa sản phẩm
router.delete('/:id', async (req, res) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);
    if (!deletedProduct) {
      return res.status(404).json({ success: false, message: 'Sản phẩm không tồn tại' });
    }
    res.json({ success: true, message: 'Đã xóa sản phẩm thành công' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
