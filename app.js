var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var nodeMailer = require("nodemailer");
var dotenv = require("dotenv");

dotenv.config();

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json())

app.set("view engine", "ejs");
app.use(express.static("public"));


app.get("/", function (req, res) {
    res.render("index")
});

app.post("/send-email", function (req, res) {

    let transporter = nodeMailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            user: process.env.myEmail,
            pass: process.env.myPass,
        }
    });
    let mailOptions = {
        from: req.body.email, // sender address
        to: process.env.userEmail, // list of receivers
        subject: 'Important mail from my Portfolio', // Subject line
        number: req.body.phone, //Shows the number
        html: req.body.message // html body
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message %s sent: %s', info.messageId, info.response);
        res.render('index');
    })
})


app.listen(process.env.PORT, function () {
    console.log(`Your port is ${process.env.PORT}`);
})