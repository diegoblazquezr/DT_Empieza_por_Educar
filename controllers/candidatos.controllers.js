/**
 * @author Antonio, Diego, Miguel y Sergio
 * @exports controllers
 * @namespace candidatos.controllers
 */

const candidatos = require('../models/candidatos.models');

const createCandidato = async (req, res) => {
    try {
        const response = await candidatos.createCandidato(req.body);
        res.status(201).json(response);
    } catch (error) {
        res.status(500).json(error);
    }
};

const readCandidatos = async (req,res) => {
    if (req.query.email_candidato) {
        try {
            const response = await candidatos.readCandidatoEmail(req.query.email_candidato);
            res.status(201).json(response);
        } catch (error) {
            res.status(500).json(error);
        }
    } else {
        const limit = parseInt(req.query.limit, 10);
        const offset = parseInt(req.query.offset, 10);
        try {
            const response = await candidatos.readAllCandidatos(limit, offset);
            res.status(201).json(response);
        } catch (error) {
            res.status(500).json(error);
        }
    }
};

const updateCandidato = async (req,res) => {
    /*const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }*/
    const candidatoUpdated = req.body;

    if (
        "nombre_candidato" in candidatoUpdated ||
            "apellidos_candidato" in candidatoUpdated ||
            "email_candidato" in candidatoUpdated ||
            "telefono_candidato" in candidatoUpdated ||
            "edad" in candidatoUpdated ||
            "carrera" in candidatoUpdated ||
            "nota_media" in candidatoUpdated ||
            "nivel_ingles" in candidatoUpdated &&
        "id_candidato" in candidatoUpdated
    ) {
        try {
            const response = await candidatos.updateCandidato(candidatoUpdated);
            res.status(201).json(response);
        } catch (error) {
            res.status(500).json(error);
        }
    } else {
        res.status(400).json({ error: "Obligatorios id_candidato y un campo a actualizar, como mínimo" });
    }

};

const deleteCandidato = async (req, res) => {
    const {id_candidato} = req.query;
    try {
        const response = await candidatos.deleteCandidato(id_candidato);
        res.status(201).json(response);
    } catch (error) {
        res.status(500).json(error);
    }
};


module.exports = {
    createCandidato,
    readCandidatos,
    updateCandidato,
    deleteCandidato
};