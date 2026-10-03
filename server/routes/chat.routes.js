const express = require('express');
const router = express.Router();
const { ChatRoom, ChatParticipant, ChatMessage, User } = require('../models');

// GET /api/chats/rooms - Lấy danh sách các cuộc trò chuyện của 1 người dùng từ MongoDB
router.get('/rooms', async (req, res) => {
  try {
    const { userId } = req.query;
    
    // Nếu có userId, tìm các phòng mà user đó tham gia
    let roomIds = [];
    if (userId) {
      const participations = await ChatParticipant.find({ userId });
      roomIds = participations.map(p => p.roomId);
    } else {
      const allRooms = await ChatRoom.find({});
      roomIds = allRooms.map(r => r._id);
    }

    // Lấy thông tin các phòng chat
    const rooms = await ChatRoom.find({ _id: { $in: roomIds } }).sort({ updatedAt: -1 });
    
    const result = await Promise.all(rooms.map(async (room) => {
      // Lấy các thành viên trong phòng ngoại trừ chính user đó
      const participants = await ChatParticipant.find({ roomId: room._id }).populate('userId', 'firstName lastName fullName phoneNumber avatarUrl role');
      const latestMessage = await ChatMessage.findOne({ roomId: room._id }).sort({ sentAt: -1 });

      return {
        id: room._id,
        roomType: room.roomType,
        participants,
        latestMessage: latestMessage ? {
          content: latestMessage.content,
          messageType: latestMessage.messageType,
          sentAt: latestMessage.sentAt,
          senderId: latestMessage.senderId
        } : null
      };
    }));

    res.json({ success: true, count: result.length, data: result });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// POST /api/chats/rooms - Tìm hoặc tạo mới phòng chat giữa 2 người dùng
router.post('/rooms', async (req, res) => {
  try {
    const { user1Id, user2Id, roomType } = req.body;
    if (!user1Id || !user2Id) {
      return res.status(400).json({ success: false, message: 'Thiếu ID người tham gia' });
    }

    // Tìm các phòng mà user1Id tham gia
    const user1Rooms = await ChatParticipant.find({ userId: user1Id }).distinct('roomId');
    
    // Tìm phòng mà user2Id cũng tham gia trong danh sách user1Rooms
    const existingParticipation = await ChatParticipant.findOne({
      roomId: { $in: user1Rooms },
      userId: user2Id
    });

    if (existingParticipation) {
      return res.json({ success: true, roomId: existingParticipation.roomId, isNew: false });
    }

    // Tạo phòng mới riêng biệt cho 2 người này
    const newRoom = await ChatRoom.create({ roomType: roomType || 'BUYER_FARMER' });
    await ChatParticipant.create({ roomId: newRoom._id, userId: user1Id });
    await ChatParticipant.create({ roomId: newRoom._id, userId: user2Id });

    res.status(201).json({ success: true, roomId: newRoom._id, isNew: true });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// GET /api/chats/messages/:roomId - Lấy lịch sử tin nhắn trong 1 phòng chat
router.get('/messages/:roomId', async (req, res) => {
  try {
    const messages = await ChatMessage.find({ roomId: req.params.roomId })
      .populate('senderId', 'firstName lastName fullName avatarUrl')
      .sort({ sentAt: 1 });

    res.json({ success: true, count: messages.length, data: messages });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// POST /api/chats/messages - Gửi tin nhắn mới vào MongoDB
router.post('/messages', async (req, res) => {
  try {
    const { roomId, senderId, messageType, content } = req.body;

    const newMessage = await ChatMessage.create({
      roomId,
      senderId,
      messageType: messageType || 'TEXT',
      content,
      sentAt: new Date()
    });

    // Cập nhật mốc thời gian phòng chat
    await ChatRoom.findByIdAndUpdate(roomId, { updatedAt: new Date() });

    res.status(201).json({ success: true, message: 'Đã gửi tin nhắn!', data: newMessage });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

module.exports = router;
