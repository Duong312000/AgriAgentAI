const mongoose = require('mongoose');

const userAddressSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  recipientName: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  shippingAddress: { type: String, required: true },
  isPrimary: { type: Boolean, default: false }
}, { timestamps: true });

module.exports = mongoose.model('UserAddress', userAddressSchema);
