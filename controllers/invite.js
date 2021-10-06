/* 
Skeleton code for the emailing service using tutorial at:
https://www.tothenew.com/blog/sending-ical-invite-using-node-js/
https://www.courier.com/blog/how-to-send-emails-with-node-js 

Lam's used tutorial: 
https://www.w3schools.com/nodejs/nodejs_email.asp
https://stackoverflow.com/questions/26948516/nodemailer-invalid-login
*/

require('dotenv').config();
const nodemailer = require('nodemailer');
const sendgrid = require('@sendgrid/mail');

var transporter = nodemailer.createTransport({
  service: process.env.NODEMAILER_SERVICE,
  auth: {
    user: process.env.NODEMAILER_USER,
    pass: process.env.NODEMAILER_PASS,
  },
});

var mailOptions = {
  from: 'youremail@gmail.com',
  to: 'lamkhoan@student.unimelb.edu.au',
  subject: 'Sending Email using Node.js',
  text: 'That was easy!',
};

function TestsendEmail() {
  console.log('AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA');
  console.log(process.env.NODEMAILER_USER);

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
}

// Danielle code down here
const SENDGRID_API_KEY =
  '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';
sendgrid.setApiKey(SENDGRID_API_KEY);

function SendInvite() {
  const mailObj = {
    from: 'citrus.contact21@gmail.com',
    to: 'drlovell@student.unimelb.edu.au',
    subject: 'Qingyi has send you an event invite',
    text: 'Dummy text for testing purposes only.',
  };

  sendgrid
    .send(mailObj)
    .then((res) => {
      console.log('Email sent\n', res);
    })
    .catch((err) => {
      console.error(err);
    });
}

module.exports = { SendInvite, TestsendEmail };
