const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
        user: process.env.EMAIL_NODEMAILER,
        pass: process.env.PASS_NODEMAILER
    }
});

transporter.verify().then(() => console.log('Nodemailer Transporter en marcha')).catch(error => console.error(error));

const sendMailCandidato = (email_candidato, subject, nombre_candidato) => {
    const mailOptions = {
        from: 'desafioexethebridge@gmail.com',
        to: email_candidato,
        subject: subject,
        html: `
      <html>
  <body>
    <div style="text-align: center;">
      <img 
        src="https://zx5f5b.n3cdn1.secureserver.net/wp-content/uploads/2019/08/logo-exe-300-01.png" 
        alt="logo-exe" 
        title="logo-exe" 
        style="max-width: 200px; height: auto; display: block; margin: 0 auto;"
      />
    </div>
    <p>Estimad@ ${nombre_candidato}, ¿cómo estás?</p>
    <p>Agradecemos tu interés en nuestro proyecto Empieza por Educar. Lamentándolo mucho, no hemos aceptado tu solicitud de inscripción debido a que no cumples con los requisitos mínimos de nota media en la carrera y nivel de inglés que tenemos establecidos. Si quieres conocer más sobre los criterios de nuestro programa, <a href='https://empiezaporeducar.org/proceso-de-seleccion/' target='_blank'>aquí</a> tienes más información.</p>
    <p>Esperamos poder colaborar en alguna otra ocasión contigo.</p>
    <p>Un saludo y que tengas un feliz día</p>
  </body>
</html>
      `
    };

    return transporter.sendMail(mailOptions);
};

const sendMailEmpleado = (email_empleado, subject, nombre_empleado, password) => {
  const mailOptions = {
      from: 'desafioexethebridge@gmail.com',
      to: email_empleado,
      subject: subject,
      html: `
    <html>
<body>
  <div style="text-align: center;">
    <img 
      src="https://zx5f5b.n3cdn1.secureserver.net/wp-content/uploads/2019/08/logo-exe-300-01.png" 
      alt="logo-exe" 
      title="logo-exe" 
      style="max-width: 200px; height: auto; display: block; margin: 0 auto;"
    />
  </div>
  <p>Estimad@ ${nombre_empleado}, ¿cómo estás?</p>
  <p>Te remitimos este email desde el equipo de IT de Empieza por Educar.</p>
  <p>Ante tu reciente incorporación a nuestro proyecto, hemos creado unas claves de acceso iniciales para que puedas acceder al Dashboard de nuestra Intranet, desde donde podrás acceder a todos los datos de las candidaturas que se te vayan asignando.</p>
  <p>Si tienes alguna duda, no dudes en ponerte en contacto con nosotr@s.</p>
  <p>Ya puedes acceder a tu panel desde el siguiente <a href='' target='_blank'>enlace</a>.</p>
  <p>Estas son tus credenciales:</p>
  <p>Nombre de usuario: ${email_empleado}</p>
  <p>Contraseña:${password}</p>
  <p>Un saludo y que tengas un feliz día</p>
</body>
</html>
    `
  };

  return transporter.sendMail(mailOptions);
};

module.exports = {
  sendMailCandidato,
  sendMailEmpleado
};