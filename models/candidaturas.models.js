const queries = require('../queries/candidaturas.queries')
const connection = require('../config/db_mysql');

// // CREATE
// const createCandidaturas = async (candidaturas) => {
//     const { name, price, description, stock, categoryName } = candidaturas;
//     let client, result;
//     try {
//         client = await connection.connect();
//         const data = await client.query(queries.createCandidaturas, [name, price, description, stock, categoryName]);
//         result = data.rowCount;
//     } catch (err) {
//         console.log(err);
//         throw err;
//     } finally {
//         client.release();
//     }
//     return result;
// }
// // Pruebas MySQL
// // let newCandidaturas = {
// //     name: "Test Candidaturas",
// //     price: 44.44,
// //     description: "Description of Test Candidaturas",
// //     stock: 44,
// //     categoryName: "Miscellaneous"
// // }
// // createCandidaturas(newCandidaturas)
// //     .then(data => console.log(data))
// //     .catch(error => console.log(error))

// READ ALL
const readCandidaturas = async () => {
    return new Promise((resolve, reject) => {
        connection.query(queries.readCandidaturas, (error, results) => {
            if (error) {
                console.log(error);
                reject(error);
            } else {
                resolve(results);
            }
        });
    });
}
// Pruebas MySQL
readCandidaturas()
    .then(data=>console.log(data))
    .catch(error => console.log(error))

// // READ BY FILTER
// const readCandidaturassByFilter = async (search, categoryName, filter, order, limit, offset) => {
//     let client, result;
//     try {
//         client = await connection.connect();

//         if (order === 'asc') {
//             const data = await client.query(queries.readCandidaturassByFilterAsc, [`%${search}%`, categoryName, filter, limit, offset]);
//             result = data.rows;
//         } else if (order === 'desc') {
//             const data = await client.query(queries.readCandidaturassByFilterDesc, [`%${search}%`, categoryName, filter, limit, offset]);
//             result = data.rows;
//         }
//     } catch (err) {
//         console.log(err);
//         throw err;
//     } finally {
//         client.release();
//     }
//     return result;
// }
// // Pruebas MySQL
// // readCandidaturassByFilter('', 'Electronics', 'price', 'asc', 3, 0)
// //     .then(data => console.log(data))
// //     .catch(error => console.log(error))

// // UPDATE
// const updateCandidaturas = async (candidaturas) => {
//     const { name, price, description, stock, categoryName, actualName } = candidaturas;
//     let client, result;
//     try {
//         client = await connection.connect();
//         const data = await client.query(queries.updateCandidaturas, [name, price, description, stock, categoryName, actualName]);
//         result = data.rowCount;
//     } catch (err) {
//         console.log(err);
//         throw err;
//     } finally {
//         client.release();
//     }
//     return result;
// }
// // Pruebas MySQL
// // const updatedCandidaturas = {
// //     name : "Test Candidaturas 2",
// //     price : 444.44,
// //     description : "Description of Test Candidaturas 2",
// //     stock : 444,
// //     categoryName : "Electronics",
// //     actualName : "Test Candidaturas"
// // }
// // updateCandidaturas(updatedCandidaturas)
// //     .then(data => console.log(data))
// //     .catch(error => console.log(error))

// // DELETE
// const deleteCandidaturas = async (candidaturasName) => {
//     let client, result;
//     try {
//         client = await connection.connect();
//         const data = await client.query(queries.deleteCandidaturas, [candidaturasName])
//         result = data.rowCount
//     } catch (err) {
//         console.log(err);
//         throw err;
//     } finally {
//         client.release();
//     }
//     return result;
// }
// // Pruebas MySQL
// // deleteCandidaturas('Test Candidaturas 2')
// //     .then(data => console.log(data))
// //     .catch(error => console.log(error))

const candidaturass = {
    // createCandidaturas,
    readCandidaturas,
    // readCandidaturassByFilter,
    // updateCandidaturas,
    // deleteCandidaturas
}

module.exports = candidaturass;