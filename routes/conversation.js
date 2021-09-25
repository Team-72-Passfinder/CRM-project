const express = require('express');
const app = express();

const controller = require('../controllers/conversation');

app.route('/conversation').post(controller.create).get(controller.findAll);

app.route('/conversation/search/:id').get(controller.search);

app
  .route('/conversation/:id')
  .put(controller.update)
  .delete(controller.delete)
  .get(controller.findOne);

module.exports = app;
