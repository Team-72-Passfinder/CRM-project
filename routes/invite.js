const express = require('express');
const app = express();

const controller = require('../controllers/invite');

// ? put instead of get?
app.route('/invite').get(controller.SendInvite);
app.route('/testinvite').get(controller.TestsendEmail);

module.exports = app;
