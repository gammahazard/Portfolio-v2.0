const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.post('/sendMail', function(req, res) {
  const { name, email, message } = req.body;

  const transporter = nodemailer.createTransport({
    service: process.env.EMAIL_SERVICE,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD
    }
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: process.env.EMAIL_USER,
    subject: 'New Message from your Portfolio',
    html: `
      <h3>New Message from your Portfolio</h3>
      <p>Name: ${name}</p>
      <p>Email: ${email}</p>
      <p>Message: ${message}</p>
    `
  };

  transporter.sendMail(mailOptions, function(error, info) {
    if (error) {
      console.log(error);
      res.status(500).json({ message: 'Internal Server Error' });
    } else {
      console.log('Email sent: ' + info.response);
      res.json({ message: 'Email sent!' });
    }
  });
});

app.listen(process.env.PORT || 3000, function() {
  console.log(`Server running on port ${process.env.PORT || 3000}`);
});