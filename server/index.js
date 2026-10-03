const express = require('express');
const cors = require('cors');
require('dotenv').config();
const connectDB = require('./config/db');

// Khởi tạo Express App
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Kết nối CSDL MongoDB
connectDB();

// Đăng ký các REST API Routes
app.use('/api/upload', require('./routes/upload.routes'));
app.use('/api/products', require('./routes/product.routes'));
app.use('/api/auth', require('./routes/auth.routes'));
app.use('/api/orders', require('./routes/order.routes'));
app.use('/api/chats', require('./routes/chat.routes'));
app.use('/api/notifications', require('./routes/notification.routes'));

// Test API Route
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'AgriAgentAI Backend Server đang kết nối MongoDB Atlas & Cloudinary tốt!' 
  });
});

// Port Server (Dành cho Local Dev)
const PORT = process.env.PORT || 3000;

if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => {
    console.log(`🚀 Server Backend AgriAgentAI đang chạy tại http://localhost:${PORT}`);
  });
}

// Export cho Vercel Serverless Functions
module.exports = app;
