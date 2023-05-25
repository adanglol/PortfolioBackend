// TO DO 

// CONFIGURE ENV IN AZURE AND GITHUB SECRETS FOR API ENDPOINT TO CONTANCT FORM



require('dotenv').config();
const express = require('express');
const sgMail = require('@sendgrid/mail');
const cors = require('cors');

const app = express();
const port = 4000; // Choose a port for your server

const apiKey = process.env.REACT_APP_SENDGRID_API_KEY; // Replace with your SendGrid API key
sgMail.setApiKey(apiKey);
// console.log(apiKey);

app.use(express.json());

// enable CORS
app.use(cors());


app.post('/send-email', (req, res) => {
  console.log('email has been sent')
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

// serve frontend build or static files
app.use(express.static('public'));

// handle all other routes

// Default route
// * means all routes
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
