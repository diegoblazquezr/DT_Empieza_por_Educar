const express = require("express");

const adminRoutes = express.Router();

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