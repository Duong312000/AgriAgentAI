const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  phoneNumber: { type: String, required: true, unique: true },
  email: { type: String, default: '' },
  passwordHash: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  userName: { type: String, default: '' },
  role: { 
    type: String, 
    enum: ['FARMER', 'BUYER', 'STAFF', 'ADMIN'], 
    default: 'BUYER' 
  },
  birthday: { type: Date },
  address: { type: String, default: '' },
  town: { type: String, default: '' },
  province: { type: String, default: '' },
  avatarUrl: { type: String, default: '' }
}, { timestamps: true });

// Virtual getter for full name
userSchema.virtual('fullName').get(function() {
  return `${this.lastName} ${this.firstName}`.trim();
});

module.exports = mongoose.model('User', userSchema);
