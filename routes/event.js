const express = require('express');
const app = express();

const controller = require('../controllers/event');

app.route('/event').post(controller.create).get(controller.findAll);

app.route('/event/search').get(controller.search);

app
  .route('/event/:id')
  .get(controller.findOne)
  .put(controller.update)
  .delete(controller.delete);

module.exports = app;
