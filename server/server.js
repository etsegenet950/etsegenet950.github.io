require('dotenv').config();
const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');
const rateLimit = require('express-rate-limit');

const app = express();
const PORT = process.env.PORT || 3001;

// Rate limiting to prevent abuse
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});

// Configure CORS
const corsOptions = {
  origin: ['http://localhost:8080', 'http://127.0.0.1:8080', 'http://localhost:3000', 'http://127.0.0.1:3000'],
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
  optionsSuccessStatus: 204
};

// Middleware
app.use(cors(corsOptions));
app.use(express.json());
app.use(limiter);

// Configure Gmail SMTP
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER || 'fanoslehulucharityorg@gmail.com',
    pass: process.env.EMAIL_PASSWORD || 'zicb xryk dbls znmc'  // Your App Password
  }
});

console.log('Using Gmail SMTP for email delivery');

// API endpoint to handle contact form submissions
app.post('/api/contact', async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    // Basic validation
    if (!name || !email || !message) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Email options
    const adminEmail = process.env.ADMIN_EMAIL || 'fanoslehulucharityorg@gmail.com';
    const emailSubject = subject ? `New Contact: ${subject}` : 'New Contact Form Submission';
    
    const mailOptions = {
      from: `"${name}" <fanoslehulucharityorg@gmail.com>`,
      to: adminEmail,
      replyTo: email,
      subject: emailSubject,
      text: `You have a new contact form submission from your website:

Name: ${name}
Email: ${email}
${subject ? `Subject: ${subject}\n` : ''}Message:
${message}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
        ${subject ? `<p><strong>Subject:</strong> ${subject}</p>` : ''}
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, '<br>')}</p>
      `
    };

    // Send email using Gmail SMTP
    try {
      const info = await transporter.sendMail(mailOptions);
      console.log('Email sent:', info.messageId);
      console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
      
      res.status(200).json({ 
        message: 'Your message has been sent successfully!',
        testMode: false
      });
    } catch (error) {
      console.error('Error sending email:', error);
      res.status(500).json({ 
        error: 'Failed to send message',
        message: error.message
      });
    }
  } catch (error) {
    console.error('Error processing contact form:', error);
    res.status(500).json({ 
      error: 'Failed to send message',
      message: error.message,
      testMode: process.env.NODE_ENV !== 'production'
    });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
