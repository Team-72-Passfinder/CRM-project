const express = require('express');
const app = express();

const controller = require('../controllers/relationship');

app.route('/relationship').post(controller.create).get(controller.findAll);

app.route('/relationship/getall/:belongsToId').get(controller.getall);

app.route('/relationship/search/:belongsToId').get(controller.search);

app
  .route('/relationship/:id')
  .put(controller.update)
  .delete(controller.delete)
  .get(controller.findOne);

module.exports = app;
