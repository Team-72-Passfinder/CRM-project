/* Skeleton code for the emailing service using tutorial at https://www.tothenew.com/blog/sending-ical-invite-using-node-js/
  and https://www.courier.com/blog/how-to-send-emails-with-node-js */

const nodemailer = require('nodemailer');
const sendgrid = require('@sendgrid/mail');
const SENDGRID_API_KEY = "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"

sendgrid.setApiKey(SENDGRID_API_KEY)

function SendInvite() {

    const mailObj = {
	  from: "citrus.contact21@gmail.com",
      to: "drlovell@student.unimelb.edu.au",
      subject: "Qingyi has send you an event invite",
      text: "Dummy text for testing purposes only."
  };

    sendgrid.send(mailObj).then((res) => {
      console.log('Email sent\n', res)
  })
  .catch((err) => {
    console.error(err)
})

}

export default SendInvite;