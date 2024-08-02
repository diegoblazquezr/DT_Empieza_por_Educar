/**
 * @author Sergio Lillo
 * @namespace Controladores Candidatos
 */

const candidatosModels = require('../models/candidatos.models');
const candidaturasModels = require('../models/candidaturas.models');
const competenciasModels = require('../models/competencias.models');
const { validationResult } = require("express-validator");

/**
 * Crea un nuevo candidato y sus respectivas candidaturas y competencias.
 *
 * @async
 * @function createCandidato
 * @memberof Controladores Candidatos
 * @param {Object} req - El objeto de solicitud.
 * @param {Object} res - El objeto de respuesta.
 * @returns {Promise<void>} Responde con el nuevo candidato, candidatura y competencias creadas, o un error.
 */
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

/**
 * Obtiene candidatos basados en los parámetros de consulta.
 *
 * @async
 * @function readCandidatos
 * @memberof Controladores Candidatos
 * @param {Object} req - El objeto de solicitud.
 * @param {Object} res - El objeto de respuesta.
 * @returns {Promise<void>} Responde con la lista de candidatos o un error.
 */
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

/**
 * Actualiza la información de un candidato.
 *
 * @async
 * @function updateCandidato
 * @memberof Controladores Candidatos
 * @param {Object} req - El objeto de solicitud.
 * @param {Object} res - El objeto de respuesta.
 * @returns {Promise<void>} Responde con el candidato actualizado o un error.
 */
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

/**
 * Elimina un candidato de la base de datos.
 *
 * @async
 * @function deleteCandidato
 * @memberof Controladores Candidatos
 * @param {Object} req - El objeto de solicitud.
 * @param {Object} res - El objeto de respuesta.
 * @returns {Promise<void>} Responde con la confirmación de eliminación o un error.
 */
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