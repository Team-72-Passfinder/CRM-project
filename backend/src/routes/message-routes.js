// Route for testing message database in Postman

module.exports = (app) => {

    const messages = require('../controllers/message-controller');

    // Create a messages
    app.post('/messages', messages.create);

    // Update messages
    app.put('/messages/:id', messages.update);

    // Delete the messages
    app.delete('/messages/:id', messages.delete);

    // Retrieve all the messages
    app.get('/messages', messages.findAll);

    // Read the messages
    app.get('/messages/:id', messages.findOne);
}