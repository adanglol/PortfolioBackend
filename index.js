require('dotenv').config();
const path = require('path');
const express = require('express');
const sgMail = require('@sendgrid/mail');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 4000; // Use the dynamically assigned port from Azure or fallback to 4000

const apiKey = process.env.REACT_APP_SENDGRID_API_KEY;
sgMail.setApiKey(apiKey);

app.use(express.json());

// Enable CORS
app.use(cors());
// a sdfdsfd
app.get('/send-email', (req, res) => {
  console.log('GET request to /send-email');
  res.status(200).json({ message: 'Send email GET endpoint' });
});

app.get('/test', (req, res) => {
  console.log('GET request to /test');
  res.status(200).json({ message: 'Test GET endpoint' });
});

app.post('/send-email', (req, res) => {
  console.log('POST request to /send-email');
  const { to, subject, text } = req.body;

  const msg = {
    to,
    from: 'adraging@gmail.com', // Replace with your own email address
    subject,
    text,
  };

  sgMail
    .send(msg)
    .then(() => {
      res.status(200).json({ message: 'Email sent successfully' });
    })
    .catch((error) => {
      console.error('Error sending email:', error);
      res.status(500).json({ message: 'An error occurred while sending the email' });
    });
});

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  console.log('GET request to /');
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(port, '0.0.0.0', () => {
  console.log(`Server is running on port ${port}`);
  console.log(`http://localhost:${port}`);
  console.log('SendEmail : ',`http://localhost:${port}/send-email`);
  console.log('Test : ',`http://localhost:${port}/test`);


});
