const formData = require("form-data");
const Mailgun = require("mailgun.js");

const mailgun = new Mailgun(formData);
const mg = mailgun.client({
  username: "api",
  key: process.env.MAILGUN_API_KEY || "1ee3b3f2425d1c2d6eecebd49b1f3a9c-19806d14-96f1b1b0",
});

sendMail = function (sender, receiver_email, email_subject, email_body) {
  mg.messages
    .create("sandboxd0e2e7fa9edc45d99cf3dc55db7ad386.mailgun.org", {
      from: `Reservation App Admin <${sender}@sandboxd0e2e7fa9edc45d99cf3dc55db7ad386.mailgun.org>`,
      to: [receiver_email],
      subject: email_subject,
      html: "<h1>Password H1</h1>\n<p>"+email_body+"</p>",
    })
    .then((msg) => console.log("Success",msg)) // logs response data
    .catch((err) => console.log("Failed", err)); // logs any error
};

module.exports = sendMail;
