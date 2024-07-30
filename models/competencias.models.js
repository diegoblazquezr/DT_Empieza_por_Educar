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
const updateCompetencias = async (entry) => {
    const { nota, id_candidatura, nombre_competencia } = entry;
    console.log('Executing query with:', { nota, id_candidatura, nombre_competencia });
    return new Promise((resolve, reject) => {
        connection.query(competenciasQueries.updateCompetencia, [nota, id_candidatura, nombre_competencia], (error, results) => {
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

// const entryToUpdate = {
//     nota: 4,
//     id_candidatura: 1,
//     nombre_competencia: 'Dominio'
// };

// updateCompetencias(entryToUpdate).then(data => console.log(data)).catch(error => console.log(error));

module.exports = {
    createCompetencias,
    updateCompetencias
};