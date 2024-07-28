/**
 * @author Antonio, Diego, Miguel y Sergio
 * @exports models
 * @namespace candidatos.models
 */
const express = require('express');
const candidatosControllers = require("../controllers/candidatos.controllers");
const candidatosValidators = require("../validators/candidatos.validators");
const checkCV = require("../middlewares/checkURLCV");
const router = express.Router();
const getAccessToken = require('../middlewares/getAccessToken');
const decodeToken = require('../middlewares/decodeToken');
const empleadosRoutes = require('../middlewares/empleadoRoutes');
const adminRoutes = require('../middlewares/adminRoutes');

// GET ONE /api/candidatos?email_candidato=obowenrn@wisc.edu
// GET ALL /api/candidatos?limit=10&offset=0
router.get('/', /*getAccessToken, decodeToken, adminRoutes,*/ candidatosControllers.readCandidatos)

// POST /api/candidatos
router.post('/', checkCV, candidatosValidators.createCandidatoValidator, candidatosControllers.createCandidato);

// PUT /api/candidatos
router.put('/', /*getAccessToken, decodeToken, adminRoutes,*/ candidatosValidators.updateCandidatoValidator, candidatosControllers.updateCandidato);

// DELETE /api/candidatos?id_candidato=1018
router.delete('/',/* getAccessToken, decodeToken, adminRoutes,*/ candidatosControllers.deleteCandidato);



module.exports = router;
