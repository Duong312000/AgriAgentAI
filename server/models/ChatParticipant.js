const mongoose = require('mongoose');

const chatParticipantSchema = new mongoose.Schema({
  roomId: { type: mongoose.Schema.Types.ObjectId, ref: 'ChatRoom', required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  isAi: { type: Boolean, default: false }
}, { timestamps: true });

module.exports = mongoose.model('ChatParticipant', chatParticipantSchema);
