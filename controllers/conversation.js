// Controller to perform CRUD on Convo parameter
const Conversation = require('../models/conversation');
const controller = require('./general-controller');

// Create a new convo ===========================================================
exports.create = (req, res) => {
  // Validate requests
  if (!req.body.userId) {
    return res.status(400).send({
      message: 'Require at least an user in convo!',
    });
  }
  if (!validateMessageContent(req)) {
    console.log("hi");
    return res.status(400).send({
      message: 'Require message sender/content!',
    });
  }

  // Create a new convo
  const conversation = new Conversation({
    userId: req.body.userId,
    messages: req.body.messages || [],
  });

  // Save this conversation to database
  conversation
    .save()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send({
        message: 'Error when creating conversation!',
      });
    });

  console.log('New conversation created! Yay');
};

// Update a convo identified by the convo's Id ===================================
exports.update = (req, res) => {
  // Validate info: message id
  if (validateMessageContent(req)) {
    return res.status(400).send({
      message: 'Require message sender/content!',
    });
  }
  // userIds can't be changed because they're default
  // new list of messages is added to the convo
  const id = req.params.id;
  // Case of updated sucessfully
  Conversation
    .findByIdAndUpdate(id, { $push: { messages: req.body.messages } }, { new: true })
    .then((updatedData) => {
      res.status(200).send(updatedData);
    })
    // Case of error
    .catch((err) => {
      console.log(err);
      return res.status(400).send({
        message: 'Error when updating Conversation!',
      });
    });
  //controller.updateData(Conversation, req, res);
};

// Delete a convo with the specified convo's Id ==================================
exports.delete = (req, res) => {
  controller.deleteData(Conversation, req, res);
};

// Retrieve and return all convos from the database ==============================
exports.findAll = (req, res) => {
  controller.findAllData(Conversation, req, res);
};

// Find a single convo with the convo's id ========================================
exports.findOne = (req, res) => {
  controller.findOne(Conversation, req, res);
};

function validateMessageContent(req) {
  // Validate info: message id
  req.body.messages.forEach(mes => {
    if (mes.sender == "") {
      console.log("yo");
      return false;
    }
    if (mes.content == "") {
      return false;
    }
  });
  return true;
}