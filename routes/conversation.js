const express = require('express');
const app = express();
const passport = require('../config/passport');
const controller = require('../controllers/conversation');

app
  .route('/conversation')
  .post(passport.authenticate('jwt', { session: false }), controller.create)
  .get(passport.authenticate('jwt', { session: false }), controller.findAll);

app
  .route('/conversation/search')
  .post(
    passport.authenticate('jwt', { session: false }),
    controller.searchConvo
  );
app
  .route('/conversation/:id/search')
  .post(
    passport.authenticate('jwt', { session: false }),
    controller.searchMessage
  );

app
  .route('/conversation/getall')
  .get(passport.authenticate('jwt', { session: false }), controller.getall);

app
  .route('/conversation/:id')
  .put(passport.authenticate('jwt', { session: false }), controller.update)
  .delete(passport.authenticate('jwt', { session: false }), controller.delete)
  .get(passport.authenticate('jwt', { session: false }), controller.findOne);

module.exports = app;
