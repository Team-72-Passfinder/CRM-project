// Controller to perform CRUD on Contact parameter
const Contact = require('../models/contact');
const controller = require('./controller-support');
const Validator = require('./validator');
const Search = require('./search');
const User = require('../models/user');
const Relationship = require('../models/relationship');
const { isValidObjectId } = require('mongoose');

// Create a new Contact ===================================================
exports.create = async (req, res) => {
  // Validate requests
  if (!req.body.firstName /*|| Validator.checkInvalid(req.body.firstName)*/) {
    return res.status(400).send({
      message: 'Missing or invalid firstname!',
    });
  }

  if (!req.body.lastName /*|| Validator.checkInvalid(req.body.lastName)*/) {
    return res.status(400).send({
      message: 'Missing or invalid lastName!',
    });
  }
  // Enforce UTC timezone
  if (req.body.dateOfBirth) {
    if (Validator.checkValidDate(req.body.dateOfBirth) == 'Invalid Date') {
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
    belongsTo: req.user._id,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email || '',
    phoneNumber: req.body.phoneNumber || '',
    dateOfBirth: req.body.dateOfBirth || null,
    jobTitle: req.body.jobTitle || [],
    tags: req.body.tags || [],
    biography: req.body.biography || '',
  });

  // Save this contact to database
  contact
    .save()
    .then((data) => {
      // Create new rlationship between this contact and the user
      const newRela = new Relationship({
        belongsTo: req.user._id,
        people: [req.user._id, data._id].sort(),
        tag: req.body.tags || [],
      });
      // Save
      newRela.save();
      res.send(data);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send({
        message: 'Error when creating contact!',
      });
    });
};

// If contact is to be added from an existed userId ===============================
exports.addFromId = async (req, res) => {
  // Validate the UserId 
  if (!req.params.userId || !isValidObjectId(req.params.userId)) {
    return res.status(400).send({
      message: 'Missing userId!',
    });
  }
  let userId = req.params.userId;
  // Create a new contact by accessing the user's database
  User.findById(userId)
    .then((userData) => {
      // If contact with this id is not found
      if (!userData) {
        // return the error messages
        return res.status(404).send({
          message: 'No user is found with this id!',
        });
      }
      const contact = new Contact({
        belongsTo: req.user._id,
        firstName: userData.firstName,
        lastName: userData.lastName,
        email: userData.email,
        phoneNumber: userData.phoneNumber,
        dateOfBirth: userData.dateOfBirth,
        jobTitle: [],
        tags: [],
        biography: userData.biography || '',
        optionalUserId: userId,
      });

      // Save this contact to database
      contact
        .save()
        .then((data) => {
          // Create new rlationship between this contact and the user
          const newRela = new Relationship({
            belongsTo: req.user._id,
            people: [req.user._id, data._id].sort(),
          });
          // Save
          newRela.save();
          res.send(data);
        });
    })
    // Catching the error when assessing the DB
    .catch((err) => {
      console.log(err);
      res
        .status(500)
        .send({ message: 'Error when accessing the database!' });
    });
};

// Update a contact identified by the contact's Id ==============================
exports.update = (req, res) => {
  // Validate data before update the BD
  if (req.body.belongsTo && req.body.belongsTo != req.user._id) {
    return res.status(400).send({
      message: 'Owner of the contact are unchangaeble!',
    });
  }
  /*
  if (!req.body.firstName && Validator.checkInvalid(req.body.firstName)) {
    return res.status(400).send({
      message: 'invalid firstname!',
    });
  }
  if (!req.body.lastName && Validator.checkInvalid(req.body.lastName)) {
    return res.status(400).send({
      message: 'invalid lastname!',
    });
  }
  /*
  // Prevent update optionalUserId so it less messy
  if (req.body.optionalUserId) {
    return res.status(400).send({
      message: 'Cannot change optionalUserId!',
    });
  }*/

  // Enforce UTC timezone
  if (req.body.dateOfBirth) {
    if (Validator.checkValidDate(req.body.dateOfBirth) == 'Invalid Date') {
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
// that returns one that belongs to the current logged-in user only
exports.findOne = (req, res) => {
  // ID
  const id = req.params.id;
  Contact
    .findOne({ _id: id, belongsTo: req.user._id })
    .then((data) => {
      // If data with this id is not found
      if (!data) {
        // return the error messages
        return res.status(404).send({
          message: 'No contact is found with this id!',
        });
      }
      // else, return
      res.send(data);
    })
    // Catching the error when assessing the DB
    .catch((err) => {
      console.log(err);
      res.status(500).send({ message: 'Error when accessing the database!' });
    });
};

// Search for contacts that match with first&lastname ============================
exports.search = (req, res) => {
  Search.contactSearch(req, res);
};

// Get all contacts that belong to a specific user ============================
exports.getall = (req, res) => {
  const ownerId = req.user._id;

  Contact.find({ belongsTo: ownerId }).then((data) => {
    res.status(200).send(data);
  })
    // Catching error
    .catch((err) => {
      console.log(err);
      res.status(500).send({ message: 'Error when accessing the database!' });
    });
};