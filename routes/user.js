const express = require('express');
const app = express();

const controller = require('../controllers/user');

app.route('/user').post(controller.create).get(controller.findAll);

app
  .route('/user/:id')
  .put(controller.update)
  .delete(controller.delete)
  .get(controller.findOne);

module.exports = app;
