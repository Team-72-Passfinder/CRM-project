const express = require('express');
const app = express();

const controller = require('../controllers/invite');

app.route('/invite').get(controller.SendInvite);

module.exports = app;