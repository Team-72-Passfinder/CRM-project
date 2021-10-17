// Controller to perform CRUD on relationship parameter
const Relationship = require('../models/relationship');
const controller = require('./controller-support');
const Validator = require('./validator');
const Search = require('./search');

// Create a new relationship ===================================================
exports.create = async (req, res) => {
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
    startedDatetime: req.body.startedDatetime || '',
    tag: req.body.tag || [],
    description: req.body.description || '',
  });
  //console.log("new rela created!");
  // Save this relationship to database
  relationship
    .save()
    .then(async (data) => {
      res.send(await controller.displayRela(data));
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
  if (req.body.belongsTo && req.body.belongsTo != req.user._id) {
    return res.status(400).send({
      message: "Owner of the relationship are unchangaeble!",
    });
  }
  /*
  if (req.body.people) {
    return res.status(400).send({
      message: 'people in this relationship are unchangaeble!',
    });
  }*/
  // Only tags, starteddateTime and description can be updated
  //controller.updateData(Relationship, req, res);
  const id = req.params.id;

  // Case of updated sucessfully
  Relationship.findByIdAndUpdate(id, { $set: req.body }, { new: true })
    .then(async (updatedData) => {
      res.status(200).send(await controller.displayRela(updatedData));
    })
    // Case of error
    .catch((err) => {
      console.log(err);
      res.status(500).send({
        message: 'Error when updating Data!',
      });
    });
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
// that returns one that belongs to the current logged-in user only
exports.findOne = (req, res) => {
  //controller.findOne(Relationship, req, res);
  const id = req.params.id;
  Relationship
    .findOne({ _id: id, belongsTo: req.user._id })
    .then(async (data) => {
      // If data with this id is not found
      if (!data) {
        // return the error messages
        return res.status(404).send({
          message: 'No relationship is found with this id!',
        });
      }
      // else, return
      res.send(await controller.displayRela(data));
    })
    // Catching the error when assessing the DB
    .catch((err) => {
      console.log(err);
      res.status(500).send({ message: 'Error when accessing the database!' });
    });
};

// Searching for relationship given tags
exports.search = (req, res) => {
  Search.relationshipSearch(req, res);
};

// Get all relationship that belong to a specific user ============================
exports.getall = (req, res) => {
  const ownerId = req.user._id;

  Relationship.find({ belongsTo: ownerId }).then(async (data) => {
    var relaMap = [];
    for (let i = 0; i < data.length; i++) {
      relaMap.push(await controller.displayRela(data[i]));
    }
    res.status(200).send(relaMap);
  })
    // Catching error
    .catch((err) => {
      console.log(err);
      res.status(500).send({ message: 'Error when accessing the database!' });
    });
};
