/**
 * @author Sergio Lillo
 * @namespace MiddlewaresCV
 */

const axios = require('axios');

/**
 * Valida si una URL apunta a un archivo PDF.
 *
 * @async
 * @memberof MiddlewaresCV
 * @function validateCvUrl
 * @param {string} url - La URL del CV.
 * @returns {Promise<boolean>} Una promesa que se resuelve con un valor booleano indicando si la URL apunta a un PDF.
 */
const validateCvUrl = async (url) => {
    try {
        const response = await axios.get(url, { responseType: 'arraybuffer' });
        return response.headers['content-type'] === 'application/pdf';
    } catch (error) {
        return false;
    }
};

/**
 * Middleware para validar la URL del CV en la solicitud.
 *
 * @async
 * @memberof MiddlewaresCV
 * @function validateCv
 * @param {Object} req - El objeto de solicitud.
 * @param {Object} res - El objeto de respuesta.
 * @param {Function} next - La función que se llama para pasar el control al siguiente middleware.
 */
const validateCv = async (req, res, next) => {
    const cvUrl = req.body.cv;
    const isValidUrl = await validateCvUrl(cvUrl);
    if (!isValidUrl) {
        return res.status(400).json({ errors: [{ msg: 'La URL del CV no es válida o no apunta a un PDF' }] });
    }
    next();
};

module.exports = validateCv;