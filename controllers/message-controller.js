// Controller to perform CRUD on message parameter
const Message = require('../models/message');
const controller = require('./controller');

// Create a new message ===================================================
exports.create = (req, res) => {
    // Validate requests 
    if (!req.body.content) {
        return res.status(400).send({
            message: "Require message's content!"
        });
    }

    if (!req.body.sender) {
        return res.status(400).send({
            message: "Require message's sender!"
        });
    }

    // Create a new message 
    const message = new Message({
        content: req.body.content,
        sender: req.body.sender,
    });

    // Save this message to database 
    message.save().then(data => { res.send(data); }).catch(err => {
        res.status(500).send({
            message: "Error when creating message!"
        });
    });

    console.log("New message created! Yay");
};


// Update a message identified by the message's Id ==============================
exports.update = (req, res) => {
    controller.updateData(Message, req, res);
}


// Delete a message with the specified message's Id ==============================
exports.delete = (req, res) => {
    controller.deleteData(Message, req, res);
}


// Retrieve and return all messages from the database =========================
exports.findAll = (req, res) => {
    controller.findAllData(Message, req, res);
}


// Find a single message with the message's id ====================================
exports.findOne = (req, res) => {
    controller.findOne(Message, req, res);
};
