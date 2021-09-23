
const ctrl = require('./controller-support');
const User = require('../models/user');
// Basic search function ====================================================
// The basic search query request looks like this:
/*{
    "query": string
}*/
async function contactSearch(controller, req, res) {
  // Check valid userId
  if (!(await ctrl.checkValidId(User, req.params.belongsToId))) {
    return res.status(400).send({ message: 'Invalid userId!' });
  }
  // check query's body
  if (!checkValidQuery(req)) {
    return res.status(500).send({ message: 'Missing query!' });
  }

  const text = req.body.query;
  controller
    .find({
      belongsTo: req.params.belongsToId,
      $or: [{ firstName: { $regex: text, $options: 'i' } },
      { lastName: { $regex: text, $options: 'i' } },
      { email: { $regex: text, $options: 'i' } }]
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
// since some info is protected and not to be returned directly
// returns an array of users 
function userSearch(controller, req, res) {
  // check query's body
  if (!checkValidQuery(req)) {
    return res.status(500).send({ message: 'Missing query!' });
  }
  var userMap = [];
  const text = req.body.query;
  controller
    //.find({ $text: { $search: req.body.query } }) // full-text search
    // partial-text-search:
    .find({
      $or: [{ username: { $regex: text, $options: 'i' } },
      { firstName: { $regex: text, $options: 'i' } },
      { lastName: { $regex: text, $options: 'i' } },
      { email: { $regex: text, $options: 'i' } }]
    }).then((data) => {
      data.forEach((user) => {
        userMap.push({
          _id: user._id,
          username: user.username,
          email: user.email,
          firstname: user.firstName,
          lastName: user.lastName,
          dateOfBirth: user.dateOfBirth,
          biography: user.biography || "",
        })
      })
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
  "query": string,
  "completed": boolean, // indicates that only looking for finished/unfinished events
  "dateTime": date      // looks for particular event on particular date
}*/
function eventSearch(controller, req, res) {
  // check query's body
  if (!checkValidQuery(req)) {
    return res.status(500).send({ message: 'Missing query!' });
  }

  const text = req.body.query;
  // Else, filter out the completed status
  var eventMap = [];
  // Case of updated sucessfully
  controller
    .find({
      $or: [{ name: { $regex: text, $options: 'i' } },
      { description: { $regex: text, $options: 'i' } }]
    })
    .then((data) => {
      if (Object.keys(req.body).length > 1) {
        data.forEach((event) => {
          if (event.completed === req.body.completed) {
            //console.log(event.completed);
            eventMap.push(event);
          }
        });
      }
      else {
        eventMap = data;
      }
      res.status(200).send(eventMap);
    })
    // Case of error
    .catch((err) => {
      console.log(err);
      res.status(500).send({
        message: 'Error when accessing the database!',
      });
    });
}

// Function to search for messages given conversation's id =======================
// app.route('/conversation/search/:id')
// search json file looks like this:
/*{
  "query": string
}*/
function convoSearch(controller, req, res) {
  // check query's body
  if (!checkValidQuery(req)) {
    return res.status(500).send({ message: 'Missing query!' });
  }
  // Id of the convo
  const id = req.params.id;
  // import data that contains those ids
  var data = [];
  // Find from database
  controller.findById(id).then((found) => {
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

// Function to search a relationship
// Searching by tags
// search json file looks like this:
/*{
  "query": string
}*/

async function relationshipSearch(controller, req, res) {
  // Check valid userId
  if (!(await ctrl.checkValidId(User, req.params.belongsToId))) {
    return res.status(400).send({ message: 'Invalid userId!' });
  }
  // check query's body
  if (!checkValidQuery(req)) {
    return res.status(500).send({ message: 'Missing query!' });
  }

  controller
    .find({
      belongsTo: req.params.belongsToId,
      tag: { $regex: req.body.query, $options: 'i' }
    })
    //.find({ $text: { $search: req.body.query } })
    .then((data) => {
      res.status(200).send(data);
    }).catch((err) => {
      console.log(err);
      res.status(500).send({ message: 'Error when accessing the database!' });
    });

}

function checkValidQuery(req) {

  const keys = Object.keys(req.body);

  if (keys.indexOf('query') == -1) {
    return false;
  }
  return true;
}

module.exports = { contactSearch, userSearch, eventSearch, convoSearch, relationshipSearch };