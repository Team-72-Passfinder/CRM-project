// Controller to perform CRUD on relationship parameter
const Relationship = require('../models/relationship');
const controller = require('./controller-support');
const Validator = require('./validator');
const Search = require('./search');

// Create a new relationship ===================================================
exports.create = async (req, res) => {
  // Validate belongsTo
  // Check for valid datetime
  if (!req.body.startedDatetime) {
    return res.status(400).send({
      message: 'Require started date of the relatioship!',
    });
  }
  // Check if this relationship contains exactly 2 users
  if (!req.body.people || Object.keys(req.body.people).length != 2) {
    return res.status(400).send({
      message: 'Require 2 people in relationship!',
    });
  }
  // Enforce UTC timezone
  if (req.body.startedDatetime) {
    //console.log(req.body.startedDatetime);
    if (Validator.checkValidDate(req.body.startedDatetime) == "Invalid Date") {
      return res.status(400).send({
        message: 'Invalid startedDatetime!',
      });
    }
    if (req.body.startedDatetime.charAt(req.body.startedDatetime.length - 1) != 'Z') {
      req.body.startedDatetime += 'Z';
    }
  }

  // Check for existing relationship and for valid people
  let check = await Validator.validRelationshipOrConvo(Relationship, req, 'relationship');
  if (!check) {
    return res.status(400).send({
      message: 'Invalid contact Ids or this relationship has existed!'
    });
  }
  //else
  const relationship = new Relationship({
    belongsTo: req.user._id,
    people: req.body.people.sort(),
    startedDatetime: req.body.startedDatetime,
    tag: req.body.tag || [],
    description: req.body.description || '',
  });
  //console.log("new rela created!");
  // Save this relationship to database
  relationship
    .save()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send({
        message: 'Error when creating relationship!',
      });
    });
};

// Update a relationship identified by the relationship's Id ==============================
exports.update = (req, res) => {
  // belongsTo, people and startedDateTime are to be fixed!
  // check if the request includes these fields
  if (req.body.belongsTo) {
    return res.status(400).send({
      message: "Owner of the relationship are unchangaeble!",
    });
  }
  if (req.body.people) {
    return res.status(400).send({
      message: 'people in this relationship are unchangaeble!',
    });
  }
  if (req.body.startedDatetime) {
    return res.status(400).send({
      message: 'StartedDatetime in this relationship is unchangaeble!',
    });
  }
  // Only tags and description can be updated
  controller.updateData(Relationship, req, res);
};

// Delete a relationship with the specified relationship's Id ==============================
exports.delete = (req, res) => {
  controller.deleteData(Relationship, req, res);
};

// Retrieve and return all relationships from the database =================================
exports.findAll = (req, res) => {
  controller.findAllData(Relationship, req, res);
};

// Find a single relationship with the relationship's id ====================================
exports.findOne = (req, res) => {
  controller.findOne(Relationship, req, res);
};

// Searching for relationship given tags
exports.search = (req, res) => {
  Search.relationshipSearch(req, res);
};

// Get all relationship that belong to a specific user ============================
exports.getall = (req, res) => {
  controller.getAllByUserId(Relationship, req, res);
};
