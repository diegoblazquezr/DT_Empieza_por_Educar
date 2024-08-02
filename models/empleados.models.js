/**
 * @author Miguel Pardal
 * @namespace Modelos Empleados
 */

const queries = require('../queries/empleados.queries')
const connection = require('../config/db_mysql');

/**
 * Obtiene un registro de empleado por su correo electrónico.
 *
 * @async
 * @function getEmpleadoByEmail
 * @memberof Modelos Empleados
 * @param {string} email - La dirección de correo electrónico del empleado.
 * @returns {Promise<Object>} Una promesa que se resuelve con el resultado de la consulta a la base de datos.
 * @throws {Error} Lanza un error si la consulta a la base de datos falla.
 */
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

/**
 * Crea un nuevo registro de empleado en la base de datos.
 *
 * @async
 * @function createEmpleado
 * @memberof Modelos Empleados
 * @param {Object} user - El objeto usuario que contiene los detalles del empleado.
 * @param {string} user.nombre_empleado - El nombre del empleado.
 * @param {string} user.apellidos_empleado - Los apellidos del empleado.
 * @param {string} user.email_empleado - La dirección de correo electrónico del empleado.
 * @param {string} user.password - La contraseña del empleado.
 * @param {string} user.rol - El rol del empleado.
 * @returns {Promise<Object>} Una promesa que se resuelve con el resultado de la consulta a la base de datos.
 * @throws {Error} Lanza un error si la consulta a la base de datos falla.
 */
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

/**
 * Esta función actualiza el campo is_logged de un empleado vía email.
 * 
 * @async
 * @function setLoggedTrue
 * @memberof Modelos Empleados
 * @param {string} email - El email del empleado.
 * @returns {Promise<number>} Devuelve el número de filas afectadas en la tabla.
 * @throws {Error} Lanza un error si la consulta a la base de datos falla.
 */
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

/**
 * Esta función actualiza el campo is_logged de un empleado a falso vía id.
 * 
 * @async
 * @function setLoggedFalse
 * @memberof Modelos Empleados
 * @param {number} id - El ID del empleado.
 * @returns {Promise<number>} Devuelve el número de filas afectadas en la tabla.
 * @throws {Error} Lanza un error si la consulta a la base de datos falla.
 */
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

/**
 * Esta función actualiza la fecha del último inicio de sesión de un empleado vía id.
 * 
 * @async
 * @function updateLastLoggedDate
 * @memberof Modelos Empleados
 * @param {number} id - El ID del empleado.
 * @returns {Promise<Object>} Devuelve el resultado de la consulta a la base de datos.
 * @throws {Error} Lanza un error si la consulta a la base de datos falla.
 */
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

module.exports = {
    getEmpleadoByEmail,
    createEmpleado,
    setLoggedTrue,
    setLoggedFalse,
    updateLastLoggedDate
};