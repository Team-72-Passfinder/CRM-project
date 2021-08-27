// Controller to perform CRUD on event parameter
const Event = require('../models/event');

// Create a new event ===================================================
exports.create = (req, res) => {
  // Validate requests 
  var errCatched = validateEvent(req, res);

  if (errCatched != null) {
    return;
  }

  // Create a event 
  const event = new Event({
    //_id: Mongoose.Types.ObjectId(),
    name: req.body.name,
    dateTime: req.body.dateTime,
    completed: req.body.completed,
    participants: req.body.participants || [],
    description: req.body.description || '',
  });

  // Save this event to database 
  event.save().then(data => { res.send(data); }).catch(err => {
    res.status(500).send({
      message: "Error when creating event!"
    });
  });

  console.log("New event created! Yay");
};


// Update a events identified by the event's Id ==============================
exports.update = (req, res) => {
  // Validate requests
  var errCatched = validateEvent(req, res);

  if (errCatched != null) {
    return;
  }

  // Else, update the event 
  const id = req.params.eventId;

  // Case of updated sucessfully
  Event.findByIdAndUpdate(id, { $set: req.body }, { new: true }).then(() => {
    res.status(200).send({ message: "Event updated!" });
  })
    // Case of error
    .catch((err) => {
      res.status(400).send({
        message: "Error when updating event!"
      });
    });
}


// Delete a events with the specified event's Id ==============================
exports.delete = (req, res) => {

  const id = req.params.eventId;
  Event.findByIdAndRemove(id).then(event => {
    if (!event) {
      // If no id found -> return error message
      return res.status(404).send({ message: "No event found to be deleted!" });
    }
    // Else, the event should be deleted successfully
    res.send({ message: "Event is deleted successfully!" });
  })
    // Catching error when accessing the database
    .catch(err => res.status(500).send({ message: "Error accessing the database!" }));
}


// These folowings relate to Search engine??
// Retrieve and return all events from the database =========================
exports.findAll = (req, res) => {
  // Return all events using find()
  Event.find().then(events => {
    res.send(events);
  })
    // Catching error when accessing the database
    .catch(err => {
      res.status(500).send({ message: "Error when accessing the database!" })
    })
  console.log("All data in the current DB is loaded!");
}


// Find a single event with the event's id ====================================
exports.findOne = (req, res) => {
  // ID
  const id = req.params.eventId;
  Event.findById(id).then(event => {
    // If event with this id is not found
    if (!event) {
      // return the error messages
      return res.status(404).send({
        message: "No event is found with this id!"
      });
    }
    // else, return the event
    res.send(event);
    console.log("Event found!");
  })
    // Catching the error when assessing the DB
    .catch(err => {
      res.status(500).send({ message: "Error when accessing the database!" })
    })
};


// Function to help validate the events to be inserted/updated to the DB ===== 
function validateEvent(req, res) {
  //var eventErr;
  // Validate requests 
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
  return null;
}