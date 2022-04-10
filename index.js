require('dotenv').config

const express = require('express')
const port = 3000 || process.env.port

const email = require('./email')
const sgMail = require('@sendgrid/mail')
sgMail.setApiKey(process.env.SENDGRID_API_KEY)

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;

const app = express();
app.use(express.json);
app.use(express.urlencoded({extended : false}));

// TODO: http://localhost:3000/
app.get('/',(req , res) => {
  res.json( { message : 'Success' } )
})

app.listen(port, ()=> {
  console.log(`Accede al Sitio Web dando click aquí : http://localhost:${port}`)
})

app.post( '/api/email/confirmation' , async ( req , res , next ) => {
  try {
    res.json( await email.sendOrder(req.body) )
  } catch (error) {
    next(error)
  }
})

app.use ( ( error , req , res , next ) => {
  const statusCode = error.statusCode || 500
  console.error ( error.message , error.stack )
  res.status( statusCode ).json({'message' : error.message})
  return
})

function getMessage () {
  const body = 'Mensaje enviado el día en que el brillo de la Luna apagó el Sol'
  return {
    to: emailParams.toEmail ,
    from: 'natalia.pinedas@autonoma.edu' ,
    subject: 'Confirmación de Ingeniería de Software' ,
    text: `Hola ${emailParams.customerName} , te enviamos imágenes y el número de orden ${emailParams.orderNumber}`,
    html: `
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
}

async function sendEmail () {
  try {
    await sgMail.send(getMessage())
    console.log('El correo ha sido enviado')
  } catch (error) {
    console.error('No se pudo enviar el correo')
    console.error(error)
    if (error.response) console.error(error.response.body)
  }
}

( async () => {
  console.log('Enviando correo')
  await sendEmail()
})



/* const client = require('twilio')(accountSid, authToken);

client.messages.create({
      body: 'Actividaaad Ingeniería de Software II',
      from: '+16099288391',
      to: '+573052204810'
    })
  .then(message => console.log(`Mensaje Enviado : ${message.sid}`));

// SENGRID


const msg = {
  to: 'natalia.pinedas@autonoma.edu.co', // Change to your recipient
  from: 'natalia.pinedas@autonoma.edu.co', // Change to your verified sender
  subject: 'Sending with SendGrid is Fun',
  html: `<!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
  </head>
  <body>
    <div class="row">
      <div class="col">
        <h3>Prueba sendgrid</h3>
      </div>
    </div>
    <div class="row">
      <div class="col">
        <table>
          <thead>
            <tr>
                <th>Name</th>
                <th>Item Name</th>
                <th>Item Price</th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td>Alvin</td>
              <td>Eclair</td>
              <td>$0.87</td>
            </tr>
            <tr>
              <td>Alan</td>
              <td>Jellybean</td>
              <td>$3.76</td>
            </tr>
            <tr>
              <td>Jonathan</td>
              <td>Lollipop</td>
              <td>$7.00</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

  </body>
  </html>`,
}
sgMail
  .send(msg)
  .then(() => {
    console.log('Email sent')
  })
  .catch((error) => {
    console.error(error)
  })

// Respuestas a solicitudes
app.use(express.json());

app.listen(port, ()=>console.log('Active port', port));
app.use(logErrors);
app.use(errorHandler);
app.use(boomErrorHandler); */