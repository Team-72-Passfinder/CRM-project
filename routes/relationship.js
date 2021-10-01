const express = require('express');
const app = express();
const passport = require('../config/passport');

const controller = require('../controllers/relationship');

app.use(passport.authenticate('jwt', { session: false }))

app.route('/relationship').post(controller.create).get(controller.findAll);

app.route('/relationship/getall').get(controller.getall);

app.route('/relationship/search').get(controller.search);

app
  .route('/relationship/:id')
  .put(controller.update)
  .delete(controller.delete)
  .get(controller.findOne);

module.exports = app;
