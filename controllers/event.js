// Controller to perform CRUD on event parameter
const Event = require('../models/event');
const controller = require('./controller-support');
const Search = require('./search')

// Create a new event ===================================================
exports.create = (req, res) => {
  // Validate requests
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

  const event = new Event({
    name: req.body.name,
    dateTime: req.body.dateTime,
    completed: req.body.completed,
    participants: req.body.participants || [],
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
