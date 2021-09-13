const mongoose = require('mongoose');

const ConversationSchema = new mongoose.Schema(
  {
    userId: {
      type: [String],
      required: true,
    },
    messages: [{
      sender: {
        type: String, // this is user's id
        required: false,
      },
      content: {
        type: String,
        required: false,
      },
    }],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Conversation', ConversationSchema);
