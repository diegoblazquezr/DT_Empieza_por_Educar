import React from "react";

const Footer = () => {
  if (
    location.pathname === "/login" ||
    location.pathname === "/signup" ||
    location.pathname === "/"
  ) {
    return null; // No renderiza nada si estás en la página de inicio
  }
  return (
    <footer className="footerStyle">
      <a
        className="facebook"
        href="https://facebook.com/empiezaporeducar/"
        title="Facebook"
        target="_blank"
      >
      <p>F</p>
      </a>
      <a
        className="X"
        href="https://x.com/EmpiezaxEducar"
        title="X"
        target="_blank"
      >
        <p>X</p>
      </a>
      <a
        className="linkedin"
        href="https://www.linkedin.com/company/empiezaporeducar/"
        title="Linkedin"
        target="_blank"
      >
        <p>L</p>
      </a>
      <a
        className="youtube"
        href="https://www.youtube.com/user/EmpiezaPorEducar"
        title="Youtube"
        target="_blank"
      >
        <p>Y</p>
      </a>
      <a
        className="instagram"
        href="https://www.instagram.com/empiezaporeducar/"
        title="Instagram"
        target="_blank"
      >
        <p>I</p>
      </a>
      <p>
        © 2022 Empieza Por Educar. Socio de la red internacional Teach For All
        Política de cookies | Aviso legal | Política de privacidad y protección
        de datos
      </p>
    </footer>
  );
};

export default Footer;
