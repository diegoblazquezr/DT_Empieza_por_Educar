/**
 * @author Miguel Pardal
 * @namespace MiddlewaresAuth
 */

const express = require("express");

const adminRoutes = express.Router();

/**
 * Middleware para verificar si el usuario tiene rol de administrador.
 *
 * @async
 * @function adminRoutes
 * @memberof MiddlewaresAuth
 * @param {Object} req - El objeto de solicitud.
 * @param {Object} res - El objeto de respuesta.
 * @param {Function} next - La función que se llama para pasar el control al siguiente middleware.
 */
adminRoutes.use(async (req, res, next) => {
    console.log('hola', req.token.rol);
    if (req.token.rol === "admin") {
        console.log("ADMIN USER");
        next();
    }else{
        res.status(401);
    }
    
});

module.exports = adminRoutes;