const { body, query } = require("express-validator");

const validateCreateCandidatura = [
    body("id_candidato")
        .exists().withMessage("El id_candidato es obligatorio")
        .isNumeric().withMessage("El id_candidato debe ser un número")
];

const validateReadCandidaturas = [
    query("search")
        .optional()
        .isString().withMessage("El campo de búsqueda solo puede contener texto"),
    query("limit")
        .exists().withMessage("Limit es obligatorio")
        .isInt({ min: 1, max: 50 }).withMessage("Limit debe ser un número entre 1 y 50"),
    query("offset")
        .exists().withMessage("Offset es obligatorio")
        .isInt({ min: 0 }).withMessage("Offset no puede ser negativo")
];

const validateUpdateCandidatura = [
    body("id_empleado")
        .optional()
        .isNumeric().withMessage("id_empleado debe ser un número"),
    body("status")
        .optional()
        .isString().withMessage("status debe contener texto")
        .isIn(['Registro', 'Centro de Evaluación', 'Solicitud', 'Descartado', 'Entrevista 1', 'Entrevista 2', 'Ofertado', 'Abandona'])
        .withMessage("status solo puede ser Registro, Centro de Evaluación, Solicitud, Descartado, Entrevista 1, Entrevista 2, Ofertado, o Abandona"),
    body("id_candidatura")
        .exists().withMessage("id_candidatura es obligatorio")
        .isNumeric().withMessage("id_candidatura debe ser un número")
];

const validateDeleteCandidatura = [
    query("id_candidatura")
        .exists().withMessage("id_candidatura es obligatorio")
        .isNumeric().withMessage("id_candidatura debe ser un número")
];

module.exports = {
    validateCreateCandidatura,
    validateReadCandidaturas,
    validateUpdateCandidatura,
    validateDeleteCandidatura
};