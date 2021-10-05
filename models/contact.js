const mongoose = require('mongoose');

const ContactSchema = new mongoose.Schema(
  {
    belongsTo: {
      type: String,
      required: true,
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: false,
    },
    phoneNumber: {
      type: String,
      required: false,
    },
    dateOfBirth: {
      type: Date,
      required: false,
    },
    jobTitle: {
      type: [String],
      required: false,
    },
    biography: {
      type: String,
      required: false,
    },
    tags: {
      type: [String],
      required: false,
    },
    optionalUserId: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

// Create index for searching
//ContactSchema.index({ firstName: 1, lastName: -1 });

module.exports = mongoose.model('Contact', ContactSchema);
