const queries = require('../queries/candidatos.queries')
const connection = require('../config/db_mysql');

const createCandidato = async (entry) => {
    const { nombre_candidato, apellidos_candidato, email_candidato, telefono_candidato, edad, carrera, nota_media, nivel_ingles, sexo, cv } = entry;
    return new Promise((resolve, reject) => {
        connection.query(queries.createCandidato, [nombre_candidato, apellidos_candidato, email_candidato, telefono_candidato, edad, carrera, nota_media, nivel_ingles, sexo, cv], (error, results) => {
            if (error) {
                console.log(error);
                reject({
                    success: false,
                    message: 'Error al crear el candidato',
                    error: error
                });
            } else {
                resolve({
                    success: true,
                    message: 'Candidato creado exitosamente',
                    insertId: results.insertId
                });
            }
        });
    });
};

const readCandidatoEmail = async (email_candidato) => {
    return new Promise((resolve, reject) => {
        connection.query(queries.readCandidatoEmail, [email_candidato], (error, results) => {
            if (error) {
                console.log(error);
                reject({
                    success: false,
                    message: 'Error al obtener el candidato',
                    error: error
                });
            } else {
                resolve(results);
            }
        });
    });
};

const readAllCandidatos = async (limit, offset) => {
    return new Promise((resolve, reject) => {
        connection.query(queries.readAllCandidatos, [limit, offset], (error, results) => {
            if (error) {
                console.log(error);
                reject({
                    success: false,
                    message: 'Error al acceder a los candidatos',
                    error: error
                });
            } else {
                resolve(results);
            }
        });
    });
};

const updateCandidato = async (entry) => {
    const { nombre_candidato, apellidos_candidato, email_candidato, telefono_candidato, edad, carrera, nota_media, nivel_ingles, sexo, cv, id_candidato } = entry;
    return new Promise((resolve, reject) => {
        connection.query(queries.updateCandidato, [nombre_candidato, apellidos_candidato, email_candidato, telefono_candidato, edad, carrera, nota_media, nivel_ingles,sexo, cv, id_candidato], (error, results) => {
            if (error) {
                console.log(error);
                reject({
                    success: false,
                    message: 'Error al editar el candidato',
                    error: error
                });
            } else {
                resolve({
                    success: true,
                    message: 'Candidato editado con éxito',
                    changedRows: results.changedRows
                });
            }
        });
    });
};


const deleteCandidato = async (id_candidato) => {
    return new Promise((resolve, reject) => {
        connection.query(queries.deleteCandidato, [id_candidato], (error, results) => {
            if (error) {
                console.log(error);
                reject({
                    success: false,
                    message: 'Error al eliminar el candidato',
                    error: error
                });
            } else {
                resolve({
                    success: true,
                    message: 'Candidato eliminado con éxito',
                });
            }
        });
    });
};



const candidatos = {
    createCandidato,
    readCandidatoEmail,
    readAllCandidatos,
    updateCandidato,
    deleteCandidato
}

module.exports = candidatos;

//PRUEBAS

/*const candidato = {
    nombre_candidato: 'Sonia',
    apellidos_candidato: 'Márquez',
    email_candidato: 'sonia@madrid.com',
    telefono_candidato: '690674721',
    edad: 33,
    carrera: 'Química',
    nota_media: 6.1,
    nivel_ingles: 'B2'
}

// Pruebas MySQL
createCandidato(candidato)
    .then(data=>console.log(data))
    .catch(error => console.log(error))
    */
