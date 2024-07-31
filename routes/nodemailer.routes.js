const nodemailerController = require ('../controllers/nodemailer.controllers');
const router = require('express').Router();


router.post('/candidatos', nodemailerController.sendEmailCandidato);
router.post('/candidatos-approved', nodemailerController.sendEmailCandidatoApproved);
router.post('/empleados', nodemailerController.sendEmailEmpleado);



module.exports = router;
