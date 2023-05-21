const express = require("express");
const app = express();
require('dotenv').config();

const bodyParser = require("body-parser") 
const cors = require("cors")
const nodemailer = require("nodemailer");


// const sendEmail = require("./utils/sendEmail")
const password = process.env.PASSWORD;

//Middleware
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json());

app.use(cors());

app.post("/send_mail", cors(), async (req, res)) => {
  let {test} = req.bodyParser
  const transport = nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    port: process.env.MAIL_PORT,
    auth: {
      user: process.env.MAIL_USER,
      password: process.env.MAIL_PASS
    }
  })
}



const PORT = process.env.PORT || 5000;

app.listen(
(process.env.PORT || 5000,
   () => {
  console.log("Server running on port 5000");
})
)