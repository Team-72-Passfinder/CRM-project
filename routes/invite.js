const express = require('express');
const app = express();

const controller = require('../controllers/invite');
//const eventContoller = require('../controllers/event');

// Might also be a problem associated with this?
//app.route('/invite/:id').get(eventContoller.findOne).get(controller.SendInvite);
app.route('/testinvite').get(controller.TestInvite);
app.route('/invite/:id').get(controller.SendInvite);

module.exports = app;
