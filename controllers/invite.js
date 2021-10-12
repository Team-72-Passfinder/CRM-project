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
const Contact = require('../models/contact');

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

function ConstructEmail(userEmail, eventData, participantsNameList, emailList) {
  let mailContent = {
    from: '',
    to: '',
    subject: '',
    text: '',
  };

  // Update the email content
  mailContent.from = userEmail;
  mailContent.to = emailList;
  mailContent.subject = eventData.name;
  mailContent.text = '\n' + 'Description: ' + eventData.description;
  mailContent.text += '\n' + 'Participants: ' + participantsNameList.toString();
  mailContent.text +=
    '\n' +
    'Start DateTime: ' +
    new Date(eventData.startedDateTime).toLocaleString('en-GB', {
      timeZone: 'UTC',
    });

  return mailContent;
}

exports.SendInvite = async (req, res) => {
  var eventData, participantsNameList, emailList;

  // Finished everything, now construct the email content
  let mailContent = ConstructEmail(
    req.user.email,
    eventData,
    participantsNameList,
    emailList
  );
  // Send email
  console.log(mailContent);
  // Temporary comment for testing
  // transporter.sendMail(mailContent, function (error, info) {
  //   if (error) {
  //     console.log(error);
  //     return res
  //       .status(500)
  //       .send({ message: 'Error when establishing nodemailer!' });
  //   } else {
  //     res.status(200).send({ message: 'Email sent: ' + info.response });
  //   }
  //   transporter.close();
  // });
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
