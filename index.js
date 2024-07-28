const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
require('dotenv').config();
const cookieParser = require('cookie-parser');
const app = express(); // Initialize server
const port = process.env.PORT || 3000;
const URL = process.env.API_URL || 'http://localhost';
// const swaggerUi = require('swagger-ui-express');
// const swaggerDocument = require('./swagger.json');

// app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Import Middlewares
const morgan = require('./middlewares/morgan');

// Middlewares
app.use(helmet());
app.use(morgan(':method :url :status - :response-time ms :body'));
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const allowedOrigins = [
    'http://localhost:5173',
    'https://dt-form-registro-exe.onrender.com'
  ];

app.use(cors({
    origin: (origin, callback) => {
        if (/*!origin ||*/ allowedOrigins.indexOf(origin) !== -1) {
          callback(null, true);
        } else {
          callback(new Error('No permitido por CORS'));
        }
      },
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
}));
// app.use(cors({
//     origin: function (origin, callback) {
//       if (origin === 'http://localhost:5173' || origin === '') {
//         callback(null, true);
//       } else {
//         callback(new Error('Not allowed by CORS'));
//       }
//     },
//     credentials: true
//   }));

// Routes
const candidaturasRoutes = require("./routes/candidaturas.routes");
const empleadosRoutes = require("./routes/empleados.routes");
const candidatosRoutes = require ("./routes/candidatos.routes");
const nodemailerRoutes = require ("./routes/nodemailer.routes");


// API Routes
app.use('/api/candidaturas', candidaturasRoutes);
app.use('/api/empleados', empleadosRoutes);
app.use('/api/candidatos', candidatosRoutes);
app.use('/api/confirmacion-candidato', nodemailerRoutes);

/*app.get('*', (req,res) =>{
    res.sendFile(path.join(__dirname+'/client/build/index.html'));
});*/

const server = app.listen(port, () => {
    console.log(`App listening on ${URL}:${port}`);
});

module.exports = server;