const mongoose = require('mongoose');

const marketPriceBenchmarkSchema = new mongoose.Schema({
  productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
  regionProvince: { type: String, required: true },
  avgPrice: { type: Number, required: true },
  unit: { type: String, required: true },
  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('MarketPriceBenchmark', marketPriceBenchmarkSchema);
