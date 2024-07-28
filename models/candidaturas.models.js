const candidaturasQueries = require('../queries/candidaturas.queries')
const connection = require('../config/db_mysql');

// CREATE
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
                    affectedRows: results.affectedRows
                });
            }
        });
    });
}
// Pruebas MySQL Workbench
// readCandidaturasModel(17)
//     .then(data => console.log(data))
//     .catch(error => console.log(error))

// READ ONE
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
// Pruebas PostgreSQL
// readCandidaturaByIdModel(1)
//     .then(data=>console.log(data))
//     .catch(error => console.log(error))

// READ ALL
const readCandidaturasModel = async (search, id_empleado, status, filter, order, limit, offset) => {
    return new Promise((resolve, reject) => {
        connection.query(candidaturasQueries.readCandidaturasQuery, [`%${search}%`, `%${search}%`, id_empleado, id_empleado, status, status, filter, order, filter, order, filter, order, filter, order, filter, order, filter, order, limit, offset], (error, results) => {
            if (error) {
                console.log(error);
                reject(error);
            } else {
                resolve(results);
            }
        });
    });
}
// Pruebas MySQL Workbench
// readCandidaturasModel('mar', '', 'Registro', 'nombre_candidato', 'desc', 10, 0)
//     .then(data => console.log(data))
//     .catch(error => console.log(error))

// UPDATE
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
// Pruebas MySQL Workbench
// const updatedCandidatura = {
//     id_empleado: 6,
//     status: "Registro",
//     id_candidatura: 1005
// }
// updateCandidaturaModel(updatedCandidatura)
//     .then(data => console.log(data))
//     .catch(error => console.log(error))

// DELETE
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
// Pruebas MySQL Workbench
// deleteCandidaturaModel(1005)
//     .then(data => console.log(data))
//     .catch(error => console.log(error))

const candidaturass = {
    createCandidaturaModel,
    readCandidaturaByIdModel,
    readCandidaturasModel,
    updateCandidaturaModel,
    deleteCandidaturaModel
}

module.exports = candidaturass;