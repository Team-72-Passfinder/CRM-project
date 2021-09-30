const User = require('../models/user');
const Contact = require('../models/contact');
const validateDate = require('validate-date');
const { isValidObjectId } = require('mongoose');

// Function to validate when creating a new user ============================================
// Return error type when validation fails
async function checkValidUser(req) {
  var message;
  // Checking missing username or password
  if (!req.body.username || !req.body.password || !req.body.email) {
    message = 'Missing username or password or email!';
    return message;
  }

  // Check if firstname contains invalid characters
  if (!req.body.firstName || checkInvalid(req.body.firstName)) {
    message = 'Missing or invalid firstName!';
    return message;
  }

  // Check if lastName contains invalid characters
  if (!req.body.lastName || checkInvalid(req.body.lastName)) {
    message = 'Missing or invalid lastName!';
    return message;
  }

  // Check if DOB is valid
  // Check if lastName contains invalid characters
  if (
    !req.body.dateOfBirth ||
    checkValidDate(req.body.dateOfBirth) == 'Invalid Date'
  ) {
    message = 'Missing or invalid dateOfBirth!';
    return message;
  }

  // Check for existing username or email ==================================================
  // Check for username
  await User.findOne({ email: req.body.email })
    .then((existedEmail) => {
      // If the email is found
      if (existedEmail) {
        message = 'Email has been registered!';
      } else {
        message = 'valid';
      }
    })
    .catch((err) => {
      console.log(err);
      message = 'Error when accessing the database!';
    });

  // continue to check for username
  await User.findOne({ username: req.body.username })
    .then((existedUname) => {
      // If the username is found
      if (existedUname) {
        message = 'Username has been registered!';
      }
      // Else, the message stays at status 'valid'
    })
    .catch((err) => {
      console.log(err);
      message = 'Error when accessing the database!';
    });

  // Enforce UTC timezone before return
  if (req.body.dateOfBirth.charAt(req.body.dateOfBirth.length - 1) != 'Z') {
    req.body.dateOfBirth += 'Z';
  }

  return message;
}

// Checks for valid character in fields such as names ======================================
function checkInvalid(string) {
  var format = /[!@#$%^&*()_+\-=\\[\]{};':"\\|,.<>\\/?]+/;

  if (format.test(string)) {
    return true;
  } else {
    return false;
  }
}

// Checks for valid dateTime ===============================================================
function checkValidDate(date) {
  return validateDate(date);
}

// Function to check for valid Ids =========================================================
// Used mostly for user and contact
async function checkValidId(controller, id) {
  var check = true;
  if (!id || !isValidObjectId(id)) {
    check = false;
  }

  await controller.findById(id).then((foundId) => {
    if (!foundId) {
      check = false;
    }
  });
  return check;
}

// Function to check for existence of data block ===========================================
// Used mostly for convo and relationship
async function checkExist(controller, ids) {
  var check = false;
  await controller.findOne({ people: ids }).then((found) => {
    if (found) {
      check = true;
    }
  });
  return check;
}

// Function to check for valid contactIds with given belongsTo
// Used mostly for user and contact
async function checkValidIdWithBelongsTo(controller, id, belongsTo) {
  var check = true;
  if (!id || !isValidObjectId(id)) {
    check = false;
  }
  if (!belongsTo || !isValidObjectId(belongsTo)) {
    check = false;
  }

  await controller
    .findOne({ _id: id, belongsTo: belongsTo })
    .then((foundId) => {
      if (!foundId) {
        check = false;
      }
    });
  return check;
}

// Check for self-existence in the database ==================================================
// Basic checking: used for relationship and convo
async function validRelationshipOrConvo(controller2, req, type) {
  const sortedIds = req.body.people.sort();
  // Check for duplicate userIds
  if (sortedIds[0] == sortedIds[1]) {
    return false;
  }

  var firstValid, secValid;

  // Then check for valid Ids
  if (type == 'relationship') {
    firstValid = await checkValidIdWithBelongsTo(
      Contact,
      sortedIds[0],
      req.user._id
    );
    secValid = await checkValidIdWithBelongsTo(
      Contact,
      sortedIds[1],
      req.user._id
    );
  } else {
    firstValid = await checkValidId(User, sortedIds[0]);
    secValid = await checkValidId(User, sortedIds[1]);
  }
  // Check for existence
  const existed = await checkExist(controller2, sortedIds);
  if (firstValid && secValid && !existed) {
    return true;
  }
  return false;
}

module.exports = {
  checkValidUser,
  checkInvalid,
  checkValidDate,
  validRelationshipOrConvo,
  checkValidId,
};
