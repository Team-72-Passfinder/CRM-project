
// Basic search function
// The basic search query request looks like this:
/*{
    "query": string
}*/
function basicSearch(controler, req, res) {
  // Case of updated sucessfully
  controler
    .find({ $text: { $search: req.body.query } })
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

// Search function for User only
// since some info is protected and not to be returned directly
// returns an array of users 
function userSearch(controler, req, res) {
  var userMap = [];
  controler
    .find({ $text: { $search: req.body.query } })
    .then((data) => {
      data.forEach(function (user) {
        userMap.push({
          _id: user._id,
          username: user.username,
          email: user.email,
          firstname: user.firstName,
          lastName: user.lastName,
          dateOfBirth: user.dateOfBirth,
          biography: user.biography
        })
      })
      res.send(userMap);
    })
    // Catching error when accessing the database
    .catch((err) => {
      console.log(err);
      res.status(500).send({
        message: 'Error when accessing the database!',
      });
    });
}

// searching with filter - use specificly for event
// a query may look like the following:
/*{
  "query": string,
  "completed": true // indicates that only looking for finished events
}*/
function eventSearch(controler, req, res) {
  // Check if there's filter
  // If not, perform the basic search
  if (Object.keys(req.body).length == 1) {
    basicSearch(controler, req, res);
  }
  else {
    // Else, filter out the completed status
    var eventMap = [];
    // Case of updated sucessfully
    controler
      .find({ $text: { $search: req.body.query } })
      .then((data) => {
        data.forEach(function (event) {
          if (event.completed === req.body.completed) {
            //console.log(event.completed);
            eventMap.push(event);
          }
        });
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
}

// Function to search for messages given conversation's id
// app.route('/conversation/search/:id')
// search json file looks like this:
/*{
  "query": string
}*/
function convoSearch(controler, req, res) {
  // Id of the convo
  const id = req.params.id;
  // import data that contains those ids
  var data = [];
  // Find from database
  controler.findById(id).then((found) => {
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
// An id of a user must be given and the query should be a name of user
// search json file looks like this:
/*{
  "id" : string, // id of client
  "query": string
}*/
/*
function relationshipSearch(controler, req, res) {
  // Find data that contains those ids
  
}*/

module.exports = { basicSearch, userSearch, eventSearch, convoSearch };