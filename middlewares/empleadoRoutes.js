const express = require("express");

const empleadosRoutes = express.Router();

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