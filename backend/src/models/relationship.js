const mongoose = require('mongoose');

const RelationshipSchema = new mongoose.Schema(
  {
    people: {
      type: [String],
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

module.exports = mongoose.model('Relationship', RelationshipSchema);
