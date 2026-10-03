const mongoose = require('mongoose');

const voiceUploadLogSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  audioFileUrl: { type: String, required: true },
  transcribedText: { type: String, default: '' },
  extractedJson: { type: Object, default: {} },
  accuracyScore: { type: Number, default: 0 }
}, { timestamps: true });

module.exports = mongoose.model('VoiceUploadLog', voiceUploadLogSchema);
