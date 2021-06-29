const session = require('express-session');
const mail = require('nodemailer');

exports.confirmationMail = function(userMail,title,content) {
    const transporter = mail.createTransport({
        service: 'gmail',
        auth: {
            user: 'c13.thptpn@gmail.com', 
            pass: 'fortythreec13'
        }
    });
    
    const mailOptions = {
        from: 'c13.thptpn@gmail.com',
        to: userMail,
        subject: title,
        html: content
    }

    transporter.sendMail(mailOptions,function(err,info){
        if (err) console.log(err);
        else console.log("Email sent: " + info.response);
    })
}
