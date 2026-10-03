const mongoose = require('mongoose');

const payoutRequestSchema = new mongoose.Schema({
  farmerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  amount: { type: Number, required: true },
  status: { 
    type: String, 
    enum: ['PENDING', 'PROCESSING', 'SUCCESS', 'REJECTED'], 
    default: 'PENDING' 
  },
  transferRefCode: { type: String, default: '' },
  requestedAt: { type: Date, default: Date.now },
  completedAt: { type: Date }
}, { timestamps: true });

module.exports = mongoose.model('PayoutRequest', payoutRequestSchema);
