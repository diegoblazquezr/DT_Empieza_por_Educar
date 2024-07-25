const empleadosController = require('../controllers/empleados.controllers');
const { validateCreateEmpleado, validateReadEmpleadoByEmail, validateLogin } = require('../validators/empleados.validators');
const router = require('express').Router();
const { validationResult } = require('express-validator');

const validateRequest = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};

// GET http://localhost:3000/api/empleados?email_empleado=jonas@mail.com
router.get('/', validateReadEmpleadoByEmail, validateRequest, empleadosController.readEmpleadoByEmailController);

// POST http://localhost:3000/api/empleados
router.post('/', validateCreateEmpleado, validateRequest, empleadosController.createEmpleadoController);

router.post("/login", validateLogin, validateRequest, empleadosController.login);
router.post("/logout", empleadosController.logout);

module.exports = router;