const mongoose = require('mongoose');

const orderReturnSchema = new mongoose.Schema({
  returnCode: { type: String, required: true, unique: true },
  orderId: { type: mongoose.Schema.Types.ObjectId, ref: 'Order', required: true },
  buyerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  refundAmount: { type: Number, required: true },
  reason: { type: String, required: true },
  status: { 
    type: String, 
    enum: ['PENDING', 'APPROVED', 'REJECTED', 'REFUNDED'], 
    default: 'PENDING' 
  },
  adminNote: { type: String, default: '' }
}, { timestamps: true });

module.exports = mongoose.model('OrderReturn', orderReturnSchema);
