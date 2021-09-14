// CRUD GENERATOR!!!
// Controller to perform CRUD
const validateDate = require("validate-date");

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

// Checks for valid character in fields such as names
function checkInvalid(string) {
  var format = /[!@#$%^&*()_+\-=\\[\]{};':"\\|,.<>\\/?]+/;

  if (format.test(string)) {
    return true;
  } else {
    return false;
  }
}

// Checks for valid dateTime 
function checkValidDate(date) {
  return validateDate(date);
}

// FUnction to check for valid Ids 
// Used mostly for user and contact
async function checkValidId(controller, id) {
  var check = true;
  await controller.findById(id).then((foundId) => {
    if (!foundId) {
      //console.log('1');
      check = false;
    }
  });
  //console.log(check);
  //console.log('valid user test passed');
  return check;
}

// FUnction to check for existence of data block
// Used mostly for convo and relationship
async function checkExist(controller, ids) {
  var check = false;
  await controller.findOne({ userId: ids }).then((found) => {
    if (found) {
      //console.log('2');
      check = true;
    }
  });
  //console.log(check);
  //console.log('existed test passed');
  return check;
}

// Check for self-existence in the database
// Basic checking: used for conversation and relationship
async function validConvoOrRelationship(controller1, controller2, req) {
  const sortedIds = req.body.userId.sort();
  // Check for duplicate userIds
  if (req.body.userId[0] == req.body.userId[1]) {
    //console.log('0');
    return false;
  }

  // Then check for valid Ids
  const firstValid = await checkValidId(controller1, sortedIds[0]);
  const secValid = await checkValidId(controller1, sortedIds[1]);
  // Check for existence
  const existed = await checkExist(controller2, sortedIds);
  if (firstValid && secValid && !existed) {
    return true;
  }
  return false;
}

/*
// Function to turns array of ids into names for displaying 
function getNames(controller, ids, res) {
  var map = [];
  // accessing the BD through controller
  ids.forEach(id => {
    controller.findById(id).then((data) => {
      map.push(data);
    })
      // Catching the error when assessing the DB
      .catch((err) => {
        console.log(err);
        res.status(500).send({ message: 'Error when accessing the database!' });
      });
  });
}*/

module.exports = { updateData, deleteData, findAllData, findOne, checkInvalid, checkValidDate, validConvoOrRelationship };
