const express = require('express');
const app = express();
const passport = require('../config/passport');

const controller = require('../controllers/relationship');

app.use(passport.authenticate('jwt', { session: false }));

// findAll = all relationships in DB
app.route('/relationship').post(controller.create).get(controller.findAll);

// getall = all relationships belong to current users
app.route('/relationship/getall').get(controller.getall);

app.route('/relationship/search').post(controller.search);

app
  .route('/relationship/:id')
  .put(controller.update)
  .delete(controller.delete)
  .get(controller.findOne);

module.exports = app;
