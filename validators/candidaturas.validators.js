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
    query("id_candidato")
        .optional()
        .isNumeric().withMessage("id_candidato debe ser un número"),
    query("status")
        .optional()
        .isString().withMessage("status solo puede contener texto")
        .isIn(['Registro', 'CentroEvaluación', 'Solicitud', 'Descartado', 'Entrevista1', 'Entrevista2', 'Ofertado', 'Abandona', ''])
        .withMessage("status debe ser uno de los siguientes: Registro, Centro de Evaluación, Solicitud, Descartado, Entrevista1, Entrevista2, Ofertado, Abandona or (String vacío)"),
    query("filter")
        .optional()
        .isIn(['nombre_candidato', 'apellidos_candidato', 'fecha_registro']).withMessage("Valor de filtro no válido"),
    query("order")
        .optional()
        .isIn(['asc', 'desc']).withMessage("Order must be 'asc' or 'desc'"),
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