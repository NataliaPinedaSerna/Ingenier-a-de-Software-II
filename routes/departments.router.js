const express = require('express');
const router = express.Router();
const departmentsJSON = require('./json/departments');

/* REQUEST HTTP API RESTFUL */
/* // TODO: Endpoint: https://localhost:4000/api/v1/departments */
router.get('/', (req, res) => {
  res.json(departmentsJSON);
});

module.exports = router;

/* EJERCICIO : Municipios por el código de departamento */
/* //TODO: Endpoint: http://localhost:4000/api/v1/departments/5 */
router.get('/:departmentId', (req, res) => {
  const { department } = req.params;
  const departments_municipities = departmentsJSON.filter(
    (department) => department['c_digo_dane_del_departamento'] == departmentId
  );
  res.json(departments_municipities);
});

/* EJERCICIO : Consultar departamentos con más de 8 caracteres */
/* //TODO: Endpoint: http://localhost:4000/api/v1/departments/name */
/* router.get('/name' , (req, res) => {
  const {departmentId}
  const departments = departmentsJSON.filter(department.length > 8);
  res.json(deparments)
}) */
