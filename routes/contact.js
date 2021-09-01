const express = require('express');
const app = express();

const controller = require('../controllers/contact');

app.route('/contact').post(controller.create).get(controller.findAll);

app
  .route('/contact/:id')
  .put(controller.update)
  .delete(controller.delete)
  .get(controller.findOne)
  .post(controller.addFromId);

module.exports = app;
