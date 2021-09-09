// Controller to perform CRUD on relationship parameter
const Relationship = require('../models/relationship');
const controller = require('./general-controller');
const User = require('../models/user');

// Create a new relationship ===================================================
exports.create = (req, res) => {
  // Check for valid datetime
  if (!req.body.startedDatetime) {
    return res.status(400).send({
      message: 'Require started date of the relatioship!',
    });
  }
  // Check if this relationship contains exactly 2 users
  if (Object.keys(req.body.people).length != 2) {
    return res.status(400).send({
      message: 'Require 2 people in relationship!',
    });
  }
  // Check for duplicate userIds
  if (req.body.people[0] == req.body.people[1]) {
    // return the error messages
    return res.status(400).send({ message: 'Duplicated userId!' });
  }
  // Check for existing userId, by accessing the User DB
  User.findOne({ _id: req.body.people[0] }).then((validUser1) => {
    if (!validUser1) {
      return res.status(400).send({
        message: 'Invalid userId!',
      });
    }
    User.findOne({ _id: req.body.people[1] }).then((validUser2) => {
      if (!validUser2) {
        return res.status(400).send({
          message: 'Invalid userId!',
        });
      }
      // Reach this point, we check for existing relationship
      // of these two users
      Relationship.findOne({ people: req.body.people }).then((found) => {
        if (found) {
          return res.status(400).send({
            message: 'This relationship has existed, please update instead!',
          });
        }
        // Else, create new relationship
        const relationship = new Relationship({
          people: req.body.people.sort(),
          startedDatetime: req.body.startedDatetime,
          tag: req.body.tag || [],
          description: req.body.description || '',
        });

        // Save this relationship to database
        relationship
          .save()
          .then((data) => {
            res.send(data);
          })
          .catch((err) => {
            console.log(err);
            res.status(500).send({
              message: 'Error when creating relationship!',
            });
          });

        console.log('New relationship created! Yay');
      })
    });
  });
};

// Update a relationship identified by the relationship's Id ==============================
exports.update = (req, res) => {
  // people and startedDateTime are to be fixed!
  // Only tags and description can be updated
  controller.updateData(Relationship, req, res);
};

// Delete a relationship with the specified relationship's Id ==============================
exports.delete = (req, res) => {
  controller.deleteData(Relationship, req, res);
};

// Retrieve and return all relationships from the database =========================
exports.findAll = (req, res) => {
  controller.findAllData(Relationship, req, res);
};

// Find a single relationship with the relationship's id ====================================
exports.findOne = (req, res) => {
  controller.findOne(Relationship, req, res);
};
