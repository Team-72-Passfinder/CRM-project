
// Controller to perform CRUD and other support functions
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
    .findByIdAndDelete(id)
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

// Get name of saved contact that belongs to a specific user ======================
async function getNamesFromContactIds(belongsTo, contactList) {
  // Array that stores transformed contactId
  const names = [];
  // Loop the list
  await Contact.findOne({ _id: { $in: contactList }, belongsTo: belongsTo }).then((found) => {
    if (found) {
      found.forEach(element => {
        //const name = found.firstName + " " + found.lastName;
        names.push(element.firstName + " " + element.lastName);
      });
    }
  }).catch((err) => {
    console.log(err);
    // do nothing --> checks for length of participant list will give error for us
  });
  //console.log(names);
  return names;
}

// Function to structure event for returning ==================================
// Main job: turns participants into names instead of leaving it as contactIds
async function displayEvent(event) {
  return {
    _id: event._id,
    belongsTo: event.belongsTo,
    name: event.name,
    startedDateTime: event.startedDateTime,
    endedDateTime: event.endedDateTime,
    completed: event.completed,
    participants: await getNamesFromContactIds(event.belongsTo, event.participants),
    description: event.description || '',
  }
}

// Function to structure relationship for returning ============================
// Main job: turns people into names instead of leaving it as contactIds
async function displayRela(rela) {
  return {
    _id: rela._id,
    belongsTo: rela.belongsTo,
    people: await getNamesFromContactIds(rela.belongsTo, rela.people),
    startedDatetime: rela.startedDatetime,
    tag: rela.tag,
    description: rela.description,
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
  updateData, deleteData, findAllData,
  getNamesFromContactIds, deleteDataOfUser,
  displayEvent, displayRela
};
