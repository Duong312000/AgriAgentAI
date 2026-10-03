const mongoose = require('mongoose');

const orderItemSchema = new mongoose.Schema({
  productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  productName: String,
  quantity: { type: Number, required: true },
  unitPrice: { type: Number, required: true }
});

const orderStatusLogSchema = new mongoose.Schema({
  statusName: { type: String, required: true },
  locationNote: String,
  timestamp: { type: Date, default: Date.now }
});

const orderSchema = new mongoose.Schema({
  orderCode: { type: String, required: true, unique: true },
  buyerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  farmerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  items: [orderItemSchema],
  subtotal: { type: Number, required: true },
  shippingFee: { type: Number, default: 0 },
  discountAmount: { type: Number, default: 0 },
  totalAmount: { type: Number, required: true },
  shippingType: { type: String, enum: ['GROUP', 'EXPRESS'], default: 'EXPRESS' },
  shippingPoolId: { type: mongoose.Schema.Types.ObjectId, ref: 'ShippingPool' },
  receiverName: { type: String, required: true },
  receiverPhone: { type: String, required: true },
  shippingAddress: { type: String, required: true },
  status: { 
    type: String, 
    enum: ['PENDING', 'CONFIRMED', 'SHIPPING', 'DELIVERED', 'COMPLETED', 'CANCELLED', 'RETURNED'], 
    default: 'PENDING' 
  },
  paymentMethod: { type: String, enum: ['COD', 'BANK_QR'], default: 'COD' },
  paymentStatus: { type: String, enum: ['UNPAID', 'PAID', 'REFUNDED'], default: 'UNPAID' },
  statusLogs: [orderStatusLogSchema]
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);
