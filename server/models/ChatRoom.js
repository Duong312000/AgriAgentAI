const mongoose = require('mongoose');

const chatRoomSchema = new mongoose.Schema({
  roomType: { 
    type: String, 
    enum: ['BUYER_FARMER', 'USER_STAFF', 'USER_AI'], 
    required: true 
  }
}, { timestamps: true });

module.exports = mongoose.model('ChatRoom', chatRoomSchema);
