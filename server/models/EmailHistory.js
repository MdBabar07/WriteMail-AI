const mongoose = require('mongoose');

const emailHistorySchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },

  prompt: {
    type: String,
    required: true
  },

  subject: {
    type: String,
    required: true
  },

  emailBody: {
    type: String,
    required: true
  },

  linkedInDM: {
    type: String,
    default: ''
  },

  followUpEmail: {
    type: String,
    default: ''
  }

}, { timestamps: true });

const EmailHistory = mongoose.model('EmailHistory', emailHistorySchema);

module.exports = EmailHistory;