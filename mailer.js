const nodemailer = require("nodemailer");
const { config } = require("./config/config");

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  secure: true,
  port: 465,
  auth: {
      user: config.adminEmail,
      pass: config.temporaryEmailPsw
  }
});

// async..await is not allowed in global scope, must use a wrapper
async function main() {
  // send mail with defined transport object
  const info = await transporter.sendMail({
    from: config.adminEmail, // sender address
    to: "savannahchirinos2@gmail.com", // list of receivers
    subject: "Hola Pepsi-cola", // Subject line
    text: "Pero que amargura la tuya", // plain text body
    html: "Una lista de las cosas que te amargan: <ol><li>El hambre</li><li>El sueño</li></ol>", // html body
  });

  console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

}

main().catch(console.error);
