const mongoose = require('mongoose');

const farmerWalletSchema = new mongoose.Schema({
  farmerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
  availableBalance: { type: Number, default: 0 },
  frozenBalance: { type: Number, default: 0 },
  bankName: { type: String, default: '' },
  bankAccountNumber: { type: String, default: '' },
  bankAccountHolder: { type: String, default: '' }
}, { timestamps: true });

module.exports = mongoose.model('FarmerWallet', farmerWalletSchema);
