const mongoose = require('mongoose');

const ConversationSchema = new mongoose.Schema(
  {
    users: {
      type: [String],
      required: true,
    },
    messages: {
      type: [String],
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Conversation', ConversationSchema);
