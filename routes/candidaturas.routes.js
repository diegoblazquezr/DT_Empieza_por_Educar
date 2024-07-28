const candidaturasController = require('../controllers/candidaturas.controllers');
const router = require('express').Router();
const {
    //validateCreateCandidatura,
    validateReadCandidaturas,
    validateUpdateCandidatura,
    validateDeleteCandidatura
} = require("../validators/candidaturas.validators");
const getAccessToken = require('../middlewares/getAccessToken');
const decodeToken = require('../middlewares/decodeToken');
const empleadosRoutes = require('../middlewares/empleadoRoutes');
const adminRoutes = require('../middlewares/adminRoutes');

// POST http://localhost:3000/api/candidaturas
//router.post("/",/*getAccessToken, decodeToken, empleadosRoutes, */ validateCreateCandidatura, candidaturasController.createCandidaturaController);

// GET ONE http://localhost:3000/api/candidaturas?id_candidatura=1
// GET ALL http://localhost:3000/api/candidaturas?search=mar&id_empleado=1&status=&filter=nombre_candidato&order=asc&limit=10&offset=0
router.get("/",/*getAccessToken, decodeToken, empleadosRoutes, */ validateReadCandidaturas, candidaturasController.readCandidaturasController);

// PUT http://localhost:3000/api/candidatura
router.put("/", /*getAccessToken, decodeToken, empleadosRoutes, */validateUpdateCandidatura, candidaturasController.updateCandidaturaController);

// DELETE http://localhost:3000/api/candidaturas?id_candidatura=1005
router.delete("/", /*getAccessToken, decodeToken, empleadosRoutes,*/ validateDeleteCandidatura, candidaturasController.deleteCandidaturaController);

module.exports = router;