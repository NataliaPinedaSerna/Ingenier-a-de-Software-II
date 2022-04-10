const sgMail = require('@sendgrid/mail')
sgMail.setApiKey(process.env.SENDGRID_API_KEY)

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
      <label for=""> Paisaje </label>
      <img src="https://iiif.wellcomecollection.org/image/V0042674/full/880%2C/0/default.jpg">
    </div>
  </body>
  </html>
  `
}

function getMessage (emailParams) = {
  return {
    to: emailParams.toEmail ,
    from: 'natalia.pinedas@autonoma.edu' ,
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

sgMail
  .send(msg)
  .then(() => {
    console.log('Email sent')
  })
  .catch((error) => {
    console.error(error)
  })