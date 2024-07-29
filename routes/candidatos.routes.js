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

router.get('/', /*getAccessToken, decodeToken, adminRoutes,*/ candidatosControllers.readCandidatos)
router.post('/', checkCV, candidatosValidators.createCandidatoValidator, candidatosControllers.createCandidato);
router.put('/', /*getAccessToken, decodeToken, adminRoutes,*/ candidatosValidators.updateCandidatoValidator, candidatosControllers.updateCandidato);
router.delete('/',/* getAccessToken, decodeToken, adminRoutes,*/ candidatosControllers.deleteCandidato);



module.exports = router;
