const express = require('express');
const app = express();
const passport = require('../config/passport');

const controller = require('../controllers/conversation');

app.use(passport.authenticate('jwt', { session: false }))

app.route('/conversation').post(controller.create).get(controller.findAll);

app.route('/conversation/search/:id').get(controller.search);

app.route('/conversation/getall').get(controller.getall);

app
  .route('/conversation/:id')
  .put(controller.update)
  .delete(controller.delete)
  .get(controller.findOne);

module.exports = app;
