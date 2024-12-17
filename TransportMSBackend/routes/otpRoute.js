// otpRoute.js
const express = require('express');
const router = express.Router();
const { sendOTPEmail, generateOTP } = require('../services/otpService'); // Adjust the path as needed

let otpStore = {}; // In-memory store for OTPs

router.post('/send-otp', async (req, res) => {
  const { email } = req.body;
  const otp = generateOTP();
  otpStore[email] = otp; // Store OTP
  await sendOTPEmail(email, otp);
  res.status(200).send('OTP sent');
});

router.post('/verify-otp', (req, res) => {
  const { email, otp } = req.body;
  if (otpStore[email] === otp) {
    delete otpStore[email]; // OTP verified, remove from store
    res.status(200).send('OTP verified');
  } else {
    res.status(400).send('Invalid OTP');
  }
});

module.exports = router;