// CRUD GENERATOR!!!
// Controller to perform CRUD
const validateDate = require("validate-date");
const { isValidObjectId } = require("mongoose");
const User = require('../models/user');

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

// Checks for valid character in fields such as names ==============================
function checkInvalid(string) {
  var format = /[!@#$%^&*()_+\-=\\[\]{};':"\\|,.<>\\/?]+/;

  if (format.test(string)) {
    return true;
  } else {
    return false;
  }
}

// Checks for valid dateTime =======================================================
function checkValidDate(date) {
  return validateDate(date);
}

// Function to check for valid Ids 
// Used mostly for user and contact
async function checkValidId(controller, id) {
  var check = true;
  if (!id || !isValidObjectId(id)) { check = false; }

  await controller.findById(id).then((foundId) => {
    if (!foundId) {
      check = false;
    }
  });
  return check;
}

// FUnction to check for existence of data block =====================================
// Used mostly for convo and relationship
async function checkExist(controller, ids) {
  var check = false;
  await controller.findOne({ people: ids }).then((found) => {
    if (found) {
      check = true;
    }
  });
  return check;
}

// FUnction to check for valid contactIds with given belongsTo
// Used mostly for user and contact
async function checkValidIdWithBelongsTo(controller, id, belongsTo) {
  var check = true;
  if (!id || !isValidObjectId(id)) { check = false; }

  await controller.findById(id).then((foundId) => {
    if (!foundId || foundId.belongsTo != belongsTo) {
      check = false;
    }
  });
  return check;
}

// Check for self-existence in the database ==========================================
// Basic checking: used for conversation and relationship
async function validRelationship(controller1, controller2, req) {
  const sortedIds = req.body.people.sort();
  // Check for duplicate userIds
  if (req.body.people[0] == req.body.people[1]) {
    return false;
  }

  // Then check for valid Ids
  const firstValid = await checkValidIdWithBelongsTo(controller1, sortedIds[0], req.body.belongsTo);
  const secValid = await checkValidIdWithBelongsTo(controller1, sortedIds[1], req.body.belongsTo);
  // Check for existence
  const existed = await checkExist(controller2, sortedIds);
  if (firstValid && secValid && !existed) {
    return true;
  }
  return false;
}

async function getAllByUserId(controller, req, res) {
  const ownerId = req.params.id;
  // Validate the given UserId first
  await User.findById(req.params.id).then((user) => {
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

module.exports = { updateData, deleteData, findAllData, findOne, checkInvalid, checkValidDate, validRelationship, checkValidId, getAllByUserId };
