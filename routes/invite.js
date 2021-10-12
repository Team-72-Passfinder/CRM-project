const express = require('express');
const passport = require('passport');
const app = express();

const controller = require('../controllers/invite');
//const eventContoller = require('../controllers/event');

// Might also be a problem associated with this?
app.route('/testinvite').get(controller.TestInvite);
app
  .route('/invite/:id')
  .get(passport.authenticate('jwt', { session: false }), controller.SendInvite);

module.exports = app;
