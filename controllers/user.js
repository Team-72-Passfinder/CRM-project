// Controller to perform CRUD on user parameter
const User = require('../models/user');
const controller = require('./general-controller');

// Create a new user ===================================================
exports.create = (req, res) => {
  // Validate requests
  if (!req.body.username) {
    return res.status(400).send({
      message: 'Require user username!',
    });
  }

  if (!req.body.password) {
    return res.status(400).send({
      message: 'Require password!',
    });
  }

  if (!req.body.email) {
    return res.status(400).send({
      message: 'Require email address!',
    });
  }

  if (!req.body.firstName) {
    return res.status(400).send({
      message: 'Require firstName!',
    });
  }

  if (!req.body.lastName) {
    return res.status(400).send({
      message: 'Require lastName!',
    });
  }

  if (!req.body.dateOfBirth) {
    return res.status(400).send({
      message: 'Require dateOfBirth!',
    });
  }

  // Check for existing username or email ==================================
  // Check for username
  User.findOne({ email: req.body.email }).then((existedEmail) => {
    // If the email is found
    if (existedEmail) {
      return res.status(400).send({
        message: 'This email has been registered! Try another one!',
      });
    }
    // continue to check for username
    else {
      User.findOne({ username: req.body.username }).then((existedUname) => {
        // If the username is found
        if (existedUname) {
          return res.status(400).send({
            message: 'This username has been taken! Try another one!',
          });
        }
        else {
          // Then the username and email are good to be registered
          // Create an user if all info is valid ==================================
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
          user
            .save()
            .then((data) => {
              res.send(data);
            })
            .catch((err) => {
              console.log(err);
              res.status(500).send({
                message: 'Error when creating user!',
              });
            });
          console.log('New user created! Yay');
        }
      });
    }
  });
};

// Update an user identified by the user's Id ==============================
// This Update function behaves differently from other controllers
// It does not return password
exports.update = (req, res) => {
  //controller.updateData(User, req, res);
  // Get the id
  const id = req.params.id;

  // Case of updated sucessfully
  User
    .findByIdAndUpdate(id, { $set: req.body }, { new: true })
    .then((updatedData) => {
      res.status(200).send(
        {
          username: updatedData.username,
          email: updatedData.email,
          firstname: updatedData.firstName,
          lastName: updatedData.lastName,
          dateOfBirth: updatedData.dateOfBirth,
          biography: updatedData.biography
        }
      )
    })
    // Case of error
    .catch((err) => {
      console.log(err);
      res.status(400).send({
        message: 'Error when updating Contact!',
      });
    });
};

// Delete an user with the specified user's Id ==============================
exports.delete = (req, res) => {
  controller.deleteData(User, req, res);
};

// Retrieve and return all users from the database =========================
exports.findAll = (req, res) => {
  // Return all users using find()
  var userMap = {};
  User
    .find()
    .then((data) => {
      data.forEach(function (user) {
        userMap[user._id] = {
          username: user.username,
          email: user.email,
          firstname: user.firstName,
          lastName: user.lastName,
          dateOfBirth: user.dateOfBirth,
          biography: user.biography
        }
      })
      res.send(userMap);
    })
    // Catching error when accessing the database
    .catch((err) => {
      console.log(err);
      res.status(500).send({ message: 'Error when accessing the database!' });
    });
};

// Find a single user with the user's id ====================================
exports.findOne = (req, res) => {
  // ID
  const id = req.params.id;
  User
    .findById(id)
    .then((data) => {
      // If user with this id is not found
      if (!data) {
        // return the error messages
        return res.status(404).send({
          message: 'No data is found with this id!',
        });
      }
      // else, return the contact
      res.status(200).send({
        username: data.username,
        email: data.email,
        firstname: data.firstName,
        lastName: data.lastName,
        dateOfBirth: data.dateOfBirth,
        biography: data.biography
      });
    })
    // Catching the error when assessing the DB
    .catch((err) => {
      console.log(err);
      res.status(500).send({ message: 'Error when accessing the database!' });
    });
};

/*
// Searching for user with tag/firstname/lastname/username/email =============
exports.search = (req, res) => {
  const query = req.query.searchQuery;
  // Return all users using find()
  var userMap = {};
  User
    .find(query)
    .then((data) => {
      data.forEach(function (user) {
        userMap[user._id] = {
          username: user.username,
          email: user.email,
          firstname: user.firstName,
          lastName: user.lastName,
          dateOfBirth: user.dateOfBirth,
          biography: user.biography
        }
      })
      res.send(userMap);
    })
    // Catching error when accessing the database
    .catch((err) => {
      console.log(err);
      res.status(500).send({ message: 'Error when accessing the database!' });
    });
}*/
