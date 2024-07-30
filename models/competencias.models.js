const competenciasQueries = require('../queries/competencias.queries');
const connection = require('../config/db_mysql');

// CREATE
const createCompetencias = async (id_candidatura) => {
    return new Promise((resolve, reject) => {
        const values = Array(8).fill(id_candidatura);

        connection.query(competenciasQueries.createCompetencias, values, (error, results) => {
            if (error) {
                console.log(error);
                reject({
                    success: false,
                    message: 'Error al crear las competencias',
                    error: error
                });
            } else {
                resolve({
                    success: true,
                    message: 'Competencias creadas exitosamente',
                    affectedRows: results.affectedRows
                });
            }
        });
    });
};

// UPDATE
const updateCompetencias = async (id_candidatura, nota) => {
    return new Promise((resolve, reject) => {
        connection.query(competenciasQueries.updateCompetencia, [nota, id_candidatura], (error, results) => {
            if (error) {
                console.log(error);
                reject({
                    success: false,
                    message: 'Error al editar la competencia',
                    error: error
                });
            } else {
                resolve({
                    success: true,
                    message: 'Competencia editada exitosamente',
                    affectedRows: results.affectedRows
                });
            }
        });
    });
};

module.exports = {
    createCompetencias,
    updateCompetencias
};