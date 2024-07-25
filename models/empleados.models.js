const queries = require('../queries/empleados.queries')
const connection = require('../config/db_mysql');

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

const setLoggedFalse = async (email) => {
    return new Promise((resolve, reject) => {
        connection.query(queries.setLoggedFalse, [email], (error, results) => {
            if (error) {
                console.log(error);
                reject(error);
            } else {
                resolve(results);
            }
        });
    });
};

// setLoggedFalse('maria@example.com')
//     .then(data => console.log(data))
//     .catch(error => console.log(error))

// UPDATE LAST LOGGED DATE
const updateLastLoggedDate = async (email) => {
    return new Promise((resolve, reject) => {
        connection.query(queries.updateLastLoggedDate, [email], (error, results) => {
            if (error) {
                console.log(error);
                reject(error);
            } else {
                resolve(results);
            }
        });
    });
};

updateLastLoggedDate('maria@example.com')
    .then(data => console.log(data))
    .catch(error => console.log(error))

module.exports = {
    createEmpleado,
    setLoggedTrue,
    setLoggedFalse,
    updateLastLoggedDate
};