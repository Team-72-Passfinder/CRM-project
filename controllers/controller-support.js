
// Controller to perform CRUD and other support functions 
const { isValidObjectId } = require("mongoose");
const Contact = require('../models/contact');

// Update a data identified by the data's Id =====================================
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

// Delete a data with the specified data's Id ====================================
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
      // Else, the data should be deleted successfully
      res.status(200).send({ message: 'Data is deleted successfully!' });
    })
    // Catching error when accessing the database
    .catch((err) => {
      console.log(err);
      res.status(500).send({ message: 'Error accessing the database!' });
    });
}

// Retrieve and return all data from the database =================================
function findAllData(controller, req, res) {
  // Return all data using find()
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

// Find a single data with the data's id ===========================================
function findOne(controller, req, res) {
  // ID
  const id = req.params.id;
  controller
    .findById(id)
    .then((data) => {
      // If data with this id is not found
      if (!data) {
        // return the error messages
        return res.status(404).send({
          message: 'No data is found with this id!',
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
}

// Get all contacts/relationships/events that belong to the user ==================
async function getall(controller, req, res) {
  const ownerId = req.user._id;

  await controller.find({ belongsTo: ownerId }).then((data) => {
    res.status(200).send(data);
  })
    // Catching error
    .catch((err) => {
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
      await Contact.findOne({ _id: elem, belongsTo: belongsTo }).then((found) => {
        if (found) {
          const name = found.firstName + " " + found.lastName;
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

// Function to structure event for returning ==================================
// Main job: turns participants into names instead of leaving it as contactIds
async function display(event) {
  return {
    _id: event._id,
    belongsTo: event.belongsTo,
    name: event.name,
    dateTime: event.dateTime,
    completed: event.completed,
    participants: await getNamesFromContactIds(event.belongsTo, event.participants),
    description: event.description || '',
  }
}

// Delete data that is associated with user, called when a user is deleted
// Including: contact, event and relationship
// Convo??
async function deleteDataOfUser(controller, userId) {
  await controller.deleteMany({ belongsTo: userId }).then(() => {
    //console.log('data deleted!');
  }).catch((err) => {
    console.log(err);
  })
}


module.exports = {
  updateData, deleteData, findAllData, findOne, display,
  getall, getNamesFromContactIds, deleteDataOfUser,
};
