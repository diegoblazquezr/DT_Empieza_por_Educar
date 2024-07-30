const { body } = require("express-validator");

const updateCompetenciasValidator = [
    body('nota')
    .exists().withMessage("Nota es obligatoria")
    .isInt({ min: 0, max: 5 }).withMessage('Nota no puede ser menor que 0 ni mayor que 5'),
    body('id_candidatura')
    .exists().withMessage("id_candidatura es obligatoria")
    .isInt({ min: 0 }).withMessage('ID_candidatura no puede ser menor que 0')
];

module.exports = {
    updateCompetenciasValidator
};