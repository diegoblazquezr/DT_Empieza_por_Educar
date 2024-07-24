const mysql = require('mysql');
require('dotenv').config()

// Configuración de la conexión
const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
});

// Conectar a la base de datos
connection.connect((err) => {
    if (err) {
        console.error('Error al conectar a la base de datos: ', err);
        return;
    }
    console.log('Conexión a la base de datos MySQL establecida.');
});
// connection.connect()
//     .then(() => console.log('Connection to mysql established'))
//     .catch(err => console.log('Mysql error connection', err.stack))

// Realizar una consulta (ejemplo: mostrar tablas)
// connection.query('SELECT * FROM candidaturas', (err, results) => {
//     if (err) {
//         console.error('Error al realizar la consulta: ', err);
//         return;
//     }
//     console.log('Tablas en la base de datos: ', results);
// });

// Cerrar la conexión
// connection.end((err) => {
//     if (err) {
//         console.error('Error al cerrar la conexión: ', err);
//         return;
//     }
//     console.log('Conexión a la base de datos cerrada.');
// });

module.exports = connection;