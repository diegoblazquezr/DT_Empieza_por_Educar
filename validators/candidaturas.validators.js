const { body, query } = require("express-validator");

const validateCreateCandidatura = [
    body("id_candidato")
        .exists().withMessage("id_candidato of candidatura is required")
        .isNumeric().withMessage("id_candidato should be a number")
];

const validateReadCandidaturas = [
    query("search")
        .optional()
        .isString().withMessage("Search query should be a string"),
    query("id_candidato")
        .optional()
        .isNumeric().withMessage("id_candidato should be a number"),
    query("status")
        .optional()
        .isString().withMessage("status should be a string")
        .isIn(['Registro', 'CentroEvaluación', 'Solicitud', 'Descartado', 'Entrevista1', 'Entrevista2', 'Ofertado', 'Abandona', ''])
        .withMessage("status should be one of: Registro, Centro de Evaluación, Solicitud, Descartado, Entrevista1, Entrevista2, Ofertado, Abandona or (Empty String)"),
    query("filter")
        .optional()
        .isIn(['nombre_candidato', 'apellidos_candidato', 'fecha_registro']).withMessage("Invalid filter value"),
    query("order")
        .optional()
        .isIn(['asc', 'desc']).withMessage("Order must be 'asc' or 'desc'"),
    query("limit")
        .exists().withMessage("Limit is required")
        .isInt({ min: 1, max: 50 }).withMessage("Limit should be an integer between 1 and 50"),
    query("offset")
        .exists().withMessage("Offset is required")
        .isInt({ min: 0 }).withMessage("Offset should be a non-negative integer")
];

const validateUpdateCandidatura = [
    body("id_empleado")
        .optional()
        .isNumeric().withMessage("id_empleado should be a number"),
    body("status")
        .optional()
        .isString().withMessage("status should be a string")
        .isIn(['Registro', 'CentroEvaluación', 'Solicitud', 'Descartado', 'Entrevista1', 'Entrevista2', 'Ofertado', 'Abandona'])
        .withMessage("status should be one of: Registro, Centro de Evaluación, Solicitud, Descartado, Entrevista 1, Entrevista 2, Ofertado, or Abandona"),
    body("id_candidatura")
        .exists().withMessage("id_candidatura is required")
        .isNumeric().withMessage("id_candidatura should be a number")
];

const validateDeleteCandidatura = [
    query("id_candidatura")
        .exists().withMessage("id_candidatura is required ")
        .isNumeric().withMessage("id_candidatura should be a number")
];

module.exports = {
    validateCreateCandidatura,
    validateReadCandidaturas,
    validateUpdateCandidatura,
    validateDeleteCandidatura
};