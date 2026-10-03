const mongoose = require('mongoose');

const bannerSchema = new mongoose.Schema({
  title: { type: String, required: true },
  imageUrl: { type: String, required: true },
  targetLink: { type: String, default: '' },
  targetRole: { type: String, enum: ['BUYER', 'FARMER', 'ALL'], default: 'ALL' },
  isActive: { type: Boolean, default: true }
}, { timestamps: true });

module.exports = mongoose.model('Banner', bannerSchema);
