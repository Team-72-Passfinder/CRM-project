const express = require('express');
const app = express();

const controller = require('../controllers/event');

app.route('/event').post(controller.create).get(controller.findAll);

app
  .route('/event/:id')
  .put(controller.update)
  .delete(controller.delete)
  .get(controller.findOne);

module.exports = app;
