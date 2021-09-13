const mongoose = require('mongoose');

const RelationshipSchema = new mongoose.Schema(
  {
    userId: {
      type: [String], // max 2 people
      required: true,
    },
    startedDatetime: {
      type: Date,
      required: true,
    },
    tag: {
      type: [String],
      required: false,
    },
    description: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

// Create index for searching
//RelationshipSchema.index({ tag: 'text', description: 'text' });

module.exports = mongoose.model('Relationship', RelationshipSchema);
