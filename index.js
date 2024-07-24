const express = require("express");
require('dotenv').config();
// const cors = require('cors');
const cookieParser = require('cookie-parser');
const app = express(); // Initialize server
const port = 3000;
// const swaggerUi = require('swagger-ui-express');
// const swaggerDocument = require('./swagger.json');

// app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Import Middlewares
const morgan = require('./middlewares/morgan');

// Middlewares
app.use(morgan(':method :url :status - :response-time ms :body'));
app.use(cookieParser());
app.use(express.static('public'));
app.use(express.json());
// app.use(cors());

// Routes
// const usersRoutes = require("./routes/users.routes");

// API Routes
// app.use('/api/user', usersRoutes);

// app.get('*', (req,res) =>{
//     res.sendFile(path.join(__dirname+'/client/build/index.html'));
// });

const server = app.listen(port, () => {
    console.log(`Example app listening on http://localhost:${port}`);
});

module.exports = server;