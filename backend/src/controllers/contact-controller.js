// Controller to perform CRUD on Contact parameter
const Contact = require('../models/contact');

// Create a new Contact ===================================================
exports.create = (req, res) => {
  // Validate requests 
  var errCatched = validateContact(req, res);

  if (errCatched != null) {
    return;
  }

  // Create a new contact 
  const contact = new Contact({
    //_id: Mongoose.Types.ObjectId(),
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email || '',
    phoneNumber: req.body.phoneNumber || '',
    dateOfBirth: req.body.dateOfBirth || null,
    biography: req.body.biography || '',
  });

  // Save this contact to database 
  contact.save().then(data => { res.send(data); }).catch(err => {
    res.status(500).send({
      message: "Error when creating contact!"
    });
  });

  console.log("New contact created! Yay");
};


// Update a contacts identified by the contact's Id ==============================
exports.update = (req, res) => {
  // Validate requests
  var errCatched = validateContact(req, res);

  if (errCatched != null) {
    return;
  }

  // Else, update the contact 
  const id = req.params.contactId;

  // Case of updated sucessfully
  Contact.findByIdAndUpdate(id, { $set: req.body }, { new: true }).then(() => {
    res.status(200).send({ message: "Contact data updated!" });
  })
    // Case of error
    .catch((err) => {
      res.status(400).send({
        message: "Error when updating Contact!"
      });
    });
}


// Delete a contact with the specified contact's Id ==============================
exports.delete = (req, res) => {

  const id = req.params.contactId;
  Contact.findByIdAndRemove(id).then(contact => {
    if (!contact) {
      // If no id found -> return error message
      return res.status(404).send({ message: "No contact found to be deleted!" });
    }
    // Else, the contact should be deleted successfully
    res.send({ message: "Contact is deleted successfully!" });
  })
    // Catching error when accessing the database
    .catch(err => res.status(500).send({ message: "Error accessing the database!" }));
}


// These folowings relate to Search engine??
// Retrieve and return all contacts from the database =========================
exports.findAll = (req, res) => {
  // Return all contacts using find()
  Contact.find().then(contacts => {
    res.send(contacts);
  })
    // Catching error when accessing the database
    .catch(err => {
      res.status(500).send({ message: "Error when accessing the database!" })
    })
  console.log("All data in the current DB is loaded!");
}


// Find a single contact with the contact's id ====================================
exports.findOne = (req, res) => {
  // ID
  const id = req.params.contactId;
  Contact.findById(id).then(contact => {
    // If contact with this id is not found
    if (!contact) {
      // return the error messages
      return res.status(404).send({
        message: "No contact is found with this id!"
      });
    }
    // else, return the contact
    res.send(contact);
    console.log("Contact found!");
  })
    // Catching the error when assessing the DB
    .catch(err => {
      res.status(500).send({ message: "Error when accessing the database!" })
    })
};


// Function to help validate the contacts to be inserted/updated to the DB ===== 
function validateContact(req, res) {
  // Validate requests 
  if (!req.body.firstName) {
    return res.status(400).send({
      message: "Require first name!"
    });
  }

  if (!req.body.lastName) {
    return res.status(400).send({
      message: "Require last name!"
    });
  }

  return null;
}