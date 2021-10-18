const mongoose = require('mongoose');

const EventSchema = new mongoose.Schema(
  {
    belongsTo: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    startedDateTime: {
      type: Date,
      required: true,
    },
    endedDateTime: {
      type: Date,
      required: false,
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

module.exports = mongoose.model('Event', EventSchema);
