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
const { getNamesFromContactIds } = require('./controller-support');

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

function ConstructEmail(userEmail, eventData, participantNameList, emailList) {
  let mailContent = {
    from: '',
    to: '',
    subject: '',
    text: '',
  };

  // Update the email content
  //mailContent.from = userEmail;
  mailContent.to = emailList;
  mailContent.subject = eventData.name;
  mailContent.text = '\n' + 'Description: ' + eventData.description;
  mailContent.text += '\n' + 'Participants: ' + participantNameList.toString();
  mailContent.text +=
    '\n' +
    'Start DateTime: ' +
    new Date(eventData.startedDateTime).toLocaleString('en-GB', {
      timeZone: 'UTC',
    });
  if (eventData.endedDateTime) {
    mailContent.text +=
      '\n' +
      'Ended DateTime: ' +
      new Date(eventData.endedDateTime).toLocaleString('en-GB', {
        timeZone: 'UTC',
      });
  }

  return mailContent;
}

exports.SendInvite = async (req, res) => {
  const id = req.params.id;
  Event.findOne({ _id: id, belongsTo: req.user._id })
    .then(async (eventData) => {
      // If data with this id is not found
      if (!eventData) {
        // return the error messages
        return res.status(404).send({
          message: 'No event is found with this id!',
        });
      }

      // Get extra data for emails
      const participantNameList = await getNamesFromContactIds(
        eventData.belongsTo,
        eventData.participants
      );
      const emailList = [];

      // Now access Contact DB to retrieve email address
      await Contact.find({
        _id: { $in: eventData.participants },
        belongsTo: eventData.belongsTo,
      }).then((found) => {
        if (found) {
          found.forEach((element) => {
            // some contacts don't have email
            if (element.email) {
              emailList.push(element.email);
            }
          });
        }
      });

      // Finished everything, now construct the email content
      let mailContent = ConstructEmail(
        req.user.email,
        eventData,
        participantNameList,
        emailList
      );

      // Send email
      console.log(mailContent);
      transporter.sendMail(mailContent, function (error, info) {
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
    // Catching the error when assessing the DB
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
