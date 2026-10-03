const mongoose = require('mongoose');

const paymentTransactionSchema = new mongoose.Schema({
  orderId: { type: mongoose.Schema.Types.ObjectId, ref: 'Order', required: true },
  transactionCode: { type: String, required: true, unique: true },
  paymentGateway: { type: String, required: true },
  amount: { type: Number, required: true },
  status: { type: String, enum: ['PENDING', 'SUCCESS', 'FAILED'], default: 'PENDING' },
  rawResponse: { type: Object }
}, { timestamps: true });

module.exports = mongoose.model('PaymentTransaction', paymentTransactionSchema);
