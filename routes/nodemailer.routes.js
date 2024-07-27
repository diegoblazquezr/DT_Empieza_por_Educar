const nodemailerController = require ('../controllers/nodemailer.controllers');
const router = require('express').Router();


router.post('/', nodemailerController.sendEmail);


module.exports = router;
