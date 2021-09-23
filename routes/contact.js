const express = require('express');
const app = express();

const controller = require('../controllers/contact');

app.route('/contact').post(controller.create).get(controller.findAll);

// Unnecessary as /search with empty "query" is equivalent to getall
app.route('/contact/getall/:belongsToId').get(controller.getall);

app.route('/contact/search/:belongsToId').get(controller.search);

app
  .route('/contact/:id')
  .put(controller.update)
  .delete(controller.delete)
  .get(controller.findOne);

app.route('/contact/add/:ownerId').post(controller.addFromId);

module.exports = app;
