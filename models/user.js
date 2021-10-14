const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema(
  {
    username: { type: String, required: true },
    password: { type: String, required: true },
    email: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    dateOfBirth: { type: Date, required: true },
    phoneNumber: { type: String },
    biography: { type: String },
  },
  {
    timestamps: true,
  }
);

// Create index for searching
//UserSchema.index({ username: 1, email: -1 });

// If you don't want MongoDB to automatically make plural name
// (users), then use the following command
//UserSchema.set('collection', 'user');

UserSchema.methods.hashPassword = function (password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
};

UserSchema.methods.verifyPassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model('User', UserSchema);
