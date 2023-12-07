const nodemailer = require("nodemailer");
const transporter = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    port:465,
    secure: true,
    auth:{
        user:'reservesystemlab@gmail.com',
        pass:'ebap myxf nkgt xnhg'
    },
});

module.exports = transporter;