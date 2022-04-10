const express = require('express');
const departmentsRouter = require('./departments.router');

function routerApi(my_app) {
  const router = express.Router();
  /* TODO: Endpoint estático: http://localhost:4000/api/v1 */
  my_app.use('./api/v1', router);
  /* TODO: Endpoint estático: http://localhost:4000/api/v1/departments */
  router.use('/departments', departmentsRouter);
}

module.exports = routerApi;
