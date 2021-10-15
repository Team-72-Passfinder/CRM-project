const User = require('../models/user');
const Event = require('../models/event');
const Relationship = require('../models/relationship');
const Convo = require('../models/conversation');
const Contact = require('../models/contact');
const Validator = require('./validator');
const ctrlSupport = require('./controller-support');

// The basic search query request looks like this:
/*{
    "query": string
}*/

// Search function for contact =============================================
async function contactSearch(req, res) {
  // check query's body
  if (!checkValidQuery(req)) {
    return res.status(500).send({ message: 'Missing query!' });
  }

  const text = req.body.query;
  Contact.find({
    belongsTo: req.user._id,
    $or: [
      { firstName: { $regex: text, $options: 'i' } },
      { lastName: { $regex: text, $options: 'i' } },
      { email: { $regex: text, $options: 'i' } },
      { jobTitle: { $regex: text, $options: 'i' } },
    ],
  })
    .then((data) => {
      res.status(200).send(data);
    })
    // Case of error
    .catch((err) => {
      console.log(err);
      res.status(500).send({
        message: 'Error when accessing the database!',
      });
    });
}

// Search function for User only =============================================
// Email and password are protected and not to be returned directly
// returns an array of users
function userSearch(req, res) {
  // check query's body
  if (!checkValidQuery(req)) {
    return res.status(500).send({ message: 'Missing query!' });
  }
  var userMap = [];
  const text = req.body.query;
  User
    //.find({ $text: { $search: req.body.query } }) // full-text search
    // partial-text-search:
    .find({
      $or: [
        { username: { $regex: text, $options: 'i' } },
        { firstName: { $regex: text, $options: 'i' } },
        { lastName: { $regex: text, $options: 'i' } },
        { email: { $regex: text, $options: 'i' } },
      ],
    })
    .then((data) => {
      data.forEach((user) => {
        userMap.push({
          _id: user._id,
          username: user.username,
          email: user.email,
          firstname: user.firstName,
          lastName: user.lastName,
          dateOfBirth: user.dateOfBirth,
          biography: user.biography || '',
        });
      });
      res.status(200).send(userMap);
    })
    // Catching error when accessing the database
    .catch((err) => {
      console.log(err);
      res.status(500).send({
        message: 'Error when accessing the database!',
      });
    });
}

// searching with filter - use specificly for event ===========================
// a query may look like the following:
/*{
  **"query": string,
    "completed": boolean,         // indicates that only looking for finished/unfinished events
    "from": date                  // looks for particular events from this date
    "to": date                    // looks for particular events upto the end of this date
    "participants": [contactIds]  // looks for events that contain these contacts as participants
}*/
async function eventSearch(req, res) {
  // Declaring an array of data to return
  var eventMap = [];

  // Validate received parameters
  // check query's body
  if (!checkValidQuery(req)) {
    return res.status(500).send({ message: 'Missing query!' });
  }
  // Validate dateTime [from, to] if exist
  if (
    req.body.from &&
    Validator.checkValidDate(req.body.from) == 'Invalid Date'
  ) {
    return res.status(400).send({ message: 'Invalid (from) date!' });
  }
  // Only check (to) date if (from) date exists
  if (
    (req.body.from &&
      req.body.to &&
      Validator.checkValidDate(req.body.to) == 'Invalid Date') ||
    //or (to) date exists but (from) date doesn't or vice versa
    (!req.body.from && req.body.to) ||
    (req.body.from && !req.body.to)
  ) {
    return res
      .status(400)
      .send({ message: 'Missing or Invalid (from)/ (to) date!' });
  }

  // Then, start searching
  // 2 Cases: 1 with dateTime and 1 without
  const text = req.body.query;
  const from = req.body.from;
  const to = req.body.to;
  if (from) {
    // Combine date time in find() query
    await Event.find({
      belongsTo: req.user._id,
      $or: [
        { name: { $regex: text, $options: 'i' } },
        { description: { $regex: text, $options: 'i' } },
      ],
      startedDateTime: {
        $gte: new Date(new Date(from).setHours(0, 0, 0)),
        $lt: new Date(new Date(to).setHours(23, 59, 59)),
      },
    })
      .then((data) => {
        eventMap = data;
      }) // Case of error
      .catch((err) => {
        console.log(err);
        res.status(500).send({
          message: 'Error when accessing the database!',
        });
      });
  }
  // Else, searching for query only
  else {
    await Event.find({
      belongsTo: req.user._id,
      $or: [
        { name: { $regex: text, $options: 'i' } },
        { description: { $regex: text, $options: 'i' } },
      ],
    })
      .then((data) => {
        eventMap = data;
      }) // Case of error
      .catch((err) => {
        console.log(err);
        res.status(500).send({
          message: 'Error when accessing the database!',
        });
      });
  }

  const keys = Object.keys(req.body);
  // If searching with contacts
  if (keys.indexOf('participants') > -1) {
    var index = eventMap.length - 1;
    while (index >= 0) {
      if (
        !req.body.participants.every((value) =>
          eventMap[index].participants.includes(value)
        )
      ) {
        eventMap.splice(index, 1);
      }
      index -= 1;
    }
  }

  // Now consider completed status
  if (
    keys.indexOf('completed') > -1 &&
    typeof req.body.completed == 'boolean'
  ) {
    var ind = eventMap.length - 1;
    while (ind >= 0) {
      if (eventMap[ind].completed != req.body.completed) {
        eventMap.splice(ind, 1);
      }
      ind -= 1;
    }
  }

  // Then modify the eventMap for display
  var returnedEv = [];
  for (let i = 0; i < eventMap.length; i++) {
    returnedEv.push(await ctrlSupport.displayEvent(eventMap[i]));
  }
  res.status(200).send(returnedEv);
}

// =================== Relationship, convo and message search =========================== //

// Function to search a relationship ==============================================
// Searching by tags
async function relationshipSearch(req, res) {
  // check query's body
  if (!checkValidQuery(req)) {
    return res.status(500).send({ message: 'Missing query!' });
  }

  Relationship.find({
    belongsTo: req.user._id,
    $or: [{ tag: { $regex: req.body.query, $options: 'i' } },
    { description: { $regex: req.body.query, $options: 'i' } }]
  })
    .then(async (data) => {
      // If user search by the contactIds
      const keys = Object.keys(req.body);
      // If searching with contacts
      if (keys.indexOf('people') > -1) {
        var index = data.length - 1;
        while (index >= 0) {
          if (!req.body.people.every((value) => data[index].people.includes(value))) {
            data.splice(index, 1);
          }
          index -= 1;
        }
      }

      // Then modify the eventMap for display
      var returnedMap = [];
      for (let i = 0; i < data.length; i++) {
        returnedMap.push(await ctrlSupport.displayRela(data[i]));
      }
      res.status(200).send(returnedMap);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send({ message: 'Error when accessing the database!' });
    });
}

// Function to search for convo
async function convoSearch(req, res) {
  // check query's body
  if (!checkValidQuery(req)) {
    return res.status(500).send({ message: 'Missing query!' });
  }
  // query is going to be looked at in user's db
  const text = req.body.query;
  await User.find({
    $or: [
      { firstName: { $regex: text, $options: 'i' } },
      { lastName: { $regex: text, $options: 'i' } },
    ],
  }).then(async (data) => {
    // Make a map of people in convo
    var peopleMap = [];
    data.forEach((user) => {
      // Ignore the current logged-in user
      if (req.user._id != user._id) {
        peopleMap.push([req.user._id, user._id].sort());
      }
    });
    console.log(peopleMap);
    var convoMap = [];
    // Now look for these people in convo
    for (let i = 0; i < peopleMap.length; i++) {
      const people = peopleMap[i];
      await Convo.findOne({ people: people }).then((found) => {
        if (found) {
          convoMap.push(found);
        }
      });
    }
    res.send(convoMap);

  }).catch((err) => {
    console.log(err);
    return res.status(500).send({ message: "Error when accessing the database!" });
  })
}

// Function to search for messages given conversation's id =======================
// app.route('/conversation/search/:id') - this id is the id of the convo
function messageSearch(req, res) {
  // check query's body
  if (!checkValidQuery(req)) {
    return res.status(500).send({ message: 'Missing query!' });
  }
  // Id of the convo
  const id = req.params.id;
  // import data that contains those ids
  var data = [];
  // Find from database
  Convo.findById(id)
    .then((found) => {
      //console.log(data);
      found.messages.forEach((mes) => {
        if (mes.content.includes(req.body.query)) {
          data.push(mes);
        }
      });
      // found the conversation --> look for messages content
      res.status(200).send(data);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send({ message: 'Error when accessing the database!' });
    });
}


// Checks for valid search's query =================================================
function checkValidQuery(req) {
  const keys = Object.keys(req.body);

  if (keys.indexOf('query') == -1) {
    return false;
  }
  return true;
}

module.exports = {
  contactSearch,
  userSearch,
  eventSearch,
  messageSearch, convoSearch,
  relationshipSearch,
};
