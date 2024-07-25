const candidaturasQueries = require('../queries/candidaturas.queries')
const connection = require('../config/db_mysql');

// CREATE
const createCandidaturaModel = async (newCandidatura) => {
    const { id_candidato } = newCandidatura;
    return new Promise((resolve, reject) => {
        connection.query(candidaturasQueries.createCandidaturaQuery, [id_candidato], (error, results) => {
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
// readCandidaturasModel(17)
//     .then(data => console.log(data))
//     .catch(error => console.log(error))

// READ ALL
const readCandidaturasModel = async (search, limit, offset) => {
    return new Promise((resolve, reject) => {
        connection.query(candidaturasQueries.readCandidaturasQuery, [`%${search}%`, limit, offset], (error, results) => {
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
// readCandidaturasModel('mar', 10, 0)
//     .then(data => console.log(data))
//     .catch(error => console.log(error))

// UPDATE
const updateCandidaturaModel = async (candidatura) => {
    const { id_empleado, status, id_candidatura  } = candidatura
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
    readCandidaturasModel,
    updateCandidaturaModel,
    deleteCandidaturaModel
}

module.exports = candidaturass;