const express = require('express');
const path = require ('path');
const {app_port } = require ('./config');
const cors = require('cors')
const bodyParser = require ('body-parser')
const pageRoutes = require('./routes/pageroutes');
const mpesaapiRoutes = require('./routes/mpesaapi');
const authenticationRoutes = require('./routes/authentication');
const nodemailer = require('nodemailer');
const app = express(); // Initialize FIRST
app.use(cors()); // Then use it

//creating server
const server = require ('http').createServer(app);

//Middleware
app.use(bodyParser.json());
app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));
app.use(pageRoutes);

// app.use(mpesaapiRoutes);
app.use(authenticationRoutes);
app.use(bodyParser.json());
app.use(express.static('public')); // Serve HTML from 'public' folder
  

// Email configuration
const transporter = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });

  // Add better error handling
transporter.verify(function(error, success) {
    if (error) {
      console.log('Error verifying transporter:', error);
    } else {
      console.log('Server is ready to take our messages');
    }
  });
  
  // Contact form endpoint
app.post('/api/contact', (req, res) => {
    const { name, email, subject, message } = req.body;
  
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: 'berlinnorman24@gmail.com',
      subject: `New Contact Form Submission: ${subject}`,
      html: `
        <h2>New Message from Tree of Life Contact Form</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
        <hr>
      <p>This email was sent from the Tree of Life Children's Home contact form.</p>
    `
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending email:', error);
      return res.status(500).json({ success: false, message: 'Error sending message' });
    }
    console.log('Email sent:', info.response);
    res.json({ success: true, message: 'Message sent successfully' });
  });
});

//Start Server
server.listen(app_port, () => {
    console.log(`Server is running on port" ${app_port}`)
});

