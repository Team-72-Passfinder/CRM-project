const express = require('express');
const app = express();
const passport = require('../config/passport');
const controller = require('../controllers/event');

// findAll = all events in DB
app
  .route('/event')
  .post(passport.authenticate('jwt', { session: false }), controller.create)
  .get(passport.authenticate('jwt', { session: false }), controller.findAll);

// getall = all events that belong to current user
app
  .route('/event/getall')
  .get(passport.authenticate('jwt', { session: false }), controller.getall);

app
  .route('/event/search')
  .post(passport.authenticate('jwt', { session: false }), controller.search);

app
  .route('/event/:id')
  .get(passport.authenticate('jwt', { session: false }), controller.findOne)
  .put(passport.authenticate('jwt', { session: false }), controller.update)
  .delete(passport.authenticate('jwt', { session: false }), controller.delete);

// app
//   .route('/event/log')
//   .get(passport.authenticate('jwt', { session: false }), async (req, res) => {

//   })

module.exports = app;
