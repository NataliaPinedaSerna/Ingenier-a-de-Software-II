const mongoose = require('mongoose');
const express = require('express');
const app = express()
const routerApi = require("./src/routes");
const { logErrors, errorHandler ,boomErrorHandler} = require('./src/handlers/errors.hadler');


require('dotenv').config();
const port = process.env.PORT;

mongoose
    .connect(process.env.MONGODB_STRING_CONNECTION)
    .then(() => console.log("Success Connection With Mongo"))
    .catch((error) => console.error(error));

/* Respuestas a solicitudes */
app.use(express.json());

app.listen(port, ()=>console.log('Active port', port));
app.use(logErrors);
app.use(errorHandler);
app.use(boomErrorHandler);
/* Permitir hacer el llamado de los request */
routerApi(app);