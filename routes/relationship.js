const express = require('express');
const app = express();

const controller = require('../controllers/relationship');

app.route('/relationship').post(controller.create).get(controller.findAll);

app.route('/relationship/getall/:id').get(controller.getall);

app.route('/relationship/search').get(controller.search);

app
  .route('/relationship/:id')
  .put(controller.update)
  .delete(controller.delete)
  .get(controller.findOne);

module.exports = app;
