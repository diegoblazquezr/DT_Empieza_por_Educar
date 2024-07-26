const { body, query } = require('express-validator');

const validateCreateEmpleado = [
    body('nombre_empleado')
        .notEmpty().withMessage('Nome del empleado es obligatorio')
        .isString().withMessage('Nombre del empleado solo puede contener texto')
        .matches(/^[A-Za-zÁÉÍÓÚáéíóúÀÈÌÒÙàèìòùÂÊÎÔÛâêîôûÄËÏÖÜäëïöüÿÇçÑñ\s'-]+$/i).withMessage('Nombre del empleado solo puede contener letras'),
    body('apellidos_empleado')
        .notEmpty().withMessage('Apelliso del empleado es obligatorio')
        .isString().withMessage('Apellidos del empleado solo puede contener texto')
        .matches(/^[A-Za-zÁÉÍÓÚáéíóúÀÈÌÒÙàèìòùÂÊÎÔÛâêîôûÄËÏÖÜäëïöüÿÇçÑñ\s'-]+$/i).withMessage('Apellidos del empleado solo puede contener letras'),,
    body('email_empleado')
        .notEmpty().withMessage('El email es obligatorio')
        .isEmail().withMessage('Debe proporcionar una dirección de correo electrónico válida')
        .isLength({ min: 6, max: 100 }).withMessage('El email debe tener entre 6 y 100 caracteres'),
    body('password')
        .notEmpty().withMessage('La contraseña es obligatoria')
        .isLength({ min: 8 }).withMessage('La contraseña debe tener, como mínimo, 8 caracteres')
        .matches(/[A-Z]/).withMessage('La contraseña debe tener al menos una mayúscula')
        .matches(/[a-z]/).withMessage('La contraseña debe tener al menos una minúscula')
        .matches(/[0-9]/).withMessage('La contraseña debe tener al menos un número')
        .matches(/[!@#$%^&*(),.?":{}|<>]/).withMessage('La contraseña debe tener al menos un símbolo'),
    body('rol')
        .notEmpty().withMessage('rol es obligatorio')
        .isString().withMessage('rol solo puede contener texto')
];

const validateReadEmpleadoByEmail = [
    query('email_empleado')
        .notEmpty().withMessage('El email es obligatorio')
        .isEmail().withMessage('Debe proporcionar una dirección de correo electrónico válida')
];

const validateLogin = [
    body('email')
        .notEmpty().withMessage('El email es obligatorio')
        .isEmail().withMessage('Debe proporcionar una dirección de correo electrónico válida'),
    body('password')
        .notEmpty().withMessage('La contraseña es obligatoria')
];

module.exports = {
    validateCreateEmpleado,
    validateReadEmpleadoByEmail,
    validateLogin
};
