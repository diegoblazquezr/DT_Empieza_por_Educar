const { body, query } = require('express-validator');

const validateCreateEmpleado = [
    body('nombre_empleado')
        .notEmpty().withMessage('nombre_empleado is required')
        .isString().withMessage('nombre_empleado must be a string'),
    body('apellidos_empleado')
        .notEmpty().withMessage('apellidos_empleado is required')
        .isString().withMessage('apellidos_empleado must be a string'),
    body('email_empleado')
        .notEmpty().withMessage('email_empleado is required')
        .isEmail().withMessage('email_empleado must be a valid email'),
    body('password')
        .notEmpty().withMessage('password is required')
        .isLength({ min: 6 }).withMessage('password must be at least 6 characters long'),
    body('rol')
        .notEmpty().withMessage('rol is required')
        .isString().withMessage('rol must be a string')
];

const validateReadEmpleadoByEmail = [
    query('email')
        .notEmpty().withMessage('email is required')
        .isEmail().withMessage('email must be a valid email')
];

const validateLogin = [
    body('email')
        .notEmpty().withMessage('email is required')
        .isEmail().withMessage('email must be a valid email'),
    body('password')
        .notEmpty().withMessage('password is required')
];

module.exports = {
    validateCreateEmpleado,
    validateReadEmpleadoByEmail,
    validateLogin
};
