const candidaturasModels = require('../models/candidaturas.models');
const { validationResult } = require("express-validator");

/*const createCandidaturaController = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const newCandidatura = req.body;
    if (
        "id_candidato" in newCandidatura
    ) {
        try {
            const response = await candidaturasModels.createCandidaturaModel({ id_candidato: newCandidatura.id_candidato });
            res.status(201).json({
                items_created: response
            });
        } catch (error) {
            res.status(500).json({ error: "Error en la BBDD" });
        }
    } else {
        res.status(400).json({ error: "Faltan campos en la entrada" });
    }
}*/

// Prueba Postman
// POST http://localhost:3000/api/candidaturas
// {
//     "id_candidato": 17 
// }

const readCandidaturasController = async (req, res) => {
    if (req.query.limit > 50) {
        return res.status(400).json("Limit can not surpass 50");
    }
    let candidaturas;
    console.log(req.query);
    try {
        if (req.query.id_candidatura) {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
            candidaturas = await candidaturasModels.readCandidaturaByIdModel(req.query.id_candidatura);
            res.status(200).json(candidaturas);
        } else if ((req.query.search || req.query.search == "") && (req.query.id_empleado || req.query.id_empleado == "") && (req.query.status || req.query.status == "") && req.query.filter && req.query.order && req.query.limit && req.query.offset) {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
            candidaturas = await candidaturasModels.readCandidaturasModel(req.query.search, req.query.id_empleado, req.query.status, req.query.filter, req.query.order, parseInt(req.query.limit), parseInt(req.query.offset));
            res.status(200).json(candidaturas);
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
// Prueba Postman
// GET ONE http://localhost:3000/api/candidaturas?id_candidatura=1
// GET ALL http://localhost:3000/api/candidaturas?search=mar&id_empleado=1&status=&filter=nombre_candidato&order=asc&limit=10&offset=0

const updateCandidaturaController = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const modifiedCandidatura = req.body;
    if (
        (
            "id_empleado" in modifiedCandidatura ||
            "status" in modifiedCandidatura &&
            "id_candidatura" in modifiedCandidatura
        )
    ) {
        try {
            const response = await candidaturasModels.updateCandidaturaModel(modifiedCandidatura);
            res.status(201).json({
                items_updated: response
            });
        } catch (error) {
            res.status(500).json({ error: "Error en la BBDD" });
        }
    } else {
        res.status(400).json({ error: "old_candidaturaName obligatorio y un campo de update mínimo" });
    }
}
// Prueba Postman
// PUT http://localhost:3000/api/candidaturas
// {
//     "id_empleado": 6,
//     "status": "Registro",
//     "id_candidatura": 1005
// }

const deleteCandidaturaController = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    let candidatura;
    try {
        candidatura = await candidaturasModels.deleteCandidaturaModel(req.query.id_candidatura);
        res.status(200).json(candidatura);
    } catch (error) {
        res.status(500).json({ error: 'Error en la BBDD' });
    }
}
// Prueba Postman
// DELETE http://localhost:3000/api/candidaturas?id_candidatura=1005

module.exports = {
    //createCandidaturaController,
    readCandidaturasController,
    updateCandidaturaController,
    deleteCandidaturaController,
}