const express = require("express");

const empleadosRoutes = express.Router();


/**
 * Middleware para verificar si el usuario tiene rol de reclutador o administrador.
 *
 * @function empleadosRoutes
 * @author Miguel Pardal
 * @memberof MiddlewaresAuth
 * @param {Object} req - El objeto de solicitud.
 * @param {Object} res - El objeto de respuesta.
 * @param {Function} next - La función que se llama para pasar el control al siguiente middleware.
 */
empleadosRoutes.use(async (req, res, next) => {
    console.log(req.token.rol);
    if (req.token.rol === "reclutador" || 'admin') {
        console.log("Recruiter USER");
        next();
    } else {
        res.status(401);
    }

});

module.exports = empleadosRoutes;