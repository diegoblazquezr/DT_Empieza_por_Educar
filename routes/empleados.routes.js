const empleadosController = require('../controllers/empleados.controllers');
const router = require('express').Router();

// GET http://localhost:3000/api/empleados?email_empleado=jonas@mail.com
router.get('/', empleadosController.readEmpleadoByEmailController);

// POST http://localhost:3000/api/empleados
router.post('/', empleadosController.createEmpleadoController);

router.post("/login", empleadosController.login);
router.post("/logout", empleadosController.logout);

module.exports = router;