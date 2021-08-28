// Route for testing relationship database in Postman

module.exports = (app) => {

    const relationships = require('../controllers/relationship-controller');

    // Create a relationships
    app.post('/relationships', relationships.create);

    // Update relationships
    app.put('/relationships/:id', relationships.update);

    // Delete the relationships
    app.delete('/relationships/:id', relationships.delete);

    // Retrieve all the relationships
    app.get('/relationships', relationships.findAll);

    // Read the relationships
    app.get('/relationships/:id', relationships.findOne);
}