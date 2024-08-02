/**
 * @author Sergio Lillo
 * @namespace Modelos Competencias
 */

const competenciasQueries = require('../queries/competencias.queries');
const connection = require('../config/db_mysql');

/**
 * Crea un nuevo registro de competencias en la base de datos para una candidatura específica.
 *
 * @async
 * @function createCompetencias
 * @memberof Modelos Competencias
 * @param {number} id_candidatura - El ID de la candidatura.
 * @returns {Promise<Object>} Una promesa que se resuelve con un objeto indicando el éxito de la operación y el número de filas afectadas.
 * @throws {Error} Lanza un error si la consulta a la base de datos falla.
 */
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

/**
 * Actualiza un registro de competencias en la base de datos.
 *
 * @async
 * @function updateCompetencias
 * @memberof Modelos Competencias
 * @param {Object} entry - El objeto que contiene los detalles de la competencia a actualizar.
 * @param {number} entry.nota - La nueva nota de la competencia.
 * @param {number} entry.id_candidatura - El ID de la candidatura.
 * @param {string} entry.nombre_competencia - El nombre de la competencia.
 * @returns {Promise<Object>} Una promesa que se resuelve con un objeto indicando el éxito de la operación y el número de filas afectadas.
 * @throws {Error} Lanza un error si la consulta a la base de datos falla.
 */
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

module.exports = {
    createCompetencias,
    updateCompetencias
};