const express = require("express");
const jwt_secret = process.env.ULTRA_SECRET_KEY;
const jwt = require('jsonwebtoken');

const decodeToken = express.Router();

/**
 * Middleware para decodificar el token JWT.
 *
 * @async
 * @author Miguel Pardal
 * @function decodeToken
 * @memberof MiddlewaresAuth
 * @param {Object} req - El objeto de solicitud.
 * @param {Object} res - El objeto de respuesta.
 * @param {Function} next - La función que se llama para pasar el control al siguiente middleware.
 */
decodeToken.use(async (req, res, next) => {
    console.log("Encoded Token", req.token);
    if (req.token) {
        jwt.verify(req.token, jwt_secret, (err, decoded) => {
            if (err) {
                return res.status(400).json({
                    msg: 'Token error',
                    error: err.message
                });
            } else {
                console.log("decoded", decoded);
                req.token = decoded;
                next();
            }
        });
    } else {
        res.status(401).json({
            msg: 'Token not provided.'
        });
    }
});

module.exports = decodeToken;