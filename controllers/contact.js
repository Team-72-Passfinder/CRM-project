// Controller to perform CRUD on Contact parameter
const Contact = require('../models/contact');
const controller = require('./controller-support');
const Search = require('./search');
// Controller to perform CRUD on user parameter
const User = require('../models/user');

// Create a new Contact ===================================================
exports.create = (req, res) => {
  //console.log(req);
  // Validate requests
  if (!req.body.firstName || controller.checkInvalid(req.body.firstName)) {
    return res.status(400).send({
      message: 'Missing or invalid firstname!',
    });
  }

  if (!req.body.lastName || controller.checkInvalid(req.body.lastName)) {
    return res.status(400).send({
      message: 'Missing or invalid lastName!',
    });
  }
  // Enforce UTC timezone
  if (req.body.dateOfBirth) {
    console.log(req.body.dateOfBirth);
    if (controller.checkValidDate(req.body.dateOfBirth) == "Invalid Date") {
      return res.status(400).send({
        message: 'Invalid dateOfBirth!',
      });
    }
    if (req.body.dateOfBirth.charAt(req.body.dateOfBirth.length - 1) != 'Z') {
      req.body.dateOfBirth += 'Z';
    }
  }

  // Create a new contact using these information
  const contact = new Contact({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email || '',
    phoneNumber: req.body.phoneNumber || '',
    dateOfBirth: req.body.dateOfBirth || null,
    biography: req.body.biography || '',
  });

  // Save this contact to database
  contact
    .save()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send({
        message: 'Error when creating contact!',
      });
    });

  console.log('New contact created! Yay');
};

// If contact is to be added from an existed userId
exports.addFromId = (req, res) => {
  // Create a new contact by accessing the user's database
  User.findById(req.params.id)
    .then((userData) => {
      // If contact with this id is not found
      if (!userData) {
        // return the error messages
        return res.status(404).send({
          message: 'No user is found with this id!',
        });
      }
      const contact = new Contact({
        firstName: userData.firstName,
        lastName: userData.lastName,
        email: userData.email,
        phoneNumber: '',
        dateOfBirth: userData.dateOfBirth,
        biography: userData.biography || '',
      });

      // Save this contact to database
      contact
        .save()
        .then((data) => {
          res.send(data);
        })
        .catch((err) => {
          console.log(err);
          res.status(500).send({
            message: 'Error when creating contact!',
          });
        });
    })
    // Catching the error when assessing the DB
    .catch((err) => {
      console.log(err);
      res
        .status(500)
        .send({ message: 'Error when accessing the user database!' });
    });

  console.log('New contact created from existed user! Yay');
};

// Update a contact identified by the contact's Id ==============================
exports.update = (req, res) => {
  // Validate data before update the BD
  if (req.body.firstName && controller.checkInvalid(req.body.firstName)) {
    return res.status(400).send({
      message: 'invalid firstname!',
    });
  }
  if (req.body.lastName && controller.checkInvalid(req.body.lastName)) {
    return res.status(400).send({
      message: 'invalid lastname!',
    });
  }

  // Enforce UTC timezone
  if (req.body.dateOfBirth) {
    console.log(req.body.dateOfBirth);
    if (controller.checkValidDate(req.body.dateOfBirth) == "Invalid Date") {
      return res.status(400).send({
        message: 'Invalid dateOfBirth!',
      });
    }
    if (req.body.dateOfBirth.charAt(req.body.dateOfBirth.length - 1) != 'Z')
      req.body.dateOfBirth += 'Z';
  }
  // Update the info
  controller.updateData(Contact, req, res);
};

// Delete a contact with the specified contact's Id ==============================
exports.delete = (req, res) => {
  controller.deleteData(Contact, req, res);
};

// Retrieve and return all contacts from the database =========================
exports.findAll = (req, res) => {
  controller.findAllData(Contact, req, res);
};

// Find a single contact with the contact's id ====================================
exports.findOne = (req, res) => {
  controller.findOne(Contact, req, res);
};

// Search for contacts that match with first&lastname
exports.search = (req, res) => {
  Search.basicSearch(Contact, req, res);
};