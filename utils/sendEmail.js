const nodemailer = require("nodemailer");

const sendEmail = async (subject, message, send_to, sent_from, reply_to) => {
    const transporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: "465",
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
        tls: {
            rejectUnauthorized: false,
        }
    })

    const options = {
        from: sent_from,
        to: to.join(", "), // Join multiple email addresses with a comma
        replyTo: reply_to,
        subject: subject,
        html: message
    }

    transporter.sendMail(options, function(err, info) {
        if (err) {
            console.log(err)
        } else {
            console.log(info)
        }
    } )
};

module.exports = sendEmail;