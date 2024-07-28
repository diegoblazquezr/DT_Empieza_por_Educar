const { body, query } = require('express-validator');

const sanitizeAndValidateName = (fieldName) => {
    return body(fieldName)
        .trim()
        .customSanitizer(value => {
            return value.replace(/\s+/g, ' ');
        })
        .customSanitizer(value => {
            return value.split(' ')
                .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
                .join(' ');
        })
        .isLength({ min: 2, max: 70 }).withMessage(`${fieldName} debe tener entre 2 y 70 caracteres`)
        .matches(/^[A-Za-zÁÉÍÓÚáéíóúÀÈÌÒÙàèìòùÂÊÎÔÛâêîôûÄËÏÖÜäëïöüÿÇçÑñ\s'-]+$/i)
        .withMessage(`${fieldName} solo puede contener letras`);
};

const createCandidatoValidator = [
    sanitizeAndValidateName('nombre_candidato'),
    sanitizeAndValidateName('apellidos_candidato'),
    body('email_candidato')
        .isEmail().withMessage('Debe proporcionar una dirección de correo electrónico válida')
        .isLength({ min: 6, max: 100 }).withMessage('El email debe tener entre 6 y 100 caracteres'),
    body('telefono_candidato')
        .isString().withMessage('El teléfono solo puede contener texto')
        .isLength({ min: 9, max: 20 }).withMessage('El teléfono debe tener entre 9 y 20 caracteres')
        .matches(/^\+?\d{1,4}[-. ]?\d{1,4}[-. ]?\d{1,4}[-. ]?\d{1,9}$|^\+?\d{1,15}$/).withMessage('El teléfono tiene que tener un formato válido'),
    body('edad')
        .isInt({ min: 19, max: 65 }).withMessage('Edad no puede ser menor que 19 ni mayor que 65'),
    body('carrera')
        .isString().withMessage('Carrera solo puede contener texto')
        .isLength({ min: 5, max: 20 }).withMessage('Carrera debe tener entre 5 y 20 caracteres')
        .matches(/^[A-Za-zÁÉÍÓÚáéíóúÀÈÌÒÙàèìòùÂÊÎÔÛâêîôûÄËÏÖÜäëïöüÿÇçÑñ\s'-]+$/i
        ).withMessage('Carrera solo puede contener letras'),
    body('nota_media')
        .isFloat({ min: 6.0, max: 10.0 }).withMessage('Nota media no puede ser menor que 6 ni mayor que 10'),
    body('nivel_ingles')
        .isString().withMessage('Nivel de inglés solo puede contener texto')
        .isLength({ min: 2, max: 2 }).withMessage('Nivel inglés debe tener 2 caracteres')
        .matches(/^[A,B,C,a,b,c{1}][1,2{1}]$/i
        ).withMessage('Nivel inglés debe tener un formato válido de acorde al Marco Común Europeo de Referencia para las Lenguas'),
    body('sexo')
        .isString().withMessage('Sexo solo puede contener texto')
        .isLength({ min: 5, max: 20 }).withMessage('Sexo debe tener entre 5 y 20 caracteres')
        .matches(/^[A-Za-zÁÉÍÓÚáéíóúÀÈÌÒÙàèìòùÂÊÎÔÛâêîôûÄËÏÖÜäëïöüÿÇçÑñ\s'-]+$/i
        ).withMessage('Sexo solo puede contener letras'),
    body('cv')
        .isString().withMessage('CV solo puede contener texto')
        .isLength({ min: 10, max: 2048 }).withMessage('Sexo debe tener entre 5 y 20 caracteres')
        .matches(/^https:\/\/firebasestorage\.googleapis\.com\/v0\/b\/[\w-]+\.appspot\.com\/o\/curriculums%2F[^%]+\.pdf\?alt=media(&token=[\w-]+)?$/i
        ).withMessage('CV no tiene un formato válido')
];

const readCandidatoValidator = [
    query('email_candidato')
        .optional()
        .isEmail().withMessage('Debe proporcionar una dirección de correo electrónico válida')
        .isLength({ min: 6, max: 100 }).withMessage('El email debe tener entre 6 y 100 caracteres'),
    query('limit')
        .optional()
        .isInt({ min: 1, max: 50 }).withMessage('Limit debe ser un número entero entre 1 y 50'),
    query('offset')
        .optional()
        .isInt({ min: 0 }).withMessage('Offset debe ser un número entero mayor o igual a 0')
];

const updateCandidatoValidator = [
    body('id_candidato')
        .isInt({ min: 0 }).withMessage('ID candidato no puede ser menor que 0'),
    body('nombre_candidato')
        .isString().withMessage('Nombre del candidato solo puede contener texto')
        .isLength({ min: 2, max: 70 }).withMessage('Nombre del candidato debe tener entre 2 y 70 caracteres')
        .matches(/^[A-Za-zÁÉÍÓÚáéíóúÀÈÌÒÙàèìòùÂÊÎÔÛâêîôûÄËÏÖÜäëïöüÿÇçÑñ\s'-]+$/i).withMessage('Nombre del candidato solo puede contener letras'),
    body('apellidos_candidato')
        .isString().withMessage('Apellidos del candidato solo puede contener texto')
        .isLength({ min: 2, max: 70 }).withMessage('Apellidos del candidato debe tener entre 2 y 70 caracteres')
        .matches(/^[A-Za-zÁÉÍÓÚáéíóúÀÈÌÒÙàèìòùÂÊÎÔÛâêîôûÄËÏÖÜäëïöüÿÇçÑñ\s'-]+$/i
        ).withMessage('Apellidos del candidato solo puede contener letras'),
    body('email_candidato')
        .isEmail().withMessage('Debe proporcionar una dirección de correo electrónico válida')
        .isLength({ min: 6, max: 100 }).withMessage('El email debe tener entre 6 y 100 caracteres'),
    body('telefono_candidato')
        .isString().withMessage('El teléfono solo puede contener texto')
        .isLength({ min: 9, max: 20 }).withMessage('El teléfono debe tener entre 9 y 20 caracteres')
        .matches(/^\+?\d{1,4}[-. ]?\d{1,4}[-. ]?\d{1,4}[-. ]?\d{1,9}$|^\+?\d{1,15}$/),
    body('edad')
        .isInt({ min: 19, max: 65 }).withMessage('Edad no puede ser menor que 19 ni mayor que 65'),
    body('carrera')
        .isString().withMessage('Carrera solo puede contener texto')
        .isLength({ min: 5, max: 20 }).withMessage('Carrera debe tener entre 5 y 20 caracteres')
        .matches(/^[A-Za-zÁÉÍÓÚáéíóúÀÈÌÒÙàèìòùÂÊÎÔÛâêîôûÄËÏÖÜäëïöüÿÇçÑñ\s'-]+$/i
        ).withMessage('Carrera solo puede contener letras'),
    body('nota_media')
        .isFloat({ min: 6.0, max: 10.0 }).withMessage('Nota media no puede ser menor que 6 ni mayor que 10'),
    body('nivel_ingles')
        .isString().withMessage('Nivel de inglés solo puede contener texto')
        .isLength({ min: 2, max: 2 }).withMessage('Nivel inglés debe tener 2 caracteres')
        .matches(/^[A,B,C,a,b,c{1}][1,2{1}]$/i
        ).withMessage('Nivel inglés debe tener un formato válido de acorde al Marco Común Europeo de Referencia para las Lenguas')
];

const deleteCandidatoValidator = [
    query("id_candidato")
        .exists().withMessage("id_candidato es obligatorio")
        .isNumeric().withMessage("id_candidato debe ser un número")
];

module.exports = {
    createCandidatoValidator,
    readCandidatoValidator,
    updateCandidatoValidator,
    deleteCandidatoValidator
};
