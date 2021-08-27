// 

module.exports = (app) => {

  const events = require('../controllers/event-controller');

  // Create a event
  app.post('/events', events.createEvent);
  /*
    // Retrieve all the event
    app.get('/events', events.findAll);
   
    // Read the event
    app.get('/events/:eventId', events.findOne);
   
    // Update event
    app.put('/events/:eventId', events.update);
   
    // Delete the event
    app.delete('/events/:eventId', events.delete);
    */
}
