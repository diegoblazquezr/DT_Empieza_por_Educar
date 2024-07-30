const competenciasController = require ('../controllers/competencias.controllers');
const competenciasValidators = require("../validators/competencias.validators");

const router = require('express').Router();

const getAccessToken = require('../middlewares/getAccessToken');
const decodeToken = require('../middlewares/decodeToken');
const empleadosRoutes = require('../middlewares/empleadoRoutes');

// POST /api/competencias
router.post('/', getAccessToken, decodeToken, empleadosRoutes, competenciasValidators.updateCompetenciasValidator, competenciasController.updateCompetenciaController);


module.exports = router;
