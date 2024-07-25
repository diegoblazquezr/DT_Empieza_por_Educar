import React from 'react';

const Footer = () => {

  if (location.pathname === '/login' || location.pathname === '/signup' || location.pathname === '/') {
    return null; // No renderiza nada si estás en la página de inicio
  }
  return <footer>
Footer
    </footer>;
};

export default Footer;
