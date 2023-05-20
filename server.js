const express = require("express");
const app = express();

const nodemailer = require("nodemailer");

const bodyParser = require("body-parser") 
const cors = require("cors")

// const sendEmail = require("./utils/sendEmail")
require('dotenv').config();
const password = process.env.PASSWORD;

//Middleware
app.use(express.json());
app.use(bodyParser.json());
app.use(cors());
app.use(express.static('utils'));

app.get("/", (req, res) => {
  res.sendFile(__dirname + '/utils/contactForm.html');
});

app.post("/", (req, res) => {

      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'koshy.jeffrey57@gmail.com',
          pass: password,
          
        }
        
      })

      const mailoptions = {
        from: req.body.email,
        to: 'koshy.jeffrey57@gmail.com',
        subject: `Message from ${req.body.email}: ${req.body.subject}`,
        text: req.body.message 
      }

      transporter.sendMail(mailoptions, (error, info) => {
        if (error) {
          console.log(error);
          res.send('error');
        } else {
          console.log('Email sent: ' + info.response);
          res.send('succsess')
        }
      })
})


// app.post("/api/sendemail", async (req, res) => {
//     const { email } = req.body;
//     try {
//       const send_to = email;
//       const sent_from = process.env.EMAIL_USER;
//       const reply_to = email;
//       const subject = "Thank You Message";
//       const message = 
//         `
//           <h3> Hi, Thank you for your message </h3>
//           <p>We are happy to hear from you and will get back to you as soon as possible.</p>
//         `;
//       await sendEmail(subject, message, send_to, sent_from, reply_to);
//       res.status(200).json({ success: true, message: "Email Sent" });
//     } catch (error) {
//       res.status(500).json(error.message);
//     }
// } )



const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}...`);
})