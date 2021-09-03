// CRUD GENERATOR!!!
// Controller to perform CRUD

// Update a contacts identified by the contact's Id ==============================
function updateData(controler, req, res) {
  // Get the id
  const id = req.params.id;

  // Case of updated sucessfully
  controler
    .findByIdAndUpdate(id, { $set: req.body }, { new: true })
    .then((updatedData) => {
      res.status(200).send(updatedData);
    })
    // Case of error
    .catch((err) => {
      console.log(err);
      res.status(400).send({
        message: 'Error when updating Contact!',
      });
    });
}

// Delete a contact with the specified contact's Id ==============================
function deleteData(controler, req, res) {
  const id = req.params.id;
  controler
    .findByIdAndRemove(id)
    .then((data) => {
      if (!data) {
        // If no id found -> return error message
        return res
          .status(404)
          .send({ message: 'No contact found to be deleted!' });
      }
      // Else, the contact should be deleted successfully
      res.status(200).send({ message: 'Data is deleted successfully!' });
    })
    // Catching error when accessing the database
    .catch((err) => {
      console.log(err);
      res.status(500).send({ message: 'Error accessing the database!' });
    });
}

// These folowings relate to Search engine??
// Retrieve and return all contacts from the database =========================
function findAllData(controler, req, res) {
  // Return all contacts using find()
  controler
    .find()
    .then((data) => {
      res.send(data);
    })
    // Catching error when accessing the database
    .catch((err) => {
      console.log(err);
      res.status(500).send({ message: 'Error when accessing the database!' });
    });
}

// Find a single contact with the contact's id ====================================
function findOne(controler, req, res) {
  // ID
  const id = req.params.id;
  controler
    .findById(id)
    .then((data) => {
      // If contact with this id is not found
      if (!data) {
        // return the error messages
        return res.status(404).send({
          message: 'No data is found with this id!',
        });
      }
      // else, return the contact
      res.send(data);
    })
    // Catching the error when assessing the DB
    .catch((err) => {
      console.log(err);
      res.status(500).send({ message: 'Error when accessing the database!' });
    });
}
module.exports = { updateData, deleteData, findAllData, findOne };
