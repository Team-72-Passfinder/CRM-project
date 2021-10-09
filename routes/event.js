const express = require('express');
const app = express();
const passport = require('../config/passport');

const controller = require('../controllers/event');

app.use(passport.authenticate('jwt', { session: false }));

// findAll = all events in DB
app.route('/event').post(controller.create).get(controller.findAll);

// getall = all events that belong to current user
app.route('/event/getall').get(controller.getall);

app.route('/event/search').get(controller.search);

app
  .route('/event/:id')
  .get(controller.findOne)
  .put(controller.update)
  .delete(controller.delete);

module.exports = app;
