const nodemailer = require("nodemailer");

// create reusable transporter object using the default SMTP transport
const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    auth: {
        user: "iveth.cocha.2001@gmail.com",
        pass: "yubw docy smnu zhgu"
    }
})


// estructura del correo
module.exports.sendMailToUser = async(userMail,token)=>{
    //console.log(token);
    let info = await transporter.sendMail({
    from: "iveth.cocha.2001@gmail.com" ,
    to: userMail,
    subject: "Verifica tu cuenta de correo electrónico",
    html: `<a href="http://localhost:3000/user/confirmar/${token}">Clic para confirmar tu cuenta</a>`,
    });
    console.log("Message sent: %s", info.messageId);
}