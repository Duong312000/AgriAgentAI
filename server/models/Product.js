const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  farmerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  name: { type: String, required: true },
  description: { type: String, default: '' },
  priceNum: { type: Number, required: true },
  unit: { type: String, enum: ['kg', 'tấn', 'bao', 'túi', 'két'], required: true },
  stockQuantity: { type: Number, default: 0 },
  location: { type: String, required: true },
  images: [{ type: String }],
  category: { type: String, default: 'Trái cây' },
  status: { 
    type: String, 
    enum: ['AVAILABLE', 'OUT_OF_STOCK', 'DRAFT', 'HIDDEN'], 
    default: 'AVAILABLE' 
  },
  aiPricing: {
    suggestedPrice: Number,
    minPrice: Number,
    maxPrice: Number,
    marketTrend: String
  }
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);
