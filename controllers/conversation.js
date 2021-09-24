// Controller to perform CRUD on Convo parameter
const Conversation = require('../models/conversation');
const controller = require('./controller-support');
const Search = require('./search');

// Create a new convo ===========================================================
exports.create = async (req, res) => {
  // Validate requests
  // Since a convo can be created without any message,
  // we validate users' ids only
  if (!req.body.people) {
    return res.status(400).send({
      message: 'Require at least an user in convo!',
    });
  }
  // Check for existing conversation and valid userIds

  let check = await controller.validRelationshipOrConvo(Conversation, req, 'convo');
  if (!check) {
    return res.status(400).send({
      message: 'Invalid userId or this conversation has existed!'
    });
  }
  // check for existed convo with these users
  // But if there exists messages, we check for content and userId
  if (!validateMessageContent(req, req.body.people)) {
    return res.status(400).send({
      message: "Missing message sender or content or sender's id does not match",
    });
  }

  // Create a new convo
  const conversation = new Conversation({
    people: req.body.people.sort(),
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
  // people's userIds can't be changed because they're default
  // Check if people's userId is included in the sent data
  if (req.body.people) {
    return res.status(400).send({
      message: 'Users of this conversation is unchangeable!',
    });
  }
  // new list of messages is added to the convo
  const id = req.params.id;

  // Get list of userId by this id to validate sender of updating messages
  Conversation.findById(id).then((data) => {
    const userList = data.people;
    //console.log(userList);
    // Validate info: message id
    if (!validateMessageContent(req, userList)) {
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
function validateMessageContent(req, userList) {
  // Validate info: message id
  // Checking for people's userId in sender should match the users in the convo
  for (const ind in req.body.messages) {
    const mes = req.body.messages[ind];
    // Check if sender is missing
    // Also check for matching sender and the people's userIds
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


// Search for messanges in a convo
exports.search = (req, res) => {
  Search.convoSearch(req, res);
};

