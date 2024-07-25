const queries = require('../queries/empleados.queries')
const connection = require('../config/db_mysql');

// READ EMPLEADO
const getEmpleadoByEmail = async (email) => {
    return new Promise((resolve, reject) => {
        connection.query(queries.readEmpleadoByEmail, [email], (error, results) => {
            if (error) {
                console.log(error);
                reject(error);
            } else {
                resolve(results);
            }
        });
    });
};

// getEmpleadoByEmail('maria@example.com')
//     .then(data => console.log(data))
//     .catch(error => console.log(error))

// CREATE USER
const createEmpleado = async (user) => {
    const { nombre_empleado, apellidos_empleado, email_empleado, password, rol } = user;
    return new Promise((resolve, reject) => {
        connection.query(queries.createEmpleados, [ nombre_empleado, apellidos_empleado, email_empleado, password, rol ], (error, results) => {
            if (error) {
                console.log(error);
                reject(error);
            } else {
                resolve(results);
            }
        });
    });
};

// const newUser = {
//     'nombre_empleado': 'Juan',
//     'apellidos_empleado': 'Pérez',
//     'email_empleado': 'juan.perez@example.com',
//     'password': 'securepassword',
//     'rol': 'Recruiter'
// };

// createEmpleado(newUser)
//     .then(data => console.log(data))
//     .catch(error => console.log(error))

// TOGGLE IS_LOGGED
const setLoggedTrue = async (email) => {
    return new Promise((resolve, reject) => {
        connection.query(queries.setLoggedTrue, [email], (error, results) => {
            if (error) {
                console.log(error);
                reject(error);
            } else {
                resolve(results);
            }
        });
    });
};

// setLoggedTrue('maria@example.com')
//     .then(data => console.log(data))
//     .catch(error => console.log(error))

const setLoggedFalse = async (id) => {
    return new Promise((resolve, reject) => {
        connection.query(queries.setLoggedFalse, [id], (error, results) => {
            if (error) {
                console.log(error);
                reject(error);
            } else {
                resolve(results);
            }
        });
    });
};

// setLoggedFalse(8)
//     .then(data => console.log(data))
//     .catch(error => console.log(error))

// UPDATE LAST LOGGED DATE
const updateLastLoggedDate = async (id) => {
    return new Promise((resolve, reject) => {
        connection.query(queries.updateLastLoggedDate, [id], (error, results) => {
            if (error) {
                console.log(error);
                reject(error);
            } else {
                resolve(results);
            }
        });
    });
};

// updateLastLoggedDate(5)
//     .then(data => console.log(data))
//     .catch(error => console.log(error))

module.exports = {
    getEmpleadoByEmail,
    createEmpleado,
    setLoggedTrue,
    setLoggedFalse,
    updateLastLoggedDate
};