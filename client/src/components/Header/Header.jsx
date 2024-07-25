import React, { useState } from 'react';
import Nav from './Nav/Nav';

const Header = () => {

  const [menuOpen, setMenuOpen] = useState(false);
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };
  if (location.pathname === '/login' || location.pathname === '/signup' || location.pathname === '/') {
    return null; // No renderiza nada si estás en la página de inicio
  }
  return <header>
     <button className="hamburger-menu" onClick={toggleMenu}>
        ☰
      </button>
      <img src="https://zx5f5b.n3cdn1.secureserver.net/wp-content/uploads/2019/08/logo-exe-300-01.png" alt="logo-exe" title="logo-exe"></img>
      <Nav menuOpen={menuOpen} />
    </header>;
};

export default Header;
