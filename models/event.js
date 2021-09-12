const mongoose = require('mongoose');

const EventSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    dateTime: {
      type: Date,
      required: true,
    },
    participants: {
      type: [String],
      required: false,
    },
    description: {
      type: String,
      required: false,
    },
    completed: {
      type: Boolean,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// Create index for searching
EventSchema.index({ name: 'text', description: 'text' });

module.exports = mongoose.model('Event', EventSchema);
