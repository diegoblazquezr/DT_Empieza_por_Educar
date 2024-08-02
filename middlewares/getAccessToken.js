const express = require('express');
const getAccessToken = express.Router();

/**
 * Middleware para obtener el token de acceso de las cookies.
 *
 * @author Miguel Pardal
 * @function getAccessToken
 * @memberof MiddlewaresAuth
 * @param {Object} req - El objeto de solicitud.
 * @param {Object} res - El objeto de respuesta.
 * @param {Function} next - La función que se llama para pasar el control al siguiente middleware.
 */
getAccessToken.use((req, res, next) => {
    const { cookie } = req.headers;

    if (cookie && cookie.includes('token=')) {
        const cookies = cookie.split('; ').find(c => c.startsWith('token='));
        if (cookies) {
            const token = cookies.split('=')[1];
            if (token) {
                req.token = token;
                return next();
            } else {
                return res.sendStatus(403);
            }
        }
    }

    return res.sendStatus(403);
});

module.exports = getAccessToken;
