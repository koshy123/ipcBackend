const dotenv = require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser") 
const cors = require("cors")

const sendEmail = require("./utils/sendEmail")

const app = express();

app.use(express.json());
app.use(bodyParser.json());

const corsOptions ={
  origin:'http://localhost:3000', 
  credentials:true,            //access-control-allow-credentials:true
  optionSuccessStatus:200
}
app.use(cors(corsOptions));

app.get("/", (req, res) => {
  res.send("home page");
});

app.post("/api/sendemail", async (req, res) => {
    const { email } = req.body;
    try {
      const send_to = email;
      const sent_from = process.env.EMAIL_USER;
      const reply_to = email;
      const subject = "Thank You Message";
      const message = 
        `
          <h3> Hi, Thank you for your message </h3>
          <p>We are happy to hear from you and will get back to you as soon as possible.</p>
        `;
      await sendEmail(subject, message, send_to, sent_from, reply_to);
      res.status(200).json({ success: true, message: "Email Sent" });
    } catch (error) {
      res.status(500).json(error.message);
    }
} )



const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}...`);
})