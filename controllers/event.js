// Controller to perform CRUD on event parameter
const Event = require('../models/event');
const controller = require('./controller-support');
const Search = require('./search');
const User = require('../models/user');

// Create a new event ===================================================
exports.create = async (req, res) => {
  // Validate requests
  if (
    !req.body.belongsTo ||
    !(await controller.checkValidId(User, req.body.belongsTo))
  ) {
    return res.status(400).send({
      message: 'Missing or invalid userId that this contact belongs to!',
    });
  }

  if (!req.body.name || controller.checkInvalid(req.body.name)) {
    return res.status(400).send({
      message: 'Missing event name or event name contains invalid characters!',
    });
  }

  if (!req.body.dateTime || controller.checkValidDate(req.body.dateTime) == "Invalid Date") {
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

  // Proceed participant lists to get names if inputs are contactIds!
  var participants = [];
  if (req.body.participants) {
    const rawPcpt = req.body.participants;
    participants = await controller.getNameFromContactId(req.body.belongsTo, rawPcpt);
    // Check for error:
    if (participants.length != Object.keys(rawPcpt).length) {
      return res.status(400).send({ message: 'Error when accessing the contact database!' })
    }
  }

  const event = new Event({
    belongsTo: req.body.belongsTo,
    name: req.body.name,
    dateTime: req.body.dateTime,
    completed: req.body.completed,
    participants: participants,
    description: req.body.description || '',
  });

  // Save this event to database
  event
    .save()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send({
        message: 'Error when creating event!',
      });
    });
};

// Update event identified by the event's Id ==============================
exports.update = (req, res) => {
  // validate DateTime, name and completness status
  if (req.body.belongsTo) {
    return res.status(400).send({
      message: 'Owner of the event are unchangaeble!',
    });
  }
  if (req.body.name && controller.checkInvalid(req.body.name)) {
    return res.status(400).send({
      message: "Event name should not contain invalid characters!",
    });
  }
  if (req.body.dateTime && controller.checkValidDate(req.body.dateTime) == "Invalid Date") {
    return res.status(400).send({
      message: "Invalid Date",
    });
  }
  if (req.body.completed && req.body.completed == null) {
    return res.status(400).send({
      message: "Event complete status should not be empty!",
    });
  }
  controller.updateData(Event, req, res);
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
  controller.findOne(Event, req, res);
};

// Search for events ==========================================================
exports.search = (req, res) => {
  Search.eventSearch(req, res);
};

// Get all contacts that belong to a specific user ============================
exports.getall = (req, res) => {
  controller.getAllByUserId(Event, req, res);
};
