/* 
Tutorials used by Danielle for initial version.
Skeleton code for the emailing service using tutorial at:
https://www.tothenew.com/blog/sending-ical-invite-using-node-js/
https://www.courier.com/blog/how-to-send-emails-with-node-js 

Lam's used tutorial: 
https://www.w3schools.com/nodejs/nodejs_email.asp
https://stackoverflow.com/questions/26948516/nodemailer-invalid-login
*/

require('dotenv').config();
const nodemailer = require('nodemailer');
const Event = require('../models/event');

var transporter = nodemailer.createTransport({
  service: process.env.NODEMAILER_SERVICE,
  auth: {
    user: process.env.NODEMAILER_USER,
    pass: process.env.NODEMAILER_PASS,
  },
});

var mailOptions = {
  from: 'youremail@gmail.com',
  to: 'drlovell@student.unimelb.edu.au',
  subject: 'You have an event invitation from',
  text: "You have an event invitation from",
};

function SendInvite() {
  // Define required parameters to make ical entry from an event

  console.log('Sending email...');
  console.log(process.env.NODEMAILER_USER);

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
}

module.exports = { SendInvite };
