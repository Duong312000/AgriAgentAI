const mongoose = require('mongoose');

const userOtpSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  phoneNumber: { type: String, required: true },
  otpCode: { type: String, required: true },
  otpType: { 
    type: String, 
    enum: ['REGISTER', 'FORGOT_PASSWORD', 'DELETE_ACCOUNT'], 
    required: true 
  },
  expiresAt: { type: Date, required: true },
  isUsed: { type: Boolean, default: false }
}, { timestamps: true });

module.exports = mongoose.model('UserOtp', userOtpSchema);
