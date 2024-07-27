const sendMail = require('../config/nodemailer');

const sendEmail = async (req, res) => {
  const { email_candidato, subject, nombre_candidato } = req.body;

  try {
    await sendMail(email_candidato, subject, nombre_candidato);
    res.status(200).json({ message: 'Correo enviado con éxito' });
  } catch (error) {
    console.error('Error al enviar el correo:', error);
    res.status(500).json({ message: 'Error al enviar el correo' });
  }
};

module.exports = {
  sendEmail
};