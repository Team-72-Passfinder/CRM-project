const express = require('express');
const app = express();

const controller = require('../controllers/message');

app.route('/message').post(controller.create).get(controller.findAll);

app
  .route('/message/:id')
  .put(controller.update)
  .delete(controller.delete)
  .get(controller.findOne);

module.exports = app;
