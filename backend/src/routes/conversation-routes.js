// Route for testing conversation database in Postman

module.exports = (app) => {

    const conversations = require('../controllers/conversation-controller');

    // Create a conversations
    app.post('/conversations', conversations.create);

    // Update conversations
    app.put('/conversations/:id', conversations.update);

    // Delete the conversations
    app.delete('/conversations/:id', conversations.delete);

    // Retrieve all the conversations
    app.get('/conversations', conversations.findAll);

    // Read the conversations
    app.get('/conversations/:id', conversations.findOne);
}