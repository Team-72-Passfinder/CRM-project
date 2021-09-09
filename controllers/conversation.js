// Controller to perform CRUD on Convo parameter
const Conversation = require('../models/conversation');
const controller = require('./general-controller');

// Create a new convo ===========================================================
exports.create = (req, res) => {
  // Validate requests
  // Since a convo can be created without any message,
  // we validate users' ids only
  if (!req.body.userId) {
    return res.status(400).send({
      message: 'Require at least an user in convo!',
    });
  }
  // But if there exists messages, we check for content and userId
  if (!validateMessageContent('create', req, req.body.userId)) {
    return res.status(400).send({
      message: "Missing message sender or content or sender's id does not match",
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
  // userIds can't be changed because they're default
  // new list of messages is added to the convo
  const id = req.params.id;

  // Get list of userId by this id to validate sender of updating messages
  Conversation.findById(id).then((data) => {
    const userList = data.userId;
    //console.log(userList);
    // Validate info: message id
    if (!validateMessageContent('update', req, userList)) {
      return res.status(400).send({
        message: "Missing message sender or content or sender's id does not match",
      });
    }
    Conversation.updateOne(data, { $push: { messages: req.body.messages } }, { new: true })
      .then((updatedData) => {
        res.status(200).send(updatedData);
      });
  })
    .catch((err) => {
      console.log(err);
      res.status(500).send({ message: 'Error when accessing the database!' });
    });
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

// Delete a particular message in convo
// new function: this should be considered after all other
// essential features are implemented

// Function to validate messages in convo
function validateMessageContent(method, req, userList) {
  // Case of new conversation --> we check for valid Ids
  if (method == 'create') {
    // Check for valid userId

    // check for existed convo with these users
  }

  // Validate info: message id
  // Checking for userId in sender should match the users in the convo
  for (const ind in req.body.messages) {
    const mes = req.body.messages[ind];
    // Check if sender is missing
    // Also check for matching sender and the userIds
    if (mes.sender == "" || !userList.includes(mes.sender)) {
      return false;
    }
    // Check if content is missing
    if (mes.content == "") {
      return false;
    }
  }
  return true;
}