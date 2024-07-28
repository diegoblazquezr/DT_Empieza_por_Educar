const express = require("express");
const jwt_secret = process.env.ULTRA_SECRET_KEY;
const jwt = require('jsonwebtoken');

const decodeToken = express.Router();

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