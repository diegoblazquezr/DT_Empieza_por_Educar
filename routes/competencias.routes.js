const competenciasController = require ('../controllers/competencias.controllers');
const competenciasValidators = require("../validators/competencias.validators");

const router = require('express').Router();

// POST /api/competencias
router.post('/', competenciasValidators.updateCompetenciasValidator, competenciasController.updateCompetenciaController);


module.exports = router;
