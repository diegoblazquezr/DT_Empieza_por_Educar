import React from "react";

const Footer = () => {
  return (
    <>
      <footer className="footerStyle">
        <div className="redes">
          <a
            className="facebook"
            href="https://facebook.com/empiezaporeducar/"
            title="Facebook"
            target="_blank"
          >
            <img src="/iconoFB.png" alt="Facebook" />
          </a>
          <a
            className="X"
            href="https://x.com/EmpiezaxEducar"
            title="X"
            target="_blank"
          >
            <img src="/iconoX.png" alt="X" />
          </a>
          <a
            className="linkedin"
            href="https://www.linkedin.com/company/empiezaporeducar/"
            title="Linkedin"
            target="_blank"
          >
            <img src="/iconoLK.png" alt="Linkedin" />
          </a>
          <a
            className="youtube"
            href="https://www.youtube.com/user/EmpiezaPorEducar"
            title="Youtube"
            target="_blank"
          >
            <img src="/iconoYT.png" alt="Youtube" />
          </a>
          <a
            className="instagram"
            href="https://www.instagram.com/empiezaporeducar/"
            title="Instagram"
            target="_blank"
          >
            <img src="/iconoIG.png" alt="Instagram" />
          </a>
        </div>
        <p>
          © 2024 Empieza Por Educar. Socio de la red internacional Teach For All
          Política de cookies | Aviso legal | Política de privacidad y
          protección de datos
        </p>
      </footer>
    </>
  );
};

export default Footer;
