const sgMail = require('@sendgrid/mail')
/* sgMail.setApiKey(process.env.SENDGRID_API_KEY) */
sgMail.setApiKey('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')

function sendEmailConfirmationHTML ( customerName , orderNumber ) {
  return `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
  </head>
  <body>
    <img class="container section">
      <label> Paisaje </label>
      <br>
      <img src="https://iiif.wellcomecollection.org/image/V0042674/full/880%2C/0/default.jpg">
    </div>
  </body>
  </html>
  `
}

function getMessage (emailParams) {
  return {
    to: emailParams.toEmail ,
    from: 'natalia.pinedas@autonoma.edu.co' ,
    subject: 'Confirmación de Ingeniería de Software' ,
    text: `Hola ${emailParams.customerName} , te enviamos imágenes y el número de orden ${emailParams.orderNumber}`,
    html: sendEmailConfirmationHTML(emailParams.customerName , emailParams.orderNumber)
  }
}

async function sendOrder (emailParams) {
  try {
    await sgMail.send(getMessage(emailParams))
    return {message: 'Confirmación Enviada'}
  } catch (error) {
    const message = 'No se pudo enviar. Valide errores'
    console.error(message)
    console.error(error)
    if (error.response) console.error(error.response.body)
    return {message}
  }
}

module.exports = { sendOrder }


/* require('dotenv').config
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);

client.messages.create({
      body: 'Actividaaad Ingeniería de Software II',
      from: '+16099288391',
      to: '+573052204810'
    })
  .then(message => console.log(`Mensaje Enviado : ${message.sid}`)); */