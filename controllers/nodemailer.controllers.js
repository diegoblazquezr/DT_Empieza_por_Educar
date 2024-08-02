/**
 * @author Sergio Lillo
 * @namespace Controladores Nodemailer
 */

const sendMail = require('../config/nodemailer');

/**
 * Controlador para enviar un correo electrónico a un candidato.
 *
 * @async
 * @function sendEmailCandidato
 * @memberof Controladores Correo
 * @param {Object} req - El objeto de solicitud.
 * @param {Object} res - El objeto de respuesta.
 * @returns {Promise<void>} Responde con un mensaje de éxito o un error.
 */
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

/**
 * Controlador para enviar un correo electrónico aprobado a un candidato.
 *
 * @async
 * @function sendEmailCandidatoApproved
 * @memberof Controladores Correo
 * @param {Object} req - El objeto de solicitud.
 * @param {Object} res - El objeto de respuesta.
 * @returns {Promise<void>} Responde con un mensaje de éxito o un error.
 */
const sendEmailCandidatoApproved = async (req, res) => {
  const { email_candidato, subject, nombre_candidato } = req.body;

  try {
    await sendMail.sendMailCandidatoApproved(email_candidato, subject, nombre_candidato);
    res.status(200).json({ message: 'Correo enviado con éxito' });
  } catch (error) {
    console.error('Error al enviar el correo:', error);
    res.status(500).json({ message: 'Error al enviar el correo' });
  }
};

/**
 * Controlador para enviar un correo electrónico a un empleado.
 *
 * @async
 * @function sendEmailEmpleado
 * @memberof Controladores Correo
 * @param {Object} req - El objeto de solicitud.
 * @param {Object} res - El objeto de respuesta.
 * @returns {Promise<void>} Responde con un mensaje de éxito o un error.
 */
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
  sendEmailEmpleado,
  sendEmailCandidatoApproved
};