//app.route('/user').post(controller.create).get(controller.findAll).get('/search', controller.search);

// Basic search function
// The search query request looks like this:
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
  var eventMap = [];
  // Case of updated sucessfully
  controler
    .find({ $text: { $search: req.body.query } })
    .then((data) => {
      data.forEach(function (event) {
        if (event.completed == req.body.completed) {
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

module.exports = { basicSearch, userSearch, eventSearch };