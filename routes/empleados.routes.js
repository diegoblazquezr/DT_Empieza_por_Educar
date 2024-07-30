const empleadosController = require('../controllers/empleados.controllers');
const { validateCreateEmpleado, validateReadEmpleadoByEmail, validateLogin } = require('../validators/empleados.validators');
const router = require('express').Router();
const { validationResult } = require('express-validator');
const getAccessToken = require('../middlewares/getAccessToken');
const decodeToken = require('../middlewares/decodeToken');
const empleadosRoutes = require('../middlewares/empleadoRoutes');
const adminRoutes = require('../middlewares/adminRoutes');

const validateRequest = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};

// GET http://localhost:3000/api/empleados?email_empleado=jonas@mail.com
router.get('/', getAccessToken, decodeToken, adminRoutes, validateReadEmpleadoByEmail, validateRequest, empleadosController.readEmpleadoByEmailController);

// POST http://localhost:3000/api/empleados
router.post('/', getAccessToken, decodeToken, adminRoutes, validateCreateEmpleado, validateRequest, empleadosController.createEmpleadoController);

//POST http://localhost:3000/api/empleados/login
router.post("/login", validateLogin, validateRequest, empleadosController.login);

//POST http://localhost:3000/api/empleados/logout
router.post("/logout", empleadosController.logout);

module.exports = router;