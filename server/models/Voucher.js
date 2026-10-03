const mongoose = require('mongoose');

const voucherSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  code: { type: String, required: true, unique: true },
  discountAmount: { type: Number, required: true },
  maxDiscount: { type: Number },
  minOrderValue: { type: Number, default: 0 },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  isActive: { type: Boolean, default: true }
}, { timestamps: true });

module.exports = mongoose.model('Voucher', voucherSchema);
