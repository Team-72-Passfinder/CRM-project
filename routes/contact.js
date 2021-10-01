const express = require('express');
const app = express();
const passport = require('../config/passport');

const controller = require('../controllers/contact');

app.use(passport.authenticate('jwt', { session: false }))

app.route('/contact').post(controller.create).get(controller.findAll);

// Unnecessary as /search with empty "query" is equivalent to getall
app.route('/contact/getall').get(controller.getall);

app.route('/contact/search').get(controller.search);

app
  .route('/contact/:id')
  .put(controller.update)
  .delete(controller.delete)
  .get(controller.findOne);

app.route('/contact/add/:userId').post(controller.addFromId);

module.exports = app;
