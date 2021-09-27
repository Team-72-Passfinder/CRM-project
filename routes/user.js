const express = require('express');
const app = express();

const controller = require('../controllers/user');
const passport = require('../config/passport');

app.use(passport.authenticate('jwt', { session: false }));

app.route('/user').post(controller.create).get(controller.findAll)
  .put(controller.update);

app.route('/user/search').get(controller.search);

app
  .route('/user/:id')
  //.put(controller.update)
  .delete(controller.delete)
  .get(controller.findOne);

module.exports = app;
