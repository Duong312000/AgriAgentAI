const mongoose = require('mongoose');

const aiPricingLogSchema = new mongoose.Schema({
  voiceLogId: { type: mongoose.Schema.Types.ObjectId, ref: 'VoiceUploadLog' },
  productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
  suggestedPrice: { type: Number, required: true },
  minPrice: { type: Number, required: true },
  maxPrice: { type: Number, required: true },
  marketTrend: { type: String, default: 'Ổn định' }
}, { timestamps: true });

module.exports = mongoose.model('AiPricingLog', aiPricingLogSchema);
