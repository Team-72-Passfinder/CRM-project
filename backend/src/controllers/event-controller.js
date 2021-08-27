// Controller to perform CRUD on event parameter
const Event = require('../models/event');

// Create a new event
exports.createEvent = (req, res) => {
  // Validate requests =================================
  if (!req.body.name) {
    return res.status(400).send({
      message: "Require event name!"
    });
  }

  if (!req.body.dateTime) {
    return res.status(400).send({
      message: "Require datetime!"
    });
  }

  if (req.body.completed == null) {
    return res.status(400).send({
      message: "Should mark event's completeness!"
    });
  }

  // Create a event ====================================
  const event = new Event({
    //_id: Mongoose.Types.ObjectId(),
    name: req.body.name,
    dateTime: req.body.dateTime,
    completed: req.body.completed,
    participants: req.body.participants || [],
    description: req.body.description || '',
  });

  // Save this event to database =======================
  event.save().then(data => { res.send(data); }).catch(err => {
    res.status(500).send({
      message: "Error when creating event!"
    });
  });

  console.log("New event created! Yay");
};
/*
// Retrieve and return all events from the database.
exports.findAll = (req, res) => {

};

// Find a single events with a note's name
exports.findOne = (req, res) => {

};

// Update a events identified by the eventId
exports.update = (req, res) => {

};

// Delete a events with the specified eventId
exports.delete = (req, res) => {

};
*/