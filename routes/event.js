const express = require('express');
const app = express();
const passport = require('../config/passport');

const controller = require('../controllers/event');

app.use(passport.authenticate('jwt', { session: false }))

app.route('/event').post(controller.create).get(controller.findAll);

app.route('/event/getall').get(controller.getall);

app.route('/event/search').post(controller.search);

app
  .route('/event/:id')
  .get(controller.findOne)
  .put(controller.update)
  .delete(controller.delete);

module.exports = app;
