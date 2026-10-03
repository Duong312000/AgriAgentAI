const mongoose = require('mongoose');

const orderReturnImageSchema = new mongoose.Schema({
  returnId: { type: mongoose.Schema.Types.ObjectId, ref: 'OrderReturn', required: true },
  imageUrl: { type: String, required: true }
}, { timestamps: true });

module.exports = mongoose.model('OrderReturnImage', orderReturnImageSchema);
