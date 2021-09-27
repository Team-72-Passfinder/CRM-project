// CRUD GENERATOR!!!
// Controller to perform CRUD and other support functions 
const { isValidObjectId } = require("mongoose");
const User = require('../models/user');
const Contact = require('../models/contact');

// Update a contacts identified by the contact's Id ==============================
function updateData(controller, req, res) {
  // Get the id
  const id = req.params.id;

  // Case of updated sucessfully
  controller
    .findByIdAndUpdate(id, { $set: req.body }, { new: true })
    .then((updatedData) => {
      res.status(200).send(updatedData);
    })
    // Case of error
    .catch((err) => {
      console.log(err);
      res.status(500).send({
        message: 'Error when updating Data!',
      });
    });
}

// Delete a contact with the specified contact's Id ==============================
function deleteData(controller, req, res) {
  const id = req.params.id;
  controller
    .findByIdAndRemove(id)
    .then((data) => {
      if (!data) {
        // If no id found -> return error message
        return res
          .status(404)
          .send({ message: 'No data found to be deleted!' });
      }
      // Else, the contact should be deleted successfully
      res.status(200).send({ message: 'Data is deleted successfully!' });
    })
    // Catching error when accessing the database
    .catch((err) => {
      console.log(err);
      res.status(500).send({ message: 'Error accessing the database!' });
    });
}

// These folowings relate to Search engine??
// Retrieve and return all contacts from the database =========================
function findAllData(controller, req, res) {
  // Return all contacts using find()
  controller
    .find()
    .then((data) => {
      res.send(data);
    })
    // Catching error when accessing the database
    .catch((err) => {
      console.log(err);
      res.status(500).send({ message: 'Error when accessing the database!' });
    });
}

// Find a single contact with the contact's id ====================================
function findOne(controller, req, res) {
  // ID
  const id = req.params.id;
  controller
    .findById(id)
    .then((data) => {
      // If contact with this id is not found
      if (!data) {
        // return the error messages
        return res.status(404).send({
          message: 'No data is found with this id!',
        });
      }
      // else, return the contact
      res.send(data);
    })
    // Catching the error when assessing the DB
    .catch((err) => {
      console.log(err);
      res.status(500).send({ message: 'Error when accessing the database!' });
    });
}

// Get all contact/relationships that belong to a specific user ======================
async function getAllByUserId(controller, req, res) {
  const ownerId = req.user._id;
  // Validate the given UserId first
  await User.findById(ownerId).then((user) => {
    if (!user) {
      res.status(400).send({ message: 'Invalid userId!' });
    }
    else {
      // Then move on to get-all
      controller.find({ belongsTo: ownerId }).then((data) => {
        res.status(200).send(data);
      })
    }
  }).catch((err) => {
    console.log(err);
    res.status(500).send({ message: 'Error when accessing the database!' });
  });
}

// Get name of saved contact that belongs to a specific user ======================
async function getNamesFromContactIds(belongsTo, participantList) {
  // Array that stores transformed contactId
  const participants = [];
  // Loop the list
  for (let index = 0; index < participantList.length; index++) {
    const elem = participantList[index];
    if (isValidObjectId(elem)) {
      await Contact.find({ _id: elem, belongsTo: belongsTo }).then((found) => {
        if (found) {
          const name = found[0].firstName + " " + found[0].lastName;
          participants.push(name);
        }
      }).catch((err) => {
        console.log(err);
        // do nothing --> checks for length of participant list will give error for us
      });
    }
    else {
      participants.push(elem);
    }
  }
  //console.log(participants);
  return participants;
}

module.exports = {
  updateData, deleteData, findAllData,
  findOne, getAllByUserId, getNamesFromContactIds,
};
