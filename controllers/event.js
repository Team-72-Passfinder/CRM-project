// Controller to perform CRUD on event parameter
const Event = require('../models/event');
const controller = require('./controller-support');
const Validator = require('./validator');
const Search = require('./search');

// Create a new event ===================================================
exports.create = async (req, res) => {
  // Validate requests
  if (!req.body.name) {
    return res.status(400).send({
      message: 'Missing event name or event name contains invalid characters!',
    });
  }

  if (!req.body.dateTime || Validator.checkValidDate(req.body.dateTime) == "Invalid Date") {
    return res.status(400).send({
      message: 'Missing or invalid datetime!',
    });
  }

  if (req.body.completed == null) {
    return res.status(400).send({
      message: "Should mark event's completeness!",
    });
  }

  // Create an event
  // Enfore dateTime
  if (req.body.dateTime.charAt(req.body.dateTime.length - 1) != 'Z') {
    req.body.dateTime += 'Z';
  }

  /*
  // Proceed participant lists to get names if inputs are contactIds!
  var participants = [];
  if (req.body.participants) {
    const rawPcpt = req.body.participants;
    participants = await controller.getNamesFromContactIds(req.user._id, rawPcpt);
    // Check for error:
    if (participants.length != Object.keys(rawPcpt).length) {
      return res.status(400).send({ message: 'Error when accessing the contact database!' })
    }
  }*/

  const event = new Event({
    belongsTo: req.user._id,
    name: req.body.name,
    dateTime: req.body.dateTime,
    completed: req.body.completed,
    participants: req.body.participants || [],
    description: req.body.description || '',
  });

  // Save this event to database
  event
    .save()
    .then(async (data) => {
      res.send({
        _id: data._id,
        belongsTo: data.belongsTo,
        name: data.name,
        dateTime: data.dateTime,
        completed: data.completed,
        participants: await controller.getNamesFromContactIds(data.belongsTo, data.participants) || [],
        description: data.description || '',
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send({
        message: 'Error when creating event!',
      });
    });
};

// Update event identified by the event's Id ==============================
exports.update = async (req, res) => {
  // validate DateTime, name and completness status
  if (req.body.belongsTo) {
    return res.status(400).send({
      message: 'Owner of the event are unchangaeble!',
    });
  }
  if (req.body.name && Validator.checkInvalid(req.body.name)) {
    return res.status(400).send({
      message: "Event name should not contain invalid characters!",
    });
  }
  if (req.body.dateTime && Validator.checkValidDate(req.body.dateTime) == "Invalid Date") {
    return res.status(400).send({
      message: "Invalid Date",
    });
  }
  if (req.body.completed && req.body.completed == null) {
    return res.status(400).send({
      message: "Event complete status should not be empty!",
    });
  }
  //controller.updateData(Event, req, res);
  const id = req.params.id;

  // Case of updated sucessfully
  Event.findByIdAndUpdate(id, { $set: req.body }, { new: true })
    .then(async (updatedData) => {
      res.status(200).send({
        _id: updatedData._id,
        belongsTo: updatedData.belongsTo,
        name: updatedData.name,
        dateTime: updatedData.dateTime,
        completed: updatedData.completed,
        participants: await controller.getNamesFromContactIds(updatedData._id, updatedData.participants) || [],
        description: updatedData.description || '',
      });
    })
    // Case of error
    .catch((err) => {
      console.log(err);
      res.status(500).send({
        message: 'Error when updating Data!',
      });
    });
};

// Delete an event with the specified event's Id ==============================
exports.delete = (req, res) => {
  controller.deleteData(Event, req, res);
};

// Retrieve and return all events from the database =========================
exports.findAll = (req, res) => {
  controller.findAllData(Event, req, res);
};

// Find a single event with the event's id ====================================
exports.findOne = (req, res) => {
  //controller.findOne(Event, req, res);
  // ID
  const id = req.params.id;
  Event
    .findById(id)
    .then(async (data) => {
      // If data with this id is not found
      if (!data) {
        // return the error messages
        return res.status(404).send({
          message: 'No data is found with this id!',
        });
      }
      // else, return
      res.send({
        _id: data._id,
        belongsTo: data.belongsTo,
        name: data.name,
        dateTime: data.dateTime,
        completed: data.completed,
        participants: await controller.getNamesFromContactIds(data.belongsTo, data.participants),
        description: data.description || '',
      });
    })
    // Catching the error when assessing the DB
    .catch((err) => {
      console.log(err);
      res.status(500).send({ message: 'Error when accessing the database!' });
    });
};

// Search for events ==========================================================
exports.search = (req, res) => {
  Search.eventSearch(req, res);
};

// Get all contacts that belong to a specific user ============================
exports.getall = (req, res) => {
  controller.getall(Event, req, res);
};
