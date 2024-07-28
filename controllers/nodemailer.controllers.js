const sendMail = require('../config/nodemailer');

const sendEmailCandidato = async (req, res) => {
  const { email_candidato, subject, nombre_candidato } = req.body;

  try {
    await sendMail.sendMailCandidato(email_candidato, subject, nombre_candidato);
    res.status(200).json({ message: 'Correo enviado con éxito' });
  } catch (error) {
    console.error('Error al enviar el correo:', error);
    res.status(500).json({ message: 'Error al enviar el correo' });
  }
};

const sendEmailEmpleado = async (req, res) => {
  const { email_empleado, subject, nombre_empleado, password } = req.body;

  try {
    await sendMail.sendMailEmpleado(email_empleado, subject, nombre_empleado, password);
    res.status(200).json({ message: 'Correo enviado con éxito' });
  } catch (error) {
    console.error('Error al enviar el correo:', error);
    res.status(500).json({ message: 'Error al enviar el correo' });
  }
};

module.exports = {
  sendEmailCandidato,
  sendEmailEmpleado
};