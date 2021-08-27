// Controller to perform CRUD on user parameter
const User = require('../models/user');

// Create a new user ===================================================
exports.create = (req, res) => {
  // Validate requests 
  var errCatched = validateUser(req, res);

  if (errCatched != null) {
    return;
  }

  // Create an user 
  const user = new User({
    //_id: Mongoose.Types.ObjectId(),
    username: req.body.username,
    password: req.body.password,
    email: req.body.email,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    dateOfBirth: req.body.dateOfBirth,
    biography: req.body.biography || '',
  });

  // Save this user to database 
  user.save().then(data => { res.send(data); }).catch(err => {
    res.status(500).send({
      message: "Error when creating user!"
    });
  });

  console.log("New user created! Yay");
};


// Update an users identified by the user's Id ==============================
// UNDER REVEWING!!!!
exports.update = (req, res) => {
  // Validate requests
  var errCatched = validateUser(req, res);

  if (errCatched != null) {
    return;
  }

  // Else, update the user 
  const id = req.params.userId;

  // Case of updated sucessfully
  User.findByIdAndUpdate(id, { $set: req.body }, { new: true }).then(() => {
    res.status(200).send({ message: "User data updated!" });
  })
    // Case of error
    .catch((err) => {
      res.status(400).send({
        message: "Error when updating user!"
      });
    });
}


// Delete an user with the specified user's Id ==============================
exports.delete = (req, res) => {

  const id = req.params.userId;
  User.findByIdAndRemove(id).then(user => {
    if (!user) {
      // If no id found -> return error message
      return res.status(404).send({ message: "No user found to be deleted!" });
    }
    // Else, the user should be deleted successfully
    res.send({ message: "user is deleted successfully!" });
  })
    // Catching error when accessing the database
    .catch(err => res.status(500).send({ message: "Error accessing the database!" }));
}


// Retrieve and return all users from the database =========================
exports.findAll = (req, res) => {
  // Return all users using find()
  User.find().then(users => {
    res.send(users);
  })
    // Catching error when accessing the database
    .catch(err => {
      res.status(500).send({ message: "Error when accessing the database!" })
    })
  console.log("All data in the current DB is loaded!");
}


// Find a single user with the user's id ====================================
exports.findOne = (req, res) => {
  // ID
  const id = req.params.userId;
  User.findById(id).then(user => {
    // If user with this id is not found
    if (!user) {
      // return the error messages
      return res.status(404).send({
        message: "No user is found with this id!"
      });
    }
    // else, return the user
    res.send(user);
    console.log("user found!");
  })
    // Catching the error when assessing the DB
    .catch(err => {
      res.status(500).send({ message: "Error when accessing the database!" })
    })
};


// Function to help validate the users to be inserted/updated to the DB ===== 
function validateUser(req, res) {

  // Validate requests 
  if (!req.body.username) {
    return res.status(400).send({
      message: "Require user username!"
    });
  }

  if (!req.body.password) {
    return res.status(400).send({
      message: "Require password!"
    });
  }

  if (!req.body.email) {
    return res.status(400).send({
      message: "Require email address!"
    });
  }

  if (!req.body.firstName) {
    return res.status(400).send({
      message: "Require firstName!"
    });
  }

  if (!req.body.lastName) {
    return res.status(400).send({
      message: "Require lastName!"
    });
  }

  if (!req.body.dateOfBirth) {
    return res.status(400).send({
      message: "dateOfBirth!"
    });
  }

  return null;
}