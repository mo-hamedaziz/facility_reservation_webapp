const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "Gmail",
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: `${process.env.NODEMAILER_USER}@gmail.com`,
    pass: process.env.NODEMAILER_PASS,
  },
});

// async..await is not allowed in global scope, must use a wrapper
const sendEmail = async (
  senderName,
  senderEmail,
  recipientEmail,
  subject,
  body
) => {
  try {
    // send mail with defined transport object
    const info = await transporter.sendMail({
      from: `${senderName} <${senderEmail}>`, // sender address
      to: recipientEmail, // list of receivers
      subject, // Subject line
      //text: "Hello world?", // plain text body
      html: body, // html body
    });

    console.log("Message sent: %s", info.messageId);
    return info.messageId;
  } catch (error) {
    console.log("FAILED", error);
  }
}

module.exports = sendEmail;
