const express = require('express');
const app = express();
const passport = require('../config/passport');

const controller = require('../controllers/relationship');

// findAll = all relationships in DB
app
  .route('/relationship')
  .post(passport.authenticate('jwt', { session: false }), controller.create)
  .get(passport.authenticate('jwt', { session: false }), controller.findAll);

// getall = all relationships belong to current users
app
  .route('/relationship/getall')
  .get(passport.authenticate('jwt', { session: false }), controller.getall);

app
  .route('/relationship/search')
  .post(passport.authenticate('jwt', { session: false }), controller.search);

app
  .route('/relationship/:id')
  .put(passport.authenticate('jwt', { session: false }), controller.update)
  .delete(passport.authenticate('jwt', { session: false }), controller.delete)
  .get(passport.authenticate('jwt', { session: false }), controller.findOne);

module.exports = app;
