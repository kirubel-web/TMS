require('dotenv').config();
const nodemailer = require('nodemailer');

function generateOTP() {
  return Math.floor(100000 + Math.random() * 900000).toString(); // Generates a 6-digit OTP
}

async function sendOTPEmail(email, otp) {
  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  let mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Your OTP Code',
    text: `Your OTP code is ${otp}`,
  };

  await transporter.sendMail(mailOptions);
}

module.exports = { generateOTP, sendOTPEmail };