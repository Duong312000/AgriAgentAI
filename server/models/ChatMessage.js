const mongoose = require('mongoose');

const chatMessageSchema = new mongoose.Schema({
  roomId: { type: mongoose.Schema.Types.ObjectId, ref: 'ChatRoom', required: true },
  senderId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  messageType: { type: String, enum: ['TEXT', 'IMAGE', 'PRODUCT_CARD'], default: 'TEXT' },
  content: { type: String, required: true },
  sentAt: { type: Date, default: Date.now }
}, { timestamps: true });

module.exports = mongoose.model('ChatMessage', chatMessageSchema);
