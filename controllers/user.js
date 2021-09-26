// Controller to perform CRUD on user parameter
const User = require('../models/user');
const controller = require('./controller-support');
const Validator = require('./validator');
const Search = require('./search');

/*
// Scatch function for POST()
exports.create = (req, res) => {
  console.log(req);
  res.status(200).send({ message: 'nothing to create' });
};
*/

// Update an user identified by the user's Id ==============================
// This Update function behaves differently from other controllers
// It does not return password
exports.update = (req, res) => {
  // Validate firstname, lastname, dateOfBirth information
  // since username and email can't be changed
  // Password is going to be considered sepeartedly due to security matter!
  if (Validator.checkInvalid(req.body.firstName)) {
    return res.status(400).send({
      message: 'Firstname contains invalid characters!',
    });
  }
  if (Validator.checkInvalid(req.body.lastName)) {
    return res.status(400).send({
      message: 'Lastname contains invalid characters!',
    });
  }
  if (Validator.checkValidDate(req.body.dateOfBirth) == "Invalid Date") {
    return res.status(400).send({
      message: 'Invalid dateOfBirth!',
    });
  }
  // Enforce UTC timezone
  if (req.body.dateOfBirth && req.body.dateOfBirth.charAt(req.body.dateOfBirth.length - 1) != 'Z') {
    req.body.dateOfBirth += 'Z';
  }

  // Check for un-changaeble field -- in case of hacking on the way the info is sent to
  // username
  if (req.body.username) {
    return res.status(400).send({
      message: 'username is unchangaeble!',
    });
  }
  // password
  if (req.body.password) {
    return res.status(400).send({
      message: 'password must be changed under protection!',
    });
  }
  // email
  if (req.body.email) {
    return res.status(400).send({
      message: 'email must be changed under protection!',
    });
  }

  // Get the id
  const id = req.params.id;
  // Case of updated sucessfully
  User.findByIdAndUpdate(id, { $set: req.body }, { new: true }).then(
    (updatedData) => {
      res.status(200).send({
        _id: updatedData._id,
        firstName: updatedData.firstName,
        lastName: updatedData.lastName,
        dateOfBirth: updatedData.dateOfBirth,
        biography: updatedData.biography,
      });
    }
  );
};

// Delete an user with the specified user's Id ==============================
exports.delete = (req, res) => {
  controller.deleteData(User, req, res);
};

// Retrieve and return all users from the database =========================
exports.findAll = (req, res) => {
  // Return all users using find()
  var userMap = [];
  User.find()
    .then((data) => {
      data.forEach(function (user) {
        userMap.push({
          _id: user._id,
          username: user.username,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          dateOfBirth: user.dateOfBirth,
          biography: user.biography,
        });
      });
      res.send(userMap);
    })
    // Catching error when accessing the database
    .catch((err) => {
      console.log(err);
      res.status(500).send({ message: 'Error when accessing the database!' });
    });
};

// Find a single user with the user's id ====================================
exports.findOne = (req, res) => {
  // ID
  const id = req.params.id;
  User.findById(id)
    .then((data) => {
      // If user with this id is not found
      if (!data) {
        // return the error messages
        return res.status(404).send({
          message: 'No data is found with this id!',
        });
      }
      // else, return the contact
      res.status(200).send({
        _id: data._id,
        username: data.username,
        email: data.email,
        firstName: data.firstName,
        lastName: data.lastName,
        dateOfBirth: data.dateOfBirth,
        biography: data.biography,
      });
    })
    // Catching the error when assessing the DB
    .catch((err) => {
      console.log(err);
      res.status(500).send({ message: 'Error when accessing the database!' });
    });
};

// Search for users that match with username, first&lastname and email ========
exports.search = (req, res) => {
  Search.userSearch(req, res);
};
