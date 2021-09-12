//app.route('/user').post(controller.create).get(controller.findAll).get('/search', controller.search);

// Basic search function
// The search query request looks like this:
/*
{
    "query": string
}
*/
//function basicSearch(controller, req, res) {

//}
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

//module.exports = { basicSearch };