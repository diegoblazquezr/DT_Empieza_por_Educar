/**
 * @author Antonio, Diego, Miguel y Sergio
 * @exports controllers
 * @namespace candidatos.controllers
 */

const candidatosModels = require('../models/candidatos.models');
const candidaturasModels = require('../models/candidaturas.models');
const competenciasModels = require('../models/competencias.models');
const { validationResult } = require("express-validator");


const createCandidato = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const response = await candidatosModels.createCandidato(req.body);

        if (response) {
            const id_candidato = response.insertId;
            //console.log(id_candidato);
            try {
                const responseCandidatura = await candidaturasModels.createCandidaturaModel(id_candidato);
                //console.log(responseCandidatura);

                if (responseCandidatura) {
                    const id_candidatura = responseCandidatura.insertId;
                    //console.log(id_candidatura);
                    try {
                        const responseCompetencias = await competenciasModels.createCompetencias(id_candidatura);
                        res.status(201).json({
                            candidato: response,
                            candidatura: responseCandidatura,
                            competencias: responseCompetencias
                        });
                    } catch (error) {
                        res.status(500).json({ error: "Error al crear las competencias" });

                    }
                } else {
                    res.status(500).json({ error: "Error al crear las candidaturas" });
                }
            } catch (error) {
                res.status(500).json(error);
            }
        } else {
            res.status(500).json({ error: "Error al crear el candidato" });
        }

    } catch (error) {
        res.status(500).json(error);
    }
};

const readCandidatos = async (req, res) => {
    if (req.query.email_candidato) {
        try {
            const response = await candidatosModels.readCandidatoEmail(req.query.email_candidato);
            res.status(201).json(response);
        } catch (error) {
            res.status(500).json(error);
        }
    } else {
        const limit = parseInt(req.query.limit, 10);
        const offset = parseInt(req.query.offset, 10);
        try {
            const response = await candidatosModels.readAllCandidatos(limit, offset);
            res.status(201).json(response);
        } catch (error) {
            res.status(500).json(error);
        }
    }
};

const updateCandidato = async (req, res) => {
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
        "nivel_ingles" in candidatoUpdated ||
        "sexo" in candidatoUpdated ||
        "cv" in candidatoUpdated &&
        "id_candidato" in candidatoUpdated
    ) {
        try {
            const response = await candidatosModels.updateCandidato(candidatoUpdated);
            res.status(201).json(response);
        } catch (error) {
            res.status(500).json(error);
        }
    } else {
        res.status(400).json({ error: "Obligatorios id_candidato y un campo a actualizar, como mínimo" });
    }

};

const deleteCandidato = async (req, res) => {
    const { id_candidato } = req.query;
    try {
        const response = await candidatosModels.deleteCandidato(id_candidato);
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