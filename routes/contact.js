const express = require('express');
const app = express();
const passport = require('../config/passport');
const controller = require('../controllers/contact');

// findAll =  all contacts in DB
app
  .route('/contact')
  .post(passport.authenticate('jwt', { session: false }), controller.create)
  .get(passport.authenticate('jwt', { session: false }), controller.findAll);

// getall = all contacts that belong to current user
app
  .route('/contact/getall')
  .get(passport.authenticate('jwt', { session: false }), controller.getall);

// Get list of names and Ids of all contacts that user has
// Used to set option for event's participants
app
  .route('/contact/participants')
  .get(passport.authenticate('jwt', { session: false }), controller.getParticipants);

app
  .route('/contact/search')
  .post(passport.authenticate('jwt', { session: false }), controller.search);

app
  .route('/contact/:id')
  .put(passport.authenticate('jwt', { session: false }), controller.update)
  .delete(passport.authenticate('jwt', { session: false }), controller.delete)
  .get(passport.authenticate('jwt', { session: false }), controller.findOne);

app
  .route('/contact/add/:userId')
  .post(passport.authenticate('jwt', { session: false }), controller.addFromId);

app
  .route('/contact/reminder')
  .post(passport.authenticate('jwt', { session: false }), controller.toRemind);

module.exports = app;
