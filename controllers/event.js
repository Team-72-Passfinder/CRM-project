// Controller to perform CRUD on event parameter
const Event = require('../models/event');
const controller = require('./general-controller');

// Create a new event ===================================================
exports.create = (req, res) => {
  // Validate requests
  if (!req.body.name) {
    return res.status(400).send({
      message: 'Require event name!',
    });
  }

  if (!req.body.dateTime) {
    return res.status(400).send({
      message: 'Require datetime!',
    });
  }

  if (req.body.completed == null) {
    return res.status(400).send({
      message: "Should mark event's completeness!",
    });
  }

  // Create an event
  const event = new Event({
    //_id: Mongoose.Types.ObjectId(),
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

  console.log('New event created! Yay');
};

// Update event identified by the event's Id ==============================
exports.update = (req, res) => {
  // validate DateTime, name and completness status
  if (req.body.name == "") {
    return res.status(400).send({
      message: 'Event name should not be empty!',
    });
  }
  if (req.body.dateTime == "" || req.body.completed == null) {
    return res.status(400).send({
      message: 'DateTime should not be empty!',
    });
  }
  if (req.body.completed == "" || req.body.completed == null) {
    return res.status(400).send({
      message: 'Complete status should be set!',
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
