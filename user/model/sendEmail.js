const nodemailer = require('nodemailer');


class sendEmail {

    constructor (){
    }

    async sendmails (email, message, subject) {
        let transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: "matcha.match.info@gmail.com", // generated ethereal user
                pass: "LLL;;;lll123" // generated ethereal password
            }
        });
        console.log("fffffffffff")
        let info = transporter.sendMail({
            from: '"match" <matcha.match.info@gmail.com>', // sender address
            to: `${email}`, // list of receivers
            subject: subject, // Subject line
            html: message // html body
        }, (err, res) => {
           if(err){
               console.log(err);
           }else{
               console.log("Message sent: %s", res);
           }}
        );
    }
}

module.exports = sendEmail;