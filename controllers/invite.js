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
    rejectUnauthorized: false
  }
});

var mailOptions = {
  from: 'youremail@gmail.com',
  to: 'haiha@student.unimelb.edu.au',
  cc: 'drlovell@student.unimelb.edu.au',
  subject: 'You have an event invitation from',
  text: 'You have an event invitation from',
};

exports.SendInvite = async (req, res) => {
  // Check if eventId is valid
  const id = req.params.id;
  await Event.findById(id).then((found) => {
    if (!found) {
      return res.status(404).send({ message: "No event is foudn with this Id!" });
    }
  }).catch((err) => {
    console.log(err);
    res.status(500).send({ message: 'Error when accessing the database!' });
  });

  // Define required parameters to make ical entry from an event
  console.log('Sending email...');
  console.log(process.env.NODEMAILER_USER);

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
      return res.status(500).send({ message: "Error when establishing nodemailer!" });
    } else {
      res.status(200).send({ message: 'Email sent: ' + info.response });
    }
    //transporter.close();
  });
}

//module.exports = { SendInvite };
