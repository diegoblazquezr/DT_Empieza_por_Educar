const axios = require('axios');

const validateCvUrl = async (url) => {
    try {
        const response = await axios.get(url, { responseType: 'arraybuffer' });
        return response.headers['content-type'] === 'application/pdf';
    } catch (error) {
        return false;
    }
};

const validateCv = async (req, res, next) => {
    const cvUrl = req.body.cv;
    const isValidUrl = await validateCvUrl(cvUrl);
    if (!isValidUrl) {
        return res.status(400).json({ errors: [{ msg: 'La URL del CV no es válida o no apunta a un PDF' }] });
    }
    next();
};

module.exports = validateCv;