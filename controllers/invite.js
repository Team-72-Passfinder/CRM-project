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
  tls: {
    rejectUnauthorized: false,
  },
});

let mailOptions = {
  from: '',
  to: 'citrus.contact.unimelb@gmail.com',
  subject: 'You have an event invitation from',
  text: 'You have an event invitation from',
};

exports.SendInvite = async (req, res) => {
  // Check if eventId is valid
  const id = req.params.id;
  await Event.findById(id)
    .then((found) => {
      if (!found) {
        return res
          .status(404)
          .send({ message: 'No event is foudn with this Id!' });
      }

      // Update the email content
      console.log(found);
      mailOptions.subject = found.name;
      mailOptions.text = 'Description: ' + found.description;
      mailOptions.text +=
        '\n' + 'Participants: ' + found.participants.toString();
      mailOptions.text +=
        '\n' +
        'Start DateTime: ' +
        new Date(found.startedDateTime).toLocaleString('en-GB', {
          timeZone: 'UTC',
        });
      console.log(mailOptions);
      // Send the email
      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log(error);
          return res
            .status(500)
            .send({ message: 'Error when establishing nodemailer!' });
        } else {
          res.status(200).send({ message: 'Email sent: ' + info.response });
        }
        transporter.close();
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send({ message: 'Error when accessing the database!' });
    });
};

var testMail = {
  from: '',
  to: 'citrus.contact.unimelb@gmail.com',
  subject: 'Test email',
  text: 'test email',
};

exports.TestInvite = (req, res) => {
  // Define required parameters to make ical entry from an event
  console.log('Sending email...');
  console.log(process.env.NODEMAILER_USER);

  transporter.sendMail(testMail, function (error, info) {
    if (error) {
      console.log(error);
      return res
        .status(500)
        .send({ message: 'Error when establishing nodemailer!' });
    } else {
      res.status(200).send({ message: 'Email sent: ' + info.response });
    }
    transporter.close();
  });
};
