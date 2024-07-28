const express = require('express');
const getAccessToken = express.Router();

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
