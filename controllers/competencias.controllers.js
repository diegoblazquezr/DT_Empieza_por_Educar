/**
 * @author Antonio, Diego, Miguel y Sergio
 * @exports controllers
 * @namespace candidatos.controllers
 */

const competenciasModels = require('../models/competencias.models');
const { validationResult } = require("express-validator");


const updateCompetenciaController = async (req, res) => {
    /*const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }*/
    const modifiedCompetencia = req.body;
    if (

        "nota" in modifiedCompetencia &&
        "id_candidatura" in modifiedCompetencia &&
        "nombre_competencia" in modifiedCompetencia

    ) {
        try {
            const response = await competenciasModels.updateCompetencias(modifiedCompetencia);
            res.status(201).json({
                items_updated: response
            });
        } catch (error) {
            res.status(500).json({ error: "Error en la BBDD" });
        }
    } else {
        res.status(400).json({ error: "id_candidatura y nota son obligatorias" });
    }
};

module.exports = {
    updateCompetenciaController
}