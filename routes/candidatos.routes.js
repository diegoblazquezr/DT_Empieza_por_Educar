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

router.get('/', candidatosValidators.readCandidatoValidator, candidatosControllers.readCandidatos)
router.post('/', checkCV, candidatosValidators.createCandidatoValidator, candidatosControllers.createCandidato);
router.put('/', candidatosValidators.updateCandidatoValidator, candidatosControllers.updateCandidato);
router.delete('/', candidatosValidators.deleteCandidatoValidator,candidatosControllers.deleteCandidato);



module.exports = router;
