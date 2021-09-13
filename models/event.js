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
// Event searching usually comes with completed status
EventSchema.index({ name: 1, description: -1 });

module.exports = mongoose.model('Event', EventSchema);
