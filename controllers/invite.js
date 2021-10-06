// Skeleton code for the emailing service using tutorial at https://www.tothenew.com/blog/sending-ical-invite-using-node-js/

const nodemailer = require('nodemailer');

function SendInvite() {

var transport = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "4320b5a213c21c",
      pass: "d5fe9a0fae8623"
    }
  });

  var mailObj = {
	from: "lamkhoan@student.unimelb.edu.au ",
    to: "drlovell@student.unimelb.edu.au",
    subject: "Qingyi has send you an event invite",
    text: "Dummy text for testing purposes only."
};

transporter.sendMail(mailObj, function(err, info){
    console.log(err,info);
});

}

export default SendInvite;