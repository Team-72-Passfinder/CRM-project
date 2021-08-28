// Route for testing event database in Postman

module.exports = (app) => {

  const events = require('../controllers/event-controller');

  // Create a event
  app.post('/events', events.create);

  // Update event
  app.put('/events/:id', events.update);

  // Delete the event
  app.delete('/events/:id', events.delete);

  // These folowings relate to Search engine??
  // Retrieve all the event
  app.get('/events', events.findAll);

  // Read the event
  app.get('/events/:id', events.findOne);
}
