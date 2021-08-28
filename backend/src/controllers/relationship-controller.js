// Controller to perform CRUD on relationship parameter
const Relationship = require('../models/relationship');
const controller = require('./controller');

// Create a new relationship ===================================================
exports.create = (req, res) => {
  // Validate requests 
  if (!req.body.people) {
    return res.status(400).send({
      message: "Require people in relationship!"
    });
  }

  if (!req.body.startedDatetime) {
    return res.status(400).send({
      message: "Require started date of the relatioship!"
    });
  }

  // Create a new relationship 
  const relationship = new Relationship({
    people: req.body.people,
    startedDatetime: req.body.startedDatetime,
    tag: req.body.tag || [],
    description: req.body.phoneNumber || '',
  });

  // Save this relationship to database 
  relationship.save().then(data => { res.send(data); }).catch(err => {
    res.status(500).send({
      message: "Error when creating relationship!"
    });
  });

  console.log("New relationship created! Yay");
};


// Update a relationships identified by the relationship's Id ==============================
exports.update = (req, res) => {
  controller.updateData(Relationship, req, res);
}


// Delete a relationship with the specified relationship's Id ==============================
exports.delete = (req, res) => {
  controller.deleteData(Relationship, req, res);
}


// Retrieve and return all relationships from the database =========================
exports.findAll = (req, res) => {
  controller.findAllData(Relationship, req, res);
}


// Find a single relationship with the relationship's id ====================================
exports.findOne = (req, res) => {
  controller.findOne(Relationship, req, res);
};
