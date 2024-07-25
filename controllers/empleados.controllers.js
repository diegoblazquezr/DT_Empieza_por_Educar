const empleado = require('../models/empleados.models');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt_secret = process.env.ULTRA_SECRET_KEY;

//Read empleado by Email
const readEmpleadoByEmailController = async (req, res) => {
    let empleados;
    try {
        empleados = await empleado.getEmpleadoByEmail(req.query.email);
        res.status(200).json(empleados);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Create Empleado Controller
const createEmpleadoController = async (req, res) => {
    const newEmpleado = req.body;

    if (
        "nombre_empleado" in newEmpleado &&
        "apellidos_empleado" in newEmpleado &&
        "email_empleado" in newEmpleado &&
        "password" in newEmpleado &&
        "rol" in newEmpleado
    ) {
        try {
            const hashPassword = await bcrypt.hash(newEmpleado.password, saltRounds);

            const empleadoToCreate = {
                nombre_empleado: newEmpleado.nombre_empleado,
                apellidos_empleado: newEmpleado.apellidos_empleado,
                email_empleado: newEmpleado.email_empleado,
                password: hashPassword,
                rol: newEmpleado.rol
            };

            const response = await empleado.createEmpleado(empleadoToCreate);
            res.status(201).json({
                items_created: response
            });
        } catch (error) {
            console.log('Database Error:', error);
            res.status(500).json({ error: "Error in the Database" });
        }
    } else {
        res.status(400).json({ error: "All fields are required" });
    }
};

// Login Controller
const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const data = await empleado.getEmpleadoByEmail(email);

        if (!data || data.length === 0) {
            return res.status(400).json({ msg: 'Incorrect user or password' });
        }

        const userData = data[0];

        const match = await bcrypt.compare(password, userData.password);

        if (match) {
            await empleado.setLoggedTrue(email);

            const userForToken = {
                email: userData.email_empleado,
                rol: userData.rol
            };

            const token = jwt.sign(userForToken, jwt_secret, { expiresIn: '20m' });

            res.cookie('token', token, { httpOnly: true, sameSite: 'none', maxAge: 20 * 60 * 1000 });
            // res.cookie('email', email, { httpOnly: true, sameSite: 'none', maxAge: 20 * 60 * 1000 });

            // console.log('Response headers:', res.getHeaders());

            res.status(200).json({
                msg: 'Correct authentication',
                token
            });
        } else {
            return res.status(400).json({ msg: 'Incorrect user or password' });
        }
    } catch (error) {
        console.log('Error:', error);
        return res.status(500).json({ msg: 'Internal server error' });
    }
};

// Logout Controller
const logout = async (req, res) => {
    try {
        // console.log(req.cookies);
        const token = req.cookies.token;
        console.log('token', token)

        if (!token) {
            return res.status(400).json({ message: 'No token provided' });
        }

        const decoded = jwt.verify(token, jwt_secret);
        if (!decoded) {
            return res.status(401).json({ message: 'Invalid token' });
        }

        await empleado.updateLastLoggedDate(decoded.email);
        await empleado.setLoggedFalse(decoded.email);

        res.clearCookie('token');
        // res.clearCookie('email');

        return res.status(200).json({ message: 'Logged out successfully' });
    } catch (error) {
        console.log('Error:', error.message);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports = {
    readEmpleadoByEmailController,
    createEmpleadoController,
    login,
    logout
};