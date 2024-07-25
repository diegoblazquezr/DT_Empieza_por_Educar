const candidaturasController = require('../controllers/candidaturas.controllers');
const router = require('express').Router();
const {
    validateCreateCandidatura,
    validateReadCandidaturas,
    validateUpdateCandidatura,
    validateDeleteCandidatura
} = require("../validators/candidaturas.validators");

// POST http://localhost:3000/api/candidaturas
router.post("/", validateCreateCandidatura, candidaturasController.createCandidaturaController);

// GET http://localhost:3000/api/candidaturas?search=mar&limit=10&offset=0
router.get("/", validateReadCandidaturas, candidaturasController.readCandidaturasController);

// PUT http://localhost:3000/api/candidatura
router.put("/", validateUpdateCandidatura, candidaturasController.updateCandidaturaController);

// DELETE http://localhost:3000/api/candidaturas?id_candidatura=1005
router.delete("/", validateDeleteCandidatura, candidaturasController.deleteCandidaturaController);

module.exports = router;