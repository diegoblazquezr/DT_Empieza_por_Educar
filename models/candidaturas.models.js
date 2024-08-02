/**
 * @author Diego Blázquez
 * @namespace Modelos Candidaturas
 */


const candidaturasQueries = require('../queries/candidaturas.queries')
const connection = require('../config/db_mysql');

/**
 * Crea un nuevo registro de candidatura en la base de datos.
 *
 * @async
 * @function createCandidaturaModel
 * @memberof Modelos Candidaturas
 * @param {number} id_candidato - El ID del candidato.
 * @returns {Promise<Object>} Una promesa que se resuelve con un objeto indicando el éxito de la operación y el ID insertado.
 * @throws {Error} Lanza un error si la consulta a la base de datos falla.
 */
const createCandidaturaModel = async (id_candidato) => {
    return new Promise((resolve, reject) => {
        connection.query(candidaturasQueries.createCandidaturaQuery, [id_candidato], (error, results) => {
            if (error) {
                console.log(error);
                reject({
                    success: false,
                    message: 'Error al crear la candidatura',
                    error: error
                });
            } else {
                resolve({
                    success: true,
                    message: 'Candidatura creada exitosamente',
                    insertId: results.insertId
                });
            }
        });
    });
}

/**
 * Obtiene un registro de candidatura por su ID.
 *
 * @async
 * @function readCandidaturaByIdModel
 * @memberof Modelos Candidaturas
 * @param {number} id_candidatura - El ID de la candidatura.
 * @returns {Promise<Object>} Una promesa que se resuelve con el resultado de la consulta a la base de datos.
 * @throws {Error} Lanza un error si la consulta a la base de datos falla.
 */
const readCandidaturaByIdModel = async (id_candidatura) => {
    return new Promise((resolve, reject) => {
        connection.query(candidaturasQueries.readCandidaturaByIdQuery, [id_candidatura], (error, results) => {
            if (error) {
                console.log(error);
                reject(error);
            } else {
                resolve(results);
            }
        });
    });
}

/**
 * Obtiene todos los registros de candidaturas que coincidan con los filtros de búsqueda.
 *
 * @async
 * @function readCandidaturasModel
 * @memberof Modelos Candidaturas
 * @param {string} search - El término de búsqueda.
 * @param {number} id_empleado - El ID del empleado.
 * @param {string} status - El estado de la candidatura.
 * @param {string} filter - El campo por el cual filtrar.
 * @param {string} order - El orden de los resultados.
 * @param {number} limit - El número máximo de resultados.
 * @param {number} offset - El desplazamiento para la paginación.
 * @returns {Promise<Object>} Una promesa que se resuelve con un objeto que contiene los resultados de la consulta y el total de registros.
 * @throws {Error} Lanza un error si la consulta a la base de datos falla.
 */
const readCandidaturasModel = async (search, id_empleado, status, filter, order, limit, offset) => {
    return new Promise((resolve, reject) => {
        connection.query(
            candidaturasQueries.readCandidaturasQuery,
            [`%${search}%`, `%${search}%`, id_empleado, id_empleado, status, status, filter, order, filter, order, filter, order, filter, order, filter, order, filter, order, limit, offset],
            (error, results) => {
                if (error) {
                    console.log(error);
                    reject(error);
                } else {
                    connection.query(
                        candidaturasQueries.readCandidaturasTotalCountQuery,
                        [`%${search}%`, `%${search}%`, id_empleado, id_empleado, status, status],
                        (countError, countResults) => {
                            if (countError) {
                                console.log(countError);
                                reject(countError);
                            } else {
                                resolve({
                                    items: results,
                                    totalCount: countResults[0].total
                                });
                            }
                        }
                    );
                }
            }
        );
    });
};

/**
 * Actualiza un registro de candidatura en la base de datos.
 *
 * @async
 * @function updateCandidaturaModel
 * @memberof Modelos Candidaturas
 * @param {Object} candidatura - El objeto que contiene los detalles de la candidatura a actualizar.
 * @param {number} candidatura.id_empleado - El ID del empleado.
 * @param {string} candidatura.status - El nuevo estado de la candidatura.
 * @param {number} candidatura.id_candidatura - El ID de la candidatura.
 * @returns {Promise<Object>} Una promesa que se resuelve con el resultado de la consulta a la base de datos.
 * @throws {Error} Lanza un error si la consulta a la base de datos falla.
 */
const updateCandidaturaModel = async (candidatura) => {
    const { id_empleado, status, id_candidatura } = candidatura
    return new Promise((resolve, reject) => {
        connection.query(candidaturasQueries.updateCandidaturaQuery, [id_empleado, status, id_candidatura], (error, results) => {
            if (error) {
                console.log(error);
                reject(error);
            } else {
                resolve(results);
            }
        });
    });
}

/**
 * Elimina un registro de candidatura de la base de datos.
 *
 * @async
 * @function deleteCandidaturaModel
 * @memberof Modelos Candidaturas
 * @param {number} id_candidatura - El ID de la candidatura.
 * @returns {Promise<Object>} Una promesa que se resuelve con el resultado de la consulta a la base de datos.
 * @throws {Error} Lanza un error si la consulta a la base de datos falla.
 */
const deleteCandidaturaModel = async (id_candidatura) => {
    return new Promise((resolve, reject) => {
        connection.query(candidaturasQueries.deleteCandidaturaQuery, [id_candidatura], (error, results) => {
            if (error) {
                console.log(error);
                reject(error);
            } else {
                resolve(results);
            }
        });
    });
}

const candidaturass = {
    createCandidaturaModel,
    readCandidaturaByIdModel,
    readCandidaturasModel,
    updateCandidaturaModel,
    deleteCandidaturaModel
}

module.exports = candidaturass;